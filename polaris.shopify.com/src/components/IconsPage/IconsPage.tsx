import {useState, useEffect} from 'react';
import Fuse from 'fuse.js';
import {useRouter} from 'next/router';
import {Dialog} from '@headlessui/react';
import iconMetadata from '@shopify/polaris-icons/metadata';
import type {Icon as IconType} from '@shopify/polaris-icons/metadata';
import {useMedia} from '../../utils/hooks';
import styles from './IconsPage.module.scss';
import IconGrid from '../IconGrid';
import SearchField from '../SearchField';
import {SearchIcon} from '@shopify/polaris-icons';
import Icon from '../Icon';
import IconDetails from '../IconDetails';
import PageMeta from '../PageMeta';
import {className} from '../../utils/various';
import Page from '../Page';
import StatusBanner from '../StatusBanner';
import {iconRenamesV7toV8} from './icon-renames-v7-to-v8';

const fuse = new Fuse(Object.values(iconMetadata), {
  threshold: 0.25,
  keys: [
    {name: 'name', weight: 3},
    {name: 'id', weight: 2},
    {name: 'keywords', weight: 2},
    {name: 'fileName', weight: 1},
    {name: 'description', weight: 1},
  ],
});

const getIcons = (currentSearchText: string) => {
  const icons = currentSearchText
    ? fuse.search(currentSearchText).map((result) => result.item)
    : Object.values(iconMetadata);

  return icons;
};

function scrollToActiveIcon(activeIcon: string): void {
  const activeElement = document.querySelector(`#${activeIcon}`);

  if (activeElement) {
    const bodyRect = document.body.getBoundingClientRect();
    const activeElementRect = activeElement?.getBoundingClientRect();

    const elementOffsetY = activeElementRect.top - bodyRect.top;
    const isOverflowingScreenUpwards = elementOffsetY < window.scrollY;
    const isOverflowingScreenDownwards =
      window.scrollY + window.innerHeight <
      elementOffsetY + activeElementRect.height;

    const isNotFullyVisible =
      isOverflowingScreenUpwards || isOverflowingScreenDownwards;

    if (isNotFullyVisible) {
      window.scrollTo({
        top:
          elementOffsetY -
          window.innerHeight / 2 +
          activeElementRect.height / 2,
        behavior: 'smooth',
      });
    }
  }
}

function IconsPage() {
  const router = useRouter();
  const useModal = useMedia('screen and (max-width: 1400px)');
  const [searchText, setSearchText] = useState('');
  const [icons, setIcons] = useState<IconType[]>([]);
  const iconQueryParam = Array.isArray(router.query.icon)
    ? router.query.icon[0]
    : router.query.icon ?? '';
  const isRenamedIcon = Object.keys(iconRenamesV7toV8).includes(iconQueryParam);
  const iconName = isRenamedIcon
    ? iconRenamesV7toV8[iconQueryParam as keyof typeof iconRenamesV7toV8]
    : iconQueryParam;
  const activeIcon = Object.keys(iconMetadata).includes(iconName)
    ? iconName
    : '';
  const currentSearchText = router.query.q ? `${router.query.q}` : '';

  useEffect(() => {
    if (router.isReady && activeIcon) {
      scrollToActiveIcon(activeIcon);
    }
  }, [router.isReady, activeIcon]);

  useEffect(() => {
    setIcons(getIcons(currentSearchText));
    setSearchText(currentSearchText);
  }, [currentSearchText]);

  const updateQueryParams = (currentSearchText: string) => {
    const query: {q?: string; icon?: string} = {};
    if (currentSearchText) query.q = currentSearchText;
    if (activeIcon) query.icon = activeIcon;
    router.push({query});
  };

  const handleModalClose = () => {
    const query: {q?: string} = {};
    if (searchText) query.q = searchText;
    router.push({query});
  };

  const pageTitle = iconMetadata[activeIcon]
    ? `${iconMetadata[activeIcon].name}`
    : 'Icons';

  const githubIssueTitle = `[Icon] New icon ${searchText}`;
  const githubIssueUrl = `https://github.com/Shopify/polaris/issues/new?labels=Icon&template=NEW_ICON.yml&title=${encodeURIComponent(
    githubIssueTitle,
  )}`;

  return (
    <Page title="Icons">
      <PageMeta title={pageTitle} />

      <div className={className(!useModal && styles.PageLayout)}>
        <div className={styles.IconGrids}>
          <SearchField
            defaultValue={searchText}
            onChange={(value) => updateQueryParams(value)}
            placeholder="Search icons"
          />

          {isRenamedIcon ? (
            <StatusBanner status="Deprecated">
              The <code>{iconQueryParam}</code> icon is no longer supported.
              Please use the <code>{iconName}</code> icon instead.
            </StatusBanner>
          ) : null}

          {icons.length > 0 && (
            <IconGrid>
              {icons.map((icon) => (
                <IconGrid.Item
                  key={icon.id}
                  icon={icon}
                  query={searchText}
                  activeIcon={activeIcon}
                />
              ))}
            </IconGrid>
          )}

          {icons.length === 0 ? (
            <div className={styles.NoSearchResults}>
              <Icon source={SearchIcon} width={40} height={40} />
              <div>
                <h2>No matches for {`"${searchText}"`}</h2>
                <p>
                  Open a <a href={githubIssueUrl}>GitHub issue</a> to send us
                  feedback or propose new icons.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {useModal ? (
          <Dialog open={activeIcon !== ''} onClose={handleModalClose}>
            <div className={styles.ModalBackdrop} aria-hidden="true" />
            <Dialog.Panel className={styles.Modal}>
              <IconDetails
                fileName={activeIcon}
                iconData={iconMetadata[activeIcon]}
              />
            </Dialog.Panel>
          </Dialog>
        ) : (
          <IconDetails
            fileName={activeIcon}
            iconData={iconMetadata[activeIcon]}
          />
        )}
      </div>
    </Page>
  );
}

export default IconsPage;
