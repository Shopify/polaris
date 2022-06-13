/* eslint-disable line-comment-position */
/* eslint-disable id-length */
/* eslint-disable no-param-reassign */
const legacyBreakpoints = {
  'layout-width-primary-min': '480px',
  'layout-width-primary-max': '662px',
  'layout-width-secondary-min': '240px',
  'layout-width-secondary-max': '320px',
  'layout-width-one-half-width-base': '450px',
  'layout-width-one-third-width-base': '240px',
  'layout-width-nav-base': '240px',
  'layout-width-page-with-nav-base': '769px',
  'layout-width-page-content-not-condensed': '680px',
  'layout-width-page-content-partially-condensed': '450px',
  'page-condensed-min-page': '490px',
  'layout-width-inner-spacing-base': '16px',
  'layout-width-outer-spacing-min': '20px',
  'layout-width-outer-spacing-max': '32px',
  'dismiss-icon-size': '32px',
  'top-bar-height': '56px',
  'mobile-nav-width': '100vw - (32px + 32px)',
  'nav-min-window-corrected': '769px',
  'navigation-width': '240px default!',
  'dangerous-magic-space-4': '16px',
  'dangerous-magic-space-5': '20px',
  'dangerous-magic-space-8': '32px',
  'page-max-width': '998px',
  'frame-with-nav-max-width': '1238px',
  'stacked-content': '46em', // 736px
  'not-condensed-content': '42.5em', // 680px
  'partially-condensed-content': '28.125', // 450px
  'not-condensed-outer-spacing': '4em', // 64px
  'partially-condensed-outer-spacing': '2.5em', // 40px
  'not-condensed-min-page': '46.5em', // 744px
  'partially-condensed-min-page': '30.625em', // 490px
  'nav-size': '15em', // 240px
  'nav-min-window': '48.0625em', // 769px
};

function unit(value) {
  return value.replace(/^\d+/, '');
}

function breakpoint(value) {
  const valueUnit = unit(value);
  if (valueUnit === 'em') {
    return value;
  } else if (valueUnit === 'px') {
    return `${parseFloat(value) / 16}em`;
  } else {
    throw new Error(
      `The ${value} passed into breakpoint() must be a pixel or em value. Got "${value}"'`,
    );
  }
}

function min(a, b) {
  const valueA = parseFloat(a);
  const valueB = parseFloat(b);
  return valueA < valueB ? a : b;
}

export function pageContentBreakpointBefore(size, className) {
  size = breakpoint(size);

  if (
    parseFloat(size) <
    parseFloat(legacyBreakpoints['partially-condensed-content'])
  ) {
    return `
[data-has-navigation] ${className ?? '*'} {
	@media (max-width: ${min(
    legacyBreakpoints['nav-min-window'],
    size,
  )}), (min-width: ${legacyBreakpoints['nav-min-window']}) and (max-width: ${
      parseFloat(legacyBreakpoints['nav-size']) + parseFloat(size)
    }em) {
		@content;
	}
}

@media (max-width: ${size}) {
	@content;
}
		`.trim();
  } else if (
    parseFloat(size) < parseFloat(legacyBreakpoints['not-condensed-content'])
  ) {
    return `
[data-has-navigation] ${className ?? '*'} {
	@media (max-width: ${min(
    legacyBreakpoints['nav-min-window'],
    `${
      parseFloat(size) +
      parseFloat(legacyBreakpoints['partially-condensed-outer-spacing'])
    }em`,
  )}), (min-width: ${legacyBreakpoints['nav-min-window']}) and (max-width: ${
      parseFloat(legacyBreakpoints['nav-size']) +
      parseFloat(size) +
      parseFloat(legacyBreakpoints['not-condensed-outer-spacing'])
    }em) {
		@content;
	}
}

@media (max-width: ${
      parseFloat(size) +
      parseFloat(legacyBreakpoints['partially-condensed-outer-spacing'])
    }em) {
	@content;
}
		`.trim();
  } else {
    return `
[data-has-navigation] ${className ?? '*'} {
	@media (max-width: ${min(
    legacyBreakpoints['nav-min-window'],
    `${
      parseFloat(size) +
      parseFloat(legacyBreakpoints['partially-condensed-outer-spacing'])
    }em`,
  )}), (min-width: ${legacyBreakpoints['nav-min-window']}) and (max-width: ${
      parseFloat(legacyBreakpoints['nav-size']) +
      parseFloat(size) +
      parseFloat(legacyBreakpoints['not-condensed-outer-spacing'])
    }em) {
		@content;
	}
}

@media (max-width: ${
      parseFloat(size) +
      parseFloat(legacyBreakpoints['not-condensed-outer-spacing'])
    }em) {
	@content;
}
		`.trim();
  }
}

export function pageContentBreakpointAfter(size, className) {
  size = breakpoint(size);

  if (
    parseFloat(size) <
    parseFloat(legacyBreakpoints['partially-condensed-content'])
  ) {
    return `
[data-has-navigation] ${className ?? '*'} {
	@media (max-width: ${
    legacyBreakpoints['nav-min-window']
  }) and (min-width: ${size}), (min-width: ${
      parseFloat(legacyBreakpoints['nav-size']) + parseFloat(size)
    }em) {
		@content;
	}
}

@media (min-width: ${size}) {
	@content;
}
		`.trim();
  } else if (
    parseFloat(size) < parseFloat(legacyBreakpoints['not-condensed-content'])
  ) {
    return `
[data-has-navigation] ${className ?? '*'} {
	@media (max-width: ${legacyBreakpoints['nav-min-window']}) and (min-width: ${
      parseFloat(size) +
      parseFloat(legacyBreakpoints['partially-condensed-outer-spacing'])
    }em), (min-width: ${
      parseFloat(legacyBreakpoints['nav-size']) +
      parseFloat(size) +
      parseFloat(legacyBreakpoints['partially-condensed-outer-spacing'])
    }em) {
		@content;
	}
}

@media (min-width: ${
      parseFloat(size) +
      parseFloat(legacyBreakpoints['partially-condensed-outer-spacing'])
    }em) {
	@content;
}		
		`.trim();
  } else {
    return `		
[data-has-navigation] ${className ?? '*'} {
	@media (max-width: ${legacyBreakpoints['nav-min-window']}) and (min-width: ${
      parseFloat(size) +
      parseFloat(legacyBreakpoints['not-condensed-outer-spacing'])
    }em), (min-width: ${
      parseFloat(legacyBreakpoints['nav-size']) +
      parseFloat(size) +
      parseFloat(legacyBreakpoints['not-condensed-outer-spacing'])
    }em) {
		@content;
	}
}

@media (min-width: ${
      parseFloat(size) +
      parseFloat(legacyBreakpoints['not-condensed-outer-spacing'])
    }em) {
	@content;
}
		`.trim();
  }
}

// console.log(pageContentBreakpointBefore('449px'));
// console.log(pageContentBreakpointBefore('679px'));
// console.log(pageContentBreakpointBefore('680px'));

// console.log(pageContentBreakpointAfter('449px'));
// console.log(pageContentBreakpointAfter('679px'));
// console.log(pageContentBreakpointAfter('680px'));

// console.log(pageContentBreakpointAfter('550px'));
