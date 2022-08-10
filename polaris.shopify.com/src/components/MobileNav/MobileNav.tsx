import React, {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {foundationsNavItems} from '../../data/navItems';
import {className, getComponentNav} from '../../utils/various';
import {Breakpoints} from '../../types';
import Button from '../Button';
import type {NavItem} from '../Nav';

import styles from './MobileNav.module.scss';

const componentsNavItems = getComponentNav();

const navItems: NavItem[] = [
  {
    title: 'Getting started',
    url: '/',
  },
  ...foundationsNavItems,
  {
    title: 'Components',
    url: '/components',
    children: componentsNavItems[0].children,
  },
  {
    title: 'Tokens',
    url: '/tokens/colors',
  },
  {
    title: 'Icons',
    url: '/icons',
  },
  // ...contributingNavItems,
];

interface Props {
  currentPath: string;
}

function MobileNav({currentPath}: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function hideSideNavOnResize() {
      if (window.innerWidth > Breakpoints.Desktop && showMenu) {
        setShowMenu(false);
      }
    }

    window.addEventListener('resize', hideSideNavOnResize);

    return () => window.removeEventListener('resize', hideSideNavOnResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleOnKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('keydown', handleOnKeyDown);
      logoRef.current instanceof HTMLElement && logoRef.current.focus();
    }

    return () => document.removeEventListener('keydown', handleOnKeyDown);
  }, [showMenu]);

  const handleCloseMenu = () => {
    setShowMenu(false);
    menuButtonRef.current?.focus();
  };

  const handleShiftTabPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const closeButton = closeButtonRef.current;
      closeButton instanceof HTMLElement && closeButton.focus();
    }
  };

  const handleTabPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const logoLink = logoRef.current;
      logoLink instanceof HTMLElement && logoLink.focus();
    }
  };

  return (
    <>
      <Button
        id="menu-button"
        aria-label="Open menu"
        aria-controls="side-menu"
        aria-expanded={showMenu}
        onClick={() => setShowMenu(true)}
        ref={menuButtonRef}
      >
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 11h-18a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0-7h-18a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0 14h-18a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z" />
        </svg>
      </Button>

      <nav
        id="side-menu"
        className={className(styles.MobileNav, showMenu && styles.show)}
      >
        <ul className={styles.LinksList}>
          <li>
            <Link href="/" passHref>
              <a
                ref={logoRef}
                className={styles.Logo}
                onClick={handleCloseMenu}
                onKeyDown={handleShiftTabPress}
              >
                <Image
                  src="/images/shopify-logo.svg"
                  layout="fixed"
                  width={24}
                  height={24}
                  alt="Shopify logo"
                />
                Polaris
              </a>
            </Link>
          </li>

          {navItems.map((item, idx) => (
            <ListItem
              key={idx}
              ariaId={idx}
              item={item}
              currentPath={currentPath}
              handleCloseMenu={handleCloseMenu}
            />
          ))}
        </ul>

        <button
          ref={closeButtonRef}
          aria-label="Close menu"
          className={styles.CloseButton}
          onClick={handleCloseMenu}
          onKeyDown={handleTabPress}
        >
          <CloseIcon />
        </button>
      </nav>

      {showMenu && (
        <div className={styles.Backdrop} onClick={handleCloseMenu} />
      )}
    </>
  );
}

interface ListItemProps {
  ariaId?: number;
  item: NavItem;
  currentPath: string;
  handleCloseMenu?: () => void;
}

function ListItem({ariaId, item, currentPath, handleCloseMenu}: ListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li>
      {item.children && (
        <>
          <h3>
            <button
              id={`accordion-${ariaId}`}
              type="button"
              aria-expanded={isExpanded}
              aria-controls={`accordion-panel-${ariaId}`}
              className={className(
                styles.AccordionTrigger,
                isExpanded && styles.expanded,
              )}
              onClick={() => setIsExpanded((prevState) => !prevState)}
            >
              {item.title} <ChevronRightIcon />
            </button>
          </h3>

          <ul
            id={`accordion-panel-${ariaId}`}
            aria-labelledby={`accordion-${ariaId}`}
            className={className(
              styles.AccordionPanel,
              isExpanded && styles.expanded,
            )}
          >
            {item.children.map((child) => (
              <ListItem
                key={child.url}
                item={child}
                currentPath={currentPath}
                handleCloseMenu={handleCloseMenu}
              />
            ))}
          </ul>
        </>
      )}

      {!item.children && item.url && (
        <Link href={item.url} passHref>
          <a
            aria-current={item.url === currentPath ? 'page' : 'false'}
            onClick={handleCloseMenu}
          >
            {item.title}
          </a>
        </Link>
      )}
    </li>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16a.999.999 0 0 1-.707-1.707l4.293-4.293-4.293-4.293a.999.999 0 1 1 1.414-1.414l5 5a.999.999 0 0 1 0 1.414l-5 5a.997.997 0 0 1-.707.293z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414l-6.293 6.293-6.293-6.293a1 1 0 0 0-1.414 1.414l6.293 6.293-6.293 6.293a1 1 0 1 0 1.414 1.414l6.293-6.293 6.293 6.293a.998.998 0 0 0 1.707-.707.999.999 0 0 0-.293-.707l-6.293-6.293z" />
    </svg>
  );
}

export default MobileNav;
