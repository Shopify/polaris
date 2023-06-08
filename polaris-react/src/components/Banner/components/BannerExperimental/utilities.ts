import type {
  ColorBackgroundAlias,
  ColorIconAlias,
  ColorTextAlias,
} from '@shopify/polaris-tokens';
import {color} from '@shopify/polaris-tokens';
import {useContext} from 'react';

import {WithinContentContext} from '../../../../utilities/within-content-context';
import type {BannerProps, BannerStatus} from '../../Banner';

interface BannerColorAliases {
  background: ColorBackgroundAlias;
  text: ColorTextAlias;
  icon: ColorIconAlias | ColorTextAlias;
}

interface BannerColors {
  withinPage: BannerColorAliases;
  withinContentContainer: BannerColorAliases;
}

export function useBannerColors(
  status: BannerProps['status'] = 'info',
  subduedClose = false,
) {
  const withinContentContainer = useContext(WithinContentContext);
  const bannerColors =
    colorsByStatus[status][
      withinContentContainer ? 'withinContentContainer' : 'withinPage'
    ];
  const iconRGBA = color[`color-${bannerColors.icon}`];
  const noTitleCloseIconColor = color[`color-icon-subdued`];

  return {
    iconRGBA,
    backgroundColor: bannerColors.background,
    textColor: bannerColors.text,
    statusIcon: polarisSummerEditions2023StatusIcon(status, iconRGBA),
    closeIcon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.28033 5.21967C5.98744 4.92678 5.51256 4.92678 5.21967 5.21967C4.92678 5.51256 4.92678 5.98744 5.21967 6.28033L8.93934 10L5.21967 13.7197C4.92678 14.0126 4.92678 14.4874 5.21967 14.7803C5.51256 15.0732 5.98744 15.0732 6.28033 14.7803L10 11.0607L13.7197 14.7803C14.0126 15.0732 14.4874 15.0732 14.7803 14.7803C15.0732 14.4874 15.0732 14.0126 14.7803 13.7197L11.0607 10L14.7803 6.28033C15.0732 5.98744 15.0732 5.51256 14.7803 5.21967C14.4874 4.92678 14.0126 4.92678 13.7197 5.21967L10 8.93934L6.28033 5.21967Z" fill="${
      subduedClose ? noTitleCloseIconColor : iconRGBA
    }"/></svg>`,
  };
}

const colorsByStatus: {[key in BannerStatus]: BannerColors} = {
  success: {
    withinPage: {
      background: 'bg-success-strong',
      text: 'text-on-color',
      icon: 'icon-on-color',
    },
    withinContentContainer: {
      background: 'bg-success-subdued',
      text: 'text-success',
      icon: 'icon-success-strong-experimental',
    },
  },
  warning: {
    withinPage: {
      background: 'bg-warning-strong-experimental',
      text: 'text-warning-strong',
      icon: 'text-warning-strong',
    },
    withinContentContainer: {
      background: 'bg-warning-subdued-experimental',
      text: 'text-warning-experimental',
      icon: 'icon-warning-strong-experimental',
    },
  },
  critical: {
    withinPage: {
      background: 'bg-critical-strong',
      text: 'text-on-color',
      icon: 'icon-on-color',
    },
    withinContentContainer: {
      background: 'bg-critical-subdued',
      text: 'text-critical-strong',
      icon: 'icon-critical-strong-experimental',
    },
  },
  info: {
    withinPage: {
      background: 'bg-info-strong',
      text: 'text-info-strong',
      icon: 'text-info-strong',
    },
    withinContentContainer: {
      background: 'bg-info-subdued',
      text: 'text-info',
      icon: 'icon-info-strong-experimental',
    },
  },
};

// Temporary way of getting new icons before they are added to the icon library.
// Since the Icon component uses a data URI the color tokens have to be hardcoded here
// to be added directly onto the svg string as a fill (this can't be done in scss or in Icon).
export function polarisSummerEditions2023StatusIcon(
  status: BannerProps['status'] = 'info',
  fill: string,
) {
  const Check = `<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M15.7127 5.15974C16.0387 5.41526 16.0959 5.88668 15.8403 6.21269L8.78953 15.2085C8.38612 15.7232 7.60536 15.7186 7.20812 15.1991L4.15427 11.2056C3.90266 10.8766 3.96542 10.4059 4.29445 10.1543C4.62349 9.90265 5.09419 9.96541 5.34581 10.2944L8.00735 13.7749L14.6597 5.28737C14.9153 4.96136 15.3867 4.90422 15.7127 5.15974Z' fill='${fill}'/></svg>`;
  const InfoOutline = `<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M10 15.5C6.96243 15.5 4.5 13.0376 4.5 10C4.5 6.96243 6.96243 4.5 10 4.5C13.0376 4.5 15.5 6.96243 15.5 10C15.5 13.0376 13.0376 15.5 10 15.5ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10ZM11 7C11 7.55228 10.5523 8 10 8C9.44772 8 9 7.55228 9 7C9 6.44772 9.44772 6 10 6C10.5523 6 11 6.44772 11 7ZM10 9C10.4142 9 10.75 9.33579 10.75 9.75V13.25C10.75 13.6642 10.4142 14 10 14C9.58579 14 9.25 13.6642 9.25 13.25V9.75C9.25 9.33579 9.58579 9 10 9Z' fill='${fill}'/></svg>`;
  const WarningOutline = `<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M7.60522 3.63039C7.35263 4.1406 6.18409 6.37064 4.99458 8.64047L4.96721 8.69268C3.80201 10.9161 2.62329 13.1653 2.35264 13.7122C1.91997 14.5863 1.81418 15.707 2.44501 16.6629C3.0752 17.6179 4.16952 18 5.27267 18H14.7273C15.8305 18 16.9248 17.6179 17.555 16.6629C18.1859 15.707 18.0801 14.5863 17.6474 13.7122C17.3772 13.1662 16.2017 10.9233 15.0384 8.70343L15.0381 8.703L15.0054 8.64046C13.8158 6.37053 12.6473 4.14066 12.3949 3.6306C11.9658 2.76364 11.1364 2 10.0001 2C8.86385 2 8.03438 2.76355 7.60522 3.63039ZM6.32737 9.32876L6.3273 9.32889L6.32725 9.32899C5.1441 11.5867 3.95991 13.8463 3.69699 14.3776C3.17173 15.4388 3.69699 16.5 5.27267 16.5L14.7273 16.5C16.303 16.5 16.8283 15.4388 16.303 14.3776C16.0406 13.8472 14.8599 11.5943 13.6787 9.34038L13.6786 9.34022L13.6786 9.34018C12.4961 7.08393 11.3132 4.8268 11.0505 4.29592C10.5253 3.23469 9.47489 3.23469 8.9495 4.29592C8.68711 4.82591 7.50777 7.07632 6.32737 9.32876ZM10 6.5C10.4142 6.5 10.75 6.83579 10.75 7.25V11.25C10.75 11.6642 10.4142 12 10 12C9.58579 12 9.25 11.6642 9.25 11.25V7.25C9.25 6.83579 9.58579 6.5 10 6.5ZM11.0001 14C11.0001 14.5523 10.5524 15 10.0001 15C9.44779 15 9.00008 14.5523 9.00008 14C9.00008 13.4477 9.44779 13 10.0001 13C10.5524 13 11.0001 13.4477 11.0001 14Z' fill='${fill}'/></svg>`;
  const CriticalOutline = `<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M7.95465 16.5L3.5 12.0453V7.95465L7.95465 3.5H12.0453L16.5 7.95465V12.0453L12.0453 16.5H7.95465ZM2 12.2525V7.74755C2 7.48233 2.10536 7.22798 2.29289 7.04044L7.04044 2.29289C7.22798 2.10536 7.48233 2 7.74755 2H12.2525C12.5177 2 12.772 2.10536 12.9596 2.29289L17.7071 7.04044C17.8946 7.22798 18 7.48233 18 7.74755V12.2525C18 12.5177 17.8946 12.772 17.7071 12.9596L12.9596 17.7071C12.772 17.8946 12.5177 18 12.2525 18H7.74755C7.48233 18 7.22798 17.8946 7.04044 17.7071L2.29289 12.9596C2.10536 12.772 2 12.5177 2 12.2525ZM10 6C10.4142 6 10.75 6.33579 10.75 6.75V10.25C10.75 10.6642 10.4142 11 10 11C9.58579 11 9.25 10.6642 9.25 10.25V6.75C9.25 6.33579 9.58579 6 10 6ZM11 13C11 13.5523 10.5523 14 10 14C9.44772 14 9 13.5523 9 13C9 12.4477 9.44772 12 10 12C10.5523 12 11 12.4477 11 13Z' fill='${fill}'/></svg>`;

  switch (status) {
    case 'success':
      return Check;
    case 'info':
      return InfoOutline;
    case 'warning':
      return WarningOutline;
    case 'critical':
      return CriticalOutline;
    default:
      return InfoOutline;
  }
}
