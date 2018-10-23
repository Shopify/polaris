'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
var _inherits = _interopDefault(require('babel-runtime/helpers/inherits'));
var React = require('react');
var _toConsumableArray = _interopDefault(require('babel-runtime/helpers/toConsumableArray'));
var reactUtilities = require('@shopify/react-utilities');
var tslib_1 = require('tslib');
var decorators = require('@shopify/javascript-utilities/decorators');
var geometry = require('@shopify/javascript-utilities/geometry');
var throttle = _interopDefault(require('lodash-decorators/throttle'));
var events = require('@shopify/javascript-utilities/events');
var other = require('@shopify/javascript-utilities/other');
var get = _interopDefault(require('lodash/get'));
var merge = _interopDefault(require('lodash/merge'));
var replace = _interopDefault(require('lodash/replace'));
var hoistStatics = _interopDefault(require('hoist-non-react-statics'));
var PropTypes = require('prop-types');
var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));
var styles = require('@shopify/react-utilities/styles');
var compose = _interopDefault(require('@shopify/react-compose'));
var fastdom = require('@shopify/javascript-utilities/fastdom');
var math = require('@shopify/javascript-utilities/math');
var isEqual = _interopDefault(require('lodash/isEqual'));
var dates = require('@shopify/javascript-utilities/dates');
var capitalize = _interopDefault(require('lodash/capitalize'));
require('core-js/fn/array/some');
require('core-js/fn/string/ends-with');
var ReactDOM = require('react-dom');
var focus = require('@shopify/javascript-utilities/focus');
var dom = require('@shopify/javascript-utilities/dom');
var reactTransitionGroup = require('react-transition-group');
var memoize$1 = _interopDefault(require('lodash/memoize'));
var pick = _interopDefault(require('lodash/pick'));
var target = require('@shopify/react-utilities/target');
var _defineProperty = _interopDefault(require('babel-runtime/helpers/defineProperty'));

// eslint-disable-next-line shopify/strict-component-boundaries

var styles$3 = {
  "ActionList": "Polaris-ActionList",
  "Section-withoutTitle": "Polaris-ActionList__Section--withoutTitle",
  "Actions": "Polaris-ActionList__Actions",
  "Section": "Polaris-ActionList__Section",
  "Title": "Polaris-ActionList__Title",
  "Item": "Polaris-ActionList__Item",
  "destructive": "Polaris-ActionList--destructive",
  "disabled": "Polaris-ActionList--disabled",
  "Image": "Polaris-ActionList__Image",
  "Content": "Polaris-ActionList__Content",
  "Text": "Polaris-ActionList__Text",
  "BadgeWrapper": "Polaris-ActionList__BadgeWrapper",
};

var _jsxFileName$3 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ActionList/components/Item/Item.js';
function Item$1(_ref) {
  var badge = _ref.badge,
      content = _ref.content,
      url = _ref.url,
      onAction = _ref.onAction,
      icon = _ref.icon,
      image = _ref.image,
      disabled = _ref.disabled,
      external = _ref.external,
      destructive = _ref.destructive,
      ellipsis = _ref.ellipsis;

  var className = reactUtilities.classNames(styles$3.Item, disabled && styles$3.disabled, destructive && styles$3.destructive);
  var imageElement = null;
  if (icon) {
    imageElement = React.createElement(
      'div',
      { className: styles$3.Image, __self: this,
        __source: {
          fileName: _jsxFileName$3,
          lineNumber: 9
        }
      },
      React.createElement(Icon$2, { source: icon, __self: this,
        __source: {
          fileName: _jsxFileName$3,
          lineNumber: 10
        }
      })
    );
  } else if (image) {
    imageElement = React.createElement('div', { role: 'presentation', className: styles$3.Image, style: { backgroundImage: 'url(' + image }, __self: this,
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 14
      }
    });
  }
  var contentMarkup = ellipsis && content ? content + '\u2026' : content;
  var badgeMarkup = badge && React.createElement(
    'span',
    { className: styles$3.BadgeWrapper, __self: this,
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 17
      }
    },
    React.createElement(
      Badge$2,
      { status: badge.status, __self: this,
        __source: {
          fileName: _jsxFileName$3,
          lineNumber: 18
        }
      },
      badge.content
    )
  );
  var textMarkup = imageElement ? React.createElement(
    'div',
    { className: styles$3.Text, __self: this,
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 20
      }
    },
    contentMarkup
  ) : contentMarkup;
  var contentElement = React.createElement(
    'div',
    { className: styles$3.Content, __self: this,
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 21
      }
    },
    imageElement,
    textMarkup,
    badgeMarkup
  );
  var control = url ? React.createElement(
    UnstyledLink$2,
    { url: url, onClick: onAction, className: styles$3.Item, external: external, __self: this,
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 26
      }
    },
    contentElement
  ) : React.createElement(
    'button',
    { onClick: onAction, className: className, disabled: disabled, type: 'button', __self: this,
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 28
      }
    },
    contentElement
  );
  return React.createElement(
    'li',
    {
      __self: this,
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 31
      }
    },
    control
  );
}

var _jsxFileName$4 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ActionList/components/Section/Section.js';
function Section$1(_ref) {
    var _this = this;

    var section = _ref.section,
        hasMultipleSections = _ref.hasMultipleSections,
        onActionAnyItem = _ref.onActionAnyItem;

    var handleAction = function handleAction(itemOnAction) {
        return function () {
            if (itemOnAction) {
                itemOnAction();
            }
            if (onActionAnyItem) {
                onActionAnyItem();
            }
        };
    };
    var actionMarkup = section.items.map(function (_a, index) {
        var content = _a.content,
            onAction = _a.onAction,
            item = tslib_1.__rest(_a, ["content", "onAction"]);

        return React.createElement(Item$1, Object.assign({ key: content + '-' + index, content: content, onAction: handleAction(onAction) }, item, {
            __self: _this,
            __source: {
                fileName: _jsxFileName$4,
                lineNumber: 18
            }
        }));
    });
    var className = section.title ? null : styles$3['Section-withoutTitle'];
    var titleMarkup = section.title ? React.createElement(
        'p',
        { className: styles$3.Title, __self: this,
            __source: {
                fileName: _jsxFileName$4,
                lineNumber: 21
            }
        },
        section.title
    ) : null;
    var sectionMarkup = React.createElement(
        'div',
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$4,
                lineNumber: 22
            }
        },
        titleMarkup,
        React.createElement(
            'ul',
            { className: styles$3.Actions, __self: this,
                __source: {
                    fileName: _jsxFileName$4,
                    lineNumber: 24
                }
            },
            actionMarkup
        )
    );
    return hasMultipleSections ? React.createElement(
        'li',
        { className: styles$3.Section, __self: this,
            __source: {
                fileName: _jsxFileName$4,
                lineNumber: 26
            }
        },
        sectionMarkup
    ) : sectionMarkup;
}

var _jsxFileName$2 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ActionList/ActionList.js';
function ActionList$1(_ref) {
    var _this = this;

    var items = _ref.items,
        _ref$sections = _ref.sections,
        sections = _ref$sections === undefined ? [] : _ref$sections,
        onActionAnyItem = _ref.onActionAnyItem;

    var finalSections = [];
    if (items) {
        finalSections = [{ items: items }].concat(_toConsumableArray(sections));
    } else if (sections) {
        finalSections = sections;
    }
    var hasMultipleSections = finalSections.length > 1;
    var Element = hasMultipleSections ? 'ul' : 'div';
    var sectionMarkup = finalSections.map(function (section, index) {
        return React.createElement(Section$1, { key: section.title || index, section: section, onActionAnyItem: onActionAnyItem, hasMultipleSections: hasMultipleSections, __self: _this,
            __source: {
                fileName: _jsxFileName$2,
                lineNumber: 15
            }
        });
    });
    return React.createElement(
        Element,
        { className: styles$3.ActionList, __self: this,
            __source: {
                fileName: _jsxFileName$2,
                lineNumber: 17
            }
        },
        sectionMarkup
    );
}

var index_common = {
  colorPurpleLighter: 'rgb(246, 240, 253)',
  colorPurpleLight: 'rgb(227, 208, 255)',
  colorPurpleBase: 'rgb(156, 106, 222)',
  colorPurpleDark: 'rgb(80, 36, 143)',
  colorPurpleDarker: 'rgb(35, 0, 81)',
  colorPurpleText: 'rgb(80, 73, 90)',
  colorIndigoLighter: 'rgb(244, 245, 250)',
  colorIndigoLight: 'rgb(179, 188, 245)',
  colorIndigoBase: 'rgb(92, 106, 196)',
  colorIndigoDark: 'rgb(32, 46, 120)',
  colorIndigoDarker: 'rgb(0, 6, 57)',
  colorIndigoText: 'rgb(62, 65, 85)',
  colorBlueLighter: 'rgb(235, 245, 250)',
  colorBlueLight: 'rgb(180, 225, 250)',
  colorBlueBase: 'rgb(0, 122, 206)',
  colorBlueDark: 'rgb(8, 78, 138)',
  colorBlueDarker: 'rgb(0, 20, 41)',
  colorBlueText: 'rgb(62, 78, 87)',
  colorTealLighter: 'rgb(224, 245, 245)',
  colorTealLight: 'rgb(183, 236, 236)',
  colorTealBase: 'rgb(71, 193, 191)',
  colorTealDark: 'rgb(0, 132, 142)',
  colorTealDarker: 'rgb(0, 49, 53)',
  colorTealText: 'rgb(64, 83, 82)',
  colorGreenLighter: 'rgb(227, 241, 223)',
  colorGreenLight: 'rgb(187, 229, 179)',
  colorGreenBase: 'rgb(80, 184, 60)',
  colorGreenDark: 'rgb(16, 128, 67)',
  colorGreenDarker: 'rgb(23, 54, 48)',
  colorGreenText: 'rgb(65, 79, 62)',
  colorYellowLighter: 'rgb(252, 241, 205)',
  colorYellowLight: 'rgb(255, 234, 138)',
  colorYellowBase: 'rgb(238, 194, 0)',
  colorYellowDark: 'rgb(156, 111, 25)',
  colorYellowDarker: 'rgb(87, 59, 0)',
  colorYellowText: 'rgb(89, 81, 48)',
  colorOrangeLighter: 'rgb(252, 235, 219)',
  colorOrangeLight: 'rgb(255, 197, 139)',
  colorOrangeBase: 'rgb(244, 147, 66)',
  colorOrangeDark: 'rgb(192, 87, 23)',
  colorOrangeDarker: 'rgb(74, 21, 4)',
  colorOrangeText: 'rgb(89, 68, 48)',
  colorRedLighter: 'rgb(251, 234, 229)',
  colorRedLight: 'rgb(254, 173, 154)',
  colorRedBase: 'rgb(222, 54, 24)',
  colorRedDark: 'rgb(191, 7, 17)',
  colorRedDarker: 'rgb(51, 1, 1)',
  colorRedText: 'rgb(88, 60, 53)',
  colorWhiteBase: 'rgb(255, 255, 255)',
  colorSkyLighter: 'rgb(249, 250, 251)',
  colorSkyLight: 'rgb(244, 246, 248)',
  colorSkyBase: 'rgb(223, 227, 232)',
  colorSkyDark: 'rgb(196, 205, 213)',
  colorInkLightest: 'rgb(145, 158, 171)',
  colorInkLighter: 'rgb(99, 115, 129)',
  colorInkLight: 'rgb(69, 79, 91)',
  colorInkBase: 'rgb(33, 43, 54)',
  colorBlackBase: 'rgb(0, 0, 0)',
  spacingNone: 0,
  spacingExtraTight: '4px',
  spacingTight: '8px',
  spacingBase: '16px',
  spacingLoose: '20px',
  spacingExtraLoose: '32px',
  fontStackBase:
    "-apple-system, 'BlinkMacSystemFont', 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif",
  fontStackMonospace: "Monaco, Consolas, 'Lucida Console', monospace",
};

var polarisTokens = index_common;

var Breakpoints = {
    navBarCollapsed: '769px',
    stackedContent: '1043px'
};
var noWindowMatches = {
    media: '',
    addListener: other.noop,
    removeListener: other.noop,
    matches: false
};

function stackedContent() {
    return typeof window === 'undefined' ? noWindowMatches : window.matchMedia('(max-width: ' + Breakpoints.stackedContent + ')');
}

var StickyManager = function () {
    function StickyManager(container) {
        _classCallCheck(this, StickyManager);

        this.stickyItems = [];
        this.stuckItems = [];
        if (container) {
            this.setContainer(container);
        }
    }

    _createClass(StickyManager, [{
        key: 'registerStickyItem',
        value: function registerStickyItem(stickyItem) {
            this.stickyItems.push(stickyItem);
        }
    }, {
        key: 'unregisterStickyItem',
        value: function unregisterStickyItem(nodeToRemove) {
            var nodeIndex = this.stickyItems.findIndex(function (_ref) {
                var stickyNode = _ref.stickyNode;
                return nodeToRemove === stickyNode;
            });
            this.stickyItems.splice(nodeIndex, 1);
        }
    }, {
        key: 'setContainer',
        value: function setContainer(el) {
            this.container = el;
            events.addEventListener(this.container, 'scroll', this.handleScroll);
            events.addEventListener(window, 'resize', this.handleResize);
            this.manageStickyItems();
        }
    }, {
        key: 'removeScrollListener',
        value: function removeScrollListener() {
            if (this.container) {
                events.removeEventListener(this.container, 'scroll', this.handleScroll);
                events.removeEventListener(window, 'resize', this.handleResize);
            }
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            this.manageStickyItems();
        }
    }, {
        key: 'handleScroll',
        value: function handleScroll() {
            this.manageStickyItems();
        }
    }, {
        key: 'manageStickyItems',
        value: function manageStickyItems() {
            var _this = this;

            if (this.stickyItems.length <= 0) {
                return;
            }
            var scrollTop = scrollTopFor(this.container);
            var containerTop = geometry.getRectForNode(this.container).top;
            this.stickyItems.forEach(function (stickyItem) {
                var handlePositioning = stickyItem.handlePositioning;

                var _evaluateStickyItem = _this.evaluateStickyItem(stickyItem, scrollTop, containerTop),
                    sticky = _evaluateStickyItem.sticky,
                    top = _evaluateStickyItem.top,
                    left = _evaluateStickyItem.left,
                    width = _evaluateStickyItem.width;

                _this.updateStuckItems(stickyItem, sticky);
                handlePositioning(sticky, top, left, width);
            });
        }
    }, {
        key: 'evaluateStickyItem',
        value: function evaluateStickyItem(stickyItem, scrollTop, containerTop) {
            var stickyNode = stickyItem.stickyNode,
                placeHolderNode = stickyItem.placeHolderNode,
                boundingElement = stickyItem.boundingElement,
                offset = stickyItem.offset,
                disableWhenStacked = stickyItem.disableWhenStacked;

            if (disableWhenStacked && stackedContent().matches) {
                return {
                    sticky: false,
                    top: 0,
                    left: 0,
                    width: 'auto'
                };
            }
            var stickyOffset = offset ? this.getOffset(stickyNode) + parseInt(polarisTokens.spacingLoose, 10) : this.getOffset(stickyNode);
            var scrollPosition = scrollTop + stickyOffset;
            var placeHolderNodeCurrentTop = placeHolderNode.getBoundingClientRect().top - containerTop + scrollTop;
            var top = containerTop + stickyOffset;
            var width = placeHolderNode.getBoundingClientRect().width;
            var left = placeHolderNode.getBoundingClientRect().left;
            var sticky = void 0;
            if (boundingElement == null) {
                sticky = scrollPosition >= placeHolderNodeCurrentTop;
            } else {
                var stickyItemHeight = stickyNode.getBoundingClientRect().height;
                var stickyItemBottomPosition = boundingElement.getBoundingClientRect().bottom - stickyItemHeight + scrollTop - containerTop;
                sticky = scrollPosition >= placeHolderNodeCurrentTop && scrollPosition < stickyItemBottomPosition;
            }
            return {
                sticky: sticky,
                top: top,
                left: left,
                width: width
            };
        }
    }, {
        key: 'updateStuckItems',
        value: function updateStuckItems(item, sticky) {
            var stickyNode = item.stickyNode;

            if (sticky && !this.isNodeStuck(stickyNode)) {
                this.addStuckItem(item);
            } else if (!sticky && this.isNodeStuck(stickyNode)) {
                this.removeStuckItem(item);
            }
        }
    }, {
        key: 'addStuckItem',
        value: function addStuckItem(stickyItem) {
            this.stuckItems.push(stickyItem);
        }
    }, {
        key: 'removeStuckItem',
        value: function removeStuckItem(stickyItem) {
            var nodeToRemove = stickyItem.stickyNode;

            var nodeIndex = this.stuckItems.findIndex(function (_ref2) {
                var stickyNode = _ref2.stickyNode;
                return nodeToRemove === stickyNode;
            });
            this.stuckItems.splice(nodeIndex, 1);
        }
    }, {
        key: 'getOffset',
        value: function getOffset(node) {
            if (this.stuckItems.length === 0) {
                return 0;
            }
            var offset = 0;
            var count = 0;
            var stuckNodesLength = this.stuckItems.length;
            var nodeRect = geometry.getRectForNode(node);
            while (count < stuckNodesLength) {
                var stuckNode = this.stuckItems[count].stickyNode;
                if (stuckNode !== node) {
                    var stuckNodeRect = geometry.getRectForNode(stuckNode);
                    if (!horizontallyOverlaps(nodeRect, stuckNodeRect)) {
                        offset += geometry.getRectForNode(stuckNode).height;
                    }
                } else {
                    break;
                }
                count++;
            }
            return offset;
        }
    }, {
        key: 'isNodeStuck',
        value: function isNodeStuck(node) {
            var nodeFound = this.stuckItems.findIndex(function (_ref3) {
                var stickyNode = _ref3.stickyNode;
                return node === stickyNode;
            });
            return nodeFound >= 0;
        }
    }]);

    return StickyManager;
}();

tslib_1.__decorate([throttle(50), decorators.autobind], StickyManager.prototype, "handleResize", null);
tslib_1.__decorate([throttle(50), decorators.autobind], StickyManager.prototype, "handleScroll", null);
function isDocument(node) {
    return node === document;
}
function scrollTopFor(container) {
    return isDocument(container) ? document.body.scrollTop || document.documentElement.scrollTop : container.scrollTop;
}
function horizontallyOverlaps(rect1, rect2) {
    var rect1Left = rect1.left;
    var rect1Right = rect1.left + rect1.width;
    var rect2Left = rect2.left;
    var rect2Right = rect2.left + rect2.width;
    return rect2Right < rect1Left || rect1Right < rect2Left;
}

var polarisAppProviderContextTypes = {
    polaris: PropTypes.any,
    easdk: PropTypes.any
};

var Polaris = {"Avatar":{"label":"Avatar","labelWithInitials":"Avatar with initials {initials}"},"Badge":{"PROGRESS_LABELS":{"incomplete":"Incomplete","partiallyComplete":"Partially complete","complete":"Complete"},"STATUS_LABELS":{"info":"Info","success":"Success","warning":"Warning","attention":"Attention","new":"New"}},"Button":{"spinnerAccessibilityLabel":"Loading"},"Common":{"checkbox":"checkbox","undo":"Undo"},"DataTable":{"sortAccessibilityLabel":"sort {direction} by","navAccessibilityLabel":"Scroll table {direction} one column","totalsRowHeading":"Totals"},"DatePicker":{"previousMonth":"Show previous month, {previousMonthName} {showPreviousYear}","nextMonth":"Show next month, {nextMonth} {nextYear}","today":"Today "},"DropZone":{"overlayTextFile":"Drop file to upload","overlayTextImage":"Drop image to upload","errorOverlayTextFile":"File type is not valid","errorOverlayTextImage":"Image type is not valid","FileUpload":{"actionTitleFile":"Add file","actionTitleImage":"Add image","actionHintFile":"or drop files to upload","actionHintImage":"or drop images to upload"}},"EmptySearchResult":{"altText":"Empty search results"},"Icon":{"backdropWarning":"The {color} icon doesn’t accept backdrops. The icon colors that have backdrops are: {colorsWithBackDrops}"},"Modal":{"iFrameTitle":"body markup","modalWarning":"These required properties are missing from Modal: {missingProps}","actionWarning":"Modals inside of an embedded app will ignore: {actionWarnings}"},"Pagination":{"previous":"Previous","next":"Next","pagination":"Pagination"},"ProgressBar":{"negativeWarningMessage":"Values passed to the progress prop shouldn’t be negative. Resetting {progress} to 0.","exceedWarningMessage":"Values passed to the progress prop shouldn’t exceed 100. Setting {progress} to 100."},"ResourceList":{"sortingLabel":"Sort by","defaultItemSingular":"item","defaultItemPlural":"items","showing":"Showing {itemsCount} {resource}","loading":"Loading {resource}","selected":"{selectedItemsCount} selected","allItemsSelected":"All {itemsLength}+ {resourceNamePlural} in your store are selected.","selectAllItems":"Select all {itemsLength}+ {resourceNamePlural} in your store","emptySearchResultTitle":"No {resourceNamePlural} found","emptySearchResultDescription":"Try changing the filters or search term","selectButtonText":"Select","a11yCheckboxDeselectAllSingle":"Deselect {resourceNameSingular}","a11yCheckboxSelectAllSingle":"Select {resourceNameSingular}","a11yCheckboxDeselectAllMultiple":"Deselect all {itemsLength} {resourceNamePlural}","a11yCheckboxSelectAllMultiple":"Select all {itemsLength} {resourceNamePlural}","ariaLiveSingular":"{itemsLength} item","ariaLivePlural":"{itemsLength} items","Item":{"selectItem":"Select: {accessibilityLabel}","deselectItem":"Deselect: {accessibilityLabel}","actionsDropdown":"Actions dropdown"},"BulkActions":{"actionsActivatorLabel":"Actions","moreActionsActivatorLabel":"More actions","warningMessage":"To provide a better user experience. There should only be a maximum of {maxPromotedActions} promoted actions."},"FilterCreator":{"filterButtonLabel":"Filter","selectFilterKeyPlaceholder":"Select a filter…","addFilterButtonLabel":"Add filter","showAllWhere":"Show all {resourceNamePlural} where:"},"FilterControl":{"textFieldLabel":"Search {resourceNamePlural}"},"FilterValueSelector":{"selectFilterValuePlaceholder":"Select a filter…"},"DateSelector":{"dateFilterLabel":"Select a value","dateValueLabel":"Date","dateValueError":"Match YYYY-MM-DD format","dateValuePlaceholder":"YYYY-MM-DD","SelectOptions":{"PastWeek":"in the last week","PastMonth":"in the last month","PastQuarter":"in the last 3 months","PastYear":"in the last year","ComingWeek":"next week","ComingMonth":"next month","ComingQuarter":"in the next 3 months","ComingYear":"in the next year","OnOrBefore":"on or before","OnOrAfter":"on or after"},"FilterLabelForValue":{"past_week":"in the last week","past_month":"in the last month","past_quarter":"in the last 3 months","past_year":"in the last year","coming_week":"next week","coming_month":"next month","coming_quarter":"in the next 3 months","coming_year":"in the next year","on_or_before":"before {date}","on_or_after":"after {date}"}}},"Spinner":{"warningMessage":"The color {color} is not meant to be used on {size} spinners. The colors available on large spinners are: {colors}"},"Tag":{"ariaLabel":"Remove {children}"}};
var en = {
	Polaris: Polaris
};

var Intl = function () {
    function Intl(translation) {
        _classCallCheck(this, Intl);

        this.translation = translation;
        this.setTranslation(translation);
    }

    _createClass(Intl, [{
        key: 'setTranslation',
        value: function setTranslation(translation) {
            var i18n = Array.isArray(translation) ? merge.apply(undefined, [{}].concat(_toConsumableArray(translation))) : translation;
            this.translation = i18n ? merge({}, en, i18n) : en;
        }
    }, {
        key: 'translate',
        value: function translate$$1(id, replacements) {
            return translate(id, this.translation, replacements);
        }
    }, {
        key: 'translationKeyExists',
        value: function translationKeyExists(path) {
            return Boolean(get(this.translation, path));
        }
    }]);

    return Intl;
}();

tslib_1.__decorate([decorators.autobind], Intl.prototype, "translate", null);

var Link = function () {
    function Link(linkComponent) {
        _classCallCheck(this, Link);

        this.linkComponent = linkComponent;
    }

    _createClass(Link, [{
        key: "setLinkComponent",
        value: function setLinkComponent(link) {
            this.linkComponent = link;
        }
    }, {
        key: "getLinkComponent",
        value: function getLinkComponent() {
            return this.linkComponent;
        }
    }]);

    return Link;
}();

function transformBreadcrumb(breadcrumb, shopOrigin) {
    if (breadcrumb.content == null) {
        throw new Error('No content provided for breadcrumb (' + JSON.stringify(breadcrumb) + ')');
    }
    var target$$1 = void 0;
    if (breadcrumb.target) {
        target$$1 = breadcrumb.target;
    } else if (breadcrumb.url) {
        target$$1 = getTargetFromURL(breadcrumb.url, shopOrigin);
    } else {
        target$$1 = undefined;
    }
    return {
        label: breadcrumb.content,
        href: breadcrumb.url,
        target: target$$1,
        message: target$$1 === 'app' ? generateCallback(breadcrumb.url) : breadcrumb.onAction
    };
}
function transformAction(shopOrigin) {
    return function (action) {
        var style = void 0;
        if (action.disabled) {
            style = 'disabled';
        } else if (action.destructive) {
            style = 'danger';
        }
        var target$$1 = void 0;
        if (action.target) {
            target$$1 = action.target;
        } else if (action.url) {
            target$$1 = action.external ? 'new' : getTargetFromURL(action.url, shopOrigin);
        } else {
            target$$1 = undefined;
        }
        return {
            label: action.content,
            href: action.url,
            target: target$$1,
            message: target$$1 === 'app' ? generateCallback(action.url) : action.onAction,
            style: style
        };
    };
}
function transformActionGroup(shopOrigin) {
    return function (actionGroup) {
        return {
            type: 'dropdown',
            label: actionGroup.title,
            links: actionGroup.actions.map(transformAction(shopOrigin))
        };
    };
}
// see https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Generic_syntax for more info on the URI scheme
function getTargetFromURL(url, shopOrigin) {
    if (isRootRelative(url) || isOriginHost(url, shopOrigin)) {
        return 'shopify';
    } else if (isSameHost(url) || isFragment(url) || isRelative(url) || isSchemeRelative(url)) {
        return 'app';
    } else {
        return 'new';
    }
}
function isRootRelative(url) {
    return url.charAt(0) === '/' && url.charAt(1) !== '/';
}
function isOriginHost(url, shopOrigin) {
    return shopOrigin && url.indexOf(shopOrigin) !== -1;
}
function isSameHost(url) {
    var hostIndex = url.indexOf(window.location.hostname);
    var firstDotIndex = url.indexOf('.');
    return hostIndex >= 0 && hostIndex < firstDotIndex;
}
function isFragment(url) {
    return url.charAt(0) === '#';
}
function isRelative(url) {
    return url.charAt(0) !== '/' && url.toLowerCase().indexOf('http') !== 0;
}
function isSchemeRelative(url) {
    return url.indexOf('//') === 0;
}
function generateCallback(url) {
    if (url == null) {
        return;
    }
    return function () {
        window.location.assign(url);
    };
}
function transformPagination(pagination) {
    if (pagination == null) {
        return undefined;
    }
    var hasNext = pagination.hasNext,
        hasPrevious = pagination.hasPrevious,
        nextURL = pagination.nextURL,
        previousURL = pagination.previousURL,
        onNext = pagination.onNext,
        onPrevious = pagination.onPrevious;

    var finalPagination = {};
    if (hasNext) {
        if (onNext) {
            finalPagination.next = { message: onNext };
        } else if (nextURL) {
            finalPagination.next = { href: nextURL };
        }
    }
    if (hasPrevious) {
        if (onPrevious) {
            finalPagination.previous = { message: onPrevious };
        } else if (previousURL) {
            finalPagination.previous = { href: previousURL };
        }
    }
    return finalPagination;
}

var Bar = function () {
    function Bar(messenger) {
        _classCallCheck(this, Bar);

        this.messenger = messenger;
    }

    _createClass(Bar, [{
        key: 'update',
        value: function update(config) {
            var title = config.title,
                icon = config.icon,
                breadcrumbs = config.breadcrumbs,
                secondaryActions = config.secondaryActions,
                actionGroups = config.actionGroups,
                primaryAction = config.primaryAction,
                pagination = config.pagination;

            this.messenger.send('Shopify.API.Bar.initialize', {
                buttons: {
                    primary: primaryAction ? transformAction(this.messenger.targetOrigin)(primaryAction) : undefined,
                    secondary: [].concat(_toConsumableArray((secondaryActions || []).map(transformAction(this.messenger.targetOrigin))), _toConsumableArray((actionGroups || []).map(transformActionGroup(this.messenger.targetOrigin))))
                },
                title: title,
                icon: icon,
                breadcrumb: getLastLevelBreadcrumb(breadcrumbs, this.messenger.targetOrigin),
                pagination: transformPagination(pagination)
            });
            if (actionGroups) {
                document.addEventListener('click', this.closeDropdown);
            } else {
                document.removeEventListener('click', this.closeDropdown);
            }
        }
    }, {
        key: 'closeDropdown',
        value: function closeDropdown() {
            this.messenger.send('Shopify.API.Bar.closeDropdown');
        }
    }]);

    return Bar;
}();

tslib_1.__decorate([decorators.autobind], Bar.prototype, "closeDropdown", null);
function getLastLevelBreadcrumb(breadcrumbs, shopOrigin) {
    return breadcrumbs && breadcrumbs.length > 0 ? transformBreadcrumb(breadcrumbs[breadcrumbs.length - 1], shopOrigin) : undefined;
}

var Modal = function () {
    function Modal(messenger) {
        _classCallCheck(this, Modal);

        this.messenger = messenger;
    }

    _createClass(Modal, [{
        key: 'open',
        value: function open(config) {
            var title = config.title,
                primaryAction = config.primaryAction,
                secondaryActions = config.secondaryActions,
                src = config.src,
                width = config.width,
                height = config.height,
                onClose = config.onClose;

            if (onClose != null) {
                this.storeCloseCallback(onClose);
            }
            this.messenger.send('Shopify.API.Modal.open', {
                src: src,
                title: title,
                width: width,
                height: height,
                buttons: {
                    primary: primaryAction ? transformAction(this.messenger.targetOrigin)(primaryAction) : undefined,
                    secondary: secondaryActions ? secondaryActions.map(transformAction(this.messenger.targetOrigin)) : undefined
                }
            });
        }
    }, {
        key: 'alert',
        value: function alert(config) {
            var children = config.children,
                title = config.title,
                destructive = config.destructive,
                confirmContent = config.confirmContent,
                cancelContent = config.cancelContent,
                onClose = config.onClose,
                onConfirm = config.onConfirm;

            this.storeCloseCallback(function (result) {
                if (result) {
                    if (onConfirm) {
                        onConfirm();
                    }
                } else if (onClose) {
                    onClose();
                }
            });
            if (onClose && cancelContent) {
                this.messenger.send('Shopify.API.Modal.confirm', {
                    message: {
                        title: title,
                        message: children,
                        okButton: confirmContent,
                        cancelButton: cancelContent,
                        style: destructive ? 'danger' : undefined
                    }
                });
            } else {
                this.messenger.send('Shopify.API.Modal.alert', {
                    message: {
                        title: title,
                        message: children,
                        okButton: confirmContent,
                        style: destructive ? 'danger' : undefined
                    }
                });
            }
        }
    }, {
        key: 'close',
        value: function close(result, data) {
            if (this.closeCallback == null) {
                return;
            }
            this.messenger.send('Shopify.API.Modal.close', {
                result: result,
                data: data
            });
        }
    }, {
        key: 'storeCloseCallback',
        value: function storeCloseCallback(callback) {
            this.closeCallback = callback;
        }
    }, {
        key: 'callCloseCallback',
        value: function callCloseCallback(result, data) {
            var closeCallback = this.closeCallback;

            if (typeof closeCallback === 'function') {
                delete this.closeCallback;
                closeCallback(result, data);
            }
        }
    }]);

    return Modal;
}();

var ResourcePicker = function () {
    function ResourcePicker(messenger, modal) {
        _classCallCheck(this, ResourcePicker);

        this.messenger = messenger;
        this.modal = modal;
    }

    _createClass(ResourcePicker, [{
        key: 'close',
        value: function close() {
            this.modal.close();
        }
    }, {
        key: 'open',
        value: function open(_ref) {
            var title = _ref.title,
                products = _ref.products,
                collections = _ref.collections,
                _ref$allowMultiple = _ref.allowMultiple,
                allowMultiple = _ref$allowMultiple === undefined ? false : _ref$allowMultiple,
                _ref$showHidden = _ref.showHidden,
                showHidden = _ref$showHidden === undefined ? true : _ref$showHidden,
                onCancel = _ref.onCancel,
                onSelection = _ref.onSelection;

            this.modal.storeCloseCallback(function (success, data) {
                if (!success) {
                    if (onCancel != null) {
                        onCancel();
                    }
                    return;
                }
                if (onSelection == null) {
                    return;
                }
                onSelection(data);
            });
            var resources = [];
            if (products) {
                resources.push('products');
            }
            if (collections) {
                resources.push('collections');
            }
            if (collections) {
                this.messenger.send('Shopify.API.Modal.collectionPicker', {
                    title: title,
                    selectMultiple: allowMultiple,
                    // eslint-disable-next-line camelcase
                    show_hidden: showHidden,
                    // eslint-disable-next-line camelcase
                    selectable_resources: resources
                });
            } else {
                this.messenger.send('Shopify.API.Modal.productPicker', {
                    title: title,
                    selectMultiple: allowMultiple,
                    // eslint-disable-next-line camelcase
                    show_hidden: showHidden,
                    // eslint-disable-next-line camelcase
                    selectable_resources: resources
                });
            }
        }
    }]);

    return ResourcePicker;
}();

// eslint-disable-next-line typescript/no-var-requires
var CoreWeakMap = require('core-js/library/es6/weak-map');

var Messenger = function () {
    function Messenger(target$$1, handlers, options) {
        _classCallCheck(this, Messenger);

        this.target = target$$1;
        this.handlers = handlers;
        this.targetOrigin = '*';
        this.queue = [];
        this.callbacks = {};
        this.callbacksToID = new CoreWeakMap();
        this.callbackIndex = 0;
        if (typeof window === 'undefined') {
            return;
        }
        this.name = options.name;
        this.targetOrigin = options.targetOrigin;
        this.debug = options.debug || false;
        if (!this.targetOrigin.match(/^http(s)?:\/\//)) {
            this.warn('warning: targetOrigin should include the protocol');
        }
        window.addEventListener('message', this.handleMessage.bind(this), false);
    }

    _createClass(Messenger, [{
        key: 'setTarget',
        value: function setTarget(target$$1) {
            this.target = target$$1;
            this.tryToDequeue();
        }
    }, {
        key: 'send',
        value: function send(message, data) {
            var normalizedPayload = this.normalizePayload(data);
            var newMessage = {
                message: message,
                data: normalizedPayload
            };
            var messageString = JSON.stringify(newMessage);
            if (this.target != null) {
                this.log('Posting message: ' + messageString + ' to ' + this.targetOrigin + ' }');
                this.target.postMessage(messageString, this.targetOrigin);
            } else {
                this.log('Queueing message: ' + messageString);
                this.queue.push(newMessage);
            }
            return normalizedPayload;
        }
    }, {
        key: 'tryToDequeue',
        value: function tryToDequeue() {
            var queue = this.queue,
                target$$1 = this.target;

            if (target$$1 == null || queue.length === 0) {
                return;
            }
            this.queue.forEach(function (message) {
                target$$1.postMessage(message, '*');
            });
            this.queue.length = 0;
        }
    }, {
        key: 'log',
        value: function log(message) {
            if (!this.debug) {
                return;
            }
            // eslint-disable-next-line no-console
            console.log('[' + this.name + ' Messenger]: ' + message);
        }
    }, {
        key: 'warn',
        value: function warn(message) {
            if (!this.debug) {
                return;
            }
            // eslint-disable-next-line no-console
            console.warn('[' + this.name + ' Messenger]: ' + message);
        }
    }, {
        key: 'storeCallback',
        value: function storeCallback(callback) {
            // Optimization, so we don’t store a new callback ID for callbacks
            // we have sent before
            if (this.callbacksToID.has(callback)) {
                return this.callbacksToID.get(callback);
            }
            var id = 'EASDKCallback' + this.callbackIndex++;
            this.callbacks[id] = callback;
            this.callbacksToID.set(callback, id);
            return id;
        }
    }, {
        key: 'normalizePayload',
        value: function normalizePayload(payload) {
            var _this = this;

            if (payload == null) {
                return payload;
            }
            if (typeof payload === 'function') {
                return this.storeCallback(payload);
            } else if (payload instanceof Array) {
                return payload.map(function (newPayload) {
                    return _this.normalizePayload(newPayload);
                });
            } else if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) === 'object') {
                return Object.keys(payload).reduce(function (newPayload, key) {
                    newPayload[key] = _this.normalizePayload(payload[key]);
                    return newPayload;
                }, {});
            } else {
                return payload;
            }
        }
    }, {
        key: 'handleMessage',
        value: function handleMessage(event) {
            if (!this.isFromTargetOrigin(event)) {
                this.log('client received ' + event.data + ' from unknown origin ' + event.origin + '. Expected ' + this.targetOrigin);
                return;
            }
            this.log('Received message: ' + event.data + ' from ' + event.origin);
            var receivedMessage = void 0;
            try {
                receivedMessage = JSON.parse(event.data);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Received received invalid JSON and cannot process the message. ' + error + ' : ' + event.data + ' : ' + JSON.stringify(event.data));
                return;
            }
            if (receivedMessage.message === Messenger.Messages.SET_WINDOW_LOCATION) {
                this.windowLocation = receivedMessage.data;
            } else {
                this.invokeCallback(receivedMessage);
                this.invokeHandler(receivedMessage);
            }
        }
    }, {
        key: 'isFromTargetOrigin',
        value: function isFromTargetOrigin(_ref) {
            var origin = _ref.origin;

            return origin != null && origin === this.targetOrigin;
        }
    }, {
        key: 'invokeCallback',
        value: function invokeCallback(receivedMessage) {
            var callback = this.callbacks[receivedMessage.message];
            if (typeof callback === 'function') {
                // eslint-disable-next-line callback-return
                callback();
            }
        }
    }, {
        key: 'invokeHandler',
        value: function invokeHandler(receivedMessage) {
            var handler = this.handlers[receivedMessage.message];
            if (typeof handler === 'function') {
                handler(receivedMessage.data);
            }
        }
    }, {
        key: 'windowLocation',
        set: function set(location) {
            window.location = location;
        }
    }]);

    return Messenger;
}();

Messenger.Messages = Object.freeze({
    SET_WINDOW_LOCATION: 'Shopify.API.setWindowLocation'
});

var EASDK = function () {
    function EASDK(_ref, metadata) {
        var _this = this;

        var apiKey = _ref.apiKey,
            shopOrigin = _ref.shopOrigin,
            debug = _ref.debug,
            forceRedirect = _ref.forceRedirect;

        _classCallCheck(this, EASDK);

        checkFrameRedirect(apiKey, shopOrigin, forceRedirect);
        this.messenger = new Messenger(window.parent, {
            'Shopify.API.initialize': function ShopifyAPIInitialize(data) {
                if (data && data.User && data.User.current) {
                    _this.currentUser = data.User.current;
                }
            },
            'Shopify.API.Modal.close': function ShopifyAPIModalClose(_ref2) {
                var result = _ref2.result,
                    data = _ref2.data;

                _this.Modal.callCloseCallback(result, data);
            }
        }, {
            name: 'iframe',
            targetOrigin: shopOrigin,
            debug: debug
        });
        this.Bar = new Bar(this.messenger);
        this.Modal = new Modal(this.messenger);
        this.ResourcePicker = new ResourcePicker(this.messenger, this.Modal);
        this.messenger.send('Shopify.API.initialize', {
            apiKey: apiKey,
            shopOrigin: shopOrigin,
            metadata: metadata,
            debug: debug,
            forceRedirect: forceRedirect
        });
    }

    _createClass(EASDK, [{
        key: 'startLoading',
        value: function startLoading() {
            this.messenger.send('Shopify.API.Bar.loading.on');
        }
    }, {
        key: 'stopLoading',
        value: function stopLoading() {
            this.messenger.send('Shopify.API.Bar.loading.off');
        }
    }, {
        key: 'showFlashNotice',
        value: function showFlashNotice(message) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var _options$error = options.error,
                error = _options$error === undefined ? false : _options$error;

            var type = error ? 'Shopify.API.flash.error' : 'Shopify.API.flash.notice';
            this.messenger.send(type, { message: message });
        }
    }, {
        key: 'pushState',
        value: function pushState(location) {
            this.messenger.send('Shopify.API.pushState', { location: location });
        }
    }, {
        key: 'redirect',
        value: function redirect(location) {
            this.messenger.send('Shopify.API.redirect', { location: location });
        }
    }]);

    return EASDK;
}();

tslib_1.__decorate([decorators.autobind], EASDK.prototype, "startLoading", null);
tslib_1.__decorate([decorators.autobind], EASDK.prototype, "stopLoading", null);
tslib_1.__decorate([decorators.autobind], EASDK.prototype, "showFlashNotice", null);
tslib_1.__decorate([decorators.autobind], EASDK.prototype, "pushState", null);
tslib_1.__decorate([decorators.autobind], EASDK.prototype, "redirect", null);
function checkFrameRedirect(apiKey) {
    var shopOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://myshopify.com';
    var forceRedirect = arguments[2];

    if (window !== window.parent) {
        return;
    }
    var redirectUrl = shopOrigin + '/admin/apps/';
    if (apiKey) {
        redirectUrl = '' + redirectUrl + apiKey + window.location.pathname + window.location.search;
    }
    if (forceRedirect) {
        window.location.assign(redirectUrl);
    } else {
        // eslint-disable-next-line no-console
        console.warn('Embedded app was not loaded in an iframe and redirecting is disabled. Set forceRedirect to true and this page will redirect to: ' + redirectUrl);
    }
}

var name = "@shopify/polaris";
var description = "Shopify’s product component library";
var version = "2.12.1";
var license = "MIT";
var author = "Shopify <dev@shopify.com>";
var homepage = "https://github.com/Shopify/polaris#readme";
var repository = "https://github.com/Shopify/polaris";
var bugs = {"url":"https://github.com/Shopify/polaris/issues"};
var publishConfig = {"access":"public"};
var keywords = ["shopify","polaris","react","components","component library"];
var main = "index.js";
var module$1 = "index.es.js";
var types = "types/index.d.ts";
var scripts = {"lint":"npm-run-all lint:js lint:css","lint:css":"stylelint './**/*.scss' --max-warnings 0","lint:js":"eslint './**/*.{js,jsx,ts,tsx}' --max-warnings 0 --format codeframe","format":"npm-run-all format:js format:css format:prettier","format:css":"yarn run lint:css --fix","format:js":"yarn run lint:js --fix","format:prettier":"prettier '**/*.{json,md,yml}' --write","ts":"tsc --noEmit","test":"sewing-kit test","test:coverage":"yarn test --coverage","test:ci":"yarn test --coverage","check":"npm-run-all lint ts test","check:ci":"npm-run-all lint ts test:ci","check-types":"yarn run tsc --noEmit ./types/**/*.ts --typeRoots ./config/typescript/*.ts","clean":"rimraf build build-esnext esnext styles types docs 'build-intermediate' 'index.*' 'embedded.js' './src/styles/polaris-tokens' './tophat/.cache' './tophat/assets' 'styles.{css,scss}'","clean:build":"rimraf 'build/!(cache)' build-esnext esnext styles types docs 'build-intermediate' 'index.*' 'embedded.js' './src/styles/polaris-tokens' './tophat/.cache' './tophat/assets' 'styles.{css,scss}'","optimize":"node ./scripts/optimize.js","prebuild":"npm-run-all clean:build optimize copy-polaris-tokens","build":"babel-node ./scripts/build.js","prebuild-consumer":"npm-run-all build hide-private-readme","build-consumer":"babel-node ./scripts/build-consumer","postbuild-consumer":"yarn run show-private-readme","build-shrink-ray":"yarn run copy-polaris-tokens && node ./scripts/build-shrink-ray.js","precdn":"yarn run build","cdn:secrets":"ejson decrypt -o secrets.json secrets.ejson","cdn:deploy":"node ./scripts/deploy.js","cdn":"npm-run-all cdn:secrets cdn:deploy","public-release:secrets":"ejson decrypt -o secrets.json secrets.ejson","prepublic-release":"rimraf sandbox && yarn run public-release:secrets","public-release":"babel-node ./scripts/public-repo-deploy.js","copy-polaris-tokens":"rimraf ./src/styles/polaris-tokens && shx cp -r ./node_modules/@shopify/polaris-tokens/dist ./src/styles/polaris-tokens","hide-private-readme":"shx mv ./README.md ./public/README-private.md && shx mv ./public/README.md ./README.md","show-private-readme":"shx mv ./README.md ./public/README.md && shx mv ./public/README-private.md ./README.md ","prepublish":"in-publish && npm-run-all build hide-private-readme || :","postpublish":"in-publish && npm-run-all cdn show-private-readme public-release || :","dev":"yarn run copy-polaris-tokens && webpack-dev-server --config ./playground/webpack.config.js --content-base ./playground/ --hot --inline","dev:host":"yarn run copy-polaris-tokens && webpack-dev-server --config ./playground/webpack.config.js --content-base ./playground/ --hot --inline --host $(ipconfig getifaddr en0)","tophat":"yarn run copy-polaris-tokens && node ./tophat/index.js --watch","test:percy":"node ./tophat/snapshots.js","test:a11y":"node ./scripts/pa11y.js","start":"node ./tophat/index.js","heroku-postbuild":"yarn run copy-polaris-tokens && webpack --config ./tophat/webpack.config.js --output-path ./tophat/assets"};
var stylelint = {"extends":["stylelint-config-shopify/prettier"],"rules":{"selector-class-pattern":"^[a-zA-Z][a-zA-Z0-9-]+$","selector-pseudo-class-no-unknown":[true,{"ignorePseudoClasses":["global"]}]}};
var devDependencies = {"@babel/generator":"^7.0.0-beta.51","@babel/parser":"^7.0.0-beta.51","@babel/standalone":"^7.0.0-beta.51","@percy/puppeteer":"^0.3.2","@shopify/js-uploader":"github:shopify/js-uploader","@shopify/polaris-tokens":"^1.2.0","@shopify/react-serialize":"^1.0.6","@shopify/sewing-kit":"^0.60.0","@types/enzyme":"^3.1.14","@types/enzyme-adapter-react-16":"^1.0.3","@types/lodash":"^4.14.108","@types/lodash-decorators":"^4.0.0","@types/node":"^8.10.17","@types/react-helmet":"^5.0.6","@types/react-hot-loader":"^3.0.6","@types/react-router-dom":"^4.2.7","archiver":"^2.1.0","awesome-typescript-loader":"^3.1.3","aws-sdk":"^2.58.0","babel":"^6.23.0","babel-cli":"^6.26.0","babel-core":"^6.26.3","babel-loader":"^7.1.2","babel-plugin-transform-jsx-html":"^1.0.0","babel-plugin-transform-object-rest-spread":"^6.26.0","babel-plugin-transform-react-jsx":"^6.24.1","babel-polyfill":"^6.26.0","babel-preset-env":"^1.7.0","babel-preset-es2015":"^6.24.1","babel-preset-react":"^6.24.1","babel-preset-shopify":"^16.2.0","babel-preset-stage-0":"^6.24.1","babel-register":"^6.26.0","chalk":"^2.4.1","change-case":"^3.0.1","codecov":"^3.0.4","copyfiles":"^1.2.0","crypto":"^1.0.1","css-loader":"^0.28.3","cssnano":"^3.10.0","enzyme":"^3.7.0","enzyme-adapter-react-16":"^1.6.0","eslint":"^5.5.0","eslint-plugin-shopify":"^25.0.1","express":"^4.16.3","file-loader":"^1.1.11","fs-extra":"^4.0.2","generic-names":"^1.0.2","glob":"^7.1.2","gray-matter":"^4.0.1","identity-obj-proxy":"^3.0.0","image-webpack-loader":"^3.3.1","in-publish":"^2.0.0","isomorphic-fetch":"^2.2.1","jest-environment-jsdom-global":"^1.1.0","node-sass":"^4.5.3","npm-run-all":"^4.0.2","object-hash":"^1.3.0","pa11y":"^5.0.4","postcss":"^6.0.1","postcss-loader":"^2.0.5","postcss-modules-extract-imports":"^1.1.0","postcss-modules-local-by-default":"^1.2.0","postcss-modules-parser":"^1.1.1","postcss-modules-scope":"^1.1.0","postcss-modules-values":"^1.3.0","postcss-shopify":"^1.0.0","prettier":"^1.14.2","puppeteer":"^1.5.0","react":"^16.4.0","react-dom":"^16.4.0","react-helmet":"^5.2.0","react-router-dom":"^4.3.1","react-test-renderer":"^16.3.1","rimraf":"^2.6.1","rollup":"^0.50.0","rollup-plugin-babel":"^3.0.2","rollup-plugin-commonjs":"^8.0.2","rollup-plugin-json":"^2.1.1","rollup-plugin-node-resolve":"^3.0.0","rollup-pluginutils":"^2.0.1","sass-loader":"^7.0.3","sass-resources-loader":"^1.3.3","semver":"^5.4.1","shelljs":"^0.7.7","shx":"^0.2.2","style-loader":"^0.19.0","stylelint":"^9.5.0","stylelint-config-shopify":"^7.0.2","svgo":"^0.7.2","ts-simple-ast":"^17.1.1","tslint":"^5.8.0","typescript":"^2.9.1","url-loader":"^1.0.1","webpack":"^3.7.1","webpack-bundle-analyzer":"^2.11.1","webpack-dev-server":"^2.9.3","yargs":"^12.0.1"};
var peerDependencies = {"react":"^16.3.1","react-dom":"^16.3.1"};
var resolutions = {"ts-jest":"~23.10.4"};
var files = ["esnext","styles","types","docs","index.js","index.es.js","styles.css","styles.scss","embedded.js","embedded.d.ts"];
var dependencies = {"@shopify/images":"^1.1.0","@shopify/javascript-utilities":"^2.2.0","@shopify/react-compose":"^0.1.6","@shopify/react-html":"^3.0.3","@shopify/react-utilities":"^2.0.3","@types/prop-types":"^15.5.2","@types/react":"^16.4.7","@types/react-dom":"^16.0.6","@types/react-transition-group":"^2.0.7","babel-runtime":"^6.23.0","core-js":"^2.5.1","hoist-non-react-statics":"^2.5.0","lodash":"^4.17.4","lodash-decorators":"^4.3.5","prop-types":"^15.6.1","react-transition-group":"^2.3.0","tslib":"^1.8.0"};
var packageJSON = {
	name: name,
	description: description,
	version: version,
	license: license,
	author: author,
	homepage: homepage,
	repository: repository,
	bugs: bugs,
	publishConfig: publishConfig,
	keywords: keywords,
	main: main,
	module: module$1,
	types: types,
	scripts: scripts,
	stylelint: stylelint,
	devDependencies: devDependencies,
	peerDependencies: peerDependencies,
	resolutions: resolutions,
	files: files,
	dependencies: dependencies,
	"private": false,
	"jsnext:main": "index.es.js"
};

var _jsxFileName$5 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/AppProvider/utils/index.js';
var METADATA = {
    interface: {
        name: packageJSON.name,
        version: packageJSON.version
    }
};
var REPLACE_REGEX = /{([^}]*)}/g;
function translate(id, translations, replacements) {
    var text = get(translations, id);
    if (!text) {
        return '';
    }
    if (replacements) {
        return replace(text, REPLACE_REGEX, function (match) {
            var replacement = match.substring(1, match.length - 1);
            if (!replacements.hasOwnProperty(replacement)) {
                throw new Error('No replacement found for key \'' + replacement + '\'. The following replacements were passed: ' + Object.keys(replacements).map(function (key) {
                    return '\'' + key + '\'';
                }).join(', '));
            }
            return replacements[replacement];
        });
    }
    return text;
}
function withAppProvider() {
    return function addProvider(WrappedComponent) {
        // eslint-disable-next-line react/prefer-stateless-function
        var WithProvider = function (_React$Component) {
            _inherits(WithProvider, _React$Component);

            function WithProvider() {
                _classCallCheck(this, WithProvider);

                return _possibleConstructorReturn(this, (WithProvider.__proto__ || Object.getPrototypeOf(WithProvider)).apply(this, arguments));
            }

            _createClass(WithProvider, [{
                key: 'render',
                value: function render() {
                    var _context = this.context,
                        polaris = _context.polaris,
                        easdk = _context.easdk;

                    var polarisContext = Object.assign({}, polaris, { easdk: easdk });
                    if (!polaris) {
                        throw new Error('The <AppProvider> component is required as of v2.0 of Polaris React. See\n            https://polaris.shopify.com/components/structure/app-provider for implementation\n            instructions.');
                    }
                    return React.createElement(WrappedComponent, Object.assign({}, this.props, { polaris: polarisContext, __self: this,
                        __source: {
                            fileName: _jsxFileName$5,
                            lineNumber: 50
                        }
                    }));
                }
            }]);

            return WithProvider;
        }(React.Component);

        WithProvider.contextTypes = WrappedComponent.contextTypes ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes) : polarisAppProviderContextTypes;
        var FinalComponent = hoistStatics(WithProvider, WrappedComponent);
        return FinalComponent;
    };
}
function withSticky() {
    return function addStickyManager(WrappedComponent) {
        var WithStickyManager = function (_React$Component2) {
            _inherits(WithStickyManager, _React$Component2);

            function WithStickyManager(props, context) {
                _classCallCheck(this, WithStickyManager);

                var _this2 = _possibleConstructorReturn(this, (WithStickyManager.__proto__ || Object.getPrototypeOf(WithStickyManager)).call(this, props));

                _this2.stickyManager = new StickyManager();
                var polaris = context.polaris,
                    easdk = context.easdk;

                _this2.polarisContext = Object.assign({}, polaris, { stickyManager: _this2.stickyManager, easdk: easdk });
                return _this2;
            }

            _createClass(WithStickyManager, [{
                key: 'getChildContext',
                value: function getChildContext() {
                    var _a = this.polarisContext,
                        easdk = _a.easdk,
                        rest = tslib_1.__rest(_a, ["easdk"]);
                    return {
                        polaris: rest,
                        easdk: easdk
                    };
                }
            }, {
                key: 'render',
                value: function render() {
                    return React.createElement(WrappedComponent, Object.assign({}, this.props, { polaris: this.polarisContext, __self: this,
                        __source: {
                            fileName: _jsxFileName$5,
                            lineNumber: 77
                        }
                    }));
                }
            }]);

            return WithStickyManager;
        }(React.Component);

        WithStickyManager.childContextTypes = polarisAppProviderContextTypes;
        WithStickyManager.contextTypes = WrappedComponent.contextTypes ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes) : polarisAppProviderContextTypes;
        var FinalComponent = hoistStatics(WithStickyManager, WrappedComponent);
        return FinalComponent;
    };
}
function createPolarisContext() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        i18n = _ref.i18n,
        linkComponent = _ref.linkComponent,
        apiKey = _ref.apiKey,
        shopOrigin = _ref.shopOrigin,
        forceRedirect = _ref.forceRedirect,
        debug = _ref.debug,
        stickyManager = _ref.stickyManager;

    var intl = new Intl(i18n);
    var link = new Link(linkComponent);
    var easdk = apiKey && shopOrigin ? new EASDK({
        apiKey: apiKey,
        shopOrigin: shopOrigin,
        forceRedirect: forceRedirect,
        debug: debug
    }, METADATA) : undefined;
    return {
        polaris: {
            intl: intl,
            link: link,
            stickyManager: stickyManager || new StickyManager()
        },
        easdk: easdk
    };
}

var AppProvider$1 = function (_React$Component) {
    _inherits(AppProvider, _React$Component);

    function AppProvider(props) {
        _classCallCheck(this, AppProvider);

        var _this = _possibleConstructorReturn(this, (AppProvider.__proto__ || Object.getPrototypeOf(AppProvider)).call(this, props));

        _this.stickyManager = new StickyManager();
        _this.polarisContext = createPolarisContext(Object.assign({}, props, { stickyManager: _this.stickyManager }));
        return _this;
    }

    _createClass(AppProvider, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (document != null) {
                this.stickyManager.setContainer(document);
            }
        }
        // eslint-disable-next-line react/no-deprecated

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var i18n = _ref.i18n,
                linkComponent = _ref.linkComponent,
                apiKey = _ref.apiKey,
                shopOrigin = _ref.shopOrigin,
                forceRedirect = _ref.forceRedirect,
                debug = _ref.debug;

            if (i18n !== this.props.i18n || linkComponent !== this.props.linkComponent || apiKey !== this.props.apiKey || shopOrigin !== this.props.shopOrigin || forceRedirect !== this.props.forceRedirect || debug !== this.props.debug) {
                var stickyManager = this.stickyManager;
                this.polarisContext = createPolarisContext({
                    i18n: i18n,
                    linkComponent: linkComponent,
                    apiKey: apiKey,
                    shopOrigin: shopOrigin,
                    forceRedirect: forceRedirect,
                    debug: debug,
                    stickyManager: stickyManager
                });
            }
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return this.polarisContext;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.Children.only(this.props.children);
        }
    }]);

    return AppProvider;
}(React.Component);

AppProvider$1.childContextTypes = polarisAppProviderContextTypes;

var _jsxFileName$7 = "/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Image/Image.js";
function Image$1(_a) {
    var sourceSet = _a.sourceSet,
        source = _a.source,
        crossOrigin = _a.crossOrigin,
        rest = tslib_1.__rest(_a, ["sourceSet", "source", "crossOrigin"]);

    var finalSourceSet = sourceSet ? sourceSet.map(function (_ref) {
        var subSource = _ref.source,
            descriptor = _ref.descriptor;
        return subSource + " " + descriptor;
    }).join(',') : null;
    return finalSourceSet ?
    // eslint-disable-next-line jsx-a11y/alt-text
    React.createElement("img", Object.assign({ src: source, srcSet: finalSourceSet, crossOrigin: crossOrigin }, rest, {
        __self: this,
        __source: {
            fileName: _jsxFileName$7,
            lineNumber: 12
        }
    })) :
    // eslint-disable-next-line jsx-a11y/alt-text
    React.createElement("img", Object.assign({ src: source }, rest, { crossOrigin: crossOrigin, __self: this,
        __source: {
            fileName: _jsxFileName$7,
            lineNumber: 14
        }
    }));
}

var styles$4 = {
  "Avatar": "Polaris-Avatar",
  "sizeSmall": "Polaris-Avatar--sizeSmall",
  "sizeMedium": "Polaris-Avatar--sizeMedium",
  "sizeLarge": "Polaris-Avatar--sizeLarge",
  "styleOne": "Polaris-Avatar--styleOne",
  "styleTwo": "Polaris-Avatar--styleTwo",
  "styleThree": "Polaris-Avatar--styleThree",
  "styleFour": "Polaris-Avatar--styleFour",
  "styleFive": "Polaris-Avatar--styleFive",
  "styleSix": "Polaris-Avatar--styleSix",
  "hasImage": "Polaris-Avatar--hasImage",
  "Image": "Polaris-Avatar__Image",
  "Initials": "Polaris-Avatar__Initials",
  "Svg": "Polaris-Avatar__Svg",
};

var avatar1 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjMjQ1YjQ4IiBkPSJNMCAwaDEwMHYxMDBIMHoiLz48cGF0aCBmaWxsPSIjMmRiMTY3IiBkPSJNNjkgMHY2NS42NWwtMi0uMDF2MTkuODVsMiAuMDJWMTAwSDBWMGg2OXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNjcgNjUuNjR2MTkuODVsLTI1LjU3LS4xOUMzMiA4NS4yMiAyNS42IDgxLjQ2IDI1LjY4IDcyLjA2cy4yNS02Ljc0LjI1LTYuNzR6Ii8+PHBhdGggZmlsbD0iIzhkYzk1OCIgZD0iTTg2Ljk5IDU4SDY5VjBoMTAuOTNsNy4wNiA1OHoiLz48cGF0aCBmaWxsPSIjZWJlZGYxIiBkPSJNMjQuNTMgNDAuMjlhMTIuMjMgMTIuMjMgMCAwIDEgMjQuNDYgMCIgb3BhY2l0eT0iLjIiLz48cGF0aCBmaWxsPSIjOGRjOTU4IiBkPSJNNTkuNjIgNThBMTAuNjkgMTAuNjkgMCAwIDEgODEgNTh6Ii8+PC9zdmc+Cg==';

var avatar2 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjMWUyNjVjIiBkPSJNLS4wMSAwaDEwMHYxMDBoLTEwMHoiLz48cGF0aCBmaWxsPSIjNWQ2Y2MxIiBkPSJNLS4wMSAwaDY5LjAydjEwMEgtLjAxeiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik02OC45MyA2NS44OGwtMjQuNDQtLjE5LS4wNSA2LjA5YzAgNS4yMiAzLjQ4IDkuNDcgOC42OSA5LjUybDE1LjguMTJ6Ii8+PHBhdGggZmlsbD0iI2ZmYzA0ZCIgZD0iTTY4LjkxIDExLjNsMTkuMTcgNDYuMjktMTkuMTctLjE2VjExLjN6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0yMy4yNSAzNi40M2EzLjIyIDMuMjIgMCAxIDAgMCA2LjQ0bTIxLjAxLTYuNDRhMy4yMiAzLjIyIDAgMCAwIDAgNi40NG0tMTMuNTUgMy43NGEzLjIyIDMuMjIgMCAxIDAgMCA2LjQ0bTMuMjItMjUuNTFhMy4yMiAzLjIyIDAgMCAwIDAgNi40NCIvPjwvc3ZnPgo=';

var avatar3 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjNWQ2Y2MxIiBkPSJNLS4wMiAwaDEwMHYxMDBoLTEwMHoiLz48cGF0aCBmaWxsPSIjNmRjYWNlIiBkPSJNLjM5IDBoNjkuMDJ2MTAwSC4zOXoiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjUiIGQ9Ik0yNC4xOCAzMS4yMXYzLjQ3QTEwLjQzIDEwLjQzIDAgMCAwIDM0LjQgNDUuMjFhMTAuNDMgMTAuNDMgMCAwIDAgMTAuMjItMTAuNTN2LTMuNDciLz48cGF0aCBmaWxsPSIjZWJlZGYxIiBkPSJNMjAuMTEgNDkuMDdhMTYuMjIgMTYuMjIgMCAxIDEgMCAzMi40NCIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNNjkuNDQgMTguODNMOTAgNzFINjkuNDRWMTguODN6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTU3LjU5IDcxYTYgNiAwIDAgMSAxMiAweiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPgo=';

var avatar4 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjZmZlMGMzIiBkPSJNMC0uMDFoMTAwdjEwMEgweiIvPjxwYXRoIGZpbGw9IiM1ZDZjYzEiIGQ9Ik0wIDBoNjkuMDJ2MTAwSDB6Ii8+PHBhdGggZD0iTTY5LjAyIDBsMjQuMDMgNjEuNjlINjkuMDJWMHoiIGZpbGw9IiNmZjk2N2QiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjUiIGQ9Ik0zMC42OSAzMS45MXYtM2MwLTQuNzggMy40Ni04LjY1IDgtOC42NXM4IDMuODcgOCA4LjY1djMiLz48cGF0aCBmaWxsPSIjZWJlZGYxIiBkPSJNMTIuNzYgNTYuMDZhMTMuMzYgMTMuMzYgMCAxIDEgMjYuNzIgMCIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNODAgNjEuNDZsLTI5LjM0LjIzdi03LjMzYzAtNi4yOCA0LjA3LTExLjM2IDEwLjM0LTExLjQ0bDE5LS4xNHoiIGZpbGw9IiNmZjk2N2QiLz48L3N2Zz4K';

var avatar5 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjOGRjOTU4IiBkPSJNMCAwaDcwLjAydjEwMEgweiIvPjxwYXRoIGQ9Ik02OS45MiAwdjU2LjMyTDQ5IDY3bC0uMyAyNS4wN1YxMDBIMTAwVjB6IiBmaWxsPSIjMmRiMTY3Ii8+PHBhdGggZmlsbD0iIzI0NWI0OCIgZD0iTTU5LjI3IDU4LjI5YTUuMjIgNS4yMiAwIDAgMC05LjQzIDQuNDgiLz48cGF0aCBkPSJNMjcuMTIgOS4zM2g0NC41M3YyLjE5SDI3LjEyem0tMTIuNDEgOS40OWg1Ni45NHYyLjE5SDE0LjcxeiIgZmlsbD0iIzJkYjE2NyIvPjxjaXJjbGUgY3g9IjE5LjY2IiBjeT0iNDQuOCIgcj0iMTEuMjIiIGZpbGw9IiNlYmVkZjEiIG9wYWNpdHk9Ii4yIi8+PC9zdmc+Cg==';

var avatar6 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNLS4wMi0uMDFoMTAwdjEwMGgtMTAweiIgZmlsbD0iI2ZmZTBjMyIvPjxwYXRoIGZpbGw9IiNmZjk2N2QiIGQ9Ik0wIDBoNjkuNDF2MTAwSDB6Ii8+PHBhdGggZD0iTTY5LjkyIDB2NDQuMzJMNTEuMzQgNTV2NDVIMTAwVjB6IiBmaWxsPSIjZmZlMGMzIi8+PHBhdGggZmlsbD0iIzMyY2FjNiIgZD0iTTM5LjMyIDc2YTExLjg1IDExLjg1IDAgMCAwIDEyIDExLjYyVjc2Ii8+PHBhdGggZmlsbD0iIzAwOTc5NiIgZD0iTTM5LjMyIDc2YTEyIDEyIDAgMCAxIDEyLTExLjgyVjc2Ii8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSI1IiBkPSJNNDMuNzQgMTkuODNhMTIuODIgMTIuODIgMCAxIDEtMjUuNjQgMCIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iNCIgZD0iTTI3LjM5IDMxLjZsLTEuNTggNS45Nm05LjM3LTUuNzJsMi41NSA1LjQ3bTQuMjYtOS44NWwzLjUzIDQuNW0tMjUuNDMtNC41bC0zLjUzIDQuNSIvPjwvc3ZnPgo=';

var avatar7 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMCAwaDEwMHYxMDAuNDhIMHoiIGZpbGw9IiM4ZGM5NTgiLz48cGF0aCBmaWxsPSIjMmRiMTY3IiBkPSJNODMgNjh2MzJsLTE0LS4xNnYuMTZIMFYwaDY5djY4aDE0eiIvPjxwYXRoIGQ9Ik02OS4yOSA0MS42OUgyMC42NnMtLjA5LTMtLjE3IDcuMTUgNyAxOC41MSAxNy4zNSAxOC41OWwzMS40NS41N3oiIGZpbGw9IiM4ZGM5NTgiLz48cGF0aCBkPSJNNjguNyAxMi40bDExLjU0IDI5LjI5SDY4LjdWMTIuNHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNjIuMjIgNDEuNjlhMy4zNCAzLjM0IDAgMSAxIDYuNjkgMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBmaWxsPSIjMjQ1YjQ4IiBkPSJNNDEuNDUgMTguMDZhMi41NyAyLjU3IDAgMCAwLTUuMTQgME0zMy4zMyAyNGEyLjU3IDIuNTcgMCAxIDAtNS4xNCAwbTIwLjM2IDIuNThhMi41NyAyLjU3IDAgMSAwLTUuMTQgMCIvPjwvc3ZnPgo=';

var avatar8 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjZmZlZGI5IiBkPSJNMCAwaDEwMHYxMDBIMHoiLz48cGF0aCBkPSJNNjQuNjMgMTcuMzNhMTcgMTcgMCAwIDEgNSAyOS43MiAxNi43NSAxNi43NSAwIDAgMS01IDIuNjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjUiLz48cGF0aCBmaWxsPSIjZmZjMDRkIiBkPSJNMCAwaDY5LjAydjEwMEgweiIvPjxjaXJjbGUgY3g9IjQ1LjExIiBjeT0iMzMuNDkiIHI9IjE2Ljk4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtMzcuMDIgNDUuMTI0IDMzLjQ5MykiLz48cGF0aCBmaWxsPSIjNWQ2Y2MxIiBkPSJNNjkuMDIgMzQuNDhsMTkuNDcgMzguNzQtMTkuNDcgMS41M1YzNC40OHoiLz48cGF0aCBkPSJNNjEuNiAzMy42N2ExMC4xNyAxMC4xNyAwIDAgMSAxNS40LjA4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSI1Ii8+PC9zdmc+Cg==';

var avatar9 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMCAwaDEwMHYxMDBIMHoiIGZpbGw9IiNmZmMwNGQiLz48cGF0aCBkPSJNMCAwaDY5LjQxdjEwMEgweiIgZmlsbD0iIzVkNmNjMSIvPjxwYXRoIGQ9Ik03MC4yMSA4MC44OGgtMTUuMWMtNC44MSAwLTUuNjgtNS44NC01LjY4LTUuODRoMjAuNzgiIGZpbGw9IiNmZmMwNGQiLz48cGF0aCBkPSJNODIgNjAuNDhsLTE0IC4yNVYwaDEwLjE3QzgwLjU5IDIwLjE0IDgyIDYwLjQ4IDgyIDYwLjQ4eiIgZmlsbD0iIzVkNmNjMSIvPjxwYXRoIGZpbGw9IiM0MTIzNmUiIGQ9Ik01Ny43MSA2MC40OGE1LjQ0IDUuNDQgMCAxIDEgMTAuODcgMCIvPjxjaXJjbGUgY3g9IjI0Ljc3IiBjeT0iNDAuMTkiIHI9IjExLjIyIiBmaWxsPSIjZWJlZGYxIiBvcGFjaXR5PSIuMiIvPjwvc3ZnPgo=';



var avatars = Object.freeze({
	avatarOne: avatar1,
	avatarTwo: avatar2,
	avatarThree: avatar3,
	avatarFour: avatar4,
	avatarFive: avatar5,
	avatarSix: avatar6,
	avatarSeven: avatar7,
	avatarEight: avatar8,
	avatarNine: avatar9
});

var _jsxFileName$6 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Avatar/Avatar.js';
var STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five', 'six'];
var AVATAR_IMAGES = Object.keys(avatars).map(function (key) {
    return avatars[key];
});
function Avatar$1(_ref) {
    var name = _ref.name,
        source = _ref.source,
        initials = _ref.initials,
        customer = _ref.customer,
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 'medium' : _ref$size,
        accessibilityLabel = _ref.accessibilityLabel,
        intl = _ref.polaris.intl;

    var nameString = name || initials;
    var finalSource = void 0;
    var label = void 0;
    if (accessibilityLabel) {
        label = accessibilityLabel;
    } else if (name) {
        label = name;
    } else if (initials) {
        var splitInitials = initials.split('').join(' ');
        label = intl.translate('Polaris.Avatar.labelWithInitials', {
            initials: splitInitials
        });
    } else {
        label = intl.translate('Polaris.Avatar.label');
    }
    if (source) {
        finalSource = source;
    } else if (customer) {
        finalSource = customerPlaceholder(nameString);
    }
    var className = styles.classNames(styles$4.Avatar, styles$4[styles.variationName('style', styleClass(nameString))], size && styles$4[styles.variationName('size', size)], finalSource && styles$4.hasImage);
    var imageMarkUp = finalSource ? React.createElement(Image$1, { className: styles$4.Image, source: finalSource, alt: '', role: 'presentation', __self: this,
        __source: {
            fileName: _jsxFileName$6,
            lineNumber: 35
        }
    }) : null;
    // Use `dominant-baseline: central` instead of `dy` when Edge supports it.
    var verticalOffset = '0.35em';
    var initialsMarkup = initials ? React.createElement(
        'span',
        { className: styles$4.Initials, __self: this,
            __source: {
                fileName: _jsxFileName$6,
                lineNumber: 38
            }
        },
        React.createElement(
            'svg',
            { className: styles$4.Svg, viewBox: '0 0 48 48', __self: this,
                __source: {
                    fileName: _jsxFileName$6,
                    lineNumber: 39
                }
            },
            React.createElement(
                'text',
                { x: '50%', y: '50%', dy: verticalOffset, fill: 'currentColor', fontSize: '26', textAnchor: 'middle', __self: this,
                    __source: {
                        fileName: _jsxFileName$6,
                        lineNumber: 40
                    }
                },
                initials
            )
        )
    ) : null;
    return React.createElement(
        'span',
        { 'aria-label': label, role: 'img', className: className, __self: this,
            __source: {
                fileName: _jsxFileName$6,
                lineNumber: 45
            }
        },
        initialsMarkup,
        imageMarkUp
    );
}
function styleClass(name) {
    return name ? STYLE_CLASSES[name.charCodeAt(0) % STYLE_CLASSES.length] : STYLE_CLASSES[0];
}
function customerPlaceholder(name) {
    return name ? AVATAR_IMAGES[name.charCodeAt(0) % AVATAR_IMAGES.length] : AVATAR_IMAGES[0];
}
withAppProvider()(Avatar$1);

var styles$5 = {
  "VisuallyHidden": "Polaris-VisuallyHidden",
};

var _jsxFileName$9 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/VisuallyHidden/VisuallyHidden.js';
function VisuallyHidden$1(_ref) {
    var children = _ref.children;

    return React.createElement(
        'span',
        { className: styles$5.VisuallyHidden, __self: this,
            __source: {
                fileName: _jsxFileName$9,
                lineNumber: 4
            }
        },
        children
    );
}

var styles$6 = {
  "Badge": "Polaris-Badge",
  "Pip": "Polaris-Badge__Pip",
  "statusSuccess": "Polaris-Badge--statusSuccess",
  "statusInfo": "Polaris-Badge--statusInfo",
  "statusAttention": "Polaris-Badge--statusAttention",
  "statusWarning": "Polaris-Badge--statusWarning",
  "statusNew": "Polaris-Badge--statusNew",
  "progressIncomplete": "Polaris-Badge--progressIncomplete",
  "progressPartiallyComplete": "Polaris-Badge--progressPartiallyComplete",
  "progressComplete": "Polaris-Badge--progressComplete",
};

var _jsxFileName$8 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Badge/Badge.js';
var PROGRESS_LABELS = {
    incomplete: 'incomplete',
    partiallyComplete: 'partiallyComplete',
    complete: 'complete'
};
var STATUS_LABELS = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    attention: 'attention',
    new: 'new'
};
function Badge$1(_ref) {
    var children = _ref.children,
        status = _ref.status,
        progress = _ref.progress,
        intl = _ref.polaris.intl;

    var className = styles.classNames(styles$6.Badge, status && styles$6[styles.variationName('status', status)], progress && styles$6[styles.variationName('progress', progress)]);
    var progressMarkup = void 0;
    switch (progress) {
        case PROGRESS_LABELS.incomplete:
            progressMarkup = intl.translate('Polaris.Badge.PROGRESS_LABELS.incomplete');
            break;
        case PROGRESS_LABELS.partiallyComplete:
            progressMarkup = intl.translate('Polaris.Badge.PROGRESS_LABELS.partiallyComplete');
            break;
        case PROGRESS_LABELS.complete:
            progressMarkup = intl.translate('Polaris.Badge.PROGRESS_LABELS.complete');
            break;
    }
    var pipMarkup = progress ? React.createElement(
        'span',
        { className: styles$6.Pip, __self: this,
            __source: {
                fileName: _jsxFileName$8,
                lineNumber: 32
            }
        },
        React.createElement(
            VisuallyHidden$1,
            {
                __self: this,
                __source: {
                    fileName: _jsxFileName$8,
                    lineNumber: 33
                }
            },
            progressMarkup
        )
    ) : null;
    var statusMarkup = void 0;
    switch (status) {
        case STATUS_LABELS.info:
            statusMarkup = intl.translate('Polaris.Badge.STATUS_LABELS.info');
            break;
        case STATUS_LABELS.success:
            statusMarkup = intl.translate('Polaris.Badge.STATUS_LABELS.success');
            break;
        case STATUS_LABELS.warning:
            statusMarkup = intl.translate('Polaris.Badge.STATUS_LABELS.warning');
            break;
        case STATUS_LABELS.attention:
            statusMarkup = intl.translate('Polaris.Badge.STATUS_LABELS.attention');
            break;
        case STATUS_LABELS.new:
            statusMarkup = intl.translate('Polaris.Badge.STATUS_LABELS.new');
            break;
    }
    var statusLabelMarkup = status ? React.createElement(
        VisuallyHidden$1,
        {
            __self: this,
            __source: {
                fileName: _jsxFileName$8,
                lineNumber: 53
            }
        },
        statusMarkup
    ) : null;
    return React.createElement(
        'span',
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$8,
                lineNumber: 54
            }
        },
        statusLabelMarkup,
        pipMarkup,
        children
    );
}
var Badge$2 = withAppProvider()(Badge$1);

/* eslint-disable shopify/typescript/prefer-pascal-case-enums */
// eslint-disable-next-line shopify/typescript/prefer-singular-enums
var Keys;
(function (Keys) {
    Keys[Keys["BACKSPACE"] = 8] = "BACKSPACE";
    Keys[Keys["TAB"] = 9] = "TAB";
    Keys[Keys["ENTER"] = 13] = "ENTER";
    Keys[Keys["SHIFT"] = 16] = "SHIFT";
    Keys[Keys["CTRL"] = 17] = "CTRL";
    Keys[Keys["ALT"] = 18] = "ALT";
    Keys[Keys["PAUSE"] = 19] = "PAUSE";
    Keys[Keys["CAPS_LOCK"] = 20] = "CAPS_LOCK";
    Keys[Keys["ESCAPE"] = 27] = "ESCAPE";
    Keys[Keys["SPACE"] = 32] = "SPACE";
    Keys[Keys["PAGE_UP"] = 33] = "PAGE_UP";
    Keys[Keys["PAGE_DOWN"] = 34] = "PAGE_DOWN";
    Keys[Keys["END"] = 35] = "END";
    Keys[Keys["HOME"] = 36] = "HOME";
    Keys[Keys["LEFT_ARROW"] = 37] = "LEFT_ARROW";
    Keys[Keys["UP_ARROW"] = 38] = "UP_ARROW";
    Keys[Keys["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    Keys[Keys["DOWN_ARROW"] = 40] = "DOWN_ARROW";
    Keys[Keys["INSERT"] = 45] = "INSERT";
    Keys[Keys["DELETE"] = 46] = "DELETE";
    Keys[Keys["KEY_0"] = 48] = "KEY_0";
    Keys[Keys["KEY_1"] = 49] = "KEY_1";
    Keys[Keys["KEY_2"] = 50] = "KEY_2";
    Keys[Keys["KEY_3"] = 51] = "KEY_3";
    Keys[Keys["KEY_4"] = 52] = "KEY_4";
    Keys[Keys["KEY_5"] = 53] = "KEY_5";
    Keys[Keys["KEY_6"] = 54] = "KEY_6";
    Keys[Keys["KEY_7"] = 55] = "KEY_7";
    Keys[Keys["KEY_8"] = 56] = "KEY_8";
    Keys[Keys["KEY_9"] = 57] = "KEY_9";
    Keys[Keys["KEY_A"] = 65] = "KEY_A";
    Keys[Keys["KEY_B"] = 66] = "KEY_B";
    Keys[Keys["KEY_C"] = 67] = "KEY_C";
    Keys[Keys["KEY_D"] = 68] = "KEY_D";
    Keys[Keys["KEY_E"] = 69] = "KEY_E";
    Keys[Keys["KEY_F"] = 70] = "KEY_F";
    Keys[Keys["KEY_G"] = 71] = "KEY_G";
    Keys[Keys["KEY_H"] = 72] = "KEY_H";
    Keys[Keys["KEY_I"] = 73] = "KEY_I";
    Keys[Keys["KEY_J"] = 74] = "KEY_J";
    Keys[Keys["KEY_K"] = 75] = "KEY_K";
    Keys[Keys["KEY_L"] = 76] = "KEY_L";
    Keys[Keys["KEY_M"] = 77] = "KEY_M";
    Keys[Keys["KEY_N"] = 78] = "KEY_N";
    Keys[Keys["KEY_O"] = 79] = "KEY_O";
    Keys[Keys["KEY_P"] = 80] = "KEY_P";
    Keys[Keys["KEY_Q"] = 81] = "KEY_Q";
    Keys[Keys["KEY_R"] = 82] = "KEY_R";
    Keys[Keys["KEY_S"] = 83] = "KEY_S";
    Keys[Keys["KEY_T"] = 84] = "KEY_T";
    Keys[Keys["KEY_U"] = 85] = "KEY_U";
    Keys[Keys["KEY_V"] = 86] = "KEY_V";
    Keys[Keys["KEY_W"] = 87] = "KEY_W";
    Keys[Keys["KEY_X"] = 88] = "KEY_X";
    Keys[Keys["KEY_Y"] = 89] = "KEY_Y";
    Keys[Keys["KEY_Z"] = 90] = "KEY_Z";
    Keys[Keys["LEFT_META"] = 91] = "LEFT_META";
    Keys[Keys["RIGHT_META"] = 92] = "RIGHT_META";
    Keys[Keys["SELECT"] = 93] = "SELECT";
    Keys[Keys["NUMPAD_0"] = 96] = "NUMPAD_0";
    Keys[Keys["NUMPAD_1"] = 97] = "NUMPAD_1";
    Keys[Keys["NUMPAD_2"] = 98] = "NUMPAD_2";
    Keys[Keys["NUMPAD_3"] = 99] = "NUMPAD_3";
    Keys[Keys["NUMPAD_4"] = 100] = "NUMPAD_4";
    Keys[Keys["NUMPAD_5"] = 101] = "NUMPAD_5";
    Keys[Keys["NUMPAD_6"] = 102] = "NUMPAD_6";
    Keys[Keys["NUMPAD_7"] = 103] = "NUMPAD_7";
    Keys[Keys["NUMPAD_8"] = 104] = "NUMPAD_8";
    Keys[Keys["NUMPAD_9"] = 105] = "NUMPAD_9";
    Keys[Keys["MULTIPLY"] = 106] = "MULTIPLY";
    Keys[Keys["ADD"] = 107] = "ADD";
    Keys[Keys["SUBTRACT"] = 109] = "SUBTRACT";
    Keys[Keys["DECIMAL"] = 110] = "DECIMAL";
    Keys[Keys["DIVIDE"] = 111] = "DIVIDE";
    Keys[Keys["F1"] = 112] = "F1";
    Keys[Keys["F2"] = 113] = "F2";
    Keys[Keys["F3"] = 114] = "F3";
    Keys[Keys["F4"] = 115] = "F4";
    Keys[Keys["F5"] = 116] = "F5";
    Keys[Keys["F6"] = 117] = "F6";
    Keys[Keys["F7"] = 118] = "F7";
    Keys[Keys["F8"] = 119] = "F8";
    Keys[Keys["F9"] = 120] = "F9";
    Keys[Keys["F10"] = 121] = "F10";
    Keys[Keys["F11"] = 122] = "F11";
    Keys[Keys["F12"] = 123] = "F12";
    Keys[Keys["NUM_LOCK"] = 144] = "NUM_LOCK";
    Keys[Keys["SCROLL_LOCK"] = 145] = "SCROLL_LOCK";
    Keys[Keys["SEMICOLON"] = 186] = "SEMICOLON";
    Keys[Keys["EQUALS"] = 187] = "EQUALS";
    Keys[Keys["COMMA"] = 188] = "COMMA";
    Keys[Keys["DASH"] = 189] = "DASH";
    Keys[Keys["PERIOD"] = 190] = "PERIOD";
    Keys[Keys["FORWARD_SLASH"] = 191] = "FORWARD_SLASH";
    Keys[Keys["GRAVE_ACCENT"] = 192] = "GRAVE_ACCENT";
    Keys[Keys["OPEN_BRACKET"] = 219] = "OPEN_BRACKET";
    Keys[Keys["BACK_SLASH"] = 220] = "BACK_SLASH";
    Keys[Keys["CLOSE_BRACKET"] = 221] = "CLOSE_BRACKET";
    Keys[Keys["SINGLE_QUOTE"] = 222] = "SINGLE_QUOTE";
})(Keys || (Keys = {}));
/* eslint-enable shopify/typescript/prefer-pascal-case-enums */
var contentContextTypes = {
    withinContentContainer: PropTypes.bool
};

function handleMouseUpByBlurring(_ref) {
    var currentTarget = _ref.currentTarget;

    currentTarget.blur();
}

var scrollable = {
    props: { 'data-polaris-scrollable': true },
    selector: '[data-polaris-scrollable]'
};
var overlay = {
    props: { 'data-polaris-overlay': true },
    selector: '[data-polaris-overlay]'
};
var layer = {
    props: { 'data-polaris-layer': true },
    selector: '[data-polaris-layer]'
};
var unstyled = {
    props: { 'data-polaris-unstyled': true },
    selector: '[data-polaris-unstyled]'
};
// these match our values in duration.scss
var Duration;
(function (Duration) {
    Duration[Duration["Instant"] = 0] = "Instant";
    Duration[Duration["Fast"] = 100] = "Fast";
    Duration[Duration["Base"] = 200] = "Base";
    Duration[Duration["Slow"] = 300] = "Slow";
    Duration[Duration["Slower"] = 400] = "Slower";
    Duration[Duration["Slowest"] = 500] = "Slowest";
})(Duration || (Duration = {}));

var _React$createContext = React.createContext({
    forwardedRef: null
});
var Provider = _React$createContext.Provider;
var Consumer = _React$createContext.Consumer;

var _jsxFileName$14 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/WithRef/WithRef.js';
function withRef$1() {
    return function addForwardRef(WrappedComponent) {
        // eslint-disable-next-line react/prefer-stateless-function
        var WithRef = function (_React$Component) {
            _inherits(WithRef, _React$Component);

            function WithRef() {
                _classCallCheck(this, WithRef);

                return _possibleConstructorReturn(this, (WithRef.__proto__ || Object.getPrototypeOf(WithRef)).apply(this, arguments));
            }

            _createClass(WithRef, [{
                key: 'render',
                value: function render() {
                    var _this2 = this;

                    return React.createElement(
                        Consumer,
                        {
                            __self: this,
                            __source: {
                                fileName: _jsxFileName$14,
                                lineNumber: 9
                            }
                        },
                        function (ctx) {
                            return React.createElement(WrappedComponent, Object.assign({}, _this2.props, { ref: ctx.forwardedRef, __self: _this2,
                                __source: {
                                    fileName: _jsxFileName$14,
                                    lineNumber: 10
                                }
                            }));
                        }
                    );
                }
            }]);

            return WithRef;
        }(React.Component);

        var FinalComponent = hoistStatics(WithRef, WrappedComponent);
        return FinalComponent;
    };
}

var _jsxFileName$13 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/utilities/react-compose.js';
// eslint-disable-next-line shopify/strict-component-boundaries
function compose$1() {
    for (var _len = arguments.length, wrappingFunctions = Array(_len), _key = 0; _key < _len; _key++) {
        wrappingFunctions[_key] = arguments[_key];
    }

    return function wrapComponent(OriginalComponent) {
        var _this = this;

        var Result = compose.apply(undefined, wrappingFunctions)(OriginalComponent);
        return React.forwardRef(function (props, ref) {
            return React.createElement(
                Provider,
                { value: { forwardedRef: ref }, __self: _this,
                    __source: {
                        fileName: _jsxFileName$13,
                        lineNumber: 9
                    }
                },
                React.createElement(Result, Object.assign({}, props, {
                    __self: _this,
                    __source: {
                        fileName: _jsxFileName$13,
                        lineNumber: 10
                    }
                }))
            );
        });
    };
}

var _jsxFileName$12 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/UnstyledLink/UnstyledLink.js';
var UnstyledLink$1 = function (_React$PureComponent) {
    _inherits(UnstyledLink, _React$PureComponent);

    function UnstyledLink() {
        _classCallCheck(this, UnstyledLink);

        return _possibleConstructorReturn(this, (UnstyledLink.__proto__ || Object.getPrototypeOf(UnstyledLink)).apply(this, arguments));
    }

    _createClass(UnstyledLink, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                polaris = _a.polaris,
                external = _a.external,
                url = _a.url,
                rest = tslib_1.__rest(_a, ["polaris", "external", "url"]);
            if (polaris && polaris.link) {
                var LinkComponent = polaris.link.getLinkComponent();
                if (LinkComponent) {
                    var _b = this.props,
                        _polaris = _b.polaris,
                        _rest = tslib_1.__rest(_b, ["polaris"]);
                    return React.createElement(LinkComponent, Object.assign({}, unstyled.props, _rest, {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$12,
                            lineNumber: 14
                        }
                    }));
                }
            }
            var target$$1 = external ? '_blank' : undefined;
            var rel = external ? 'noopener noreferrer' : undefined;
            return React.createElement('a', Object.assign({ target: target$$1 }, rest, { href: url, rel: rel }, unstyled.props, {
                __self: this,
                __source: {
                    fileName: _jsxFileName$12,
                    lineNumber: 19
                }
            }));
        }
    }]);

    return UnstyledLink;
}(React.PureComponent);
var UnstyledLink$2 = compose$1(withAppProvider(), withRef$1())(UnstyledLink$1);

var add = {"viewBox":"0 0 20 20","body":"<path d=\"M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2\"  fill-rule=\"evenodd\"/>"};

var alert = {"viewBox":"0 0 20 20","body":"<path d=\"M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8h2V6H9v4zm0 4h2v-2H9v2z\"  fill-rule=\"evenodd\"/>"};

var arrowDown = {"viewBox":"0 0 20 20","body":"<path d=\"M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0\"  fill-rule=\"evenodd\"/>"};

var arrowLeft = {"viewBox":"0 0 20 20","body":"<path d=\"M17 9H5.414l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L5.414 11H17a1 1 0 1 0 0-2\"  fill-rule=\"evenodd\"/>"};

var arrowRight = {"viewBox":"0 0 20 20","body":"<path d=\"M17.707 9.293l-5-5a.999.999 0 1 0-1.414 1.414L14.586 9H3a1 1 0 1 0 0 2h11.586l-3.293 3.293a.999.999 0 1 0 1.414 1.414l5-5a.999.999 0 0 0 0-1.414\"  fill-rule=\"evenodd\"/>"};

var arrowUp = {"viewBox":"0 0 20 20","body":"<path d=\"M11 17V5.414l3.293 3.293a.999.999 0 1 0 1.414-1.414l-5-5a.999.999 0 0 0-1.414 0l-5 5a.997.997 0 0 0 0 1.414.999.999 0 0 0 1.414 0L9 5.414V17a1 1 0 1 0 2 0\"  fill-rule=\"evenodd\"/>"};

var arrowUpDown = {"viewBox":"0 0 20 20","body":"<path d=\"M13 8l-3-3-3 3h6zm-.1 4L10 14.9 7.1 12h5.8z\"  fill-rule=\"evenodd\"/>"};

var calendar = {"viewBox":"0 0 20 20","body":"<path d=\"M4 8h12V6H4v2zm9 4h2v-2h-2v2zm-4 0h2v-2H9v2zm0 4h2v-2H9v2zm-4-4h2v-2H5v2zm0 4h2v-2H5v2zM17 4h-2V3a1 1 0 1 0-2 0v1H7V3a1 1 0 1 0-2 0v1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z\"  fill-rule=\"evenodd\"/>"};

var cancel = {"viewBox":"0 0 20 20","body":"<path d=\"M11.414 10l6.293-6.293a.999.999 0 1 0-1.414-1.414L10 8.586 3.707 2.293a.999.999 0 1 0-1.414 1.414L8.586 10l-6.293 6.293a.999.999 0 1 0 1.414 1.414L10 11.414l6.293 6.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z\"  fill-rule=\"evenodd\"/>"};

var cancelSmall = {"viewBox":"0 0 20 20","body":"<path d=\"M11.414 10l4.293-4.293a.999.999 0 1 0-1.414-1.414L10 8.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a.999.999 0 1 0 1.414 1.414L10 11.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z\"  fill-rule=\"evenodd\"/>"};

var caretDown = {"viewBox":"0 0 20 20","body":"<path d=\"M5 8l5 5 5-5z\"  fill-rule=\"evenodd\"/>"};

var caretUp = {"viewBox":"0 0 20 20","body":"<path d=\"M15 12l-5-5-5 5z\" />"};

var checkmark = {"viewBox":"0 0 20 20","body":"<path d=\"M8.315 13.859l-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.437.437 0 0 1 .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0\"/>"};

var chevronDown = {"viewBox":"0 0 20 20","body":"<path d=\"M10 14a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 1 1 1.414-1.414L10 11.586l4.293-4.293a.999.999 0 1 1 1.414 1.414l-5 5A.997.997 0 0 1 10 14\"  fill-rule=\"evenodd\"/>"};

var chevronLeft = {"viewBox":"0 0 20 20","body":"<path d=\"M12 16a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L8.414 10l4.293 4.293A.999.999 0 0 1 12 16\"  fill-rule=\"evenodd\"/>"};

var chevronRight = {"viewBox":"0 0 20 20","body":"<path d=\"M8 16a.999.999 0 0 1-.707-1.707L11.586 10 7.293 5.707a.999.999 0 1 1 1.414-1.414l5 5a.999.999 0 0 1 0 1.414l-5 5A.997.997 0 0 1 8 16\"  fill-rule=\"evenodd\"/>"};

var chevronUp = {"viewBox":"0 0 20 20","body":"<path d=\"M15 13a.997.997 0 0 1-.707-.293L10 8.414l-4.293 4.293a.999.999 0 1 1-1.414-1.414l5-5a.999.999 0 0 1 1.414 0l5 5A.999.999 0 0 1 15 13\"  fill-rule=\"evenodd\"/>"};

var circleCancel = {"viewBox":"0 0 20 20","body":"<path d=\"M14.242 12.829l-1.414 1.414L10 11.413l-2.828 2.83-1.414-1.414 2.828-2.83-2.828-2.827 1.414-1.414L10 8.586l2.828-2.828 1.414 1.414L11.414 10l2.828 2.829zM10 1.999A8 8 0 1 0 10 18a8 8 0 0 0 0-16z\"  fill-rule=\"evenodd\"/>"};

var circleChevronDown = {"viewBox":"0 0 20 20","body":"<path d=\"M10 13.414L5.293 8.707l1.414-1.414L10 10.586l3.293-3.293 1.414 1.414L10 13.414zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z\"  fill-rule=\"evenodd\"/>"};

var circleChevronLeft = {"viewBox":"0 0 20 20","body":"<path d=\"M11.293 5.293l1.414 1.414L9.414 10l3.293 3.293-1.414 1.414L6.586 10l4.707-4.707zM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z\"  fill-rule=\"evenodd\"/>"};

var circleChevronRight = {"viewBox":"0 0 20 20","body":"<path d=\"M8.707 14.707l-1.414-1.414L10.586 10 7.293 6.707l1.414-1.414L13.414 10l-4.707 4.707zM10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z\"  fill-rule=\"evenodd\"/>"};

var circleChevronUp = {"viewBox":"0 0 20 20","body":"<path d=\"M14.707 11.293l-1.414 1.414L10 9.414l-3.293 3.293-1.414-1.414L10 6.586l4.707 4.707zM18 10a8 8 0 1 0-16 0 8 8 0 0 0 16 0z\"  fill-rule=\"evenodd\"/>"};

var circleInformation = {"viewBox":"0 0 20 20","body":"<path d=\"M19 10c0 4.971-4.029 9-9 9s-9-4.029-9-9 4.029-9 9-9 9 4.029 9 9z\" fill=\"currentColor\"/><path d=\"M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-5v-3a1 1 0 0 0-1-1H9a1 1 0 1 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2zm-1-5.9a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z\" />"};

var circlePlus = {"viewBox":"0 0 20 20","body":"<path d=\"M15 11h-4v4H9v-4H5V9h4V5h2v4h4v2zm-5-9a8 8 0 1 0 0 16 8 8 0 0 0 0-16z\"  fill-rule=\"evenodd\"/>"};

var conversation = {"viewBox":"0 0 20 20","body":"<path d=\"M13 11h2V9h-2v2zm-4 0h2V9H9v2zm-4 0h2V9H5v2zm5-9c-4.411 0-8 3.589-8 8 0 1.504.425 2.908 1.15 4.111l-1.069 2.495a1 1 0 0 0 1.314 1.313l2.494-1.069A7.939 7.939 0 0 0 10 18c4.411 0 8-3.589 8-8s-3.589-8-8-8z\"  fill-rule=\"evenodd\"/>"};

var deleteIcon = {"viewBox":"0 0 20 20","body":"<path d=\"M16 6H4a1 1 0 1 0 0 2h1v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8h1a1 1 0 1 0 0-2zM9 4a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2H9zm2 12h2V8h-2v8zm-4 0h2V8H7v8z\"  fill-rule=\"evenodd\"/>"};

var disable = {"viewBox":"0 0 20 20","body":"<path d=\"M10 16a5.961 5.961 0 0 1-3.471-1.115l8.356-8.356A5.961 5.961 0 0 1 16 10c0 3.309-2.691 6-6 6m0-12c1.294 0 2.49.416 3.471 1.115l-8.356 8.356A5.961 5.961 0 0 1 4 10c0-3.309 2.691-6 6-6m0-2c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8\"  fill-rule=\"evenodd\"/>"};

var dispute = {"viewBox":"0 0 20 20","body":"<path d=\"M9 10h2V6H9v4zm0 4h2v-2H9v2zm-7-4c0 4.411 3.589 8 8 8a7.939 7.939 0 0 0 4.111-1.15l2.494 1.069a1 1 0 0 0 1.314-1.313l-1.069-2.495A7.939 7.939 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8z\"  fill-rule=\"evenodd\"/>"};

var duplicate = {"viewBox":"0 0 20 20","body":"<path d=\"M8 12h8V4H8v8zm4 4H4V8h2v5a1 1 0 0 0 1 1h5v2zm5-14H7a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z\"  fill-rule=\"evenodd\"/>"};

var embed = {"viewBox":"0 0 20 20","body":"<path d=\"M17 13a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a1 1 0 1 1 2 0v2h12v-2a1 1 0 0 1 1-1zm0-11a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V4H4v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1h14zm.555 7.168a1.001 1.001 0 0 1 0 1.664l-3 2a1 1 0 0 1-1.109-1.664L15.198 10l-1.752-1.168a1 1 0 1 1 1.109-1.664l3 2zM6.832 7.445a1 1 0 0 1-.277 1.387L4.803 10l1.752 1.168a1 1 0 1 1-1.11 1.664l-3-2a1.001 1.001 0 0 1 0-1.664l3-2a1 1 0 0 1 1.387.277zM9 14.001a1 1 0 0 1-.948-1.317l2-6a1 1 0 0 1 1.896.633l-2 6A.999.999 0 0 1 9 14z\"  fill-rule=\"evenodd\"/>"};

var exportIcon = {"viewBox":"0 0 20 20","body":"<path d=\"M13.707 6.707a.997.997 0 0 1-1.414 0L11 5.414V13a1 1 0 1 1-2 0V5.414L7.707 6.707a.999.999 0 1 1-1.414-1.414l3-3a.999.999 0 0 1 1.414 0l3 3a.999.999 0 0 1 0 1.414zM17 18H3a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2z\"/>"};

var external = {"viewBox":"0 0 20 20","body":"<path d=\"M17 2a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V5.414l-7.293 7.293a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.414L14.586 4H13a1 1 0 1 1 0-2h4zm-4 9a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H4v8h8v-4a1 1 0 0 1 1-1z\"  fill-rule=\"evenodd\"/>"};

var help = {"viewBox":"0 0 20 20","body":"<circle cx=\"10\" cy=\"10\" r=\"9\" fill=\"currentColor\"/><path d=\"M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m0-4a1 1 0 1 0 0 2 1 1 0 1 0 0-2m0-10C8.346 4 7 5.346 7 7a1 1 0 1 0 2 0 1.001 1.001 0 1 1 1.591.808C9.58 8.548 9 9.616 9 10.737V11a1 1 0 1 0 2 0v-.263c0-.653.484-1.105.773-1.317A3.013 3.013 0 0 0 13 7c0-1.654-1.346-3-3-3\" />"};

var horizontalDots = {"viewBox":"0 0 20 20","body":"<path d=\"M6 10a2 2 0 1 1-4.001-.001A2 2 0 0 1 6 10zm6 0a2 2 0 1 1-4.001-.001A2 2 0 0 1 12 10zm6 0a2 2 0 1 1-4.001-.001A2 2 0 0 1 18 10z\"  fill-rule=\"evenodd\"/>"};

var importIcon = {"viewBox":"0 0 20 20","body":"<path d=\"M9.293 13.707l-3-3a.999.999 0 1 1 1.414-1.414L9 10.586V3a1 1 0 1 1 2 0v7.586l1.293-1.293a.999.999 0 1 1 1.414 1.414l-3 3a.999.999 0 0 1-1.414 0zM17 16a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h14z\"/>"};

var notes = {"viewBox":"0 0 20 20","body":"<path d=\"M6 11h8V9H6v2zm0 4h8v-2H6v2zm0-8h4V5H6v2zm9.707-1.707l-3-3A.996.996 0 0 0 12 2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a.997.997 0 0 0-.293-.707z\"  fill-rule=\"evenodd\"/>"};

var notification = {"viewBox":"0 0 20 20","body":"<path d=\"M16 8c0-2.967-2.167-5.432-5-5.91V1a1 1 0 1 0-2 0v1.09C6.167 2.568 4 5.033 4 8c0 2.957 0 4.586-1.707 6.293A1 1 0 0 0 3 16h4.183A2.909 2.909 0 0 0 7 17c0 1.654 1.345 3 3 3s3-1.346 3-3c0-.353-.07-.687-.184-1H17a1 1 0 0 0 .707-1.707C16 12.586 16 10.957 16 8zM5.011 14C6 12.208 6 10.285 6 8c0-2.206 1.794-4 4-4s4 1.794 4 4c0 2.285 0 4.208.989 6H5.011zM11 17a1.001 1.001 0 0 1-2 0 1 1 0 0 1 2 0z\"/>"};

var print = {"viewBox":"0 0 20 20","body":"<path d=\"M14 11h2V9h-2v2zM7 7h6V4H7v3zm0 9h6v-2H7v2zm10-9h-2V3a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v4H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z\"  fill-rule=\"evenodd\"/>"};

var subtract = {"viewBox":"0 0 20 20","body":"<path d=\"M15 9H5a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2\"  fill-rule=\"evenodd\"/>"};

var refresh = {"viewBox":"0 0 20 20","body":"<path d=\"M17 11a1 1 0 0 1 1 1c0 1.654-1.346 3-3 3H5.414l1.293 1.293a.999.999 0 1 1-1.414 1.414l-3-3a.999.999 0 0 1 0-1.414l3-3a.999.999 0 1 1 1.414 1.414L5.414 13H15c.552 0 1-.449 1-1a1 1 0 0 1 1-1zM3 9a1 1 0 0 1-1-1c0-1.654 1.346-3 3-3h9.586l-1.293-1.293a.999.999 0 1 1 1.414-1.414l3 3a.999.999 0 0 1 0 1.414l-3 3a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.414L14.586 7H5c-.552 0-1 .449-1 1a1 1 0 0 1-1 1z\"  fill-rule=\"evenodd\"/>"};

var risk = {"viewBox":"0 0 20 20","body":"<path d=\"M9 12h2V8H9v4zm0 4h2v-2H9v2zm8.895.509l-7-14c-.339-.678-1.451-.678-1.79 0l-7 14A.999.999 0 0 0 3 17.956h14a1.001 1.001 0 0 0 .895-1.447z\"  fill-rule=\"evenodd\"/>"};

var save = {"viewBox":"0 0 20 20","body":"<path d=\"M17 4h-3a1 1 0 1 0 0 2h2v10H4V4h3.586L9 5.414v5.172L7.707 9.293a1 1 0 0 0-1.414 1.414l3 3a.996.996 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L11 10.586V5a.997.997 0 0 0-.293-.707l-2-2A.994.994 0 0 0 8 2H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z\"/>"};

var search = {"viewBox":"0 0 20 20","body":"<path d=\"M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8m9.707 4.293l-4.82-4.82A5.968 5.968 0 0 0 14 8 6 6 0 0 0 2 8a6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414\"  fill-rule=\"evenodd\"/>"};

var view = {"viewBox":"0 0 20 20","body":"<path d=\"M17.928 9.628C17.836 9.399 15.611 4 9.999 4S2.162 9.399 2.07 9.628a1.017 1.017 0 0 0 0 .744C2.162 10.601 4.387 16 9.999 16s7.837-5.399 7.929-5.628a1.017 1.017 0 0 0 0-.744zM9.999 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6A2 2 0 1 0 10 12.001 2 2 0 0 0 10 8z\"/>"};

var styles$7 = {
  "Icon": "Polaris-Icon",
  "hasBackdrop": "Polaris-Icon--hasBackdrop",
  "isColored": "Polaris-Icon--isColored",
  "colorWhite": "Polaris-Icon--colorWhite",
  "colorBlack": "Polaris-Icon--colorBlack",
  "colorSkyLighter": "Polaris-Icon--colorSkyLighter",
  "colorSkyLight": "Polaris-Icon--colorSkyLight",
  "colorSky": "Polaris-Icon--colorSky",
  "colorSkyDark": "Polaris-Icon--colorSkyDark",
  "colorInkLightest": "Polaris-Icon--colorInkLightest",
  "colorInkLighter": "Polaris-Icon--colorInkLighter",
  "colorInkLight": "Polaris-Icon--colorInkLight",
  "colorInk": "Polaris-Icon--colorInk",
  "colorBlueLighter": "Polaris-Icon--colorBlueLighter",
  "colorBlueLight": "Polaris-Icon--colorBlueLight",
  "colorBlue": "Polaris-Icon--colorBlue",
  "colorBlueDark": "Polaris-Icon--colorBlueDark",
  "colorBlueDarker": "Polaris-Icon--colorBlueDarker",
  "colorIndigoLighter": "Polaris-Icon--colorIndigoLighter",
  "colorIndigoLight": "Polaris-Icon--colorIndigoLight",
  "colorIndigo": "Polaris-Icon--colorIndigo",
  "colorIndigoDark": "Polaris-Icon--colorIndigoDark",
  "colorIndigoDarker": "Polaris-Icon--colorIndigoDarker",
  "colorTealLighter": "Polaris-Icon--colorTealLighter",
  "colorTealLight": "Polaris-Icon--colorTealLight",
  "colorTeal": "Polaris-Icon--colorTeal",
  "colorTealDark": "Polaris-Icon--colorTealDark",
  "colorTealDarker": "Polaris-Icon--colorTealDarker",
  "colorGreenLighter": "Polaris-Icon--colorGreenLighter",
  "colorGreen": "Polaris-Icon--colorGreen",
  "colorGreenDark": "Polaris-Icon--colorGreenDark",
  "colorYellowLighter": "Polaris-Icon--colorYellowLighter",
  "colorYellow": "Polaris-Icon--colorYellow",
  "colorYellowDark": "Polaris-Icon--colorYellowDark",
  "colorOrange": "Polaris-Icon--colorOrange",
  "colorOrangeDark": "Polaris-Icon--colorOrangeDark",
  "colorRedLighter": "Polaris-Icon--colorRedLighter",
  "colorRed": "Polaris-Icon--colorRed",
  "colorRedDark": "Polaris-Icon--colorRedDark",
  "colorPurple": "Polaris-Icon--colorPurple",
  "Svg": "Polaris-Icon__Svg",
  "Placeholder": "Polaris-Icon__Placeholder",
};

var _jsxFileName$15 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Icon/Icon.js';
var BUNDLED_ICONS = {
    add: add,
    alert: alert,
    arrowDown: arrowDown,
    arrowLeft: arrowLeft,
    arrowRight: arrowRight,
    arrowUp: arrowUp,
    arrowUpDown: arrowUpDown,
    calendar: calendar,
    cancel: cancel,
    cancelSmall: cancelSmall,
    caretDown: caretDown,
    caretUp: caretUp,
    checkmark: checkmark,
    chevronDown: chevronDown,
    chevronLeft: chevronLeft,
    chevronRight: chevronRight,
    chevronUp: chevronUp,
    circleCancel: circleCancel,
    circleChevronDown: circleChevronDown,
    circleChevronLeft: circleChevronLeft,
    circleChevronRight: circleChevronRight,
    circleChevronUp: circleChevronUp,
    circleInformation: circleInformation,
    circlePlus: circlePlus,
    conversation: conversation,
    delete: deleteIcon,
    disable: disable,
    dispute: dispute,
    duplicate: duplicate,
    embed: embed,
    export: exportIcon,
    external: external,
    help: help,
    horizontalDots: horizontalDots,
    import: importIcon,
    notes: notes,
    notification: notification,
    print: print,
    refresh: refresh,
    risk: risk,
    save: save,
    search: search,
    subtract: subtract,
    view: view
};
var COLORS_WITH_BACKDROPS = ['teal', 'tealDark', 'greenDark', 'redDark', 'yellowDark', 'ink', 'inkLighter'];
function Icon$1(_ref) {
    var source = _ref.source,
        color = _ref.color,
        backdrop = _ref.backdrop,
        accessibilityLabel = _ref.accessibilityLabel,
        intl = _ref.polaris.intl;

    if (color && backdrop && COLORS_WITH_BACKDROPS.indexOf(color) < 0) {
        // eslint-disable-next-line no-console
        console.warn(intl.translate('Polaris.Icon.backdropWarning', {
            color: color,
            colorsWithBackDrops: COLORS_WITH_BACKDROPS.join(', ')
        }));
    }
    var className = styles.classNames(styles$7.Icon, color && styles$7[styles.variationName('color', color)], color && color !== 'white' && styles$7.isColored, backdrop && styles$7.hasBackdrop);
    var contentMarkup = void 0;
    if (source === 'placeholder') {
        contentMarkup = React.createElement('div', { className: styles$7.Placeholder, __self: this,
            __source: {
                fileName: _jsxFileName$15,
                lineNumber: 72
            }
        });
    } else {
        var iconSource = typeof source === 'string' ? BUNDLED_ICONS[source] : source;
        contentMarkup = iconSource && iconSource.viewBox && iconSource.body && React.createElement('svg', { className: styles$7.Svg, viewBox: iconSource.viewBox, dangerouslySetInnerHTML: { __html: iconSource.body }, focusable: 'false', 'aria-hidden': 'true', __self: this,
            __source: {
                fileName: _jsxFileName$15,
                lineNumber: 78
            }
        });
    }
    return React.createElement(
        'span',
        { className: className, 'aria-label': accessibilityLabel, __self: this,
            __source: {
                fileName: _jsxFileName$15,
                lineNumber: 80
            }
        },
        contentMarkup
    );
}
var Icon$2 = withAppProvider()(Icon$1);

var styles$8 = {
  "Spinner": "Polaris-Spinner",
  "loading": "Polaris-Spinner--loading",
  "sizeSmall": "Polaris-Spinner--sizeSmall",
  "sizeLarge": "Polaris-Spinner--sizeLarge",
  "colorWhite": "Polaris-Spinner--colorWhite",
  "colorTeal": "Polaris-Spinner--colorTeal",
  "colorInkLightest": "Polaris-Spinner--colorInkLightest",
};

var spinnerSVGLarge = {"viewBox":"0 0 44 44","body":"<path d=\"M15.542 1.487A21.507 21.507 0 0 0 .5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 0 0-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 1 0-.9-2.863z\" />"};

var spinnerSVGSmall = {"viewBox":"0 0 20 20","body":"<path d=\"M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z\" />"};

var _jsxFileName$16 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Spinner/Spinner.js';
var COLORS_FOR_LARGE_SPINNER = ['teal', 'inkLightest'];
function Spinner$1(_ref) {
    var _ref$size = _ref.size,
        size = _ref$size === undefined ? 'large' : _ref$size,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? 'teal' : _ref$color,
        accessibilityLabel = _ref.accessibilityLabel,
        intl = _ref.polaris.intl;

    if (size === 'large' && COLORS_FOR_LARGE_SPINNER.indexOf(color) < 0) {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn(intl.translate('Polaris.Spinner.warningMessage', {
                color: color,
                size: size,
                colors: COLORS_FOR_LARGE_SPINNER.join(', ')
            }));
        }
        // eslint-disable-next-line no-param-reassign
        size = 'small';
    }
    var className = styles.classNames(styles$8.Spinner, color && styles$8[styles.variationName('color', color)], size && styles$8[styles.variationName('size', size)]);
    var spinnerSVG = size === 'large' ? spinnerSVGLarge : spinnerSVGSmall;
    return React.createElement('svg', { viewBox: spinnerSVG.viewBox, dangerouslySetInnerHTML: { __html: spinnerSVG.body }, className: className, 'aria-label': accessibilityLabel, role: 'status', __self: this,
        __source: {
            fileName: _jsxFileName$16,
            lineNumber: 23
        }
    });
}
var Spinner$2 = withAppProvider()(Spinner$1);

var styles$9 = {
  "Indicator": "Polaris-Indicator",
  "pulseIndicator": "Polaris-Indicator--pulseIndicator",
  "bounce": "Polaris-Indicator--bounce",
  "pulse": "Polaris-Indicator--pulse",
};

var _jsxFileName$17 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Indicator/Indicator.js';
function Indicator$1(_ref) {
    var _ref$pulse = _ref.pulse,
        pulse = _ref$pulse === undefined ? true : _ref$pulse;

    var className = styles.classNames(styles$9.Indicator, pulse && styles$9.pulseIndicator);
    return React.createElement('span', { className: className, __self: this,
        __source: {
            fileName: _jsxFileName$17,
            lineNumber: 6
        }
    });
}

var styles$10 = {
  "Button": "Polaris-Button",
  "disabled": "Polaris-Button--disabled",
  "Content": "Polaris-Button__Content",
  "Icon": "Polaris-Button__Icon",
  "Spinner": "Polaris-Button__Spinner",
  "primary": "Polaris-Button--primary",
  "destructive": "Polaris-Button--destructive",
  "outline": "Polaris-Button--outline",
  "loading": "Polaris-Button--loading",
  "plain": "Polaris-Button--plain",
  "fullWidth": "Polaris-Button--fullWidth",
  "sizeSlim": "Polaris-Button--sizeSlim",
  "sizeLarge": "Polaris-Button--sizeLarge",
  "iconOnly": "Polaris-Button--iconOnly",
};

var _jsxFileName$11 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Button/Button.js';
var DEFAULT_SIZE = 'medium';
function Button$1(_ref) {
  var id = _ref.id,
      url = _ref.url,
      disabled = _ref.disabled,
      loading = _ref.loading,
      children = _ref.children,
      accessibilityLabel = _ref.accessibilityLabel,
      ariaControls = _ref.ariaControls,
      ariaExpanded = _ref.ariaExpanded,
      onClick = _ref.onClick,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      external = _ref.external,
      icon = _ref.icon,
      primary = _ref.primary,
      outline = _ref.outline,
      destructive = _ref.destructive,
      disclosure = _ref.disclosure,
      plain = _ref.plain,
      submit = _ref.submit,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? DEFAULT_SIZE : _ref$size,
      fullWidth = _ref.fullWidth,
      intl = _ref.polaris.intl;

  var indicator = false;
  var isDisabled = disabled || loading;
  var className = reactUtilities.classNames(styles$10.Button, primary && styles$10.primary, outline && styles$10.outline, destructive && styles$10.destructive, isDisabled && styles$10.disabled, loading && styles$10.loading, plain && styles$10.plain, size && size !== DEFAULT_SIZE && styles$10[reactUtilities.variationName('size', size)], fullWidth && styles$10.fullWidth, icon && children == null && styles$10.iconOnly);
  var disclosureIconMarkup = disclosure ? React.createElement(
    IconWrapper,
    {
      __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 15
      }
    },
    React.createElement(Icon$2, { source: loading ? 'placeholder' : 'caretDown', __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 16
      }
    })
  ) : null;
  var iconMarkup = void 0;
  if (icon) {
    var iconInner = isIconSource(icon) ? React.createElement(Icon$2, { source: loading ? 'placeholder' : icon, __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 20
      }
    }) : icon;
    iconMarkup = React.createElement(
      IconWrapper,
      {
        __self: this,
        __source: {
          fileName: _jsxFileName$11,
          lineNumber: 21
        }
      },
      iconInner
    );
  }
  var childMarkup = children ? React.createElement(
    'span',
    {
      __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 23
      }
    },
    children
  ) : null;
  var spinnerColor = primary || destructive ? 'white' : 'inkLightest';
  var spinnerSVGMarkup = loading ? React.createElement(
    'span',
    { className: styles$10.Spinner, __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 25
      }
    },
    React.createElement(Spinner$2, { size: 'small', color: spinnerColor, accessibilityLabel: intl.translate('Polaris.Button.spinnerAccessibilityLabel'), __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 26
      }
    })
  ) : null;
  var indicatorMarkup = indicator && React.createElement(Indicator$1, {
    __self: this,
    __source: {
      fileName: _jsxFileName$11,
      lineNumber: 28
    }
  });
  var content = iconMarkup || disclosureIconMarkup ? React.createElement(
    'span',
    { className: styles$10.Content, __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 29
      }
    },
    spinnerSVGMarkup,
    iconMarkup,
    childMarkup,
    disclosureIconMarkup
  ) : React.createElement(
    'span',
    { className: styles$10.Content, __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 34
      }
    },
    spinnerSVGMarkup,
    childMarkup
  );
  var type = submit ? 'submit' : 'button';
  return url ? React.createElement(
    UnstyledLink$2,
    { id: id, url: url, external: external, onClick: onClick, onFocus: onFocus, onBlur: onBlur, onMouseUp: handleMouseUpByBlurring, className: className, disabled: isDisabled, 'aria-label': accessibilityLabel, __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 39
      }
    },
    indicatorMarkup,
    content
  ) : React.createElement(
    'button',
    { id: id, type: type, onClick: onClick, onFocus: onFocus, onBlur: onBlur, onMouseUp: handleMouseUpByBlurring, className: className, disabled: isDisabled, 'aria-label': accessibilityLabel, 'aria-controls': ariaControls, 'aria-expanded': ariaExpanded, role: loading ? 'alert' : undefined, 'aria-busy': loading ? true : undefined, __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 42
      }
    },
    indicatorMarkup,
    content
  );
}
function IconWrapper(_ref2) {
  var children = _ref2.children;

  return React.createElement(
    'span',
    { className: styles$10.Icon, __self: this,
      __source: {
        fileName: _jsxFileName$11,
        lineNumber: 48
      }
    },
    children
  );
}
function isIconSource(x) {
  return typeof x === 'string' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x.body;
}
var Button$2 = withAppProvider()(Button$1);

var _jsxFileName$18 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Button/utils.js';
function buttonsFrom(actions) {
    var overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (Array.isArray(actions)) {
        return actions.map(function (action, index) {
            return buttonFrom(action, overrides, index);
        });
    } else {
        var action = actions;
        return buttonFrom(action, overrides);
    }
}
function buttonFrom(_a, overrides, key) {
    var content = _a.content,
        onAction = _a.onAction,
        action = tslib_1.__rest(_a, ["content", "onAction"]);

    return React.createElement(
        Button$2,
        Object.assign({ key: key, onClick: onAction }, action, overrides, {
            __self: this,
            __source: {
                fileName: _jsxFileName$18,
                lineNumber: 15
            }
        }),
        content
    );
}

var styles$11 = {
  "Heading": "Polaris-Heading",
};

var _jsxFileName$19 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Heading/Heading.js';
function Heading$1(_ref) {
    var _ref$element = _ref.element,
        Element = _ref$element === undefined ? 'h2' : _ref$element,
        children = _ref.children;

    return React.createElement(
        Element,
        { className: styles$11.Heading, __self: this,
            __source: {
                fileName: _jsxFileName$19,
                lineNumber: 4
            }
        },
        children
    );
}

var styles$12 = {
  "ButtonGroup": "Polaris-ButtonGroup",
  "Item": "Polaris-ButtonGroup__Item",
  "Item-plain": "Polaris-ButtonGroup__Item--plain",
  "segmented": "Polaris-ButtonGroup--segmented",
  "Item-focused": "Polaris-ButtonGroup__Item--focused",
  "fullWidth": "Polaris-ButtonGroup--fullWidth",
  "connectedTop": "Polaris-ButtonGroup--connectedTop",
};

var _jsxFileName$21 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ButtonGroup/components/Item/Item.js';
var Item$3 = function (_React$PureComponent) {
    _inherits(Item, _React$PureComponent);

    function Item() {
        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));

        _this.state = { focused: false };
        return _this;
    }

    _createClass(Item, [{
        key: 'render',
        value: function render() {
            var button = this.props.button;
            var focused = this.state.focused;

            var className = styles.classNames(styles$12.Item, focused && styles$12['Item-focused'], button.props.plain && styles$12['Item-plain']);
            return React.createElement(
                'div',
                { className: className, onFocus: this.handleFocus, onBlur: this.handleBlur, __self: this,
                    __source: {
                        fileName: _jsxFileName$21,
                        lineNumber: 15
                    }
                },
                button
            );
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus() {
            this.setState({ focused: true });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            this.setState({ focused: false });
        }
    }]);

    return Item;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], Item$3.prototype, "handleFocus", null);
tslib_1.__decorate([decorators.autobind], Item$3.prototype, "handleBlur", null);

var _jsxFileName$20 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ButtonGroup/ButtonGroup.js';
function ButtonGroup$1(_ref) {
    var _this = this;

    var children = _ref.children,
        segmented = _ref.segmented,
        fullWidth = _ref.fullWidth,
        connectedTop = _ref.connectedTop;

    var className = styles.classNames(styles$12.ButtonGroup, segmented && styles$12.segmented, fullWidth && styles$12.fullWidth, connectedTop && styles$12.connectedTop);
    var contents = reactUtilities.elementChildren(children).map(function (child, index) {
        return React.createElement(Item$3, { button: child, key: index, __self: _this,
            __source: {
                fileName: _jsxFileName$20,
                lineNumber: 8
            }
        });
    });
    return React.createElement(
        'div',
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$20,
                lineNumber: 9
            }
        },
        contents
    );
}

var styles$13 = {
  "Banner": "Polaris-Banner",
  "withinContentContainer": "Polaris-Banner--withinContentContainer",
  "statusSuccess": "Polaris-Banner--statusSuccess",
  "statusInfo": "Polaris-Banner--statusInfo",
  "statusWarning": "Polaris-Banner--statusWarning",
  "statusCritical": "Polaris-Banner--statusCritical",
  "Ribbon": "Polaris-Banner__Ribbon",
  "Actions": "Polaris-Banner__Actions",
  "Dismiss": "Polaris-Banner__Dismiss",
  "withinPage": "Polaris-Banner--withinPage",
  "hasDismiss": "Polaris-Banner--hasDismiss",
  "Heading": "Polaris-Banner__Heading",
  "Content": "Polaris-Banner__Content",
  "SecondaryAction": "Polaris-Banner__SecondaryAction",
  "Text": "Polaris-Banner__Text",
};

var successIcon = {"viewBox":"0 0 20 20","body":"<g  fill-rule=\"evenodd\"><circle fill=\"currentColor\" cx=\"10\" cy=\"10\" r=\"9\"/><path d=\"M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m2.293-10.707L9 10.586 7.707 9.293a1 1 0 1 0-1.414 1.414l2 2a.997.997 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414\" /></g>"};

var fallbackIcon = {"viewBox":"0 0 20 20","body":"<g  fill-rule=\"evenodd\"><path fill=\"currentColor\" d=\"M2 3h11v4h6l-2 4 2 4H8v-4H3\"/><path d=\"M16.105 11.447L17.381 14H9v-2h4a1 1 0 0 0 1-1V8h3.38l-1.274 2.552a.993.993 0 0 0 0 .895zM2.69 4H12v6H4.027L2.692 4zm15.43 7l1.774-3.553A1 1 0 0 0 19 6h-5V3c0-.554-.447-1-1-1H2.248L1.976.782a1 1 0 1 0-1.953.434l4 18a1.006 1.006 0 0 0 1.193.76 1 1 0 0 0 .76-1.194L4.47 12H7v3a1 1 0 0 0 1 1h11c.346 0 .67-.18.85-.476a.993.993 0 0 0 .044-.972l-1.775-3.553z\" /></g>"};

var warningIcon = {"viewBox":"0 0 20 20","body":"<g  fill-rule=\"evenodd\"><circle fill=\"currentColor\" cx=\"10\" cy=\"10\" r=\"9\"/><path d=\"M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-13a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1m0 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2\" /></g>"};

var criticalIcon = {"viewBox":"0 0 20 20","body":"<g  fill-rule=\"evenodd\"><circle fill=\"currentColor\" cx=\"10\" cy=\"10\" r=\"9\"/><path d=\"M2 10c0-1.846.635-3.543 1.688-4.897l11.209 11.209A7.954 7.954 0 0 1 10 18c-4.411 0-8-3.589-8-8m14.312 4.897L5.103 3.688A7.954 7.954 0 0 1 10 2c4.411 0 8 3.589 8 8a7.952 7.952 0 0 1-1.688 4.897M0 10c0 5.514 4.486 10 10 10s10-4.486 10-10S15.514 0 10 0 0 4.486 0 10\" /></g>"};

var infoIcon = {"viewBox":"0 0 20 20","body":"<g  fill-rule=\"evenodd\"><circle cx=\"10\" cy=\"10\" r=\"9\" fill=\"currentColor\"/><path  d=\"M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m1-5v-3a1 1 0 0 0-1-1H9a1 1 0 1 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2m-1-5.9a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2\"/></g>"};

var _jsxFileName$10 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Banner/Banner.js';
var Banner$1 = function (_React$PureComponent) {
    _inherits(Banner, _React$PureComponent);

    function Banner() {
        _classCallCheck(this, Banner);

        return _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).apply(this, arguments));
    }

    _createClass(Banner, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                icon = _props.icon,
                action = _props.action,
                secondaryAction = _props.secondaryAction,
                title = _props.title,
                children = _props.children,
                status = _props.status,
                onDismiss = _props.onDismiss;
            var withinContentContainer = this.context.withinContentContainer;

            var color = void 0;
            var defaultIcon = void 0;
            var ariaRoleType = 'status';
            switch (status) {
                case 'success':
                    color = 'greenDark';
                    defaultIcon = successIcon;
                    break;
                case 'info':
                    color = 'tealDark';
                    defaultIcon = infoIcon;
                    break;
                case 'warning':
                    color = 'yellowDark';
                    defaultIcon = warningIcon;
                    ariaRoleType = 'alert';
                    break;
                case 'critical':
                    color = 'redDark';
                    defaultIcon = criticalIcon;
                    ariaRoleType = 'alert';
                    break;
                default:
                    color = 'inkLighter';
                    defaultIcon = fallbackIcon;
            }
            var className = styles.classNames(styles$13.Banner, status && styles$13[styles.variationName('status', status)], onDismiss && styles$13.hasDismiss, withinContentContainer ? styles$13.withinContentContainer : styles$13.withinPage);
            var id = uniqueID();
            var iconName = icon || defaultIcon;
            var headingMarkup = null;
            var headingID = void 0;
            if (title) {
                headingID = id + 'Heading';
                headingMarkup = React.createElement(
                    'div',
                    { className: styles$13.Heading, id: headingID, __self: this,
                        __source: {
                            fileName: _jsxFileName$10,
                            lineNumber: 54
                        }
                    },
                    React.createElement(
                        Heading$1,
                        { element: 'p', __self: this,
                            __source: {
                                fileName: _jsxFileName$10,
                                lineNumber: 55
                            }
                        },
                        title
                    )
                );
            }
            var buttonSizeValue = withinContentContainer ? 'slim' : undefined;
            var secondaryActionMarkup = secondaryAction ? secondaryActionFrom(secondaryAction) : null;
            var actionMarkup = action ? React.createElement(
                'div',
                { className: styles$13.Actions, __self: this,
                    __source: {
                        fileName: _jsxFileName$10,
                        lineNumber: 62
                    }
                },
                React.createElement(
                    ButtonGroup$1,
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$10,
                            lineNumber: 63
                        }
                    },
                    buttonFrom(action, { outline: true, size: buttonSizeValue }),
                    secondaryActionMarkup
                )
            ) : null;
            var contentMarkup = null;
            var contentID = void 0;
            if (children || actionMarkup) {
                contentID = id + 'Content';
                contentMarkup = React.createElement(
                    'div',
                    { className: styles$13.Content, id: contentID, __self: this,
                        __source: {
                            fileName: _jsxFileName$10,
                            lineNumber: 72
                        }
                    },
                    children,
                    actionMarkup
                );
            }
            var dismissButton = onDismiss ? React.createElement(
                'div',
                { className: styles$13.Dismiss, __self: this,
                    __source: {
                        fileName: _jsxFileName$10,
                        lineNumber: 77
                    }
                },
                React.createElement(Button$2, { plain: true, icon: 'cancelSmall', onClick: onDismiss, accessibilityLabel: 'Dismiss notification', __self: this,
                    __source: {
                        fileName: _jsxFileName$10,
                        lineNumber: 78
                    }
                })
            ) : null;
            return React.createElement(
                'div',
                { className: className
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    , tabIndex: 0, role: ariaRoleType, 'aria-live': 'polite', onMouseUp: handleMouseUp, 'aria-labelledby': headingID, 'aria-describedby': contentID, __self: this,
                    __source: {
                        fileName: _jsxFileName$10,
                        lineNumber: 80
                    }
                },
                dismissButton,
                React.createElement(
                    'div',
                    { className: styles$13.Ribbon, __self: this,
                        __source: {
                            fileName: _jsxFileName$10,
                            lineNumber: 84
                        }
                    },
                    React.createElement(Icon$2, { source: iconName, color: color, backdrop: true, __self: this,
                        __source: {
                            fileName: _jsxFileName$10,
                            lineNumber: 85
                        }
                    })
                ),
                React.createElement(
                    'div',
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$10,
                            lineNumber: 87
                        }
                    },
                    headingMarkup,
                    contentMarkup
                )
            );
        }
    }]);

    return Banner;
}(React.PureComponent);

Banner$1.contextTypes = contentContextTypes;
var index = 1;
function uniqueID() {
    return 'Banner' + index++;
}
function handleMouseUp(_ref) {
    var currentTarget = _ref.currentTarget;

    currentTarget.blur();
}
function secondaryActionFrom(action) {
    if (action.url) {
        return React.createElement(
            UnstyledLink$2,
            { className: styles$13.SecondaryAction, url: action.url, external: action.external, __self: this,
                __source: {
                    fileName: _jsxFileName$10,
                    lineNumber: 104
                }
            },
            React.createElement(
                'span',
                { className: styles$13.Text, __self: this,
                    __source: {
                        fileName: _jsxFileName$10,
                        lineNumber: 105
                    }
                },
                action.content
            )
        );
    }
    return React.createElement(
        'button',
        { className: styles$13.SecondaryAction, onClick: action.onAction, __self: this,
            __source: {
                fileName: _jsxFileName$10,
                lineNumber: 108
            }
        },
        React.createElement(
            'span',
            { className: styles$13.Text, __self: this,
                __source: {
                    fileName: _jsxFileName$10,
                    lineNumber: 109
                }
            },
            action.content
        )
    );
}

var styles$14 = {
  "Breadcrumb": "Polaris-Breadcrumbs__Breadcrumb",
  "Icon": "Polaris-Breadcrumbs__Icon",
  "Content": "Polaris-Breadcrumbs__Content",
};

var _jsxFileName$22 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Breadcrumbs/Breadcrumbs.js';
var Breadcrumbs$1 = function (_React$PureComponent) {
  _inherits(Breadcrumbs, _React$PureComponent);

  function Breadcrumbs() {
    _classCallCheck(this, Breadcrumbs);

    return _possibleConstructorReturn(this, (Breadcrumbs.__proto__ || Object.getPrototypeOf(Breadcrumbs)).apply(this, arguments));
  }

  _createClass(Breadcrumbs, [{
    key: 'render',
    value: function render() {
      var breadcrumbs = this.props.breadcrumbs;

      var breadcrumb = breadcrumbs[breadcrumbs.length - 1];
      if (breadcrumb == null) {
        return null;
      }
      var content = breadcrumb.content;

      var contentMarkup = React.createElement(
        React.Fragment,
        {
          __self: this,
          __source: {
            fileName: _jsxFileName$22,
            lineNumber: 14
          }
        },
        React.createElement(
          'span',
          { className: styles$14.Icon, __self: this,
            __source: {
              fileName: _jsxFileName$22,
              lineNumber: 15
            }
          },
          React.createElement(Icon$2, { source: 'chevronLeft', __self: this,
            __source: {
              fileName: _jsxFileName$22,
              lineNumber: 16
            }
          })
        ),
        React.createElement(
          'span',
          { className: styles$14.Content, __self: this,
            __source: {
              fileName: _jsxFileName$22,
              lineNumber: 18
            }
          },
          content
        )
      );
      var breadcrumbMarkup = 'url' in breadcrumb ? React.createElement(
        UnstyledLink$2,
        { key: content, url: breadcrumb.url, className: styles$14.Breadcrumb, onMouseUp: handleMouseUpByBlurring, __self: this,
          __source: {
            fileName: _jsxFileName$22,
            lineNumber: 20
          }
        },
        contentMarkup
      ) : React.createElement(
        'button',
        { key: content, className: styles$14.Breadcrumb, onClick: breadcrumb.onAction, onMouseUp: handleMouseUpByBlurring, type: 'button', __self: this,
          __source: {
            fileName: _jsxFileName$22,
            lineNumber: 22
          }
        },
        contentMarkup
      );
      return (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        React.createElement(
          'nav',
          { role: 'navigation', __self: this,
            __source: {
              fileName: _jsxFileName$22,
              lineNumber: 27
            }
          },
          breadcrumbMarkup
        )
      );
    }
  }]);

  return Breadcrumbs;
}(React.PureComponent);

var styles$16 = {
  "Caption": "Polaris-Caption",
};

var _jsxFileName$24 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Caption/Caption.js';
function Caption$1(_ref) {
    var children = _ref.children;

    return React.createElement(
        'p',
        { className: styles$16.Caption, __self: this,
            __source: {
                fileName: _jsxFileName$24,
                lineNumber: 4
            }
        },
        children
    );
}

var styles$17 = {
  "Card": "Polaris-Card",
  "subdued": "Polaris-Card--subdued",
  "Header": "Polaris-Card__Header",
  "Section": "Polaris-Card__Section",
  "Section-fullWidth": "Polaris-Card__Section--fullWidth",
  "Section-subdued": "Polaris-Card__Section--subdued",
  "SectionHeader": "Polaris-Card__SectionHeader",
  "Footer": "Polaris-Card__Footer",
};

var _jsxFileName$26 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Card/components/Header/Header.js';
function Header$1(_ref) {
    var children = _ref.children,
        title = _ref.title,
        actions = _ref.actions;

    var actionMarkup = actions ? React.createElement(
        ButtonGroup$1,
        {
            __self: this,
            __source: {
                fileName: _jsxFileName$26,
                lineNumber: 5
            }
        },
        buttonsFrom(actions, { plain: true })
    ) : null;
    var titleMarkup = React.isValidElement(title) ? title : React.createElement(
        Heading$1,
        {
            __self: this,
            __source: {
                fileName: _jsxFileName$26,
                lineNumber: 6
            }
        },
        title
    );
    var headingMarkup = actionMarkup || children ? React.createElement(
        Stack$1,
        { alignment: 'baseline', __self: this,
            __source: {
                fileName: _jsxFileName$26,
                lineNumber: 7
            }
        },
        React.createElement(
            Stack$1.Item,
            { fill: true, __self: this,
                __source: {
                    fileName: _jsxFileName$26,
                    lineNumber: 8
                }
            },
            titleMarkup
        ),
        actionMarkup,
        children
    ) : titleMarkup;
    return React.createElement(
        'div',
        { className: styles$17.Header, __self: this,
            __source: {
                fileName: _jsxFileName$26,
                lineNumber: 12
            }
        },
        headingMarkup
    );
}

var styles$18 = {
  "Subheading": "Polaris-Subheading",
};

var _jsxFileName$28 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Subheading/Subheading.js';
function Subheading$1(_ref) {
    var _ref$element = _ref.element,
        Element = _ref$element === undefined ? 'h3' : _ref$element,
        children = _ref.children;

    var ariaLabel = typeof children === 'string' ? children : undefined;
    return React.createElement(
        Element,
        { 'aria-label': ariaLabel, className: styles$18.Subheading, __self: this,
            __source: {
                fileName: _jsxFileName$28,
                lineNumber: 5
            }
        },
        children
    );
}

var _jsxFileName$27 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Card/components/Section/Section.js';
function Section$3(_ref) {
  var children = _ref.children,
      title = _ref.title,
      subdued = _ref.subdued,
      fullWidth = _ref.fullWidth;

  var headerContent = title ? React.createElement(
    'div',
    { className: styles$17.SectionHeader, __self: this,
      __source: {
        fileName: _jsxFileName$27,
        lineNumber: 6
      }
    },
    React.createElement(
      Subheading$1,
      {
        __self: this,
        __source: {
          fileName: _jsxFileName$27,
          lineNumber: 7
        }
      },
      title
    )
  ) : null;
  var className = styles.classNames(styles$17.Section, subdued && styles$17['Section-subdued'], fullWidth && styles$17['Section-fullWidth']);
  return React.createElement(
    'div',
    { className: className, __self: this,
      __source: {
        fileName: _jsxFileName$27,
        lineNumber: 10
      }
    },
    headerContent,
    children
  );
}

var _jsxFileName$25 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Card/Card.js';
var Card$1 = function (_React$PureComponent) {
    _inherits(Card, _React$PureComponent);

    function Card() {
        _classCallCheck(this, Card);

        return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
    }

    _createClass(Card, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                withinContentContainer: true
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                title = _props.title,
                subdued = _props.subdued,
                sectioned = _props.sectioned,
                actions = _props.actions,
                primaryFooterAction = _props.primaryFooterAction,
                secondaryFooterAction = _props.secondaryFooterAction;

            var className = styles.classNames(styles$17.Card, subdued && styles$17.subdued);
            var headerMarkup = title ? React.createElement(Header$1, { actions: actions, title: title, __self: this,
                __source: {
                    fileName: _jsxFileName$25,
                    lineNumber: 16
                }
            }) : null;
            var content = sectioned ? React.createElement(
                Section$3,
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$25,
                        lineNumber: 17
                    }
                },
                children
            ) : children;
            var primaryFooterActionMarkup = primaryFooterAction ? buttonFrom(primaryFooterAction, { primary: true }) : null;
            var secondaryFooterActionMarkup = secondaryFooterAction ? buttonFrom(secondaryFooterAction) : null;
            var footerMarkup = primaryFooterActionMarkup || secondaryFooterActionMarkup ? React.createElement(
                'div',
                { className: styles$17.Footer, __self: this,
                    __source: {
                        fileName: _jsxFileName$25,
                        lineNumber: 24
                    }
                },
                React.createElement(
                    ButtonGroup$1,
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$25,
                            lineNumber: 25
                        }
                    },
                    primaryFooterActionMarkup,
                    secondaryFooterActionMarkup
                )
            ) : null;
            return React.createElement(
                'div',
                { className: className, __self: this,
                    __source: {
                        fileName: _jsxFileName$25,
                        lineNumber: 30
                    }
                },
                headerMarkup,
                content,
                footerMarkup
            );
        }
    }]);

    return Card;
}(React.PureComponent);

Card$1.Section = Section$3;
Card$1.Header = Header$1;
Card$1.childContextTypes = contentContextTypes;

var styles$19 = {
  "InlineError": "Polaris-InlineError",
  "Icon": "Polaris-InlineError__Icon",
};

var _jsxFileName$31 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/InlineError/InlineError.js';
function InlineError$1(_ref) {
  var message = _ref.message,
      fieldID = _ref.fieldID;

  if (!message) {
    return null;
  }
  return React.createElement(
    'div',
    { id: fieldID + 'Error', className: styles$19.InlineError, __self: this,
      __source: {
        fileName: _jsxFileName$31,
        lineNumber: 8
      }
    },
    React.createElement(
      'div',
      { className: styles$19.Icon, __self: this,
        __source: {
          fileName: _jsxFileName$31,
          lineNumber: 9
        }
      },
      React.createElement(Icon$2, { source: 'alert', __self: this,
        __source: {
          fileName: _jsxFileName$31,
          lineNumber: 10
        }
      })
    ),
    message
  );
}

var styles$20 = {
  "Choice": "Polaris-Choice",
  "labelHidden": "Polaris-Choice--labelHidden",
  "Label": "Polaris-Choice__Label",
  "Control": "Polaris-Choice__Control",
  "disabled": "Polaris-Choice--disabled",
  "Descriptions": "Polaris-Choice__Descriptions",
  "HelpText": "Polaris-Choice__HelpText",
};

var _jsxFileName$30 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Choice/Choice.js';
function Choice$1(_ref) {
  var id = _ref.id,
      label = _ref.label,
      disabled = _ref.disabled,
      error = _ref.error,
      children = _ref.children,
      labelHidden = _ref.labelHidden,
      helpText = _ref.helpText;

  var className = styles.classNames(styles$20.Choice, labelHidden && styles$20.labelHidden, disabled && styles$20.disabled);
  var labelMarkup = React.createElement(
    'label',
    { className: className, htmlFor: id, __self: this,
      __source: {
        fileName: _jsxFileName$30,
        lineNumber: 7
      }
    },
    React.createElement(
      'span',
      { className: styles$20.Control, __self: this,
        __source: {
          fileName: _jsxFileName$30,
          lineNumber: 8
        }
      },
      children
    ),
    React.createElement(
      'span',
      { className: styles$20.Label, __self: this,
        __source: {
          fileName: _jsxFileName$30,
          lineNumber: 9
        }
      },
      label
    )
  );
  var helpTextMarkup = helpText ? React.createElement(
    'div',
    { className: styles$20.HelpText, id: helpTextID(id), __self: this,
      __source: {
        fileName: _jsxFileName$30,
        lineNumber: 11
      }
    },
    helpText
  ) : null;
  var errorMarkup = error && typeof error !== 'boolean' && React.createElement(
    'div',
    { className: styles$20.Error, __self: this,
      __source: {
        fileName: _jsxFileName$30,
        lineNumber: 15
      }
    },
    React.createElement(InlineError$1, { message: error, fieldID: id, __self: this,
      __source: {
        fileName: _jsxFileName$30,
        lineNumber: 16
      }
    })
  );
  var descriptionMarkup = helpTextMarkup || errorMarkup ? React.createElement(
    'div',
    { className: styles$20.Descriptions, __self: this,
      __source: {
        fileName: _jsxFileName$30,
        lineNumber: 18
      }
    },
    errorMarkup,
    helpTextMarkup
  ) : null;
  return descriptionMarkup ? React.createElement(
    'div',
    {
      __self: this,
      __source: {
        fileName: _jsxFileName$30,
        lineNumber: 22
      }
    },
    labelMarkup,
    descriptionMarkup
  ) : labelMarkup;
}
function helpTextID(id) {
  return id + 'HelpText';
}

var styles$21 = {
  "Checkbox": "Polaris-Checkbox",
  "error": "Polaris-Checkbox--error",
  "Input": "Polaris-Checkbox__Input",
  "Backdrop": "Polaris-Checkbox__Backdrop",
  "Input-indeterminate": "Polaris-Checkbox__Input--indeterminate",
  "Icon": "Polaris-Checkbox__Icon",
};

var _jsxFileName$29 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Checkbox/Checkbox.js';
var getUniqueID = other.createUniqueIDFactory('Checkbox');
function Checkbox$1(_ref) {
    var _ref$id = _ref.id,
        id = _ref$id === undefined ? getUniqueID() : _ref$id,
        label = _ref.label,
        labelHidden = _ref.labelHidden,
        helpText = _ref.helpText,
        _ref$checked = _ref.checked,
        checked = _ref$checked === undefined ? false : _ref$checked,
        error = _ref.error,
        disabled = _ref.disabled,
        onChange = _ref.onChange,
        onFocus = _ref.onFocus,
        onBlur = _ref.onBlur,
        name = _ref.name,
        value = _ref.value;

    function handleChange(event) {
        if (onChange == null) {
            return;
        }
        var currentTarget = event.currentTarget;

        onChange(currentTarget.checked, id);
    }
    var describedBy = [];
    if (error) {
        describedBy.push(id + 'Error');
    }
    if (helpText) {
        describedBy.push(helpTextID(id));
    }
    var ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;
    var wrapperClassName = styles.classNames(styles$21.Checkbox, error && styles$21.error);
    var isIndeterminate = checked === 'indeterminate';
    var isChecked = !isIndeterminate && Boolean(checked);
    var indeterminateAttributes = isIndeterminate ? { indeterminate: 'true', 'aria-checked': 'mixed' } : { 'aria-checked': isChecked };
    var iconSource = isIndeterminate ? 'subtract' : 'checkmark';
    var inputClassName = styles.classNames(styles$21.Input, isIndeterminate && styles$21['Input-indeterminate']);
    return (
        /* eslint-disable jsx-a11y/no-redundant-roles, jsx-a11y/role-has-required-aria-props */
        React.createElement(
            Choice$1,
            { id: id, label: label, labelHidden: labelHidden, helpText: helpText, error: error, disabled: disabled, __self: this,
                __source: {
                    fileName: _jsxFileName$29,
                    lineNumber: 36
                }
            },
            React.createElement(
                'span',
                { className: wrapperClassName, __self: this,
                    __source: {
                        fileName: _jsxFileName$29,
                        lineNumber: 37
                    }
                },
                React.createElement('input', Object.assign({ id: id, name: name, value: value, type: 'checkbox', checked: isChecked, disabled: disabled, className: inputClassName, onChange: handleChange, onFocus: onFocus, onBlur: onBlur, 'aria-invalid': error != null, 'aria-describedby': ariaDescribedBy, role: 'checkbox' }, indeterminateAttributes, {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$29,
                        lineNumber: 38
                    }
                })),
                React.createElement('span', { className: styles$21.Backdrop, __self: this,
                    __source: {
                        fileName: _jsxFileName$29,
                        lineNumber: 39
                    }
                }),
                React.createElement(
                    'span',
                    { className: styles$21.Icon, __self: this,
                        __source: {
                            fileName: _jsxFileName$29,
                            lineNumber: 40
                        }
                    },
                    React.createElement(Icon$2, { source: iconSource, __self: this,
                        __source: {
                            fileName: _jsxFileName$29,
                            lineNumber: 41
                        }
                    })
                )
            )
        )
        /* eslint-disable jsx-a11y/no-redundant-roles, jsx-a11y/role-has-required-aria-props */

    );
}
var Checkbox$2 = withAppProvider()(Checkbox$1);

var styles$22 = {
  "RadioButton": "Polaris-RadioButton",
  "Input": "Polaris-RadioButton__Input",
  "Backdrop": "Polaris-RadioButton__Backdrop",
  "Icon": "Polaris-RadioButton__Icon",
};

var _jsxFileName$33 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/RadioButton/RadioButton.js';
var getUniqueID$2 = other.createUniqueIDFactory('RadioButton');
function RadioButton$1(_ref) {
    var label = _ref.label,
        labelHidden = _ref.labelHidden,
        helpText = _ref.helpText,
        checked = _ref.checked,
        disabled = _ref.disabled,
        onChange = _ref.onChange,
        onFocus = _ref.onFocus,
        onBlur = _ref.onBlur,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? getUniqueID$2() : _ref$id,
        _ref$name = _ref.name,
        name = _ref$name === undefined ? id : _ref$name,
        value = _ref.value;

    function handleChange(_ref2) {
        var currentTarget = _ref2.currentTarget;

        if (onChange == null) {
            return;
        }
        onChange(currentTarget.checked, id);
    }
    var describedBy = helpText ? helpTextID(id) : undefined;
    return React.createElement(
        Choice$1,
        { label: label, labelHidden: labelHidden, disabled: disabled, id: id, helpText: helpText, __self: this,
            __source: {
                fileName: _jsxFileName$33,
                lineNumber: 14
            }
        },
        React.createElement(
            'span',
            { className: styles$22.RadioButton, __self: this,
                __source: {
                    fileName: _jsxFileName$33,
                    lineNumber: 15
                }
            },
            React.createElement('input', { id: id, name: name, value: value, type: 'radio', checked: checked, disabled: disabled, className: styles$22.Input, onChange: handleChange, onFocus: onFocus, onBlur: onBlur, 'aria-describedby': describedBy, __self: this,
                __source: {
                    fileName: _jsxFileName$33,
                    lineNumber: 16
                }
            }),
            React.createElement('span', { className: styles$22.Backdrop, __self: this,
                __source: {
                    fileName: _jsxFileName$33,
                    lineNumber: 17
                }
            }),
            React.createElement('span', { className: styles$22.Icon, __self: this,
                __source: {
                    fileName: _jsxFileName$33,
                    lineNumber: 18
                }
            })
        )
    );
}

var styles$23 = {
  "ChoiceList": "Polaris-ChoiceList",
  "titleHidden": "Polaris-ChoiceList--titleHidden",
  "Title": "Polaris-ChoiceList__Title",
  "Choices": "Polaris-ChoiceList__Choices",
  "ChoiceChildren": "Polaris-ChoiceList__ChoiceChildren",
  "ChoiceError": "Polaris-ChoiceList__ChoiceError",
};

var _jsxFileName$32 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ChoiceList/ChoiceList.js';
var getUniqueID$1 = other.createUniqueIDFactory('ChoiceList');
function ChoiceList$1(_ref) {
    var _this = this;

    var title = _ref.title,
        titleHidden = _ref.titleHidden,
        allowMultiple = _ref.allowMultiple,
        choices = _ref.choices,
        selected = _ref.selected,
        _ref$onChange = _ref.onChange,
        onChange = _ref$onChange === undefined ? other.noop : _ref$onChange,
        error = _ref.error,
        _ref$name = _ref.name,
        name = _ref$name === undefined ? getUniqueID$1() : _ref$name;

    var ControlComponent = allowMultiple ? Checkbox$2 : RadioButton$1;
    var finalName = allowMultiple ? name + '[]' : name;
    var className = styles.classNames(styles$23.ChoiceList, titleHidden && styles$23.titleHidden);
    var titleMarkup = title ? React.createElement(
        'legend',
        { className: styles$23.Title, __self: this,
            __source: {
                fileName: _jsxFileName$32,
                lineNumber: 16
            }
        },
        title
    ) : null;
    var choicesMarkup = choices.map(function (choice) {
        var value = choice.value,
            label = choice.label,
            helpText = choice.helpText,
            disabled = choice.disabled;

        function handleChange(checked) {
            onChange(updateSelectedChoices(choice, checked, selected, allowMultiple), name);
        }
        var isSelected = choiceIsSelected(choice, selected);
        var children = choice.renderChildren ? React.createElement(
            'div',
            { className: styles$23.ChoiceChildren, __self: _this,
                __source: {
                    fileName: _jsxFileName$32,
                    lineNumber: 23
                }
            },
            choice.renderChildren(isSelected)
        ) : null;
        return React.createElement(
            'li',
            { key: value, __self: _this,
                __source: {
                    fileName: _jsxFileName$32,
                    lineNumber: 26
                }
            },
            React.createElement(ControlComponent, { name: finalName, value: value, label: label, disabled: disabled, checked: choiceIsSelected(choice, selected), helpText: helpText, onChange: handleChange, __self: _this,
                __source: {
                    fileName: _jsxFileName$32,
                    lineNumber: 27
                }
            }),
            children
        );
    });
    var errorMarkup = error && React.createElement(
        'div',
        { className: styles$23.ChoiceError, __self: this,
            __source: {
                fileName: _jsxFileName$32,
                lineNumber: 31
            }
        },
        React.createElement(InlineError$1, { message: error, fieldID: finalName, __self: this,
            __source: {
                fileName: _jsxFileName$32,
                lineNumber: 32
            }
        })
    );
    return React.createElement(
        'fieldset',
        { className: className, id: finalName, 'aria-invalid': error != null, 'aria-describedby': finalName + 'Error', __self: this,
            __source: {
                fileName: _jsxFileName$32,
                lineNumber: 34
            }
        },
        titleMarkup,
        React.createElement(
            'ul',
            { className: styles$23.Choices, __self: this,
                __source: {
                    fileName: _jsxFileName$32,
                    lineNumber: 36
                }
            },
            choicesMarkup
        ),
        errorMarkup
    );
}
function choiceIsSelected(_ref2, selected) {
    var value = _ref2.value;

    return selected.indexOf(value) >= 0;
}
function updateSelectedChoices(_ref3, checked, selected) {
    var value = _ref3.value;
    var allowMultiple = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (checked) {
        return allowMultiple ? [].concat(_toConsumableArray(selected), [value]) : [value];
    }
    return selected.filter(function (selectedChoice) {
        return selectedChoice !== value;
    });
}
withAppProvider()(ChoiceList$1);

var styles$24 = {
  "Collapsible": "Polaris-Collapsible",
  "animating": "Polaris-Collapsible--animating",
  "open": "Polaris-Collapsible--open",
};

var _jsxFileName$34 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Collapsible/Collapsible.js';
var CONTEXT_TYPES = {
    parentCollapsibleExpanding: PropTypes.bool
};
var Collapsible$1 = function (_React$Component) {
    _inherits(Collapsible, _React$Component);

    function Collapsible() {
        _classCallCheck(this, Collapsible);

        var _this = _possibleConstructorReturn(this, (Collapsible.__proto__ || Object.getPrototypeOf(Collapsible)).apply(this, arguments));

        _this.state = {
            height: null,
            animationState: 'idle'
        };
        _this.node = null;
        _this.heightNode = null;
        return _this;
    }

    _createClass(Collapsible, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var open = this.props.open;
            var animationState = this.state.animationState;
            var parentCollapsibleExpanding = this.context.parentCollapsibleExpanding;

            return {
                parentCollapsibleExpanding: parentCollapsibleExpanding || open && animationState !== 'idle'
            };
        }
        // eslint-disable-next-line react/no-deprecated

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var willOpen = _ref.open;
            var open = this.props.open;

            if (open !== willOpen) {
                this.setState({ animationState: 'measuring' });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(_ref2) {
            var _this2 = this;

            var wasOpen = _ref2.open;
            var animationState = this.state.animationState;
            var parentCollapsibleExpanding = this.context.parentCollapsibleExpanding;

            if (parentCollapsibleExpanding && animationState !== 'idle') {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({
                    animationState: 'idle'
                });
                return;
            }
            fastdom.read(function () {
                switch (animationState) {
                    case 'idle':
                        break;
                    case 'measuring':
                        _this2.setState({
                            animationState: wasOpen ? 'closingStart' : 'openingStart',
                            height: wasOpen && _this2.heightNode ? _this2.heightNode.scrollHeight : 0
                        });
                        break;
                    case 'closingStart':
                        _this2.setState({
                            animationState: 'closing',
                            height: 0
                        });
                        break;
                    case 'openingStart':
                        _this2.setState({
                            animationState: 'opening',
                            height: _this2.heightNode ? _this2.heightNode.scrollHeight : 0
                        });
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.node == null) {
                return;
            }
            events.addEventListener(this.node, 'transitionend', this.handleTransitionEnd);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.node == null) {
                return;
            }
            events.removeEventListener(this.node, 'transitionend', this.handleTransitionEnd);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                open = _props.open,
                children = _props.children;
            var _state = this.state,
                animationState = _state.animationState,
                height = _state.height;

            var animating = animationState !== 'idle';
            var wrapperClassName = styles.classNames(styles$24.Collapsible, open && styles$24.open, animating && styles$24.animating);
            var displayHeight = collapsibleHeight(open, animationState, height);
            var content = animating || open ? children : null;
            return React.createElement(
                'div',
                { id: id, 'aria-hidden': !open, style: { height: displayHeight }, className: wrapperClassName, ref: this.bindNode, __self: this,
                    __source: {
                        fileName: _jsxFileName$34,
                        lineNumber: 91
                    }
                },
                React.createElement(
                    'div',
                    { ref: this.bindHeightNode, __self: this,
                        __source: {
                            fileName: _jsxFileName$34,
                            lineNumber: 92
                        }
                    },
                    content
                )
            );
        }
    }, {
        key: 'bindNode',
        value: function bindNode(node) {
            this.node = node;
        }
    }, {
        key: 'bindHeightNode',
        value: function bindHeightNode(node) {
            this.heightNode = node;
        }
    }, {
        key: 'handleTransitionEnd',
        value: function handleTransitionEnd(event) {
            var target$$1 = event.target;

            if (target$$1 === this.node) {
                this.setState({ animationState: 'idle', height: null });
            }
        }
    }]);

    return Collapsible;
}(React.Component);
Collapsible$1.contextTypes = CONTEXT_TYPES;
Collapsible$1.childContextTypes = CONTEXT_TYPES;
tslib_1.__decorate([decorators.autobind], Collapsible$1.prototype, "bindNode", null);
tslib_1.__decorate([decorators.autobind], Collapsible$1.prototype, "bindHeightNode", null);
tslib_1.__decorate([decorators.autobind], Collapsible$1.prototype, "handleTransitionEnd", null);
function collapsibleHeight(open, animationState, height) {
    if (animationState === 'idle' && open) {
        return open ? 'auto' : undefined;
    }
    if (animationState === 'measuring') {
        return open ? undefined : 'auto';
    }
    return (height || 0) + 'px';
}
withAppProvider()(Collapsible$1);

function hsbToRgb(color) {
    var hue = color.hue,
        saturation = color.saturation,
        brightness = color.brightness,
        _color$alpha = color.alpha,
        alpha = _color$alpha === undefined ? 1 : _color$alpha;

    var chroma = brightness * saturation;
    var huePrime = hue / 60;
    var hueDelta = 1 - Math.abs(huePrime % 2 - 1);
    var intermediateValue = chroma * hueDelta;
    var red = 0;
    var green = 0;
    var blue = 0;
    if (huePrime >= 0 && huePrime <= 1) {
        red = chroma;
        green = intermediateValue;
        blue = 0;
    }
    if (huePrime >= 1 && huePrime <= 2) {
        red = intermediateValue;
        green = chroma;
        blue = 0;
    }
    if (huePrime >= 2 && huePrime <= 3) {
        red = 0;
        green = chroma;
        blue = intermediateValue;
    }
    if (huePrime >= 3 && huePrime <= 4) {
        red = 0;
        green = intermediateValue;
        blue = chroma;
    }
    if (huePrime >= 4 && huePrime <= 5) {
        red = intermediateValue;
        green = 0;
        blue = chroma;
    }
    if (huePrime >= 5 && huePrime <= 6) {
        red = chroma;
        green = 0;
        blue = intermediateValue;
    }
    var chromaBrightnessDelta = brightness - chroma;
    red += chromaBrightnessDelta;
    green += chromaBrightnessDelta;
    blue += chromaBrightnessDelta;
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha: alpha
    };
}

var VERTICAL_PADDING = 13;
function calculateDraggerY(alpha, sliderHeight, draggerHeight) {
    var offset = offsetForAlpha(alpha, sliderHeight, draggerHeight);
    return math.clamp(offset, 0, sliderHeight);
}
function alphaForDraggerY(y, sliderHeight) {
    var offsetY = math.clamp(y, 0, sliderHeight);
    return alphaForOffset(offsetY, sliderHeight);
}
function alphaForOffset(offset, sliderHeight) {
    var selectionHeight = offset - VERTICAL_PADDING;
    var slidableArea = sliderHeight - VERTICAL_PADDING * 2;
    return math.clamp(1 - selectionHeight / slidableArea, 0, 1);
}
function offsetForAlpha(alpha, sliderHeight, draggerHeight) {
    var slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING);
    return math.clamp((1 - alpha) * slidableArea + VERTICAL_PADDING, 0, sliderHeight - draggerHeight);
}

// see https://github.com/oliviertassinari/react-event-listener/

var EventListener$1 = function (_React$PureComponent) {
    _inherits(EventListener, _React$PureComponent);

    function EventListener() {
        _classCallCheck(this, EventListener);

        return _possibleConstructorReturn(this, (EventListener.__proto__ || Object.getPrototypeOf(EventListener)).apply(this, arguments));
    }

    _createClass(EventListener, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.attachListener();
        }
        // eslint-disable-next-line react/no-deprecated

    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            this.detachListener();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.attachListener();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.detachListener();
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }, {
        key: 'attachListener',
        value: function attachListener() {
            var _props = this.props,
                event = _props.event,
                handler = _props.handler,
                capture = _props.capture,
                passive = _props.passive;

            events.addEventListener(window, event, handler, { capture: capture, passive: passive });
        }
    }, {
        key: 'detachListener',
        value: function detachListener() {
            var _props2 = this.props,
                event = _props2.event,
                handler = _props2.handler,
                capture = _props2.capture;

            events.removeEventListener(window, event, handler, capture);
        }
    }]);

    return EventListener;
}(React.PureComponent);

var styles$25 = {
  "ColorPicker": "Polaris-ColorPicker",
  "MainColor": "Polaris-ColorPicker__MainColor",
  "Dragger": "Polaris-ColorPicker__Dragger",
  "ColorLayer": "Polaris-ColorPicker__ColorLayer",
  "HuePicker": "Polaris-ColorPicker__HuePicker",
  "AlphaPicker": "Polaris-ColorPicker__AlphaPicker",
  "Slidable": "Polaris-ColorPicker__Slidable",
};

var _jsxFileName$37 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ColorPicker/components/Slidable/Slidable.js';
var Slidable$1 = function (_React$PureComponent) {
    _inherits(Slidable, _React$PureComponent);

    function Slidable() {
        _classCallCheck(this, Slidable);

        var _this = _possibleConstructorReturn(this, (Slidable.__proto__ || Object.getPrototypeOf(Slidable)).apply(this, arguments));

        _this.state = {
            dragging: false
        };
        _this.node = null;
        _this.draggerNode = null;
        return _this;
    }

    _createClass(Slidable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var onDraggerHeight = this.props.onDraggerHeight;

            if (onDraggerHeight == null) {
                return;
            }
            var draggerNode = this.draggerNode;

            if (draggerNode == null) {
                return;
            }
            onDraggerHeight(draggerNode.clientWidth);
            if (process.env.NODE_ENV === 'development') {
                setTimeout(function () {
                    onDraggerHeight(draggerNode.clientWidth);
                }, 0);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var dragging = this.state.dragging;
            var _props = this.props,
                _props$draggerX = _props.draggerX,
                draggerX = _props$draggerX === undefined ? 0 : _props$draggerX,
                _props$draggerY = _props.draggerY,
                draggerY = _props$draggerY === undefined ? 0 : _props$draggerY;

            var draggerPositioning = {
                transform: 'translate3d(' + draggerX + 'px, ' + draggerY + 'px, 0)'
            };
            var moveListener = dragging ? React.createElement(EventListener$1, { event: 'mousemove', handler: this.handleMove, __self: this,
                __source: {
                    fileName: _jsxFileName$37,
                    lineNumber: 37
                }
            }) : null;
            var touchMoveListener = dragging ? React.createElement(EventListener$1, { event: 'touchmove', handler: this.handleMove, __self: this,
                __source: {
                    fileName: _jsxFileName$37,
                    lineNumber: 38
                }
            }) : null;
            var endDragListener = dragging ? React.createElement(EventListener$1, { event: 'mouseup', handler: this.handleDragEnd, __self: this,
                __source: {
                    fileName: _jsxFileName$37,
                    lineNumber: 39
                }
            }) : null;
            var touchEndListener = dragging ? React.createElement(EventListener$1, { event: 'touchend', handler: this.handleDragEnd, __self: this,
                __source: {
                    fileName: _jsxFileName$37,
                    lineNumber: 40
                }
            }) : null;
            var touchCancelListener = dragging ? React.createElement(EventListener$1, { event: 'touchcancel', handler: this.handleDragEnd, __self: this,
                __source: {
                    fileName: _jsxFileName$37,
                    lineNumber: 41
                }
            }) : null;
            return React.createElement(
                'div',
                { ref: this.setNode, className: styles$25.Slidable, onMouseDown: this.startDrag, onTouchStart: this.startDrag, __self: this,
                    __source: {
                        fileName: _jsxFileName$37,
                        lineNumber: 42
                    }
                },
                endDragListener,
                moveListener,
                touchMoveListener,
                touchEndListener,
                touchCancelListener,
                React.createElement('div', { style: draggerPositioning, className: styles$25.Dragger, ref: this.setDraggerNode, __self: this,
                    __source: {
                        fileName: _jsxFileName$37,
                        lineNumber: 48
                    }
                })
            );
        }
    }, {
        key: 'setDraggerNode',
        value: function setDraggerNode(node) {
            this.draggerNode = node;
        }
    }, {
        key: 'setNode',
        value: function setNode(node) {
            this.node = node;
        }
    }, {
        key: 'startDrag',
        value: function startDrag(event) {
            if (event.type === 'mousedown') {
                var mouseEvent = event;
                this.handleDraggerMove(mouseEvent.clientX, mouseEvent.clientY);
            }
            this.setState({ dragging: true });
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
            this.setState({ dragging: false });
        }
    }, {
        key: 'handleMove',
        value: function handleMove(event) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
            if (event.type === 'mousemove') {
                var mouseEvent = event;
                this.handleDraggerMove(mouseEvent.clientX, mouseEvent.clientY);
                return;
            }
            var touchEvent = event;
            this.handleDraggerMove(touchEvent.touches[0].clientX, touchEvent.touches[0].clientY);
        }
    }, {
        key: 'handleDraggerMove',
        value: function handleDraggerMove(x, y) {
            if (this.node == null) {
                return;
            }
            var onChange = this.props.onChange;

            var rect = this.node.getBoundingClientRect();
            var offsetX = x - rect.left;
            var offsetY = y - rect.top;
            onChange({ x: offsetX, y: offsetY });
        }
    }]);

    return Slidable;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], Slidable$1.prototype, "setDraggerNode", null);
tslib_1.__decorate([decorators.autobind], Slidable$1.prototype, "setNode", null);
tslib_1.__decorate([decorators.autobind], Slidable$1.prototype, "startDrag", null);
tslib_1.__decorate([decorators.autobind], Slidable$1.prototype, "handleDragEnd", null);
tslib_1.__decorate([decorators.autobind], Slidable$1.prototype, "handleMove", null);
tslib_1.__decorate([decorators.autobind], Slidable$1.prototype, "handleDraggerMove", null);

var _jsxFileName$36 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ColorPicker/components/AlphaPicker/AlphaPicker.js';
var AlphaPicker$1 = function (_React$PureComponent) {
    _inherits(AlphaPicker, _React$PureComponent);

    function AlphaPicker() {
        _classCallCheck(this, AlphaPicker);

        var _this = _possibleConstructorReturn(this, (AlphaPicker.__proto__ || Object.getPrototypeOf(AlphaPicker)).apply(this, arguments));

        _this.state = {
            sliderHeight: 0,
            draggerHeight: 0
        };
        return _this;
    }

    _createClass(AlphaPicker, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                color = _props.color,
                alpha = _props.alpha;
            var _state = this.state,
                sliderHeight = _state.sliderHeight,
                draggerHeight = _state.draggerHeight;

            var draggerY = calculateDraggerY(alpha, sliderHeight, draggerHeight);
            var background = alphaGradientForColor(color);
            return React.createElement(
                'div',
                { className: styles$25.AlphaPicker, ref: this.setSliderHeight, __self: this,
                    __source: {
                        fileName: _jsxFileName$36,
                        lineNumber: 21
                    }
                },
                React.createElement('div', { className: styles$25.ColorLayer, style: { background: background }, __self: this,
                    __source: {
                        fileName: _jsxFileName$36,
                        lineNumber: 22
                    }
                }),
                React.createElement(Slidable$1, { draggerY: draggerY, draggerX: 0, onChange: this.handleChange, onDraggerHeight: this.setDraggerHeight, __self: this,
                    __source: {
                        fileName: _jsxFileName$36,
                        lineNumber: 23
                    }
                })
            );
        }
    }, {
        key: 'setSliderHeight',
        value: function setSliderHeight(node) {
            var _this2 = this;

            if (node == null) {
                return;
            }
            this.setState({ sliderHeight: node.clientHeight });
            if (process.env.NODE_ENV === 'development') {
                setTimeout(function () {
                    _this2.setState({ sliderHeight: node.clientHeight });
                }, 0);
            }
        }
    }, {
        key: 'setDraggerHeight',
        value: function setDraggerHeight(height) {
            this.setState({
                draggerHeight: height
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(_ref) {
            var y = _ref.y;
            var onChange = this.props.onChange;
            var sliderHeight = this.state.sliderHeight;

            var alpha = alphaForDraggerY(y, sliderHeight);
            onChange(alpha);
        }
    }]);

    return AlphaPicker;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], AlphaPicker$1.prototype, "setSliderHeight", null);
tslib_1.__decorate([decorators.autobind], AlphaPicker$1.prototype, "setDraggerHeight", null);
tslib_1.__decorate([decorators.autobind], AlphaPicker$1.prototype, "handleChange", null);
function alphaGradientForColor(color) {
    var _hsbToRgb = hsbToRgb(color),
        red = _hsbToRgb.red,
        green = _hsbToRgb.green,
        blue = _hsbToRgb.blue;

    var rgb = red + ', ' + green + ', ' + blue;
    return 'linear-gradient(to top, rgba(' + rgb + ', 0) 18px, rgba(' + rgb + ', 1) calc(100% - 18px))';
}

var VERTICAL_PADDING$1 = 13;
function calculateDraggerY$1(hue, sliderHeight, draggerHeight) {
    var offset = offsetForHue(hue, sliderHeight, draggerHeight);
    return math.clamp(offset, 0, sliderHeight);
}
function hueForDraggerY(y, sliderHeight) {
    var offsetY = math.clamp(y, 0, sliderHeight);
    return hueForOffset(offsetY, sliderHeight);
}
function hueForOffset(offset, sliderHeight) {
    var selectionHeight = offset - VERTICAL_PADDING$1;
    var slidableArea = sliderHeight - VERTICAL_PADDING$1 * 2;
    return math.clamp(selectionHeight / slidableArea * 360, 0, 360);
}
function offsetForHue(hue, sliderHeight, draggerHeight) {
    var slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING$1);
    return math.clamp(hue / 360 * slidableArea + VERTICAL_PADDING$1, 0, sliderHeight - draggerHeight);
}

var _jsxFileName$38 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ColorPicker/components/HuePicker/HuePicker.js';
var HuePicker$1 = function (_React$PureComponent) {
    _inherits(HuePicker, _React$PureComponent);

    function HuePicker() {
        _classCallCheck(this, HuePicker);

        var _this = _possibleConstructorReturn(this, (HuePicker.__proto__ || Object.getPrototypeOf(HuePicker)).apply(this, arguments));

        _this.state = {
            sliderHeight: 0,
            draggerHeight: 0
        };
        return _this;
    }

    _createClass(HuePicker, [{
        key: 'render',
        value: function render() {
            var hue = this.props.hue;
            var _state = this.state,
                sliderHeight = _state.sliderHeight,
                draggerHeight = _state.draggerHeight;

            var draggerY = calculateDraggerY$1(hue, sliderHeight, draggerHeight);
            return React.createElement(
                'div',
                { className: styles$25.HuePicker, ref: this.setSliderHeight, __self: this,
                    __source: {
                        fileName: _jsxFileName$38,
                        lineNumber: 19
                    }
                },
                React.createElement(Slidable$1, { draggerY: draggerY, draggerX: 0, onChange: this.handleChange, onDraggerHeight: this.setDraggerHeight, __self: this,
                    __source: {
                        fileName: _jsxFileName$38,
                        lineNumber: 20
                    }
                })
            );
        }
    }, {
        key: 'setSliderHeight',
        value: function setSliderHeight(node) {
            var _this2 = this;

            if (node == null) {
                return;
            }
            this.setState({ sliderHeight: node.clientHeight });
            if (process.env.NODE_ENV === 'development') {
                setTimeout(function () {
                    _this2.setState({ sliderHeight: node.clientHeight });
                }, 0);
            }
        }
    }, {
        key: 'setDraggerHeight',
        value: function setDraggerHeight(height) {
            this.setState({
                draggerHeight: height
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(_ref) {
            var y = _ref.y;
            var onChange = this.props.onChange;
            var sliderHeight = this.state.sliderHeight;

            var hue = hueForDraggerY(y, sliderHeight);
            onChange(hue);
        }
    }]);

    return HuePicker;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], HuePicker$1.prototype, "setSliderHeight", null);
tslib_1.__decorate([decorators.autobind], HuePicker$1.prototype, "setDraggerHeight", null);
tslib_1.__decorate([decorators.autobind], HuePicker$1.prototype, "handleChange", null);

var _jsxFileName$35 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ColorPicker/ColorPicker.js';
var ColorPicker$1 = function (_React$PureComponent) {
    _inherits(ColorPicker, _React$PureComponent);

    function ColorPicker() {
        _classCallCheck(this, ColorPicker);

        var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).apply(this, arguments));

        _this.state = {
            pickerSize: 0
        };
        _this.colorNode = null;
        return _this;
    }

    _createClass(ColorPicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var colorNode = this.colorNode;

            if (colorNode == null) {
                return;
            }
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({ pickerSize: colorNode.clientWidth });
            if (process.env.NODE_ENV === 'development') {
                setTimeout(function () {
                    _this2.setState({ pickerSize: colorNode.clientWidth });
                }, 0);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                color = _props.color,
                allowAlpha = _props.allowAlpha;
            var hue = color.hue,
                saturation = color.saturation,
                brightness = color.brightness,
                providedAlpha = color.alpha;
            var pickerSize = this.state.pickerSize;

            var alpha = providedAlpha != null && allowAlpha ? providedAlpha : 1;

            var _hsbToRgb = hsbToRgb({ hue: hue, saturation: 1, brightness: 1 }),
                red = _hsbToRgb.red,
                green = _hsbToRgb.green,
                blue = _hsbToRgb.blue;

            var colorString = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
            var draggerX = math.clamp(saturation * pickerSize, 0, pickerSize);
            var draggerY = math.clamp(pickerSize - brightness * pickerSize, 0, pickerSize);
            var alphaSliderMarkup = allowAlpha ? React.createElement(AlphaPicker$1, { alpha: alpha, color: color, onChange: this.handleAlphaChange, __self: this,
                __source: {
                    fileName: _jsxFileName$35,
                    lineNumber: 38
                }
            }) : null;
            return React.createElement(
                'div',
                { className: styles$25.ColorPicker, id: id, __self: this,
                    __source: {
                        fileName: _jsxFileName$35,
                        lineNumber: 39
                    }
                },
                React.createElement(
                    'div',
                    { ref: this.setColorNode, className: styles$25.MainColor, __self: this,
                        __source: {
                            fileName: _jsxFileName$35,
                            lineNumber: 40
                        }
                    },
                    React.createElement('div', { className: styles$25.ColorLayer, style: { backgroundColor: colorString }, __self: this,
                        __source: {
                            fileName: _jsxFileName$35,
                            lineNumber: 41
                        }
                    }),
                    React.createElement(Slidable$1, { onChange: this.handleDraggerMove, draggerX: draggerX, draggerY: draggerY, __self: this,
                        __source: {
                            fileName: _jsxFileName$35,
                            lineNumber: 42
                        }
                    })
                ),
                React.createElement(HuePicker$1, { hue: hue, onChange: this.handleHueChange, __self: this,
                    __source: {
                        fileName: _jsxFileName$35,
                        lineNumber: 44
                    }
                }),
                alphaSliderMarkup
            );
        }
    }, {
        key: 'setColorNode',
        value: function setColorNode(node) {
            this.colorNode = node;
        }
    }, {
        key: 'handleHueChange',
        value: function handleHueChange(hue) {
            var _props2 = this.props,
                _props2$color = _props2.color,
                brightness = _props2$color.brightness,
                saturation = _props2$color.saturation,
                _props2$color$alpha = _props2$color.alpha,
                alpha = _props2$color$alpha === undefined ? 1 : _props2$color$alpha,
                onChange = _props2.onChange;

            onChange({ hue: hue, brightness: brightness, saturation: saturation, alpha: alpha });
        }
    }, {
        key: 'handleAlphaChange',
        value: function handleAlphaChange(alpha) {
            var _props3 = this.props,
                _props3$color = _props3.color,
                hue = _props3$color.hue,
                brightness = _props3$color.brightness,
                saturation = _props3$color.saturation,
                onChange = _props3.onChange;

            onChange({ hue: hue, brightness: brightness, saturation: saturation, alpha: alpha });
        }
    }, {
        key: 'handleDraggerMove',
        value: function handleDraggerMove(_ref) {
            var x = _ref.x,
                y = _ref.y;
            var pickerSize = this.state.pickerSize;
            var _props4 = this.props,
                _props4$color = _props4.color,
                hue = _props4$color.hue,
                _props4$color$alpha = _props4$color.alpha,
                alpha = _props4$color$alpha === undefined ? 1 : _props4$color$alpha,
                onChange = _props4.onChange;

            var saturation = math.clamp(x / pickerSize, 0, 1);
            var brightness = math.clamp(1 - y / pickerSize, 0, 1);
            onChange({ hue: hue, saturation: saturation, brightness: brightness, alpha: alpha });
        }
    }]);

    return ColorPicker;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], ColorPicker$1.prototype, "setColorNode", null);
tslib_1.__decorate([decorators.autobind], ColorPicker$1.prototype, "handleHueChange", null);
tslib_1.__decorate([decorators.autobind], ColorPicker$1.prototype, "handleAlphaChange", null);
tslib_1.__decorate([decorators.autobind], ColorPicker$1.prototype, "handleDraggerMove", null);

var styles$26 = {
  "Connected": "Polaris-Connected",
  "Item": "Polaris-Connected__Item",
  "Item-primary": "Polaris-Connected__Item--primary",
  "Item-connection": "Polaris-Connected__Item--connection",
  "Item-focused": "Polaris-Connected__Item--focused",
};

var _jsxFileName$40 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Connected/components/Item/Item.js';
var ItemPosition;
(function (ItemPosition) {
    ItemPosition[ItemPosition["Left"] = 0] = "Left";
    ItemPosition[ItemPosition["Primary"] = 1] = "Primary";
    ItemPosition[ItemPosition["Right"] = 2] = "Right";
})(ItemPosition || (ItemPosition = {}));

var Item$6 = function (_React$PureComponent) {
    _inherits(Item, _React$PureComponent);

    function Item() {
        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));

        _this.state = { focused: false };
        return _this;
    }

    _createClass(Item, [{
        key: 'render',
        value: function render() {
            var focused = this.state.focused;
            var _props = this.props,
                children = _props.children,
                position = _props.position;

            var className = styles.classNames(styles$26.Item, focused && styles$26['Item-focused'], position === ItemPosition.Primary ? styles$26['Item-primary'] : styles$26['Item-connection']);
            return React.createElement(
                'div',
                { onBlur: this.handleBlur, onFocus: this.handleFocus, className: className, __self: this,
                    __source: {
                        fileName: _jsxFileName$40,
                        lineNumber: 23
                    }
                },
                children
            );
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            this.setState({ focused: false });
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus() {
            this.setState({ focused: true });
        }
    }]);

    return Item;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], Item$6.prototype, "handleBlur", null);
tslib_1.__decorate([decorators.autobind], Item$6.prototype, "handleFocus", null);

var _jsxFileName$39 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Connected/Connected.js';
function Connected$1(_ref) {
    var children = _ref.children,
        left = _ref.left,
        right = _ref.right;

    if (left == null && right == null) {
        return React.Children.only(children);
    }
    var leftConnectionMarkup = left ? React.createElement(
        Item$6,
        { position: ItemPosition.Left, __self: this,
            __source: {
                fileName: _jsxFileName$39,
                lineNumber: 8
            }
        },
        left
    ) : null;
    var rightConnectionMarkup = right ? React.createElement(
        Item$6,
        { position: ItemPosition.Right, __self: this,
            __source: {
                fileName: _jsxFileName$39,
                lineNumber: 9
            }
        },
        right
    ) : null;
    return React.createElement(
        'div',
        { className: styles$26.Connected, __self: this,
            __source: {
                fileName: _jsxFileName$39,
                lineNumber: 10
            }
        },
        leftConnectionMarkup,
        React.createElement(
            Item$6,
            { position: ItemPosition.Primary, __self: this,
                __source: {
                    fileName: _jsxFileName$39,
                    lineNumber: 12
                }
            },
            children
        ),
        rightConnectionMarkup
    );
}

var styles$27 = {
  "DataTable": "Polaris-DataTable",
  "collapsed": "Polaris-DataTable--collapsed",
  "Table": "Polaris-DataTable__Table",
  "Navigation": "Polaris-DataTable__Navigation",
  "ScrollContainer": "Polaris-DataTable__ScrollContainer",
  "hasFooter": "Polaris-DataTable--hasFooter",
  "Pip": "Polaris-DataTable__Pip",
  "Pip-visible": "Polaris-DataTable__Pip--visible",
  "TableRow": "Polaris-DataTable__TableRow",
  "Cell": "Polaris-DataTable__Cell",
  "TableFoot": "Polaris-DataTable__TableFoot",
  "Cell-numeric": "Polaris-DataTable__Cell--numeric",
  "Cell-fixed": "Polaris-DataTable__Cell--fixed",
  "Cell-truncated": "Polaris-DataTable__Cell--truncated",
  "Cell-header": "Polaris-DataTable__Cell--header",
  "Cell-sortable": "Polaris-DataTable__Cell--sortable",
  "Heading": "Polaris-DataTable__Heading",
  "Icon": "Polaris-DataTable__Icon",
  "Heading-left": "Polaris-DataTable__Heading--left",
  "Cell-sorted": "Polaris-DataTable__Cell--sorted",
  "Cell-total": "Polaris-DataTable__Cell--total",
  "Cell-footer": "Polaris-DataTable__Cell--footer",
};

var _jsxFileName$42 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/DataTable/components/Cell/Cell.js';
function Cell$1(_ref) {
  var height = _ref.height,
      content = _ref.content,
      contentType = _ref.contentType,
      fixed = _ref.fixed,
      truncate = _ref.truncate,
      header = _ref.header,
      total = _ref.total,
      footer = _ref.footer,
      sorted = _ref.sorted,
      sortable = _ref.sortable,
      sortDirection = _ref.sortDirection,
      defaultSortDirection = _ref.defaultSortDirection,
      translate = _ref.polaris.intl.translate,
      onSort = _ref.onSort;

  var numeric = contentType === 'numeric';
  var className = styles.classNames(styles$27.Cell, fixed && styles$27['Cell-fixed'], fixed && truncate && styles$27['Cell-truncated'], header && styles$27['Cell-header'], total && styles$27['Cell-total'], footer && styles$27['Cell-footer'], numeric && styles$27['Cell-numeric'], sortable && styles$27['Cell-sortable'], sorted && styles$27['Cell-sorted']);
  var headerClassName = styles.classNames(header && styles$27.Heading, header && contentType === 'text' && styles$27['Heading-left']);
  var iconClassName = styles.classNames(sortable && styles$27.Icon);
  var style = {
    height: height ? height + 'px' : undefined
  };
  var direction = sorted ? sortDirection : defaultSortDirection;
  var source = 'caret' + (direction === 'ascending' ? 'Up' : 'Down');
  var oppositeDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
  var sortAccessibilityLabel = translate('Polaris.DataTable.sortAccessibilityLabel', { direction: sorted ? oppositeDirection : direction });
  var iconMarkup = React.createElement(
    'span',
    { className: iconClassName, __self: this,
      __source: {
        fileName: _jsxFileName$42,
        lineNumber: 18
      }
    },
    React.createElement(Icon$2, { source: source, accessibilityLabel: sortAccessibilityLabel, __self: this,
      __source: {
        fileName: _jsxFileName$42,
        lineNumber: 19
      }
    })
  );
  var sortableHeadingContent = React.createElement(
    'button',
    { className: headerClassName, onClick: onSort, __self: this,
      __source: {
        fileName: _jsxFileName$42,
        lineNumber: 21
      }
    },
    iconMarkup,
    content
  );
  var columnHeadingContent = sortable ? sortableHeadingContent : content;
  var headingMarkup = header ? React.createElement(
    'th',
    { className: className, scope: 'col', 'aria-sort': sortDirection, style: style, __self: this,
      __source: {
        fileName: _jsxFileName$42,
        lineNumber: 26
      }
    },
    columnHeadingContent
  ) : React.createElement(
    'th',
    { className: className, scope: 'row', style: style, __self: this,
      __source: {
        fileName: _jsxFileName$42,
        lineNumber: 28
      }
    },
    content
  );
  var cellMarkup = header || fixed ? headingMarkup : React.createElement(
    'td',
    { className: className, style: style, __self: this,
      __source: {
        fileName: _jsxFileName$42,
        lineNumber: 31
      }
    },
    content
  );
  return cellMarkup;
}
var Cell$2 = withAppProvider()(Cell$1);

var _jsxFileName$43 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/DataTable/components/Navigation/Navigation.js';
function Navigation$1(_ref) {
    var _this = this;

    var columnVisibilityData = _ref.columnVisibilityData,
        isScrolledFarthestLeft = _ref.isScrolledFarthestLeft,
        isScrolledFarthestRight = _ref.isScrolledFarthestRight,
        navigateTableLeft = _ref.navigateTableLeft,
        navigateTableRight = _ref.navigateTableRight,
        translate = _ref.polaris.intl.translate;

    var pipMarkup = columnVisibilityData.map(function (column, index) {
        var className = styles.classNames(styles$27.Pip, column.isVisible && styles$27['Pip-visible']);
        return React.createElement('div', { className: className, key: 'pip-' + index, __self: _this,
            __source: {
                fileName: _jsxFileName$43,
                lineNumber: 9
            }
        });
    });
    var leftA11yLabel = translate('Polaris.DataTable.navAccessibilityLabel', {
        direction: 'left'
    });
    var rightA11yLabel = translate('Polaris.DataTable.navAccessibilityLabel', {
        direction: 'right'
    });
    return React.createElement(
        'div',
        { className: styles$27.Navigation, __self: this,
            __source: {
                fileName: _jsxFileName$43,
                lineNumber: 17
            }
        },
        React.createElement(Button$2, { plain: true, icon: 'chevronLeft', disabled: isScrolledFarthestLeft, accessibilityLabel: leftA11yLabel, onClick: navigateTableLeft, __self: this,
            __source: {
                fileName: _jsxFileName$43,
                lineNumber: 18
            }
        }),
        pipMarkup,
        React.createElement(Button$2, { plain: true, icon: 'chevronRight', disabled: isScrolledFarthestRight, accessibilityLabel: rightA11yLabel, onClick: navigateTableRight, __self: this,
            __source: {
                fileName: _jsxFileName$43,
                lineNumber: 20
            }
        })
    );
}
var Navigation$2 = withAppProvider()(Navigation$1);

var _jsxFileName$41 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/DataTable/DataTable.js';
var DataTable$1 = function (_React$PureComponent) {
    _inherits(DataTable, _React$PureComponent);

    function DataTable(props) {
        _classCallCheck(this, DataTable);

        var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props));

        _this.state = {
            collapsed: false,
            columnVisibilityData: [],
            heights: [],
            preservedScrollPosition: {},
            isScrolledFarthestLeft: true,
            isScrolledFarthestRight: false
        };
        _this.dataTable = React.createRef();
        _this.scrollContainer = React.createRef();
        _this.table = React.createRef();
        var translate = props.polaris.intl.translate;

        _this.totalsRowHeading = translate('Polaris.DataTable.totalsRowHeading');
        return _this;
    }

    _createClass(DataTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            // We need to defer the calculation in development so the styles have time to be injected.
            if (process.env.NODE_ENV === 'development') {
                setTimeout(function () {
                    _this2.handleResize();
                }, 10);
            } else {
                this.handleResize();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (isEqual(prevProps, this.props)) {
                return;
            }
            this.handleResize();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                columnContentTypes = _props.columnContentTypes,
                headings = _props.headings,
                totals = _props.totals,
                rows = _props.rows,
                truncate = _props.truncate,
                footerContent = _props.footerContent,
                sortable = _props.sortable,
                _props$defaultSortDir = _props.defaultSortDirection,
                defaultSortDirection = _props$defaultSortDir === undefined ? 'ascending' : _props$defaultSortDir,
                _props$initialSortCol = _props.initialSortColumnIndex,
                initialSortColumnIndex = _props$initialSortCol === undefined ? 0 : _props$initialSortCol;
            var _state = this.state,
                collapsed = _state.collapsed,
                columnVisibilityData = _state.columnVisibilityData,
                heights = _state.heights,
                _state$sortedColumnIn = _state.sortedColumnIndex,
                sortedColumnIndex = _state$sortedColumnIn === undefined ? initialSortColumnIndex : _state$sortedColumnIn,
                _state$sortDirection = _state.sortDirection,
                sortDirection = _state$sortDirection === undefined ? defaultSortDirection : _state$sortDirection,
                isScrolledFarthestLeft = _state.isScrolledFarthestLeft,
                isScrolledFarthestRight = _state.isScrolledFarthestRight;

            var className = styles.classNames(styles$27.DataTable, collapsed && styles$27.collapsed, footerContent && styles$27.hasFooter);
            var wrapperClassName = styles.classNames(styles$27.TableWrapper, collapsed && styles$27.collapsed);
            var footerClassName = styles.classNames(footerContent && styles$27.TableFoot);
            var footerMarkup = footerContent ? React.createElement(
                'tfoot',
                { className: footerClassName, __self: this,
                    __source: {
                        fileName: _jsxFileName$41,
                        lineNumber: 50
                    }
                },
                React.createElement(
                    'tr',
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$41,
                            lineNumber: 51
                        }
                    },
                    this.renderFooter()
                )
            ) : null;
            var totalsMarkup = totals ? React.createElement(
                'tr',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$41,
                        lineNumber: 53
                    }
                },
                totals.map(this.renderTotals)
            ) : null;
            var headingMarkup = React.createElement(
                'tr',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$41,
                        lineNumber: 54
                    }
                },
                headings.map(function (heading, headingIndex) {
                    var sortableHeadingProps = void 0;
                    var id = 'heading-cell-' + headingIndex;
                    if (sortable) {
                        var isSortable = sortable[headingIndex];
                        var isSorted = sortedColumnIndex === headingIndex;
                        var direction = isSorted ? sortDirection : 'none';
                        sortableHeadingProps = {
                            defaultSortDirection: defaultSortDirection,
                            sorted: isSorted,
                            sortable: isSortable,
                            sortDirection: direction,
                            onSort: _this3.defaultOnSort(headingIndex)
                        };
                    }
                    var height = !truncate ? heights[0] : undefined;
                    return React.createElement(Cell$2, Object.assign({ header: true, key: id, testID: id, height: height, content: heading, contentType: columnContentTypes[headingIndex], fixed: headingIndex === 0, truncate: truncate }, sortableHeadingProps, {
                        __self: _this3,
                        __source: {
                            fileName: _jsxFileName$41,
                            lineNumber: 71
                        }
                    }));
                })
            );
            var bodyMarkup = rows.map(this.defaultRenderRow);
            var style = footerContent ? { marginBottom: heights[heights.length - 1] + 'px' } : undefined;
            return React.createElement(
                'div',
                { className: wrapperClassName, __self: this,
                    __source: {
                        fileName: _jsxFileName$41,
                        lineNumber: 78
                    }
                },
                React.createElement(Navigation$2, { columnVisibilityData: columnVisibilityData, isScrolledFarthestLeft: isScrolledFarthestLeft, isScrolledFarthestRight: isScrolledFarthestRight, navigateTableLeft: this.navigateTable('left'), navigateTableRight: this.navigateTable('right'), __self: this,
                    __source: {
                        fileName: _jsxFileName$41,
                        lineNumber: 79
                    }
                }),
                React.createElement(
                    'div',
                    { className: className, ref: this.dataTable, __self: this,
                        __source: {
                            fileName: _jsxFileName$41,
                            lineNumber: 80
                        }
                    },
                    React.createElement(
                        'div',
                        { className: styles$27.ScrollContainer, ref: this.scrollContainer, style: style, __self: this,
                            __source: {
                                fileName: _jsxFileName$41,
                                lineNumber: 81
                            }
                        },
                        React.createElement(EventListener$1, { event: 'resize', handler: this.handleResize, __self: this,
                            __source: {
                                fileName: _jsxFileName$41,
                                lineNumber: 82
                            }
                        }),
                        React.createElement(EventListener$1, { capture: true, event: 'scroll', handler: this.scrollListener, __self: this,
                            __source: {
                                fileName: _jsxFileName$41,
                                lineNumber: 83
                            }
                        }),
                        React.createElement(
                            'table',
                            { className: styles$27.Table, ref: this.table, __self: this,
                                __source: {
                                    fileName: _jsxFileName$41,
                                    lineNumber: 84
                                }
                            },
                            React.createElement(
                                'thead',
                                {
                                    __self: this,
                                    __source: {
                                        fileName: _jsxFileName$41,
                                        lineNumber: 85
                                    }
                                },
                                headingMarkup,
                                totalsMarkup
                            ),
                            React.createElement(
                                'tbody',
                                {
                                    __self: this,
                                    __source: {
                                        fileName: _jsxFileName$41,
                                        lineNumber: 89
                                    }
                                },
                                bodyMarkup
                            ),
                            footerMarkup
                        )
                    )
                )
            );
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            var _this4 = this;

            var _props2 = this.props,
                footerContent = _props2.footerContent,
                truncate = _props2.truncate;
            var table = this.table.current,
                scrollContainer = this.scrollContainer.current;

            var collapsed = false;
            if (table && scrollContainer) {
                collapsed = table.scrollWidth > scrollContainer.clientWidth;
                scrollContainer.scrollLeft = 0;
            }
            this.setState(Object.assign({ collapsed: collapsed, heights: [] }, this.calculateColumnVisibilityData(collapsed)), function () {
                if (footerContent || !truncate) {
                    _this4.setHeightsAndScrollPosition();
                }
            });
        }
    }, {
        key: 'tallestCellHeights',
        value: function tallestCellHeights() {
            var _props3 = this.props,
                footerContent = _props3.footerContent,
                truncate = _props3.truncate;
            var table = this.table.current;
            var heights = this.state.heights;

            if (table) {
                var rows = Array.from(table.getElementsByTagName('tr'));
                if (!truncate) {
                    return heights = rows.map(function (row) {
                        var fixedCell = row.childNodes[0];
                        return Math.max(row.clientHeight, fixedCell.clientHeight);
                    });
                }
                if (footerContent) {
                    var footerCellHeight = rows[rows.length - 1].childNodes[0].clientHeight;
                    heights = [footerCellHeight];
                }
            }
            return heights;
        }
    }, {
        key: 'resetScrollPosition',
        value: function resetScrollPosition() {
            var scrollContainer = this.scrollContainer.current;

            if (scrollContainer) {
                var _state$preservedScrol = this.state.preservedScrollPosition,
                    left = _state$preservedScrol.left,
                    top = _state$preservedScrol.top;

                if (left) {
                    scrollContainer.scrollLeft = left;
                }
                if (top) {
                    window.scrollTo(0, top);
                }
            }
        }
    }, {
        key: 'setHeightsAndScrollPosition',
        value: function setHeightsAndScrollPosition() {
            this.setState({ heights: this.tallestCellHeights() }, this.resetScrollPosition);
        }
    }, {
        key: 'calculateColumnVisibilityData',
        value: function calculateColumnVisibilityData(collapsed) {
            var table = this.table.current,
                scrollContainer = this.scrollContainer.current,
                dataTable = this.dataTable.current;

            if (collapsed && table && scrollContainer && dataTable) {
                var headerCells = table.querySelectorAll('[class*=header]');
                var collapsedHeaderCells = Array.from(headerCells).slice(1);
                var fixedColumnWidth = headerCells[0].offsetWidth;
                var firstVisibleColumnIndex = collapsedHeaderCells.length - 1;
                var tableLeftVisibleEdge = scrollContainer.scrollLeft + fixedColumnWidth;
                var tableRightVisibleEdge = scrollContainer.scrollLeft + dataTable.offsetWidth;
                var tableData = {
                    fixedColumnWidth: fixedColumnWidth,
                    firstVisibleColumnIndex: firstVisibleColumnIndex,
                    tableLeftVisibleEdge: tableLeftVisibleEdge,
                    tableRightVisibleEdge: tableRightVisibleEdge
                };
                var columnVisibilityData = collapsedHeaderCells.map(measureColumn(tableData));
                var lastColumn = columnVisibilityData[columnVisibilityData.length - 1];
                return Object.assign({ fixedColumnWidth: fixedColumnWidth,
                    columnVisibilityData: columnVisibilityData }, getPrevAndCurrentColumns(tableData, columnVisibilityData), { isScrolledFarthestLeft: tableLeftVisibleEdge === fixedColumnWidth, isScrolledFarthestRight: lastColumn.rightEdge <= tableRightVisibleEdge });
            }
            return {
                columnVisibilityData: [],
                previousColumn: undefined,
                currentColumn: undefined
            };
        }
    }, {
        key: 'scrollListener',
        value: function scrollListener() {
            var _this5 = this;

            this.setState(function (prevState) {
                return Object.assign({}, _this5.calculateColumnVisibilityData(prevState.collapsed));
            });
        }
    }, {
        key: 'navigateTable',
        value: function navigateTable(direction) {
            var _this6 = this;

            var _state2 = this.state,
                currentColumn = _state2.currentColumn,
                previousColumn = _state2.previousColumn,
                fixedColumnWidth = _state2.fixedColumnWidth;
            var scrollContainer = this.scrollContainer.current;

            var handleScroll = function handleScroll() {
                if (!currentColumn || !previousColumn || !fixedColumnWidth) {
                    return;
                }
                if (scrollContainer) {
                    scrollContainer.scrollLeft = direction === 'right' ? currentColumn.rightEdge - fixedColumnWidth : previousColumn.leftEdge - fixedColumnWidth;
                    requestAnimationFrame(function () {
                        _this6.setState(function (prevState) {
                            return Object.assign({}, _this6.calculateColumnVisibilityData(prevState.collapsed));
                        });
                    });
                }
            };
            return handleScroll;
        }
    }, {
        key: 'renderTotals',
        value: function renderTotals(total, index) {
            var id = 'totals-cell-' + index;
            var heights = this.state.heights;
            var _props$truncate = this.props.truncate,
                truncate = _props$truncate === undefined ? false : _props$truncate;

            var content = void 0;
            var contentType = void 0;
            if (index === 0) {
                content = this.totalsRowHeading;
            }
            if (total !== '' && index > 0) {
                contentType = 'numeric';
                content = total;
            }
            return React.createElement(Cell$2, { total: true, fixed: index === 0, testID: id, key: id, height: heights[1], content: content, contentType: contentType, truncate: truncate, __self: this,
                __source: {
                    fileName: _jsxFileName$41,
                    lineNumber: 206
                }
            });
        }
    }, {
        key: 'defaultRenderRow',
        value: function defaultRenderRow(row, index) {
            var _this7 = this;

            var className = styles.classNames(styles$27.TableRow);
            var _props4 = this.props,
                columnContentTypes = _props4.columnContentTypes,
                totals = _props4.totals,
                footerContent = _props4.footerContent,
                _props4$truncate = _props4.truncate,
                truncate = _props4$truncate === undefined ? false : _props4$truncate;
            var heights = this.state.heights;

            var bodyCellHeights = totals ? heights.slice(2) : heights.slice(1);
            if (footerContent) {
                bodyCellHeights.pop();
            }
            return React.createElement(
                'tr',
                { key: 'row-' + index, className: className, __self: this,
                    __source: {
                        fileName: _jsxFileName$41,
                        lineNumber: 216
                    }
                },
                row.map(function (content, cellIndex) {
                    var id = 'cell-' + cellIndex + '-row-' + index;
                    return React.createElement(Cell$2, { key: id, testID: id, height: bodyCellHeights[index], content: content, contentType: columnContentTypes[cellIndex], fixed: cellIndex === 0, truncate: truncate, __self: _this7,
                        __source: {
                            fileName: _jsxFileName$41,
                            lineNumber: 219
                        }
                    });
                })
            );
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var heights = this.state.heights;

            var footerCellHeight = heights[heights.length - 1];
            return React.createElement(Cell$2, { footer: true, testID: 'footer-cell', height: footerCellHeight, content: this.props.footerContent, truncate: this.props.truncate, __self: this,
                __source: {
                    fileName: _jsxFileName$41,
                    lineNumber: 226
                }
            });
        }
    }, {
        key: 'defaultOnSort',
        value: function defaultOnSort(headingIndex) {
            var _this8 = this;

            var _props5 = this.props,
                onSort = _props5.onSort,
                truncate = _props5.truncate,
                _props5$defaultSortDi = _props5.defaultSortDirection,
                defaultSortDirection = _props5$defaultSortDi === undefined ? 'ascending' : _props5$defaultSortDi,
                initialSortColumnIndex = _props5.initialSortColumnIndex;
            var _state3 = this.state,
                sortDirection = _state3.sortDirection,
                _state3$sortedColumnI = _state3.sortedColumnIndex,
                sortedColumnIndex = _state3$sortedColumnI === undefined ? initialSortColumnIndex : _state3$sortedColumnI;

            var newSortDirection = defaultSortDirection;
            if (sortedColumnIndex === headingIndex) {
                newSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
            }
            var handleSort = function handleSort() {
                _this8.setState({
                    sortDirection: newSortDirection,
                    sortedColumnIndex: headingIndex
                }, function () {
                    if (onSort) {
                        onSort(headingIndex, newSortDirection);
                        if (!truncate && _this8.scrollContainer.current) {
                            var preservedScrollPosition = {
                                left: _this8.scrollContainer.current.scrollLeft,
                                top: window.scrollY
                            };
                            _this8.setState({ preservedScrollPosition: preservedScrollPosition });
                            _this8.handleResize();
                        }
                    }
                });
            };
            return handleSort;
        }
    }]);

    return DataTable;
}(React.PureComponent);
tslib_1.__decorate([decorators.autobind, decorators.debounce()], DataTable$1.prototype, "handleResize", null);
tslib_1.__decorate([decorators.autobind], DataTable$1.prototype, "tallestCellHeights", null);
tslib_1.__decorate([decorators.autobind], DataTable$1.prototype, "resetScrollPosition", null);
tslib_1.__decorate([decorators.autobind], DataTable$1.prototype, "setHeightsAndScrollPosition", null);
tslib_1.__decorate([decorators.autobind], DataTable$1.prototype, "calculateColumnVisibilityData", null);
tslib_1.__decorate([decorators.autobind], DataTable$1.prototype, "scrollListener", null);
tslib_1.__decorate([decorators.autobind], DataTable$1.prototype, "navigateTable", null);
tslib_1.__decorate([decorators.autobind], DataTable$1.prototype, "renderTotals", null);
tslib_1.__decorate([decorators.autobind], DataTable$1.prototype, "defaultRenderRow", null);
tslib_1.__decorate([decorators.autobind], DataTable$1.prototype, "renderFooter", null);
tslib_1.__decorate([decorators.autobind], DataTable$1.prototype, "defaultOnSort", null);
function measureColumn(tableData) {
    return function (column, index) {
        var firstVisibleColumnIndex = tableData.firstVisibleColumnIndex,
            tableStart = tableData.tableLeftVisibleEdge,
            tableEnd = tableData.tableRightVisibleEdge,
            fixedColumnWidth = tableData.fixedColumnWidth;

        var leftEdge = column.offsetLeft + fixedColumnWidth;
        var rightEdge = leftEdge + column.offsetWidth;
        var isVisibleLeft = isEdgeVisible(leftEdge, tableStart, tableEnd);
        var isVisibleRight = isEdgeVisible(rightEdge, tableStart, tableEnd);
        var isVisible = isVisibleLeft || isVisibleRight;
        if (isVisible) {
            tableData.firstVisibleColumnIndex = Math.min(firstVisibleColumnIndex, index);
        }
        return { leftEdge: leftEdge, rightEdge: rightEdge, isVisible: isVisible };
    };
}
function isEdgeVisible(position, start, end) {
    var minVisiblePixels = 30;
    return position >= start + minVisiblePixels && position <= end - minVisiblePixels;
}
function getPrevAndCurrentColumns(tableData, columnData) {
    var firstVisibleColumnIndex = tableData.firstVisibleColumnIndex;

    var previousColumnIndex = Math.max(firstVisibleColumnIndex - 1, 0);
    var previousColumn = columnData[previousColumnIndex];
    var currentColumn = columnData[firstVisibleColumnIndex];
    return { previousColumn: previousColumn, currentColumn: currentColumn };
}
withAppProvider()(DataTable$1);

var styles$28 = {
  "DatePicker": "Polaris-DatePicker",
  "MonthContainer": "Polaris-DatePicker__MonthContainer",
  "Month": "Polaris-DatePicker__Month",
  "Month-current": "Polaris-DatePicker__Month--current",
  "Week": "Polaris-DatePicker__Week",
  "WeekHeadings": "Polaris-DatePicker__WeekHeadings",
  "Day": "Polaris-DatePicker__Day",
  "EmptyDay": "Polaris-DatePicker__EmptyDay",
  "Day-today": "Polaris-DatePicker__Day--today",
  "Day-inRange": "Polaris-DatePicker__Day--inRange",
  "Day-selected": "Polaris-DatePicker__Day--selected",
  "Day-disabled": "Polaris-DatePicker__Day--disabled",
  "Weekday": "Polaris-DatePicker__Weekday",
  "Weekday-current": "Polaris-DatePicker__Weekday--current",
  "Header": "Polaris-DatePicker__Header",
  "Title": "Polaris-DatePicker__Title",
};

var _jsxFileName$45 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/DatePicker/components/Day/Day.js';
var Day$1 = function (_React$PureComponent) {
    _inherits(Day, _React$PureComponent);

    function Day() {
        _classCallCheck(this, Day);

        var _this = _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).apply(this, arguments));

        _this.dayNode = null;
        return _this;
    }

    _createClass(Day, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (!prevProps.focused && this.props.focused && this.dayNode) {
                this.dayNode.focus();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                day = _props.day,
                focused = _props.focused,
                onClick = _props.onClick,
                _props$onHover = _props.onHover,
                onHover = _props$onHover === undefined ? other.noop : _props$onHover,
                _props$onFocus = _props.onFocus,
                onFocus = _props$onFocus === undefined ? other.noop : _props$onFocus,
                selected = _props.selected,
                inRange = _props.inRange,
                inHoveringRange = _props.inHoveringRange,
                disabled = _props.disabled,
                intl = _props.polaris.intl;

            var handleHover = onHover.bind(null, day);
            if (!day) {
                return React.createElement('div', { className: styles$28.EmptyDay, onMouseOver: handleHover, __self: this,
                    __source: {
                        fileName: _jsxFileName$45,
                        lineNumber: 23
                    }
                });
            }
            var handleClick = onClick && !disabled ? onClick.bind(null, day) : other.noop;
            var today = dates.isSameDay(new Date(), day);
            var className = styles.classNames(styles$28.Day, selected && styles$28['Day-selected'], disabled && styles$28['Day-disabled'], today && styles$28['Day-today'], (inRange || inHoveringRange) && !disabled && styles$28['Day-inRange']);
            var date = day.getDate();
            var tabIndex = (focused || selected || today || date === 1) && !disabled ? 0 : -1;
            var ariaLabel = ['' + (today ? intl.translate('Polaris.DatePicker.today') : ''), dates.Months[day.getMonth()] + ' ', date + ' ', '' + day.getFullYear()].join('');
            return React.createElement(
                'button',
                {
                    // eslint-disable-next-line react/jsx-no-bind
                    onFocus: onFocus.bind(null, day), type: 'button', ref: this.setNode, tabIndex: tabIndex, className: className, onMouseOver: handleHover
                    // eslint-disable-next-line react/jsx-no-bind
                    , onClick: handleClick, 'aria-label': ariaLabel, 'aria-selected': selected, 'aria-disabled': disabled, role: 'gridcell', __self: this,
                    __source: {
                        fileName: _jsxFileName$45,
                        lineNumber: 36
                    }
                },
                date
            );
        }
    }, {
        key: 'setNode',
        value: function setNode(node) {
            this.dayNode = node;
        }
    }]);

    return Day;
}(React.PureComponent);
tslib_1.__decorate([decorators.autobind], Day$1.prototype, "setNode", null);
var Day$2 = withAppProvider()(Day$1);

var _jsxFileName$47 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/DatePicker/components/Weekday/Weekday.js';
function Weekday$1(_ref) {
    var label = _ref.label,
        title = _ref.title,
        current = _ref.current;

    var className = styles.classNames(styles$28.Weekday, current && styles$28['Weekday-current']);
    return React.createElement(
        'div',
        { 'aria-label': dates.Weekdays[label], className: className, __self: this,
            __source: {
                fileName: _jsxFileName$47,
                lineNumber: 7
            }
        },
        title
    );
}

var _jsxFileName$46 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/DatePicker/components/Month/Month.js';
var WEEKDAYS = [dates.Weekdays.Sunday, dates.Weekdays.Monday, dates.Weekdays.Tuesday, dates.Weekdays.Wednesday, dates.Weekdays.Thursday, dates.Weekdays.Friday, dates.Weekdays.Saturday];
function Month$1(_ref) {
    var _this = this;

    var focusedDate = _ref.focusedDate,
        selected = _ref.selected,
        hoverDate = _ref.hoverDate,
        disableDatesBefore = _ref.disableDatesBefore,
        disableDatesAfter = _ref.disableDatesAfter,
        allowRange = _ref.allowRange,
        _ref$onChange = _ref.onChange,
        onChange = _ref$onChange === undefined ? other.noop : _ref$onChange,
        _ref$onHover = _ref.onHover,
        onHover = _ref$onHover === undefined ? other.noop : _ref$onHover,
        _ref$onFocus = _ref.onFocus,
        onFocus = _ref$onFocus === undefined ? other.noop : _ref$onFocus,
        month = _ref.month,
        year = _ref.year,
        weekStartsOn = _ref.weekStartsOn;

    var isInHoveringRange = allowRange ? hoveringDateIsInRange : function () {
        return false;
    };
    var now = new Date();
    var current = now.getMonth() === month && now.getFullYear() === year;
    var className = styles.classNames(styles$28.Title, current && styles$28['Month-current']);
    var weeks = dates.getWeeksForMonth(month, year, weekStartsOn);
    var weekdays = getWeekdaysOrdered(weekStartsOn).map(function (weekday) {
        return React.createElement(Weekday$1, { key: weekday, title: dates.abbreviationForWeekday(weekday), current: current && new Date().getDay() === weekday, label: weekday, __self: _this,
            __source: {
                fileName: _jsxFileName$46,
                lineNumber: 23
            }
        });
    });
    function handleDateClick(selectedDate) {
        onChange(dates.getNewRange(allowRange && selected, selectedDate));
    }
    function renderWeek(day, dayIndex) {
        if (day == null) {
            var lastDayOfMonth = new Date(year, month + 1, 0);
            return (
                // eslint-disable-next-line react/jsx-no-bind
                React.createElement(Day$2, { key: dayIndex, onHover: onHover.bind(null, lastDayOfMonth), __self: this,
                    __source: {
                        fileName: _jsxFileName$46,
                        lineNumber: 32
                    }
                })
            );
        }
        var disabled = disableDatesBefore && dates.isDateBefore(day, disableDatesBefore) || disableDatesAfter && dates.isDateAfter(day, disableDatesAfter);
        return React.createElement(Day$2, { focused: focusedDate != null && dates.isSameDay(day, focusedDate), day: day, key: dayIndex, onFocus: onFocus, onClick: handleDateClick, onHover: onHover, selected: selected != null && dates.dateIsSelected(day, selected), inRange: selected != null && dates.dateIsInRange(day, selected), disabled: disabled, inHoveringRange: selected != null && hoverDate != null && isInHoveringRange(day, selected, hoverDate), __self: this,
            __source: {
                fileName: _jsxFileName$46,
                lineNumber: 36
            }
        });
    }
    var weeksMarkup = weeks.map(function (week, index) {
        return React.createElement(
            'div',
            { role: 'row', className: styles$28.Week, key: index, __self: _this,
                __source: {
                    fileName: _jsxFileName$46,
                    lineNumber: 40
                }
            },
            week.map(renderWeek)
        );
    });
    return React.createElement(
        'div',
        { role: 'grid', className: styles$28.Month, __self: this,
            __source: {
                fileName: _jsxFileName$46,
                lineNumber: 43
            }
        },
        React.createElement(
            'div',
            { className: className, __self: this,
                __source: {
                    fileName: _jsxFileName$46,
                    lineNumber: 44
                }
            },
            dates.Months[month],
            ' ',
            year
        ),
        React.createElement(
            'div',
            { role: 'rowheader', className: styles$28.WeekHeadings, __self: this,
                __source: {
                    fileName: _jsxFileName$46,
                    lineNumber: 47
                }
            },
            weekdays
        ),
        weeksMarkup
    );
}
function hoveringDateIsInRange(day, range, hoverEndDate) {
    if (day == null) {
        return false;
    }
    var start = range.start,
        end = range.end;

    return Boolean(start === end && day > start && day <= hoverEndDate);
}
function getWeekdaysOrdered(weekStartsOn) {
    var weekDays = [].concat(WEEKDAYS);
    var restOfDays = weekDays.splice(weekStartsOn);
    return [].concat(_toConsumableArray(restOfDays), _toConsumableArray(weekDays));
}

var _jsxFileName$44 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/DatePicker/DatePicker.js';
var DatePicker$1 = function (_React$PureComponent) {
    _inherits(DatePicker, _React$PureComponent);

    function DatePicker() {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));

        _this.state = {
            hoverDate: undefined,
            focusDate: undefined
        };
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var selectedPropDidChange = !isSameSelectedDate(prevProps.selected, this.props.selected);
            if (selectedPropDidChange) {
                this.resetFocus();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                selected = _props.selected,
                month = _props.month,
                year = _props.year,
                allowRange = _props.allowRange,
                multiMonth = _props.multiMonth,
                disableDatesBefore = _props.disableDatesBefore,
                disableDatesAfter = _props.disableDatesAfter,
                _props$weekStartsOn = _props.weekStartsOn,
                weekStartsOn = _props$weekStartsOn === undefined ? dates.Weekdays.Sunday : _props$weekStartsOn,
                intl = _props.polaris.intl;
            var _state = this.state,
                hoverDate = _state.hoverDate,
                focusDate = _state.focusDate;

            var showNextYear = dates.getNextDisplayYear(month, year);
            var showNextMonth = dates.getNextDisplayMonth(month);
            var showNextToNextYear = dates.getNextDisplayYear(showNextMonth, showNextYear);
            var showNextToNextMonth = dates.getNextDisplayMonth(showNextMonth);
            var showPreviousYear = dates.getPreviousDisplayYear(month, year);
            var showPreviousMonth = dates.getPreviousDisplayMonth(month);
            var previousMonthName = dates.Months[showPreviousMonth];
            var nextMonth = multiMonth ? dates.Months[showNextToNextMonth] : dates.Months[showNextMonth];
            var nextYear = multiMonth ? showNextToNextYear : showNextYear;
            var secondDatePicker = multiMonth ? React.createElement(Month$1, { onFocus: this.handleFocus, focusedDate: focusDate, month: showNextMonth, year: showNextYear, selected: deriveRange(selected), hoverDate: hoverDate, onChange: this.handleDateSelection, onHover: this.handleHover, disableDatesBefore: disableDatesBefore, disableDatesAfter: disableDatesAfter, allowRange: allowRange, weekStartsOn: weekStartsOn, __self: this,
                __source: {
                    fileName: _jsxFileName$44,
                    lineNumber: 39
                }
            }) : null;
            return React.createElement(
                'div',
                { id: id, className: styles$28.DatePicker, onKeyDown: handleKeyDown, onKeyUp: this.handleKeyUp, __self: this,
                    __source: {
                        fileName: _jsxFileName$44,
                        lineNumber: 40
                    }
                },
                React.createElement(
                    'div',
                    { className: styles$28.Header, __self: this,
                        __source: {
                            fileName: _jsxFileName$44,
                            lineNumber: 41
                        }
                    },
                    React.createElement(Button$2, { plain: true, icon: 'arrowLeft', accessibilityLabel: intl.translate('Polaris.DatePicker.previousMonth', {
                            previousMonthName: previousMonthName,
                            showPreviousYear: showPreviousYear
                        })
                        // eslint-disable-next-line react/jsx-no-bind
                        , onClick: this.handleMonthChangeClick.bind(null, showPreviousMonth, showPreviousYear), __self: this,
                        __source: {
                            fileName: _jsxFileName$44,
                            lineNumber: 42
                        }
                    }),
                    React.createElement(Button$2, { plain: true, icon: 'arrowRight', accessibilityLabel: intl.translate('Polaris.DatePicker.nextMonth', {
                            nextMonth: nextMonth,
                            nextYear: nextYear
                        })
                        // eslint-disable-next-line react/jsx-no-bind
                        , onClick: this.handleMonthChangeClick.bind(null, showNextMonth, showNextYear), __self: this,
                        __source: {
                            fileName: _jsxFileName$44,
                            lineNumber: 48
                        }
                    })
                ),
                React.createElement(
                    'div',
                    { className: styles$28.MonthContainer, __self: this,
                        __source: {
                            fileName: _jsxFileName$44,
                            lineNumber: 55
                        }
                    },
                    React.createElement(Month$1, { onFocus: this.handleFocus, focusedDate: focusDate, month: month, year: year, selected: deriveRange(selected), hoverDate: hoverDate, onChange: this.handleDateSelection, onHover: this.handleHover, disableDatesBefore: disableDatesBefore, disableDatesAfter: disableDatesAfter, allowRange: allowRange, weekStartsOn: weekStartsOn, __self: this,
                        __source: {
                            fileName: _jsxFileName$44,
                            lineNumber: 56
                        }
                    }),
                    secondDatePicker
                )
            );
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(date) {
            this.setState({ focusDate: date });
        }
    }, {
        key: 'resetFocus',
        value: function resetFocus() {
            this.setState({ focusDate: undefined });
        }
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(event) {
            var key = event.key;
            var _props2 = this.props,
                selected = _props2.selected,
                disableDatesBefore = _props2.disableDatesBefore,
                disableDatesAfter = _props2.disableDatesAfter;
            var focusDate = this.state.focusDate;

            var range = deriveRange(selected);
            var focusedDate = focusDate || range && range.start;
            if (focusedDate == null) {
                return;
            }
            if (key === 'ArrowUp') {
                var previousWeek = new Date(focusedDate);
                previousWeek.setDate(focusedDate.getDate() - 7);
                if (!(disableDatesBefore && dates.isDateBefore(previousWeek, disableDatesBefore))) {
                    this.setFocusDateAndHandleMonthChange(previousWeek);
                }
            }
            if (key === 'ArrowDown') {
                var nextWeek = new Date(focusedDate);
                nextWeek.setDate(focusedDate.getDate() + 7);
                if (!(disableDatesAfter && dates.isDateAfter(nextWeek, disableDatesAfter))) {
                    this.setFocusDateAndHandleMonthChange(nextWeek);
                }
            }
            if (key === 'ArrowRight') {
                var tomorrow = new Date(focusedDate);
                tomorrow.setDate(focusedDate.getDate() + 1);
                if (!(disableDatesAfter && dates.isDateAfter(tomorrow, disableDatesAfter))) {
                    this.setFocusDateAndHandleMonthChange(tomorrow);
                }
            }
            if (key === 'ArrowLeft') {
                var yesterday = new Date(focusedDate);
                yesterday.setDate(focusedDate.getDate() - 1);
                if (!(disableDatesBefore && dates.isDateBefore(yesterday, disableDatesBefore))) {
                    this.setFocusDateAndHandleMonthChange(yesterday);
                }
            }
        }
    }, {
        key: 'setFocusDateAndHandleMonthChange',
        value: function setFocusDateAndHandleMonthChange(date) {
            var onMonthChange = this.props.onMonthChange;

            if (onMonthChange) {
                onMonthChange(date.getMonth(), date.getFullYear());
            }
            this.setState({
                hoverDate: date,
                focusDate: date
            });
        }
    }, {
        key: 'handleDateSelection',
        value: function handleDateSelection(range) {
            var end = range.end;
            var _props$onChange = this.props.onChange,
                onChange = _props$onChange === undefined ? other.noop : _props$onChange;

            this.setState({ hoverDate: end, focusDate: new Date(end) }, function () {
                return onChange(range);
            });
        }
    }, {
        key: 'handleMonthChangeClick',
        value: function handleMonthChangeClick(month, year) {
            var onMonthChange = this.props.onMonthChange;

            if (!onMonthChange) {
                return;
            }
            this.setState({
                focusDate: undefined
            });
            onMonthChange(month, year);
        }
    }, {
        key: 'handleHover',
        value: function handleHover(date) {
            this.setState({
                hoverDate: date
            });
        }
    }]);

    return DatePicker;
}(React.PureComponent);
tslib_1.__decorate([decorators.autobind], DatePicker$1.prototype, "handleFocus", null);
tslib_1.__decorate([decorators.autobind], DatePicker$1.prototype, "resetFocus", null);
tslib_1.__decorate([decorators.autobind], DatePicker$1.prototype, "handleKeyUp", null);
tslib_1.__decorate([decorators.autobind], DatePicker$1.prototype, "setFocusDateAndHandleMonthChange", null);
tslib_1.__decorate([decorators.autobind], DatePicker$1.prototype, "handleDateSelection", null);
tslib_1.__decorate([decorators.autobind], DatePicker$1.prototype, "handleMonthChangeClick", null);
tslib_1.__decorate([decorators.autobind], DatePicker$1.prototype, "handleHover", null);
function handleKeyDown(event) {
    var key = event.key;

    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
        event.preventDefault();
        event.stopPropagation();
    }
}
function isSameSelectedDate(previousDate, currentDate) {
    if (previousDate == null || currentDate == null) {
        return previousDate == null && currentDate == null;
    }
    if (previousDate instanceof Date || currentDate instanceof Date) {
        return previousDate instanceof Date && currentDate instanceof Date && dates.isSameDay(previousDate, currentDate);
    }
    return dates.isSameDay(previousDate.start, currentDate.start) && dates.isSameDay(previousDate.end, currentDate.end);
}
function deriveRange(selected) {
    return selected instanceof Date ? { start: selected, end: selected } : selected;
}
var DatePicker$2 = withAppProvider()(DatePicker$1);

var getUniqueTermKey = other.createUniqueIDFactory('Term');
var getUniqueDescriptionKey = other.createUniqueIDFactory('Description');

var styles$30 = {
  "DisplayText": "Polaris-DisplayText",
  "sizeSmall": "Polaris-DisplayText--sizeSmall",
  "sizeMedium": "Polaris-DisplayText--sizeMedium",
  "sizeLarge": "Polaris-DisplayText--sizeLarge",
  "sizeExtraLarge": "Polaris-DisplayText--sizeExtraLarge",
};

var _jsxFileName$49 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/DisplayText/DisplayText.js';
function DisplayText$1(_ref) {
    var _ref$element = _ref.element,
        Element = _ref$element === undefined ? 'p' : _ref$element,
        children = _ref.children,
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 'medium' : _ref$size;

    var className = styles.classNames(styles$30.DisplayText, size && styles$30[styles.variationName('size', size)]);
    return React.createElement(
        Element,
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$49,
                lineNumber: 6
            }
        },
        children
    );
}

var styles$31 = {
  "Stack": "Polaris-Stack",
  "Item": "Polaris-Stack__Item",
  "noWrap": "Polaris-Stack--noWrap",
  "vertical": "Polaris-Stack--vertical",
  "spacingNone": "Polaris-Stack--spacingNone",
  "spacingExtraTight": "Polaris-Stack--spacingExtraTight",
  "spacingTight": "Polaris-Stack--spacingTight",
  "spacingLoose": "Polaris-Stack--spacingLoose",
  "spacingExtraLoose": "Polaris-Stack--spacingExtraLoose",
  "distributionLeading": "Polaris-Stack--distributionLeading",
  "distributionTrailing": "Polaris-Stack--distributionTrailing",
  "distributionCenter": "Polaris-Stack--distributionCenter",
  "distributionEqualSpacing": "Polaris-Stack--distributionEqualSpacing",
  "distributionFill": "Polaris-Stack--distributionFill",
  "distributionFillEvenly": "Polaris-Stack--distributionFillEvenly",
  "alignmentLeading": "Polaris-Stack--alignmentLeading",
  "alignmentTrailing": "Polaris-Stack--alignmentTrailing",
  "alignmentCenter": "Polaris-Stack--alignmentCenter",
  "alignmentFill": "Polaris-Stack--alignmentFill",
  "alignmentBaseline": "Polaris-Stack--alignmentBaseline",
  "Item-fill": "Polaris-Stack__Item--fill",
};

var _jsxFileName$52 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Stack/components/Item/Item.js';
function Item$9(_ref) {
    var children = _ref.children,
        fill = _ref.fill;

    var className = styles.classNames(styles$31.Item, fill && styles$31['Item-fill']);
    return React.createElement(
        'div',
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$52,
                lineNumber: 6
            }
        },
        children
    );
}

var _jsxFileName$51 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Stack/Stack.js';
var Stack$1 = function (_React$PureComponent) {
    _inherits(Stack, _React$PureComponent);

    function Stack() {
        _classCallCheck(this, Stack);

        return _possibleConstructorReturn(this, (Stack.__proto__ || Object.getPrototypeOf(Stack)).apply(this, arguments));
    }

    _createClass(Stack, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                vertical = _props.vertical,
                spacing = _props.spacing,
                distribution = _props.distribution,
                alignment = _props.alignment,
                wrap = _props.wrap;

            var className = styles.classNames(styles$31.Stack, vertical && styles$31.vertical, spacing && styles$31[styles.variationName('spacing', spacing)], distribution && styles$31[styles.variationName('distribution', distribution)], alignment && styles$31[styles.variationName('alignment', alignment)], wrap === false && styles$31.noWrap);
            var itemMarkup = reactUtilities.elementChildren(children).map(function (child, index) {
                var props = { key: index };
                return reactUtilities.wrapWithComponent(child, Item$9, props);
            });
            return React.createElement(
                'div',
                { className: className, __self: this,
                    __source: {
                        fileName: _jsxFileName$51,
                        lineNumber: 14
                    }
                },
                itemMarkup
            );
        }
    }]);

    return Stack;
}(React.PureComponent);

Stack$1.Item = Item$9;

var styles$32 = {
  "Label": "Polaris-Label",
  "hidden": "Polaris-Label--hidden",
  "Text": "Polaris-Label__Text",
};

var _jsxFileName$54 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Label/Label.js';
function labelID(id) {
    return id + 'Label';
}
function Label$1(_ref) {
    var children = _ref.children,
        id = _ref.id,
        hidden = _ref.hidden;

    var className = styles.classNames(styles$32.Label, hidden && styles$32.hidden);
    return React.createElement(
        'div',
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$54,
                lineNumber: 9
            }
        },
        React.createElement(
            'label',
            { id: labelID(id), htmlFor: id, className: styles$32.Text, __self: this,
                __source: {
                    fileName: _jsxFileName$54,
                    lineNumber: 10
                }
            },
            children
        )
    );
}

var styles$33 = {
  "hidden": "Polaris-Labelled--hidden",
  "LabelWrapper": "Polaris-Labelled__LabelWrapper",
  "HelpText": "Polaris-Labelled__HelpText",
  "Error": "Polaris-Labelled__Error",
};

var _jsxFileName$53 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Labelled/Labelled.js';
function Labelled$1(_a) {
  var id = _a.id,
      label = _a.label,
      error = _a.error,
      action = _a.action,
      helpText = _a.helpText,
      children = _a.children,
      labelHidden = _a.labelHidden,
      rest = tslib_1.__rest(_a, ["id", "label", "error", "action", "helpText", "children", "labelHidden"]);

  var className = styles.classNames(labelHidden && styles$33.hidden);
  var actionMarkup = action ? buttonFrom(action, { plain: true }) : null;
  var helpTextMarkup = helpText ? React.createElement(
    'div',
    { className: styles$33.HelpText, id: helpTextID$1(id), __self: this,
      __source: {
        fileName: _jsxFileName$53,
        lineNumber: 13
      }
    },
    helpText
  ) : null;
  var errorMarkup = error && typeof error !== 'boolean' && React.createElement(
    'div',
    { className: styles$33.Error, __self: this,
      __source: {
        fileName: _jsxFileName$53,
        lineNumber: 17
      }
    },
    React.createElement(InlineError$1, { message: error, fieldID: id, __self: this,
      __source: {
        fileName: _jsxFileName$53,
        lineNumber: 18
      }
    })
  );
  var labelMarkup = label ? React.createElement(
    'div',
    { className: styles$33.LabelWrapper, __self: this,
      __source: {
        fileName: _jsxFileName$53,
        lineNumber: 20
      }
    },
    React.createElement(
      Label$1,
      Object.assign({ id: id }, rest, { hidden: false, __self: this,
        __source: {
          fileName: _jsxFileName$53,
          lineNumber: 21
        }
      }),
      label
    ),
    actionMarkup
  ) : null;
  return React.createElement(
    'div',
    { className: className, __self: this,
      __source: {
        fileName: _jsxFileName$53,
        lineNumber: 26
      }
    },
    labelMarkup,
    children,
    errorMarkup,
    helpTextMarkup
  );
}

function helpTextID$1(id) {
  return id + 'HelpText';
}

var _jsxFileName$56 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/WithContext/WithContext.js';
function withContext$1(Consumer) {
    return function addContext(WrappedComponent) {
        // eslint-disable-next-line react/prefer-stateless-function
        var WithContext = function (_React$Component) {
            _inherits(WithContext, _React$Component);

            function WithContext() {
                _classCallCheck(this, WithContext);

                return _possibleConstructorReturn(this, (WithContext.__proto__ || Object.getPrototypeOf(WithContext)).apply(this, arguments));
            }

            _createClass(WithContext, [{
                key: 'render',
                value: function render() {
                    var _this2 = this;

                    return React.createElement(
                        Consumer,
                        {
                            __self: this,
                            __source: {
                                fileName: _jsxFileName$56,
                                lineNumber: 9
                            }
                        },
                        function (ctx) {
                            var _a = _this2.props,
                                context = _a.context,
                                rest = tslib_1.__rest(_a, ["context"]);
                            return React.createElement(WrappedComponent, Object.assign({}, rest, { context: Object.assign({}, context, ctx), __self: _this2,
                                __source: {
                                    fileName: _jsxFileName$56,
                                    lineNumber: 13
                                }
                            }));
                        }
                    );
                }
            }]);

            return WithContext;
        }(React.Component);

        var FinalComponent = hoistStatics(WithContext, WrappedComponent);
        return FinalComponent;
    };
}

var _React$createContext$1 = React.createContext({
    size: 'extraLarge',
    type: 'file'
});
var Provider$1 = _React$createContext$1.Provider;
var Consumer$1 = _React$createContext$1.Consumer;

var IconDragDrop = {"viewBox":"0 0 20 20","body":"<path  fill-rule=\"evenodd\" d=\"M19.317 12.052L14 10.28V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5.28l1.772 5.317a.998.998 0 0 0 1.843.13l1.85-3.701 3.703-1.851a1 1 0 0 0-.131-1.843zM2 16a1 1 0 1 0-2 0v1a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2M16 2a1 1 0 1 0 2 0V1a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2M6 2h1a1 1 0 1 0 0-2H6a1 1 0 1 0 0 2m5 0h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2M2 0H1a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0 1 1 0 1 0 0-2M1 8a1 1 0 0 0 1-1V6a1 1 0 1 0-2 0v1a1 1 0 0 0 1 1m0 5a1 1 0 0 0 1-1v-1a1 1 0 1 0-2 0v1a1 1 0 0 0 1 1m13.553 1.105a1.002 1.002 0 0 0-.447.447l-.921 1.841-1.604-4.812 4.813 1.604-1.841.92zM6 12.002V6h6v3.612l-1.683-.561a.998.998 0 1 0-1.265 1.265L9.612 12H6zM7 16H6a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2M17 5a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1\"/>"};

var AssetFileUpload = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNNjkuODEgMTI0LjQzYTEuMzkgMS4zOSAwIDAgMS0uNTctLjEyIDEuNDMgMS40MyAwIDAgMS0uNDktLjMyIDEuNTIgMS41MiAwIDAgMS0uNDQtMS4wNiAxLjUgMS41IDAgMCAxIC40NC0xLjA2IDEuNTMgMS41MyAwIDAgMSAxLjM1LS40MiAxLjMxIDEuMzEgMCAwIDEgLjI4LjA5IDEuMDggMS4wOCAwIDAgMSAuMjYuMTQgMS4wNiAxLjA2IDAgMCAxIC4yMy4xOSAxLjM3IDEuMzcgMCAwIDEgLjE5LjIyIDEuMjYgMS4yNiAwIDAgMSAuMTMuMjYgMS40OSAxLjQ5IDAgMCAxLS4zMiAxLjY0IDEuMzQgMS4zNCAwIDAgMS0uNDkuMzIgMS4zOSAxLjM5IDAgMCAxLS41Ny4xMnptLTkuNzEtMS41YTEuNSAxLjUgMCAwIDEgMS41LTEuNSAxLjUgMS41IDAgMCAxIDEuNSAxLjUgMS41MSAxLjUxIDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS41em0tOC4yMiAwYTEuNSAxLjUgMCAwIDEgMS41LTEuNSAxLjUgMS41IDAgMCAxIDEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41LTEuNXptLTguMjIgMGExLjUgMS41IDAgMCAxIDEuNS0xLjUgMS41MSAxLjUxIDAgMCAxIDEuNTEgMS41IDEuNTEgMS41MSAwIDAgMS0xLjUxIDEuNSAxLjUxIDEuNTEgMCAwIDEtMS41LTEuNXptLTguMjEgMGExLjUgMS41IDAgMCAxIDEuNS0xLjUgMS41IDEuNSAwIDAgMSAxLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNS0xLjV6bS04LjIyIDBhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNTEgMS41MSAwIDAgMSAxLjUxIDEuNSAxLjUxIDEuNTEgMCAwIDEtMS41MSAxLjUgMS41MSAxLjUxIDAgMCAxLTEuNS0xLjV6bS04LjIxIDBhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUyLTEuNXptLTguMjIgMGExLjUgMS41IDAgMCAxIDEuNS0xLjUgMS41MSAxLjUxIDAgMCAxIDEuNTEgMS41IDEuNTEgMS41MSAwIDAgMS0xLjUxIDEuNSAxLjUgMS41IDAgMCAxLTEuNS0xLjV6bS02LjcxIDEuNUExLjUgMS41IDAgMCAxIDMgMTI0YTEuNDcgMS40NyAwIDAgMS0uNDQtMS4wNiAxLjUzIDEuNTMgMCAwIDEgMC0uM2MwLS4wOSAwLS4xOS4wOC0uMjhhMi4xNSAyLjE1IDAgMCAxIC4xNC0uMjYgMS4zNyAxLjM3IDAgMCAxIC4xOS0uMjIgMS4wNiAxLjA2IDAgMCAxIC4yMy0uMTkgMS4wOCAxLjA4IDAgMCAxIC4yNi0uMTQgMS4zMSAxLjMxIDAgMCAxIC4yOC0uMDkgMS44OCAxLjg4IDAgMCAxIC41OCAwIDEuMzEgMS4zMSAwIDAgMSAuMjguMDkgMS4zIDEuMyAwIDAgMSAuMjYuMTQgMS4zNyAxLjM3IDAgMCAxIC4yMy4xOSAxLjM3IDEuMzcgMCAwIDEgLjE5LjIyIDEuMjYgMS4yNiAwIDAgMSAuMTMuMjYgMS40MSAxLjQxIDAgMCAxIC4xMi41OCAxLjU2IDEuNTYgMCAwIDEtLjExLjU3IDEuNjMgMS42MyAwIDAgMS0uMzMuNDkgMS41IDEuNSAwIDAgMS0xIC40M3ptLTEuNS05LjVhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS41em0wLThhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS41em0wLThhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS40OXptMC04YTEuNSAxLjUgMCAwIDEgMS41LTEuNSAxLjUgMS41IDAgMCAxIDEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41LTEuNDl6bTAtOGExLjUgMS41IDAgMCAxIDEuNS0xLjVBMS41IDEuNSAwIDAgMSA1LjU5IDgzYTEuNSAxLjUgMCAwIDEtMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNS0xLjV6bTAtOGExLjUgMS41IDAgMCAxIDEuNS0xLjVBMS41IDEuNSAwIDAgMSA1LjU5IDc1YTEuNSAxLjUgMCAwIDEtMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNS0xLjV6bTAtOGExLjUgMS41IDAgMCAxIDEuNS0xLjVBMS41IDEuNSAwIDAgMSA1LjU5IDY3YTEuNTEgMS41MSAwIDAgMS0xLjUgMS41MUExLjUxIDEuNTEgMCAwIDEgMi41OSA2N3ptMC04YTEuNSAxLjUgMCAwIDEgMS41LTEuNUExLjUgMS41IDAgMCAxIDUuNTkgNTlhMS41IDEuNSAwIDAgMS0xLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41LTEuNXptMC04YTEuNTEgMS41MSAwIDAgMSAxLjUtMS41MUExLjUxIDEuNTEgMCAwIDEgNS41OSA1MWExLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS41em0xLjUtNi40NkExLjUgMS41IDAgMCAxIDIuNTkgNDNhMS4zNiAxLjM2IDAgMCAxIDAtLjI5IDIuMjkgMi4yOSAwIDAgMSAuMDgtLjI4IDIuMTUgMi4xNSAwIDAgMSAuMTQtLjI2IDEuNTcgMS41NyAwIDAgMSAuNDItLjQyIDIgMiAwIDAgMSAuMjUtLjE0bC4yOS0uMDhhMS41IDEuNSAwIDAgMSAxLjM1LjQxIDEuNDUgMS40NSAwIDAgMSAuMTkuMjMgMS4yNiAxLjI2IDAgMCAxIC4xMy4yNiAxLjMxIDEuMzEgMCAwIDEgLjA5LjI4IDEuMzYgMS4zNiAwIDAgMSAwIC4yOSAxLjUyIDEuNTIgMCAwIDEtLjM4IDEgMi4xMSAyLjExIDAgMCAxLS4yMy4xOSAxLjI2IDEuMjYgMCAwIDEtLjI2LjEzIDEuMzEgMS4zMSAwIDAgMS0uMjguMDkgMS40MyAxLjQzIDAgMCAxLS4yOS4wNnpNNjAuMSA0M2ExLjUgMS41IDAgMCAxIDEuNS0xLjUgMS41IDEuNSAwIDAgMSAxLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNS0xLjV6bS04LjIyIDBhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS41em0tOC4yMiAwYTEuNSAxLjUgMCAwIDEgMS41LTEuNSAxLjUxIDEuNTEgMCAwIDEgMS41MSAxLjUgMS41MSAxLjUxIDAgMCAxLTEuNTEgMS41IDEuNSAxLjUgMCAwIDEtMS41LTEuNXptLTguMjEgMGExLjUgMS41IDAgMCAxIDEuNS0xLjUgMS41IDEuNSAwIDAgMSAxLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNS0xLjV6bS04LjIyIDBhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS41ek0xOSA0M2ExLjUgMS41IDAgMCAxIDEuNS0xLjVBMS41IDEuNSAwIDAgMSAyMiA0M2ExLjUgMS41IDAgMCAxLTEuNSAxLjVBMS41IDEuNSAwIDAgMSAxOSA0M3ptLTguMiAwYTEuNSAxLjUgMCAwIDEgMS41LTEuNSAxLjUgMS41IDAgMCAxIDEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41LTEuNXptNTkuMDEgMS40N2ExLjUgMS41IDAgMCAxLTEuMDYtLjQ3IDEuNTIgMS41MiAwIDAgMS0uNDQtMSAxLjUgMS41IDAgMCAxIDEuNzktMS41bC4yOC4wOC4yNi4xNGEyLjExIDIuMTEgMCAwIDEgLjIzLjE5IDEuNSAxLjUgMCAwIDEgLjQ0IDEuMDkgMS41MiAxLjUyIDAgMCAxLS40NCAxIDIuMTEgMi4xMSAwIDAgMS0uMjMuMTkgMS4yNiAxLjI2IDAgMCAxLS4yNi4xMyAxLjMxIDEuMzEgMCAwIDEtLjI4LjA5IDEuMzYgMS4zNiAwIDAgMS0uMjkuMDZ6bS0xLjUgNzAuNDZhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS41em0wLThhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS41em0wLThhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS40OXptMC04YTEuNSAxLjUgMCAwIDEgMS41LTEuNSAxLjUgMS41IDAgMCAxIDEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41LTEuNDl6bTAtOGExLjUgMS41IDAgMCAxIDEuNS0xLjUgMS41IDEuNSAwIDAgMSAxLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNS0xLjQzem0wLThhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS40M3ptMC04YTEuNSAxLjUgMCAwIDEgMS41LTEuNSAxLjUgMS41IDAgMCAxIDEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUgMS40OSAxLjUgMS41IDAgMCAxLTEuNS0xLjQyem0wLThhMS41IDEuNSAwIDAgMSAxLjUtMS41IDEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUtMS40M3ptMC04YTEuNSAxLjUgMCAwIDEgMS41LTEuNSAxLjUgMS41IDAgMCAxIDEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41LTEuNDN6IiBmaWxsPSIjZGVlNGY1Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI2LjY3IDMuNTdoNzkuNDF2OTYuNjFIMjYuNjd6Ii8+PHBhdGggZD0iTTEwNi45MiAxMDFIOTEuNzhjLTEuNjQgMC0zLjI0LjE1LTQuOS4xOHMtMy4zOS0uMDUtNS4xMS0uMTNjLS44NSAwLTEuNy0uMDYtMi41NCAwcy0xLjY3IDAtMi40OSAwbC05LjkxLjI5Yy0zLjMyLjA4LTYuNjIuMjQtMTAgLjI2cy02Ljc4LS4yNy0xMC4xMS0uMTljLTYuNjMuNDItMTMuNC4xNi0yMC4wNyAwaC0uMDhhMS4xIDEuMSAwIDAgMS0xLjA3LTEuMTNjLjA4LTIgLjA2LTQgLjA4LTZzMC00IDAtNi0uMTktNC0uMjMtNiAuMTUtNCAuMjgtNmEyMS42IDIxLjYgMCAwIDAgMC0zIDI3Ljg2IDI3Ljg2IDAgMCAxLS4xNC0zdi02bC4xMy0xMi4wOHYtMTJsLjMzLTZhNTMgNTMgMCAwIDAtLjEzLTZjLS4yMy00IC4xMi04IC4yNi0xMi4wOGwuMDYtM3YtM2wtLjA4LTZBLjU1LjU1IDAgMCAxIDI2LjY0IDNjMy4zLS4xIDYuNjEgMCA5LjkyIDBzNi42MiAwIDkuOTMuMDZjMS42NSAwIDMuMzEuMDYgNSAuMDdINTRsMi40OC0uMDggOS45My0uMzNDNzMgMi41NCA3OS42IDIuNCA4Ni4yMiAyLjQzYzMuMzEuMDcgNi42Mi4zIDkuOTMuMjRsOS45Mi0uMjZhMS4xMyAxLjEzIDAgMCAxIDEuMTYgMS4xdi4wNmwuMTggNi4xYzAgMi0uMTEgNC4wNi0uMTYgNi4wOCAwIDQuMDYuMjIgOC4xNi4xMyAxMi4yMiAwIDItLjI2IDQtLjMzIDYtLjA2IDEgMCAyIDAgM3Y2LjA2bC0uMTIgM2E0Ni43NSA0Ni43NSAwIDAgMCAuMDkgNi4xM2MuMjEgNC4xNi0uMjEgOC0uMiAxMi4wOC0uMTcgNCAuMTMgOC4yIDAgMTIuMjEgMCAyLS4xNSA0LS4xNiA2cy4wNyA0LjExLjEzIDYuMTlsLjA4IDMuMTJ2My4wNmMuMDYgMi4xOC4xMyA0LjE4LjA1IDYuMTh6bS0xLjctMS42OVY4Ny4zN2MwLTIgLjA4LTMuOTMuMDYtNS45M3MtLjItNC4xMy0uMjYtNi4xNWMtLjE1LTQuMDguMjItNy44MyAwLTExLjkzLS4wNi0yLS4xNi00LjA2LS4yNy02LjFhNDMuODkgNDMuODkgMCAwIDEgMC02IDMxLjE0IDMxLjE0IDAgMCAwIC4xNi01LjkgNDQuNzUgNDQuNzUgMCAwIDEtLjA5LTYgNTguNDUgNTguNDUgMCAwIDAgLjE4LTUuODZjMC0yLS4yNy00LjA1LS4yOC02czAtNCAuMTEtNS45NS4xNS00IC4xNC02LS4xOS00LS4xNi02bC4xNC02IDEuMTEgMS4xMWMtMy4zMS0uMDctNi42MS0uMTktOS45Mi0uMThzLTYuNjIuMy05LjkzLjQzQzc5LjYgNS4wNiA3MyA1IDY2LjM3IDQuODNjLTEuNjYgMC0zLjMxLS4xLTUtLjE3bC01LS4yOWMtMy4zMS0uMTgtNi42MSAwLTkuOTIuMTMtNi42Mi4yMi0xMy4yNC4zOS0xOS44NS4yN2wxLjItMS4yLS4yOCA2djNsLjEgM2MuMjIgNCAuODMgOC4wNi4zNyAxMi4wOC0uMTEgMS0uMjcgMi0uMzQgM3MwIDIgMCAzYy4xMSAyIC40MSA0IC41IDZ2M2wtLjA3IDMtLjE0IDZMMjggNjRsLS4wNiA2YTIyIDIyIDAgMCAxLS4yIDMgMjAuMTggMjAuMTggMCAwIDAtLjA4IDNjLjA5IDIgLjI4IDQgLjE5IDZsLS4yNyA2Yy0uMDYgNC0uMTQgOC4wNS0uMTMgMTIuMDhsLS43NC0uNzVoOS44NWMzLjI4IDAgNi41OC4wOCA5Ljg2LjA2czYuNTEtLjI1IDkuNzYtLjI5IDYuNTcuMSA5Ljg3LjE0bDkuOTEuMTloNC44OWMxLjU5IDAgMy4xOC0uMTQgNC44Mi0uMTRzMy4zNC4xMSA1IC4xNGw0Ljg2LS4wNmMzLjE3LS4wNSA2LjQ3LS4wMiA5LjY5LS4wNHoiIGZpbGw9IiNmZmYiLz48ZyBvcGFjaXR5PSIuNSIgZmlsbD0iI2RlZTRmNSI+PHBhdGggZD0iTTI2LjY3IDMuNTdoNzkuNDF2OTYuNjFIMjYuNjd6Ii8+PHBhdGggZD0iTTEwNi45MiAxMDFIOTEuNzhjLTEuNjQgMC0zLjI0LjE1LTQuOS4xOHMtMy4zOS0uMDUtNS4xMS0uMTNjLS44NSAwLTEuNy0uMDYtMi41NCAwcy0xLjY3IDAtMi40OSAwbC05LjkxLjI5Yy0zLjMyLjA4LTYuNjIuMjQtMTAgLjI2cy02Ljc4LS4yNy0xMC4xMS0uMTljLTYuNjMuNDItMTMuNC4xNi0yMC4wNyAwaC0uMDhhMS4xIDEuMSAwIDAgMS0xLjA3LTEuMTNjLjA4LTIgLjA2LTQgLjA4LTZzMC00IDAtNi0uMTktNC0uMjMtNiAuMTUtNCAuMjgtNmEyMS42IDIxLjYgMCAwIDAgMC0zIDI3Ljg2IDI3Ljg2IDAgMCAxLS4xNC0zdi02bC4xMy0xMi4wOHYtMTJsLjMzLTZhNTMgNTMgMCAwIDAtLjEzLTZjLS4yMy00IC4xMi04IC4yNi0xMi4wOGwuMDYtM3YtM2wtLjA4LTZBLjU1LjU1IDAgMCAxIDI2LjY0IDNjMy4zLS4xIDYuNjEgMCA5LjkyIDBzNi42MiAwIDkuOTMuMDZjMS42NSAwIDMuMzEuMDYgNSAuMDdINTRsMi40OC0uMDggOS45My0uMzNDNzMgMi41NCA3OS42IDIuNCA4Ni4yMiAyLjQzYzMuMzEuMDcgNi42Mi4zIDkuOTMuMjRsOS45Mi0uMjZhMS4xMyAxLjEzIDAgMCAxIDEuMTYgMS4xdi4wNmwuMTggNi4xYzAgMi0uMTEgNC4wNi0uMTYgNi4wOCAwIDQuMDYuMjIgOC4xNi4xMyAxMi4yMiAwIDItLjI2IDQtLjMzIDYtLjA2IDEgMCAyIDAgM3Y2LjA2bC0uMTIgM2E0Ni43NSA0Ni43NSAwIDAgMCAuMDkgNi4xM2MuMjEgNC4xNi0uMjEgOC0uMiAxMi4wOC0uMTcgNCAuMTMgOC4yIDAgMTIuMjEgMCAyLS4xNSA0LS4xNiA2cy4wNyA0LjExLjEzIDYuMTlsLjA4IDMuMTJ2My4wNmMuMDYgMi4xOC4xMyA0LjE4LjA1IDYuMTh6bS0xLjctMS42OVY4Ny4zN2MwLTIgLjA4LTMuOTMuMDYtNS45M3MtLjItNC4xMy0uMjYtNi4xNWMtLjE1LTQuMDguMjItNy44MyAwLTExLjkzLS4wNi0yLS4xNi00LjA2LS4yNy02LjFhNDMuODkgNDMuODkgMCAwIDEgMC02IDMxLjE0IDMxLjE0IDAgMCAwIC4xNi01LjkgNDQuNzUgNDQuNzUgMCAwIDEtLjA5LTYgNTguNDUgNTguNDUgMCAwIDAgLjE4LTUuODZjMC0yLS4yNy00LjA1LS4yOC02czAtNCAuMTEtNS45NS4xNS00IC4xNC02LS4xOS00LS4xNi02bC4xNC02IDEuMTEgMS4xMWMtMy4zMS0uMDctNi42MS0uMTktOS45Mi0uMThzLTYuNjIuMy05LjkzLjQzQzc5LjYgNS4wNiA3MyA1IDY2LjM3IDQuODNjLTEuNjYgMC0zLjMxLS4xLTUtLjE3bC01LS4yOWMtMy4zMS0uMTgtNi42MSAwLTkuOTIuMTMtNi42Mi4yMi0xMy4yNC4zOS0xOS44NS4yN2wxLjItMS4yLS4yOCA2djNsLjEgM2MuMjIgNCAuODMgOC4wNi4zNyAxMi4wOC0uMTEgMS0uMjcgMi0uMzQgM3MwIDIgMCAzYy4xMSAyIC40MSA0IC41IDZ2M2wtLjA3IDMtLjE0IDZMMjggNjRsLS4wNiA2YTIyIDIyIDAgMCAxLS4yIDMgMjAuMTggMjAuMTggMCAwIDAtLjA4IDNjLjA5IDIgLjI4IDQgLjE5IDZsLS4yNyA2Yy0uMDYgNC0uMTQgOC4wNS0uMTMgMTIuMDhsLS43NC0uNzVoOS44NWMzLjI4IDAgNi41OC4wOCA5Ljg2LjA2czYuNTEtLjI1IDkuNzYtLjI5IDYuNTcuMSA5Ljg3LjE0bDkuOTEuMTloNC44OWMxLjU5IDAgMy4xOC0uMTQgNC44Mi0uMTRzMy4zNC4xMSA1IC4xNGw0Ljg2LS4wNmMzLjE3LS4wNSA2LjQ3LS4wMiA5LjY5LS4wNHoiLz48L2c+PHJlY3QgeD0iMzguOCIgeT0iMTYuMTciIHdpZHRoPSIyMS45NiIgaGVpZ2h0PSIyMy4zMyIgcng9IjEwLjcxIiByeT0iMTAuNzEiIGZpbGw9IiNkZWU0ZjUiLz48cGF0aCBkPSJNNTAuMDUgNDAuMjlhMTEuNzggMTEuNzggMCAwIDEtNC43LS44MmMtLjcyLS4zNS0xLjQzLS43Mi0yLjE1LTEuMDktLjM1LS4xOS0uNjgtLjQzLTEtLjY0cy0uNjUtLjUtMS0uNzZhMTEuNDUgMTEuNDUgMCAwIDEtMy4yNy04Ljg3TDM4IDI3YzAtLjM5IDAtLjguMDctMS4ycy4xNC0uOC4yMi0xLjJsLjM0LTEuMTZhMTAuNjggMTAuNjggMCAwIDEgMi41MS00IDE1LjUxIDE1LjUxIDAgMCAxIDEuNzYtMS41OCAxMC4xOCAxMC4xOCAwIDAgMSAyLjA2LTEuMTYgMTMuNjMgMTMuNjMgMCAwIDEgNC41OC0uOTUgMTEuODUgMTEuODUgMCAwIDEgNC41OC44MSAxMi4yOSAxMi4yOSAwIDAgMSA0IDIuNDEgMTEuNzUgMTEuNzUgMCAwIDEgMy40NiA4LjY1IDEyLjYxIDEyLjYxIDAgMCAxLTMgOC44MiA3LjU3IDcuNTcgMCAwIDEtLjg5LjgxIDguNDYgOC40NiAwIDAgMS0xIC43MiAxMi40MiAxMi40MiAwIDAgMS0yIDEuMjMgMTEuMTQgMTEuMTQgMCAwIDEtNC42NCAxLjA5em0wLTEuNThhOS42OSA5LjY5IDAgMCAwIDQtLjkyIDkuMzIgOS4zMiAwIDAgMCAxLjc3LTEuMDYgNS4xMiA1LjEyIDAgMCAwIC43Ni0uNzEgNy4wNyA3LjA3IDAgMCAwIC42Ny0uNzggMTEuMTUgMTEuMTUgMCAwIDAgMi4wOS0zLjQ5bC4zLTEgLjE2LTEgLjA3LTF2LTEuMThjMC0uMzguMDUtLjc2IDAtMS4xYTYuMTUgNi4xNSAwIDAgMCAwLTEgNiA2IDAgMCAwLS41My0yQTEwLjE5IDEwLjE5IDAgMCAwIDU3LjA1IDIwYy0uNTEtLjQ3LTEuMDctLjg2LTEuNTctMS4zNmE0LjQ0IDQuNDQgMCAwIDAtMS44Mi0xIDYuMDcgNi4wNyAwIDAgMC0xLS4yNSA2LjE0IDYuMTQgMCAwIDAtMS0uMTJjLS43MS0uMDgtMS4zMyAwLTIuMTEgMGgtMWE4LjYxIDguNjEgMCAwIDAtMSAuMTIgOS4zOCA5LjM4IDAgMCAwLTIgLjY4IDExLjMyIDExLjMyIDAgMCAwLTEuNzkgMSA1IDUgMCAwIDAtLjgzLjYybC0uMzkuMzUtLjMyLjRhMjUuMzUgMjUuMzUgMCAwIDAtMi4xMSAzLjU1IDYuNDggNi40OCAwIDAgMC0uMzIgMWMtLjA1LjM0LS4xMS42OS0uMTUgMUwzOS40NiAyN2wtLjEgMS4xM2E5LjM4IDkuMzggMCAwIDAgMyA3LjcxYy4yNC4yNS41LjQ5Ljc1Ljc0cy41NC40NS44My42NmE1LjU5IDUuNTkgMCAwIDAgMS45LjkyIDExLjIzIDExLjIzIDAgMCAwIDQuMjEuNTV6IiBmaWxsPSIjZGVlNGY1Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQ5Ljc3IDI3Ljg0aDI4LjY4djMwLjQ3SDQ5Ljc3eiIvPjxwYXRoIGQ9Ik03OSA1OC44N2MtMi40My4wNS01LS4xMy03LjMxLjA3YTQxLjQyIDQxLjQyIDAgMCAwLTcuMjYuMTggMjQuODcgMjQuODcgMCAwIDEtMy42NyAwIDE2IDE2IDAgMCAwLTMuNjcuMDVjLTIuNDMuMTYtNC45Mi0uMi03LjM0LS4yMWEuNjcuNjcgMCAwIDEtLjY3LS42OHYtMS45MWMwLS42NC0uMS0xLjI3LS4xNS0xLjktLjE1LTEuMjcuNDQtMi41NC4wOC0zLjgxIDAtMi41NC4xLTUuMDguMS03LjYyYTMyLjMxIDMyLjMxIDAgMCAxIC4wOS0zLjgxIDE1LjI2IDE1LjI2IDAgMCAwIC4xOC0xLjljMC0uNjQtLjEzLTEuMjctLjE2LTEuOTEgMC0xLjI2LjE1LTIuNTMuMjMtMy44czAtMi41NC0uMDUtMy44MWEuMzYuMzYgMCAwIDEgLjM0LS4zN2MxLjItLjA2IDIuMzkgMCAzLjU5IDBzMi4zOSAwIDMuNTguMDZjMi4zOS4xNiA0Ljc4LS4yMyA3LjE3LS4yOWE4Ni4xIDg2LjEgMCAwIDEgMy41OS0uMTMgMjUuMTkgMjUuMTkgMCAwIDEgMy41OC4wOSA2My42MiA2My42MiAwIDAgMCA3LjItLjE3Ljg3Ljg3IDAgMCAxIC44OS44M3YuMDZhMTggMTggMCAwIDEtLjEgMS45NCAxOCAxOCAwIDAgMCAwIDEuOTQgMTUuNjEgMTUuNjEgMCAwIDEtLjEyIDMuODcgMzguMyAzOC4zIDAgMCAwLS4wNiAzLjg3IDEzLjIgMTMuMiAwIDAgMC0uMTEgMS45IDE5LjY0IDE5LjY0IDAgMCAxIC4xNSAyYy0uMDYgMS4yNy0uMjIgMi40OS0uMjIgMy43N3MuMTYgMi42OSAwIDMuOTFhMjEuMDggMjEuMDggMCAwIDAgMCAzLjg5djJjMCAuNjYuMTIgMS4yNi4xMiAxLjg5em0tMS4xMy0xLjEzdi0zLjcxYTE4LjY0IDE4LjY0IDAgMCAwLS4wOC0zLjc4IDM1LjUgMzUuNSAwIDAgMSAwLTMuNzJjMC0xLjI1LS4yMy0yLjU5LS4yOC0zLjg0YTguNjcgOC42NyAwIDAgMSAuMjEtMS43OCAxMS4yOCAxMS4yOCAwIDAgMC0uMTItMS45IDguNTQgOC41NCAwIDAgMSAuMS0xLjgzIDcuODIgNy44MiAwIDAgMCAwLTEuODcgMTQuMjEgMTQuMjEgMCAwIDEgMC0zLjc0IDE0LjM5IDE0LjM5IDAgMCAwIC4wNi0xLjg2YzAtLjYzLS4xMS0xLjI1LS4wOS0xLjg3bC44My44M2MtMi4zOSAwLTQuNzgtLjQtNy4xNy0uMDhhMjEuNDkgMjEuNDkgMCAwIDEtMy41OC4xOUg2NS45bC0xLjc5LS4wN2MtMi4zOSAwLTQuNzgtLjY0LTcuMTctLjI5YTY4LjY5IDY4LjY5IDAgMCAxLTcuMTcuMjJsLjgtLjhhMjIuMDkgMjIuMDkgMCAwIDAtLjE2IDMuODEgMjIuMzMgMjIuMzMgMCAwIDEgLjM3IDMuOCAxNiAxNiAwIDAgMC0uMzUgMS45MSA4Ljg2IDguODYgMCAwIDAgLjI2IDEuOSAxNi4xOSAxNi4xOSAwIDAgMSAwIDMuODFjLS4xMSAyLjU0IDAgNS4wOC0uMTcgNy42Mi0uNDIgMS4yNy4xMyAyLjU0IDAgMy44MWwtLjE4IDEuOS0uMDUgMS45MS0uNTMtLjUzYzIuMzcuMDkgNC43MSAwIDcuMDggMGEyMi41NyAyMi41NyAwIDAgMCAzLjUtLjEgMjUuNDggMjUuNDggMCAwIDEgMy41IDAgNDUgNDUgMCAwIDAgNy4wNS4wNmMyLjQ3LjE3IDQuNjYtLjAzIDcgMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODMuNzEgNDEuMTlMNzQgNTkuMjhsMjEuNDYtLjY3LTExLjE1LTE3LjQ1YS4zNC4zNCAwIDAgMC0uNi4wM3oiIGZpbGw9IiNkZWU0ZjUiLz48cGF0aCBkPSJNODQuNCA0MS41NmMtLjgyIDEuNS0xLjU5IDMtMi40OSA0LjQ4bC0xIDIuMzdjLS4zNS43OC0uNzUgMS41My0xLjE3IDIuMjhsLTIuNTIgNC40N2MtLjgxIDEuNS0xLjY3IDMtMi41NCA0LjQ1bC0uNjUtMWMxLjc5IDAgMy41OC4xNCA1LjM3IDBzMy41OCAwIDUuMzctLjA5IDMuNTcgMCA1LjM2LS4xMmE1My41MSA1My41MSAwIDAgMSA1LjM2LS40M2wtLjU1IDEtMS40OS0yLjIzYy0uNTItLjc0LTEtMS40Ny0xLjUyLTIuMjJDOTEgNTMgOTAuMTMgNTEuNDMgODkuMSA1MGMtLjQ4LS43Ni0xLTEuNDgtMS40NS0yLjI2cy0uODUtMS41OC0xLjM2LTIuMzEtMS0xLjQ5LTEuNTEtMi4yMkw4NCA0Mi4wOGwtLjMxLS40NmEuNDQuNDQgMCAwIDAgLjcxLS4wNnptLTEuNC0uNzRhMS4xMyAxLjEzIDAgMCAxIC44NS0uNiAxLjE1IDEuMTUgMCAwIDEgMSAuMzYgMiAyIDAgMCAxIC4xNy4yNGwuMDkuMTQuMTkuMjguNzMgMS4xMiAxLjQ4IDIuMjRjLjQ3Ljc2IDEuMDYgMS40NCAxLjU4IDIuMTdzLjk0IDEuNTIgMS40MSAyLjI4Yy44OSAxLjU2IDEuODYgMy4wNiAyLjc4IDQuNi40NC43OC44NSAxLjU4IDEuMzQgMi4zM2wxLjUzIDIuMmEuNzguNzggMCAwIDEtLjIgMS4wOC43NS43NSAwIDAgMS0uMzguMTNoLS4wNmEyNC43MiAyNC43MiAwIDAgMS01LjM3LjA3Yy0xLjc5LjA3LTMuNTcuNTItNS4zNi40NGExNy4yNiAxNy4yNiAwIDAgMC0yLjY5IDBjLS44OS4wNi0xLjc4LjA3LTIuNjguMDgtMS43OS0uMTUtMy41Ny40MS01LjM2LjE0aC0uMjVhLjguOCAwIDAgMS0uNjctLjkyLjY5LjY5IDAgMCAxIC4xMi0uMzJsLjc1LTEuMDkuNi0xLjEzYy40NS0uNzMuOTMtMS40NCAxLjQtMi4xNS44OS0xLjQ3IDEuNi0zIDIuMzQtNC41Ny4zNi0uNzguNzItMS41NSAxLjE0LTIuM2wxLjMtMi4yMWMuNjYtMS41OCAxLjQ4LTMuMDggMi4yMi00LjYxem0xNC43NiAzNi42OUg4NmExIDEgMCAwIDEgMC0yaDExLjc2YTEgMSAwIDAgMSAwIDJ6bS0yMC4xNiAwSDM1YTEgMSAwIDAgMSAwLTJoNDIuNmExIDEgMCAwIDEgMCAyek05OCA4OC4xNEg2OS4zMWExIDEgMCAwIDEgMC0ySDk4YTEgMSAwIDAgMSAwIDJ6bS0zNy4yNSAwSDM1YTEgMSAwIDAgMSAwLTJoMjUuNzVhMSAxIDAgMCAxIDAgMnoiIGZpbGw9IiNkZWU0ZjUiLz48Y2lyY2xlIGN4PSIxMDcuNDEiIGN5PSIxMDYuNDMiIHI9IjE4IiBmaWxsPSIjZGVlNGY1IiBzdHJva2U9IiNkZWU0ZjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMyIgZD0iTTEwNy40MSA5Ni44NHYxOS4xOG03LjE4LTkuNTlsLTcuMTgtOS41OS03LjE4IDkuNTkiLz48L3N2Zz4K';

var AssetImageUpload = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTI5IDEwOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik02OC43OCAxMDYuMjVhMS41MiAxLjUyIDAgMCAxLTEuMDYtLjQ0IDEuNTQgMS41NCAwIDAgMS0uMzItLjQ5IDEuMzkgMS4zOSAwIDAgMS0uMTItLjU3IDEuNDEgMS40MSAwIDAgMSAuMTItLjU4Ljk0Ljk0IDAgMCAxIC4xNC0uMjYgMSAxIDAgMCAxIC4xOC0uMjIgMS41NCAxLjU0IDAgMCAxIDIuMTIgMCAxLjUgMS41IDAgMCAxLTEuMDYgMi41NnptLTkuNzgtMS41YTEuNSAxLjUgMCAxIDEgMyAwIDEuNSAxLjUgMCAwIDEtMyAwem0tOC4zMSAwYTEuNSAxLjUgMCAwIDEgMyAwIDEuNTEgMS41MSAwIDAgMS0xLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41My0xLjVoLjAzem0tOC4zMiAwYTEuNSAxLjUgMCAxIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNTMtMS41aC4wM3ptLTguMzEgMGExLjUgMS41IDAgMSAxIDEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjU2LTEuNWguMDZ6bS04LjMxIDBhMS41IDEuNSAwIDEgMSAxLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41My0xLjVoLjAzem0tOC4zMiAwYTEuNSAxLjUgMCAxIDEgMS41IDEuNSAxLjUxIDEuNTEgMCAwIDEtMS41My0xLjVoLjAzem0tOC4zMSAwYTEuNSAxLjUgMCAxIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNTMtMS41aC4wM3ptLTYuODQgMS41YTEuNSAxLjUgMCAwIDEtMS4wNi0uNDQgMS41IDEuNSAwIDAgMSAwLTIuMTIgMS4wNiAxLjA2IDAgMCAxIC4yMy0uMTkgMS4wOCAxLjA4IDAgMCAxIC4yNi0uMTQgMS4zMSAxLjMxIDAgMCAxIC4yOC0uMDkgMS44OCAxLjg4IDAgMCAxIC41OCAwIDEuMzEgMS4zMSAwIDAgMSAuMjguMDkgMS4zIDEuMyAwIDAgMSAuMjYuMTQgMS4zNyAxLjM3IDAgMCAxIC4yMy4xOSAxLjUgMS41IDAgMCAxIC40NCAxLjA2IDEuNSAxLjUgMCAwIDEtMS41IDEuNXptLTEuNS05LjQzYTEuNSAxLjUgMCAxIDEgMyAwIDEuNSAxLjUgMCAwIDEtMyAwem0wLTcuOTJhMS41IDEuNSAwIDEgMSAzIDAgMS41IDEuNSAwIDAgMS0zIDB6bTAtNy45MmExLjUgMS41IDAgMSAxIDMgLjAyIDEuNSAxLjUgMCAwIDEtMyAwdi0uMDJ6bTAtNy45M2ExLjUgMS41IDAgMSAxIDMgMCAxLjUgMS41IDAgMCAxLTMgMHptMC03LjkyYTEuNSAxLjUgMCAxIDEgMyAwIDEuNSAxLjUgMCAwIDEtMyAwem0wLTcuOTNhMS41IDEuNSAwIDEgMSAzIDAgMS41IDEuNSAwIDAgMS0zIDB6bTAtNy45MmExLjUgMS41IDAgMSAxIDMgMCAxLjUgMS41IDAgMCAxLTMgMHptMS41LTYuNDJhMS41IDEuNSAwIDAgMS0xLjA2LTIuNTYgMS4wNiAxLjA2IDAgMCAxIC4yMy0uMTkgMS41OSAxLjU5IDAgMCAxIC4yNi0uMTFsLjI5LS4xMWExLjQyIDEuNDIgMCAwIDEgLjU4IDBsLjI4LjA4LjI2LjE0YTEuMzcgMS4zNyAwIDAgMSAuMjMuMTkgMS41IDEuNSAwIDAgMS0xLjA2IDIuNTZoLS4wMXpNNTkgNDEuMzZhMS41IDEuNSAwIDEgMSAzIDAgMS41IDEuNSAwIDAgMS0zIDB6bS04LjMxIDBhMS41IDEuNSAwIDEgMSAxLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41My0xLjVoLjAzem0tOC4zMiAwYTEuNSAxLjUgMCAxIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNTMtMS41aC4wM3ptLTguMzEgMGExLjUgMS41IDAgMSAxIDEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjU2LTEuNWguMDZ6bS04LjMxIDBhMS41IDEuNSAwIDEgMSAxLjUgMS41IDEuNSAxLjUgMCAwIDEtMS41My0xLjVoLjAzem0tOC4zMiAwYTEuNSAxLjUgMCAxIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNTMtMS41aC4wM3ptLTguMzEgMGExLjUgMS41IDAgMSAxIDEuNSAxLjUgMS41IDEuNSAwIDAgMS0xLjUzLTEuNWguMDN6bTU5LjY2IDEuNWExLjQ5IDEuNDkgMCAwIDEtMS4zOC0yLjA4IDEuMSAxLjEgMCAwIDEgLjE0LS4yNiAxLjI0IDEuMjQgMCAwIDEgLjE4LS4yMiAxLjUyIDEuNTIgMCAwIDEgMS4zNi0uNDFsLjI4LjA4YTIgMiAwIDAgMSAuMjUuMTQgMS4wNiAxLjA2IDAgMCAxIC4yMy4xOSAxLjMgMS4zIDAgMCAxIC4xOS4yMmMwIC4wOS4xLjE3LjE0LjI2YTEuNDcgMS40NyAwIDAgMSAuMDguMjggMS41IDEuNSAwIDAgMS0uNDEgMS4zNiAxIDEgMCAwIDEtLjIzLjE4IDEuMjMgMS4yMyAwIDAgMS0uMjUuMTQgMS40MSAxLjQxIDAgMCAxLS41OC4xMnptLTEuNSA1My45NmExLjUgMS41IDAgMSAxIDMgMCAxLjUgMS41IDAgMCAxLTMgMHptMC03LjkyYTEuNSAxLjUgMCAxIDEgMyAwIDEuNSAxLjUgMCAwIDEtMyAwem0wLTcuOTJjMC0uODMuNjctMS41MDUgMS41LTEuNTFhMS41MSAxLjUxIDAgMCAxIDEuNSAxLjUzIDEuNSAxLjUgMCAwIDEtMyAwdi0uMDJ6bTAtNy45M2ExLjUgMS41IDAgMSAxIDMgMCAxLjUgMS41IDAgMCAxLTMgMHptMC03LjkyYTEuNSAxLjUgMCAxIDEgMyAwIDEuNSAxLjUgMCAwIDEtMyAwem0wLTcuOTNhMS41IDEuNSAwIDEgMSAzIDAgMS41IDEuNSAwIDAgMS0zIDB6bTAtNy45MmExLjUgMS41IDAgMSAxIDMgMCAxLjUgMS41IDAgMCAxLTMgMHoiIGZpbGw9IiNERUU0RjUiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTE3LjY0IDEuOThoOTEuMjZ2ODcuNTVIMTcuNjR6Ii8+PHBhdGggZD0iTTEwOS43NSA5MC4zOEg5OC4xNmMtMS45MiAwLTMuODgtLjA2LTUuNzMgMC0uOTQgMC0xLjg1LjEtMi44MS4xaC0yLjkxYy0yLS4wNy0zLjk1LS4xNy01Ljg2LS4xNmwtNS42OC4xNS0xMS4zOC4zM2MtMS45MSAwLTMuODEuMTMtNS43NS4xcy0zLjg5LS4xMy01LjgzLS4xN2MtMS45NC0uMDQtMy44NSAwLTUuNzUuMDZzLTMuODEuMTctNS43My4xOWMtMy44Ny0uMDctNy43Mi0uMTQtMTEuNTgtLjI2bC0yLjg4LS4wOGgtOC42M2ExIDEgMCAwIDEtMS0xYzAtMy42NS0uMzktNy4yOS0uMTctMTAuOTRhNDUuNSA0NS41IDAgMCAwIC4yMy01LjQ3Yy0uMDYtLjkxLS4xNy0xLjgzLS4xOC0yLjc0LS4wMS0uOTEgMC0xLjgyIDAtMi43MyAwLTcuMy4yMS0xNC42LjE2LTIxLjg5VjQwLjRjMC0xLjgyLjE3LTMuNjUuMjUtNS40OC4wOC0xLjgzLjE5LTMuNjQuMTMtNS40Ny0uMDYtMS44My0uMjQtMy42NC0uMjMtNS40NyAwLTMuNjUuMy03LjI5LjM3LTEwLjk0LjA3LTMuNjUgMC03LjMtLjA4LTEwLjk1IDAtLjMuMjQtLjU0NS41NC0uNTUgMy44LS4wOSA3LjYxIDAgMTEuNDEgMHM3LjYgMCAxMS40MS4xMWMxLjkgMCAzLjguMDUgNS43IDBsNS43LS4xOGMzLjgxLS4xNiA3LjYxLS4yNCAxMS40MS0uMzMgMy44LS4wOSA3LjYtLjEyIDExLjQxLS4xOCAzLjgxLS4wNiA3LjYuMjEgMTEuNC4yNiAzLjguMDUgNy42MS0uMTYgMTEuNDEtLjI0IDMuOC0uMDggNy42MS0uMzMgMTEuNDEtLjFoLjA4QTEuMTkgMS4xOSAwIDAgMSAxMTAuMTMgMmMwIC45My0uMDYgMS44NS0uMDcgMi43N2wuMDYgMi43Ni4xMSA1LjU0YzAgMS44NSAwIDMuNjktLjEyIDUuNTItLjEyIDEuODMtLjI2IDMuNjQtLjI3IDUuNDggMCAzLjY4LjE2IDcuNDEtLjA5IDExYTQ1LjIxIDQ1LjIxIDAgMCAwIC4xMSA1LjU2IDUzLjcyIDUzLjcyIDAgMCAxIDAgNS41M2MtLjE2IDMuNjItLjI1IDcuMjUtLjI2IDEwLjkzLS4wMSAzLjY4LjE3IDcuNDcgMCAxMS0uMTcgMy41MyAwIDcuMzQuMDggMTEuMTEuMDYgMS45IDAgMy43My4wNiA1LjU5LjA2IDEuODYuMDMgMy43Ny4wMSA1LjU5em0tMS43LTEuN1Y3Ny44N2MuMDYtMy41NS4xOC03LjA4LS4wNi0xMC44NS0uMS0xLjg3LS4xOS0zLjcyLS4xNy01LjUxbC4xMS01LjM0YzAtMy42LS4xOC03LjMtLjM3LTExYTM2Ljg5IDM2Ljg5IDAgMCAxIDAtNS4zNyAzMC41MiAzMC41MiAwIDAgMCAuMTgtNS4zNSA1MCA1MCAwIDAgMS0uMTYtNS40NWMwLTEuNzguMjMtMy41NS4yMy01LjM2di0yLjcybC0uMTYtMi43M2MtLjEyLTEuODItLjEyLTMuNjItLjA5LTUuNDJsLjE3LTUuNC4wOC0yLjdWMS45NWwxLjE0IDEuMTVjLTcuNjEuMzItMTUuMjEtLjM5LTIyLjgyLS4xOC0xLjkgMC0zLjguMTktNS43LjI5LS45NS4wNy0xLjkuMS0yLjg1LjEzLS45NS4wMy0xLjkuMDUtMi44NSAwLTMuODEgMC03LjYxLjA1LTExLjQxLS4wNy0zLjgtLjEyLTcuNi0uMDktMTEuNDEtLjMzYTk0LjMgOTQuMyAwIDAgMC0xMS40LS4yYy03LjYxLjMyLTE1LjIxLjQ4LTIyLjgyLjM4TDE4Ljg0IDJjLS4xNCAzLjY1LS40MSA3LjMtLjI1IDExIC4xNiAzLjcuNTggNy4yOS41OSAxMC45NCAwIDEuODMtLjM0IDMuNjUtLjUgNS40N2EyMC44OSAyMC44OSAwIDAgMCAwIDIuNzRjMCAuOTEuMSAxLjgyLjE4IDIuNzNhNTAuNDEgNTAuNDEgMCAwIDEgLjM2IDUuNDhjLjA1IDEuODItLjA1IDMuNjQtLjA4IDUuNDdsLS4xNCA1LjR2NS40N2wtLjA4IDExdjIuNzNjMCAuOTEtLjE2IDEuODMtLjI0IDIuNzRhNDMuNDUgNDMuNDUgMCAwIDAgLjE0IDUuNDdjLjE3IDMuNjUtLjI0IDcuMjktLjI4IDEwLjk0bC0uODQtLjg0YzcuNTYuMTUgMTUuMTIuMDggMjIuNjcuMDZsNS42Ny4wNmMxLjg5IDAgMy43OSAwIDUuNjUtLjA3bDUuNTktLjE5aDUuNjZsMTEuNC4yIDUuNy4wOWMxLjg5IDAgMy43Mi0uMSA1LjU1LS4xNyAxLjgzLS4wNyAzLjczIDAgNS42NyAwaDUuNjZjMy42My0uMDMgNy40LS4wMiAxMS4xMy0uMDR6IiBmaWxsPSIjREVFNEY1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48ZyBvcGFjaXR5PSIuNSIgZmlsbD0iI0RFRTRGNSIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjUuOSA5LjloNzQuNzV2NzEuNzFIMjUuOXoiLz48cGF0aCBkPSJNMTAxLjIxIDgyLjE4SDg3LjA2Yy0xLjUyIDAtMy4wOC4xLTQuNjkgMC0xLjYxLS4xLTMuMjEtLjA5LTQuNzctLjA4bC00LjY1LjEtOS4zNC4yMmMtMy4wOS4xMi02LjI5IDAtOS40NSAwLTEuNTgtLjA2LTMuMTQgMC00LjcgMGwtNC43LjExYy02LjMxLS4wNy0xMi42LS4yOS0xOC44Ni0uMjVhLjcuNyAwIDAgMS0uNzEtLjY5YzAtMy0uMjQtNi0uMTEtOWE0NC43MSA0NC43MSAwIDAgMCAuMTYtNC40OGMwLS43NS0uMTItMS41LS4xMi0yLjI0di0yLjE4YzAtNiAuMTQtMTIgLjExLTE3LjkzLS4wMy01LjkzLjU3LTExLjk1LjEtMTcuOTNsLjI0LTljLjA2LTMgMC02LS4wNS05IDAtLjIuMTYtLjM2NS4zNi0uMzcgMy4xMS0uMDYgNi4yMiAwIDkuMzQgMHM2LjIzIDAgOS4zNC4wN2g0LjY3bDQuNjgtLjEyYzMuMTEtLjEgNi4yMy0uMTYgOS4zNC0uMjIgMy4xMS0uMDYgNi4yMy0uMDcgOS4zNC0uMTEgMy4xMS0uMDQgNi4yMy4xMSA5LjM1LjE1IDMuMTIuMDQgNi4yMy0uMDkgOS4zNC0uMTQgMy4xMS0uMDUgNi4yMy0uMTkgOS4zNC0uMDdoLjA2YS44MS44MSAwIDAgMSAuNzcuODJ2NC41MmwuMDYgNC41M2MwIDEuNTEgMCAzLS4wOCA0LjUxLS4wOCAxLjUxLS4xNCAzLS4xNyA0LjQ5IDAgMyAuMSA2IDAgOS0uMDcgMS40OCAwIDMgLjA2IDQuNTMuMDYgMS41MyAwIDMgMCA0LjUzLS4xIDMtLjE2IDUuOTQtLjE3IDguOTUtLjAxIDMuMDEuMTEgNi4wOSAwIDlzMCA2IC4wNSA5LjA4IDAgNi4xNy4wMSA5LjJ6bS0xLjEzLTEuMTN2LTguODhjMC0yLjg4LjEtNS44NSAwLTguOS0uMS0zLjA1LS4wOS02IDAtOC45LjA5LTIuOS0uMTEtNi0uMjQtOWE0MC42MyA0MC42MyAwIDAgMSAwLTQuNDIgMzIgMzIgMCAwIDAgLjEyLTQuNGMtLjI1LTMgMC01LjkxIDAtOC44NyAwLTIuOTYtLjMzLTYtLjE4LTguOTFsLjEtNC40NFY5Ljg4bC43Ny43N2MtMy4xMS4xMi02LjIyIDAtOS4zNCAwcy02LjIzLS4xMi05LjM0LS4wOGMtMy4xMS4wNC02LjIzLjMzLTkuMzUuMy0zLjEyLS4wMy02LjIzIDAtOS4zNCAwLTMuMTEgMC02LjIzLS4wOC05LjM0LS4yM2wtNC42OC0uMTdjLTEuNTUtLjA1LTMuMTEgMC00LjY3IDAtNi4yMy4yMi0xMi40Ni4zMi0xOC42OC4yNWwuOC0uOGMtLjEgMy0uMjggNi0uMTcgOSAuMTEgMyAuMzkgNiAuMzkgOSAwIDEuNS0uMjIgMy0uMzIgNC40OGEzMS44OSAzMS44OSAwIDAgMCAuMSA0LjQ4IDcwLjY5IDcwLjY5IDAgMCAxIC4xOCA5Yy0uMTUgNi0uMDcgMTEuOTUtLjE1IDE3LjkzdjIuMjRjMCAuNzQtLjExIDEuNDktLjE2IDIuMjRhNDEuODcgNDEuODcgMCAwIDAgLjA5IDQuNDhjLjEgMy0uMTUgNi0uMTggOWwtLjU2LS41NmM2LjE5LjEgMTIuMzkgMCAxOC41OCAwIDMuMSAwIDYuMjMuMTEgOS4yOSAwIDMuMDYtLjExIDYuMTItLjIgOS4yNC0uMTFsOS4zNC4xNCA0LjY3LjA2IDQuNTctLjFjMS41MS0uMDYgMy4wNyAwIDQuNjUgMGg0LjY0YzMuMDEtLjE1IDYuMDktLjE0IDkuMTctLjE1eiIvPjwvZz48cmVjdCBmaWxsPSIjREVFNEY1IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHg9IjM0LjY3IiB5PSIyMy4xMSIgd2lkdGg9IjIyLjE1IiBoZWlnaHQ9IjI0LjUyIiByeD0iMTEuMDIiLz48cGF0aCBkPSJNNDUuNzkgNDhhMTIuMDcgMTIuMDcgMCAwIDEtOC42MS0zLjcgMTEuMTEgMTEuMTEgMCAwIDEtMi40Mi00LjE2Yy0uMTItLjM5LS4yLS43OS0uMy0xLjE4LS4xLS4zOS0uMTItLjc5LS4xOC0xLjE5bC0uMDUtMS4yMXYtMS4xNGMwLS43NyAwLTEuNTUuMDctMi4zNiAwLS40LjEzLS44LjE5LTEuMTlsLjMyLTEuMTZhMTEuMDYgMTEuMDYgMCAwIDEgMi40My00LjA4IDExLjM5IDExLjM5IDAgMCAxIDMuODItMi43OCAxMi4yNyAxMi4yNyAwIDAgMSA0LjYyLTEgMTEuMjUgMTEuMjUgMCAwIDEgNC42MSAxIDEyIDEyIDAgMCAxIDMuODggMi42OSAxMS40MSAxMS40MSAwIDAgMSAyLjQzIDQuMDljLjEzLjM3LjIyLjc3LjMyIDEuMTUuMS4zOC4xNC43OS4yMSAxLjE5bC4wNyAxLjE5djEuMTdjMCAuNzcgMCAxLjU1LS4wOSAyLjM1LS4wNS40LS4xMy44LS4xOSAxLjE5TDU2LjY0IDQwYTEwLjg3IDEwLjg3IDAgMCAxLTIuMzUgNC4xNCA3LjQ4IDcuNDggMCAwIDEtLjg2LjgzIDguMjYgOC4yNiAwIDAgMS0uOTQuNzRBMTAuOTIgMTAuOTIgMCAwIDEgNTAuNDQgNDdhMTEuNjIgMTEuNjIgMCAwIDEtNC42NSAxem0wLS43OWExMC4yOSAxMC4yOSAwIDAgMCA3Ljg2LTMuNjQgMTEuMjMgMTEuMjMgMCAwIDAgMi4yMi0zLjgxIDEzIDEzIDAgMCAwIC41My00LjQ2di0yLjI5Yy0uMDYtLjM3LS4wOS0uNzQtLjE2LTEuMTEtLjA3LS4zNy0uMTktLjczLS4zMS0xLjA4YTEwLjY5IDEwLjY5IDAgMCAwLTIuMy0zLjgyIDEwLjQ4IDEwLjQ4IDAgMCAwLTMuNTctMi42NSAxMS4yNyAxMS4yNyAwIDAgMC00LjM3LS43OGgtMS4xMWExMC42IDEwLjYgMCAwIDAtMS4xMS4xNiAxMSAxMSAwIDAgMC0yLjEuNzEgMTAuMjggMTAuMjggMCAwIDAtMy41OCAyLjYxIDE0LjEyIDE0LjEyIDAgMCAwLTIuMjMgMy44MyAxMC4yMiAxMC4yMiAwIDAgMC0uMzEgMS4xMmMwIC4zNy0uMTIuNzQtLjE2IDEuMTEtLjA4Ljc0LS4xMiAxLjUxLS4xNCAyLjI5YTEwLjU3IDEwLjU3IDAgMCAwIDIuODQgOC4zNCAxMC4yMyAxMC4yMyAwIDAgMCA4IDMuNDl2LS4wMnoiIGZpbGw9IiNERUU0RjUiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTQ1Ljc0IDM1LjM3aDI4LjkzdjMyLjAySDQ1Ljc0eiIvPjxwYXRoIGQ9Ik03NSA2Ny42N2MtMi40MyAwLTQuOTQtLjA2LTcuMyAwLTIuNTEtLjExLTQuODcgMC03LjI5LjA3LTEuMjEgMC0yLjQxLjA5LTMuNjUgMC0xLjI0LS4wOS0yLjQ2LS4wNy0zLjY2IDAtMi40My4xMi00Ljg5LS4wNy03LjMyLS4wN2EuMzYuMzYgMCAwIDEtLjM2LS4zNnYtNGMwLTEuMzMuMTItMi42NyAwLTQtLjA4LTIuNjYgMC01LjMzIDAtOHYtNGwuMDktMmMwLS42NyAwLTEuMzQtLjA2LTIgMC0xLjMzLjA2LTIuNjYuMDktNCAuMDMtMS4zNCAwLTIuNjcgMC00YS4yLjIgMCAwIDEgLjE5LS4xOWg3LjIzYzIuNDEuMDggNC44My0uMSA3LjI0LS4xMmg3LjI0YzIuNDEuMTEgNC44MiAwIDcuMjMtLjA4YS40Mi40MiAwIDAgMSAuNDMuNGMuMDcgMS4zNS0uMDkgMi42OSAwIDRzLjA3IDIuNzEgMCA0LS4wNyAyLjY3IDAgNGwtLjA3IDItLjAzIDIuMmMwIDEuMzQtLjEgMi42NS0uMTEgNC0uMDEgMS4zNS4wOCAyLjc0IDAgNGwtLjA1IDIgLjA1IDIuMDZDNzUgNjUgNzUgNjYuMzEgNzUgNjcuNjd6bS0uNTctLjU2di02bC0uMDctMmMtLjA5LTEuMzcgMC0yLjYxIDAtNGwtLjE0LTRjMC0uNjYuMTMtMS4yNy4xMi0xLjk0LS4wMS0uNjctLjA2LTEuMzQtLjA4LTJhMzcuMTIgMzcuMTIgMCAwIDAgMC00Yy0uMDktMS4zNCAwLTIuNjQgMC00IDAtMS4zNi0uMDctMi42NSAwLTRsLjQuNGMtMi40MSAwLTQuODItLjE2LTcuMjMgMGwtMS44MS4wN0g2MC4yYy0yLjQxIDAtNC44My0uMjktNy4yNC0uMTMtMi40MS4xNi00LjgyLjE2LTcuMjMuMWwuMzktLjM5YzAgMS4zMy0uMTQgMi42Ny0uMDYgNCAuMDggMS4zMy4yMyAyLjY3LjE2IDRhMTkuNDMgMTkuNDMgMCAwIDAtLjE2IDJjMCAuNjYuMDkgMS4zMy4xNCAyIC4xMiAxLjMzIDAgMi42NiAwIDQtLjA2IDIuNjcgMCA1LjM0LS4xMiA4LS4wOSAxLjM0LjEyIDIuNjcgMCA0cy0uMDcgMi42Ny0uMDkgNGwtLjI2LS4yNWg3LjE5YzEuMiAwIDIuMzkgMCAzLjU3LS4wNyAxLjE4LS4wNyAyLjM4IDAgMy41OCAwIDIuNCAwIDQuODUuMTMgNy4xNyAwIDIuNDUuMjkgNC43Ni4xOSA3LjE1LjIxaC4wNHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik04MCA0OS40bC05Ljc2IDE5IDIxLjY1LS43LTExLjMxLTE4LjMzYS4zMy4zMyAwIDAgMC0uNTguMDN6IiBmaWxsPSIjREVFNEY1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNODAuMzMgNDkuNThjLS44MiAxLjU4LTEuNjIgMy4xNy0yLjQ4IDQuNzNsLTEuMTIgMi40My0xLjIgMi4zOGMtMS42OCAzLjE1LTMuMjkgNi4zMi01IDkuNDVsLS4zMy0uNTJjMS44IDAgMy42MSAwIDUuNDItLjA5czMuNjEgMCA1LjQxLS4xM2MxLjgtLjEzIDMuNjEtLjA5IDUuNDEtLjE2IDEuOC0uMDcgMy42MS0uMjMgNS40MS0uM2wtLjI3LjUxLTMtNC43MWMtMS0xLjU4LTEuODctMy4yLTIuODgtNC43Ni0uNDktLjc5LTEtMS41Ny0xLjQ3LTIuMzdzLS45MS0xLjYyLTEuNDItMi40bC0xLjQ4LTIuMzUtLjc1LTEuMTgtLjM1LS41NC4xLjAxem0tLjctLjM2YS43NC43NCAwIDAgMSAuNTctLjQxLjcxLjcxIDAgMCAxIC42Ni4yN2MuMTkuMjcuMjcuNDEuNC42M2wuNzQgMS4xOCAxLjQ4IDIuMzZjLjQ4LjggMSAxLjU1IDEuNTIgMi4zNC41Mi43OSAxIDEuNTkgMS40NCAyLjM4bDIuODYgNC43OGE2NS4zNSA2NS4zNSAwIDAgMCAxLjQxIDIuNGwxLjUgMi4zNWEuMzguMzggMCAwIDEtLjEyLjU0LjMzLjMzIDAgMCAxLS4xOS4wNmwtMi43MS4xM2MtLjkuMDgtMS44MSAwLTIuNzEgMC0xLjguMDktMy42LjI5LTUuNDEuMzEtMS44MS4wMi0zLjYxLjEzLTUuNDEuMTQtMS44LjAxLTMuNjEuMjYtNS40Mi4xN2EuNDMuNDMgMCAwIDEtLjQxLS40NS40Ni40NiAwIDAgMSAwLS4yYy40NS0uNzcuOS0xLjU0IDEuMjktMi4zNC4zOS0uOC44OC0xLjU1IDEuMy0yLjMzLjg4LTEuNTMgMS41OC0zLjE3IDIuNDEtNC43N0w3NiA1Ni4zNyA3Ny4yNyA1NGMuNzMtMS42IDEuNTctMy4xOSAyLjM2LTQuNzh6IiBmaWxsPSIjREVFNEY1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48Y2lyY2xlIGZpbGw9IiNERUU0RjUiIGZpbGwtcnVsZT0ibm9uemVybyIgY3g9IjEwOC42NCIgY3k9Ijg4LjI1IiByPSIxOS41Ii8+PHBhdGggZD0iTTEwOC42NCA3OC42NnYxOS4xOG03LjE4LTkuNTlsLTcuMTgtOS41OS03LjE4IDkuNTkiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L2c+PC9zdmc+Cg==';

var styles$34 = {
  "FileUpload": "Polaris-DropZone-FileUpload",
  "Image": "Polaris-DropZone-FileUpload__Image",
  "sizeExtraLarge": "Polaris-DropZone-FileUpload--sizeExtraLarge",
  "sizeLarge": "Polaris-DropZone-FileUpload--sizeLarge",
};

var _jsxFileName$55 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/DropZone/components/FileUpload/FileUpload.js';
var FileUpload$1 = function (_React$Component) {
    _inherits(FileUpload, _React$Component);

    function FileUpload(props) {
        _classCallCheck(this, FileUpload);

        var _this = _possibleConstructorReturn(this, (FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call(this, props));

        var translate = props.polaris.intl.translate,
            type = props.context.type;

        var suffix = capitalize(type);
        _this.state = {
            actionTitle: translate('Polaris.DropZone.FileUpload.actionTitle' + suffix),
            actionHint: translate('Polaris.DropZone.FileUpload.actionHint' + suffix)
        };
        return _this;
    }

    _createClass(FileUpload, [{
        key: 'updateStateFromProps',
        value: function updateStateFromProps(props) {
            var _state = this.state,
                actionTitle = _state.actionTitle,
                actionHint = _state.actionHint;

            if (props.actionTitle && props.actionTitle !== actionTitle) {
                this.setState({ actionTitle: props.actionTitle });
            }
            if (props.actionHint && props.actionHint !== actionHint) {
                this.setState({ actionHint: props.actionHint });
            }
        }
        // eslint-disable-next-line react/no-deprecated

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.updateStateFromProps(props);
        }
        // eslint-disable-next-line react/no-deprecated

    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.updateStateFromProps(this.props);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$context = this.props.context,
                size = _props$context.size,
                type = _props$context.type;
            var _state2 = this.state,
                actionTitle = _state2.actionTitle,
                actionHint = _state2.actionHint;

            var imageClasses = styles.classNames(styles$34.Image, size && size === 'extraLarge' && styles$34.sizeExtraLarge, size && size === 'large' && styles$34.sizeLarge);
            var extraLargeView = size === 'extraLarge' ? React.createElement(
                Stack$1,
                { vertical: true, __self: this,
                    __source: {
                        fileName: _jsxFileName$55,
                        lineNumber: 44
                    }
                },
                type === 'file' && React.createElement('img', { className: imageClasses, src: AssetFileUpload, alt: '', __self: this,
                    __source: {
                        fileName: _jsxFileName$55,
                        lineNumber: 45
                    }
                }),
                type === 'image' && React.createElement('img', { className: imageClasses, src: AssetImageUpload, alt: '', __self: this,
                    __source: {
                        fileName: _jsxFileName$55,
                        lineNumber: 46
                    }
                }),
                React.createElement(
                    Button$2,
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$55,
                            lineNumber: 47
                        }
                    },
                    actionTitle
                ),
                React.createElement(
                    TextStyle$1,
                    { variation: 'subdued', __self: this,
                        __source: {
                            fileName: _jsxFileName$55,
                            lineNumber: 48
                        }
                    },
                    actionHint
                )
            ) : null;
            var largeView = size === 'large' ? React.createElement(
                Stack$1,
                { vertical: true, spacing: 'tight', __self: this,
                    __source: {
                        fileName: _jsxFileName$55,
                        lineNumber: 50
                    }
                },
                type === 'file' && React.createElement('img', { className: imageClasses, src: AssetFileUpload, alt: '', __self: this,
                    __source: {
                        fileName: _jsxFileName$55,
                        lineNumber: 51
                    }
                }),
                type === 'image' && React.createElement('img', { className: imageClasses, src: AssetImageUpload, alt: '', __self: this,
                    __source: {
                        fileName: _jsxFileName$55,
                        lineNumber: 52
                    }
                }),
                React.createElement(
                    Button$2,
                    { size: 'slim', __self: this,
                        __source: {
                            fileName: _jsxFileName$55,
                            lineNumber: 53
                        }
                    },
                    actionTitle
                ),
                React.createElement(
                    Caption$1,
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$55,
                            lineNumber: 54
                        }
                    },
                    React.createElement(
                        TextStyle$1,
                        { variation: 'subdued', __self: this,
                            __source: {
                                fileName: _jsxFileName$55,
                                lineNumber: 55
                            }
                        },
                        actionHint
                    )
                )
            ) : null;
            var mediumView = size === 'medium' ? React.createElement(
                Stack$1,
                { vertical: true, spacing: 'tight', __self: this,
                    __source: {
                        fileName: _jsxFileName$55,
                        lineNumber: 58
                    }
                },
                React.createElement(
                    Link$3,
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$55,
                            lineNumber: 59
                        }
                    },
                    actionTitle
                ),
                React.createElement(
                    Caption$1,
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$55,
                            lineNumber: 60
                        }
                    },
                    React.createElement(
                        TextStyle$1,
                        { variation: 'subdued', __self: this,
                            __source: {
                                fileName: _jsxFileName$55,
                                lineNumber: 61
                            }
                        },
                        actionHint
                    )
                )
            ) : null;
            var smallView = size === 'small' ? React.createElement(
                Stack$1,
                { vertical: true, spacing: 'tight', __self: this,
                    __source: {
                        fileName: _jsxFileName$55,
                        lineNumber: 64
                    }
                },
                React.createElement(Icon$2, { source: IconDragDrop, color: 'inkLightest', __self: this,
                    __source: {
                        fileName: _jsxFileName$55,
                        lineNumber: 65
                    }
                })
            ) : null;
            return React.createElement(
                'div',
                { className: styles$34.FileUpload, __self: this,
                    __source: {
                        fileName: _jsxFileName$55,
                        lineNumber: 67
                    }
                },
                smallView,
                mediumView,
                largeView,
                extraLargeView
            );
        }
    }]);

    return FileUpload;
}(React.Component);
var FileUpload$2 = compose$1(withContext$1(Consumer$1), withAppProvider(), withRef$1())(FileUpload$1);

var IconAlertCircle = {"viewBox":"0 0 20 20","body":"<path  fill-rule=\"evenodd\" d=\"M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m0-7a1 1 0 0 0 1-1V6a1 1 0 1 0-2 0v4a1 1 0 0 0 1 1m0 1.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2\"/>"};

var dragEvents = ['dragover', 'dragenter', 'drop'];
function fileAccepted(file, accept) {
    return file.type === 'application/x-moz-file' || accepts(file, accept);
}
function getDataTransferFiles(event) {
    if (isDragEvent(event)) {
        var dt = event.dataTransfer;
        if (dt.files && dt.files.length) {
            return Array.from(dt.files);
        } else if (dt.items && dt.items.length) {
            // Chrome is the only browser that allows to read the file list on drag
            // events and uses `items` instead of `files` in this case.
            return Array.from(dt.items);
        }
    } else if (event.target && event.target.files) {
        // Return files from even when a file was selected from an upload dialog
        return Array.from(event.target.files);
    }
    return [];
}
function accepts(file, acceptedFiles) {
    if (file && acceptedFiles) {
        var fileName = file.name || '';
        var mimeType = file.type || '';
        var baseMimeType = mimeType.replace(/\/.*$/, '');
        var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
        return acceptedFilesArray.some(function (type) {
            var validType = type.trim();
            if (validType.charAt(0) === '.') {
                return fileName.toLowerCase().endsWith(validType.toLowerCase());
            } else if (/\/\*$/.test(validType)) {
                // This is something like a image/* mime type
                return baseMimeType === validType.replace(/\/.*$/, '');
            }
            return mimeType === validType;
        });
    }
    return true;
}
function isDragEvent(event) {
    return dragEvents.indexOf(event.type) > 0;
}

var styles$35 = {
  "DropZone": "Polaris-DropZone",
  "hasOutline": "Polaris-DropZone--hasOutline",
  "isDragging": "Polaris-DropZone--isDragging",
  "isDisabled": "Polaris-DropZone--isDisabled",
  "sizeExtraLarge": "Polaris-DropZone--sizeExtraLarge",
  "sizeLarge": "Polaris-DropZone--sizeLarge",
  "sizeMedium": "Polaris-DropZone--sizeMedium",
  "sizeSmall": "Polaris-DropZone--sizeSmall",
  "Container": "Polaris-DropZone__Container",
  "Overlay": "Polaris-DropZone__Overlay",
  "hasError": "Polaris-DropZone--hasError",
};

var _jsxFileName$50 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/DropZone/DropZone.js';
var getUniqueID$3 = other.createUniqueIDFactory('DropZone');
var DropZone$1 = function (_React$Component) {
    _inherits(DropZone, _React$Component);

    function DropZone(props) {
        _classCallCheck(this, DropZone);

        var _this = _possibleConstructorReturn(this, (DropZone.__proto__ || Object.getPrototypeOf(DropZone)).call(this, props));

        _this.node = null;
        _this.dropNode = null;
        _this.dragTargets = [];
        var translate = props.polaris.intl.translate,
            type = props.type;

        var suffix = capitalize(type);
        _this.state = {
            type: type,
            id: props.id || getUniqueID$3(),
            size: 'extraLarge',
            dragging: false,
            error: false,
            overlayText: translate('Polaris.DropZone.overlayText' + suffix),
            errorOverlayText: translate('Polaris.DropZone.errorOverlayText' + suffix),
            numFiles: 0
        };
        return _this;
    }

    _createClass(DropZone, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                id = _state.id,
                dragging = _state.dragging,
                error = _state.error,
                size = _state.size,
                overlayText = _state.overlayText,
                errorOverlayText = _state.errorOverlayText;
            var _props = this.props,
                label = _props.label,
                labelAction = _props.labelAction,
                labelHidden = _props.labelHidden,
                children = _props.children,
                disabled = _props.disabled,
                outline = _props.outline,
                accept = _props.accept,
                active = _props.active,
                overlay = _props.overlay,
                allowMultiple = _props.allowMultiple;

            var inputAttributes = {
                id: id,
                accept: accept,
                disabled: disabled,
                type: 'file',
                multiple: allowMultiple,
                ref: this.setInputNode,
                onChange: this.handleDrop,
                autoComplete: 'off'
            };
            var classes = styles.classNames(styles$35.DropZone, outline && styles$35.hasOutline, (active || dragging) && styles$35.isDragging, error && styles$35.hasError, size && size === 'extraLarge' && styles$35.sizeExtraLarge, size && size === 'large' && styles$35.sizeLarge, size && size === 'medium' && styles$35.sizeMedium, size && size === 'small' && styles$35.sizeSmall);
            var dragOverlay = (active || dragging) && !error && overlay ? React.createElement(
                'div',
                { className: styles$35.Overlay, __self: this,
                    __source: {
                        fileName: _jsxFileName$50,
                        lineNumber: 82
                    }
                },
                React.createElement(
                    Stack$1,
                    { vertical: true, spacing: 'tight', __self: this,
                        __source: {
                            fileName: _jsxFileName$50,
                            lineNumber: 83
                        }
                    },
                    React.createElement(Icon$2, { source: IconDragDrop, color: 'indigo', __self: this,
                        __source: {
                            fileName: _jsxFileName$50,
                            lineNumber: 84
                        }
                    }),
                    size === 'extraLarge' && React.createElement(
                        DisplayText$1,
                        { size: 'small', element: 'p', __self: this,
                            __source: {
                                fileName: _jsxFileName$50,
                                lineNumber: 85
                            }
                        },
                        overlayText
                    ),
                    (size === 'medium' || size === 'large') && React.createElement(
                        Caption$1,
                        {
                            __self: this,
                            __source: {
                                fileName: _jsxFileName$50,
                                lineNumber: 88
                            }
                        },
                        overlayText
                    )
                )
            ) : null;
            var dragErrorOverlay = dragging && error ? React.createElement(
                'div',
                { className: styles$35.Overlay, __self: this,
                    __source: {
                        fileName: _jsxFileName$50,
                        lineNumber: 91
                    }
                },
                React.createElement(
                    Stack$1,
                    { vertical: true, spacing: 'tight', __self: this,
                        __source: {
                            fileName: _jsxFileName$50,
                            lineNumber: 92
                        }
                    },
                    React.createElement(Icon$2, { source: IconAlertCircle, color: 'red', __self: this,
                        __source: {
                            fileName: _jsxFileName$50,
                            lineNumber: 93
                        }
                    }),
                    size === 'extraLarge' && React.createElement(
                        DisplayText$1,
                        { size: 'small', element: 'p', __self: this,
                            __source: {
                                fileName: _jsxFileName$50,
                                lineNumber: 94
                            }
                        },
                        errorOverlayText
                    ),
                    (size === 'medium' || size === 'large') && React.createElement(
                        Caption$1,
                        {
                            __self: this,
                            __source: {
                                fileName: _jsxFileName$50,
                                lineNumber: 97
                            }
                        },
                        overlayText
                    )
                )
            ) : null;
            var dropZoneMarkup = React.createElement(
                'div',
                { ref: this.setNode, className: classes, 'aria-disabled': disabled, onClick: this.handleClick, onDragStart: handleDragStart, __self: this,
                    __source: {
                        fileName: _jsxFileName$50,
                        lineNumber: 100
                    }
                },
                dragOverlay,
                dragErrorOverlay,
                React.createElement(
                    'div',
                    { className: styles$35.Container, __self: this,
                        __source: {
                            fileName: _jsxFileName$50,
                            lineNumber: 103
                        }
                    },
                    children
                ),
                React.createElement(
                    VisuallyHidden$1,
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$50,
                            lineNumber: 104
                        }
                    },
                    React.createElement('input', Object.assign({}, inputAttributes, {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$50,
                            lineNumber: 105
                        }
                    }))
                )
            );
            var labelledDropzoneMarkup = label ? React.createElement(
                Labelled$1,
                { id: id, label: label, action: labelAction, labelHidden: labelHidden, __self: this,
                    __source: {
                        fileName: _jsxFileName$50,
                        lineNumber: 108
                    }
                },
                dropZoneMarkup
            ) : dropZoneMarkup;
            return React.createElement(
                Provider$1,
                { value: this.getContext, __self: this,
                    __source: {
                        fileName: _jsxFileName$50,
                        lineNumber: 111
                    }
                },
                labelledDropzoneMarkup
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.dragTargets = [];
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({ error: this.props.error });
            if (!this.dropNode) {
                return;
            }
            events.addEventListener(this.dropNode, 'drop', this.handleDrop);
            events.addEventListener(this.dropNode, 'dragover', this.handleDragOver);
            events.addEventListener(this.dropNode, 'dragenter', this.handleDragEnter);
            events.addEventListener(this.dropNode, 'dragleave', this.handleDragLeave);
            events.addEventListener(window, 'resize', this.adjustSize);
            if (this.props.openFileDialog) {
                this.triggerFileDialog();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (!this.dropNode) {
                return;
            }
            events.removeEventListener(this.dropNode, 'drop', this.handleDrop);
            events.removeEventListener(this.dropNode, 'dragover', this.handleDragOver);
            events.removeEventListener(this.dropNode, 'dragenter', this.handleDragEnter);
            events.removeEventListener(this.dropNode, 'dragleave', this.handleDragLeave);
            events.removeEventListener(window, 'resize', this.adjustSize);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.openFileDialog) {
                this.triggerFileDialog();
            }
        }
    }, {
        key: 'triggerFileDialog',
        value: function triggerFileDialog() {
            this.open();
            if (this.props.onFileDialogClose) {
                this.props.onFileDialogClose();
            }
        }
    }, {
        key: 'open',
        value: function open() {
            if (!this.fileInputNode) {
                return;
            }
            this.fileInputNode.click();
        }
    }, {
        key: 'adjustSize',
        value: function adjustSize() {
            if (!this.node) {
                return;
            }
            var size = 'extraLarge';
            var width = this.node.getBoundingClientRect().width;
            if (width < 100) {
                size = 'small';
            } else if (width < 160) {
                size = 'medium';
            } else if (width < 300) {
                size = 'large';
            }
            this.setState({ size: size });
        }
    }, {
        key: 'getValidatedFiles',
        value: function getValidatedFiles(files) {
            var _props2 = this.props,
                accept = _props2.accept,
                allowMultiple = _props2.allowMultiple,
                customValidator = _props2.customValidator;

            var acceptedFiles = [];
            var rejectedFiles = [];
            Array.from(files).forEach(function (file) {
                if (!fileAccepted(file, accept) || customValidator && !customValidator(file)) {
                    rejectedFiles.push(file);
                } else {
                    acceptedFiles.push(file);
                }
            });
            if (!allowMultiple) {
                acceptedFiles.splice(1, acceptedFiles.length);
                rejectedFiles.push.apply(rejectedFiles, _toConsumableArray(acceptedFiles.slice(1)));
            }
            return {
                files: files,
                acceptedFiles: acceptedFiles,
                rejectedFiles: rejectedFiles
            };
        }
    }, {
        key: 'setNode',
        value: function setNode(node) {
            var dropOnPage = this.props.dropOnPage;

            this.node = node;
            this.dropNode = dropOnPage ? document : node;
            this.adjustSize();
        }
    }, {
        key: 'setInputNode',
        value: function setInputNode(node) {
            this.fileInputNode = node;
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            var numFiles = this.state.numFiles;
            var _props3 = this.props,
                onClick = _props3.onClick,
                disabled = _props3.disabled,
                allowMultiple = _props3.allowMultiple;

            if (disabled || !allowMultiple && numFiles > 0) {
                return;
            }
            return onClick ? onClick(event) : this.open();
        }
    }, {
        key: 'handleDrop',
        value: function handleDrop(event) {
            event.preventDefault();
            event.stopPropagation();
            var _props4 = this.props,
                disabled = _props4.disabled,
                onDrop = _props4.onDrop,
                onDropAccepted = _props4.onDropAccepted,
                onDropRejected = _props4.onDropRejected,
                allowMultiple = _props4.allowMultiple;
            var numFiles = this.state.numFiles;

            if (disabled || !allowMultiple && numFiles > 0) {
                return;
            }
            var fileList = getDataTransferFiles(event);

            var _getValidatedFiles = this.getValidatedFiles(fileList),
                files = _getValidatedFiles.files,
                acceptedFiles = _getValidatedFiles.acceptedFiles,
                rejectedFiles = _getValidatedFiles.rejectedFiles;

            this.dragTargets = [];
            this.setState(function (prev) {
                return {
                    dragging: false,
                    error: rejectedFiles.length > 0,
                    numFiles: prev.numFiles + acceptedFiles.length
                };
            });
            if (onDrop) {
                onDrop(files, acceptedFiles, rejectedFiles);
            }
            if (onDropAccepted && acceptedFiles.length) {
                onDropAccepted(acceptedFiles);
            }
            if (onDropRejected && rejectedFiles.length) {
                onDropRejected(rejectedFiles);
            }
        }
    }, {
        key: 'handleDragEnter',
        value: function handleDragEnter(event) {
            event.preventDefault();
            event.stopPropagation();
            var _state2 = this.state,
                dragging = _state2.dragging,
                numFiles = _state2.numFiles;
            var _props5 = this.props,
                disabled = _props5.disabled,
                onDragEnter = _props5.onDragEnter,
                allowMultiple = _props5.allowMultiple;

            if (disabled || !allowMultiple && numFiles > 0) {
                return;
            }
            var fileList = getDataTransferFiles(event);
            if (event.target && this.dragTargets.indexOf(event.target) === -1) {
                this.dragTargets.push(event.target);
            }
            if (dragging) {
                return false;
            }

            var _getValidatedFiles2 = this.getValidatedFiles(fileList),
                rejectedFiles = _getValidatedFiles2.rejectedFiles;

            this.setState({ dragging: true, error: rejectedFiles.length > 0 });
            if (onDragEnter) {
                onDragEnter();
            }
        }
    }, {
        key: 'handleDragOver',
        value: function handleDragOver(event) {
            event.preventDefault();
            event.stopPropagation();
            var numFiles = this.state.numFiles;
            var _props6 = this.props,
                disabled = _props6.disabled,
                onDragOver = _props6.onDragOver,
                allowMultiple = _props6.allowMultiple;

            if (disabled || !allowMultiple && numFiles > 0) {
                return;
            }
            if (onDragOver) {
                onDragOver();
            }
            return false;
        }
    }, {
        key: 'handleDragLeave',
        value: function handleDragLeave(event) {
            var _this2 = this;

            event.preventDefault();
            var numFiles = this.state.numFiles;
            var _props7 = this.props,
                disabled = _props7.disabled,
                onDragLeave = _props7.onDragLeave,
                allowMultiple = _props7.allowMultiple;

            if (disabled || !allowMultiple && numFiles > 0) {
                return;
            }
            this.dragTargets = this.dragTargets.filter(function (el) {
                return el !== event.target && _this2.dropNode && _this2.dropNode.contains(el);
            });
            if (this.dragTargets.length > 0) {
                return;
            }
            this.setState({ dragging: false, error: false });
            if (onDragLeave) {
                onDragLeave();
            }
        }
    }, {
        key: 'getContext',
        get: function get$$1() {
            return {
                size: this.state.size,
                type: this.state.type || 'file'
            };
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            var id = prevState.id,
                error = prevState.error,
                type = prevState.type,
                overlayText = prevState.overlayText,
                errorOverlayText = prevState.errorOverlayText;

            var newState = {};
            if (nextProps.id != null && id !== nextProps.id) {
                newState.id = nextProps.id || id;
            }
            if (nextProps.error != null && error !== nextProps.error) {
                newState.error = nextProps.error;
            }
            if (nextProps.type != null && type !== nextProps.type) {
                newState.type = nextProps.type;
            }
            if (nextProps.overlayText != null && overlayText !== nextProps.overlayText) {
                newState.overlayText = nextProps.overlayText;
            }
            if (nextProps.errorOverlayText != null && errorOverlayText !== nextProps.errorOverlayText) {
                newState.errorOverlayText = nextProps.errorOverlayText;
            }
            return Object.keys(newState).length ? newState : null;
        }
    }]);

    return DropZone;
}(React.Component);
DropZone$1.FileUpload = FileUpload$2;
DropZone$1.defaultProps = {
    type: 'file',
    outline: true,
    overlay: true,
    allowMultiple: true
};
tslib_1.__decorate([decorators.autobind], DropZone$1.prototype, "triggerFileDialog", null);
tslib_1.__decorate([decorators.autobind], DropZone$1.prototype, "open", null);
tslib_1.__decorate([decorators.autobind, decorators.debounce(50, { trailing: true })], DropZone$1.prototype, "adjustSize", null);
tslib_1.__decorate([decorators.autobind], DropZone$1.prototype, "getValidatedFiles", null);
tslib_1.__decorate([decorators.autobind], DropZone$1.prototype, "setNode", null);
tslib_1.__decorate([decorators.autobind], DropZone$1.prototype, "setInputNode", null);
tslib_1.__decorate([decorators.autobind], DropZone$1.prototype, "handleClick", null);
tslib_1.__decorate([decorators.autobind], DropZone$1.prototype, "handleDrop", null);
tslib_1.__decorate([decorators.autobind], DropZone$1.prototype, "handleDragEnter", null);
tslib_1.__decorate([decorators.autobind], DropZone$1.prototype, "handleDragOver", null);
tslib_1.__decorate([decorators.autobind], DropZone$1.prototype, "handleDragLeave", null);
function handleDragStart(event) {
    event.preventDefault();
    event.stopPropagation();
}
withAppProvider()(DropZone$1);

var emptySearch = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzggMTU4Ij48cGF0aCBkPSJNOS4xOSAxMjkuODRhNDAuMDI5IDQwLjAyOSAwIDAgMS00LjktNy4xNEMtMTMuOTEgODguNTkgNTguMDgtNDEuODggMTM1Ljg1IDE4LjQzYTEwNS45NDYgMTA1Ljk0NiAwIDAgMSA4LjM0IDcuMThjLjMyLjMuNjMuNi45NS45MSA4Ny40OSA4NS04Mi4zIDE2Ni4yOC0xMzUuOTUgMTAzLjMyeiIgZmlsbD0iI2Y0ZjZmOCIvPjxwYXRoIGQ9Ik0xMjIuNiAxMDAuODg1Yy0zLjM2NyA1LjQtNy44MzQgMTAuNzY1LTEzLjY0NiAxMy42MDUtNC4yODcgMi4xLTE0LjQ1MyA5Ljc1LTMxLjcwOSA3LjAzMy03LjU2LTE0LjUyMyA0MC40MzEtMTEuMzIzIDIzLjE0OS0zMi44Ny04LjA3Mi0xMC4wODEgMTMuMzI3LTE0LjEyIDEwLjc0Ny0yMy42MDctMS43NTYtNi40NTItMTIuNTktNy40MS02LjA5My0xOS4yMTYgNC4xNzQtNy41ODktNC45Ny04LjE5NC05LjgzOS0xMC45MTRhOC40MzkgOC40MzkgMCAwIDEtMi45Ni0yLjcxNCAyNS41NCAyNS41NCAwIDAgMSAyLjYyNC40NzJjNC42MDkgMS4xIDkuMzE3IDMuNjI0IDEzLjMyNSA2LjExOSAxMC44ODEgNi43ODcgMTQuODM2IDEzLjQxNCAxNy4yMjEgMTkuNDggNS43NzUgMTQuNzQ5IDUuNzA1IDI4Ljk1MS0yLjgxOSA0Mi42MTJ6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuNCIvPjxwYXRoIGQ9Ik0xMTMuNyAyOC4yMDZjLS4xNTUuMTM2LS4zMTQuMjcyLS40NjkuNDEyLS40NDIuMzktLjg4NS43OS0xLjMzMSAxLjE4NGEyNC4xIDI0LjEgMCAwIDEtMy42NDIgMi44MSAxOS4zMzUgMTkuMzM1IDAgMCAxLTQuNTY5LjkzOGMtMi40MDUtMS41MzItNy43MjMtMS40LTcuNDY2LTQuODc5LjE3LTIuMjg4IDIuMy00Ljg1NiA0LjEzOC02LjM0My4xNjMtLjEzMi4zMjUtLjI1My40OC0uMzY3IDMuNTMyLTIuNTQ5IDguMjYtMi40MjEgMTIuMzQ1LTEuNjYgNC41NTkuODQ3IDMuNjE0IDUuMjM4LjUxNCA3LjkwNXoiIGZpbGw9IiNhZmJhZGQiLz48cGF0aCBkPSJNMTEzLjk2NCAyOC41MDhjLS44MjMuNzIxLTEuNzIgMS4zNzUtMi40ODggMi4xNzktLjk1NS41OTEtMS43IDEuNDQtMi42NDcgMi4wNzdsLS4zNTguMjQ4YTMuMSAzLjEgMCAwIDEtLjQ2NS4yMTIgNC4xNTcgNC4xNTcgMCAwIDEtLjgzOS4xNzggOS44ODEgOS44ODEgMCAwIDAtMS42MjkuNCA5LjIzOCA5LjIzOCAwIDAgMS0xLjcyNS4xNjIuODEzLjgxMyAwIDAgMS0uMjIyLS4wMzYuNDA3LjQwNyAwIDAgMS0uMTMtLjA2NmwtLjAzOS0uMDI3LS4xNTYtLjEwOWE0LjQ3MiA0LjQ3MiAwIDAgMC0uMzQ0LS4xNzkgOC41NTIgOC41NTIgMCAwIDAtLjczMy0uMzA3IDcuMDUxIDcuMDUxIDAgMCAxLTEuNTYxLS40NzggMS44NyAxLjg3IDAgMCAwLS44LS4yMjFjLS4yNzEtLjA2OS0uNTMyLS4xNzItLjgtLjI2OGE3LjgyNSA3LjgyNSAwIDAgMS0xLjU1Mi0uNzUyIDMuNDQ5IDMuNDQ5IDAgMCAxLTEuMjc2LTEuMjg4IDMuOTY3IDMuOTY3IDAgMCAxLS4xNjktMS43ODlBMy4yMzEgMy4yMzEgMCAwIDEgOTYuNSAyNi44YTE3LjkgMTcuOSAwIDAgMSAxLjg1Ni0yLjggMTIuODIzIDEyLjgyMyAwIDAgMSAyLjQ5NC0yLjIyMSA5Ljg5MSA5Ljg5MSAwIDAgMSAyLjk0LTEuNjU5IDEwLjA1IDEwLjA1IDAgMCAxIDEuNjQ0LS40MjhjLjU2MS0uMDgzIDEuMTMtLjA2IDEuNjg2LS4xMjVzMS4xMTktLjExMyAxLjY4LS4xMzZhNS44MzUgNS44MzUgMCAwIDEgMS42NzkuMDg5Yy41NTYuMDY3IDEuMTE3LjA3OCAxLjY3MS4xNThhMTUuNDM0IDE1LjQzNCAwIDAgMSAxLjY0My40MzIgNS43IDUuNyAwIDAgMSAuODM3LjI3NiAzLjE4IDMuMTggMCAwIDEgLjczOS41MDdjLjIxNS4yMS40NzIuMzc0LjY5MS42YTIuMTIyIDIuMTIyIDAgMCAxIC40MjIuODI5IDQuNjc0IDQuNjc0IDAgMCAxIC4wNTEgMS43ODggMy43ODggMy43ODggMCAwIDEtLjUzIDEuNjQ5Yy0uMy40ODktLjU2Ni45OTItLjg4NCAxLjQ3NGE3LjcxNCA3LjcxNCAwIDAgMS0xLjE1NSAxLjI3NXptLS41MjUtLjZhMTEuMjc3IDExLjI3NyAwIDAgMCAxLjExNi0xLjEyMSAzLjYwOSAzLjYwOSAwIDAgMCAuODYyLTEuMzEzYy4xMzktLjUwOC4zNjYtLjk2NC40NzYtMS40NmEyLjIgMi4yIDAgMCAwLS4xODgtMS40MmMtLjEtLjIwOS0uMjIyLS4zODktLjMxNy0uNmExLjExNCAxLjExNCAwIDAgMC0uNDIyLS41NzFjLS4yMTUtLjEyMy0uNDQ3LS4yLS42NjctLjMxNWE1LjQxMSA1LjQxMSAwIDAgMC0uNjg3LS4zMzJjLS40ODQtLjE3My0xLjA3MS0uMDgzLTEuNi0uMjFhMTMuNzQ3IDEzLjc0NyAwIDAgMC0xLjYwOC0uMjcxYy0xLjA4Ny4wMzEtMi4xNjEtLjIwOS0zLjI0Ny0uMTEyYTcuOCA3LjggMCAwIDAtMS41ODIuMzRjLS41MTkuMTIxLTEuMDQuMjI1LTEuNTQ1LjM4OWExMi4zNzEgMTIuMzcxIDAgMCAwLTEuNS41MTkgOCA4IDAgMCAwLTEuNDYuNjcgMTYuMDY0IDE2LjA2NCAwIDAgMC0yLjI2IDIuM2MtLjYzNC44MzktMS41NTMgMS41Ni0xLjc0MiAyLjY1YTUuMzE3IDUuMzE3IDAgMCAxLS40NDIgMS40NjguODc4Ljg3OCAwIDAgMC0uMDExLjcyNWMuMS4yMjcuMjQzLjQuMzMxLjU5M2EyLjczIDIuNzMgMCAwIDAgLjkzMyAxLjAxIDguMjIgOC4yMiAwIDAgMCAxLjQxMS42NjRjLjI0OC4xLjUwOS4xNzQuNzYuMjhhMS42ODYgMS42ODYgMCAwIDAgLjc3LjI5MiA1LjQzMSA1LjQzMSAwIDAgMSAxLjU3NS41NTljLjI2Mi4xLjUyMy4yMTQuNzc4LjM0NGwuMzguMi4xODkuMTA5Yy4xMTkuMDYtLjAzNSAwIC4wNjQuMDE5YTE1Ljg0OCAxNS44NDggMCAwIDAgMS41ODUtLjI0MyA3LjYyNiA3LjYyNiAwIDAgMCAxLjU5NC0uMzgyYy4yNTYtLjEuNTEzLS4xOTEuNzYyLS4yNjZhMi43MjYgMi43MjYgMCAwIDAgLjMyMy0uMWwuMzQ1LS4yQTEwLjUyMyAxMC41MjMgMCAwIDAgMTExIDMwLjE0Yy44NzgtLjY2NiAxLjYxMi0xLjQ5NiAyLjQzOS0yLjI0eiIgZmlsbD0iI2FmYmFkZCIvPjxnIG9wYWNpdHk9Ii40IiBmaWxsPSIjN2I4ZWQwIj48cGF0aCBkPSJNMTEzLjIzMyAyOC42MThjLS40NDIuMzktLjg4NS43OS0xLjMzMSAxLjE4NGEyNC4xIDI0LjEgMCAwIDEtMy42NDIgMi44MSAxOS4zMzUgMTkuMzM1IDAgMCAxLTQuNTY5LjkzOGMtMi40MDUtMS41MzItNy43MjMtMS40LTcuNDY2LTQuODc5LjE3LTIuMjg4IDIuMy00Ljg1NiA0LjEzOC02LjM0M2EyMi42NjggMjIuNjY4IDAgMCAxIDEyLjg3IDYuMjl6Ii8+PHBhdGggZD0iTTExMy42MzIgMjguNjMxYTEzLjYzMSAxMy42MzEgMCAwIDEtMS41IDEuNDE4Yy0uMjQuMTc3LS4zOTIuNDU0LS42MzcuNjI4LS4yMy4xOTEtLjUxNS4zMTYtLjczOS41MTVsLTEuMzU4IDEuMmE4LjMxMyA4LjMxMyAwIDAgMS0uNzM4LjU0MiAxLjUxOCAxLjUxOCAwIDAgMS0uNS4yMTRsLS40NjYuMDkxYTQuNjczIDQuNjczIDAgMCAwLS44NjcuMjc0IDQuMjU5IDQuMjU5IDAgMCAxLS44ODMuMTc1Yy0uNi4wNzItMS4xOS4xMjMtMS44LjIwOGwtLjI0My4wMThoLS4xNDNjLS4wNDItLjAwNi0uMDU5IDAtLjEyMy0uMDEyYS41NDYuNTQ2IDAgMCAxLS4xMzQtLjA1MmwtLjAyNC0uMDFhMy44NzggMy44NzggMCAwIDAtLjM4My0uMTU0IDMgMyAwIDAgMS0uNzQ1LS40MDhjLS41NjYtLjEyMy0xLjExMi0uMzI2LTEuNjc3LS41MDdsLTEuNy0uNTdjLS42LS4xNDQtMS4wMzMtLjY2Ni0xLjYxOC0uODgxYTIuMjY3IDIuMjY3IDAgMCAxLTEuMTI1LTEuNDg3IDMuMTM3IDMuMTM3IDAgMCAxLS4wOTMtMS44NDMgNi4zNzMgNi4zNzMgMCAwIDEgLjY2NC0xLjY5Yy4zMTctLjUxNC42MjUtMS4wMjUuOTMzLTEuNTQ2YTkuNyA5LjcgMCAwIDEgMi40MDctMi43bC4wNTYtLjA0MWEuMjQyLjI0MiAwIDAgMSAuMjEtLjAzN2MxLjE5My4zNTIgMi40ODMuMjI3IDMuNjQuNzI2LjU3NS4yMjggMS4yLjMwNiAxLjc2LjU5YTkuMDQ2IDkuMDQ2IDAgMCAwIC44MDguNDY2Yy4yNzguMTMxLjU3NC4yMjYuODQ2LjM3MWEzLjczNyAzLjczNyAwIDAgMCAuOC40NiAyLjQxNSAyLjQxNSAwIDAgMSAuODI3LjQxNCAxMS4zIDExLjMgMCAwIDAgMS41MjkgMS4wMzhjLjU1Ny4yODQuOTE4LjgyNSAxLjQ2NCAxLjEyNi4yNTEuMTc5LjUxOC4zNDQuNzUyLjU0N2E0LjE0MyA0LjE0MyAwIDAgMSAuOC45MTd6bS0uOC0uMDI2YTEuMjI3IDEuMjI3IDAgMCAxLS41MjYtLjMyM2MtLjIyOC0uMTkxLS40MTktLjQyNS0uNjM1LS42MzQtLjQtLjQ1Ny0xLjAzNy0uNjEyLTEuNDY4LTEuMDI5YTQuOTQxIDQuOTQxIDAgMCAwLTEuNTQzLS45MDYgMS44OTEgMS44OTEgMCAwIDEtLjc0LS41MDggMi40MDggMi40MDggMCAwIDAtLjgxMy0uMzc2Yy0uMjc3LS4xMTEtLjUwNS0uMzI2LS43NzQtLjQ1OGE1LjE1MyA1LjE1MyAwIDAgMC0uODU5LS4yNjdjLS41Ny0uMTc0LTEuMDgtLjUxOC0xLjY2Mi0uNjY2LTEuMTY2LS4yMTQtMi4yNy0uODQ3LTMuNS0uNjlsLjMxMi0uMDkxYy0uODIxLjgtMS42NSAxLjU4OC0yLjQ1MiAyLjQyN2EzLjIzNiAzLjIzNiAwIDAgMC0uOTUyIDEuNDM0IDkuNDA3IDkuNDA3IDAgMCAwLS41IDEuNiAzLjY3NCAzLjY3NCAwIDAgMC0uMDg0IDEuNTYzYy4yMTEuNTIxLjc5My42MDcgMS4wNzYgMS4wODlhLjg1MS44NTEgMCAwIDAgLjcxNy40IDIuMjg4IDIuMjg4IDAgMCAxIC44Mi4yMzIgMTEuMzQgMTEuMzQgMCAwIDAgMS42NDQuNiA3LjQ0NCA3LjQ0NCAwIDAgMSAxLjY3Ny42NyAyLjA4NSAyLjA4NSAwIDAgMSAuODY3LjMyN2MuMTMuMDkuMjU4LjE4Ny4zODIuMjg3LS4xLS4wMTctLjAyMy4wMDcuMDQzIDBsLjItLjAwOWExMS4yODEgMTEuMjgxIDAgMCAwIDEuNzI5LS4yNzggMTUuMjQ4IDE1LjI0OCAwIDAgMCAxLjcwOS0uNDA4Yy4xMzQtLjA1Ni4yNjktLjExLjM5MS0uMTc0YTIuNTM3IDIuNTM3IDAgMCAwIC4zMTctLjJjLjI0OS0uMTQ2LjUtLjI4OS43NDUtLjQ0Ny40ODktLjMxNC45NzMtLjY0NSAxLjQzNS0xLjAwNy4yMjktLjE4NS40LS40MzkuNjEzLS42MzlzLjQ4LS4zNDYuNjg1LS41NTlhNi45MTMgNi45MTMgMCAwIDEgMS4xNDctLjk2NXoiLz48L2c+PHBhdGggZD0iTTExNC44IDYyLjc5MWMuMDY5IDIxLjQ3OC0xMi4xODEgMTguODQyLTMxLjUgMzUuMTg3LTEyLjg3NiAxMC44OTMtMjIuNyA2LjQ3Ny0yNC4yNDYtLjczOGE5LjY0OCA5LjY0OCAwIDAgMS0uMi0yLjUyNEM1OS4xMTQgODkuNDEgNjMuNiA4My40NDQgNzQgODAuOTI1IDg0LjgzNyA3OC4zIDgwLjggNTkuNyA5OS42NDUgNTEuNGMuNDQ2LS4yLjktLjM4NiAxLjM3NC0uNTcxLjIwNi0uMDgyLjQwOC0uMTU1LjYwNS0uMjI3IDkuMzM1LTMuMzcgMTMuMTQ2IDEuODM2IDEzLjE3NiAxMi4xODl6IiBmaWxsPSIjZmZiZjRkIi8+PHBhdGggZD0iTTExNSA2Mi43OWEzMy44NTMgMzMuODUzIDAgMCAxLTEuNDU0IDEwLjUgMTYuOTU0IDE2Ljk1NCAwIDAgMS0yLjQ3OSA0LjcxbC0uODIxIDEuMDU5Yy0uMjgxLjM0Ni0uNjIxLjYzOC0uOTI5Ljk2cy0uNjI3LjYzNC0uOTUyLjkzOWwtMS4wMzUuODRhODYuMTMyIDg2LjEzMiAwIDAgMS04Ljg2MSA1LjgxN2MtMy4wMjUgMS44MDktNS45OSAzLjcwNi04Ljg1OCA1Ljc0NS0yLjg5MSAyLjAyMS01LjUzOSA0LjMxLTguMzcyIDYuNDU2YTI0LjY4NCAyNC42ODQgMCAwIDEtOS41NCA0LjU0NGwtMS4zMTUuMjM2LTEuMzM2LjA3MmE3LjI3IDcuMjcgMCAwIDEtMS4zMzYtLjA0NyA2LjUgNi41IDAgMCAxLTEuMzI0LS4xODUgOS4zMjIgOS4zMjIgMCAwIDEtNy4yLTEyLjIyMSAxNC44IDE0LjggMCAwIDEgNi41ODEtOC4wODYgMjYuMzE1IDI2LjMxNSAwIDAgMSA0Ljc3Ny0yLjMwOGMxLjY0NS0uNjUxIDMuNDQxLS45MiA1LjAyMi0xLjZhOS41NzggOS41NzggMCAwIDAgMy44NjEtMy40IDI4LjMxNSAyOC4zMTUgMCAwIDAgMi40ODQtNC42MjEgODIuMTI5IDgyLjEyOSAwIDAgMSA0LjU4Ny05LjU0OCAyNy43IDI3LjcgMCAwIDEgNy4wMjktNy45MTVBMzAuNzA5IDMwLjcwOSAwIDAgMSAxMDMgNDkuOTkzYTEyLjA0MiAxMi4wNDIgMCAwIDEgNS4zLS40MDcgNi42IDYuNiAwIDAgMSA0LjM4OCAyLjkxOCAxMy41MjUgMTMuNTI1IDAgMCAxIDEuODcyIDQuOTg4IDM0LjAzNCAzNC4wMzQgMCAwIDEgLjQ0IDUuMjk4em0tLjQgMGEzMy42NTEgMzMuNjUxIDAgMCAwLS40MzYtNS4yMjggMTMuMTQxIDEzLjE0MSAwIDAgMC0xLjgwOC00LjgzOCA2LjIgNi4yIDAgMCAwLTQuMTM1LTIuNzUzIDExLjU0NiAxMS41NDYgMCAwIDAtNS4xMTUuNCAzMC43ODcgMzAuNzg3IDAgMCAwLTkuMzM0IDQuNjgxIDI3LjM3IDI3LjM3IDAgMCAwLTYuOTQyIDcuNzk1IDgxLjg3NSA4MS44NzUgMCAwIDAtNC41ODcgOS41IDI4LjY0NCAyOC42NDQgMCAwIDEtMi41MjYgNC42OCA5LjkzMSA5LjkzMSAwIDAgMS00LjAwOCAzLjUwOWMtMS42ODIuNzE3LTMuNDE0Ljk1OS01LjA1MSAxLjZhMjUuOTg3IDI1Ljk4NyAwIDAgMC00LjcxNyAyLjI2OCAxNC40MDYgMTQuNDA2IDAgMCAwLTYuNDUxIDcuOSA5LjI0MiA5LjI0MiAwIDAgMCAyLjQxIDkuNDk2IDkuMTM1IDkuMTM1IDAgMCAwIDQuNTY3IDIuMjM4IDYuMTcgNi4xNyAwIDAgMCAxLjI3OC4xNzEgNy40NDMgNy40NDMgMCAwIDAgMS4yOTIuMDQ3bDEuMy0uMDY0IDEuMjgyLS4yMjVhMjQuMzEgMjQuMzEgMCAwIDAgOS40MDktNC40MzRjMi43ODktMi4xMTQgNS40NDMtNC40OTMgOC4zNTYtNi40ODUgMi44OC0yLjA0NCA1Ljg2NC0zLjkzOCA4Ljg4OC01Ljc1MWE5MC4wMDcgOTAuMDA3IDAgMCAwIDguNzk1LTUuODIxbDEuMDIxLS44MjcuOTMzLS45MmMuMy0uMzE1LjYzNy0uNi45MTItLjkzOWwuOC0xLjAzNGExNi41NDEgMTYuNTQxIDAgMCAwIDIuNDI5LTQuNiAzMy40NzEgMzMuNDcxIDAgMCAwIDEuNDM4LTEwLjM2NXpNNTkuMzEzIDg3LjVhMy4yMTYgMy4yMTYgMCAwIDEgLjc2OC0xLjA4MmwuMTI1LS4xMTFjLjA1Ni0uMDI1LjEzLS4wMzQuMTU2LS4wODRsLjIzMy0uMjM0Yy4xNDgtLjE2My4zOTEtLjIzNC41NDQtLjM4OGwuODM3LTEuMDIzYTEuMjYyIDEuMjYyIDAgMCAxIC41MzMtLjM4OCAzLjkzMiAzLjkzMiAwIDAgMCAuNDc4LS40NTZsLjQ4LjY0Yy0uMTU2LjE0Mi0uMy4zLS40Ni40MzNzLS40LjE3Ni0uNTI2LjM1MWMtLjMwOS4yODQtLjYxMy41NzMtLjg5Mi44ODUtLjEyOC4xNjgtLjE5LjM5NC0uMzc5LjUtLjA5My4wNTYtLjIxNy4wODUtLjMwNy4xNDYtLjA2NS4wMTMtLjA2OC4wOC0uMDkuMTI5bC0uMTMzLjA5M2EuOTI4LjkyOCAwIDAgMC0uMjQ5LjJjLS4wNTcuMDg5LS4wNDQuMjMyLS4xMTcuMzA4LS4xMTcuMTc0LS4yMDguMzY1LS4zMzguNTI4eiIgZmlsbD0iI2ZmYmY0ZCIvPjxwYXRoIGQ9Ik02Ni40IDgxLjY1NWEyOS43NjggMjkuNzY4IDAgMCAxIDUuNzIzLTIuMTU1IDkuMDU1IDkuMDU1IDAgMCAwIDQuOTEyLTIuODA4IDEyLjU2NiAxMi41NjYgMCAwIDAgLjkxNi0xLjEzNSA5LjQ1NyA5LjQ1NyAwIDAgMCAuODQ2LTEuMjExIDMzLjY3IDMzLjY3IDAgMCAwIDEuMzc2LTIuNjQ5bDIuNTcyLTUuNDU5YTM1LjEyNCAzNS4xMjQgMCAwIDEgNi41Mi0xMC4yMDggMjIuMjg0IDIyLjI4NCAwIDAgMSA0Ljc4Mi0zLjc5IDM1LjMzNSAzNS4zMzUgMCAwIDEgNS40MDktMi44MTNsLjI5NC43NDRhMzIuNTE0IDMyLjUxNCAwIDAgMC01LjI3NSAyLjc0MiAyNC43MzIgMjQuNzMyIDAgMCAwLTQuNjY0IDMuNjU3IDMzLjM1OSAzMy4zNTkgMCAwIDAtNi40OSA5LjkzNGMtLjgxNSAxLjgyOC0xLjQ5IDMuNzIzLTIuNDA4IDUuNTM2YTI5LjU3NyAyOS41NzcgMCAwIDEtMS41IDIuNjY1Yy0uMy40Mi0uNTI3Ljg3Ny0uODE4IDEuM2ExMS43MTEgMTEuNzExIDAgMCAxLS45ODUgMS4yIDEwLjAyMyAxMC4wMjMgMCAwIDEtMi40MjYgMS45MyAxMC43IDEwLjcgMCAwIDEtMS4zODcuNzE1IDEzLjQ5MSAxMy40OTEgMCAwIDEtMS40NzEuNDYxIDI4Ljk0MyAyOC45NDMgMCAwIDAtNS41NzcgMi4wNjJ6IiBmaWxsPSIjZmZiZjRkIi8+PHBhdGggZD0iTTExNC44IDYyLjc5MWMuMDY5IDIxLjQ3OC0xMi4xODEgMTguODQyLTMxLjUgMzUuMTg3LTEyLjg3NiAxMC44OTMtMjIuNyA2LjQ3Ny0yNC4yNDYtLjczOGE5LjY0OCA5LjY0OCAwIDAgMS0uMi0yLjUyNCAxOS41MTMgMTkuNTEzIDAgMCAxIDguNDY0LTMuOTgzYzQuMzgyLS42IDguOTc1LS4yNTggMTMuMzc4LTEuMTQyIDguMzg3LTEuNjgyIDE5LjA4Ny0xMC4zNjUgMTcuMzE0LTE5LjkzNy0uODcxLTQuNy0yLjQxMi04LjY3NC0uNy0xMy40NTFhMjMuMDA5IDIzLjAwOSAwIDAgMSAyLjMzNS00LjhjLjQ0Ni0uMi45LS4zODYgMS4zNzQtLjU3MS4yMDYtLjA4Mi40MDgtLjE1NS42MDUtLjIyNyA5LjMzNS0zLjM3MyAxMy4xNDYgMS44MzMgMTMuMTc2IDEyLjE4NnoiIGZpbGw9IiNmZmFhMTAiIHN0cm9rZT0iI2ZmYWExMCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxwYXRoIGQ9Ik0zOC4xMTMgODQuNjU5YTE3LjI2NSAxNy4yNjUgMCAwIDEtMy4yMDcgMy42MTYgMjkuMyAyOS4zIDAgMCAxLTMuNjcyIDIuNzA4IDEyLjE3MiAxMi4xNzIgMCAwIDEtMS41MTMuODEzYy0zLjU4OSAxLjY0NS03LjczOCAxLjc4NS0xMS4wOTMgMy45OS0yLjY1MSAxLjc0NC00LjU3MyA1LjE3OC04LjE4MSA0Ljg5LTMuNTU1LS4yODQtNS4yNzYtMy40MjMtNC4yNTUtNi42NTMgMS4zOTItNC40MjUgNy40NzctMy45MTUgMTAuNjItNi41MjhhNDEuODIxIDQxLjgyMSAwIDAgMCA0LjUtNC44NzFjLjMxOC0uMzc0LjY1MS0uNzQ1Ljk4LTEuMWExMy42NzMgMTMuNjczIDAgMCAxIDQuNTI3LTMuNDggOC4wMzYgOC4wMzYgMCAwIDEgMS42OTQtLjUzYzQuMTU0LS44MTQgMTMuNTY0Ljk3NiA5LjYgNy4xNDV6IiBmaWxsPSIjYWZiYWRkIi8+PHBhdGggZD0iTTM4LjQ0OSA4NC44NzVhMjEuMjE4IDIxLjIxOCAwIDAgMS0zLjcxIDQuMDI5IDQyLjQ4OSA0Mi40ODkgMCAwIDEtNC41IDMuMTEyIDkuOTc1IDkuOTc1IDAgMCAxLTIuNTYgMS4wMDhjLS44ODguMjEtMS43MzYuNTI2LTIuNi43NzdhMjUuMzkxIDI1LjM5MSAwIDAgMC01LjA1IDEuNTg3IDkuMzE2IDkuMzE2IDAgMCAwLTIuMTI5IDEuNDc3cS0uNTMuMzg4LTEuMDU1LjgwOGMtLjM0Ny4yODMtLjU5MS42NzktLjk0OS45NjJhMTIuNTQyIDEyLjU0MiAwIDAgMS0yLjIyOCAxLjY0MiA1Ljc2OCA1Ljc2OCAwIDAgMS0yLjczLjc0MiA0LjkgNC45IDAgMCAxLTIuNzE5LS43MDkgNi41NjIgNi41NjIgMCAwIDEtMS4xLS44NzcgNC41NzkgNC41NzkgMCAwIDEtLjg5NS0xLjA5NSA0Ljk5MSA0Ljk5MSAwIDAgMS0uNDc5LTIuNzM4IDYuODYxIDYuODYxIDAgMCAxIC43MjUtMi42NUE1LjA1MyA1LjA1MyAwIDAgMSA4LjQwOCA5MWExMS43IDExLjcgMCAwIDEgMi40OS0xLjEgMjIuOTcyIDIyLjk3MiAwIDAgMCA0LjktMi4wNjcgMTAuNCAxMC40IDAgMCAwIDEuOTU4LTEuNzExYy41ODUtLjY1OSAxLjIzOS0xLjI2NSAxLjgyOC0xLjkzOSAxLjItMS4zMjEgMi4xODUtMi44NTkgMy41NDItNC4xMDdhMjUuNjQ5IDI1LjY0OSAwIDAgMSAyLjE3NC0xLjcyMiA2Ljg4IDYuODggMCAwIDEgMi41OTMtMS4wNDMgOS4yMDggOS4yMDggMCAwIDEgMi43NTEtLjMgMjIuNiAyMi42IDAgMCAxIDIuNzM4LjE5IDE2LjU1NSAxNi41NTUgMCAwIDEgMi42MjguODIxIDUuNTE4IDUuNTE4IDAgMCAxIDIuMzYyIDEuNDg5IDMuOTg2IDMuOTg2IDAgMCAxIDEuMDIxIDIuNjc3IDUuNTg3IDUuNTg3IDAgMCAxLS45NDQgMi42ODd6bS0uNjczLS40MzNhNS41ODUgNS41ODUgMCAwIDAgLjkwNS0yLjMgMi43MDkgMi43MDkgMCAwIDAtLjExLTEuMTgyIDIuNjU0IDIuNjU0IDAgMCAwLS42OS0uOTgyIDguNzY5IDguNzY5IDAgMCAwLTIuMTA4LTEuMzYzIDEwLjU0OSAxMC41NDkgMCAwIDAtMi41MzQtLjU3MyAxMi4yNTggMTIuMjU4IDAgMCAwLTUuMTY2LS4wNTEgMTUuNjEgMTUuNjEgMCAwIDAtMi4zMTkgMS4xIDguNDgzIDguNDgzIDAgMCAwLTIuMDYzIDEuNTg4IDQzLjg1NiA0My44NTYgMCAwIDAtMy42MTMgMy45MjEgMTQuOTU4IDE0Ljk1OCAwIDAgMS0xLjcyMiAyLjExMSA5LjgxMyA5LjgxMyAwIDAgMS0yLjE3MyAxLjc2MWMtMS42MzYgMS4wMDctMy41MTYgMS4wODktNS4xMzggMS44MzZDOS40MjYgOTEgNy44MTEgOTEuOCA2Ljk3IDkzLjIzOGE0LjQwOSA0LjQwOSAwIDAgMC0uNzM5IDIuMzg1IDUuMjIzIDUuMjIzIDAgMCAwIC42ODYgMi4zNDcgNC45MzYgNC45MzYgMCAwIDAgLjU4MyAxLjA3NyAyLjQxMSAyLjQxMSAwIDAgMCAxLjA0MS42NTYgOC45IDguOSAwIDAgMCAyLjM4NS40OTRjMS42NjYuMDg4IDMuMTI0LTEuMDA1IDQuNDMtMi4xNTguMzEtLjMxNS43MzMtLjUxOSAxLjA1MS0uODM4cy42MzctLjY0NS45NzEtLjk2YTEyLjI4NSAxMi4yODUgMCAwIDEgMi4zNzQtMS40MTVjMy4zMDktMS41OSA3LjAyNi0xLjg1OCAxMC4xNDUtMy41MWwxLjE2OS0uNTk1cS41NzItLjM0NSAxLjEzMS0uNzA5YTEyLjY1MiAxMi42NTIgMCAwIDAgMi4wOTEtMS42NDUgMTkgMTkgMCAwIDAgMS45MjItMS44MiAxNy42ODQgMTcuNjg0IDAgMCAwIDEuNTY2LTIuMTA1eiIgZmlsbD0iI2FmYmFkZCIvPjxnIG9wYWNpdHk9Ii40IiBmaWxsPSIjN2I4ZWQwIj48cGF0aCBkPSJNMzguMTEzIDg0LjY1OWExNy4yNjUgMTcuMjY1IDAgMCAxLTMuMjA3IDMuNjE2IDI5LjMgMjkuMyAwIDAgMS0zLjY3MiAyLjcwOCAxMi4xNzIgMTIuMTcyIDAgMCAxLTEuNTEzLjgxM2MtLjIxOS0zLjI4My4zNjMtNi4zODgtLjkxNS05Ljc2NmEyNy4wMTggMjcuMDE4IDAgMCAwLTEuOTgyLTMuOTkgOC4wMzYgOC4wMzYgMCAwIDEgMS42OTQtLjUzYzQuMTQ5LS44MSAxMy41NTkuOTggOS41OTUgNy4xNDl6Ii8+PHBhdGggZD0iTTM4LjQ0OSA4NC44NzVBOS43NTQgOS43NTQgMCAwIDEgMzcuNTc1IDg2Yy0uMzQ5LjMyNC0uNTI2LjgtLjkxNSAxLjA4OC0uNzY4LjU2OS0xLjI5MiAxLjM3Ny0yLjAwNSAyLjAwNWE1LjgyNiA1LjgyNiAwIDAgMS0xLjE1My44MjJjLS40LjI1Mi0uNy42NDQtMS4xMTEuODczLS43OTEuNS0xLjcuODQ2LTIuNTI0IDEuMzI1YS4zMjkuMzI5IDAgMCAxLS40OTItLjI0MWwtLjAwNy0uMDU3YTYuODYxIDYuODYxIDAgMCAxLS4xMTctLjkwNSA0LjkgNC45IDAgMCAwIC4wNzgtLjkwNiAzLjAxIDMuMDEgMCAwIDEtLjA0NC0uOWwuMDI3LS44OTRhMTYuODMyIDE2LjgzMiAwIDAgMC0uMDA3LTEuNzc0Yy0uMDkxLS41NzkuMTQ2LTEuMTk0LS4wNTYtMS43NjRhMTEuMTE0IDExLjExNCAwIDAgMS0uMzEyLTEuNzM2IDkuMDY3IDkuMDY3IDAgMCAwLS42NDgtMS42NDUgMjYuOTkyIDI2Ljk5MiAwIDAgMC0uNzU0LTEuNjA4IDcuNTI4IDcuNTI4IDAgMCAwLS44OTMtMS41NDMuMTg3LjE4NyAwIDAgMSAuMDM3LS4yNjJsLjAyLS4wMTMuMDQtLjAyMmE2Ljg2NyA2Ljg2NyAwIDAgMSA0LjM0LS44MDggMTYuMzQxIDE2LjM0MSAwIDAgMSAyLjIyMS4wNjVjLjcuMjY0IDEuNDc3LjIzMiAyLjE3Mi41NDdhOC41MjYgOC41MjYgMCAwIDAgMS4wMDcuNTE3Yy4xNzQuMDczLjM0NS4xNTIuNTE2LjIzNWE0LjMwOCA0LjMwOCAwIDAgMSAuNDUzLjM0OWMuMjc1LjI1Ny43LjM0OS45MzQuNjgxYTMuODE2IDMuODE2IDAgMCAxIC42MDYgMS4wMTIgNC41NTggNC41NTggMCAwIDEgLjM3NCAxLjEyNSAzLjI3NCAzLjI3NCAwIDAgMS0uMTMyIDEuMTY0IDYuNjYgNi42NiAwIDAgMS0uMjY2IDEuMTI0IDguOTkyIDguOTkyIDAgMCAxLS41MTUgMS4wMjF6bS0uNjczLS40MzNhOC4yMjMgOC4yMjMgMCAwIDAgLjUtLjkgMy4zIDMuMyAwIDAgMCAuMzkxLS45MzEgNS4wMjQgNS4wMjQgMCAwIDAtLjAzOC0uOTcxIDEuODEyIDEuODEyIDAgMCAwLS4yMTctLjkxMiAyLjcxOCAyLjcxOCAwIDAgMC0uNjUtLjdjLS4yNDctLjE4OS0uMzU5LS41ODItLjY4My0uNzIyYTIuOTU1IDIuOTU1IDAgMCAxLS44OTQtLjUgMi40MzIgMi40MzIgMCAwIDAtLjk5MS0uMzIyIDcuNDY0IDcuNDY0IDAgMCAwLTIuMDMxLS41MzEgMTMuMzUzIDEzLjM1MyAwIDAgMC0yLjEtLjMwNyA1LjUgNS41IDAgMCAwLTEuMDU1LjE0OWMtLjM0Ny4wNTktLjY5My4wNjYtMS4wMzMuMTE5YTE2LjQ3NCAxNi40NzQgMCAwIDAtMi4wMTcuNDMxbC4xNTMtLjQ3YTUuNzE3IDUuNzE3IDAgMCAwIC44NzUgMS41NzkgMTIuMjE5IDEyLjIxOSAwIDAgMSAuODcgMS42Yy4yNy41NDkuMjk0IDEuMTk0LjU0MSAxLjc1Ni4yMjQuNTY0LjY1MiAxLjEyNC40NjggMS43NzktLjEyNi42MjkuMzg2IDEuMTkyLjI5MiAxLjgxNi0uMDE3LjYxMi0uMDQ1IDEuMjE1LS4wNDIgMS44MTVsLS4wMjMuOUEyLjk1MiAyLjk1MiAwIDAgMSAzMCA5MGEzLjM0NSAzLjM0NSAwIDAgMCAuMDcuODg1YzAgLjI5NS0uMDM5LjU5LS4wNTYuODg3bC0uNDEzLS4yNDdhMTMuMjQ3IDEzLjI0NyAwIDAgMCAyLjM3OC0xLjM0OSAxMS4zNTkgMTEuMzU5IDAgMCAwIDEuMTI5LS43OTMgOS4zMjQgOS4zMjQgMCAwIDEgMS4wMzItLjkxNGMuMzY0LS4yNzYuNzI1LS41NjMgMS4wNzQtLjg1OGEzLjk4MyAzLjk4MyAwIDAgMCAuOTQ1LS45OTNjLjI0NS0uMzkxLjY2MS0uNjMyLjg4Ni0xLjAzNy4yNDYtLjM4MS41MDQtLjc1LjczMS0xLjEzOXoiLz48L2c+PHBhdGggZD0iTTE0NC4xOSAyNS42MWEuMjQ5LjI0OSAwIDAgMS0uMDcuMDQgNDAuNTIxIDQwLjUyMSAwIDAgMC01LjQ5IDMuMDdjLTMuMSAyLjMyLTMuOTggOC4wNS04LjM2IDguMzYtMy4yMS4yMi01LjcyLTIuMDYtNS4yLTUuNC41My0zLjM5IDQuMTItNC40IDYuMzItNi40NiAyLjAyLTEuOSAzLjEyLTQuNDIgNC40Ni02Ljc5YTEwNS45NDYgMTA1Ljk0NiAwIDAgMSA4LjM0IDcuMTh6IiBmaWxsPSIjYWZiYWRkIi8+PHBhdGggZD0iTTExNy44NTUgMzcuMDMzYTUwLjkzNiA1MC45MzYgMCAxIDAgNC4yNjUgNzEuOTA4IDUwLjY3MSA1MC42NzEgMCAwIDAtNC4yNjUtNzEuOTA4em05LjcgNDkuNjM4Yy0yLjE3NiA2Ljg5Mi01LjE3NSAxMy4yOTUtMTAuMDEyIDE4Ljc0Mi00LjIyNSA0Ljc1My05LjUzMyA5LjMtMTUuNzM5IDExLjExOS0zLjk3OCAxLjE3LTguMDIgMi45NjYtMTIuMTM0IDMuNjA3YTQ1LjMyOCA0NS4zMjggMCAwIDEtOC43OTMuMjEyIDQ0LjUxNiA0NC41MTYgMCAwIDEtMjYuOTY3LTExLjE2NGMtOC43LTcuNzI5LTEyLjk0My0xNy4zNzktMTQuNDQ2LTI4LjYxNmEzNy4yIDM3LjIgMCAwIDEtLjE3NS0xMC41NjRjMS4yMjUtOC40OSA1LjE0Ni0xOC4wMzYgMTAuODQ3LTI0LjQ1MyA5LjktMTEuMTUyIDI3LjgxNy0xOC43MzUgNDIuNjg2LTE0LjYzOWE3MC42NzQgNzAuNjc0IDAgMCAxIDguODQgMi41OTRjNC4zNiAxLjg2MyA4LjU3NyA1LjEzOCAxMi4xMDcgOC4yNzFhNDcuOTQzIDQ3Ljk0MyAwIDAgMSA5LjE4NyAxMC42MzYgMjguMTU1IDI4LjE1NSAwIDAgMSAyLjA2NSAzLjYwOCAzOC41IDM4LjUgMCAwIDEgMi40NTEgNy44NTNjMS40NzIgNy4wNzcgMi4yOTQgMTUuNzk5LjA4NyAyMi43OTR6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTEyMy4zIDEwOS45ODZhNTEuNTU0IDUxLjU1NCAwIDAgMS0xNi4zNjYgMTIuMzA2Yy0xLjU2Ni43LTMuMiAxLjIzMS00Ljc2OSAxLjkyMmwtNC44NjUgMS42NzhjLTEuNjU3LjQ0MS0zLjMzNy44MTQtNS4wMTMgMS4yMjhsLTUuMTI2Ljc0MWE0OS41NTMgNDkuNTUzIDAgMCAxLTIwLjQxNC0yLjg0MyA1My44IDUzLjggMCAwIDEtMTcuNjY3LTEwLjU0NmwtMy42NjMtMy42MzljLTEuMTI1LTEuMy0yLjItMi42NDktMy4yOS0zLjk3Ny0uOTk1LTEuNC0xLjktMi44NzEtMi44NDQtNC4zLS44NTUtMS40ODgtMS42LTMuMDM4LTIuNDA2LTQuNTUyLS43LTEuNTYzLTEuMy0zLjE3Ni0xLjk0Ni00Ljc1OS0uNTM2LTEuNjI1LS45NzgtMy4yODItMS40NjgtNC45Mi0uMzY4LTEuNjctLjYzNC0zLjM2Mi0uOTQ1LTUuMDM4bC0uNDQzLTUuMWMuMDI5LTEuNy4wMTMtMy40MDYgMC01LjEwNi4xNTMtMS42OTQuMjU2LTMuMzk0LjQzMy01LjA4NS4zLTEuNjc1LjU4Ni0zLjM1Ni45NjQtNS4wMTIuNDk0LTEuNjI4LjkyNC0zLjI3NyAxLjQ3NC00Ljg4NC42NTYtMS41NjkgMS4yNTktMy4xNiAxLjk3Ni00LjcuODE1LTEuNDkgMS41NTUtMy4wMiAyLjQwOS00LjQ4Mi45NTctMS40IDEuODIxLTIuODYxIDIuNzczLTQuMjYzbDMuMTQ2LTRhNTEuMzg0IDUxLjM4NCAwIDAgMSAxNi4xNzMtMTIuMTMzIDUzLjA0IDUzLjA0IDAgMCAxIDQuNjgtMS45NzcgODEuMTkgODEuMTkgMCAwIDEgNC44LTEuNjg5IDQ2LjYwOCA0Ni42MDggMCAwIDEgNC45NjEtMS4yMiA1Mi41MTIgNTIuNTEyIDAgMCAxIDUuMDgyLS42IDUyLjQ2NyA1Mi40NjcgMCAwIDEgMzcuOTg1IDEyLjc3MmwzLjYyMSAzLjY2OWMxLjExMyAxLjMwNyAyLjE2NSAyLjY2NiAzLjI0NSA0IC45OTMgMS40IDEuODg5IDIuODYyIDIuODMzIDQuMjg5Ljg2NSAxLjQ3NSAxLjY1NiAzIDIuNDg1IDQuNS43MzYgMS41NDQgMS4zNiAzLjE0MyAyLjA0MyA0LjcxNS41NzIgMS42MTMgMS4wNDUgMy4yNjMgMS41NyA0LjkuNCAxLjY2Ni43MjMgMy4zNTEgMS4wODQgNS4wMjguMjM1IDEuNy4zNjIgMy40MTMuNTA3IDUuMTE4bC0uMDYxIDUuMTM2LS41NDkgNS4xYy0uMzExIDEuNjc3LS41NzEgMy4zNjgtLjkyOSA1LjAzNS0uNDgxIDEuNjM4LS44OCAzLjMtMS4zOTMgNC45MzFhNTIuMzI2IDUyLjMyNiAwIDAgMS0xMC4wODcgMTcuNzU3em0tMi4zNTUtMi4wOTFhNDkuNTgxIDQ5LjU4MSAwIDAgMCA5LjYzNC0xNi42NTVjLjUtMS41MzEuODgxLTMuMSAxLjMzMS00LjY0NS4zMzQtMS41NzQuNTczLTMuMTcuODY5LTQuNzUxLjE1LTEuNi4xODctMy4yMTYuMjktNC44MTZsLS4xNjktNC44MWMtLjIyLTEuNTktLjQxNi0zLjE3Ni0uNTY4LTQuNzctLjMxOC0xLjU2Ny0uNTk1LTMuMTQ2LS45MzktNC43MS0uNDY4LTEuNTMxLS44OTQtMy4wNzctMS4zODctNC42LS42MDktMS40ODEtMS4xNTYtMi45OTQtMS44MTEtNC40NTlhNDguMjcyIDQ4LjI3MiAwIDAgMC0xMS40NTUtMTUuMzk0IDQzLjkyIDQzLjkyIDAgMCAwLTE2LjUwNy05LjkyMSA0OS45NTMgNDkuOTUzIDAgMCAwLTE5LjEwNi0yLjM1NSA0OS4xNyA0OS4xNyAwIDAgMC00Ljc4OS41ODZjLTEuNTkuMjQ1LTMuMTcyLjUyMy00Ljc2OC44YTMwLjkyOCAzMC45MjggMCAwIDAtOS4xMzQgMy4yMTIgNTMuNDM0IDUzLjQzNCAwIDAgMC0xNC45ODcgMTIuMDA2Yy0xLjAxOCAxLjIzNS0yLjA4MyAyLjQzNi0zLjEyMyAzLjY2NWE3NS4zMjggNzUuMzI4IDAgMCAwLTIuNzE5IDMuOTgzYy0uNzgzIDEuNC0xLjQ3OCAyLjg1Ny0yLjIwOSA0LjI4OC0uNjQyIDEuNDcyLTEuMTU1IDMtMS43NTYgNC40ODgtLjUwOCAxLjUyMi0uOSAzLjA4My0xLjM2MiA0LjYyMS0uMzUgMS41NjctLjU4NCAzLjE1OS0uOTM0IDQuNzMxLS4yMTEgMS41OTMtLjM0NyAzLjItLjUgNC44LS4wMi44IDAgMS42MTEgMCAyLjQxNmwuMDgzIDIuNDE0LjcyMiA0Ljc3Yy4zNjggMS41NjMuNjg5IDMuMTMxIDEgNC43bC42NTkgMi4zMTNjLjIxNi43NzIuMzgxIDEuNTY1LjYzOCAyLjMyNi41NzMgMS41IDEuMDkzIDMuMDMgMS43MTYgNC41Mi43MjQgMS40MzggMS4zNzIgMi45MzMgMi4yMjIgNC4zMDcuOTE4IDEuMzMyIDEuNzg1IDIuNyAyLjc0IDQgMS4wMTQgMS4yNTggMS45NjYgMi41NzQgMi45OTMgMy44MzRsMy4zNTQgMy41NTFhNDQuMDIzIDQ0LjAyMyAwIDAgMCAxNi43NDggOS44NzUgNTEuMTU4IDUxLjE1OCAwIDAgMCAxOS4yNTEgMi4zMjZsNC44NDUtLjQ0NmMxLjU5Mi0uMzEgMy4yLS41ODEgNC43ODYtLjkxOCAxLjU1MS0uNDc5IDMuMTQ0LS44NDggNC42NjktMS40MTMgMS40ODEtLjY3OSAyLjk4Ny0xLjMgNC40MjktMi4wMzlhNTAuOTI5IDUwLjkyOSAwIDAgMCAxNS4yNDItMTEuODN6bTYuODg5IDMuNzA1YzIuOSAyLjM0NyA1Ljc2NCA0Ljc0IDguNDQgNy4zNDMgMS4zNDYgMS4yOTIgMi42IDIuNjg0IDMuOTc1IDMuOTQ3IDEuMzUgMS4yODggMi43OTUgMi40NjkgNC4yNTEgMy42MzdzMi45IDIuMzQ1IDQuMjY3IDMuNjE5IDIuNyAyLjU3NyA0LjA0OSAzLjg2NGMuNjY3LjY1MyAxLjQgMS4yMzcgMi4wOTMgMS44NTVsMi4yIDEuNzM3Yy43NDIuNTY4IDEuNDE3IDEuMjEzIDIuMTIxIDEuODI0czEuNCAxLjIzNSAyLjA2NSAxLjg4N2ExLjggMS44IDAgMCAxLTIuMzQ0IDIuNzMybC0uMDQ5LS4wMzdjLS43NDgtLjU2Mi0xLjQ3LTEuMTUyLTIuMTg3LTEuNzQ5cy0xLjQ1NC0xLjE3MS0yLjE0Mi0xLjhjLS43MDYtLjYwOS0xLjM4LTEuMjU0LTIuMDYyLTEuODlzLTEuMzE2LTEuMzI2LTIuMDIzLTEuOTM0Yy0yLjgwOS0yLjQ1Mi01LjYtNC45MjEtOC4yMzYtNy41NzItMS4zMjYtMS4zMTUtMi42NTUtMi42MjYtNC4wNjEtMy44NXMtMi44NTItMi40LTQuMjY0LTMuNjIyYy0xLjQ1MS0xLjE3My0yLjctMi41NzItNC4wODUtMy44MjRhNDEuMjQyIDQxLjI0MiAwIDAgMC00LjQtMy40NyAxLjggMS44IDAgMCAxIDItM3EuMDY4LjA0Ni4xMzEuMXoiIGZpbGw9IiMwODExNDAiLz48cGF0aCBkPSJNMTcwIDE0MS44MThhNi45NDMgNi45NDMgMCAwIDEtMS42NyA0LjM4NWMtMS4xIDEuNDYtMy4yNjggNS4wODMtNS4wNiA1LjYyMi0yLjY5My44MDgtNi41LTIuNzQ2LTguMzE3LTQuMS00LjY3NS0zLjQ4NC00LjQwNi0zLjAyNC04LjY3Ni02Ljk4Mi00LjMxLTQtOC41MjktOC4wODktMTIuNzc4LTEyLjE1LTIuMy0yLjE5My05LjI1My01Ljg4My03LjMxOC0xMC4xMzQuOTc2LTIuMTEgNC44NzMtNS4xMjkgNi43LTYuNDkzIDUuODMyLTQuMzYxIDE3LjE0NSAxMC4xODMgMjAuOTg2IDEzLjU5MyA0LjU1NSA0LjA0NCA0LjUyOCAzLjY0OCA5LjA4MiA3LjY5MiAyLjgzMSAyLjUxOCA2LjkyOSA0Ljk3NSA3LjA1MSA4LjU2N3oiIGZpbGw9IiMwODExNDAiLz48cGF0aCBkPSJNMTcwLjE5NCAxNDEuODExYTYuNjM5IDYuNjM5IDAgMCAxLTEuMTc2IDMuNzM1IDIxNC4yNSAyMTQuMjUgMCAwIDEtMi4yMzcgMy4xNiAxNC4yMTIgMTQuMjEyIDAgMCAxLTIuNjMxIDIuODkgMi45MiAyLjkyIDAgMCAxLTEuOTQ4LjU2NSA1LjU3OCA1LjU3OCAwIDAgMS0xLjkzNi0uNWMtMi40MjktMS4wODItNC4yOTItMi45NDUtNi4zNjUtNC40MjVhNjQuNjM3IDY0LjYzNyAwIDAgMS02LjA3NS00Ljc4NWMtMy43NzctMy41LTcuNDQ5LTcuMS0xMS4xNjctMTAuNjY0YTU2LjUzMyA1Ni41MzMgMCAwIDAtNS43NTktNS4xMDYgMjkuMDkxIDI5LjA5MSAwIDAgMS0yLjk0Mi0yLjUxNyA3LjYyNyA3LjYyNyAwIDAgMS0yLjEwNS0zLjI1MiAzLjYgMy42IDAgMCAxIC4wMjQtMS45NjcgNS4wNTQgNS4wNTQgMCAwIDEgLjk1NC0xLjcxMyAyMS4zODQgMjEuMzg0IDAgMCAxIDIuNzI5LTIuNzUxYy45NzMtLjg0OCAxLjk5My0xLjYzNiAzLjAxMi0yLjQyM2E0LjQ0IDQuNDQgMCAwIDEgMy43MTItLjk2OCAxMC44NDEgMTAuODQxIDAgMCAxIDMuNjIxIDEuNDMzIDI2LjM0OCAyNi4zNDggMCAwIDEgMy4xNzMgMi4yMzQgNjcuNjExIDY3LjYxMSAwIDAgMSA1LjY2MiA1LjI2OWwyLjY3MyAyLjc4NmMuODg1LjkzMiAxLjc1MyAxLjg4MiAyLjcgMi43MyAxLjg5NCAxLjc0MyAzLjkxMSAzLjMyMiA1LjkxMSA0Ljk1MSAxIC44MTcgMS45NTggMS42NzYgMi45MTUgMi41MzdzMS45NjYgMS42NDUgMi45NiAyLjQ2N2ExOS4zNjQgMTkuMzY0IDAgMCAxIDIuNzkgMi43MDcgNi4xODYgNi4xODYgMCAwIDEgMS41MDUgMy42MDd6bS0uMzkzLjAxM2E1LjggNS44IDAgMCAwLTEuNDA3LTMuMzg3IDE4Ljc4MyAxOC43ODMgMCAwIDAtMi43My0yLjY1NmMtLjk4NS0uODE5LTIuMDA3LTEuNjA2LTIuOTg1LTIuNDU3bC0yLjkzLTIuNWMtMS45OC0xLjYyNS0zLjk5LTMuMjYxLTUuOS00Ljk4Ny0xLjkxOC0xLjc2LTMuNTg4LTMuNzA5LTUuMzgzLTUuNTUxYTU5LjY2OCA1OS42NjggMCAwIDAtNS42MTgtNS4yNTMgMjUuOTg1IDI1Ljk4NSAwIDAgMC0zLjEzMS0yLjIgMTAuNDg0IDEwLjQ4NCAwIDAgMC0zLjQ5NC0xLjM4MSA0LjE0IDQuMTQgMCAwIDAtMy40NzYuODMzIDQ0LjAwMiA0NC4wMDIgMCAwIDAtMi45ODYgMi40MjEgMjEuMDc1IDIxLjA3NSAwIDAgMC0yLjY1OSAyLjczMSAzLjc3OCAzLjc3OCAwIDAgMC0uOSAzLjM3OCA3LjEzMyA3LjEzMyAwIDAgMCAxLjk5MiAzLjEwOCAyOC43NzkgMjguNzc5IDAgMCAwIDIuOTIzIDIuNDY4IDI4LjQyNiAyOC40MjYgMCAwIDEgMi45OTUgMi40NjdsMi43ODUgMi42NzFjMy44IDMuNDY3IDcuNCA3LjE1NyAxMS4xODQgMTAuNjMyLjk0My44NzMgMS45IDEuNzIgMi45MjMgMi41czIuMDggMS41MTEgMy4xMTQgMi4yNzdjMi4xMDYgMS40ODEgMy45OCAzLjMxNiA2LjMxNCA0LjM0MSAxLjEyNi40ODggMi41Ljc4NyAzLjUxNC4wMTVhMTEuNzUyIDExLjc1MiAwIDAgMCAyLjU1Ni0yLjhsMi4yLTMuMTU3YTYuMjU5IDYuMjU5IDAgMCAwIDEuMDk4LTMuNTEzeiIgZmlsbD0iIzA4MTE0MCIvPjxwYXRoIGQ9Ik0xNDEuNzUyIDExNC4wNjJhMzUuNTQgMzUuNTQgMCAwIDEtMi43MjYgMy4xMjMgMjMuNzE0IDIzLjcxNCAwIDAgMC0yLjg0IDMuMDIzIDMwLjA2NiAzMC4wNjYgMCAwIDEtMi43OTIgMy4wNjUgMTUuNTY2IDE1LjU2NiAwIDAgMC0xLjMyMSAxLjYgMjEuNzM3IDIxLjczNyAwIDAgMS0xLjM4MSAxLjU0Ni45LjkgMCAwIDEtMS4zNjktMS4xN2wuMDA4LS4wMTFhMjUuNjUzIDI1LjY1MyAwIDAgMSAyLjc0MS0zLjExOWMuOTExLTEuMDQyIDEuODMxLTIuMDc2IDIuODQyLTMuMDNhMzMuNDM3IDMzLjQzNyAwIDAgMCAyLjc5Mi0zLjA3NCAyMC4yMzEgMjAuMjMxIDAgMCAwIDIuNy0zLjE1My45LjkgMCAxIDEgMS41NTkuOTEuOTEzLjkxMyAwIDAgMS0uMDYzLjA5NHptMTQuOTg3IDM1LjExNGEzOS4yMTIgMzkuMjEyIDAgMCAxIDIuMi0zLjM1OSAyNi44NTYgMjYuODU2IDAgMCAwIDIuMzctMy4zIDE5LjE0MiAxOS4xNDIgMCAwIDEgMi41MDYtMy4yMzljLjQ2Ny0uNS44NzEtMS4wNjMgMS4zLTEuNjA5YTEzLjI4IDEzLjI4IDAgMCAxIDEuNDY5LTEuNDc2LjkuOSAwIDAgMSAxLjI2MyAxLjI3OWwtLjAzNi4wNDFhOTQuODY4IDk0Ljg2OCAwIDAgMS0yLjY0MiAyLjg4NGMtLjgyNSAxLjAyMi0xLjYxMSAyLjA4Mi0yLjQ3NSAzLjFhMjUuNjQzIDI1LjY0MyAwIDAgMC0yLjI4NSAzLjMgMjEuMDczIDIxLjA3MyAwIDAgMC0yLjE5MSAzLjQwNy45LjkgMCAxIDEtMS42MTEtLjgwN3oiIGZpbGw9IiNmZmM3NTciLz48cGF0aCBkPSJNMzguODM0IDY3LjY5MWMuNDQtMi43NzkgMS4zODYtNS40MDkgMS45NDItOC4xNzNhNDMuODkgNDMuODkgMCAwIDEgMy40MjQtNy42NzIgMzMuNSAzMy41IDAgMCAxIDIuMjM2LTMuNTYzQTMwLjkgMzAuOSAwIDAgMSA0OS4wNjMgNDVjLjkzMS0xLjA0OCAxLjg0NC0yLjEgMi44NjktMy4wNTNsMy4xMjktMi43NjdhNDQuOTQ5IDQ0Ljk0OSAwIDAgMSAzLjM2Mi0yLjQ2N2MxLjE4MS0uNzI4IDIuMi0xLjcyOCAzLjQxOS0yLjRsMS44LTEuMDYzIDEuODYyLS45NjFjMS4yNjQtLjU5IDIuNS0xLjI1OSAzLjgyMi0xLjczMS42NjktLjIxIDEuMzIzLS40NjEgMi0uNjI4czEuMzQ5LS4zNzEgMi4wMTMtLjU5M2EzMS45MjQgMzEuOTI0IDAgMCAxIDQuMDg2LS45NjJjLjY5MS0uMTE4IDEuMzkzLS4xNTggMi4wODktLjIyNy42OTItLjEwNiAxLjM4NC0uMiAyLjA4Mi0uMjYyIDEuMzkyLS4xODEgMi44LS4yMjkgNC4yLS4yNzdhLjc4Ny43ODcgMCAxIDEgLjA1MyAxLjU3MmgtLjFjLTEuMzQ5LjAyLTIuNy4wMzYtNC4wMzkuMTg1YTE5LjEzNiAxOS4xMzYgMCAwIDAtMy45OC43MDVjLS42NTEuMTc3LTEuMzI2LjIzMi0xLjk4MS4zOTNsLTEuOTc4LjQzM2E0MC4wMzMgNDAuMDMzIDAgMCAwLTMuODc1IDEuMiAyOC43NzkgMjguNzc5IDAgMCAwLTcuMzI3IDMuNSAxMC42IDEwLjYgMCAwIDEtMS43NyAxIDUgNSAwIDAgMC0uOTIxLjQ1MWMtLjI3OC4yLS41NDQuNDA5LS44MTYuNjEyLTEuMDgzLjgyNi0yLjAyNCAxLjgyMi0zLjA4NyAyLjY0OC0uNTMxLjQxNS0xLjEwOS43OC0xLjYxOCAxLjIyNWwtMS40MjQgMS40MjdjLS41LjQ1NC0uOTI2Ljk3OS0xLjQyIDEuNDQxYTEwLjI1OCAxMC4yNTggMCAwIDAtMS4zNDcgMS41IDI1LjEyMyAyNS4xMjMgMCAwIDEtMi40MzUgMy4yMjggMTEuMjQzIDExLjI0MyAwIDAgMC0xLjEyMiAxLjY5M2MtLjQuNTUyLS43NjUgMS4xMjYtMS4xNTMgMS42OWEzMi43MzYgMzIuNzM2IDAgMCAwLTMuMTEyIDcuNTQ0IDE5LjI4MyAxOS4yODMgMCAwIDAtMS4yMSAzLjkgNzEuMzMzIDcxLjMzMyAwIDAgMC0uNzQ5IDQgLjc4Ny43ODcgMCAwIDEtMS41NTYtLjIzOXptODIuOTA1IDM0LjI2bC0xLjg1NCAyLjMwOWEyMS4wOTEgMjEuMDkxIDAgMCAxLTEuOTQ2IDIuMjE1bC0xLjA1MiAxLjAzYy0uMzQ3LjM0Ny0uNjYxLjcyNy0xIDEuMDgzcS0xIDEuMDg0LTIuMDc3IDIuMTE2YTI5LjA4NSAyOS4wODUgMCAwIDEtMTAuMzI0IDUuOTA3bC01LjU0MSAxLjcxNGE0Ni41IDQ2LjUgMCAwIDEtNS42NzggMS41MTZjLS45NzEuMTctMS45NDIuMzc3LTIuOTI4LjQ4N2EyOC41MzEgMjguNTMxIDAgMCAxLTIuOTQ3LjE0OWMtLjk4IDAtMS45NTYtLjAzMi0yLjkzLS4wODNzLTEuOTQyLS4wNDUtMi45MjMtLjExOWEzOC44NjIgMzguODYyIDAgMCAxLTUuOC0uODY3IDUxLjU0NyA1MS41NDcgMCAwIDEtNS43MDktMS40IDQ3IDQ3IDAgMCAxLTEwLjYtNS4xMThjLTEuNjEzLTEuMTQtMy4xLTIuNDM2LTQuNi0zLjdhMzYuMjUgMzYuMjUgMCAwIDEtNC4xNzQtNC4xNzEgNTEuMjA1IDUxLjIwNSAwIDAgMS0xLjc3Ny0yLjM1OWMtLjYtLjc4LTEuMTYxLTEuNTg2LTEuNzE5LTIuNGE0My4zMTggNDMuMzE4IDAgMCAxLTIuOTktNS4xLjc4Ny43ODcgMCAxIDEgMS40MDctLjcwNnYuMDA2bC4wMTYuMDMyYTQxLjU0NiA0MS41NDYgMCAwIDAgMi44MTEgNC45NTMgMzguOSAzOC45IDAgMCAwIDEuNjUzIDIuMzE2Yy42LjczOCAxLjI1MiAxLjQyNyAxLjg4OSAyLjEyNiAxLjI4NyAxLjM4NSAyLjU2MSAyLjc4NyAzLjk1NyA0LjA3OGE0MC40MjcgNDAuNDI3IDAgMCAwIDQuNDU0IDMuNTQ3IDMzLjggMzMuOCAwIDAgMCAxMC4xNjIgNS4wODhjMS44NDEuNDUxIDMuNTM3IDEuNDY3IDUuNDU0IDEuNjcgMS44ODIuMzE5IDMuNzg4LjM5MSA1LjY2OS41MzUuOTMzLjExIDEuOS4yNDEgMi44NTYuMjY0czEuOTExLjAxIDIuODYtLjAyMWMuOTQ5LS4wMTEgMS44OS0uMDgyIDIuODIzLS4xNDdhMTIuMzI3IDEyLjMyNyAwIDAgMCAyLjc2MS0uNDY3Yy45MDYtLjI1OSAxLjc4OS0uNiAyLjcxMi0uODM2LjkxNS0uMjYzIDEuODU2LS40NzMgMi43ODctLjczOC45NDQtLjIyNiAxLjg0Ni0uNTg2IDIuNzc1LS44ODcuOTI1LS4yNzMgMS45MzEtLjQ3NCAyLjgyNi0uNzIyIDMuNzA2LS45NDkgNi44MzMtMy4zNTcgOS43LTUuODE3Ljc0MS0uNiAxLjQ3My0xLjIxMyAyLjE4LTEuODU4YTE1Ljk3NiAxNS45NzYgMCAwIDAgMS45NzgtMi4wNzZjMS4yOTItMS40MjUgMi4zNzYtMi45ODUgMy41NTktNC40NzJsLjA1LS4wNjNhLjc4Ni43ODYgMCAwIDEgMS4yMzEuOTc5ek00MC4yMTggODcuNDE0YTQuNzEgNC43MSAwIDAgMS0uNDU0LTEuNTU0IDMuNTczIDMuNTczIDAgMCAwLS4yNTEtMS42IDMuOTI4IDMuOTI4IDAgMCAxLS4yNzEtMS41OSAyLjQ4NiAyLjQ4NiAwIDAgMC0uMjE5LS43OCAzLjE4MiAzLjE4MiAwIDAgMS0uMTMtLjguOS45IDAgMCAxIDEuNzM0LS4zODRsLjA0Ny4xMWEzLjc3OSAzLjc3OSAwIDAgMSAuMjk1IDEuNTM5IDYuOTM3IDYuOTM3IDAgMCAxIC4yIDEuNTU2IDQuMDI1IDQuMDI1IDAgMCAwIC4zMTIgMS41MzYgNC4yNTEgNC4yNTEgMCAwIDEgLjExNi43NzggMS42ODUgMS42ODUgMCAwIDAgLjM1Ni43MTYuOTEuOTEgMCAxIDEtMS41MS45ODF6IiBmaWxsPSIjMDgxMTQwIi8+PHBhdGggZD0iTTI1LjMgMTIzLjYyN2MtMS43MjMgMy41NTMtNS4xMTQgNC4yMzMtOC41OTIgNC42MTZhNzEuNjM3IDcxLjYzNyAwIDAgMC03LjUyMSAxLjYgMzkuOTMxIDM5LjkzMSAwIDAgMS00Ljg5My03LjE0M2MxLjg1NS0uNSAzLjgyOS0xLjA4MiA0LjM2Ni0xLjMwNyA0Ljk1My0yLjEgNy43MzYtNi44MzcgMTIuNDkyLTkuMTE4IDEuMzc1LS42NjMgNC40MzctMS4xNSA1Ljc1NS0uMDc1IDIuMDgxIDEuNy0xLjMgMTAuNzgzLTEuNjA3IDExLjQyN3oiIGZpbGw9IiNhZmJhZGQiLz48cGF0aCBkPSJNODAuNDc1IDU4Ljk5NWMtLjQtLjgzOC0uODM4LTEuNjYtMS4yNTgtMi41YTE0LjYzMSAxNC42MzEgMCAwIDAtMS40MDctMi40MzZjLS41NTQtLjc2LTEuMDY3LTEuNTQ1LTEuNTktMi4zMjdhMTEuMDc5IDExLjA3OSAwIDAgMC0uODg3LTEuMDk1Yy0uMzA3LS4zNTUtLjU4OC0uNzMtLjg5MS0xLjA4N2EuNDUuNDUgMCAwIDEgLjY2Ny0uNmwuMDE4LjAxOWExNS44NjIgMTUuODYyIDAgMCAxIDEuOCAyLjI0NSAyMi4wMjMgMjIuMDIzIDAgMCAxIDEuNiAyLjM4OGMuNDcxLjgzNC45NzkgMS42NDQgMS40NjggMi40Ny4yNDQuNDE0LjQyOS44NTkuNjM5IDEuMjkxcy40My44Ni42NzYgMS4yODJhLjQ1MS40NTEgMCAwIDEtLjc3OS40NTVsLS4wMTctLjAzMnptLTMuMDA3IDQuMDZhMTkuNTQ3IDE5LjU0NyAwIDAgMS03LjcyNS01LjU2NiAxMC4xMzMgMTAuMTMzIDAgMCAxLTEuMzA3LTIuMDc4IDMuNTUgMy41NSAwIDAgMS0uMjktMi41OTQgMi42NjUgMi42NjUgMCAwIDEgLjgxMS0xLjExNyAzLjQxNiAzLjQxNiAwIDAgMSAxLjItLjU3NyAzLjYzOSAzLjYzOSAwIDAgMSAyLjU4MS4yNDEgMS45IDEuOSAwIDAgMSAuNTc4LjQ1NSAyLjU2NiAyLjU2NiAwIDAgMSAuMzc3LjU4IDIgMiAwIDAgMSAuMTUzIDEuNDQ1IDMuMDQ5IDMuMDQ5IDAgMCAxLTEuOTU1IDEuOCA4LjMxNyA4LjMxNyAwIDAgMS00Ljg4NS4wOTUgOS42OTMgOS42OTMgMCAwIDEtNC4yMzItMi4zODggOS45MjIgOS45MjIgMCAwIDEtMi40Ni00LjE4NS40NTEuNDUxIDAgMSAxIC44Ni0uMjcgOC44MzUgOC44MzUgMCAwIDAgNi4wNTIgNS45ODkgNy40NDMgNy40NDMgMCAwIDAgNC4zMzMtLjExQTIuMjQ1IDIuMjQ1IDAgMCAwIDczIDUzLjU5NWExLjEyOSAxLjEyOSAwIDAgMC0uMDc4LS44MzMgMS43NCAxLjc0IDAgMCAwLS4yNS0uNDA2IDEuMDggMS4wOCAwIDAgMC0uMzM1LS4yN2MtMS4xMjEtLjYxOC0zLjA0Mi0uMjctMy40NDEgMWEyLjc1OCAyLjc1OCAwIDAgMCAuMyAxLjk2OSA5LjI3NiA5LjI3NiAwIDAgMCAxLjIzNCAxLjg2NyAxOC4zMSAxOC4zMSAwIDAgMCAzLjMzNyAzLjEzMSAxOC41MDkgMTguNTA5IDAgMCAwIDQuMDMzIDIuMTY2LjQ1MS40NTEgMCAwIDEtLjMyNC44NDF6bS0uODY4IDMuNTI2Yy0xLjIxMi0uMzQ1LTIuNDY4LS41OTUtMy43MjItLjk1NGE0Ny43NCA0Ny43NCAwIDAgMS0xLjg2My0uNjEzIDE4LjUxNiAxOC41MTYgMCAwIDAtMS44NDYtLjUgMzEuNTUxIDMxLjU1MSAwIDAgMS0zLjc0Ni0xLjA0NmMtLjYxOC0uMjE1LTEuMjQ4LS40LTEuODctLjYzOGE5Ljg0NyA5Ljg0NyAwIDAgMS0xLjc4NS0uOTM0LjQ1LjQ1IDAgMCAxIC40NzEtLjc2N2wuMDI3LjAxNmEyMC44NjYgMjAuODY2IDAgMCAwIDMuNDIxIDEuNDg2YzEuMjEuMzgyIDIuNDYuNjc0IDMuNyAxLjA2MyAxLjI1NC4zNiAyLjQ4Mi44MDYgMy43MTMgMS4wOC42MjMuMTQ2IDEuMjM5LjMzNiAxLjg2Ny41czEuMjYzLjMwOSAxLjkxLjQ1M2EuNDUxLjQ1MSAwIDAgMS0uMi44OGwtLjAyNS0uMDA2eiIgZmlsbD0iIzIyMjY2ZCIvPjxwYXRoIGQ9Ik04MC41MjcgNTguOTczYy0uMjE0LS40MTItLjI3Mi0uOS0uNjU4LTEuMjM0LS4yNTItLjM5NC0uMzg4LS44NDktLjYwOC0xLjI2NHMtLjQtLjg1MS0uNTc4LTEuMjkzYy0uMS0uMjE1LS4yNS0uNC0uMzQ5LS42MTVhMi42OTQgMi42OTQgMCAwIDAtLjM2NC0uNjA3Yy0uMTM2LS4xOTMtLjIzOC0uNDA4LS4zNy0uNi0uMDk0LS4yMjItLjM2Ny0uMzIxLS40ODEtLjUyOC0uMy0uMzY2LS41OTEtLjczNS0uOS0xLjA5MmE2Ljg5MyA2Ljg5MyAwIDAgMC0uODE5LTEuMTUgMy44OTIgMy44OTIgMCAwIDAtLjkxMy0xLjA3Mi4zOTIuMzkyIDAgMCAxIC41NjMtLjU0NmwuMDM2LjAzNmE4LjcyOCA4LjcyOCAwIDAgMCAxIDEuMDQ0Yy4zLjM3Mi41Mi44MS44MDUgMS4xOTRhMy45ODggMy45ODggMCAwIDAgLjg1MyAxLjE1NGMuMjA4LjE0OC4xMjYuNDkzLjM0Mi42MzVhMy41MDggMy41MDggMCAwIDEgLjUwNS41MjcgMTQuODIyIDE0LjgyMiAwIDAgMSAxLjMgMi41NzEgNS45MjkgNS45MjkgMCAwIDAgLjczIDEuMjQgNy45OCA3Ljk4IDAgMCAwIC42NCAxLjMuMzkzLjM5MyAwIDAgMS0uNzEzLjMyOXoiIGZpbGw9IiNmZmM2NTciLz48cGF0aCBkPSJNODAuMTIgNTkuMTY0YTIzLjM4MSAyMy4zODEgMCAwIDAtMS41MDktMi44MzNBMjUuOTE4IDI1LjkxOCAwIDAgMCA3NyA1My42MzhjLS4zLS40NDYtLjU4Ny0uOS0uODY3LTEuMzY0LS4yNzQtLjQ3Ni0uNi0uODUtLjg5Mi0xLjMtLjMxMS0uNDI3LS42ODMtLjgyNC0xLTEuMjU4YS42OTEuNjkxIDAgMCAxIC4yMjMtMS4wNDguNzIuNzIgMCAwIDEgLjU4LS4wMjcuNy43IDAgMCAxIC4yNC4xNjRsLjE0NC4xNDNhMTUuMTggMTUuMTggMCAwIDEgMS4wMzYgMS4yNTZjLjMuNDYxLjcyNi44MDkgMS4wMDYgMS4yNzQuNjA1Ljg5IDEuMyAxLjc1NiAxLjg0NCAyLjY2Ny40NjQuOTY1IDEuMDg2IDEuODM0IDEuNTI4IDIuODQ0YTkuMjU0IDkuMjU0IDAgMCAwIC43MDkgMS40MjIuODYxLjg2MSAwIDAgMSAuMTM1LjYxNS44LjggMCAwIDEtLjQuNTYxLjgyNC44MjQgMCAwIDEtMS4wMDYtLjE3IDEuMTY3IDEuMTY3IDAgMCAxLS4xNi0uMjUzem0uNzExLS4zMzljLjAzOS4wODEuMDQ1LjA4Mi4wNDUuMDgyYS4wNDMuMDQzIDAgMCAwIC4wMi4wMS4wNDMuMDQzIDAgMCAwIC4wNC0uMDA3LjAzNy4wMzcgMCAwIDAgLjAxNy0uMDMyLjA1NS4wNTUgMCAwIDAgMC0uMDE2bC0uMDQxLS4wNzQtLjM5My0uNzE4Yy0uMTQtLjIzMS0uMzA3LS40NjUtLjQzLS42ODktLjI3Mi0uNDUyLS40MTktLjk0OC0uNy0xLjQxOC0uMjQ2LS40NzktLjUyNi0uOTM3LS43ODctMS40MDZBMTQuODI5IDE0LjgyOSAwIDAgMCA3Ni44NiA1MS45Yy0uMzc1LS4zODEtLjQ1My0uOTkxLS44NS0xLjMzOC0uMzU0LS4zODgtLjc1Mi0uNzMyLTEuMTEzLTEuMTA2LS4wNDYtLjA0Ny0uMDgxLS4xLS4xMjItLjE1NC0uMDIyLS4wMzEuMDA4LS4wMTMuMDA1LS4wMjRzMC0uMDMxIDAtLjAyMi4wMS4wMTUuMDExIDBjLjM1NC40LjYyNi44NTYgMSAxLjI1NWE0LjI1MSA0LjI1MSAwIDAgMSAuOTggMS4zMjYgNS4wODMgNS4wODMgMCAwIDAgLjQyNy42NzdsLjM4My43MDlhMTAuNjg0IDEwLjY4NCAwIDAgMCAuOSAxLjM1MSAxMiAxMiAwIDAgMSAuODcyIDEuMzkgMjcuNzU4IDI3Ljc1OCAwIDAgMCAxLjQ3NyAyLjg2MXpNNzcuNDg5IDYzYTM0LjQ2NiAzNC40NjYgMCAwIDEtNC4yMDgtMi4yNyAxNy4yNiAxNy4yNiAwIDAgMS0zLjQ5LTMuMjgxIDkuMzczIDkuMzczIDAgMCAxLTEuMjg0LTIuMDcyIDMuMzkgMy4zOSAwIDAgMS0uMjI2LTIuNTE2IDIuNjg4IDIuNjg4IDAgMCAxIC43NTgtMS4wNjEgMi45NTggMi45NTggMCAwIDEgMS4xNTQtLjU0MSAzLjgyNyAzLjgyNyAwIDAgMSAyLjQ1OC4yNiAxLjkxMSAxLjkxMSAwIDAgMSAuODU4Ljk2NCAxLjc3NCAxLjc3NCAwIDAgMSAuMTE1IDEuMjkzIDIuOTY5IDIuOTY5IDAgMCAxLTEuNzg4IDEuNzI4IDguMzI5IDguMzI5IDAgMCAxLTQuODI4LjIyNyA5Ljc4NSA5Ljc4NSAwIDAgMS00LjE3Mi0yLjQ0IDEwLjIxNiAxMC4yMTYgMCAwIDEtLjc1OC0uOTUxIDkuNDk1IDkuNDk1IDAgMCAxLS42ODItMSAxMi4yNjUgMTIuMjY1IDAgMCAxLTEuMDI3LTIuMTkuMzkzLjM5MyAwIDAgMSAuNzM2LS4yNzh2LjAwNmwuMDEzLjAzNmE4LjU0MyA4LjU0MyAwIDAgMCAyLjMyNSAzLjc3NCAxMS4zNTQgMTEuMzU0IDAgMCAwIDEuNzI1IDEuMzc1IDcuNzI5IDcuNzI5IDAgMCAwIDIuMDQ0Ljg2NyA2LjM5NCA2LjM5NCAwIDAgMCA0LjM1Ni0uMTIyYy4zMzEtLjEzOS42MTgtLjMyNS45MjYtLjQ3MWExLjA0MSAxLjA0MSAwIDAgMCAuNTYxLS43MjkgMS40NjMgMS40NjMgMCAwIDAtLjc1OS0xLjQ1MyAyLjM5MSAyLjM5MSAwIDAgMC0xLjkyOS0uMjA3IDEuODMgMS44MyAwIDAgMC0xLjQxMSAxLjE1NSA0LjAyOSA0LjAyOSAwIDAgMCAuMjQ4IDEuOTQ3IDQuMzIzIDQuMzIzIDAgMCAwIC41My45NzljLjE3My4zMzQuNC42NDUuNjA1Ljk2NmExMy43MTEgMTMuNzExIDAgMCAwIDMuNDI1IDMuMDYxIDE0Ljc5MyAxNC43OTMgMCAwIDAgNC4wMTYgMi4yMTIuMzk0LjM5NCAwIDAgMS0uMjk0LjczeiIgZmlsbD0iI2ZmYzY1NyIvPjxwYXRoIGQ9Ik03Ny4zMjEgNjMuNDIxYTIxLjk4NyAyMS45ODcgMCAwIDEtOC4wMjEtNS43MzMgMTAuMTM1IDEwLjEzNSAwIDAgMS0xLjM0Mi0yLjE3MiAzLjk0NCAzLjk0NCAwIDAgMS0uMy0yLjY4NCAzLjEgMy4xIDAgMCAxIDEuOTE1LTEuOTc3IDQuMjYzIDQuMjYzIDAgMCAxIDIuNjY2LS4xNDEgMi45NjggMi45NjggMCAwIDEgMS4yNDIuNjY0IDIuODYgMi44NiAwIDAgMSAuNDIxLjU2OSAyLjE1NSAyLjE1NSAwIDAgMSAuMzE3LjYzNiAyLjMxNiAyLjMxNiAwIDAgMS0uMDE3IDEuNDQ3IDIuODE3IDIuODE3IDAgMCAxLS43ODkgMS4xNDkgNC45ODIgNC45ODIgMCAwIDEtMi4zNyAxLjA1NCA4LjE4MyA4LjE4MyAwIDAgMS0yLjUxNy4wNjcgMTAuMDEgMTAuMDEgMCAwIDEtNC42NDMtMS43MTggMTAuMTM0IDEwLjEzNCAwIDAgMS0zLjY0Ny00LjkyOCAyIDIgMCAwIDEtLjE2NS0uNjg1LjY4LjY4IDAgMCAxIDEuMzE4LS4xNjNsLjIuNTdhMTAuMTYyIDEwLjE2MiAwIDAgMCAuNDkzIDEuMDgyIDguNTIgOC41MiAwIDAgMCAzLjI3NiAzLjMyNCA3Ljg1OSA3Ljg1OSAwIDAgMCA0LjQ4OCAxIDUuMTc4IDUuMTc4IDAgMCAwIDIuMTU4LS42MjMgMS4zODUgMS4zODUgMCAwIDAgLjYzLS42Ny44NjUuODY1IDAgMCAwLS4yMDgtLjc3OGMtLjY2Ny0uOTE5LTMuMTE1LS42NjUtMy4yMzMuN2EzLjU0IDMuNTQgMCAwIDAgLjY1NCAyLjA1MSAxNS4zNTQgMTUuMzU0IDAgMCAwIDEuNDMzIDEuODczIDE0LjY3NiAxNC42NzYgMCAwIDAgMy42MiAzLjA3MSAxNy4wMTkgMTcuMDE5IDAgMCAwIDIuMTIgMS4xbC41NTEuMjI4LjI3OC4xMDdhLjk1Mi45NTIgMCAwIDEgLjQuMjQ3LjgzNC44MzQgMCAwIDEgLjA2OCAxLjAzNi44NDQuODQ0IDAgMCAxLS45OTYuMjk3em0uMjkzLS43MzFhLjA1NC4wNTQgMCAwIDAgLjA2NC0uMDg0Yy4wNi4wMTQtLjIyLS4wODctLjQtLjE2MWwtLjU3My0uMjQzYTE4Ljk2NSAxOC45NjUgMCAwIDEtMi4yLTEuMTU4IDE2LjU2OCAxNi41NjggMCAwIDEtMi4wMjUtMS40NTMgMTguMTY0IDE4LjE2NCAwIDAgMS0xLjg0Ny0xLjY3OEExMC43ODYgMTAuNzg2IDAgMCAxIDY5LjEgNTUuOWE0LjI2NyA0LjI2NyAwIDAgMS0uNzItMi42MDcgMi4xMTYgMi4xMTYgMCAwIDEgLjc2MS0xLjMwOSAyLjg4NiAyLjg4NiAwIDAgMSAxLjMtLjU3MiAzLjM0NyAzLjM0NyAwIDAgMSAxLjM4My4wMzEgMi43NDEgMi43NDEgMCAwIDEgLjY2OC4yNDYgMS4zNSAxLjM1IDAgMCAxIC41ODkuNTMyIDEuNjUgMS42NSAwIDAgMSAuMjgxIDEuNTA5IDIuMTMzIDIuMTMzIDAgMCAxLS45OTQgMS4wNjQgNi41OTIgNi41OTIgMCAwIDEtMi40ODMuNyA4LjU0NyA4LjU0NyAwIDAgMS00LjkxOS0xLjA3NiA5LjYwNSA5LjYwNSAwIDAgMS0zLjQyMS0zLjY4NCAxMC43NjcgMTAuNzY3IDAgMCAxLS41NTUtMS4xMzRsLS4yMjItLjU3NmMtLjAwOC0uMDA5LS4wMjctLjAwNy0uMDIzIDAtLjEtLjMxMy4zMzcuODQyLjYxNSAxLjQ2MWE4LjUzMSA4LjUzMSAwIDAgMCAxLjE5MSAxLjk3NyA4LjcgOC43IDAgMCAwIDEuNzI3IDEuNTI2IDkuMSA5LjEgMCAwIDAgNC4zMTEgMS41ODkgOS4zIDkuMyAwIDAgMCAyLjI4MS0uMTUgNC4zNzQgNC4zNzQgMCAwIDAgMi4wMTYtLjgyNCAxLjgxNyAxLjgxNyAwIDAgMCAuNTg5LS44MjQgMS41NDcgMS41NDcgMCAwIDAtLjAwNy0uOTYzIDEuNiAxLjYgMCAwIDAtLjIyLS40NjMgMi4yNDEgMi4yNDEgMCAwIDAtLjI4OS0uNDM4IDIuMTcyIDIuMTcyIDAgMCAwLS45MTktLjUyYy0xLjM5Mi0uNDYyLTMuMzA1LjE3MS0zLjY3OCAxLjYzM2EzLjMxIDMuMzEgMCAwIDAgLjMyOCAyLjE3MSA5LjM4IDkuMzggMCAwIDAgMS4yNiAxLjk3MyAxNy45MjMgMTcuOTIzIDAgMCAwIDcuNjY0IDUuNTE4em0tLjk5NyAzLjgzN2E2LjEyMyA2LjEyMyAwIDAgMC0xLjg1OC0uNDM1Yy0uNjMzLS4xMDctMS4yMzktLjM0OC0xLjg2OC0uNTE0YTEyLjQwOSAxMi40MDkgMCAwIDEtMS44MzctLjY4NWMtLjI5NC0uMTI0LS42MTItLjE3OS0uOTEtLjNhNC43MTYgNC43MTYgMCAwIDAtLjkyNS0uMjY5Yy0uMzEzLS4wNzUtLjYxNy0uMTg2LS45My0uMjY1LS4zLS4xMjgtLjY1Ni0uMDQyLS45NjItLjE1Mi0uNjMxLS4xNDUtMS4yNy0uMjc1LTEuOS0uNDQ1LS41OTMtLjI4OS0xLjIzNS0uNDM3LTEuODM2LS43MTgtLjU1Ni0uMzcyLTEuMi0uNTQ4LTEuNzg4LS45YS4zOTMuMzkzIDAgMCAxIC4zOTUtLjY3OWwuMDQxLjAyM2E2LjE3NCA2LjE3NCAwIDAgMCAxLjY4OC43NjdjLjU3OS4yMjYgMS4xNDEuNTMgMS43NDkuNzE4YTYuNDc1IDYuNDc1IDAgMCAwIDEuODQ1LjUxNWMuMzM1LS4wMTQuNTc5LjMyNi45MTYuMzA5YTYuMDkyIDYuMDkyIDAgMCAxIC45NzEuMTE1IDMuNSAzLjUgMCAwIDAgLjkzMS4yOTNjLjMyLjA3My42MTMuMjMxLjkzNi4zYTEuODExIDEuODExIDAgMCAxIC45LjMxMyAxLjcgMS43IDAgMCAwIC40NTIuMTU3bC40NDEuMjA3YTkuMTkgOS4xOSAwIDAgMCAxLjg5My40IDE4LjI1OCAxOC4yNTggMCAwIDAgMS45LjQ5LjM5My4zOTMgMCAwIDEtLjIyMS43NTV6IiBmaWxsPSIjZmZjNjU3Ii8+PHBhdGggZD0iTTc2LjQ5MiA2Ni45NmMtMS4zNzUtLjMzOS0yLjcwOS0uNzc1LTQuMTI2LTEtMS40LS40NC0yLjY0Ny0uODcyLTQuMDI4LTEuMmEyNy44MTQgMjcuODE0IDAgMCAxLTQuMDQ2LTEuMzgzYy0uMzI4LS4xNDMtLjY2NS0uMjI3LTEuMDA1LS4zNjJhNy42ODQgNy42ODQgMCAwIDEtLjk3Mi0uNDlsLS40NTgtLjI4OS0uMjI3LS4xNTVhLjY3Ni42NzYgMCAwIDEtLjI0LS4zMS43LjcgMCAwIDEgLjE0OC0uNzMxLjY4My42ODMgMCAwIDEgLjczOS0uMTU0IDE2LjQ5IDE2LjQ5IDAgMCAwIDEuODkzLjk0MiAxNS45NzYgMTUuOTc2IDAgMCAwIDIuMDA3LjYyMmw0LjA4OCAxLjA4MmMuNjczLjIyNCAxLjMyMi41IDIgLjY2OHMxLjM2LjMgMi4wMzguNTIyYy4zMzguMS42NzQuMjI5IDEuMDE0LjMxNWwxLjAzLjIyMi41MTUuMTExYS45NS45NSAwIDAgMSAuMzcyLjEzNy44MTIuODEyIDAgMCAxIC4xMTggMS4yNS44NjIuODYyIDAgMCAxLS44Ni4yMDN6bS4yMTYtLjc1N2MuMTQyLjA0My4xMTEtLjAzMS4xMTEtLjA1NWEuMDUuMDUgMCAwIDAtLjAxOC0uMDE4LjYuNiAwIDAgMC0uMS0uMDI0bC0uNTE5LS4xMTdjLS42ODktLjE2OS0xLjM5MS0uMy0yLjA3Ny0uNDM1LTEuMzQ1LS4zMy0yLjc2Ny0uNzk0LTQuMDgtMS4yMzNhMzQuNjM2IDM0LjYzNiAwIDAgMC00LjA4LTEuMTY3Yy0uNzI1LS4xLTEuMjg5LS42MjYtMS45OS0uNzkxLS4zMzgtLjEyLS42ODYtLjIyNS0xLjAyMi0uMzY1bC0uNTA2LS4yMTQtLjI1MS0uMTE3LS4xMi0uMDY4Yy0uMDQ4LS4wMjktLjA3OS0uMDQ2LS4wNTktLjAzNi4wNjItLjAxLjAwNi0uMDY5LjAxLS4wNDFoLjAwNWwuMjEuMTI5LjQ0NC4yNDdhOC4yIDguMiAwIDAgMCAxLjg3OS44IDkuODQyIDkuODQyIDAgMCAxIDEuOTcyLjcgNi43MDggNi43MDggMCAwIDAgMSAuMzE5bC45OTUuMzRjMS4zNDEuNDI1IDIuOC42NzMgNC4xMDYgMS4xYTM5LjE2NCAzOS4xNjQgMCAwIDAgNC4wOSAxLjA0M3oiIGZpbGw9IiNmZmM2NTciLz48cGF0aCBkPSJNNjguMSA0NC45MDZjLjAzNi0uMjkzLS4yMzMtLjU3Ni0uNDUxLS40NzNhLjUxNS41MTUgMCAwIDAtLjA5LjcyN2MuMTgyLjE5MS41LjAzOS41NDEtLjI1NCIgZmlsbD0iI2ZmYzc1NyIvPjxwYXRoIGQ9Ik02Ny43MDcgNDQuODU3Yy0uMDM4LS4wMzItLjE1OS4wMjMtLjAyMi0uMDE1YS4zMS4zMSAwIDAgMCAuMDUtLjAxNGMuMDIxLS4wMjcuMDMtLjA3Ni4wNDUtLjA2OC4wMjctLjAxMy4wMzgtLjAzMi4wMzUtLjAzOHMtLjE0NC0uMDA4LS4xNTQuMDY1YzAgLjE1NC4yLjIxOS4xMi4wODItLjA1LS4wNzctLjA3Ny4wMTgtLjAyOS4wMzkuMDEtLjAwNyAwLS4wNDEtLjA0NS0uMDUxYS42NTYuNjU2IDAgMSAxIC44MDktLjYyNWwtLjAxNS43MjRhLjc3Mi43NzIgMCAwIDEtLjIyOS41NTFjLS4xNjYuMTYxLS40MjkuMTIxLS42NTYuMTEzYS43LjcgMCAwIDEtLjUtLjQxNSAxLjA4NSAxLjA4NSAwIDAgMS0uMDgyLS41YzAtLjE1NS0uMDU0LS4zOTIuMTcyLS41NDdhLjc2Ni43NjYgMCAwIDEgLjQtLjA5MWMuMDY5LjAyNS4xMjQtLjAyMy4xOS0uMDMxYS40NS40NSAwIDAgMSAuMTU5LjA3OCAyLjQxMiAyLjQxMiAwIDAgMSAuMTkzLjJjLjA2My4wNDMuMTkxLjA1Mi4yMjMuMTM3YS43LjcgMCAwIDEgLjEzMy41MDYuMjk0LjI5NCAwIDAgMS0uNDc3LjE3em00LjEgMS4zNDNjLjA2Ny0uNTUzLS41MDctMS4xLS45NjItLjkyMWEuOS45IDAgMCAwLS4xNjcgMS4zNzIuNjg3LjY4NyAwIDAgMCAxLjEyOS0uNDUxIiBmaWxsPSIjZmZjNzU3Ii8+PHBhdGggZD0iTTcxLjQxIDQ2LjE1NGMtLjAyMi0uMTg4LS4yNDItLjMyNC0uMzI1LS40NTVsLS4wMzgtLjAzNWMtLjAwOC0uMDI5LS4wMjctLjA3OC0uMDQxLS4wNjJhLjE3Mi4xNzIgMCAwIDAtLjA5My4wMjVjLS4wNTUuMDQyLS4yNDEuMTI0LS4yNjMuMjktLjAxMi4zMy4yNDUuNTg5LjQuNTIzLjA3Mi0uMDUuMTUzLjAwNS4yNzMtLjAyMmEuMjMyLjIzMiAwIDAgMCAuMDg2LS4yNjMuNDE2LjQxNiAwIDEgMSAuODA2LS4xMjdsLS4wMTEuMjI0YTEuMSAxLjEgMCAwIDEtLjQxNS44MDkgMS4yNTggMS4yNTggMCAwIDEtLjkuMTMgMS4wMzkgMS4wMzkgMCAwIDEtLjcxMi0uNTUyIDEuNDggMS40OCAwIDAgMS0uMTQ5LS44LjkxMi45MTIgMCAwIDEgLjMzOC0uODI5Ljk4Ni45ODYgMCAwIDEgLjUyOC0uMTExYy4wODYuMDI2LjE2Mi0uMDE2LjI0NS0uMDIxYS43NjIuNzYyIDAgMCAxIC4yMTEuMDk0IDIuODg2IDIuODg2IDAgMCAxIC4zMDkuMjU3Yy4xLjA2OC4yNTkuMTA2LjMyMy4yMjhhMS4wOTIgMS4wOTIgMCAwIDEgLjIyNS44LjQuNCAwIDAgMS0uNzg1LS4wMTV6IiBmaWxsPSIjZmZjNzU3Ii8+PC9zdmc+Cg==';

var styles$36 = {
  "Image": "Polaris-EmptySearchResult__Image",
};

var _jsxFileName$57 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/EmptySearchResult/EmptySearchResult.js';
var EmptySearchResult$1 = function (_React$PureComponent) {
    _inherits(EmptySearchResult, _React$PureComponent);

    function EmptySearchResult() {
        _classCallCheck(this, EmptySearchResult);

        return _possibleConstructorReturn(this, (EmptySearchResult.__proto__ || Object.getPrototypeOf(EmptySearchResult)).apply(this, arguments));
    }

    _createClass(EmptySearchResult, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                description = _props.description,
                withIllustration = _props.withIllustration,
                intl = _props.polaris.intl;

            var altText = intl.translate('Polaris.EmptySearchResult.altText');
            var descriptionMarkup = description ? React.createElement(
                'p',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$57,
                        lineNumber: 10
                    }
                },
                description
            ) : null;
            var illustrationMarkup = withIllustration ? React.createElement(Image$1, { alt: altText, source: emptySearch, className: styles$36.Image, draggable: false, __self: this,
                __source: {
                    fileName: _jsxFileName$57,
                    lineNumber: 11
                }
            }) : null;
            return React.createElement(
                Stack$1,
                { alignment: 'center', vertical: true, __self: this,
                    __source: {
                        fileName: _jsxFileName$57,
                        lineNumber: 12
                    }
                },
                illustrationMarkup,
                React.createElement(
                    DisplayText$1,
                    { size: 'small', __self: this,
                        __source: {
                            fileName: _jsxFileName$57,
                            lineNumber: 14
                        }
                    },
                    title
                ),
                React.createElement(
                    TextStyle$1,
                    { variation: 'subdued', __self: this,
                        __source: {
                            fileName: _jsxFileName$57,
                            lineNumber: 15
                        }
                    },
                    descriptionMarkup
                )
            );
        }
    }]);

    return EmptySearchResult;
}(React.PureComponent);
var EmptySearchResult$2 = withAppProvider()(EmptySearchResult$1);

var styles$37 = {
  "EmptyState": "Polaris-EmptyState",
  "imageContained": "Polaris-EmptyState--imageContained",
  "Image": "Polaris-EmptyState__Image",
  "Section": "Polaris-EmptyState__Section",
  "ImageContainer": "Polaris-EmptyState__ImageContainer",
  "DetailsContainer": "Polaris-EmptyState__DetailsContainer",
  "Details": "Polaris-EmptyState__Details",
  "Content": "Polaris-EmptyState__Content",
  "Actions": "Polaris-EmptyState__Actions",
};

var _jsxFileName$58 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/EmptyState/EmptyState.js';
var EmptyState$1 = function (_React$PureComponent) {
  _inherits(EmptyState, _React$PureComponent);

  function EmptyState() {
    _classCallCheck(this, EmptyState);

    return _possibleConstructorReturn(this, (EmptyState.__proto__ || Object.getPrototypeOf(EmptyState)).apply(this, arguments));
  }

  _createClass(EmptyState, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          heading = _props.heading,
          image = _props.image,
          largeImage = _props.largeImage,
          imageContained = _props.imageContained,
          action = _props.action,
          secondaryAction = _props.secondaryAction;

      var className = styles.classNames(styles$37.EmptyState, imageContained && styles$37.imageContained);
      var imageMarkup = largeImage ? React.createElement(Image$1, { alt: '', role: 'presentation', className: styles$37.Image, source: largeImage, sourceSet: [{ source: image, descriptor: '568w' }, { source: largeImage, descriptor: '1136w' }], sizes: '(max-width: 568px) 60vw', __self: this,
        __source: {
          fileName: _jsxFileName$58,
          lineNumber: 9
        }
      }) : React.createElement(Image$1, { role: 'presentation', alt: '', className: styles$37.Image, source: image, __self: this,
        __source: {
          fileName: _jsxFileName$58,
          lineNumber: 12
        }
      });
      var secondaryActionMarkup = secondaryAction ? buttonFrom(secondaryAction, { plain: true }) : null;
      return React.createElement(
        'div',
        { className: className, __self: this,
          __source: {
            fileName: _jsxFileName$58,
            lineNumber: 16
          }
        },
        React.createElement(
          'div',
          { className: styles$37.Section, __self: this,
            __source: {
              fileName: _jsxFileName$58,
              lineNumber: 17
            }
          },
          React.createElement(
            'div',
            { className: styles$37.DetailsContainer, __self: this,
              __source: {
                fileName: _jsxFileName$58,
                lineNumber: 18
              }
            },
            React.createElement(
              'div',
              { className: styles$37.Details, __self: this,
                __source: {
                  fileName: _jsxFileName$58,
                  lineNumber: 19
                }
              },
              React.createElement(
                TextContainer$1,
                {
                  __self: this,
                  __source: {
                    fileName: _jsxFileName$58,
                    lineNumber: 20
                  }
                },
                React.createElement(
                  DisplayText$1,
                  { size: 'medium', __self: this,
                    __source: {
                      fileName: _jsxFileName$58,
                      lineNumber: 21
                    }
                  },
                  heading
                ),
                React.createElement(
                  'div',
                  { className: styles$37.Content, __self: this,
                    __source: {
                      fileName: _jsxFileName$58,
                      lineNumber: 22
                    }
                  },
                  children
                )
              ),
              React.createElement(
                'div',
                { className: styles$37.Actions, __self: this,
                  __source: {
                    fileName: _jsxFileName$58,
                    lineNumber: 25
                  }
                },
                React.createElement(
                  Stack$1,
                  { alignment: 'center', __self: this,
                    __source: {
                      fileName: _jsxFileName$58,
                      lineNumber: 26
                    }
                  },
                  buttonFrom(action, { primary: true, size: 'large' }),
                  secondaryActionMarkup
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: styles$37.ImageContainer, __self: this,
              __source: {
                fileName: _jsxFileName$58,
                lineNumber: 34
              }
            },
            imageMarkup
          )
        )
      );
    }
  }]);

  return EmptyState;
}(React.PureComponent);

var _jsxFileName$61 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Focus/Focus.js';
var Focus$1 = function (_React$PureComponent) {
    _inherits(Focus, _React$PureComponent);

    function Focus() {
        _classCallCheck(this, Focus);

        return _possibleConstructorReturn(this, (Focus.__proto__ || Object.getPrototypeOf(Focus)).apply(this, arguments));
    }

    _createClass(Focus, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fastdom.write(function () {
                var root = ReactDOM.findDOMNode(_this2);
                if (root) {
                    if (!root.querySelector('[autofocus]')) {
                        focus.focusFirstFocusableNode(root, false);
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var Fragment$$1 = React.Fragment;
            var children = this.props.children;

            return React.createElement(
                Fragment$$1,
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$61,
                        lineNumber: 19
                    }
                },
                children
            );
        }
    }]);

    return Focus;
}(React.PureComponent);

var _jsxFileName$62 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Focus/TrapFocus.js';
var TrapFocus = function (_React$PureComponent) {
    _inherits(TrapFocus, _React$PureComponent);

    function TrapFocus() {
        _classCallCheck(this, TrapFocus);

        return _possibleConstructorReturn(this, (TrapFocus.__proto__ || Object.getPrototypeOf(TrapFocus)).apply(this, arguments));
    }

    _createClass(TrapFocus, [{
        key: 'render',
        value: function render() {
            var children = this.props.children;

            return React.createElement(
                Focus$1,
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$62,
                        lineNumber: 11
                    }
                },
                React.createElement(
                    'div',
                    { ref: this.setFocusTrapWrapper, __self: this,
                        __source: {
                            fileName: _jsxFileName$62,
                            lineNumber: 12
                        }
                    },
                    React.createElement(EventListener$1, { event: 'focusout', handler: this.handleBlur, __self: this,
                        __source: {
                            fileName: _jsxFileName$62,
                            lineNumber: 13
                        }
                    }),
                    children
                )
            );
        }
    }, {
        key: 'setFocusTrapWrapper',
        value: function setFocusTrapWrapper(node) {
            this.focusTrapWrapper = node;
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            var relatedTarget = event.relatedTarget;
            var focusTrapWrapper = this.focusTrapWrapper;
            var _props$trapping = this.props.trapping,
                trapping = _props$trapping === undefined ? true : _props$trapping;

            if (relatedTarget == null || !trapping) {
                return;
            }
            if (focusTrapWrapper && !focusTrapWrapper.contains(relatedTarget) && !dom.closest(relatedTarget, '[data-polaris-overlay]')) {
                event.preventDefault();
                if (event.srcElement === focus.findFirstFocusableNode(focusTrapWrapper)) {
                    return focus.focusLastFocusableNode(focusTrapWrapper);
                }
                focus.focusFirstFocusableNode(focusTrapWrapper);
            }
        }
    }]);

    return TrapFocus;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], TrapFocus.prototype, "setFocusTrapWrapper", null);
tslib_1.__decorate([decorators.autobind], TrapFocus.prototype, "handleBlur", null);

var _jsxFileName$64 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Form/Form.js';
var Form$1 = function (_React$PureComponent) {
    _inherits(Form, _React$PureComponent);

    function Form() {
        _classCallCheck(this, Form);

        return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
    }

    _createClass(Form, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                acceptCharset = _props.acceptCharset,
                action = _props.action,
                autoComplete = _props.autoComplete,
                children = _props.children,
                encType = _props.encType,
                _props$implicitSubmit = _props.implicitSubmit,
                implicitSubmit = _props$implicitSubmit === undefined ? true : _props$implicitSubmit,
                method = _props.method,
                name = _props.name,
                noValidate = _props.noValidate,
                target$$1 = _props.target;

            var autoCompleteInputs = normalizeAutoComplete(autoComplete);
            var submitMarkup = implicitSubmit ? React.createElement(
                VisuallyHidden$1,
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$64,
                        lineNumber: 9
                    }
                },
                React.createElement('button', { type: 'submit', 'aria-hidden': 'true', __self: this,
                    __source: {
                        fileName: _jsxFileName$64,
                        lineNumber: 10
                    }
                })
            ) : null;
            return React.createElement(
                'form',
                { acceptCharset: acceptCharset, action: action, autoComplete: autoCompleteInputs, encType: encType, method: method, name: name, noValidate: noValidate, target: target$$1, onSubmit: this.handleSubmit, __self: this,
                    __source: {
                        fileName: _jsxFileName$64,
                        lineNumber: 12
                    }
                },
                children,
                submitMarkup
            );
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            var _props2 = this.props,
                _props2$preventDefaul = _props2.preventDefault,
                preventDefault = _props2$preventDefaul === undefined ? true : _props2$preventDefaul,
                onSubmit = _props2.onSubmit;

            if (!preventDefault) {
                return;
            }
            event.preventDefault();
            onSubmit(event);
        }
    }]);

    return Form;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], Form$1.prototype, "handleSubmit", null);
function normalizeAutoComplete(autoComplete) {
    if (autoComplete == null) {
        return autoComplete;
    }
    return autoComplete ? 'on' : 'off';
}

var styles$41 = {
  "FormLayout": "Polaris-FormLayout",
  "condensed": "Polaris-FormLayout--condensed",
  "Item": "Polaris-FormLayout__Item",
  "Title": "Polaris-FormLayout__Title",
  "Items": "Polaris-FormLayout__Items",
  "HelpText": "Polaris-FormLayout__HelpText",
};

var _jsxFileName$67 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/FormLayout/components/Item/Item.js';
function Item$11(props) {
    return React.createElement(
        'div',
        { className: styles$41.Item, __self: this,
            __source: {
                fileName: _jsxFileName$67,
                lineNumber: 4
            }
        },
        props.children
    );
}

var _jsxFileName$66 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/FormLayout/components/Group/Group.js';
var getUniqueID$4 = other.createUniqueIDFactory('FormLayoutGroup');
function Group$1(_ref) {
    var children = _ref.children,
        condensed = _ref.condensed,
        title = _ref.title,
        helpText = _ref.helpText;

    var className = styles.classNames(condensed && styles$41.condensed);
    var id = getUniqueID$4();
    var helpTextElement = null;
    var helpTextID = void 0;
    var titleElement = null;
    var titleID = void 0;
    if (helpText) {
        helpTextID = id + 'HelpText';
        helpTextElement = React.createElement(
            'div',
            { id: helpTextID, className: styles$41.HelpText, __self: this,
                __source: {
                    fileName: _jsxFileName$66,
                    lineNumber: 17
                }
            },
            helpText
        );
    }
    if (title) {
        titleID = id + 'Title';
        titleElement = React.createElement(
            'div',
            { id: titleID, className: styles$41.Title, __self: this,
                __source: {
                    fileName: _jsxFileName$66,
                    lineNumber: 23
                }
            },
            title
        );
    }
    var itemsMarkup = React.Children.map(children, function (child) {
        return reactUtilities.wrapWithComponent(child, Item$11);
    });
    return React.createElement(
        'div',
        { role: 'group', className: className, 'aria-labelledby': titleID, 'aria-describedby': helpTextID, __self: this,
            __source: {
                fileName: _jsxFileName$66,
                lineNumber: 28
            }
        },
        titleElement,
        React.createElement(
            'div',
            { className: styles$41.Items, __self: this,
                __source: {
                    fileName: _jsxFileName$66,
                    lineNumber: 30
                }
            },
            itemsMarkup
        ),
        helpTextElement
    );
}

var _jsxFileName$65 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/FormLayout/FormLayout.js';
var FormLayout$1 = function (_React$PureComponent) {
    _inherits(FormLayout, _React$PureComponent);

    function FormLayout() {
        _classCallCheck(this, FormLayout);

        return _possibleConstructorReturn(this, (FormLayout.__proto__ || Object.getPrototypeOf(FormLayout)).apply(this, arguments));
    }

    _createClass(FormLayout, [{
        key: 'render',
        value: function render() {
            var children = this.props.children;

            return React.createElement(
                'div',
                { className: styles$41.FormLayout, __self: this,
                    __source: {
                        fileName: _jsxFileName$65,
                        lineNumber: 8
                    }
                },
                React.Children.map(children, wrapChildren)
            );
        }
    }]);

    return FormLayout;
}(React.PureComponent);

FormLayout$1.Group = Group$1;
function wrapChildren(child, index) {
    if (reactUtilities.isElementOfType(child, Group$1)) {
        return child;
    }
    var props = { key: index };
    return reactUtilities.wrapWithComponent(child, Item$11, props);
}

var KeypressListener$1 = function (_React$Component) {
    _inherits(KeypressListener, _React$Component);

    function KeypressListener() {
        _classCallCheck(this, KeypressListener);

        return _possibleConstructorReturn(this, (KeypressListener.__proto__ || Object.getPrototypeOf(KeypressListener)).apply(this, arguments));
    }

    _createClass(KeypressListener, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            events.addEventListener(document, 'keyup', this.handleKeyEvent);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            events.removeEventListener(document, 'keyup', this.handleKeyEvent);
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }, {
        key: 'handleKeyEvent',
        value: function handleKeyEvent(event) {
            var _props = this.props,
                keyCode = _props.keyCode,
                handler = _props.handler;

            if (event.keyCode === keyCode) {
                handler(event);
            }
        }
    }]);

    return KeypressListener;
}(React.Component);

tslib_1.__decorate([decorators.autobind], KeypressListener$1.prototype, "handleKeyEvent", null);

var styles$43 = {
  "TextContainer": "Polaris-TextContainer",
  "spacingTight": "Polaris-TextContainer--spacingTight",
  "spacingLoose": "Polaris-TextContainer--spacingLoose",
};

var _jsxFileName$71 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/TextContainer/TextContainer.js';
function TextContainer$1(_ref) {
    var spacing = _ref.spacing,
        children = _ref.children;

    var className = styles.classNames(styles$43.TextContainer, spacing && styles$43[styles.variationName('spacing', spacing)]);
    return React.createElement(
        'div',
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$71,
                lineNumber: 6
            }
        },
        children
    );
}

var styles$44 = {
  "Layout": "Polaris-Layout",
  "Section": "Polaris-Layout__Section",
  "Section-secondary": "Polaris-Layout__Section--secondary",
  "Section-fullWidth": "Polaris-Layout__Section--fullWidth",
  "AnnotatedSection": "Polaris-Layout__AnnotatedSection",
  "AnnotationWrapper": "Polaris-Layout__AnnotationWrapper",
  "AnnotationContent": "Polaris-Layout__AnnotationContent",
  "Annotation": "Polaris-Layout__Annotation",
  "AnnotationDescription": "Polaris-Layout__AnnotationDescription",
};

var _jsxFileName$70 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Layout/components/AnnotatedSection/AnnotatedSection.js';
function AnnotatedSection$1(props) {
  var children = props.children,
      title = props.title,
      description = props.description;

  var descriptionMarkup = typeof description === 'string' ? React.createElement(
    'p',
    {
      __self: this,
      __source: {
        fileName: _jsxFileName$70,
        lineNumber: 7
      }
    },
    description
  ) : description;
  return React.createElement(
    'div',
    { className: styles$44.AnnotatedSection, __self: this,
      __source: {
        fileName: _jsxFileName$70,
        lineNumber: 8
      }
    },
    React.createElement(
      'div',
      { className: styles$44.AnnotationWrapper, __self: this,
        __source: {
          fileName: _jsxFileName$70,
          lineNumber: 9
        }
      },
      React.createElement(
        'div',
        { className: styles$44.Annotation, __self: this,
          __source: {
            fileName: _jsxFileName$70,
            lineNumber: 10
          }
        },
        React.createElement(
          TextContainer$1,
          {
            __self: this,
            __source: {
              fileName: _jsxFileName$70,
              lineNumber: 11
            }
          },
          React.createElement(
            Heading$1,
            { testID: 'AnnotationTitle', __self: this,
              __source: {
                fileName: _jsxFileName$70,
                lineNumber: 12
              }
            },
            title
          ),
          descriptionMarkup && React.createElement(
            'div',
            { className: styles$44.AnnotationDescription, testID: 'AnnotationDescription', __self: this,
              __source: {
                fileName: _jsxFileName$70,
                lineNumber: 13
              }
            },
            descriptionMarkup
          )
        )
      ),
      React.createElement(
        'div',
        { className: styles$44.AnnotationContent, __self: this,
          __source: {
            fileName: _jsxFileName$70,
            lineNumber: 19
          }
        },
        children
      )
    )
  );
}

var _jsxFileName$72 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Layout/components/Section/Section.js';
function Section$5(_ref) {
    var children = _ref.children,
        secondary = _ref.secondary,
        fullWidth = _ref.fullWidth;

    var className = styles.classNames(styles$44.Section, secondary && styles$44['Section-secondary'], fullWidth && styles$44['Section-fullWidth']);
    return React.createElement(
        'div',
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$72,
                lineNumber: 6
            }
        },
        children
    );
}

var _jsxFileName$69 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Layout/Layout.js';
var Layout$1 = function (_React$Component) {
    _inherits(Layout, _React$Component);

    function Layout() {
        _classCallCheck(this, Layout);

        return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).apply(this, arguments));
    }

    _createClass(Layout, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                sectioned = _props.sectioned;

            var content = sectioned ? React.createElement(
                Section$5,
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$69,
                        lineNumber: 7
                    }
                },
                children
            ) : children;
            return React.createElement(
                'div',
                { className: styles$44.Layout, __self: this,
                    __source: {
                        fileName: _jsxFileName$69,
                        lineNumber: 8
                    }
                },
                content
            );
        }
    }]);

    return Layout;
}(React.Component);

Layout$1.AnnotatedSection = AnnotatedSection$1;
Layout$1.Section = Section$5;

var styles$45 = {
  "Link": "Polaris-Link",
};

var _jsxFileName$73 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Link/Link.js';
function Link$3(_ref) {
  var url = _ref.url,
      children = _ref.children,
      onClick = _ref.onClick,
      external = _ref.external,
      id = _ref.id;

  return url ? React.createElement(
    UnstyledLink$2,
    { onClick: onClick, className: styles$45.Link, url: url, external: external, id: id, __self: this,
      __source: {
        fileName: _jsxFileName$73,
        lineNumber: 5
      }
    },
    children
  ) : React.createElement(
    'button',
    { onClick: onClick, className: styles$45.Link, id: id, __self: this,
      __source: {
        fileName: _jsxFileName$73,
        lineNumber: 7
      }
    },
    children
  );
}

var styles$46 = {
  "List": "Polaris-List",
  "typeNumber": "Polaris-List--typeNumber",
  "Item": "Polaris-List__Item",
};

var _jsxFileName$75 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/List/components/Item/Item.js';
function Item$13(_ref) {
    var children = _ref.children;

    return React.createElement(
        'li',
        { className: styles$46.Item, __self: this,
            __source: {
                fileName: _jsxFileName$75,
                lineNumber: 4
            }
        },
        children
    );
}

var _jsxFileName$74 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/List/List.js';
var ContentList = function (_React$PureComponent) {
    _inherits(ContentList, _React$PureComponent);

    function ContentList() {
        _classCallCheck(this, ContentList);

        return _possibleConstructorReturn(this, (ContentList.__proto__ || Object.getPrototypeOf(ContentList)).apply(this, arguments));
    }

    _createClass(ContentList, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                _props$type = _props.type,
                type = _props$type === undefined ? 'bullet' : _props$type;

            var className = styles.classNames(styles$46.List, type && styles$46[styles.variationName('type', type)]);
            var ListElement = type === 'bullet' ? 'ul' : 'ol';
            return React.createElement(
                ListElement,
                { className: className, __self: this,
                    __source: {
                        fileName: _jsxFileName$74,
                        lineNumber: 10
                    }
                },
                children
            );
        }
    }]);

    return ContentList;
}(React.PureComponent);

ContentList.Item = Item$13;

function memoizedBind(callback) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return function bound() {
        return callback.apply(undefined, args);
    };
}
var memoizedBind$1 = memoize$1(memoizedBind);

var styles$47 = {
  "Container": "Polaris-Modal-Dialog__Container",
  "Modal": "Polaris-Modal-Dialog__Modal",
  "limitHeight": "Polaris-Modal-Dialog--limitHeight",
  "sizeLarge": "Polaris-Modal-Dialog--sizeLarge",
  "animateFadeUp": "Polaris-Modal-Dialog--animateFadeUp",
  "entering": "Polaris-Modal-Dialog--entering",
  "exiting": "Polaris-Modal-Dialog--exiting",
  "exited": "Polaris-Modal-Dialog--exited",
  "entered": "Polaris-Modal-Dialog--entered",
};

var _jsxFileName$77 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Modal/components/Dialog/Dialog.js';
function DialogContainer(props) {
  return React.createElement(
    'div',
    { className: styles$47.Container, 'data-polaris-layer': true, 'data-polaris-overlay': true, __self: this,
      __source: {
        fileName: _jsxFileName$77,
        lineNumber: 11
      }
    },
    props.children
  );
}
function Dialog$1(_a) {
  var instant = _a.instant,
      labelledBy = _a.labelledBy,
      children = _a.children,
      onClose = _a.onClose,
      onExited = _a.onExited,
      onEntered = _a.onEntered,
      large = _a.large,
      limitHeight = _a.limitHeight,
      props = tslib_1.__rest(_a, ["instant", "labelledBy", "children", "onClose", "onExited", "onEntered", "large", "limitHeight"]);

  var classes = styles.classNames(styles$47.Modal, large && styles$47.sizeLarge, limitHeight && styles$47.limitHeight);
  var handleClose = memoizedBind$1(onClose);
  var TransitionChild = instant ? reactTransitionGroup.Transition : FadeUp;
  return React.createElement(
    TransitionChild,
    Object.assign({}, props, { mountOnEnter: true, unmountOnExit: true, timeout: Duration.Base, onEntered: onEntered, onExited: onExited, __self: this,
      __source: {
        fileName: _jsxFileName$77,
        lineNumber: 20
      }
    }),
    React.createElement(
      DialogContainer,
      {
        __self: this,
        __source: {
          fileName: _jsxFileName$77,
          lineNumber: 21
        }
      },
      React.createElement(
        TrapFocus,
        {
          __self: this,
          __source: {
            fileName: _jsxFileName$77,
            lineNumber: 22
          }
        },
        React.createElement(
          'div',
          { className: classes, role: 'dialog', 'aria-labelledby': labelledBy, tabIndex: -1, __self: this,
            __source: {
              fileName: _jsxFileName$77,
              lineNumber: 23
            }
          },
          React.createElement(KeypressListener$1, { keyCode: Keys.ESCAPE, handler: handleClose, testID: 'CloseKeypressListener', __self: this,
            __source: {
              fileName: _jsxFileName$77,
              lineNumber: 24
            }
          }),
          children
        )
      )
    )
  );
}
var fadeUpClasses = {
  enter: styles.classNames(styles$47.animateFadeUp, styles$47.entering),
  enterActive: styles.classNames(styles$47.animateFadeUp, styles$47.entered),
  exit: styles.classNames(styles$47.animateFadeUp, styles$47.exiting),
  exitActive: styles.classNames(styles$47.animateFadeUp, styles$47.exited)
};
function FadeUp(_a) {
  var children = _a.children,
      props = tslib_1.__rest(_a, ["children"]);
  return React.createElement(
    reactTransitionGroup.CSSTransition,
    Object.assign({}, props, { classNames: fadeUpClasses, __self: this,
      __source: {
        fileName: _jsxFileName$77,
        lineNumber: 39
      }
    }),
    children
  );
}

var styles$48 = {
  "Footer": "Polaris-Modal-Footer",
  "FooterContent": "Polaris-Modal-Footer__FooterContent",
};

var _jsxFileName$78 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Modal/components/Footer/Footer.js';
function Footer$1(_ref) {
  var primaryAction = _ref.primaryAction,
      secondaryActions = _ref.secondaryActions,
      children = _ref.children;

  var primaryActionButton = primaryAction && buttonsFrom(primaryAction, { primary: true }) || null;
  var secondaryActionButtons = secondaryActions && buttonsFrom(secondaryActions) || null;
  var actions = primaryActionButton || secondaryActionButtons ? React.createElement(
    ButtonGroup$1,
    {
      __self: this,
      __source: {
        fileName: _jsxFileName$78,
        lineNumber: 7
      }
    },
    secondaryActionButtons,
    primaryActionButton
  ) : null;
  return React.createElement(
    'div',
    { className: styles$48.Footer, __self: this,
      __source: {
        fileName: _jsxFileName$78,
        lineNumber: 11
      }
    },
    React.createElement(
      'div',
      { className: styles$48.FooterContent, __self: this,
        __source: {
          fileName: _jsxFileName$78,
          lineNumber: 12
        }
      },
      React.createElement(
        Stack$1,
        { alignment: 'center', __self: this,
          __source: {
            fileName: _jsxFileName$78,
            lineNumber: 13
          }
        },
        React.createElement(
          Stack$1.Item,
          { fill: true, __self: this,
            __source: {
              fileName: _jsxFileName$78,
              lineNumber: 14
            }
          },
          children
        ),
        actions
      )
    )
  );
}

var styles$49 = {
  "CloseButton": "Polaris-Modal-CloseButton",
  "withoutTitle": "Polaris-Modal-CloseButton--withoutTitle",
};

var _jsxFileName$80 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Modal/components/CloseButton/CloseButton.js';
function CloseButton$1(_ref) {
    var _ref$title = _ref.title,
        title = _ref$title === undefined ? true : _ref$title,
        onClick = _ref.onClick;

    var className = reactUtilities.classNames(styles$49.CloseButton, !title && styles$49.withoutTitle);
    return React.createElement(
        'button',
        { onClick: onClick, className: className, __self: this,
            __source: {
                fileName: _jsxFileName$80,
                lineNumber: 7
            }
        },
        React.createElement(Icon$2, { source: 'cancel', color: 'inkLighter', __self: this,
            __source: {
                fileName: _jsxFileName$80,
                lineNumber: 8
            }
        })
    );
}

var styles$50 = {
  "Header": "Polaris-Modal-Header",
  "Title": "Polaris-Modal-Header__Title",
};

var _jsxFileName$79 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Modal/components/Header/Header.js';
function Header$3(_ref) {
  var id = _ref.id,
      children = _ref.children,
      onClose = _ref.onClose;

  var handleClose = memoizedBind$1(onClose);
  return React.createElement(
    'div',
    { className: styles$50.Header, __self: this,
      __source: {
        fileName: _jsxFileName$79,
        lineNumber: 8
      }
    },
    React.createElement(
      'div',
      { id: id, className: styles$50.Title, __self: this,
        __source: {
          fileName: _jsxFileName$79,
          lineNumber: 9
        }
      },
      React.createElement(
        DisplayText$1,
        { element: 'h2', size: 'small', __self: this,
          __source: {
            fileName: _jsxFileName$79,
            lineNumber: 10
          }
        },
        children
      )
    ),
    React.createElement(CloseButton$1, { onClick: handleClose, __self: this,
      __source: {
        fileName: _jsxFileName$79,
        lineNumber: 15
      }
    })
  );
}

var styles$51 = {
  "Section": "Polaris-Modal-Section",
  "subdued": "Polaris-Modal-Section--subdued",
  "flush": "Polaris-Modal-Section--flush",
};

var _jsxFileName$81 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Modal/components/Section/Section.js';
function Section$7(_ref) {
    var children = _ref.children,
        _ref$flush = _ref.flush,
        flush = _ref$flush === undefined ? false : _ref$flush,
        _ref$subdued = _ref.subdued,
        subdued = _ref$subdued === undefined ? false : _ref$subdued;

    var className = styles.classNames(styles$51.Section, flush && styles$51.flush, subdued && styles$51.subdued);
    return React.createElement(
        'section',
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$81,
                lineNumber: 6
            }
        },
        children
    );
}

var styles$52 = {
  "BodyWrapper": "Polaris-Modal__BodyWrapper",
  "Body": "Polaris-Modal__Body",
  "IFrame": "Polaris-Modal__IFrame",
  "Backdrop": "Polaris-Modal__Backdrop",
  "fade-in": "Polaris-Modal__fade--in",
  "Spinner": "Polaris-Modal__Spinner",
};

var _jsxFileName$76 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Modal/Modal.js';
var IFRAME_LOADING_HEIGHT = 200;
var getUniqueID$5 = other.createUniqueIDFactory('modal-header');
var Modal$3 = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal() {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));

        _this.state = {
            iframeHeight: IFRAME_LOADING_HEIGHT
        };
        _this.headerId = getUniqueID$5();
        return _this;
    }

    _createClass(Modal, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                withinContentContainer: true
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.context.easdk == null) {
                return;
            }
            var open = this.props.open;

            if (open) {
                this.handleEASDKMessaging();
                this.focusReturnPointNode = document.activeElement;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(_ref) {
            var wasOpen = _ref.open;

            if (this.context.easdk == null) {
                return;
            }
            var open = this.props.open;

            if (wasOpen !== open) {
                this.handleEASDKMessaging();
            }
            if (!wasOpen && open) {
                this.focusReturnPointNode = document.activeElement;
            } else if (wasOpen && !open && this.focusReturnPointNode != null && document.contains(this.focusReturnPointNode)) {
                this.focusReturnPointNode.focus();
                this.focusReturnPointNode = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.context.easdk != null) {
                return null;
            }
            var _props = this.props,
                children = _props.children,
                onClose = _props.onClose,
                title = _props.title,
                src = _props.src,
                iFrameName = _props.iFrameName,
                open = _props.open,
                instant = _props.instant,
                sectioned = _props.sectioned,
                loading = _props.loading,
                large = _props.large,
                limitHeight = _props.limitHeight,
                footer = _props.footer,
                primaryAction = _props.primaryAction,
                secondaryActions = _props.secondaryActions,
                intl = _props.polaris.intl;
            var iframeHeight = this.state.iframeHeight;

            var iframeTitle = intl.translate('Polaris.Modal.iFrameTitle');
            var handleClose = memoizedBind$1(onClose);
            var dialog = void 0;
            var backdrop = void 0;
            if (open) {
                var footerMarkup = !footer && !primaryAction && !secondaryActions ? null : React.createElement(
                    Footer$1,
                    { primaryAction: primaryAction, secondaryActions: secondaryActions, __self: this,
                        __source: {
                            fileName: _jsxFileName$76,
                            lineNumber: 70
                        }
                    },
                    footer
                );
                var content = sectioned ? reactUtilities.wrapWithComponent(children, Section$7) : children;
                var body = loading ? React.createElement(
                    'div',
                    { className: styles$52.Spinner, __self: this,
                        __source: {
                            fileName: _jsxFileName$76,
                            lineNumber: 76
                        }
                    },
                    React.createElement(Spinner$2, {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$76,
                            lineNumber: 77
                        }
                    })
                ) : content;
                var bodyMarkup = src ? React.createElement('iframe', { name: iFrameName, title: iframeTitle, src: src, className: styles$52.IFrame, onLoad: this.handleIFrameLoad, style: { height: iframeHeight + 'px' }, __self: this,
                    __source: {
                        fileName: _jsxFileName$76,
                        lineNumber: 79
                    }
                }) : React.createElement(
                    Scrollable$2,
                    { shadow: true, className: styles$52.Body, __self: this,
                        __source: {
                            fileName: _jsxFileName$76,
                            lineNumber: 79
                        }
                    },
                    body
                );
                var headerMarkup = title ? React.createElement(
                    Header$3,
                    { id: this.headerId, onClose: handleClose, testID: 'ModalHeader', __self: this,
                        __source: {
                            fileName: _jsxFileName$76,
                            lineNumber: 82
                        }
                    },
                    title
                ) : React.createElement(CloseButton$1, { onClick: handleClose, title: false, testID: 'ModalCloseButton', __self: this,
                    __source: {
                        fileName: _jsxFileName$76,
                        lineNumber: 84
                    }
                });
                dialog = React.createElement(
                    Dialog$1,
                    { instant: instant, labelledBy: this.headerId, onClose: handleClose, onEntered: this.handleEntered, onExited: this.handleExited, large: large, limitHeight: limitHeight, __self: this,
                        __source: {
                            fileName: _jsxFileName$76,
                            lineNumber: 85
                        }
                    },
                    headerMarkup,
                    React.createElement(
                        'div',
                        { className: styles$52.BodyWrapper, __self: this,
                            __source: {
                                fileName: _jsxFileName$76,
                                lineNumber: 87
                            }
                        },
                        bodyMarkup
                    ),
                    footerMarkup
                );
                backdrop = React.createElement('div', { className: styles$52.Backdrop, onClick: handleClose, __self: this,
                    __source: {
                        fileName: _jsxFileName$76,
                        lineNumber: 90
                    }
                });
            }
            var animated = !instant;
            this.handleWarning('modal');
            return React.createElement(
                Portal$1,
                { idPrefix: 'modal', __self: this,
                    __source: {
                        fileName: _jsxFileName$76,
                        lineNumber: 94
                    }
                },
                React.createElement(
                    reactTransitionGroup.TransitionGroup,
                    { appear: animated, enter: animated, exit: animated, __self: this,
                        __source: {
                            fileName: _jsxFileName$76,
                            lineNumber: 95
                        }
                    },
                    dialog
                ),
                backdrop
            );
        }
    }, {
        key: 'handleEntered',
        value: function handleEntered() {
            var onTransitionEnd = this.props.onTransitionEnd;

            if (onTransitionEnd) {
                onTransitionEnd();
            }
        }
    }, {
        key: 'handleExited',
        value: function handleExited() {
            var _this2 = this;

            this.setState({
                iframeHeight: IFRAME_LOADING_HEIGHT
            });
            if (this.focusReturnPointNode) {
                fastdom.write(function () {
                    return focus.focusFirstFocusableNode(_this2.focusReturnPointNode, false);
                });
            }
        }
    }, {
        key: 'handleIFrameLoad',
        value: function handleIFrameLoad(evt) {
            var iframe = evt.target;
            if (iframe && iframe.contentWindow) {
                this.setState({
                    iframeHeight: iframe.contentWindow.document.body.scrollHeight
                });
            }
            var onIFrameLoad = this.props.onIFrameLoad;

            if (onIFrameLoad != null) {
                onIFrameLoad(evt);
            }
        }
    }, {
        key: 'handleEASDKMessaging',
        value: function handleEASDKMessaging() {
            var easdk = this.context.easdk;
            var open = this.props.open;

            if (easdk == null) {
                return;
            }
            if (open) {
                this.handleWarning('easdk');
                easdk.Modal.open(this.props);
            } else {
                easdk.Modal.close();
            }
        }
    }, {
        key: 'handleWarning',
        value: function handleWarning(type) {
            var _this3 = this;

            var intl = this.props.polaris.intl;

            var reqProps = {
                modal: {
                    open: 'open',
                    onClose: 'onClose'
                },
                easdk: {
                    open: 'open',
                    src: 'src',
                    onClose: 'onClose'
                }
            };
            var missingProps = Object.keys(reqProps[type]).reduce(function (acc, key) {
                if (!_this3.props.hasOwnProperty(key)) {
                    acc.push(key);
                }
                return acc;
            }, []);
            if (missingProps.length > 0) {
                // eslint-disable-next-line no-console
                console.warn(intl.translate('Polaris.Modal.modalWarning', {
                    missingProps: missingProps.join(', ')
                }));
            }
            var actionWarnings = handleActionWanrings(this.props.primaryAction, this.props.secondaryActions);
            if (type === 'easdk' && actionWarnings.length > 0) {
                // eslint-disable-next-line no-console
                console.warn(intl.translate('Polaris.Modal.actionWarning', {
                    actionWarnings: actionWarnings.join(', ')
                }));
            }
        }
    }]);

    return Modal;
}(React.Component);
Modal$3.contextTypes = { easdk: PropTypes.object };
Modal$3.childContextTypes = contentContextTypes;
Modal$3.Dialog = Dialog$1;
Modal$3.Section = Section$7;
tslib_1.__decorate([decorators.autobind], Modal$3.prototype, "handleEntered", null);
tslib_1.__decorate([decorators.autobind], Modal$3.prototype, "handleExited", null);
tslib_1.__decorate([decorators.autobind], Modal$3.prototype, "handleIFrameLoad", null);
function handleActionWanrings() {
    var primary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var secondary = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var actions = [primary].concat(_toConsumableArray(secondary));
    var actionKeysToIgnore = ['icon', 'loading'];
    return actions.reduce(function (acc, action) {
        return acc.concat.apply(acc, _toConsumableArray(actionKeysToIgnore.filter(function (val) {
            return action[val] && acc.indexOf(val) === -1 && val;
        })));
    }, []);
}
withAppProvider()(Modal$3);

var styles$53 = {
  "Checkbox": "Polaris-OptionList-Checkbox",
  "Input": "Polaris-OptionList-Checkbox__Input",
  "Backdrop": "Polaris-OptionList-Checkbox__Backdrop",
  "Icon": "Polaris-OptionList-Checkbox__Icon",
  "active": "Polaris-OptionList-Checkbox--active",
};

var _jsxFileName$84 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/OptionList/components/Checkbox/Checkbox.js';
var getUniqueID$6 = other.createUniqueIDFactory('Checkbox');
function Checkbox$4(_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === undefined ? getUniqueID$6() : _ref$id,
      _ref$checked = _ref.checked,
      checked = _ref$checked === undefined ? false : _ref$checked,
      disabled = _ref.disabled,
      active = _ref.active,
      onChange = _ref.onChange,
      name = _ref.name,
      value = _ref.value,
      role = _ref.role;

  var className = styles.classNames(styles$53.Checkbox, active && styles$53.active);
  return React.createElement(
    'div',
    { className: className, __self: this,
      __source: {
        fileName: _jsxFileName$84,
        lineNumber: 9
      }
    },
    React.createElement('input', { id: id, name: name, value: value, type: 'checkbox', checked: checked, disabled: disabled, className: styles$53.Input, 'aria-checked': checked, onChange: onChange, role: role, __self: this,
      __source: {
        fileName: _jsxFileName$84,
        lineNumber: 10
      }
    }),
    React.createElement('div', { className: styles$53.Backdrop, __self: this,
      __source: {
        fileName: _jsxFileName$84,
        lineNumber: 11
      }
    }),
    React.createElement(
      'div',
      { className: styles$53.Icon, __self: this,
        __source: {
          fileName: _jsxFileName$84,
          lineNumber: 12
        }
      },
      React.createElement(Icon$2, { source: 'checkmark', __self: this,
        __source: {
          fileName: _jsxFileName$84,
          lineNumber: 13
        }
      })
    )
  );
}

var styles$54 = {
  "Option": "Polaris-OptionList-Option",
  "SingleSelectOption": "Polaris-OptionList-Option__SingleSelectOption",
  "disabled": "Polaris-OptionList-Option--disabled",
  "Media": "Polaris-OptionList-Option__Media",
  "Label": "Polaris-OptionList-Option__Label",
  "Checkbox": "Polaris-OptionList-Option__Checkbox",
  "focused": "Polaris-OptionList-Option--focused",
  "select": "Polaris-OptionList-Option--select",
  "active": "Polaris-OptionList-Option--active",
};

var _jsxFileName$83 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/OptionList/components/Option/Option.js';
var Option$1 = function (_React$Component) {
    _inherits(Option, _React$Component);

    function Option() {
        _classCallCheck(this, Option);

        var _this = _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));

        _this.state = {
            focused: false,
            active: false
        };
        return _this;
    }

    _createClass(Option, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                label = _props.label,
                value = _props.value,
                id = _props.id,
                select = _props.select,
                active = _props.active,
                allowMultiple = _props.allowMultiple,
                disabled = _props.disabled,
                role = _props.role,
                media = _props.media;
            var focused = this.state.focused;

            var mediaMarkup = media ? React.createElement(
                'div',
                { className: styles$54.Media, __self: this,
                    __source: {
                        fileName: _jsxFileName$83,
                        lineNumber: 26
                    }
                },
                media
            ) : null;
            var singleSelectClassName = styles.classNames(styles$54.SingleSelectOption, focused && styles$54.focused, disabled && styles$54.disabled, select && styles$54.select, active && styles$54.active);
            var multiSelectClassName = styles.classNames(styles$54.Label, active && styles$54.active);
            var checkBoxRole = role === 'option' ? 'presentation' : undefined;
            var optionMarkup = allowMultiple ? React.createElement(
                'label',
                { htmlFor: id, className: multiSelectClassName, __self: this,
                    __source: {
                        fileName: _jsxFileName$83,
                        lineNumber: 30
                    }
                },
                React.createElement(
                    'div',
                    { className: styles$54.Checkbox, __self: this,
                        __source: {
                            fileName: _jsxFileName$83,
                            lineNumber: 31
                        }
                    },
                    React.createElement(Checkbox$4, { id: id, value: value, checked: select, active: active, disabled: disabled, onChange: this.handleClick, role: checkBoxRole, __self: this,
                        __source: {
                            fileName: _jsxFileName$83,
                            lineNumber: 32
                        }
                    })
                ),
                mediaMarkup,
                label
            ) : React.createElement(
                'button',
                { type: 'button', className: singleSelectClassName, onClick: this.handleClick, disabled: disabled, onFocus: this.toggleFocus, onBlur: this.toggleFocus, __self: this,
                    __source: {
                        fileName: _jsxFileName$83,
                        lineNumber: 36
                    }
                },
                mediaMarkup,
                label
            );
            var scrollMarkup = active ? React.createElement(Scrollable$2.ScrollTo, {
                __self: this,
                __source: {
                    fileName: _jsxFileName$83,
                    lineNumber: 40
                }
            }) : null;
            return React.createElement(
                'li',
                { key: id, className: styles$54.Option, tabIndex: -1, 'aria-selected': active, role: role, __self: this,
                    __source: {
                        fileName: _jsxFileName$83,
                        lineNumber: 41
                    }
                },
                scrollMarkup,
                optionMarkup
            );
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            var _props2 = this.props,
                onClick = _props2.onClick,
                section = _props2.section,
                index = _props2.index,
                disabled = _props2.disabled;

            if (disabled) {
                return;
            }
            onClick(section, index);
        }
    }, {
        key: 'toggleFocus',
        value: function toggleFocus() {
            this.setState(function (prevState) {
                return { focused: !prevState.focused };
            });
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            if (nextProps.active !== undefined && nextProps.active !== prevState.active) {
                return nextProps.active ? { active: true } : { active: false };
            }
            return null;
        }
    }]);

    return Option;
}(React.Component);

tslib_1.__decorate([decorators.autobind], Option$1.prototype, "handleClick", null);
tslib_1.__decorate([decorators.autobind], Option$1.prototype, "toggleFocus", null);

function arraysAreEqual(firstArray, secondArray, comparator) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    return firstArray.every(function (firstItem, index) {
        var secondItem = secondArray[index];
        if (comparator != null) {
            return comparator(firstItem, secondItem);
        }
        return firstItem === secondItem;
    });
}

var styles$55 = {
  "OptionList": "Polaris-OptionList",
  "Options": "Polaris-OptionList__Options",
  "Title": "Polaris-OptionList__Title",
};

var _jsxFileName$82 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/OptionList/OptionList.js';
var getUniqueId = other.createUniqueIDFactory('OptionList');
var OptionList$1 = function (_React$Component) {
    _inherits(OptionList, _React$Component);

    function OptionList() {
        _classCallCheck(this, OptionList);

        var _this = _possibleConstructorReturn(this, (OptionList.__proto__ || Object.getPrototypeOf(OptionList)).apply(this, arguments));

        _this.state = {
            normalizedOptions: createNormalizedOptions(_this.props.options, _this.props.sections, _this.props.title)
        };
        _this.id = _this.props.id || getUniqueId();
        return _this;
    }
    // eslint-disable-next-line react/no-deprecated


    _createClass(OptionList, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var _ref$options = _ref.options,
                nextOptions = _ref$options === undefined ? [] : _ref$options,
                _ref$sections = _ref.sections,
                nextSections = _ref$sections === undefined ? [] : _ref$sections,
                nextID = _ref.id,
                nextTitle = _ref.title;
            var _props = this.props,
                _props$options = _props.options,
                options = _props$options === undefined ? [] : _props$options,
                _props$sections = _props.sections,
                sections = _props$sections === undefined ? [] : _props$sections,
                id = _props.id,
                title = _props.title;

            if (id !== nextID) {
                this.id = nextID || this.id;
            }
            var optionsChanged = !arraysAreEqual(nextOptions, options);
            var sectionsChanged = !arraysAreEqual(nextSections, sections, testSectionsPropEquality);
            var titleChanged = title !== nextTitle;
            if (optionsChanged || sectionsChanged || titleChanged) {
                this.setState({
                    normalizedOptions: createNormalizedOptions(nextOptions, nextSections, nextTitle)
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var normalizedOptions = this.state.normalizedOptions;
            var _props2 = this.props,
                selected = _props2.selected,
                allowMultiple = _props2.allowMultiple,
                role = _props2.role,
                optionRole = _props2.optionRole;

            var optionsExist = normalizedOptions.length > 0;
            var optionsMarkup = optionsExist ? normalizedOptions.map(function (_ref2, sectionIndex) {
                var title = _ref2.title,
                    options = _ref2.options;

                var titleMarkup = title ? React.createElement(
                    'p',
                    { className: styles$55.Title, role: 'presentation', __self: _this2,
                        __source: {
                            fileName: _jsxFileName$82,
                            lineNumber: 39
                        }
                    },
                    title
                ) : null;
                var optionsMarkup = options && options.map(function (option, optionIndex) {
                    var isSelected = selected.includes(option.value);
                    var id = option.id || _this2.id + '-' + sectionIndex + '-' + optionIndex;
                    return React.createElement(Option$1, Object.assign({}, option, { key: id, id: id, section: sectionIndex, index: optionIndex, onClick: _this2.handleClick, select: isSelected, allowMultiple: allowMultiple, role: optionRole, __self: _this2,
                        __source: {
                            fileName: _jsxFileName$82,
                            lineNumber: 46
                        }
                    }));
                });
                return React.createElement(
                    'li',
                    { key: title || 'noTitle-' + sectionIndex, __self: _this2,
                        __source: {
                            fileName: _jsxFileName$82,
                            lineNumber: 48
                        }
                    },
                    titleMarkup,
                    React.createElement(
                        'ul',
                        { className: styles$55.Options, id: _this2.id, role: role, 'aria-multiselectable': allowMultiple, __self: _this2,
                            __source: {
                                fileName: _jsxFileName$82,
                                lineNumber: 50
                            }
                        },
                        optionsMarkup
                    )
                );
            }) : null;
            return React.createElement(
                'ul',
                { className: styles$55.OptionList, __self: this,
                    __source: {
                        fileName: _jsxFileName$82,
                        lineNumber: 56
                    }
                },
                optionsMarkup
            );
        }
    }, {
        key: 'handleClick',
        value: function handleClick(sectionIndex, optionIndex) {
            var _props3 = this.props,
                selected = _props3.selected,
                onChange = _props3.onChange,
                allowMultiple = _props3.allowMultiple;

            var selectedValue = this.state.normalizedOptions[sectionIndex].options[optionIndex].value;
            var foundIndex = selected.indexOf(selectedValue);
            if (allowMultiple) {
                var newSelection = foundIndex === -1 ? [selectedValue].concat(_toConsumableArray(selected)) : [].concat(_toConsumableArray(selected.slice(0, foundIndex)), _toConsumableArray(selected.slice(foundIndex + 1, selected.length)));
                onChange(newSelection);
                return;
            }
            onChange([selectedValue]);
        }
    }]);

    return OptionList;
}(React.Component);
tslib_1.__decorate([decorators.autobind], OptionList$1.prototype, "handleClick", null);
function createNormalizedOptions(options, sections, title) {
    if (options == null) {
        var section = { options: [], title: title };
        return sections == null ? [] : [section].concat(_toConsumableArray(sections));
    }
    if (sections == null) {
        return [{
            title: title,
            options: options
        }];
    }
    return [{
        title: title,
        options: options
    }].concat(_toConsumableArray(sections));
}
function testSectionsPropEquality(previousSection, currentSection) {
    var previousOptions = previousSection.options;
    var currentOptions = currentSection.options;

    var optionsAreEqual = arraysAreEqual(previousOptions, currentOptions);
    var titlesAreEqual = previousSection.title === currentSection.title;
    return optionsAreEqual && titlesAreEqual;
}
withAppProvider()(OptionList$1);

function hasNewStatus(actions) {
    for (var i = 0; i < actions.length; i++) {
        var badge = actions[i].badge;

        if (badge && badge.status === 'new') {
            return true;
        }
    }
    return false;
}

var styles$56 = {
  "Action": "Polaris-Header-Action",
  "ActionIcon": "Polaris-Header-Action__ActionIcon",
  "disabled": "Polaris-Header-Action--disabled",
  "ActionContent": "Polaris-Header-Action__ActionContent",
  "Action-outline": "Polaris-Header-Action__Action--outline",
};

var _jsxFileName$88 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Page/components/Header/components/Action/Action.js';
function Action(_ref) {
  var icon = _ref.icon,
      url = _ref.url,
      external = _ref.external,
      onAction = _ref.onAction,
      children = _ref.children,
      disclosure = _ref.disclosure,
      accessibilityLabel = _ref.accessibilityLabel,
      disabled = _ref.disabled,
      showIndicator = _ref.showIndicator,
      hasIndicator = _ref.hasIndicator;

  var iconMarkup = icon ? React.createElement(
    'span',
    { className: styles$56.ActionIcon, __self: this,
      __source: {
        fileName: _jsxFileName$88,
        lineNumber: 8
      }
    },
    React.createElement(Icon$2, { source: icon, __self: this,
      __source: {
        fileName: _jsxFileName$88,
        lineNumber: 9
      }
    })
  ) : null;
  var disclosureIconMarkup = disclosure ? React.createElement(
    'span',
    { className: styles$56.ActionIcon, __self: this,
      __source: {
        fileName: _jsxFileName$88,
        lineNumber: 11
      }
    },
    React.createElement(Icon$2, { source: 'caretDown', __self: this,
      __source: {
        fileName: _jsxFileName$88,
        lineNumber: 12
      }
    })
  ) : null;
  var contentMarkup = iconMarkup || disclosureIconMarkup ? React.createElement(
    'span',
    { className: styles$56.ActionContent, __self: this,
      __source: {
        fileName: _jsxFileName$88,
        lineNumber: 14
      }
    },
    iconMarkup,
    React.createElement(
      'span',
      {
        __self: this,
        __source: {
          fileName: _jsxFileName$88,
          lineNumber: 16
        }
      },
      children
    ),
    disclosureIconMarkup
  ) : children;
  if (url) {
    return React.createElement(
      UnstyledLink$2,
      { key: children, external: external, url: url, onMouseUp: handleMouseUpByBlurring, className: styles$56.Action, 'aria-label': accessibilityLabel, __self: this,
        __source: {
          fileName: _jsxFileName$88,
          lineNumber: 20
        }
      },
      contentMarkup
    );
  }
  var indicatorMarkup = false && showIndicator && !hasIndicator && React.createElement(Indicator$1, {
    __self: this,
    __source: {
      fileName: _jsxFileName$88,
      lineNumber: 26
    }
  });
  var className = reactUtilities.classNames(styles$56.Action, disabled && styles$56.disabled, icon && children == null && styles$56.iconOnly, false && showIndicator && styles$56['Action-outline']);
  return React.createElement(
    'button',
    { key: children, className: className, onClick: onAction, onMouseUp: handleMouseUpByBlurring, 'aria-label': accessibilityLabel, type: 'button', disabled: disabled, __self: this,
      __source: {
        fileName: _jsxFileName$88,
        lineNumber: 28
      }
    },
    indicatorMarkup,
    contentMarkup
  );
}

var styles$57 = {
  "Details": "Polaris-Header-ActionGroup__Details",
  "withActions": "Polaris-Header-ActionGroup--withActions",
};

var _jsxFileName$87 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Page/components/Header/components/ActionGroup/ActionGroup.js';
var ActionGroup = function (_React$Component) {
    _inherits(ActionGroup, _React$Component);

    function ActionGroup() {
        _classCallCheck(this, ActionGroup);

        return _possibleConstructorReturn(this, (ActionGroup.__proto__ || Object.getPrototypeOf(ActionGroup)).apply(this, arguments));
    }

    _createClass(ActionGroup, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                actions = _props.actions,
                details = _props.details,
                title = _props.title,
                icon = _props.icon,
                active = _props.active;

            var detailsMarkup = details ? React.createElement(
                'div',
                { className: styles$57.Details, __self: this,
                    __source: {
                        fileName: _jsxFileName$87,
                        lineNumber: 11
                    }
                },
                details
            ) : null;
            var showIndicator = hasNewStatus(actions);
            return React.createElement(
                'div',
                { className: styles$57.ActionGroup, key: 'ActionGroup-' + title, __self: this,
                    __source: {
                        fileName: _jsxFileName$87,
                        lineNumber: 13
                    }
                },
                React.createElement(
                    Popover$1,
                    { key: title, active: active, onClose: this.handleClose, activator: React.createElement(
                            Action,
                            { showIndicator: showIndicator, hasIndicator: active, disclosure: true, icon: icon
                                // eslint-disable-next-line react/jsx-no-bind
                                , onAction: this.handleOpen, __self: this,
                                __source: {
                                    fileName: _jsxFileName$87,
                                    lineNumber: 14
                                }
                            },
                            title
                        ), __self: this,
                        __source: {
                            fileName: _jsxFileName$87,
                            lineNumber: 14
                        }
                    },
                    React.createElement(ActionList$1, { items: actions
                        // eslint-disable-next-line react/jsx-no-bind
                        , onActionAnyItem: this.handleClose, __self: this,
                        __source: {
                            fileName: _jsxFileName$87,
                            lineNumber: 19
                        }
                    }),
                    detailsMarkup
                )
            );
        }
    }, {
        key: 'handleClose',
        value: function handleClose() {
            var _props2 = this.props,
                title = _props2.title,
                onClose = _props2.onClose;

            onClose(title);
        }
    }, {
        key: 'handleOpen',
        value: function handleOpen() {
            var _props3 = this.props,
                title = _props3.title,
                onOpen = _props3.onOpen;

            onOpen(title);
        }
    }]);

    return ActionGroup;
}(React.Component);

tslib_1.__decorate([decorators.autobind], ActionGroup.prototype, "handleClose", null);
tslib_1.__decorate([decorators.autobind], ActionGroup.prototype, "handleOpen", null);

var styles$58 = {
  "Header": "Polaris-Page-Header",
  "Header-hasPagination": "Polaris-Page-Header__Header--hasPagination",
  "Header-hasBreadcrumbs": "Polaris-Page-Header__Header--hasBreadcrumbs",
  "Header-hasSecondaryActions": "Polaris-Page-Header__Header--hasSecondaryActions",
  "Header-hasSeparator": "Polaris-Page-Header__Header--hasSeparator",
  "Content": "Polaris-Page-Header__Content",
  "Header-hasRollup": "Polaris-Page-Header__Header--hasRollup",
  "IndividualActions": "Polaris-Page-Header__IndividualActions",
  "Rollup": "Polaris-Page-Header__Rollup",
  "Title-hidden": "Polaris-Page-Header__Title--hidden",
  "PrimaryAction": "Polaris-Page-Header__PrimaryAction",
  "MainContent": "Polaris-Page-Header__MainContent",
  "Pagination": "Polaris-Page-Header__Pagination",
  "Actions": "Polaris-Page-Header__Actions",
  "Navigation": "Polaris-Page-Header__Navigation",
  "TitleAndActions": "Polaris-Page-Header__TitleAndActions",
  "Title": "Polaris-Page-Header__Title",
  "SecondaryActions": "Polaris-Page-Header__SecondaryActions",
};

var _jsxFileName$86 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Page/components/Header/Header.js';
var Header$4 = function (_React$PureComponent) {
    _inherits(Header, _React$PureComponent);

    function Header() {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));

        _this.state = {
            rollupOpen: false
        };
        return _this;
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                titleMetadata = _props.titleMetadata,
                _props$breadcrumbs = _props.breadcrumbs,
                breadcrumbs = _props$breadcrumbs === undefined ? [] : _props$breadcrumbs,
                _props$titleHidden = _props.titleHidden,
                titleHidden = _props$titleHidden === undefined ? false : _props$titleHidden,
                primaryAction = _props.primaryAction,
                pagination = _props.pagination,
                separator = _props.separator,
                secondaryActions = _props.secondaryActions;

            var className = styles.classNames(styles$58.Header, titleHidden && styles$58['Title-hidden'], pagination && styles$58['Header-hasPagination'], separator && styles$58['Header-hasSeparator'], breadcrumbs && breadcrumbs.length && styles$58['Header-hasBreadcrumbs'], this.hasRollup && styles$58['Header-hasRollup'], secondaryActions && secondaryActions.length && styles$58['Header-hasSecondaryActions']);
            var breadcrumbMarkup = breadcrumbs.length > 0 ? React.createElement(Breadcrumbs$1, { breadcrumbs: breadcrumbs, __self: this,
                __source: {
                    fileName: _jsxFileName$86,
                    lineNumber: 21
                }
            }) : null;
            var primary = primaryAction && (primaryAction.primary === undefined ? true : primaryAction.primary);
            var primaryActionMarkup = primaryAction ? React.createElement(
                'div',
                { className: styles$58.PrimaryAction, __self: this,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 24
                    }
                },
                buttonsFrom(primaryAction, { primary: primary })
            ) : null;
            var paginationMarkup = pagination ? React.createElement(
                'div',
                { className: styles$58.Pagination, __self: this,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 27
                    }
                },
                React.createElement(Pagination$2, Object.assign({}, pagination, { plain: true, __self: this,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 28
                    }
                }))
            ) : null;
            var nonPrimaryActionsMarkup = this.renderSecondaryActions();
            var actionsMarkup = React.createElement(
                'div',
                { className: styles$58.Actions, __self: this,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 31
                    }
                },
                primaryActionMarkup,
                nonPrimaryActionsMarkup
            );
            var navigationMarkup = breadcrumbMarkup || paginationMarkup ? React.createElement(
                'div',
                { className: styles$58.Navigation, __self: this,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 35
                    }
                },
                breadcrumbMarkup,
                paginationMarkup
            ) : null;
            var titleMarkup = React.createElement(
                'div',
                { className: styles$58.Title, __self: this,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 39
                    }
                },
                React.createElement(
                    'div',
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$86,
                            lineNumber: 41
                        }
                    },
                    React.createElement(
                        DisplayText$1,
                        { size: 'large', element: 'h1', __self: this,
                            __source: {
                                fileName: _jsxFileName$86,
                                lineNumber: 42
                            }
                        },
                        title
                    )
                ),
                React.createElement(
                    'div',
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$86,
                            lineNumber: 46
                        }
                    },
                    titleMetadata
                )
            );
            return primaryActionMarkup ? React.createElement(
                'div',
                { className: className, __self: this,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 48
                    }
                },
                navigationMarkup,
                React.createElement(
                    'div',
                    { className: styles$58.MainContent, __self: this,
                        __source: {
                            fileName: _jsxFileName$86,
                            lineNumber: 50
                        }
                    },
                    React.createElement(
                        'div',
                        { className: styles$58.TitleAndActions, __self: this,
                            __source: {
                                fileName: _jsxFileName$86,
                                lineNumber: 51
                            }
                        },
                        titleMarkup,
                        actionsMarkup
                    ),
                    primaryActionMarkup
                )
            ) : React.createElement(
                'div',
                { className: className, __self: this,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 57
                    }
                },
                navigationMarkup,
                titleMarkup,
                actionsMarkup
            );
        }
    }, {
        key: 'renderSecondaryActions',
        value: function renderSecondaryActions() {
            var _this2 = this;

            var _state = this.state,
                openActionGroup = _state.openActionGroup,
                rollupOpen = _state.rollupOpen;
            var _props2 = this.props,
                _props2$secondaryActi = _props2.secondaryActions,
                secondaryActions = _props2$secondaryActi === undefined ? [] : _props2$secondaryActi,
                _props2$actionGroups = _props2.actionGroups,
                actionGroups = _props2$actionGroups === undefined ? [] : _props2$actionGroups;

            if (secondaryActions.length === 0 && actionGroups.length === 0) {
                return null;
            }
            var secondaryActionMarkup = secondaryActions.length > 0 ? secondaryActionsFrom(secondaryActions) : null;
            var actionGroupsMarkup = actionGroups.length > 0 ? actionGroups.map(function (_ref) {
                var title = _ref.title,
                    icon = _ref.icon,
                    actions = _ref.actions,
                    details = _ref.details;
                return React.createElement(ActionGroup, { key: title, title: title, icon: icon, actions: actions, details: details, onOpen: _this2.handleActionGroupOpen, onClose: _this2.handleActionGroupClose, active: title === openActionGroup, __self: _this2,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 77
                    }
                });
            }) : null;
            var showIndicator = false && actionGroups.filter(function (group) {
                return hasNewStatus(group.actions);
            }).length > 0;
            var rollupMarkup = this.hasRollup ? React.createElement(
                'div',
                { className: styles$58.Rollup, __self: this,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 81
                    }
                },
                React.createElement(
                    Popover$1,
                    { active: rollupOpen, onClose: this.handleRollupToggle, activator: React.createElement(
                            Button$2,
                            { outline: false && showIndicator, disclosure: true, onClick: this.handleRollupToggle, __self: this,
                                __source: {
                                    fileName: _jsxFileName$86,
                                    lineNumber: 82
                                }
                            },
                            'Actions'
                        ), __self: this,
                        __source: {
                            fileName: _jsxFileName$86,
                            lineNumber: 82
                        }
                    },
                    React.createElement(ActionList$1, { items: secondaryActions, sections: actionGroups.map(convertActionGroupToActionListSection), onActionAnyItem: this.handleRollupToggle, __self: this,
                        __source: {
                            fileName: _jsxFileName$86,
                            lineNumber: 85
                        }
                    })
                )
            ) : null;
            return React.createElement(
                'div',
                { className: styles$58.SecondaryActions, __self: this,
                    __source: {
                        fileName: _jsxFileName$86,
                        lineNumber: 88
                    }
                },
                rollupMarkup,
                React.createElement(
                    'div',
                    { className: styles$58.IndividualActions, __self: this,
                        __source: {
                            fileName: _jsxFileName$86,
                            lineNumber: 90
                        }
                    },
                    secondaryActionMarkup,
                    actionGroupsMarkup
                )
            );
        }
    }, {
        key: 'handleRollupToggle',
        value: function handleRollupToggle() {
            this.setState(function (_ref2) {
                var rollupOpen = _ref2.rollupOpen;
                return { rollupOpen: !rollupOpen };
            });
        }
    }, {
        key: 'handleActionGroupClose',
        value: function handleActionGroupClose(group) {
            this.setState(function (_ref3) {
                var openActionGroup = _ref3.openActionGroup;
                return openActionGroup === group ? { openActionGroup: undefined } : {};
            });
        }
    }, {
        key: 'handleActionGroupOpen',
        value: function handleActionGroupOpen(group) {
            this.setState({ openActionGroup: group });
        }
    }, {
        key: 'hasRollup',
        get: function get$$1() {
            var _props3 = this.props,
                _props3$secondaryActi = _props3.secondaryActions,
                secondaryActions = _props3$secondaryActi === undefined ? [] : _props3$secondaryActi,
                _props3$actionGroups = _props3.actionGroups,
                actionGroups = _props3$actionGroups === undefined ? [] : _props3$actionGroups;

            return secondaryActions.length + actionGroups.length > 1;
        }
    }]);

    return Header;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], Header$4.prototype, "handleRollupToggle", null);
tslib_1.__decorate([decorators.autobind], Header$4.prototype, "handleActionGroupClose", null);
tslib_1.__decorate([decorators.autobind], Header$4.prototype, "handleActionGroupOpen", null);
function convertActionGroupToActionListSection(_ref4) {
    var title = _ref4.title,
        actions = _ref4.actions;

    return { title: title, items: actions };
}
function secondaryActionsFrom(actions) {
    var _this3 = this;

    return actions.map(function (_a, index) {
        var content = _a.content,
            action = tslib_1.__rest(_a, ["content"]);
        return React.createElement(
            Action,
            Object.assign({}, action, { key: 'Action-' + (content || index), __self: _this3,
                __source: {
                    fileName: _jsxFileName$86,
                    lineNumber: 121
                }
            }),
            content
        );
    });
}

var styles$59 = {
  "Page": "Polaris-Page",
  "fullWidth": "Polaris-Page--fullWidth",
  "singleColumn": "Polaris-Page--singleColumn",
  "Content": "Polaris-Page__Content",
};

var _jsxFileName$85 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Page/Page.js';
var EASDK_PROPS = ['title', 'icon', 'breadcrumbs', 'secondaryActions', 'actionGroups', 'primaryAction', 'pagination'];
var Page = function (_React$PureComponent) {
    _inherits(Page, _React$PureComponent);

    function Page() {
        _classCallCheck(this, Page);

        return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
    }

    _createClass(Page, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.polaris.easdk == null) {
                return;
            }
            this.handleEASDKMessaging();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.polaris.easdk == null) {
                return;
            }
            var prevEASDKProps = pick(prevProps, EASDK_PROPS);
            var currentEASDKProps = pick(this.props, EASDK_PROPS);
            if (!isEqual(prevEASDKProps, currentEASDKProps)) {
                this.handleEASDKMessaging();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _a = this.props,
                children = _a.children,
                fullWidth = _a.fullWidth,
                singleColumn = _a.singleColumn,
                rest = tslib_1.__rest(_a, ["children", "fullWidth", "singleColumn"]);
            var className = styles.classNames(styles$59.Page, fullWidth && styles$59.fullWidth, singleColumn && styles$59.singleColumn);
            var headerMarkup = this.props.polaris.easdk || !this.hasHeaderContent() ? null : React.createElement(Header$4, Object.assign({}, rest, {
                __self: this,
                __source: {
                    fileName: _jsxFileName$85,
                    lineNumber: 38
                }
            }));
            return React.createElement(
                'div',
                { className: className, __self: this,
                    __source: {
                        fileName: _jsxFileName$85,
                        lineNumber: 39
                    }
                },
                headerMarkup,
                React.createElement(
                    'div',
                    { className: styles$59.Content, __self: this,
                        __source: {
                            fileName: _jsxFileName$85,
                            lineNumber: 41
                        }
                    },
                    children
                )
            );
        }
    }, {
        key: 'handleEASDKMessaging',
        value: function handleEASDKMessaging() {
            var easdk = this.props.polaris.easdk;

            if (easdk) {
                easdk.Bar.update(this.props);
            }
        }
    }, {
        key: 'hasHeaderContent',
        value: function hasHeaderContent() {
            var _props = this.props,
                title = _props.title,
                primaryAction = _props.primaryAction,
                secondaryActions = _props.secondaryActions,
                breadcrumbs = _props.breadcrumbs;

            return title && title !== '' || primaryAction || secondaryActions && secondaryActions.length > 0 || breadcrumbs && breadcrumbs.length > 0;
        }
    }]);

    return Page;
}(React.PureComponent);
withAppProvider()(Page);

var EditableTarget;
(function (EditableTarget) {
    EditableTarget["Input"] = "INPUT";
    EditableTarget["Textarea"] = "TEXTAREA";
    EditableTarget["Select"] = "SELECT";
    EditableTarget["ContentEditable"] = "contenteditable";
})(EditableTarget || (EditableTarget = {}));
function isInputFocused() {
    if (document == null) {
        return false;
    }
    var tagName = document.activeElement.tagName;

    return tagName === EditableTarget.Input || tagName === EditableTarget.Textarea || tagName === EditableTarget.Select || document.activeElement.hasAttribute(EditableTarget.ContentEditable);
}

var styles$61 = {
  "Pagination": "Polaris-Pagination",
  "plain": "Polaris-Pagination--plain",
  "Button": "Polaris-Pagination__Button",
};

var _jsxFileName$90 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Pagination/Pagination.js';
function Pagination$1(_ref) {
    var _this = this;

    var hasNext = _ref.hasNext,
        hasPrevious = _ref.hasPrevious,
        nextURL = _ref.nextURL,
        previousURL = _ref.previousURL,
        onNext = _ref.onNext,
        onPrevious = _ref.onPrevious,
        nextTooltip = _ref.nextTooltip,
        previousTooltip = _ref.previousTooltip,
        nextKeys = _ref.nextKeys,
        previousKeys = _ref.previousKeys,
        plain = _ref.plain,
        accessibilityLabel = _ref.accessibilityLabel,
        intl = _ref.polaris.intl;

    var node = React.createRef();
    var label = void 0;
    if (accessibilityLabel) {
        label = accessibilityLabel;
    } else {
        label = intl.translate('Polaris.Pagination.pagination');
    }
    var className = reactUtilities.classNames(styles$61.Pagination, plain && styles$61.plain);
    var previousButton = previousURL ? React.createElement(
        UnstyledLink$2,
        { className: styles$61.Button, url: previousURL, onMouseUp: handleMouseUpByBlurring, 'aria-label': intl.translate('Polaris.Pagination.previous'), id: 'previousURL', __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 17
            }
        },
        React.createElement(Icon$2, { source: 'arrowLeft', __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 18
            }
        })
    ) : React.createElement(
        'button',
        { onClick: onPrevious, type: 'button', onMouseUp: handleMouseUpByBlurring, className: styles$61.Button, 'aria-label': intl.translate('Polaris.Pagination.previous'), disabled: !hasPrevious, __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 19
            }
        },
        React.createElement(Icon$2, { source: 'arrowLeft', __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 20
            }
        })
    );
    var nextButton = nextURL ? React.createElement(
        UnstyledLink$2,
        { className: styles$61.Button, url: nextURL, onMouseUp: handleMouseUpByBlurring, 'aria-label': intl.translate('Polaris.Pagination.next'), id: 'nextURL', __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 22
            }
        },
        React.createElement(Icon$2, { source: 'arrowRight', __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 23
            }
        })
    ) : React.createElement(
        'button',
        { onClick: onNext, type: 'button', onMouseUp: handleMouseUpByBlurring, className: styles$61.Button, 'aria-label': intl.translate('Polaris.Pagination.next'), disabled: !hasNext, __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 24
            }
        },
        React.createElement(Icon$2, { source: 'arrowRight', __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 25
            }
        })
    );
    var constructedPrevious = previousTooltip ? React.createElement(
        Tooltip$1,
        { content: previousTooltip, __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 27
            }
        },
        previousButton
    ) : previousButton;
    var constructedNext = nextTooltip ? React.createElement(
        Tooltip$1,
        { content: nextTooltip, __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 28
            }
        },
        nextButton
    ) : nextButton;
    var previousButtonEvents = previousKeys && (previousURL || onPrevious) && previousKeys.map(function (key) {
        return React.createElement(KeypressListener$1, { key: key, keyCode: key, handler: previousURL ? handleCallback(clickPaginationLink('previousURL', node)) : handleCallback(onPrevious), __self: _this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 31
            }
        });
    });
    var nextButtonEvents = nextKeys && (nextURL || onNext) && nextKeys.map(function (key) {
        return React.createElement(KeypressListener$1, { key: key, keyCode: key, handler: nextURL ? handleCallback(clickPaginationLink('nextURL', node)) : handleCallback(onNext), __self: _this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 36
            }
        });
    });
    return React.createElement(
        'nav',
        { className: className, 'aria-label': label, ref: node, __self: this,
            __source: {
                fileName: _jsxFileName$90,
                lineNumber: 39
            }
        },
        previousButtonEvents,
        constructedPrevious,
        nextButtonEvents,
        constructedNext
    );
}
function clickPaginationLink(id, node) {
    return function () {
        if (node.current == null) {
            return;
        }
        var link = node.current.querySelector('#' + id);
        if (link) {
            link.click();
        }
    };
}
function handleCallback(fn) {
    return function () {
        if (isInputFocused()) {
            return;
        }
        fn();
    };
}
var Pagination$2 = withAppProvider()(Pagination$1);

var getUniqueID$8 = other.createUniqueIDFactory('portal-');

var Portal$1 = function (_React$PureComponent) {
    _inherits(Portal, _React$PureComponent);

    function Portal() {
        _classCallCheck(this, Portal);

        var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(this, arguments));

        _this.portalId = _this.props.idPrefix !== '' ? _this.props.idPrefix + '-' + getUniqueID$8() : getUniqueID$8();
        return _this;
    }
    // eslint-disable-next-line react/no-deprecated


    _createClass(Portal, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (target.isServer) {
                return;
            }
            this.portalNode = document.createElement('div');
            this.portalNode.setAttribute('data-portal-id', this.portalId);
            document.body.appendChild(this.portalNode);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (target.isServer) {
                return;
            }
            document.body.removeChild(this.portalNode);
        }
    }, {
        key: 'render',
        value: function render() {
            if (target.isServer) {
                return null;
            }
            return ReactDOM.createPortal(this.props.children, this.portalNode);
        }
    }]);

    return Portal;
}(React.PureComponent);

Portal$1.defaultProps = { idPrefix: '' };

var contextTypes = {
    scrollToPosition: PropTypes.func
};

var _jsxFileName$94 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Scrollable/components/ScrollTo/ScrollTo.js';
var ScrollTo$1 = function (_React$Component) {
    _inherits(ScrollTo, _React$Component);

    function ScrollTo() {
        _classCallCheck(this, ScrollTo);

        var _this = _possibleConstructorReturn(this, (ScrollTo.__proto__ || Object.getPrototypeOf(ScrollTo)).apply(this, arguments));

        _this.ref = React.createRef();
        return _this;
    }

    _createClass(ScrollTo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var scrollToPosition = this.context.scrollToPosition;

            if (!scrollToPosition || !this.ref.current) {
                return;
            }
            scrollToPosition(this.ref.current.offsetTop);
        }
    }, {
        key: 'render',
        value: function render() {
            var getUniqueId = other.createUniqueIDFactory('ScrollTo');
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            return React.createElement('a', { id: getUniqueId(), ref: this.ref, __self: this,
                __source: {
                    fileName: _jsxFileName$94,
                    lineNumber: 19
                }
            });
        }
    }]);

    return ScrollTo;
}(React.Component);

ScrollTo$1.contextTypes = contextTypes;

var styles$62 = {
  "Scrollable": "Polaris-Scrollable",
  "horizontal": "Polaris-Scrollable--horizontal",
  "vertical": "Polaris-Scrollable--vertical",
  "hasTopShadow": "Polaris-Scrollable--hasTopShadow",
  "hasBottomShadow": "Polaris-Scrollable--hasBottomShadow",
};

var _jsxFileName$93 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Scrollable/Scrollable.js';
var MAX_SCROLL_DISTANCE = 100;
var DELTA_THRESHOLD = 0.2;
var DELTA_PERCENTAGE = 0.2;
var EVENTS_TO_LOCK = ['scroll', 'touchmove', 'wheel'];
var PREFERS_REDUCED_MOTION = prefersReducedMotion();

var Scrollable$1 = function (_React$Component) {
    _inherits(Scrollable, _React$Component);

    function Scrollable() {
        _classCallCheck(this, Scrollable);

        var _this = _possibleConstructorReturn(this, (Scrollable.__proto__ || Object.getPrototypeOf(Scrollable)).apply(this, arguments));

        _this.state = {
            topShadow: false,
            bottomShadow: false,
            scrollPosition: 0
        };
        return _this;
    }

    _createClass(Scrollable, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                scrollToPosition: this.scrollToPosition
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var polaris = this.props.polaris;

            if (this.scrollArea == null) {
                return;
            }
            polaris.stickyManager.setContainer(this.scrollArea);
            events.addEventListener(this.scrollArea, 'scroll', function () {
                window.requestAnimationFrame(_this2.handleScroll);
            });
            events.addEventListener(window, 'resize', this.handleResize);
            window.requestAnimationFrame(function () {
                _this2.handleScroll();
                if (_this2.props.hint) {
                    _this2.scrollHint();
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var polaris = this.props.polaris;

            if (this.scrollArea == null) {
                return;
            }
            events.removeEventListener(this.scrollArea, 'scroll', this.handleScroll);
            events.removeEventListener(window, 'resize', this.handleResize);
            polaris.stickyManager.removeScrollListener();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var scrollPosition = this.state.scrollPosition;

            if (scrollPosition && this.scrollArea && scrollPosition > 0) {
                this.scrollArea.scrollTop = scrollPosition;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                topShadow = _state.topShadow,
                bottomShadow = _state.bottomShadow;
            var _a = this.props,
                children = _a.children,
                className = _a.className,
                horizontal = _a.horizontal,
                _a$vertical = _a.vertical,
                vertical = _a$vertical === undefined ? true : _a$vertical,
                shadow = _a.shadow,
                hint = _a.hint,
                rest = tslib_1.__rest(_a, ["children", "className", "horizontal", "vertical", "shadow", "hint"]);
            var finalClassName = styles.classNames(className, styles$62.Scrollable, vertical && styles$62.vertical, horizontal && styles$62.horizontal, topShadow && styles$62.hasTopShadow, bottomShadow && styles$62.hasBottomShadow);
            return React.createElement(
                'div',
                Object.assign({ className: finalClassName }, scrollable.props, rest, { ref: this.setScrollArea, __self: this,
                    __source: {
                        fileName: _jsxFileName$93,
                        lineNumber: 70
                    }
                }),
                children
            );
        }
    }, {
        key: 'setScrollArea',
        value: function setScrollArea(scrollArea) {
            this.scrollArea = scrollArea;
        }
    }, {
        key: 'handleScroll',
        value: function handleScroll() {
            var scrollArea = this.scrollArea;
            var shadow = this.props.shadow;

            if (scrollArea == null) {
                return;
            }
            var scrollTop = scrollArea.scrollTop,
                clientHeight = scrollArea.clientHeight,
                scrollHeight = scrollArea.scrollHeight;

            var shouldBottomShadow = Boolean(shadow && !(scrollTop + clientHeight >= scrollHeight));
            var shouldTopShadow = Boolean(shadow && scrollTop > 0);
            this.setState({
                topShadow: shouldTopShadow,
                bottomShadow: shouldBottomShadow,
                scrollPosition: scrollTop
            });
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            this.handleScroll();
        }
    }, {
        key: 'scrollHint',
        value: function scrollHint() {
            var _this3 = this;

            var scrollArea = this.scrollArea;

            if (scrollArea == null) {
                return;
            }
            var clientHeight = scrollArea.clientHeight,
                scrollHeight = scrollArea.scrollHeight;

            if (PREFERS_REDUCED_MOTION || this.state.scrollPosition > 0 || scrollHeight <= clientHeight) {
                return;
            }
            var scrollDistance = scrollHeight - clientHeight;
            this.toggleLock();
            this.setState({
                scrollPosition: scrollDistance > MAX_SCROLL_DISTANCE ? MAX_SCROLL_DISTANCE : scrollDistance
            }, function () {
                window.requestAnimationFrame(_this3.scrollStep);
            });
        }
    }, {
        key: 'scrollStep',
        value: function scrollStep() {
            var _this4 = this;

            this.setState(function (_ref) {
                var scrollPosition = _ref.scrollPosition;

                var delta = scrollPosition * DELTA_PERCENTAGE;
                return {
                    scrollPosition: delta < DELTA_THRESHOLD ? 0 : scrollPosition - delta
                };
            }, function () {
                if (_this4.state.scrollPosition > 0) {
                    window.requestAnimationFrame(_this4.scrollStep);
                } else {
                    _this4.toggleLock(false);
                }
            });
        }
    }, {
        key: 'toggleLock',
        value: function toggleLock() {
            var shouldLock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var scrollArea = this.scrollArea;

            if (scrollArea == null) {
                return;
            }
            EVENTS_TO_LOCK.forEach(function (eventName) {
                if (shouldLock) {
                    events.addEventListener(scrollArea, eventName, prevent);
                } else {
                    events.removeEventListener(scrollArea, eventName, prevent);
                }
            });
        }
    }, {
        key: 'scrollToPosition',
        value: function scrollToPosition(scrollY) {
            this.setState({ scrollPosition: scrollY });
        }
    }], [{
        key: 'forNode',
        value: function forNode(node) {
            return dom.closest(node, scrollable.selector) || document;
        }
    }]);

    return Scrollable;
}(React.Component);

Scrollable$1.childContextTypes = contextTypes;
Scrollable$1.ScrollTo = ScrollTo$1;
tslib_1.__decorate([decorators.autobind], Scrollable$1.prototype, "setScrollArea", null);
tslib_1.__decorate([decorators.autobind], Scrollable$1.prototype, "handleScroll", null);
tslib_1.__decorate([decorators.autobind, decorators.debounce(50, { trailing: true })], Scrollable$1.prototype, "handleResize", null);
tslib_1.__decorate([decorators.autobind], Scrollable$1.prototype, "scrollHint", null);
tslib_1.__decorate([decorators.autobind], Scrollable$1.prototype, "scrollStep", null);
tslib_1.__decorate([decorators.autobind], Scrollable$1.prototype, "scrollToPosition", null);
function prevent(evt) {
    evt.preventDefault();
}
function prefersReducedMotion() {
    try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (err) {
        return false;
    }
}
var Scrollable$2 = withSticky()(Scrollable$1);

var styles$63 = {
  "Popover": "Polaris-Popover",
  "fullWidth": "Polaris-Popover--fullWidth",
  "Content": "Polaris-Popover__Content",
  "measuring": "Polaris-Popover--measuring",
  "exiting": "Polaris-Popover--exiting",
  "positionedAbove": "Polaris-Popover--positionedAbove",
  "Wrapper": "Polaris-Popover__Wrapper",
  "Content-fullHeight": "Polaris-Popover__Content--fullHeight",
  "Pane": "Polaris-Popover__Pane",
  "Pane-fixed": "Polaris-Popover__Pane--fixed",
  "Section": "Polaris-Popover__Section",
  "FocusTracker": "Polaris-Popover__FocusTracker",
};

var _jsxFileName$95 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Popover/components/Section/Section.js';
function Section$9(_ref) {
    var children = _ref.children;

    return React.createElement(
        'div',
        { className: styles$63.Section, __self: this,
            __source: {
                fileName: _jsxFileName$95,
                lineNumber: 4
            }
        },
        children
    );
}

var _jsxFileName$92 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Popover/components/Pane/Pane.js';
function Pane$1(_ref) {
    var fixed = _ref.fixed,
        sectioned = _ref.sectioned,
        children = _ref.children;

    var className = styles.classNames(styles$63.Pane, fixed && styles$63['Pane-fixed']);
    var content = sectioned ? reactUtilities.wrapWithComponent(children, Section$9) : children;
    return fixed ? React.createElement(
        'div',
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$92,
                lineNumber: 10
            }
        },
        content
    ) : React.createElement(
        Scrollable$2,
        { hint: true, shadow: true, className: className, __self: this,
            __source: {
                fileName: _jsxFileName$92,
                lineNumber: 10
            }
        },
        content
    );
}

function calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed) {
    var activatorTop = activatorRect.top;
    var activatorBottom = activatorTop + activatorRect.height;
    var spaceAbove = activatorRect.top;
    var spaceBelow = containerRect.height - activatorRect.top - activatorRect.height;
    var desiredHeight = overlayRect.height;
    var verticalMargins = overlayMargins.activator + overlayMargins.container;
    var minimumSpaceToScroll = overlayMargins.container;
    var distanceToTopScroll = activatorRect.top - Math.max(scrollableContainerRect.top, 0);
    var distanceToBottomScroll = containerRect.top + Math.min(containerRect.height, scrollableContainerRect.top + scrollableContainerRect.height) - (activatorRect.top + activatorRect.height);
    var enoughSpaceFromTopScroll = distanceToTopScroll >= minimumSpaceToScroll;
    var enoughSpaceFromBottomScroll = distanceToBottomScroll >= minimumSpaceToScroll;
    var heightIfBelow = Math.min(spaceBelow, desiredHeight);
    var heightIfAbove = Math.min(spaceAbove, desiredHeight);
    var containerRectTop = fixed ? 0 : containerRect.top;
    var positionIfAbove = {
        height: heightIfAbove - verticalMargins,
        top: activatorTop + containerRectTop - heightIfAbove,
        positioning: 'above'
    };
    var positionIfBelow = {
        height: heightIfBelow - verticalMargins,
        top: activatorBottom + containerRectTop,
        positioning: 'below'
    };
    if (preferredPosition === 'above') {
        return (enoughSpaceFromTopScroll || distanceToTopScroll >= distanceToBottomScroll && !enoughSpaceFromBottomScroll) && (spaceAbove > desiredHeight || spaceAbove > spaceBelow) ? positionIfAbove : positionIfBelow;
    }
    if (preferredPosition === 'below') {
        return (enoughSpaceFromBottomScroll || distanceToBottomScroll >= distanceToTopScroll && !enoughSpaceFromTopScroll) && (spaceBelow > desiredHeight || spaceBelow > spaceAbove) ? positionIfBelow : positionIfAbove;
    }
    if (enoughSpaceFromTopScroll && enoughSpaceFromBottomScroll) {
        return spaceAbove > spaceBelow ? positionIfAbove : positionIfBelow;
    }
    return distanceToTopScroll > minimumSpaceToScroll ? positionIfAbove : positionIfBelow;
}
function calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment) {
    var maximum = containerRect.width - overlayRect.width;
    if (preferredAlignment === 'left') {
        return Math.min(maximum, Math.max(0, activatorRect.left - overlayMargins.horizontal));
    } else if (preferredAlignment === 'right') {
        var activatorRight = activatorRect.left + activatorRect.width;
        return Math.min(maximum, Math.max(0, activatorRight - overlayRect.width + overlayMargins.horizontal));
    }
    return Math.min(maximum, Math.max(0, activatorRect.center.x - overlayRect.width / 2));
}
function rectIsOutsideOfRect(inner, outer) {
    var center = inner.center;

    return center.y < outer.top || center.y > outer.top + outer.height;
}

var styles$64 = {
  "PositionedOverlay": "Polaris-PositionedOverlay",
  "fixed": "Polaris-PositionedOverlay--fixed",
  "calculating": "Polaris-PositionedOverlay--calculating",
};

var _jsxFileName$97 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/PositionedOverlay/PositionedOverlay.js';
var PositionedOverlay$1 = function (_React$PureComponent) {
    _inherits(PositionedOverlay, _React$PureComponent);

    function PositionedOverlay() {
        _classCallCheck(this, PositionedOverlay);

        var _this = _possibleConstructorReturn(this, (PositionedOverlay.__proto__ || Object.getPrototypeOf(PositionedOverlay)).apply(this, arguments));

        _this.state = {
            measuring: true,
            activatorRect: geometry.getRectForNode(_this.props.activator),
            left: 0,
            top: 0,
            height: 0,
            width: null,
            positioning: 'below',
            zIndex: null,
            outsideScrollableContainer: false,
            lockPosition: false
        };
        _this.overlay = null;
        _this.scrollableContainer = null;
        return _this;
    }

    _createClass(PositionedOverlay, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.scrollableContainer = Scrollable$2.forNode(this.props.activator);
            if (this.scrollableContainer && !this.props.fixed) {
                this.scrollableContainer.addEventListener('scroll', this.handleMeasurement);
            }
            this.handleMeasurement();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.scrollableContainer && !this.props.fixed) {
                this.scrollableContainer.removeEventListener('scroll', this.handleMeasurement);
            }
        }
        // eslint-disable-next-line react/no-deprecated

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.handleMeasurement();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _state = this.state,
                outsideScrollableContainer = _state.outsideScrollableContainer,
                top = _state.top;
            var _props = this.props,
                onScrollOut = _props.onScrollOut,
                active = _props.active;

            if (active && onScrollOut != null && top !== 0 && outsideScrollableContainer) {
                onScrollOut();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state2 = this.state,
                left = _state2.left,
                top = _state2.top,
                zIndex = _state2.zIndex,
                width = _state2.width;
            var _props2 = this.props,
                render = _props2.render,
                fixed = _props2.fixed;

            var style = {
                top: top == null ? undefined : top,
                left: left == null ? undefined : left,
                width: width == null ? undefined : width,
                zIndex: zIndex == null ? undefined : zIndex
            };
            var className = styles.classNames(styles$64.PositionedOverlay, fixed && styles$64.fixed);
            return React.createElement(
                'div',
                { className: className, style: style, ref: this.setOverlay, __self: this,
                    __source: {
                        fileName: _jsxFileName$97,
                        lineNumber: 66
                    }
                },
                React.createElement(EventListener$1, { event: 'resize', handler: this.handleMeasurement, __self: this,
                    __source: {
                        fileName: _jsxFileName$97,
                        lineNumber: 67
                    }
                }),
                render(this.overlayDetails())
            );
        }
    }, {
        key: 'overlayDetails',
        value: function overlayDetails() {
            var _state3 = this.state,
                measuring = _state3.measuring,
                left = _state3.left,
                positioning = _state3.positioning,
                height = _state3.height,
                activatorRect = _state3.activatorRect;

            return {
                measuring: measuring,
                left: left,
                desiredHeight: height,
                positioning: positioning,
                activatorRect: activatorRect
            };
        }
    }, {
        key: 'setOverlay',
        value: function setOverlay(node) {
            this.overlay = node;
        }
    }, {
        key: 'handleMeasurement',
        value: function handleMeasurement() {
            var _this2 = this;

            var _state4 = this.state,
                lockPosition = _state4.lockPosition,
                top = _state4.top;

            this.setState({
                left: 0,
                top: lockPosition ? top : 0,
                height: 0,
                positioning: 'below',
                measuring: true
            }, function () {
                if (_this2.overlay == null || _this2.scrollableContainer == null) {
                    return;
                }
                var _props3 = _this2.props,
                    activator = _props3.activator,
                    _props3$preferredPosi = _props3.preferredPosition,
                    preferredPosition = _props3$preferredPosi === undefined ? 'below' : _props3$preferredPosi,
                    _props3$preferredAlig = _props3.preferredAlignment,
                    preferredAlignment = _props3$preferredAlig === undefined ? 'center' : _props3$preferredAlig,
                    onScrollOut = _props3.onScrollOut,
                    fullWidth = _props3.fullWidth,
                    fixed = _props3.fixed;

                var activatorRect = geometry.getRectForNode(activator);
                var currentOverlayRect = geometry.getRectForNode(_this2.overlay);
                var scrollableElement = isDocument$1(_this2.scrollableContainer) ? document.body : _this2.scrollableContainer;
                var scrollableContainerRect = geometry.getRectForNode(scrollableElement);
                var overlayRect = fullWidth ? Object.assign({}, currentOverlayRect, { width: activatorRect.width }) : currentOverlayRect;
                // If `body` is 100% height, it still acts as though it were not constrained
                // to that size. This adjusts for that.
                if (scrollableElement === document.body) {
                    scrollableContainerRect.height = document.body.scrollHeight;
                }
                var overlayMargins = _this2.overlay.firstElementChild ? getMarginsForNode(_this2.overlay.firstElementChild) : { activator: 0, container: 0, horizontal: 0 };
                var containerRect = windowRect();
                var zIndexForLayer = getZIndexForLayerFromNode(activator);
                var zIndex = zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1;
                var verticalPosition = calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed);
                var horizontalPosition = calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment);
                _this2.setState({
                    measuring: false,
                    activatorRect: geometry.getRectForNode(activator),
                    left: horizontalPosition,
                    top: lockPosition ? top : verticalPosition.top,
                    lockPosition: Boolean(fixed),
                    height: verticalPosition.height || 0,
                    width: fullWidth ? overlayRect.width : null,
                    positioning: verticalPosition.positioning,
                    outsideScrollableContainer: onScrollOut != null && rectIsOutsideOfRect(activatorRect, intersectionWithViewport(scrollableContainerRect)),
                    zIndex: zIndex
                });
            });
        }
    }]);

    return PositionedOverlay;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], PositionedOverlay$1.prototype, "overlayDetails", null);
tslib_1.__decorate([decorators.autobind], PositionedOverlay$1.prototype, "setOverlay", null);
tslib_1.__decorate([decorators.autobind], PositionedOverlay$1.prototype, "handleMeasurement", null);
function intersectionWithViewport(rect) {
    var viewport = windowRect();
    return new geometry.Rect({
        top: Math.max(rect.top, 0),
        left: Math.max(rect.left, 0),
        height: Math.min(rect.height - rect.top + viewport.top, viewport.height, viewport.height - rect.top),
        width: Math.min(rect.width - rect.left + viewport.left, viewport.width, viewport.width - rect.left)
    });
}
function getMarginsForNode(node) {
    var nodeStyles = window.getComputedStyle(node);
    return {
        activator: parseFloat(nodeStyles.marginTop || ''),
        container: parseFloat(nodeStyles.marginBottom || ''),
        horizontal: parseFloat(nodeStyles.marginLeft || '')
    };
}
function getZIndexForLayerFromNode(node) {
    var layerNode = dom.closest(node, layer.selector) || document.body;
    var zIndex = layerNode === document.body ? 'auto' : parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);
    return zIndex === 'auto' || isNaN(zIndex) ? null : zIndex;
}
function windowRect() {
    return new geometry.Rect({
        top: window.scrollY,
        left: window.scrollX,
        height: window.innerHeight,
        width: window.innerWidth
    });
}
function isDocument$1(node) {
    return node === document;
}

var _jsxFileName$96 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Popover/components/PopoverOverlay/PopoverOverlay.js';
var CloseSource;
(function (CloseSource) {
    CloseSource[CloseSource["Click"] = 0] = "Click";
    CloseSource[CloseSource["EscapeKeypress"] = 1] = "EscapeKeypress";
    CloseSource[CloseSource["FocusOut"] = 2] = "FocusOut";
    CloseSource[CloseSource["ScrollOut"] = 3] = "ScrollOut";
})(CloseSource || (CloseSource = {}));

var PopoverOverlay$1 = function (_React$PureComponent) {
    _inherits(PopoverOverlay, _React$PureComponent);

    function PopoverOverlay() {
        _classCallCheck(this, PopoverOverlay);

        var _this = _possibleConstructorReturn(this, (PopoverOverlay.__proto__ || Object.getPrototypeOf(PopoverOverlay)).apply(this, arguments));

        _this.contentNode = React.createRef();
        _this.transitionStatus = null;
        return _this;
    }

    _createClass(PopoverOverlay, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.active) {
                this.focusContent();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(oldProps) {
            if (this.props.active && !oldProps.active) {
                this.focusContent();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var active = this.props.active;

            return React.createElement(
                reactTransitionGroup.Transition,
                { 'in': active, timeout: Duration.Fast, mountOnEnter: true, unmountOnExit: true, __self: this,
                    __source: {
                        fileName: _jsxFileName$96,
                        lineNumber: 40
                    }
                },
                this.renderOverlay
            );
        }
    }, {
        key: 'focusContent',
        value: function focusContent() {
            var _this2 = this;

            if (this.props.preventAutofocus) {
                return;
            }
            if (this.contentNode == null) {
                return;
            }
            fastdom.write(function () {
                if (_this2.contentNode.current == null) {
                    return;
                }
                _this2.contentNode.current.focus();
            });
        }
    }, {
        key: 'renderOverlay',
        value: function renderOverlay(transitionStatus) {
            var _props = this.props,
                active = _props.active,
                activator = _props.activator,
                fullWidth = _props.fullWidth,
                _props$preferredPosit = _props.preferredPosition,
                preferredPosition = _props$preferredPosit === undefined ? 'below' : _props$preferredPosit,
                _props$preferredAlign = _props.preferredAlignment,
                preferredAlignment = _props$preferredAlign === undefined ? 'center' : _props$preferredAlign,
                fixed = _props.fixed;

            return React.createElement(PositionedOverlay$1, { testID: 'positionedOverlay', fullWidth: fullWidth, active: active, activator: activator, preferredPosition: preferredPosition, preferredAlignment: preferredAlignment
                // eslint-disable-next-line react/jsx-no-bind
                , render: this.renderPopover.bind(this, transitionStatus), fixed: fixed, onScrollOut: this.handleScrollOut, __self: this,
                __source: {
                    fileName: _jsxFileName$96,
                    lineNumber: 60
                }
            });
        }
    }, {
        key: 'renderPopover',
        value: function renderPopover(transitionStatus, overlayDetails) {
            var measuring = overlayDetails.measuring,
                desiredHeight = overlayDetails.desiredHeight,
                positioning = overlayDetails.positioning;
            var _props2 = this.props,
                id = _props2.id,
                children = _props2.children,
                sectioned = _props2.sectioned,
                fullWidth = _props2.fullWidth,
                fullHeight = _props2.fullHeight;

            var className = styles.classNames(styles$63.Popover, transitionStatus && animationVariations(transitionStatus), positioning === 'above' && styles$63.positionedAbove, fullWidth && styles$63.fullWidth, measuring && styles$63.measuring);
            this.transitionStatus = transitionStatus;
            var contentStyles = measuring ? undefined : { height: desiredHeight };
            var contentClassNames = styles.classNames(styles$63.Content, fullHeight && styles$63['Content-fullHeight']);
            var content = React.createElement(
                'div',
                { id: id, tabIndex: -1, className: contentClassNames, style: contentStyles, ref: this.contentNode, __self: this,
                    __source: {
                        fileName: _jsxFileName$96,
                        lineNumber: 71
                    }
                },
                renderPopoverContent(children, { sectioned: sectioned })
            );
            return React.createElement(
                'div',
                Object.assign({ className: className }, overlay.props, {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$96,
                        lineNumber: 74
                    }
                }),
                React.createElement(EventListener$1, { event: 'click', handler: this.handleClick, __self: this,
                    __source: {
                        fileName: _jsxFileName$96,
                        lineNumber: 75
                    }
                }),
                React.createElement(EventListener$1, { event: 'touchstart', handler: this.handleClick, __self: this,
                    __source: {
                        fileName: _jsxFileName$96,
                        lineNumber: 76
                    }
                }),
                React.createElement(KeypressListener$1, { keyCode: Keys.ESCAPE, handler: this.handleEscape, __self: this,
                    __source: {
                        fileName: _jsxFileName$96,
                        lineNumber: 77
                    }
                }),
                React.createElement('div', { className: styles$63.FocusTracker
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    , tabIndex: 0, onFocus: this.handleFocusFirstItem, __self: this,
                    __source: {
                        fileName: _jsxFileName$96,
                        lineNumber: 78
                    }
                }),
                React.createElement(
                    'div',
                    { className: styles$63.Wrapper, __self: this,
                        __source: {
                            fileName: _jsxFileName$96,
                            lineNumber: 81
                        }
                    },
                    content
                ),
                React.createElement('div', { className: styles$63.FocusTracker
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    , tabIndex: 0, onFocus: this.handleFocusLastItem, __self: this,
                    __source: {
                        fileName: _jsxFileName$96,
                        lineNumber: 82
                    }
                })
            );
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            var target$$1 = event.target;
            var contentNode = this.contentNode,
                _props3 = this.props,
                activator = _props3.activator,
                onClose = _props3.onClose;

            var isDescendant = contentNode.current != null && dom.nodeContainsDescendant(contentNode.current, target$$1);
            var isActivatorDescendant = dom.nodeContainsDescendant(activator, target$$1);
            if (isDescendant || isActivatorDescendant || this.transitionStatus !== 'entered') {
                return;
            }
            onClose(CloseSource.Click);
        }
    }, {
        key: 'handleScrollOut',
        value: function handleScrollOut() {
            this.props.onClose(CloseSource.ScrollOut);
        }
    }, {
        key: 'handleEscape',
        value: function handleEscape() {
            this.props.onClose(CloseSource.EscapeKeypress);
        }
    }, {
        key: 'handleFocusFirstItem',
        value: function handleFocusFirstItem() {
            this.props.onClose(CloseSource.FocusOut);
        }
    }, {
        key: 'handleFocusLastItem',
        value: function handleFocusLastItem() {
            this.props.onClose(CloseSource.FocusOut);
        }
    }]);

    return PopoverOverlay;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], PopoverOverlay$1.prototype, "renderOverlay", null);
tslib_1.__decorate([decorators.autobind], PopoverOverlay$1.prototype, "renderPopover", null);
tslib_1.__decorate([decorators.autobind], PopoverOverlay$1.prototype, "handleClick", null);
tslib_1.__decorate([decorators.autobind], PopoverOverlay$1.prototype, "handleScrollOut", null);
tslib_1.__decorate([decorators.autobind], PopoverOverlay$1.prototype, "handleEscape", null);
tslib_1.__decorate([decorators.autobind], PopoverOverlay$1.prototype, "handleFocusFirstItem", null);
tslib_1.__decorate([decorators.autobind], PopoverOverlay$1.prototype, "handleFocusLastItem", null);
function renderPopoverContent(children, props) {
    var childrenArray = React.Children.toArray(children);
    if (reactUtilities.isElementOfType(childrenArray[0], Pane$1)) {
        return childrenArray;
    }
    return reactUtilities.wrapWithComponent(childrenArray, Pane$1, props);
}
function animationVariations(status) {
    switch (status) {
        case 'exiting':
            return styles$63.exiting;
        default:
            return null;
    }
}

var _jsxFileName$91 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Popover/Popover.js';
var getUniqueID$7 = other.createUniqueIDFactory('Popover');

var Popover$1 = function (_React$PureComponent) {
    _inherits(Popover, _React$PureComponent);

    function Popover() {
        _classCallCheck(this, Popover);

        var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).apply(this, arguments));

        _this.state = {
            activatorNode: null
        };
        _this.activatorContainer = null;
        _this.id = getUniqueID$7();
        return _this;
    }

    _createClass(Popover, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setAccessibilityAttributes();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.activatorContainer && this.state.activatorNode && !this.activatorContainer.contains(this.state.activatorNode)) {
                this.setActivator(this.activatorContainer);
            }
            this.setAccessibilityAttributes();
        }
    }, {
        key: 'render',
        value: function render() {
            var _a = this.props,
                _a$activatorWrapper = _a.activatorWrapper,
                WrapperComponent = _a$activatorWrapper === undefined ? 'div' : _a$activatorWrapper,
                children = _a.children,
                onClose = _a.onClose,
                activator = _a.activator,
                activatorWrapper = _a.activatorWrapper,
                active = _a.active,
                fixed = _a.fixed,
                rest = tslib_1.__rest(_a, ["activatorWrapper", "children", "onClose", "activator", "activatorWrapper", "active", "fixed"]);var activatorNode = this.state.activatorNode;

            var portal = activatorNode ? React.createElement(
                Portal$1,
                { idPrefix: 'popover', testID: 'portal', __self: this,
                    __source: {
                        fileName: _jsxFileName$91,
                        lineNumber: 33
                    }
                },
                React.createElement(
                    PopoverOverlay$1,
                    Object.assign({ testID: 'popoverOverlay', id: this.id, activator: activatorNode, onClose: this.handleClose, active: active, fixed: fixed }, rest, {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$91,
                            lineNumber: 34
                        }
                    }),
                    children
                )
            ) : null;
            return React.createElement(
                WrapperComponent,
                { testID: 'wrapper-component', ref: this.setActivator, __self: this,
                    __source: {
                        fileName: _jsxFileName$91,
                        lineNumber: 38
                    }
                },
                React.Children.only(this.props.activator),
                portal
            );
        }
    }, {
        key: 'setAccessibilityAttributes',
        value: function setAccessibilityAttributes() {
            var id = this.id,
                activatorContainer = this.activatorContainer;

            if (activatorContainer == null) {
                return;
            }
            var firstFocusable = focus.findFirstFocusableNode(activatorContainer);
            var focusableActivator = firstFocusable || activatorContainer;
            focusableActivator.tabIndex = focusableActivator.tabIndex || 0;
            focusableActivator.setAttribute('aria-controls', id);
            focusableActivator.setAttribute('aria-owns', id);
            focusableActivator.setAttribute('aria-haspopup', 'true');
            focusableActivator.setAttribute('aria-expanded', String(this.props.active));
        }
    }, {
        key: 'handleClose',
        value: function handleClose(source) {
            this.props.onClose(source);
            if (this.activatorContainer == null) {
                return;
            }
            if (source === CloseSource.FocusOut || source === CloseSource.EscapeKeypress) {
                focus.focusFirstFocusableNode(this.activatorContainer, false);
            }
        }
    }, {
        key: 'setActivator',
        value: function setActivator(node) {
            if (node == null) {
                this.activatorContainer = null;
                this.setState({ activatorNode: null });
                return;
            }
            this.setState({ activatorNode: node.firstElementChild });
            this.activatorContainer = node;
        }
    }]);

    return Popover;
}(React.PureComponent);

Popover$1.Pane = Pane$1;
Popover$1.Section = Section$9;
tslib_1.__decorate([decorators.autobind], Popover$1.prototype, "handleClose", null);
tslib_1.__decorate([decorators.autobind], Popover$1.prototype, "setActivator", null);

var styles$65 = {
  "RangeSlider": "Polaris-RangeSlider",
  "disabled": "Polaris-RangeSlider--disabled",
  "InputWrapper": "Polaris-RangeSlider__InputWrapper",
  "Prefix": "Polaris-RangeSlider__Prefix",
  "Suffix": "Polaris-RangeSlider__Suffix",
  "Input": "Polaris-RangeSlider__Input",
  "error": "Polaris-RangeSlider--error",
  "Output": "Polaris-RangeSlider__Output",
  "OutputBubble": "Polaris-RangeSlider__OutputBubble",
  "OutputText": "Polaris-RangeSlider__OutputText",
};

var _jsxFileName$98 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/RangeSlider/RangeSlider.js';
var getUniqueID$9 = other.createUniqueIDFactory('RangeSlider');
var cssVarPrefix = '--Polaris-RangeSlider-';
var RangeSlider$1 = function (_React$PureComponent) {
    _inherits(RangeSlider, _React$PureComponent);

    function RangeSlider(props) {
        _classCallCheck(this, RangeSlider);

        var _this = _possibleConstructorReturn(this, (RangeSlider.__proto__ || Object.getPrototypeOf(RangeSlider)).call(this, props));

        _this.state = {
            id: props.id || getUniqueID$9()
        };
        return _this;
    }

    _createClass(RangeSlider, [{
        key: 'render',
        value: function render() {
            var _cssVars;

            var id = this.state.id;
            var _props = this.props,
                _props$min = _props.min,
                min = _props$min === undefined ? 0 : _props$min,
                _props$max = _props.max,
                max = _props$max === undefined ? 100 : _props$max;
            var _props2 = this.props,
                label = _props2.label,
                labelAction = _props2.labelAction,
                labelHidden = _props2.labelHidden,
                step = _props2.step,
                value = _props2.value,
                output = _props2.output,
                helpText = _props2.helpText,
                error = _props2.error,
                disabled = _props2.disabled,
                prefix = _props2.prefix,
                suffix = _props2.suffix,
                onFocus = _props2.onFocus,
                onBlur = _props2.onBlur;

            var describedBy = [];
            if (error) {
                describedBy.push(id + 'Error');
            }
            if (helpText) {
                describedBy.push(helpTextID$1(id));
            }
            var ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;
            var sliderProgress = (value - min) * 100 / (max - min);
            var cssVars = (_cssVars = {}, _defineProperty(_cssVars, cssVarPrefix + 'min', min), _defineProperty(_cssVars, cssVarPrefix + 'max', max), _defineProperty(_cssVars, cssVarPrefix + 'current', value), _defineProperty(_cssVars, cssVarPrefix + 'progress', sliderProgress + '%'), _defineProperty(_cssVars, cssVarPrefix + 'output-factor', invertNumber((sliderProgress - 50) / 100)), _cssVars);
            var outputMarkup = !disabled && output && React.createElement(
                'output',
                { htmlFor: id, className: styles$65.Output, __self: this,
                    __source: {
                        fileName: _jsxFileName$98,
                        lineNumber: 48
                    }
                },
                React.createElement(
                    'div',
                    { className: styles$65.OutputBubble, __self: this,
                        __source: {
                            fileName: _jsxFileName$98,
                            lineNumber: 49
                        }
                    },
                    React.createElement(
                        'span',
                        { className: styles$65.OutputText, __self: this,
                            __source: {
                                fileName: _jsxFileName$98,
                                lineNumber: 50
                            }
                        },
                        value
                    )
                )
            );
            var prefixMarkup = prefix && React.createElement(
                'div',
                { className: styles$65.Prefix, __self: this,
                    __source: {
                        fileName: _jsxFileName$98,
                        lineNumber: 53
                    }
                },
                prefix
            );
            var suffixMarkup = suffix && React.createElement(
                'div',
                { className: styles$65.Suffix, __self: this,
                    __source: {
                        fileName: _jsxFileName$98,
                        lineNumber: 54
                    }
                },
                suffix
            );
            var className = styles.classNames(styles$65.RangeSlider, error && styles$65.error, disabled && styles$65.disabled);
            return React.createElement(
                Labelled$1,
                { id: id, label: label, error: error, action: labelAction, labelHidden: labelHidden, helpText: helpText, __self: this,
                    __source: {
                        fileName: _jsxFileName$98,
                        lineNumber: 56
                    }
                },
                React.createElement(
                    'div',
                    { className: className, style: cssVars, __self: this,
                        __source: {
                            fileName: _jsxFileName$98,
                            lineNumber: 57
                        }
                    },
                    prefixMarkup,
                    React.createElement(
                        'div',
                        { className: styles$65.InputWrapper, __self: this,
                            __source: {
                                fileName: _jsxFileName$98,
                                lineNumber: 59
                            }
                        },
                        React.createElement('input', { type: 'range', className: styles$65.Input, id: id, name: id, min: min, max: max, step: step, value: value, disabled: disabled, onChange: this.handleChange, onFocus: onFocus, onBlur: onBlur, 'aria-valuemin': min, 'aria-valuemax': max, 'aria-valuenow': value, 'aria-invalid': Boolean(error), 'aria-describedby': ariaDescribedBy, __self: this,
                            __source: {
                                fileName: _jsxFileName$98,
                                lineNumber: 60
                            }
                        }),
                        outputMarkup
                    ),
                    suffixMarkup
                )
            );
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            var onChange = this.props.onChange;

            if (onChange == null) {
                return;
            }
            onChange(parseFloat(event.currentTarget.value), this.state.id);
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            return nextProps.id != null && nextProps.id !== prevState.id ? {
                id: nextProps.id || prevState.id
            } : null;
        }
    }]);

    return RangeSlider;
}(React.PureComponent);
tslib_1.__decorate([decorators.autobind], RangeSlider$1.prototype, "handleChange", null);
function invertNumber(number) {
    if (Math.sign(number) === 1) {
        return -Math.abs(number);
    } else if (Math.sign(number) === -1) {
        return Math.abs(number);
    } else {
        return 0;
    }
}
withAppProvider()(RangeSlider$1);

var styles$66 = {
  "Select": "Polaris-Select",
  "disabled": "Polaris-Select--disabled",
  "Content": "Polaris-Select__Content",
  "InlineLabel": "Polaris-Select__InlineLabel",
  "Icon": "Polaris-Select__Icon",
  "Backdrop": "Polaris-Select__Backdrop",
  "error": "Polaris-Select--error",
  "Input": "Polaris-Select__Input",
  "placeholder": "Polaris-Select--placeholder",
  "SelectedOption": "Polaris-Select__SelectedOption",
};

var _jsxFileName$100 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Select/Select.js';
var PLACEHOLDER_VALUE = '';
var getUniqueID$11 = other.createUniqueIDFactory('Select');
function Select$1(_ref) {
    var optionsProp = _ref.options,
        groupsProp = _ref.groups,
        label = _ref.label,
        labelAction = _ref.labelAction,
        labelHiddenProp = _ref.labelHidden,
        labelInline = _ref.labelInline,
        disabled = _ref.disabled,
        helpText = _ref.helpText,
        placeholder = _ref.placeholder,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? getUniqueID$11() : _ref$id,
        name = _ref.name,
        _ref$value = _ref.value,
        value = _ref$value === undefined ? PLACEHOLDER_VALUE : _ref$value,
        error = _ref.error,
        onChange = _ref.onChange,
        onFocus = _ref.onFocus,
        onBlur = _ref.onBlur;

    var labelHidden = labelInline ? true : labelHiddenProp;
    var className = styles.classNames(styles$66.Select, error && styles$66.error, disabled && styles$66.disabled);
    var handleChange = onChange ? function (event) {
        return onChange(event.currentTarget.value, id);
    } : undefined;
    var describedBy = [];
    if (helpText) {
        describedBy.push(helpTextID$1(id));
    }
    if (error) {
        describedBy.push(id + 'Error');
    }
    if (groupsProp != null) {
        // eslint-disable-next-line no-console
        console.warn('Deprecation: the `groups` prop is deprecated and will be removed in the next major version. Pass groups to the `options` prop instead.');
    }
    var options = optionsProp || groupsProp || [];
    var normalizedOptions = options.map(normalizeOption);
    if (placeholder) {
        normalizedOptions = [{
            label: placeholder,
            value: PLACEHOLDER_VALUE,
            disabled: true
        }].concat(_toConsumableArray(normalizedOptions));
    }
    var inlineLabelMarkup = labelInline && React.createElement(
        'span',
        { className: styles$66.InlineLabel, __self: this,
            __source: {
                fileName: _jsxFileName$100,
                lineNumber: 39
            }
        },
        label
    );
    var selectedOption = getSelectedOption(normalizedOptions, value);
    var contentMarkup = React.createElement(
        'div',
        { className: styles$66.Content, 'aria-hidden': true, __self: this,
            __source: {
                fileName: _jsxFileName$100,
                lineNumber: 41
            }
        },
        inlineLabelMarkup,
        React.createElement(
            'span',
            { className: styles$66.SelectedOption, __self: this,
                __source: {
                    fileName: _jsxFileName$100,
                    lineNumber: 43
                }
            },
            selectedOption
        ),
        React.createElement(
            'span',
            { className: styles$66.Icon, __self: this,
                __source: {
                    fileName: _jsxFileName$100,
                    lineNumber: 44
                }
            },
            React.createElement(Icon$2, { source: 'arrowUpDown', __self: this,
                __source: {
                    fileName: _jsxFileName$100,
                    lineNumber: 45
                }
            })
        )
    );
    var optionsMarkup = normalizedOptions.map(renderOption);
    return React.createElement(
        Labelled$1,
        { id: id, label: label, error: error, action: labelAction, labelHidden: labelHidden, helpText: helpText, __self: this,
            __source: {
                fileName: _jsxFileName$100,
                lineNumber: 49
            }
        },
        React.createElement(
            'div',
            { className: className, __self: this,
                __source: {
                    fileName: _jsxFileName$100,
                    lineNumber: 50
                }
            },
            React.createElement(
                'select',
                { id: id, name: name, value: value, className: styles$66.Input, disabled: disabled, onFocus: onFocus, onBlur: onBlur, onChange: handleChange, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined, __self: this,
                    __source: {
                        fileName: _jsxFileName$100,
                        lineNumber: 51
                    }
                },
                optionsMarkup
            ),
            contentMarkup,
            React.createElement('div', { className: styles$66.Backdrop, __self: this,
                __source: {
                    fileName: _jsxFileName$100,
                    lineNumber: 55
                }
            })
        )
    );
}
function isString(option) {
    return typeof option === 'string';
}
function isGroup(option) {
    return option.options != null;
}
function normalizeStringOption(option) {
    return {
        label: option,
        value: option
    };
}
/**
 * Converts a string option (and each string option in a Group) into
 * an Option object.
 */
function normalizeOption(option) {
    if (isString(option)) {
        return normalizeStringOption(option);
    } else if (isGroup(option)) {
        var title = option.title,
            options = option.options;

        return {
            title: title,
            options: options.map(function (option) {
                return isString(option) ? normalizeStringOption(option) : option;
            })
        };
    }
    return option;
}
/**
 * Gets the text to display in the UI, for the currently selected option
 */
function getSelectedOption(options, value) {
    var flatOptions = flattenOptions(options);
    var selectedOption = flatOptions.find(function (option) {
        return value === option.value;
    });
    if (selectedOption === undefined) {
        // Get the first visible option (not the hidden placeholder)
        selectedOption = flatOptions.find(function (option) {
            return !option.hidden;
        });
    }
    return selectedOption ? selectedOption.label : '';
}
/**
 * Ungroups an options array
 */
function flattenOptions(options) {
    var flatOptions = [];
    options.forEach(function (optionOrGroup) {
        if (isGroup(optionOrGroup)) {
            flatOptions = flatOptions.concat(optionOrGroup.options);
        } else {
            flatOptions.push(optionOrGroup);
        }
    });
    return flatOptions;
}
function renderSingleOption(option) {
    var value = option.value,
        label = option.label,
        rest = tslib_1.__rest(option, ["value", "label"]);

    return React.createElement(
        'option',
        Object.assign({ key: value, value: value }, rest, {
            __self: this,
            __source: {
                fileName: _jsxFileName$100,
                lineNumber: 119
            }
        }),
        label
    );
}
function renderOption(optionOrGroup) {
    if (isGroup(optionOrGroup)) {
        var title = optionOrGroup.title,
            options = optionOrGroup.options;

        return React.createElement(
            'optgroup',
            { label: title, key: title, __self: this,
                __source: {
                    fileName: _jsxFileName$100,
                    lineNumber: 126
                }
            },
            options.map(renderSingleOption)
        );
    }
    return renderSingleOption(optionOrGroup);
}

var selectIcon = {"viewBox":"0 0 20 20","body":"<path d=\"M9 14.41l-3.71-3.7 1.42-1.42L9 11.59l5.29-5.3 1.42 1.42L9 14.41zM17 2H3c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1z\" />"};

var styles$67 = {
  "CheckableButton": "Polaris-ResourceList-CheckableButton",
  "CheckableButton-measuring": "Polaris-ResourceList-CheckableButton__CheckableButton--measuring",
  "CheckableButton-plain": "Polaris-ResourceList-CheckableButton__CheckableButton--plain",
  "CheckableButton-selectMode": "Polaris-ResourceList-CheckableButton__CheckableButton--selectMode",
  "CheckableButton-selected": "Polaris-ResourceList-CheckableButton__CheckableButton--selected",
  "Checkbox": "Polaris-ResourceList-CheckableButton__Checkbox",
  "Label": "Polaris-ResourceList-CheckableButton__Label",
};

var _jsxFileName$102 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ResourceList/components/CheckableButton/CheckableButton.js';
function CheckableButton$1(_ref) {
    var accessibilityLabel = _ref.accessibilityLabel,
        _ref$label = _ref.label,
        label = _ref$label === undefined ? '' : _ref$label,
        onToggleAll = _ref.onToggleAll,
        selected = _ref.selected,
        selectMode = _ref.selectMode,
        plain = _ref.plain,
        measuring = _ref.measuring,
        disabled = _ref.disabled;

    var className = plain ? styles.classNames(styles$67.CheckableButton, styles$67['CheckableButton-plain']) : styles.classNames(styles$67.CheckableButton, selectMode && styles$67['CheckableButton-selectMode'], selected && styles$67['CheckableButton-selected'], measuring && styles$67['CheckableButton-measuring']);
    return React.createElement(
        'div',
        { className: className, onClick: onToggleAll, __self: this,
            __source: {
                fileName: _jsxFileName$102,
                lineNumber: 10
            }
        },
        React.createElement(
            'div',
            { className: styles$67.Checkbox, __self: this,
                __source: {
                    fileName: _jsxFileName$102,
                    lineNumber: 11
                }
            },
            React.createElement(Checkbox$2, { label: accessibilityLabel, labelHidden: true, checked: selected, disabled: disabled, __self: this,
                __source: {
                    fileName: _jsxFileName$102,
                    lineNumber: 12
                }
            })
        ),
        React.createElement(
            'span',
            { className: styles$67.Label, __self: this,
                __source: {
                    fileName: _jsxFileName$102,
                    lineNumber: 14
                }
            },
            label
        )
    );
}
var CheckableButton$2 = withAppProvider()(CheckableButton$1);

var styles$68 = {
  "Button": "Polaris-ResourceList-BulkActions__Button",
  "Group-measuring": "Polaris-ResourceList-BulkActions__Group--measuring",
  "Group": "Polaris-ResourceList-BulkActions__Group",
  "Group-entering": "Polaris-ResourceList-BulkActions__Group--entering",
  "Group-exiting": "Polaris-ResourceList-BulkActions__Group--exiting",
  "Group-entered": "Polaris-ResourceList-BulkActions__Group--entered",
  "Group-exited": "Polaris-ResourceList-BulkActions__Group--exited",
  "Group-smallScreen": "Polaris-ResourceList-BulkActions__Group--smallScreen",
  "Group-largeScreen": "Polaris-ResourceList-BulkActions__Group--largeScreen",
  "ButtonGroup": "Polaris-ResourceList-BulkActions__ButtonGroup",
  "Button-cancel": "Polaris-ResourceList-BulkActions__Button--cancel",
  "Popover": "Polaris-ResourceList-BulkActions__Popover",
  "ActionContent": "Polaris-ResourceList-BulkActions__ActionContent",
  "ActionIcon": "Polaris-ResourceList-BulkActions__ActionIcon",
  "disabled": "Polaris-ResourceList-BulkActions--disabled",
  "PaginatedSelectAll": "Polaris-ResourceList-BulkActions__PaginatedSelectAll",
  "Slide": "Polaris-ResourceList-BulkActions__Slide",
  "Slide-appear": "Polaris-ResourceList-BulkActions__Slide--appear",
  "Slide-enter": "Polaris-ResourceList-BulkActions__Slide--enter",
  "Slide-exit": "Polaris-ResourceList-BulkActions__Slide--exit",
  "Slide-appearing": "Polaris-ResourceList-BulkActions__Slide--appearing",
  "Slide-entering": "Polaris-ResourceList-BulkActions__Slide--entering",
};

var _jsxFileName$103 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ResourceList/components/BulkActions/components/BulkActionButton/BulkActionButton.js';
var BulkActionButton$1 = function (_React$PureComponent) {
    _inherits(BulkActionButton, _React$PureComponent);

    function BulkActionButton() {
        _classCallCheck(this, BulkActionButton);

        return _possibleConstructorReturn(this, (BulkActionButton.__proto__ || Object.getPrototypeOf(BulkActionButton)).apply(this, arguments));
    }

    _createClass(BulkActionButton, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var handleMeasurement = this.props.handleMeasurement;

            if (handleMeasurement) {
                var bulkActionButtonNode = ReactDOM.findDOMNode(this);
                var width = bulkActionButtonNode instanceof Element && bulkActionButtonNode.getBoundingClientRect().width || 0;
                handleMeasurement(width);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                url = _props.url,
                external = _props.external,
                onAction = _props.onAction,
                content = _props.content,
                disclosure = _props.disclosure,
                accessibilityLabel = _props.accessibilityLabel,
                disabled = _props.disabled;

            var disclosureIconMarkup = disclosure ? React.createElement(
                'span',
                { className: styles$68.ActionIcon, __self: this,
                    __source: {
                        fileName: _jsxFileName$103,
                        lineNumber: 20
                    }
                },
                React.createElement(Icon$2, { source: 'caretDown', __self: this,
                    __source: {
                        fileName: _jsxFileName$103,
                        lineNumber: 21
                    }
                })
            ) : null;
            var contentMarkup = disclosureIconMarkup ? React.createElement(
                'span',
                { className: styles$68.ActionContent, __self: this,
                    __source: {
                        fileName: _jsxFileName$103,
                        lineNumber: 23
                    }
                },
                React.createElement(
                    'span',
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName$103,
                            lineNumber: 24
                        }
                    },
                    content
                ),
                disclosureIconMarkup
            ) : content;
            if (url) {
                return React.createElement(
                    UnstyledLink$2,
                    { external: external, url: url, onMouseUp: handleMouseUpByBlurring, className: styles$68.Button, 'aria-label': accessibilityLabel, __self: this,
                        __source: {
                            fileName: _jsxFileName$103,
                            lineNumber: 28
                        }
                    },
                    contentMarkup
                );
            }
            var className = reactUtilities.classNames(styles$68.Button, disabled && styles$68.disabled);
            return React.createElement(
                'button',
                { className: className, onClick: onAction, onMouseUp: handleMouseUpByBlurring, 'aria-label': accessibilityLabel, type: 'button', disabled: disabled, __self: this,
                    __source: {
                        fileName: _jsxFileName$103,
                        lineNumber: 33
                    }
                },
                contentMarkup
            );
        }
    }]);

    return BulkActionButton;
}(React.PureComponent);

var _jsxFileName$101 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ResourceList/components/BulkActions/BulkActions.js';
var MAX_PROMOTED_ACTIONS = 2;
var slideClasses = {
    appear: styles.classNames(styles$68.Slide, styles$68['Slide-appear']),
    appearActive: styles.classNames(styles$68.Slide, styles$68['Slide-appearing']),
    enter: styles.classNames(styles$68.Slide, styles$68['Slide-enter']),
    enterActive: styles.classNames(styles$68.Slide, styles$68['Slide-entering']),
    exit: styles.classNames(styles$68.Slide, styles$68['Slide-exit'])
};
var BulkActions$1 = function (_React$PureComponent) {
    _inherits(BulkActions, _React$PureComponent);

    function BulkActions() {
        _classCallCheck(this, BulkActions);

        var _this = _possibleConstructorReturn(this, (BulkActions.__proto__ || Object.getPrototypeOf(BulkActions)).apply(this, arguments));

        _this.state = {
            smallScreenPopoverVisible: false,
            largeScreenPopoverVisible: false,
            containerWidth: 0,
            measuring: true
        };
        _this.promotedActionsWidths = [];
        _this.bulkActionsWidth = 0;
        _this.addedMoreActionsWidthForMeasuring = 0;
        return _this;
    }

    _createClass(BulkActions, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                actions = _props.actions,
                promotedActions = _props.promotedActions;

            if (promotedActions && !actions && this.moreActionsNode) {
                this.addedMoreActionsWidthForMeasuring = this.moreActionsNode.getBoundingClientRect().width;
            }
            this.bulkActionsWidth = this.largeScreenButtonsNode ? this.largeScreenButtonsNode.getBoundingClientRect().width - this.addedMoreActionsWidthForMeasuring : 0;
            if (this.containerNode) {
                // eslint-disable-next-line react/no-did-mount-set-state
                this.setState({
                    containerWidth: this.containerNode.getBoundingClientRect().width,
                    measuring: false
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                selectMode = _props2.selectMode,
                accessibilityLabel = _props2.accessibilityLabel,
                _props2$label = _props2.label,
                label = _props2$label === undefined ? '' : _props2$label,
                onToggleAll = _props2.onToggleAll,
                selected = _props2.selected,
                disabled = _props2.disabled,
                promotedActions = _props2.promotedActions,
                _props2$paginatedSele = _props2.paginatedSelectAllText,
                paginatedSelectAllText = _props2$paginatedSele === undefined ? null : _props2$paginatedSele,
                paginatedSelectAllAction = _props2.paginatedSelectAllAction,
                intl = _props2.polaris.intl;

            if (promotedActions && promotedActions.length > MAX_PROMOTED_ACTIONS) {
                // eslint-disable-next-line no-console
                console.warn(intl.translate('Polaris.ResourceList.BulkActions.warningMessage', {
                    maxPromotedActions: MAX_PROMOTED_ACTIONS
                }));
            }
            var _state = this.state,
                smallScreenPopoverVisible = _state.smallScreenPopoverVisible,
                largeScreenPopoverVisible = _state.largeScreenPopoverVisible,
                measuring = _state.measuring;

            var paginatedSelectAllActionMarkup = paginatedSelectAllAction ? React.createElement(
                Button$2,
                { onClick: paginatedSelectAllAction.onAction, plain: true, testID: 'paginated-action', disabled: disabled, __self: this,
                    __source: {
                        fileName: _jsxFileName$101,
                        lineNumber: 105
                    }
                },
                paginatedSelectAllAction.content
            ) : null;
            var paginatedSelectAllTextMarkup = paginatedSelectAllText && paginatedSelectAllAction ? React.createElement(
                'span',
                { 'aria-live': 'polite', __self: this,
                    __source: {
                        fileName: _jsxFileName$101,
                        lineNumber: 108
                    }
                },
                paginatedSelectAllText
            ) : paginatedSelectAllText;
            var paginatedSelectAllMarkup = paginatedSelectAllActionMarkup || paginatedSelectAllTextMarkup ? React.createElement(
                'div',
                { className: styles$68.PaginatedSelectAll, testID: 'paginated-select-all', __self: this,
                    __source: {
                        fileName: _jsxFileName$101,
                        lineNumber: 109
                    }
                },
                paginatedSelectAllTextMarkup,
                ' ',
                paginatedSelectAllActionMarkup
            ) : null;
            var cancelButtonClassName = styles.classNames(styles$68.Button, styles$68['Button-cancel']);
            var cancelButton = React.createElement(
                'button',
                { className: cancelButtonClassName
                    // eslint-disable-next-line react/jsx-no-bind
                    , onClick: this.setSelectMode.bind(this, false), testID: 'btn-cancel', __self: this,
                    __source: {
                        fileName: _jsxFileName$101,
                        lineNumber: 113
                    }
                },
                'Cancel'
            );
            var numberOfPromotedActionsToRender = this.numberOfPromotedActionsToRender;
            var allActionsPopover = this.hasActions ? React.createElement(
                'div',
                { className: styles$68.Popover, ref: this.setMoreActionsNode, __self: this,
                    __source: {
                        fileName: _jsxFileName$101,
                        lineNumber: 120
                    }
                },
                React.createElement(
                    Popover$1,
                    { active: smallScreenPopoverVisible, activator: React.createElement(BulkActionButton$1, { disclosure: true, onAction: this.toggleSmallScreenPopover, content: intl.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel'), __self: this,
                            __source: {
                                fileName: _jsxFileName$101,
                                lineNumber: 121
                            }
                        }), onClose: this.toggleSmallScreenPopover, __self: this,
                        __source: {
                            fileName: _jsxFileName$101,
                            lineNumber: 121
                        }
                    },
                    React.createElement(ActionList$1, { items: promotedActions, sections: this.actionSections, onActionAnyItem: this.toggleSmallScreenPopover, __self: this,
                        __source: {
                            fileName: _jsxFileName$101,
                            lineNumber: 122
                        }
                    })
                )
            ) : null;
            var promotedActionsMarkup = promotedActions && numberOfPromotedActionsToRender > 0 ? [].concat(_toConsumableArray(promotedActions)).slice(0, numberOfPromotedActionsToRender).map(function (action, index) {
                return React.createElement(BulkActionButton$1, Object.assign({}, action, { key: index, handleMeasurement: _this2.handleMeasurement, __self: _this2,
                    __source: {
                        fileName: _jsxFileName$101,
                        lineNumber: 128
                    }
                }));
            }) : null;
            var rolledInPromotedActions = promotedActions && numberOfPromotedActionsToRender < promotedActions.length ? [].concat(_toConsumableArray(promotedActions)).slice(numberOfPromotedActionsToRender) : [];
            var activatorLabel = !promotedActions || promotedActions && numberOfPromotedActionsToRender === 0 && !measuring ? intl.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel') : intl.translate('Polaris.ResourceList.BulkActions.moreActionsActivatorLabel');
            var combinedActions = [];
            if (this.actionSections && rolledInPromotedActions.length > 0) {
                combinedActions = [{ items: rolledInPromotedActions }].concat(_toConsumableArray(this.actionSections));
            } else if (this.actionSections) {
                combinedActions = this.actionSections;
            } else if (rolledInPromotedActions.length > 0) {
                combinedActions = [{ items: rolledInPromotedActions }];
            }
            var actionsPopover = this.actionSections || rolledInPromotedActions.length > 0 || measuring ? React.createElement(
                'div',
                { className: styles$68.Popover, ref: this.setMoreActionsNode, __self: this,
                    __source: {
                        fileName: _jsxFileName$101,
                        lineNumber: 151
                    }
                },
                React.createElement(
                    Popover$1,
                    { active: largeScreenPopoverVisible, activator: React.createElement(BulkActionButton$1, { disclosure: true, onAction: this.toggleLargeScreenPopover, content: activatorLabel, disabled: disabled, __self: this,
                            __source: {
                                fileName: _jsxFileName$101,
                                lineNumber: 152
                            }
                        }), onClose: this.toggleLargeScreenPopover, __self: this,
                        __source: {
                            fileName: _jsxFileName$101,
                            lineNumber: 152
                        }
                    },
                    React.createElement(ActionList$1, { sections: combinedActions, onActionAnyItem: this.toggleLargeScreenPopover, __self: this,
                        __source: {
                            fileName: _jsxFileName$101,
                            lineNumber: 153
                        }
                    })
                )
            ) : null;
            var checkableButtonProps = {
                accessibilityLabel: accessibilityLabel,
                label: label,
                selected: selected,
                selectMode: selectMode,
                onToggleAll: onToggleAll,
                measuring: measuring,
                disabled: disabled
            };
            var smallScreenGroup = React.createElement(
                reactTransitionGroup.Transition,
                { timeout: 0, 'in': selectMode, key: 'smallGroup', __self: this,
                    __source: {
                        fileName: _jsxFileName$101,
                        lineNumber: 165
                    }
                },
                function (status) {
                    var smallScreenGroupClassName = styles.classNames(styles$68.Group, styles$68['Group-smallScreen'], styles$68['Group-' + status]);
                    return React.createElement(
                        'div',
                        { className: smallScreenGroupClassName, __self: _this2,
                            __source: {
                                fileName: _jsxFileName$101,
                                lineNumber: 168
                            }
                        },
                        React.createElement(
                            'div',
                            { className: styles$68.ButtonGroup, __self: _this2,
                                __source: {
                                    fileName: _jsxFileName$101,
                                    lineNumber: 169
                                }
                            },
                            React.createElement(
                                reactTransitionGroup.CSSTransition,
                                { 'in': selectMode, timeout: Duration.Base, classNames: slideClasses, appear: true, __self: _this2,
                                    __source: {
                                        fileName: _jsxFileName$101,
                                        lineNumber: 170
                                    }
                                },
                                React.createElement(CheckableButton$2, Object.assign({}, checkableButtonProps, {
                                    __self: _this2,
                                    __source: {
                                        fileName: _jsxFileName$101,
                                        lineNumber: 171
                                    }
                                }))
                            ),
                            allActionsPopover,
                            cancelButton
                        ),
                        paginatedSelectAllMarkup
                    );
                }
            );
            var largeScreenGroup = React.createElement(
                reactTransitionGroup.Transition,
                { timeout: 0, 'in': selectMode, key: 'largeGroup', __self: this,
                    __source: {
                        fileName: _jsxFileName$101,
                        lineNumber: 180
                    }
                },
                function (status) {
                    var largeScreenGroupClassName = styles.classNames(styles$68.Group, styles$68['Group-largeScreen'], !measuring && styles$68['Group-' + status], measuring && styles$68['Group-measuring']);
                    return React.createElement(
                        'div',
                        { className: largeScreenGroupClassName, __self: _this2,
                            __source: {
                                fileName: _jsxFileName$101,
                                lineNumber: 183
                            }
                        },
                        React.createElement(EventListener$1, { event: 'resize', handler: _this2.handleResize, __self: _this2,
                            __source: {
                                fileName: _jsxFileName$101,
                                lineNumber: 184
                            }
                        }),
                        React.createElement(
                            'div',
                            { className: styles$68.ButtonGroup, ref: _this2.setLargeScreenButtonsNode, __self: _this2,
                                __source: {
                                    fileName: _jsxFileName$101,
                                    lineNumber: 185
                                }
                            },
                            React.createElement(CheckableButton$2, Object.assign({}, checkableButtonProps, {
                                __self: _this2,
                                __source: {
                                    fileName: _jsxFileName$101,
                                    lineNumber: 186
                                }
                            })),
                            promotedActionsMarkup,
                            actionsPopover
                        ),
                        paginatedSelectAllMarkup
                    );
                }
            );
            return React.createElement(
                'div',
                { ref: this.setContainerNode, __self: this,
                    __source: {
                        fileName: _jsxFileName$101,
                        lineNumber: 194
                    }
                },
                smallScreenGroup,
                largeScreenGroup
            );
        }
    }, {
        key: 'setLargeScreenButtonsNode',
        value: function setLargeScreenButtonsNode(node) {
            this.largeScreenButtonsNode = node;
        }
    }, {
        key: 'setContainerNode',
        value: function setContainerNode(node) {
            this.containerNode = node;
        }
    }, {
        key: 'setMoreActionsNode',
        value: function setMoreActionsNode(node) {
            this.moreActionsNode = node;
        }
    }, {
        key: 'setSelectMode',
        value: function setSelectMode(val) {
            var onSelectModeToggle = this.props.onSelectModeToggle;

            if (onSelectModeToggle) {
                onSelectModeToggle(val);
            }
        }
    }, {
        key: 'toggleSmallScreenPopover',
        value: function toggleSmallScreenPopover() {
            this.setState(function (_ref) {
                var smallScreenPopoverVisible = _ref.smallScreenPopoverVisible;
                return {
                    smallScreenPopoverVisible: !smallScreenPopoverVisible
                };
            });
        }
    }, {
        key: 'toggleLargeScreenPopover',
        value: function toggleLargeScreenPopover() {
            this.setState(function (_ref2) {
                var largeScreenPopoverVisible = _ref2.largeScreenPopoverVisible;
                return {
                    largeScreenPopoverVisible: !largeScreenPopoverVisible
                };
            });
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            var _state2 = this.state,
                smallScreenPopoverVisible = _state2.smallScreenPopoverVisible,
                largeScreenPopoverVisible = _state2.largeScreenPopoverVisible;

            if (this.containerNode) {
                var containerWidth = this.containerNode.getBoundingClientRect().width;
                if (containerWidth > 0) {
                    this.setState({ containerWidth: containerWidth });
                }
            }
            if (smallScreenPopoverVisible || largeScreenPopoverVisible) {
                this.setState({
                    smallScreenPopoverVisible: false,
                    largeScreenPopoverVisible: false
                });
            }
        }
    }, {
        key: 'handleMeasurement',
        value: function handleMeasurement(width) {
            var measuring = this.state.measuring;

            if (measuring) {
                this.promotedActionsWidths.push(width);
            }
        }
    }, {
        key: 'numberOfPromotedActionsToRender',
        get: function get$$1() {
            var promotedActions = this.props.promotedActions;
            var _state3 = this.state,
                containerWidth = _state3.containerWidth,
                measuring = _state3.measuring;

            if (!promotedActions) {
                return 0;
            }
            if (containerWidth >= this.bulkActionsWidth || measuring) {
                return promotedActions.length;
            }
            var sufficientSpace = false;
            var counter = promotedActions.length - 1;
            var totalWidth = 0;
            while (!sufficientSpace && counter >= 0) {
                totalWidth += this.promotedActionsWidths[counter];
                var widthWithRemovedAction = this.bulkActionsWidth - totalWidth + this.addedMoreActionsWidthForMeasuring;
                if (containerWidth >= widthWithRemovedAction) {
                    sufficientSpace = true;
                } else {
                    counter--;
                }
            }
            return counter;
        }
    }, {
        key: 'hasActions',
        get: function get$$1() {
            var _props3 = this.props,
                promotedActions = _props3.promotedActions,
                actions = _props3.actions;

            return Boolean(promotedActions && promotedActions.length > 0 || actions && actions.length > 0);
        }
    }, {
        key: 'actionSections',
        get: function get$$1() {
            var actions = this.props.actions;

            if (!actions || actions.length === 0) {
                return;
            }
            if (instanceOfBulkActionListSectionArray(actions)) {
                return actions;
            }
            if (instanceOfBulkActionArray(actions)) {
                return [{
                    items: actions
                }];
            }
        }
    }]);

    return BulkActions;
}(React.PureComponent);
tslib_1.__decorate([decorators.autobind], BulkActions$1.prototype, "setLargeScreenButtonsNode", null);
tslib_1.__decorate([decorators.autobind], BulkActions$1.prototype, "setContainerNode", null);
tslib_1.__decorate([decorators.autobind], BulkActions$1.prototype, "setMoreActionsNode", null);
tslib_1.__decorate([decorators.autobind], BulkActions$1.prototype, "setSelectMode", null);
tslib_1.__decorate([decorators.autobind], BulkActions$1.prototype, "toggleSmallScreenPopover", null);
tslib_1.__decorate([decorators.autobind], BulkActions$1.prototype, "toggleLargeScreenPopover", null);
tslib_1.__decorate([decorators.autobind, decorators.debounce(50, { trailing: true })], BulkActions$1.prototype, "handleResize", null);
tslib_1.__decorate([decorators.autobind], BulkActions$1.prototype, "handleMeasurement", null);
function instanceOfBulkActionListSectionArray(actions) {
    var validList = actions.filter(function (action) {
        return action.items;
    });
    return actions.length === validList.length;
}
function instanceOfBulkActionArray(actions) {
    var validList = actions.filter(function (action) {
        return !action.items;
    });
    return actions.length === validList.length;
}
var BulkActions$2 = withAppProvider()(BulkActions$1);

var styles$69 = {
  "DateTextField": "Polaris-FilterControl-DateSelector__DateTextField",
  "DatePicker": "Polaris-FilterControl-DateSelector__DatePicker",
};

var _jsxFileName$107 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ResourceList/components/FilterControl/components/DateSelector/DateSelector.js';
var VALID_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;
var DateFilterOption;
(function (DateFilterOption) {
    DateFilterOption["PastWeek"] = "past_week";
    DateFilterOption["PastMonth"] = "past_month";
    DateFilterOption["PastQuarter"] = "past_quarter";
    DateFilterOption["PastYear"] = "past_year";
    DateFilterOption["ComingWeek"] = "coming_week";
    DateFilterOption["ComingMonth"] = "coming_month";
    DateFilterOption["ComingQuarter"] = "coming_quarter";
    DateFilterOption["ComingYear"] = "coming_year";
    DateFilterOption["OnOrBefore"] = "on_or_before";
    DateFilterOption["OnOrAfter"] = "on_or_after";
})(DateFilterOption || (DateFilterOption = {}));

var DateSelector$1 = function (_React$PureComponent) {
    _inherits(DateSelector, _React$PureComponent);

    function DateSelector() {
        _classCallCheck(this, DateSelector);

        var _this = _possibleConstructorReturn(this, (DateSelector.__proto__ || Object.getPrototypeOf(DateSelector)).apply(this, arguments));

        _this.state = {
            datePickerMonth: _this.now.getMonth(),
            datePickerYear: _this.now.getFullYear(),
            initialConsumerFilterKey: _this.props.filterKey
        };
        return _this;
    }

    _createClass(DateSelector, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                filterValue = _props.filterValue,
                filterKey = _props.filterKey,
                filterMinKey = _props.filterMinKey,
                filterMaxKey = _props.filterMaxKey,
                dateOptionType = _props.dateOptionType,
                intl = _props.polaris.intl;
            var _state = this.state,
                selectedDate = _state.selectedDate,
                datePickerMonth = _state.datePickerMonth,
                datePickerYear = _state.datePickerYear,
                userInputDateError = _state.userInputDateError;

            var dateFilterOption = getDateFilterOption(filterValue, filterKey, filterMinKey, filterMaxKey);
            var showDatePredicate = dateFilterOption === DateFilterOption.OnOrBefore || dateFilterOption === DateFilterOption.OnOrAfter;
            var datePredicateMarkup = showDatePredicate && React.createElement(
                React.Fragment,
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$107,
                        lineNumber: 36
                    }
                },
                React.createElement(
                    'div',
                    { className: styles$69.DateTextField, __self: this,
                        __source: {
                            fileName: _jsxFileName$107,
                            lineNumber: 37
                        }
                    },
                    React.createElement(TextField$1, { label: intl.translate('Polaris.ResourceList.DateSelector.dateValueLabel'), placeholder: intl.translate('Polaris.ResourceList.DateSelector.dateValuePlaceholder'), value: this.dateTextFieldValue, error: userInputDateError, prefix: React.createElement(Icon$2, { source: 'calendar', color: 'skyDark', __self: this,
                            __source: {
                                fileName: _jsxFileName$107,
                                lineNumber: 38
                            }
                        }), autoComplete: false, onChange: this.handleDateFieldChange, onBlur: this.handleDateBlur, __self: this,
                        __source: {
                            fileName: _jsxFileName$107,
                            lineNumber: 38
                        }
                    })
                ),
                React.createElement(
                    'div',
                    { className: styles$69.DatePicker, __self: this,
                        __source: {
                            fileName: _jsxFileName$107,
                            lineNumber: 40
                        }
                    },
                    React.createElement(DatePicker$2, { selected: selectedDate, month: datePickerMonth, year: datePickerYear, onChange: this.handleDatePickerChange, onMonthChange: this.handleDatePickerMonthChange, __self: this,
                        __source: {
                            fileName: _jsxFileName$107,
                            lineNumber: 41
                        }
                    })
                )
            );
            return React.createElement(
                React.Fragment,
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$107,
                        lineNumber: 44
                    }
                },
                React.createElement(Select$1, { label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.dateFilterLabel'), labelHidden: true, options: dateOptionType ? this.dateOptionTypes[dateOptionType] : this.dateOptionTypes.full, placeholder: intl.translate('Polaris.ResourceList.FilterValueSelector.selectFilterValuePlaceholder'), value: dateFilterOption, onChange: this.handleDateFilterOptionsChange, __self: this,
                    __source: {
                        fileName: _jsxFileName$107,
                        lineNumber: 45
                    }
                }),
                datePredicateMarkup
            );
        }
    }, {
        key: 'handleDateFilterOptionsChange',
        value: function handleDateFilterOptionsChange(newOption) {
            var _props2 = this.props,
                onFilterValueChange = _props2.onFilterValueChange,
                onFilterKeyChange = _props2.onFilterKeyChange,
                filterMinKey = _props2.filterMinKey,
                filterMaxKey = _props2.filterMaxKey;
            var _state2 = this.state,
                initialConsumerFilterKey = _state2.initialConsumerFilterKey,
                selectedDate = _state2.selectedDate;

            if (!initialConsumerFilterKey) {
                return;
            }
            if (newOption === DateFilterOption.OnOrBefore) {
                onFilterKeyChange(filterMaxKey);
                onFilterValueChange(selectedDate ? formatDateValue(selectedDate) : undefined);
                return;
            }
            if (newOption === DateFilterOption.OnOrAfter) {
                onFilterKeyChange(filterMinKey);
                onFilterValueChange(selectedDate ? formatDateValue(selectedDate) : undefined);
                return;
            }
            onFilterKeyChange(initialConsumerFilterKey);
            onFilterValueChange(newOption);
        }
    }, {
        key: 'handleDateFieldChange',
        value: function handleDateFieldChange(value) {
            var onFilterValueChange = this.props.onFilterValueChange;
            var userInputDateError = this.state.userInputDateError;

            if (value.length === 0) {
                this.setState({
                    selectedDate: undefined
                }, function () {
                    onFilterValueChange(undefined);
                });
            }
            if (userInputDateError && isValidDate(value)) {
                this.setState({
                    userInputDateError: undefined
                });
            }
            this.setState({
                userInputDate: value
            });
        }
    }, {
        key: 'handleDateBlur',
        value: function handleDateBlur() {
            var _props3 = this.props,
                intl = _props3.polaris.intl,
                onFilterValueChange = _props3.onFilterValueChange;

            if (!this.dateTextFieldValue || !isValidDate(this.dateTextFieldValue)) {
                this.setState({
                    selectedDate: undefined,
                    userInputDateError: intl.translate('Polaris.ResourceList.DateSelector.dateValueError')
                });
                onFilterValueChange(undefined);
                return;
            }
            var userInputDate = this.state.userInputDate;

            if (!userInputDate) {
                return;
            }
            var nextDate = new Date(userInputDate.replace(/-/g, '/'));
            this.setState({
                selectedDate: nextDate,
                datePickerMonth: nextDate.getMonth(),
                datePickerYear: nextDate.getFullYear(),
                userInputDate: undefined,
                userInputDateError: undefined
            }, this.handleDateChanged);
        }
    }, {
        key: 'handleDateChanged',
        value: function handleDateChanged() {
            var onFilterValueChange = this.props.onFilterValueChange;
            var selectedDate = this.state.selectedDate;

            if (!selectedDate) {
                return;
            }
            onFilterValueChange(formatDateValue(selectedDate));
        }
    }, {
        key: 'handleDatePickerChange',
        value: function handleDatePickerChange(_ref) {
            var nextDate = _ref.end;

            this.setState({
                selectedDate: new Date(nextDate),
                userInputDate: undefined,
                userInputDateError: undefined
            }, this.handleDateChanged);
        }
    }, {
        key: 'handleDatePickerMonthChange',
        value: function handleDatePickerMonthChange(month, year) {
            this.setState({ datePickerMonth: month, datePickerYear: year });
        }
    }, {
        key: 'dateComparatorOptions',
        get: function get$$1() {
            var intl = this.props.polaris.intl;

            return [{
                value: DateFilterOption.OnOrBefore,
                label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.OnOrBefore')
            }, {
                value: DateFilterOption.OnOrAfter,
                label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.OnOrAfter')
            }];
        }
    }, {
        key: 'datePastOptions',
        get: function get$$1() {
            var intl = this.props.polaris.intl;

            return [{
                value: DateFilterOption.PastWeek,
                label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.PastWeek')
            }, {
                value: DateFilterOption.PastMonth,
                label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.PastMonth')
            }, {
                value: DateFilterOption.PastQuarter,
                label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.PastQuarter')
            }, {
                value: DateFilterOption.PastYear,
                label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.PastYear')
            }];
        }
    }, {
        key: 'dateFutureOptions',
        get: function get$$1() {
            var intl = this.props.polaris.intl;

            return [{
                value: DateFilterOption.ComingWeek,
                label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.ComingWeek')
            }, {
                value: DateFilterOption.ComingMonth,
                label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.ComingMonth')
            }, {
                value: DateFilterOption.ComingQuarter,
                label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.ComingQuarter')
            }, {
                value: DateFilterOption.ComingYear,
                label: intl.translate('Polaris.ResourceList.DateSelector.SelectOptions.ComingYear')
            }];
        }
    }, {
        key: 'dateOptionTypes',
        get: function get$$1() {
            return {
                past: [].concat(_toConsumableArray(this.datePastOptions), _toConsumableArray(this.dateComparatorOptions)),
                future: [].concat(_toConsumableArray(this.dateFutureOptions), _toConsumableArray(this.dateComparatorOptions)),
                full: [].concat(_toConsumableArray(this.datePastOptions), _toConsumableArray(this.dateFutureOptions), _toConsumableArray(this.dateComparatorOptions))
            };
        }
    }, {
        key: 'now',
        get: function get$$1() {
            return new Date();
        }
    }, {
        key: 'dateTextFieldValue',
        get: function get$$1() {
            var _state3 = this.state,
                userInputDate = _state3.userInputDate,
                selectedDate = _state3.selectedDate;

            if (!userInputDate && !selectedDate) {
                return undefined;
            }
            if (userInputDate !== undefined) {
                return userInputDate;
            }
            if (selectedDate) {
                return formatDateValue(selectedDate);
            }
        }
    }]);

    return DateSelector;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], DateSelector$1.prototype, "handleDateFilterOptionsChange", null);
tslib_1.__decorate([decorators.autobind], DateSelector$1.prototype, "handleDateFieldChange", null);
tslib_1.__decorate([decorators.autobind], DateSelector$1.prototype, "handleDateBlur", null);
tslib_1.__decorate([decorators.autobind], DateSelector$1.prototype, "handleDatePickerChange", null);
tslib_1.__decorate([decorators.autobind], DateSelector$1.prototype, "handleDatePickerMonthChange", null);
function isValidDate(date) {
    if (!date) {
        return false;
    }
    return VALID_DATE_REGEX.test(date) && !isNaN(new Date(date).getTime());
}
function getDateFilterOption(filterValue, filterKey, filterMinKey, filterMaxKey) {
    if (filterKey === filterMaxKey) {
        return DateFilterOption.OnOrBefore;
    }
    if (filterKey === filterMinKey) {
        return DateFilterOption.OnOrAfter;
    }
    return filterValue;
}
function formatDateValue(date) {
    return date.toISOString().slice(0, 10);
}
var DateSelector$2 = withAppProvider()(DateSelector$1);

var FilterType;
(function (FilterType) {
    FilterType[FilterType["Select"] = 0] = "Select";
    FilterType[FilterType["TextField"] = 1] = "TextField";
    FilterType[FilterType["DateSelector"] = 2] = "DateSelector";
})(FilterType || (FilterType = {}));

var _jsxFileName$106 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ResourceList/components/FilterControl/components/FilterValueSelector/FilterValueSelector.js';
var FilterValueSelector$1 = function (_React$PureComponent) {
    _inherits(FilterValueSelector, _React$PureComponent);

    function FilterValueSelector() {
        _classCallCheck(this, FilterValueSelector);

        return _possibleConstructorReturn(this, (FilterValueSelector.__proto__ || Object.getPrototypeOf(FilterValueSelector)).apply(this, arguments));
    }

    _createClass(FilterValueSelector, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props$filter = this.props.filter,
                operatorText = _props$filter.operatorText,
                type = _props$filter.type;

            if (type === FilterType.DateSelector || !operatorText || typeof operatorText === 'string' || operatorText.length === 0) {
                return;
            }
            this.handleOperatorOptionChange(operatorText[0].key);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                filter = _props.filter,
                filterKey = _props.filterKey,
                value = _props.value,
                onChange = _props.onChange,
                onFilterKeyChange = _props.onFilterKeyChange,
                intl = _props.polaris.intl;
            var operatorText = filter.operatorText;

            var showOperatorOptions = filter.type !== FilterType.DateSelector && operatorText && typeof operatorText !== 'string';
            var operatorOptionsMarkup = showOperatorOptions ? React.createElement(Select$1, { label: filter.label, labelHidden: true, options: buildOperatorOptions(operatorText), value: filterKey, onChange: this.handleOperatorOptionChange, __self: this,
                __source: {
                    fileName: _jsxFileName$106,
                    lineNumber: 24
                }
            }) : null;
            var selectedFilterLabel = typeof operatorText === 'string' ? operatorText : '';
            switch (filter.type) {
                case FilterType.Select:
                    return React.createElement(
                        Stack$1,
                        { vertical: true, __self: this,
                            __source: {
                                fileName: _jsxFileName$106,
                                lineNumber: 28
                            }
                        },
                        operatorOptionsMarkup,
                        React.createElement(Select$1, { label: selectedFilterLabel, options: filter.options, placeholder: intl.translate('Polaris.ResourceList.FilterValueSelector.selectFilterValuePlaceholder'), value: value, onChange: onChange, __self: this,
                            __source: {
                                fileName: _jsxFileName$106,
                                lineNumber: 30
                            }
                        })
                    );
                case FilterType.TextField:
                    return React.createElement(
                        Stack$1,
                        { vertical: true, __self: this,
                            __source: {
                                fileName: _jsxFileName$106,
                                lineNumber: 33
                            }
                        },
                        operatorOptionsMarkup,
                        React.createElement(TextField$1, { label: selectedFilterLabel, value: value, type: filter.textFieldType, onChange: onChange, __self: this,
                            __source: {
                                fileName: _jsxFileName$106,
                                lineNumber: 35
                            }
                        })
                    );
                case FilterType.DateSelector:
                    return React.createElement(DateSelector$2, { dateOptionType: filter.dateOptionType, filterValue: value, filterKey: filterKey, filterMinKey: filter.minKey, filterMaxKey: filter.maxKey, onFilterValueChange: onChange, onFilterKeyChange: onFilterKeyChange, __self: this,
                        __source: {
                            fileName: _jsxFileName$106,
                            lineNumber: 38
                        }
                    });
                default:
                    return null;
            }
        }
    }, {
        key: 'handleOperatorOptionChange',
        value: function handleOperatorOptionChange(operatorKey) {
            var _props2 = this.props,
                value = _props2.value,
                onChange = _props2.onChange,
                onFilterKeyChange = _props2.onFilterKeyChange;

            onFilterKeyChange(operatorKey);
            if (!value) {
                return;
            }
            onChange(value);
        }
    }]);

    return FilterValueSelector;
}(React.PureComponent);
tslib_1.__decorate([decorators.autobind], FilterValueSelector$1.prototype, "handleOperatorOptionChange", null);
function buildOperatorOptions(operatorText) {
    if (!operatorText || typeof operatorText === 'string') {
        return [];
    }
    return operatorText.map(function (_ref) {
        var key = _ref.key,
            optionLabel = _ref.optionLabel;

        return { value: key, label: optionLabel };
    });
}
var FilterValueSelector$2 = withAppProvider()(FilterValueSelector$1);

var _jsxFileName$105 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ResourceList/components/FilterControl/components/FilterCreator/FilterCreator.js';
var FilterCreator$1 = function (_React$PureComponent) {
    _inherits(FilterCreator, _React$PureComponent);

    function FilterCreator() {
        _classCallCheck(this, FilterCreator);

        var _this = _possibleConstructorReturn(this, (FilterCreator.__proto__ || Object.getPrototypeOf(FilterCreator)).apply(this, arguments));

        _this.state = {
            popoverActive: false
        };
        _this.node = null;
        return _this;
    }

    _createClass(FilterCreator, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                filters = _props.filters,
                resourceName = _props.resourceName,
                disabled = _props.disabled,
                intl = _props.polaris.intl;
            var _state = this.state,
                popoverActive = _state.popoverActive,
                selectedFilter = _state.selectedFilter,
                selectedFilterKey = _state.selectedFilterKey,
                selectedFilterValue = _state.selectedFilterValue;

            var activator = React.createElement(
                Button$2,
                { onClick: this.togglePopover, disclosure: true, testID: 'FilterCreator-FilterActivator', disabled: disabled, onFocus: this.handleButtonFocus, __self: this,
                    __source: {
                        fileName: _jsxFileName$105,
                        lineNumber: 22
                    }
                },
                intl.translate('Polaris.ResourceList.FilterCreator.filterButtonLabel')
            );
            var filterOptions = filters.map(function (_ref) {
                var key = _ref.key,
                    label = _ref.label;
                return {
                    value: key,
                    label: label
                };
            });
            var filterValueSelectionMarkup = selectedFilter ? React.createElement(FilterValueSelector$2, { filter: selectedFilter, filterKey: selectedFilterKey, value: selectedFilterValue, onFilterKeyChange: this.handleFilterKeyChange, onChange: this.handleFilterValueChange, __self: this,
                __source: {
                    fileName: _jsxFileName$105,
                    lineNumber: 29
                }
            }) : null;
            var addFilterButtonMarkup = selectedFilter ? React.createElement(
                Button$2,
                { onClick: this.handleAddFilter, disabled: !this.canAddFilter, testID: 'FilterCreator-AddFilterButton', __self: this,
                    __source: {
                        fileName: _jsxFileName$105,
                        lineNumber: 30
                    }
                },
                intl.translate('Polaris.ResourceList.FilterCreator.addFilterButtonLabel')
            ) : null;
            return React.createElement(
                Popover$1,
                { active: popoverActive, activator: activator, onClose: this.togglePopover, sectioned: true, fullHeight: true, __self: this,
                    __source: {
                        fileName: _jsxFileName$105,
                        lineNumber: 33
                    }
                },
                React.createElement(
                    Form$1,
                    { onSubmit: this.handleAddFilter, __self: this,
                        __source: {
                            fileName: _jsxFileName$105,
                            lineNumber: 34
                        }
                    },
                    React.createElement(
                        FormLayout$1,
                        {
                            __self: this,
                            __source: {
                                fileName: _jsxFileName$105,
                                lineNumber: 35
                            }
                        },
                        React.createElement(Select$1, { label: intl.translate('Polaris.ResourceList.FilterCreator.showAllWhere', { resourceNamePlural: resourceName.plural.toLocaleLowerCase() }), placeholder: intl.translate('Polaris.ResourceList.FilterCreator.selectFilterKeyPlaceholder'), options: filterOptions, onChange: this.handleFilterKeyChange, value: selectedFilter && selectedFilter.key, __self: this,
                            __source: {
                                fileName: _jsxFileName$105,
                                lineNumber: 36
                            }
                        }),
                        filterValueSelectionMarkup,
                        addFilterButtonMarkup
                    )
                )
            );
        }
    }, {
        key: 'handleButtonFocus',
        value: function handleButtonFocus() {
            var event = arguments.length <= 0 ? undefined : arguments[0];
            if (!this.node && event) {
                this.node = event.target;
            }
        }
    }, {
        key: 'togglePopover',
        value: function togglePopover() {
            this.setState(function (_ref2) {
                var popoverActive = _ref2.popoverActive;
                return { popoverActive: !popoverActive };
            });
        }
    }, {
        key: 'handleFilterKeyChange',
        value: function handleFilterKeyChange(filterKey) {
            var filters = this.props.filters;

            var foundFilter = filters.find(function (filter) {
                var minKey = filter.minKey,
                    maxKey = filter.maxKey,
                    operatorText = filter.operatorText;

                if (minKey || maxKey) {
                    return filter.key === filterKey || minKey === filterKey || maxKey === filterKey;
                }
                if (operatorText && typeof operatorText !== 'string') {
                    return filter.key === filterKey || operatorText.filter(function (_ref3) {
                        var key = _ref3.key;
                        return key === filterKey;
                    }).length === 1;
                }
                return filter.key === filterKey;
            });
            if (!foundFilter) {
                return;
            }
            this.setState({
                selectedFilter: foundFilter,
                selectedFilterKey: filterKey,
                selectedFilterValue: undefined
            });
        }
    }, {
        key: 'handleFilterValueChange',
        value: function handleFilterValueChange(filterValue) {
            this.setState({ selectedFilterValue: filterValue });
        }
    }, {
        key: 'handleAddFilter',
        value: function handleAddFilter() {
            var onAddFilter = this.props.onAddFilter;
            var selectedFilterKey = this.state.selectedFilterKey;

            if (!onAddFilter || !this.canAddFilter || !selectedFilterKey) {
                return;
            }
            onAddFilter({
                key: selectedFilterKey,
                value: this.state.selectedFilterValue || ''
            });
            this.setState({
                popoverActive: false,
                selectedFilter: undefined,
                selectedFilterValue: undefined
            });
            if (this.node != null) {
                this.node.focus();
            }
        }
    }, {
        key: 'canAddFilter',
        get: function get$$1() {
            return Boolean(this.state.selectedFilter && this.state.selectedFilterKey && this.state.selectedFilterValue);
        }
    }]);

    return FilterCreator;
}(React.PureComponent);
tslib_1.__decorate([decorators.autobind], FilterCreator$1.prototype, "handleButtonFocus", null);
tslib_1.__decorate([decorators.autobind], FilterCreator$1.prototype, "togglePopover", null);
tslib_1.__decorate([decorators.autobind], FilterCreator$1.prototype, "handleFilterKeyChange", null);
tslib_1.__decorate([decorators.autobind], FilterCreator$1.prototype, "handleFilterValueChange", null);
tslib_1.__decorate([decorators.autobind], FilterCreator$1.prototype, "handleAddFilter", null);
var FilterCreator$2 = withAppProvider()(FilterCreator$1);

var styles$70 = {
  "AppliedFilters": "Polaris-ResourceList-FilterControl__AppliedFilters",
  "AppliedFilter": "Polaris-ResourceList-FilterControl__AppliedFilter",
};

var intl = new Intl(undefined);

var _React$createContext$2 = React.createContext({
    selectMode: false,
    resourceName: {
        singular: intl.translate('Polaris.ResourceList.defaultItemSingular'),
        plural: intl.translate('Polaris.ResourceList.defaultItemPlural')
    }
});
var Provider$2 = _React$createContext$2.Provider;
var Consumer$2 = _React$createContext$2.Consumer;

var _jsxFileName$104 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ResourceList/components/FilterControl/FilterControl.js';
var FilterControl$1 = function (_React$Component) {
    _inherits(FilterControl, _React$Component);

    function FilterControl() {
        _classCallCheck(this, FilterControl);

        return _possibleConstructorReturn(this, (FilterControl.__proto__ || Object.getPrototypeOf(FilterControl)).apply(this, arguments));
    }

    _createClass(FilterControl, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                searchValue = _props.searchValue,
                _props$appliedFilters = _props.appliedFilters,
                appliedFilters = _props$appliedFilters === undefined ? [] : _props$appliedFilters,
                additionalAction = _props.additionalAction,
                _props$focused = _props.focused,
                focused = _props$focused === undefined ? false : _props$focused,
                _props$filters = _props.filters,
                filters = _props$filters === undefined ? [] : _props$filters,
                onSearchBlur = _props.onSearchBlur,
                onSearchChange = _props.onSearchChange,
                intl = _props.polaris.intl,
                _props$context = _props.context,
                selectMode = _props$context.selectMode,
                resourceName = _props$context.resourceName;

            var textFieldLabel = intl.translate('Polaris.ResourceList.FilterControl.textFieldLabel', {
                resourceNamePlural: resourceName.plural.toLocaleLowerCase()
            });
            if (additionalAction) {
                additionalAction.disabled = selectMode;
            }
            var additionalActionButton = additionalAction && buttonsFrom(additionalAction) || null;
            var filterCreatorMarkup = filters.length > 0 ? React.createElement(FilterCreator$2, { resourceName: resourceName, filters: filters, onAddFilter: this.handleAddFilter, disabled: selectMode, __self: this,
                __source: {
                    fileName: _jsxFileName$104,
                    lineNumber: 21
                }
            }) : null;
            var appliedFiltersMarkup = appliedFilters.map(function (appliedFilter) {
                var activeFilterLabel = _this2.getFilterLabel(appliedFilter);
                var filterId = idFromFilter(appliedFilter);
                return React.createElement(
                    'li',
                    { className: styles$70.AppliedFilter, key: filterId, __self: _this2,
                        __source: {
                            fileName: _jsxFileName$104,
                            lineNumber: 25
                        }
                    },
                    React.createElement(
                        Tag$2,
                        { onRemove: _this2.getRemoveFilterCallback(filterId), disabled: selectMode, __self: _this2,
                            __source: {
                                fileName: _jsxFileName$104,
                                lineNumber: 26
                            }
                        },
                        activeFilterLabel
                    )
                );
            });
            var appliedFiltersWrapper = appliedFilters.length > 0 ? React.createElement(
                'ul',
                { className: styles$70.AppliedFilters, __self: this,
                    __source: {
                        fileName: _jsxFileName$104,
                        lineNumber: 31
                    }
                },
                appliedFiltersMarkup
            ) : null;
            return React.createElement(
                FormLayout$1,
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$104,
                        lineNumber: 32
                    }
                },
                React.createElement(TextField$1, { connectedLeft: filterCreatorMarkup, connectedRight: additionalActionButton, label: textFieldLabel, labelHidden: true, placeholder: textFieldLabel, prefix: React.createElement(Icon$2, { source: 'search', color: 'skyDark', __self: this,
                        __source: {
                            fileName: _jsxFileName$104,
                            lineNumber: 33
                        }
                    }), value: searchValue, onChange: onSearchChange, onBlur: onSearchBlur, focused: focused, disabled: selectMode, __self: this,
                    __source: {
                        fileName: _jsxFileName$104,
                        lineNumber: 33
                    }
                }),
                appliedFiltersWrapper
            );
        }
    }, {
        key: 'handleAddFilter',
        value: function handleAddFilter(newFilter) {
            var _props2 = this.props,
                onFiltersChange = _props2.onFiltersChange,
                _props2$appliedFilter = _props2.appliedFilters,
                appliedFilters = _props2$appliedFilter === undefined ? [] : _props2$appliedFilter;

            if (!onFiltersChange) {
                return;
            }
            var foundFilter = appliedFilters.find(function (appliedFilter) {
                return idFromFilter(appliedFilter) === idFromFilter(newFilter);
            });
            if (foundFilter) {
                return;
            }
            var newAppliedFilters = [].concat(_toConsumableArray(appliedFilters), [newFilter]);
            onFiltersChange(newAppliedFilters);
        }
    }, {
        key: 'getRemoveFilterCallback',
        value: function getRemoveFilterCallback(filterId) {
            var _this3 = this;

            return function () {
                _this3.handleRemoveFilter(filterId);
            };
        }
    }, {
        key: 'handleRemoveFilter',
        value: function handleRemoveFilter(filterId) {
            var _props3 = this.props,
                onFiltersChange = _props3.onFiltersChange,
                _props3$appliedFilter = _props3.appliedFilters,
                appliedFilters = _props3$appliedFilter === undefined ? [] : _props3$appliedFilter;

            if (!onFiltersChange) {
                return;
            }
            var foundIndex = appliedFilters.findIndex(function (appliedFilter) {
                return idFromFilter(appliedFilter) === filterId;
            });
            var newAppliedFilters = foundIndex >= 0 ? [].concat(_toConsumableArray(appliedFilters.slice(0, foundIndex)), _toConsumableArray(appliedFilters.slice(foundIndex + 1, appliedFilters.length))) : [].concat(_toConsumableArray(appliedFilters));
            onFiltersChange(newAppliedFilters);
        }
    }, {
        key: 'getFilterLabel',
        value: function getFilterLabel(appliedFilter) {
            var key = appliedFilter.key,
                value = appliedFilter.value,
                label = appliedFilter.label;

            if (label) {
                return label;
            }
            var _props$filters2 = this.props.filters,
                filters = _props$filters2 === undefined ? [] : _props$filters2;

            var filter = filters.find(function (filter) {
                var minKey = filter.minKey,
                    maxKey = filter.maxKey,
                    operatorText = filter.operatorText;

                if (minKey || maxKey) {
                    return filter.key === key || minKey === key || maxKey === key;
                }
                if (operatorText && typeof operatorText !== 'string') {
                    return filter.key === key || operatorText.filter(function (_ref) {
                        var operatorKey = _ref.key;
                        return operatorKey === key;
                    }).length === 1;
                }
                return filter.key === key;
            });
            if (!filter) {
                return value;
            }
            var filterOperatorLabel = findOperatorLabel(filter, appliedFilter);
            var filterLabelByType = this.findFilterLabelByType(filter, appliedFilter);
            if (!filterOperatorLabel) {
                return filter.label + ' ' + filterLabelByType;
            }
            return filter.label + ' ' + filterOperatorLabel + ' ' + filterLabelByType;
        }
    }, {
        key: 'findFilterLabelByType',
        value: function findFilterLabelByType(filter, appliedFilter) {
            var intl = this.props.polaris.intl;
            var appliedFilterValue = appliedFilter.value;

            if (filter.type === FilterType.Select) {
                var foundFilterOption = filter.options.find(function (option) {
                    return typeof option === 'string' ? option === appliedFilterValue : option.value === appliedFilterValue;
                });
                if (foundFilterOption) {
                    return typeof foundFilterOption === 'string' ? foundFilterOption : foundFilterOption.label;
                }
            }
            if (filter.type === FilterType.DateSelector) {
                if (filter.key === appliedFilter.key) {
                    var filterLabelKey = 'Polaris.ResourceList.DateSelector.FilterLabelForValue.' + appliedFilter.value;
                    return intl.translationKeyExists(filterLabelKey) ? intl.translate(filterLabelKey) : appliedFilter.value;
                }
                if (appliedFilter.key === filter.maxKey) {
                    return intl.translate('Polaris.ResourceList.DateSelector.FilterLabelForValue.on_or_before', {
                        date: formatDateForLabelDisplay(appliedFilter.value)
                    });
                }
                if (appliedFilter.key === filter.minKey) {
                    return intl.translate('Polaris.ResourceList.DateSelector.FilterLabelForValue.on_or_after', {
                        date: formatDateForLabelDisplay(appliedFilter.value)
                    });
                }
            }
            return appliedFilterValue;
        }
    }]);

    return FilterControl;
}(React.Component);
tslib_1.__decorate([decorators.autobind], FilterControl$1.prototype, "handleAddFilter", null);
tslib_1.__decorate([decorators.memoize()], FilterControl$1.prototype, "getRemoveFilterCallback", null);
function idFromFilter(appliedFilter) {
    return appliedFilter.key + '-' + appliedFilter.value;
}
function formatDateForLabelDisplay(date) {
    if (isNaN(new Date(date).getTime())) {
        return date;
    }
    return new Date(date.replace(/-/g, '/')).toLocaleDateString();
}
function findOperatorLabel(filter, appliedFilter) {
    var operatorText = filter.operatorText;

    if (filter.type === FilterType.DateSelector && (appliedFilter.key === filter.minKey || appliedFilter.key === filter.maxKey)) {
        return '';
    }
    if (!operatorText || typeof operatorText === 'string') {
        return operatorText;
    }
    var appliedOperator = operatorText.find(function (operator) {
        return operator.key === appliedFilter.key;
    });
    if (appliedOperator) {
        return appliedOperator.filterLabel || appliedOperator.optionLabel;
    }
}
var FilterControl$2 = compose(withAppProvider(), withContext$1(Consumer$2))(FilterControl$1);

var SELECT_ALL_ITEMS = 'All';

var styles$71 = {
  "CheckboxWrapper": "Polaris-ResourceList-Item__CheckboxWrapper",
  "Item": "Polaris-ResourceList-Item",
  "persistActions": "Polaris-ResourceList-Item--persistActions",
  "Actions": "Polaris-ResourceList-Item__Actions",
  "selected": "Polaris-ResourceList-Item--selected",
  "focused": "Polaris-ResourceList-Item--focused",
  "focusedInner": "Polaris-ResourceList-Item--focusedInner",
  "Link": "Polaris-ResourceList-Item__Link",
  "Button": "Polaris-ResourceList-Item__Button",
  "Container": "Polaris-ResourceList-Item__Container",
  "Owned": "Polaris-ResourceList-Item__Owned",
  "Handle": "Polaris-ResourceList-Item__Handle",
  "selectable": "Polaris-ResourceList-Item--selectable",
  "selectMode": "Polaris-ResourceList-Item--selectMode",
  "Media": "Polaris-ResourceList-Item__Media",
  "Content": "Polaris-ResourceList-Item__Content",
  "Disclosure": "Polaris-ResourceList-Item__Disclosure",
};

var _jsxFileName$108 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ResourceList/components/Item/Item.js';
var getUniqueCheckboxID = other.createUniqueIDFactory('ResourceListItemCheckbox');
var Item$15 = function (_React$PureComponent) {
    _inherits(Item, _React$PureComponent);

    function Item() {
        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));

        _this.state = {
            actionsMenuVisible: false,
            focused: false,
            focusedInner: false
        };
        _this.node = null;
        _this.checkboxId = getUniqueCheckboxID();
        return _this;
    }

    _createClass(Item, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                url = _props.url,
                media = _props.media,
                shortcutActions = _props.shortcutActions,
                ariaControls = _props.ariaControls,
                ariaExpanded = _props.ariaExpanded,
                _props$persistActions = _props.persistActions,
                persistActions = _props$persistActions === undefined ? false : _props$persistActions,
                intl = _props.polaris.intl,
                accessibilityLabel = _props.accessibilityLabel,
                _props$context = _props.context,
                selectable = _props$context.selectable,
                selectMode = _props$context.selectMode,
                loading = _props$context.loading;
            var _state = this.state,
                actionsMenuVisible = _state.actionsMenuVisible,
                focused = _state.focused,
                focusedInner = _state.focusedInner;

            var selected = this.isSelected();
            // let mediaMarkup: React.ReactNode = null;
            var ownedMarkup = null;
            var handleMarkup = null;
            var mediaMarkup = media ? React.createElement(
                'div',
                { className: styles$71.Media, testID: 'Media', __self: this,
                    __source: {
                        fileName: _jsxFileName$108,
                        lineNumber: 30
                    }
                },
                media
            ) : null;
            var checkboxAccessibilityLabel = accessibilityLabel || intl.translate('Polaris.Common.checkbox');
            if (selectable) {
                var label = selected ? intl.translate('Polaris.ResourceList.Item.deselectItem', {
                    accessibilityLabel: checkboxAccessibilityLabel
                }) : intl.translate('Polaris.ResourceList.Item.selectItem', {
                    accessibilityLabel: checkboxAccessibilityLabel
                });
                handleMarkup = React.createElement(
                    'div',
                    { className: styles$71.Handle, onClick: this.handleLargerSelectionArea, testID: 'LargerSelectionArea', __self: this,
                        __source: {
                            fileName: _jsxFileName$108,
                            lineNumber: 42
                        }
                    },
                    React.createElement(
                        'div',
                        { onClick: stopPropagation, className: styles$71.CheckboxWrapper, __self: this,
                            __source: {
                                fileName: _jsxFileName$108,
                                lineNumber: 43
                            }
                        },
                        React.createElement(Checkbox$2, { testID: 'Checkbox', id: this.checkboxId, label: label, labelHidden: true, onChange: this.handleSelection, checked: selected, disabled: loading, __self: this,
                            __source: {
                                fileName: _jsxFileName$108,
                                lineNumber: 44
                            }
                        })
                    )
                );
            }
            if (media || selectable) {
                ownedMarkup = React.createElement(
                    'div',
                    { className: styles$71.Owned, __self: this,
                        __source: {
                            fileName: _jsxFileName$108,
                            lineNumber: 49
                        }
                    },
                    handleMarkup,
                    mediaMarkup
                );
            }
            var className = styles.classNames(styles$71.Item, focused && styles$71.focused, selectable && styles$71.selectable, selected && styles$71.selected, selectMode && styles$71.selectMode, persistActions && styles$71.persistActions, focusedInner && styles$71.focusedInner);
            var actionsMarkup = null;
            var disclosureMarkup = null;
            if (shortcutActions) {
                if (persistActions) {
                    actionsMarkup = React.createElement(
                        'div',
                        { className: styles$71.Actions, onClick: stopPropagation, __self: this,
                            __source: {
                                fileName: _jsxFileName$108,
                                lineNumber: 59
                            }
                        },
                        React.createElement(
                            ButtonGroup$1,
                            {
                                __self: this,
                                __source: {
                                    fileName: _jsxFileName$108,
                                    lineNumber: 60
                                }
                            },
                            buttonsFrom(shortcutActions, { size: 'slim', plain: true })
                        )
                    );
                    disclosureMarkup = React.createElement(
                        'div',
                        { className: styles$71.Disclosure, onClick: stopPropagation, __self: this,
                            __source: {
                                fileName: _jsxFileName$108,
                                lineNumber: 64
                            }
                        },
                        React.createElement(
                            Popover$1,
                            { activator: React.createElement(Button$2, { 'aria-label': intl.translate('Polaris.ResourceList.Item.actionsDropdown'), onClick: this.handleActionsClick, plain: true, icon: 'horizontalDots', __self: this,
                                    __source: {
                                        fileName: _jsxFileName$108,
                                        lineNumber: 65
                                    }
                                }), onClose: this.handleCloseRequest, active: actionsMenuVisible, __self: this,
                                __source: {
                                    fileName: _jsxFileName$108,
                                    lineNumber: 65
                                }
                            },
                            React.createElement(ActionList$1, { items: shortcutActions, __self: this,
                                __source: {
                                    fileName: _jsxFileName$108,
                                    lineNumber: 66
                                }
                            })
                        )
                    );
                } else {
                    actionsMarkup = React.createElement(
                        'div',
                        { className: styles$71.Actions, onClick: stopPropagation, __self: this,
                            __source: {
                                fileName: _jsxFileName$108,
                                lineNumber: 71
                            }
                        },
                        React.createElement(
                            ButtonGroup$1,
                            { segmented: true, testID: 'ShortcutActions', __self: this,
                                __source: {
                                    fileName: _jsxFileName$108,
                                    lineNumber: 72
                                }
                            },
                            buttonsFrom(shortcutActions, { size: 'slim' })
                        )
                    );
                }
            }
            var content = children ? React.createElement(
                'div',
                { className: styles$71.Content, __self: this,
                    __source: {
                        fileName: _jsxFileName$108,
                        lineNumber: 78
                    }
                },
                children
            ) : null;
            var containerMarkup = React.createElement(
                'div',
                { testID: 'Item-Content', className: styles$71.Container, id: this.props.id, __self: this,
                    __source: {
                        fileName: _jsxFileName$108,
                        lineNumber: 79
                    }
                },
                ownedMarkup,
                content,
                actionsMarkup,
                disclosureMarkup
            );
            var accessibleMarkup = url ? React.createElement(UnstyledLink$2, { 'aria-describedby': this.props.id, 'aria-label': accessibilityLabel, className: styles$71.Link, url: url, onFocus: this.handleAnchorFocus, onBlur: this.handleFocusedBlur, __self: this,
                __source: {
                    fileName: _jsxFileName$108,
                    lineNumber: 85
                }
            }) : React.createElement('button', { className: styles$71.Button, 'aria-label': accessibilityLabel, 'aria-controls': ariaControls, 'aria-expanded': ariaExpanded, onClick: this.handleClick, onFocus: this.handleAnchorFocus, onBlur: this.handleFocusedBlur, __self: this,
                __source: {
                    fileName: _jsxFileName$108,
                    lineNumber: 85
                }
            });
            return React.createElement(
                'div',
                { ref: this.setNode, className: className, onClick: this.handleClick, onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseDown: this.handleMouseDown, onKeyUp: this.handleKeypress, testID: 'Item-Wrapper', __self: this,
                    __source: {
                        fileName: _jsxFileName$108,
                        lineNumber: 86
                    }
                },
                accessibleMarkup,
                containerMarkup
            );
        }
    }, {
        key: 'setNode',
        value: function setNode(node) {
            this.node = node;
        }
    }, {
        key: 'handleAnchorFocus',
        value: function handleAnchorFocus() {
            this.setState({ focused: true, focusedInner: false });
        }
    }, {
        key: 'handleFocusedBlur',
        value: function handleFocusedBlur() {
            this.setState({ focused: true, focusedInner: true });
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus() {
            this.setState({ focused: true });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            var isInside = this.compareEventNode(event);
            if (this.node == null || !this.node.contains(event.relatedTarget)) {
                this.setState({ focused: false });
            } else if (isInside) {
                this.setState({ focusedInner: true });
            }
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown() {
            this.setState({ focusedInner: true });
        }
    }, {
        key: 'handleLargerSelectionArea',
        value: function handleLargerSelectionArea(event) {
            stopPropagation(event);
            this.handleSelection(!this.isSelected());
        }
    }, {
        key: 'handleSelection',
        value: function handleSelection(value) {
            var _props2 = this.props,
                id = _props2.id,
                onSelectionChange = _props2.context.onSelectionChange;

            if (id == null || onSelectionChange == null) {
                return;
            }
            this.setState({ focused: true, focusedInner: true });
            onSelectionChange(value, id);
        }
    }, {
        key: 'handleClick',
        value: function handleClick(event) {
            var _props3 = this.props,
                id = _props3.id,
                onClick = _props3.onClick,
                url = _props3.url,
                selectMode = _props3.context.selectMode;

            var anchor = this.node && this.node.querySelector('a');
            if (selectMode) {
                this.handleLargerSelectionArea(event);
                return;
            }
            if (anchor === event.target) {
                return;
            }
            if (onClick) {
                onClick(id);
            }
            if (url && anchor) {
                anchor.click();
            }
        }
    }, {
        key: 'handleKeypress',
        value: function handleKeypress(event) {
            var _props4 = this.props,
                _props4$onClick = _props4.onClick,
                onClick = _props4$onClick === undefined ? other.noop : _props4$onClick,
                selectMode = _props4.context.selectMode;
            var key = event.key;

            if (key === 'Enter' && !selectMode) {
                onClick();
            }
        }
    }, {
        key: 'handleActionsClick',
        value: function handleActionsClick() {
            this.setState(function (_ref) {
                var actionsMenuVisible = _ref.actionsMenuVisible;
                return {
                    actionsMenuVisible: !actionsMenuVisible
                };
            });
        }
    }, {
        key: 'handleCloseRequest',
        value: function handleCloseRequest() {
            this.setState({ actionsMenuVisible: false });
        }
    }, {
        key: 'isSelected',
        value: function isSelected() {
            var _props5 = this.props,
                id = _props5.id,
                selectedItems = _props5.context.selectedItems;

            return selectedItems && (Array.isArray(selectedItems) && selectedItems.includes(id) || selectedItems === SELECT_ALL_ITEMS);
        }
    }, {
        key: 'compareEventNode',
        value: function compareEventNode(event) {
            return this.props.onClick ? event.target === this.node : event.target.tagName.toLowerCase() === 'a';
        }
    }]);

    return Item;
}(React.PureComponent);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "setNode", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleAnchorFocus", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleFocusedBlur", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleFocus", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleBlur", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleMouseDown", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleLargerSelectionArea", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleSelection", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleClick", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleKeypress", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleActionsClick", null);
tslib_1.__decorate([decorators.autobind], Item$15.prototype, "handleCloseRequest", null);
function stopPropagation(event) {
    event.stopPropagation();
}
var Item$16 = compose(withContext$1(Consumer$2), withAppProvider())(Item$15);

var styles$72 = {
  "FiltersWrapper": "Polaris-ResourceList__FiltersWrapper",
  "ResourceList": "Polaris-ResourceList",
  "HeaderOuterWrapper": "Polaris-ResourceList__HeaderOuterWrapper",
  "HeaderWrapper-disabled": "Polaris-ResourceList__HeaderWrapper--disabled",
  "HeaderWrapper-overlay": "Polaris-ResourceList__HeaderWrapper--overlay",
  "HeaderWrapper": "Polaris-ResourceList__HeaderWrapper",
  "HeaderWrapper-isSticky": "Polaris-ResourceList__HeaderWrapper--isSticky",
  "HeaderContentWrapper": "Polaris-ResourceList__HeaderContentWrapper",
  "HeaderWrapper-inSelectMode": "Polaris-ResourceList__HeaderWrapper--inSelectMode",
  "SortWrapper": "Polaris-ResourceList__SortWrapper",
  "HeaderWrapper-hasSelect": "Polaris-ResourceList__HeaderWrapper--hasSelect",
  "HeaderWrapper-hasSort": "Polaris-ResourceList__HeaderWrapper--hasSort",
  "SortLabel": "Polaris-ResourceList__SortLabel",
  "HeaderTitleWrapper": "Polaris-ResourceList__HeaderTitleWrapper",
  "BulkActionsWrapper": "Polaris-ResourceList__BulkActionsWrapper",
  "CheckableButtonWrapper": "Polaris-ResourceList__CheckableButtonWrapper",
  "SelectButtonWrapper": "Polaris-ResourceList__SelectButtonWrapper",
  "EmptySearchResultWrapper": "Polaris-ResourceList__EmptySearchResultWrapper",
  "ResourceListWrapper": "Polaris-ResourceList__ResourceListWrapper",
  "ItemWrapper": "Polaris-ResourceList__ItemWrapper",
  "ItemWrapper-isLoading": "Polaris-ResourceList__ItemWrapper--isLoading",
  "SpinnerContainer": "Polaris-ResourceList__SpinnerContainer",
  "LoadingOverlay": "Polaris-ResourceList__LoadingOverlay",
  "DisabledPointerEvents": "Polaris-ResourceList__DisabledPointerEvents",
};

var _jsxFileName$99 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ResourceList/ResourceList.js';
var SMALL_SCREEN_WIDTH = 458;
var SMALL_SPINNER_HEIGHT = 28;
var LARGE_SPINNER_HEIGHT = 45;
var getUniqueID$10 = other.createUniqueIDFactory('Select');
var ResourceList$1 = function (_React$Component) {
    _inherits(ResourceList, _React$Component);

    function ResourceList(props) {
        _classCallCheck(this, ResourceList);

        var _this = _possibleConstructorReturn(this, (ResourceList.__proto__ || Object.getPrototypeOf(ResourceList)).call(this, props));

        _this.state = {
            selectMode: false,
            loadingPosition: 0,
            listNode: null
        };
        _this.listRef = React.createRef();
        var intl = props.polaris.intl;

        _this.defaultResourceName = {
            singular: intl.translate('Polaris.ResourceList.defaultItemSingular'),
            plural: intl.translate('Polaris.ResourceList.defaultItemPlural')
        };
        return _this;
    }

    _createClass(ResourceList, [{
        key: 'componentWillReceiveProps',

        // eslint-disable-next-line react/no-deprecated
        value: function componentWillReceiveProps(nextProps) {
            var selectedItems = this.props.selectedItems;

            if (selectedItems && selectedItems.length > 0 && (!nextProps.selectedItems || nextProps.selectedItems.length === 0) && !isSmallScreen()) {
                this.setState({ selectMode: false });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.setState({
                listNode: this.listRef.current
            }, function () {
                if (_this2.props.loading) {
                    _this2.setLoadingPosition();
                }
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.loading && !prevProps.loading) {
                this.setLoadingPosition();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                items = _props.items,
                promotedBulkActions = _props.promotedBulkActions,
                bulkActions = _props.bulkActions,
                filterControl = _props.filterControl,
                loading = _props.loading,
                _props$showHeader = _props.showHeader,
                showHeader = _props$showHeader === undefined ? false : _props$showHeader,
                sortOptions = _props.sortOptions,
                sortValue = _props.sortValue,
                onSortChange = _props.onSortChange,
                intl = _props.polaris.intl;
            var _state = this.state,
                selectMode = _state.selectMode,
                loadingPosition = _state.loadingPosition,
                listNode = _state.listNode;

            var itemsExist = items.length > 0;
            var filterControlMarkup = filterControl ? React.createElement(
                'div',
                { className: styles$72.FiltersWrapper, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 177
                    }
                },
                filterControl
            ) : null;
            var bulkActionsMarkup = this.selectable ? React.createElement(
                'div',
                { className: styles$72.BulkActionsWrapper, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 178
                    }
                },
                React.createElement(BulkActions$2, { label: this.bulkActionsLabel, accessibilityLabel: this.bulkActionsAccessibilityLabel, selected: this.bulkSelectState, onToggleAll: this.handleToggleAll, selectMode: selectMode, onSelectModeToggle: this.handleSelectMode, promotedActions: promotedBulkActions, paginatedSelectAllAction: this.paginatedSelectAllAction, paginatedSelectAllText: this.paginatedSelectAllText, actions: bulkActions, disabled: loading, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 179
                    }
                }),
                React.createElement(EventListener$1, { event: 'resize', handler: this.handleResize, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 180
                    }
                })
            ) : null;
            var selectId = getUniqueID$10();
            var sortingLabelMarkup = React.createElement(
                'label',
                { className: styles$72.SortLabel, htmlFor: selectId, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 183
                    }
                },
                intl.translate('Polaris.ResourceList.sortingLabel')
            );
            var sortingSelectMarkup = sortOptions && sortOptions.length > 0 ? React.createElement(
                'div',
                { className: styles$72.SortWrapper, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 186
                    }
                },
                sortingLabelMarkup,
                React.createElement(Select$1, { label: intl.translate('Polaris.ResourceList.sortingLabel'), labelHidden: true, options: sortOptions, onChange: onSortChange, value: sortValue, disabled: selectMode, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 188
                    }
                })
            ) : null;
            var headerTitleMarkup = React.createElement(
                'div',
                { className: styles$72.HeaderTitleWrapper, testID: 'headerTitleWrapper', __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 190
                    }
                },
                this.headerTitle
            );
            var selectButtonMarkup = this.selectable ? React.createElement(
                'div',
                { className: styles$72.SelectButtonWrapper, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 193
                    }
                },
                React.createElement(
                    Button$2,
                    { disabled: selectMode, icon: selectIcon
                        // eslint-disable-next-line react/jsx-no-bind
                        , onClick: this.handleSelectMode.bind(this, true), __self: this,
                        __source: {
                            fileName: _jsxFileName$99,
                            lineNumber: 194
                        }
                    },
                    intl.translate('Polaris.ResourceList.selectButtonText')
                )
            ) : null;
            var checkableButtonMarkup = this.selectable ? React.createElement(
                'div',
                { className: styles$72.CheckableButtonWrapper, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 200
                    }
                },
                React.createElement(CheckableButton$2, { accessibilityLabel: this.bulkActionsAccessibilityLabel, label: this.headerTitle, onToggleAll: this.handleToggleAll, plain: true, disabled: loading, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 201
                    }
                })
            ) : null;
            var needsHeader = this.selectable || sortOptions && sortOptions.length > 0;
            var headerWrapperOverlay = loading ? React.createElement('div', { className: styles$72['HeaderWrapper-overlay'], __self: this,
                __source: {
                    fileName: _jsxFileName$99,
                    lineNumber: 204
                }
            }) : null;
            var headerMarkup = (showHeader || needsHeader) && React.createElement(
                'div',
                { className: styles$72.HeaderOuterWrapper, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 205
                    }
                },
                React.createElement(
                    Sticky$1,
                    { boundingElement: listNode, __self: this,
                        __source: {
                            fileName: _jsxFileName$99,
                            lineNumber: 206
                        }
                    },
                    function (isSticky) {
                        var headerClassName = styles.classNames(styles$72.HeaderWrapper, sortOptions && sortOptions.length > 0 && styles$72['HeaderWrapper-hasSort'], _this3.selectable && styles$72['HeaderWrapper-hasSelect'], loading && styles$72['HeaderWrapper-disabled'], _this3.selectable && selectMode && styles$72['HeaderWrapper-inSelectMode'], isSticky && styles$72['HeaderWrapper-isSticky']);
                        return React.createElement(
                            'div',
                            { className: headerClassName, testID: 'ResourceList-Header', __self: _this3,
                                __source: {
                                    fileName: _jsxFileName$99,
                                    lineNumber: 213
                                }
                            },
                            headerWrapperOverlay,
                            React.createElement(
                                'div',
                                { className: styles$72.HeaderContentWrapper, __self: _this3,
                                    __source: {
                                        fileName: _jsxFileName$99,
                                        lineNumber: 215
                                    }
                                },
                                headerTitleMarkup,
                                checkableButtonMarkup,
                                sortingSelectMarkup,
                                selectButtonMarkup
                            ),
                            bulkActionsMarkup
                        );
                    }
                )
            );
            var emptyStateMarkup = filterControl && !itemsExist && !loading ? React.createElement(
                'div',
                { className: styles$72.EmptySearchResultWrapper, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 226
                    }
                },
                React.createElement(EmptySearchResult$2, Object.assign({}, this.emptySearchResultText, { withIllustration: true, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 227
                    }
                }))
            ) : null;
            var defaultTopPadding = 8;
            var topPadding = loadingPosition > 0 ? loadingPosition : defaultTopPadding;
            var spinnerStyle = { paddingTop: topPadding + 'px' };
            var spinnerSize = items.length < 2 ? 'small' : 'large';
            var loadingOverlay = loading ? React.createElement(
                React.Fragment,
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 233
                    }
                },
                React.createElement(
                    'div',
                    { className: styles$72.SpinnerContainer, style: spinnerStyle, __self: this,
                        __source: {
                            fileName: _jsxFileName$99,
                            lineNumber: 234
                        }
                    },
                    React.createElement(Spinner$2, { size: spinnerSize, accessibilityLabel: 'Items are loading', __self: this,
                        __source: {
                            fileName: _jsxFileName$99,
                            lineNumber: 235
                        }
                    })
                ),
                React.createElement('div', { className: styles$72.LoadingOverlay, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 237
                    }
                })
            ) : null;
            var className = styles.classNames(styles$72.ItemWrapper, loading && styles$72['ItemWrapper-isLoading']);
            var loadingWithoutItemsMarkup = loading && !itemsExist ? React.createElement(
                'div',
                { className: className, tabIndex: -1, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 240
                    }
                },
                loadingOverlay
            ) : null;
            var resourceListClassName = styles.classNames(styles$72.ResourceList, loading && styles$72.disabledPointerEvents);
            var listMarkup = itemsExist ? React.createElement(
                'ul',
                { className: resourceListClassName, ref: this.listRef, 'aria-live': 'polite', 'aria-busy': loading, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 244
                    }
                },
                loadingOverlay,
                items.map(this.renderItem)
            ) : emptyStateMarkup;
            return React.createElement(
                Provider$2,
                { value: this.getContext, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 248
                    }
                },
                React.createElement(
                    'div',
                    { className: styles$72.ResourceListWrapper, __self: this,
                        __source: {
                            fileName: _jsxFileName$99,
                            lineNumber: 249
                        }
                    },
                    filterControlMarkup,
                    headerMarkup,
                    listMarkup,
                    loadingWithoutItemsMarkup
                )
            );
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            var selectedItems = this.props.selectedItems;
            var selectMode = this.state.selectMode;

            if (selectedItems && selectedItems.length === 0 && selectMode && !isSmallScreen()) {
                this.handleSelectMode(false);
            }
        }
    }, {
        key: 'setLoadingPosition',
        value: function setLoadingPosition() {
            var listNode = this.state.listNode;

            if (listNode != null) {
                if (typeof window === 'undefined') {
                    return;
                }
                var overlay = listNode.getBoundingClientRect();
                var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                var overflow = viewportHeight - overlay.height;
                var spinnerHeight = this.props.items.length === 1 ? SMALL_SPINNER_HEIGHT : LARGE_SPINNER_HEIGHT;
                var spinnerPosition = overflow > 0 ? (overlay.height - spinnerHeight) / 2 : (viewportHeight - overlay.top - spinnerHeight) / 2;
                this.setState({ loadingPosition: spinnerPosition });
            }
        }
    }, {
        key: 'handleSelectAllItemsInStore',
        value: function handleSelectAllItemsInStore() {
            var _props2 = this.props,
                onSelectionChange = _props2.onSelectionChange,
                selectedItems = _props2.selectedItems,
                items = _props2.items,
                _props2$idForItem = _props2.idForItem,
                idForItem = _props2$idForItem === undefined ? defaultIdForItem : _props2$idForItem;

            var newlySelectedItems = selectedItems === SELECT_ALL_ITEMS ? getAllItemsOnPage(items, idForItem) : SELECT_ALL_ITEMS;
            if (onSelectionChange) {
                onSelectionChange(newlySelectedItems);
            }
        }
    }, {
        key: 'renderItem',
        value: function renderItem(item, index) {
            var _props3 = this.props,
                renderItem = _props3.renderItem,
                _props3$idForItem = _props3.idForItem,
                idForItem = _props3$idForItem === undefined ? defaultIdForItem : _props3$idForItem,
                loading = _props3.loading;

            var id = idForItem(item, index);
            var tabIndex = loading ? -1 : 0;
            return React.createElement(
                'li',
                { key: id, className: styles$72.ItemWrapper, tabIndex: tabIndex, __self: this,
                    __source: {
                        fileName: _jsxFileName$99,
                        lineNumber: 298
                    }
                },
                renderItem(item, id)
            );
        }
    }, {
        key: 'handleSelectionChange',
        value: function handleSelectionChange(selected, id) {
            var _props4 = this.props,
                onSelectionChange = _props4.onSelectionChange,
                selectedItems = _props4.selectedItems,
                items = _props4.items,
                _props4$idForItem = _props4.idForItem,
                idForItem = _props4$idForItem === undefined ? defaultIdForItem : _props4$idForItem;

            if (selectedItems == null || onSelectionChange == null) {
                return;
            }
            var newlySelectedItems = selectedItems === SELECT_ALL_ITEMS ? getAllItemsOnPage(items, idForItem) : [].concat(_toConsumableArray(selectedItems));
            if (selected) {
                newlySelectedItems.push(id);
            } else {
                newlySelectedItems.splice(newlySelectedItems.indexOf(id), 1);
            }
            if (newlySelectedItems.length === 0 && !isSmallScreen()) {
                this.handleSelectMode(false);
            } else if (newlySelectedItems.length > 0) {
                this.handleSelectMode(true);
            }
            if (onSelectionChange) {
                onSelectionChange(newlySelectedItems);
            }
        }
    }, {
        key: 'handleSelectMode',
        value: function handleSelectMode(selectMode) {
            var onSelectionChange = this.props.onSelectionChange;

            this.setState({ selectMode: selectMode });
            if (!selectMode && onSelectionChange) {
                onSelectionChange([]);
            }
        }
    }, {
        key: 'handleToggleAll',
        value: function handleToggleAll() {
            var _props5 = this.props,
                onSelectionChange = _props5.onSelectionChange,
                selectedItems = _props5.selectedItems,
                items = _props5.items,
                _props5$idForItem = _props5.idForItem,
                idForItem = _props5$idForItem === undefined ? defaultIdForItem : _props5$idForItem;

            var newlySelectedItems = [];
            if (Array.isArray(selectedItems) && selectedItems.length === items.length || selectedItems === SELECT_ALL_ITEMS) {
                newlySelectedItems = [];
            } else {
                newlySelectedItems = items.map(function (item, index) {
                    var id = idForItem(item, index);
                    return id;
                });
            }
            if (newlySelectedItems.length === 0 && !isSmallScreen()) {
                this.handleSelectMode(false);
            } else if (newlySelectedItems.length > 0) {
                this.handleSelectMode(true);
            }
            if (onSelectionChange) {
                onSelectionChange(newlySelectedItems);
            }
        }
    }, {
        key: 'selectable',
        get: function get$$1() {
            var _props6 = this.props,
                promotedBulkActions = _props6.promotedBulkActions,
                bulkActions = _props6.bulkActions;

            return Boolean(promotedBulkActions && promotedBulkActions.length > 0 || bulkActions && bulkActions.length > 0);
        }
    }, {
        key: 'bulkSelectState',
        get: function get$$1() {
            var _props7 = this.props,
                selectedItems = _props7.selectedItems,
                items = _props7.items;

            var selectState = 'indeterminate';
            if (!selectedItems || Array.isArray(selectedItems) && selectedItems.length === 0) {
                selectState = false;
            } else if (selectedItems === SELECT_ALL_ITEMS || Array.isArray(selectedItems) && selectedItems.length === items.length) {
                selectState = true;
            }
            return selectState;
        }
    }, {
        key: 'headerTitle',
        get: function get$$1() {
            var _props8 = this.props,
                _props8$resourceName = _props8.resourceName,
                resourceName = _props8$resourceName === undefined ? this.defaultResourceName : _props8$resourceName,
                items = _props8.items,
                intl = _props8.polaris.intl,
                loading = _props8.loading;

            var itemsCount = items.length;
            var resource = itemsCount === 1 && !loading ? resourceName.singular : resourceName.plural;
            var headerTitleMarkup = loading ? intl.translate('Polaris.ResourceList.loading', { resource: resource }) : intl.translate('Polaris.ResourceList.showing', {
                itemsCount: itemsCount,
                resource: resource
            });
            return headerTitleMarkup;
        }
    }, {
        key: 'bulkActionsLabel',
        get: function get$$1() {
            var _props9 = this.props,
                _props9$selectedItems = _props9.selectedItems,
                selectedItems = _props9$selectedItems === undefined ? [] : _props9$selectedItems,
                items = _props9.items,
                intl = _props9.polaris.intl;

            var selectedItemsCount = selectedItems === SELECT_ALL_ITEMS ? items.length + '+' : selectedItems.length;
            return intl.translate('Polaris.ResourceList.selected', {
                selectedItemsCount: selectedItemsCount
            });
        }
    }, {
        key: 'bulkActionsAccessibilityLabel',
        get: function get$$1() {
            var _props10 = this.props,
                _props10$resourceName = _props10.resourceName,
                resourceName = _props10$resourceName === undefined ? this.defaultResourceName : _props10$resourceName,
                _props10$selectedItem = _props10.selectedItems,
                selectedItems = _props10$selectedItem === undefined ? [] : _props10$selectedItem,
                items = _props10.items,
                intl = _props10.polaris.intl;

            var selectedItemsCount = selectedItems.length;
            var totalItemsCount = items.length;
            var allSelected = selectedItemsCount === totalItemsCount;
            if (totalItemsCount === 1 && allSelected) {
                return intl.translate('Polaris.ResourceList.a11yCheckboxDeselectAllSingle', { resourceNameSingular: resourceName.singular });
            } else if (totalItemsCount === 1) {
                return intl.translate('Polaris.ResourceList.a11yCheckboxSelectAllSingle', {
                    resourceNameSingular: resourceName.singular
                });
            } else if (allSelected) {
                return intl.translate('Polaris.ResourceList.a11yCheckboxDeselectAllMultiple', {
                    itemsLength: items.length,
                    resourceNamePlural: resourceName.plural
                });
            } else {
                return intl.translate('Polaris.ResourceList.a11yCheckboxSelectAllMultiple', {
                    itemsLength: items.length,
                    resourceNamePlural: resourceName.plural
                });
            }
        }
    }, {
        key: 'paginatedSelectAllText',
        get: function get$$1() {
            var _props11 = this.props,
                hasMoreItems = _props11.hasMoreItems,
                selectedItems = _props11.selectedItems,
                items = _props11.items,
                _props11$resourceName = _props11.resourceName,
                resourceName = _props11$resourceName === undefined ? this.defaultResourceName : _props11$resourceName,
                intl = _props11.polaris.intl;

            if (!this.selectable || !hasMoreItems) {
                return;
            }
            if (selectedItems === SELECT_ALL_ITEMS) {
                return intl.translate('Polaris.ResourceList.allItemsSelected', {
                    itemsLength: items.length,
                    resourceNamePlural: resourceName.plural
                });
            }
        }
    }, {
        key: 'paginatedSelectAllAction',
        get: function get$$1() {
            var _props12 = this.props,
                hasMoreItems = _props12.hasMoreItems,
                selectedItems = _props12.selectedItems,
                items = _props12.items,
                _props12$resourceName = _props12.resourceName,
                resourceName = _props12$resourceName === undefined ? this.defaultResourceName : _props12$resourceName,
                intl = _props12.polaris.intl;

            if (!this.selectable || !hasMoreItems) {
                return;
            }
            var actionText = selectedItems === SELECT_ALL_ITEMS ? intl.translate('Polaris.Common.undo') : intl.translate('Polaris.ResourceList.selectAllItems', {
                itemsLength: items.length,
                resourceNamePlural: resourceName.plural
            });
            return {
                content: actionText,
                onAction: this.handleSelectAllItemsInStore
            };
        }
    }, {
        key: 'emptySearchResultText',
        get: function get$$1() {
            var _props13 = this.props,
                intl = _props13.polaris.intl,
                _props13$resourceName = _props13.resourceName,
                resourceName = _props13$resourceName === undefined ? this.defaultResourceName : _props13$resourceName;

            return {
                title: intl.translate('Polaris.ResourceList.emptySearchResultTitle', {
                    resourceNamePlural: resourceName.plural
                }),
                description: intl.translate('Polaris.ResourceList.emptySearchResultDescription')
            };
        }
    }, {
        key: 'getContext',
        get: function get$$1() {
            var _props14 = this.props,
                selectedItems = _props14.selectedItems,
                _props14$resourceName = _props14.resourceName,
                resourceName = _props14$resourceName === undefined ? this.defaultResourceName : _props14$resourceName,
                loading = _props14.loading;
            var selectMode = this.state.selectMode;

            return {
                selectable: this.selectable,
                selectedItems: selectedItems,
                selectMode: selectMode,
                resourceName: resourceName,
                loading: loading,
                onSelectionChange: this.handleSelectionChange
            };
        }
    }]);

    return ResourceList;
}(React.Component);
ResourceList$1.Item = Item$16;
ResourceList$1.FilterControl = FilterControl$2;
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "bulkSelectState", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "headerTitle", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "bulkActionsLabel", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "bulkActionsAccessibilityLabel", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "paginatedSelectAllText", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "paginatedSelectAllAction", null);
tslib_1.__decorate([decorators.debounce(50), decorators.autobind], ResourceList$1.prototype, "handleResize", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "setLoadingPosition", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "handleSelectAllItemsInStore", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "renderItem", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "handleSelectionChange", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "handleSelectMode", null);
tslib_1.__decorate([decorators.autobind], ResourceList$1.prototype, "handleToggleAll", null);
function getAllItemsOnPage(items, idForItem) {
    return items.map(function (item, index) {
        return idForItem(item, index);
    });
}
function defaultIdForItem(item, index) {
    return item.hasOwnProperty('id') ? item.id : index.toString();
}
function isSmallScreen() {
    return typeof window === 'undefined' ? false : window.innerWidth <= SMALL_SCREEN_WIDTH;
}
withAppProvider()(ResourceList$1);

// eslint-disable-next-line shopify/strict-component-boundaries

var _jsxFileName$110 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Sticky/Sticky.js';
var Sticky$1 = function (_React$Component) {
    _inherits(Sticky, _React$Component);

    function Sticky() {
        _classCallCheck(this, Sticky);

        var _this = _possibleConstructorReturn(this, (Sticky.__proto__ || Object.getPrototypeOf(Sticky)).apply(this, arguments));

        _this.state = {
            isSticky: false,
            style: {}
        };
        _this.placeHolderNode = null;
        _this.stickyNode = null;
        return _this;
    }

    _createClass(Sticky, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var stickyManager = this.context.polaris.stickyManager;
            var _props = this.props,
                boundingElement = _props.boundingElement,
                offset = _props.offset,
                disableWhenStacked = _props.disableWhenStacked;

            stickyManager.registerStickyItem({
                stickyNode: this.stickyNode,
                placeHolderNode: this.placeHolderNode,
                handlePositioning: this.handlePositioning,
                offset: offset,
                boundingElement: boundingElement,
                disableWhenStacked: disableWhenStacked
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var stickyManager = this.context.polaris.stickyManager;

            stickyManager.unregisterStickyItem(this.stickyNode);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                style = _state.style,
                isSticky = _state.isSticky;
            var children = this.props.children;

            var childrenContent = typeof children === 'function' ? children(isSticky) : children;
            return React.createElement(
                'div',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$110,
                        lineNumber: 36
                    }
                },
                React.createElement('div', { ref: this.setPlaceHolderNode, __self: this,
                    __source: {
                        fileName: _jsxFileName$110,
                        lineNumber: 37
                    }
                }),
                React.createElement(
                    'div',
                    { ref: this.setStickyNode, style: style, __self: this,
                        __source: {
                            fileName: _jsxFileName$110,
                            lineNumber: 38
                        }
                    },
                    childrenContent
                )
            );
        }
    }, {
        key: 'setPlaceHolderNode',
        value: function setPlaceHolderNode(node) {
            this.placeHolderNode = node;
        }
    }, {
        key: 'setStickyNode',
        value: function setStickyNode(node) {
            this.stickyNode = node;
        }
    }, {
        key: 'handlePositioning',
        value: function handlePositioning(stick) {
            var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var left = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var isSticky = this.state.isSticky;

            if (stick && !isSticky || !stick && isSticky) {
                this.adjustPlaceHolderNode(stick);
                this.setState({ isSticky: !isSticky });
            }
            var style = stick ? {
                position: 'fixed',
                top: top,
                left: left,
                width: width
            } : {};
            this.setState({ style: style });
        }
    }, {
        key: 'adjustPlaceHolderNode',
        value: function adjustPlaceHolderNode(add) {
            if (this.placeHolderNode && this.stickyNode) {
                this.placeHolderNode.style.paddingBottom = add ? geometry.getRectForNode(this.stickyNode).height + 'px' : '0px';
            }
        }
    }]);

    return Sticky;
}(React.Component);

Sticky$1.contextTypes = polarisAppProviderContextTypes;
tslib_1.__decorate([decorators.autobind], Sticky$1.prototype, "setPlaceHolderNode", null);
tslib_1.__decorate([decorators.autobind], Sticky$1.prototype, "setStickyNode", null);
tslib_1.__decorate([decorators.autobind], Sticky$1.prototype, "handlePositioning", null);
tslib_1.__decorate([decorators.autobind], Sticky$1.prototype, "adjustPlaceHolderNode", null);

var styles$73 = {
  "Tabs": "Polaris-Tabs",
  "fitted": "Polaris-Tabs--fitted",
  "TabContainer": "Polaris-Tabs__TabContainer",
  "Tab": "Polaris-Tabs__Tab",
  "Title": "Polaris-Tabs__Title",
  "fillSpace": "Polaris-Tabs--fillSpace",
  "Tab-selected": "Polaris-Tabs__Tab--selected",
  "Panel": "Polaris-Tabs__Panel",
  "List": "Polaris-Tabs__List",
  "Item": "Polaris-Tabs__Item",
  "DisclosureTab": "Polaris-Tabs__DisclosureTab",
  "DisclosureTab-visible": "Polaris-Tabs__DisclosureTab--visible",
  "DisclosureActivator": "Polaris-Tabs__DisclosureActivator",
  "TabMeasurer": "Polaris-Tabs__TabMeasurer",
};

var _jsxFileName$112 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Tabs/components/Item/Item.js';
var Item$18 = function (_React$PureComponent) {
    _inherits(Item, _React$PureComponent);

    function Item() {
        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));

        _this.focusedNode = null;
        return _this;
    }

    _createClass(Item, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var focusedNode = this.focusedNode;
            var focused = this.props.focused;

            if (focusedNode && focusedNode instanceof HTMLElement && focused) {
                focusedNode.focus();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var focusedNode = this.focusedNode;
            var focused = this.props.focused;

            if (focusedNode && focusedNode instanceof HTMLElement && focused) {
                focusedNode.focus();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                panelID = _props.panelID,
                children = _props.children,
                url = _props.url,
                accessibilityLabel = _props.accessibilityLabel,
                _props$onClick = _props.onClick,
                onClick = _props$onClick === undefined ? other.noop : _props$onClick;

            var sharedProps = {
                id: id,
                ref: this.setFocusedNode,
                onClick: onClick,
                className: styles$73.Item,
                'aria-controls': panelID,
                'aria-selected': false,
                'aria-label': accessibilityLabel
            };
            var markup = url ? React.createElement(UnstyledLink$2, Object.assign({ url: url }, sharedProps), children) : React.createElement(
                'button',
                Object.assign({}, sharedProps, { type: 'button', __self: this,
                    __source: {
                        fileName: _jsxFileName$112,
                        lineNumber: 37
                    }
                }),
                children
            );
            return React.createElement(
                'li',
                { role: 'presentation', __self: this,
                    __source: {
                        fileName: _jsxFileName$112,
                        lineNumber: 40
                    }
                },
                markup
            );
        }
    }, {
        key: 'setFocusedNode',
        value: function setFocusedNode(node) {
            this.focusedNode = node;
        }
    }]);

    return Item;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], Item$18.prototype, "setFocusedNode", null);

var _jsxFileName$113 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Tabs/components/List/List.js';
var List$3 = function (_React$PureComponent) {
    _inherits(List, _React$PureComponent);

    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                focusIndex = _props.focusIndex,
                disclosureTabs = _props.disclosureTabs,
                _props$onClick = _props.onClick,
                onClick = _props$onClick === undefined ? other.noop : _props$onClick;

            var tabs = disclosureTabs.map(function (_a, index) {
                var id = _a.id,
                    content = _a.content,
                    tabProps = tslib_1.__rest(_a, ["id", "content"]);

                return React.createElement(
                    Item$18,
                    Object.assign({}, tabProps, { key: id, id: id, focused: index === focusIndex
                        // eslint-disable-next-line react/jsx-no-bind
                        , onClick: onClick.bind(null, id), __self: _this2,
                        __source: {
                            fileName: _jsxFileName$113,
                            lineNumber: 12
                        }
                    }),
                    content
                );
            });
            return React.createElement(
                'ul',
                { className: styles$73.List, onKeyDown: handleKeyDown$2, onKeyUp: this.handleKeypress, __self: this,
                    __source: {
                        fileName: _jsxFileName$113,
                        lineNumber: 18
                    }
                },
                tabs
            );
        }
    }, {
        key: 'handleKeypress',
        value: function handleKeypress(event) {
            var _props$onKeyPress = this.props.onKeyPress,
                onKeyPress = _props$onKeyPress === undefined ? other.noop : _props$onKeyPress;

            onKeyPress(event);
        }
    }]);

    return List;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], List$3.prototype, "handleKeypress", null);
function handleKeyDown$2(event) {
    var key = event.key;

    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
        event.preventDefault();
        event.stopPropagation();
    }
}

var _jsxFileName$114 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Tabs/components/Panel/Panel.js';
function Panel$1(_ref) {
  var id = _ref.id,
      tabID = _ref.tabID,
      children = _ref.children;

  return React.createElement(
    'div',
    { className: styles$73.Panel, id: id, role: 'tabpanel', 'aria-labelledby': tabID, tabIndex: -1, __self: this,
      __source: {
        fileName: _jsxFileName$114,
        lineNumber: 4
      }
    },
    children
  );
}

var _jsxFileName$115 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Tabs/components/Tab/Tab.js';
var Tab$1 = function (_React$PureComponent) {
    _inherits(Tab, _React$PureComponent);

    function Tab() {
        _classCallCheck(this, Tab);

        var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));

        _this.node = null;
        return _this;
    }
    // A tab can start selected when it is moved from the disclosure dropdown
    // into the main list, so we need to send focus from the tab to the panel
    // on mount and update


    _createClass(Tab, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                id = _props.id,
                measuring = _props.measuring,
                selected = _props.selected,
                panelID = _props.panelID,
                focused = _props.focused;

            if (measuring) {
                return;
            }
            // Because of timing issues with the render, we may still have the old,
            // in-disclosure version of the tab that has focus. Check for this
            // as a second indicator of focus
            var itemHadFocus = focused || document.activeElement && document.activeElement.id === id;
            // If we just check for selected, the panel for the active tab will
            // be focused on page load, which we don’t want
            if (itemHadFocus && selected && panelID != null) {
                focusPanelID(panelID);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(previousProps) {
            var wasSelected = previousProps.selected;
            var _props2 = this.props,
                focused = _props2.focused,
                measuring = _props2.measuring,
                selected = _props2.selected,
                panelID = _props2.panelID;

            if (measuring) {
                return;
            }
            if (selected && !wasSelected && panelID != null) {
                focusPanelID(panelID);
            } else if (focused && this.node != null) {
                focus.focusFirstFocusableNode(this.node);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                id = _props3.id,
                focused = _props3.focused,
                siblingTabHasFocus = _props3.siblingTabHasFocus,
                children = _props3.children,
                onClick = _props3.onClick,
                selected = _props3.selected,
                url = _props3.url,
                panelID = _props3.panelID,
                measuring = _props3.measuring,
                accessibilityLabel = _props3.accessibilityLabel;

            var handleClick = onClick && onClick.bind(null, id);
            var className = styles.classNames(styles$73.Tab, selected && styles$73['Tab-selected']);
            var tabIndex = void 0;
            if (selected && !siblingTabHasFocus && !measuring) {
                tabIndex = 0;
            } else if (focused && !measuring) {
                tabIndex = 0;
            } else {
                tabIndex = -1;
            }
            var markup = url ? React.createElement(
                UnstyledLink$2,
                { id: id, url: url, role: 'tab', tabIndex: tabIndex, onClick: handleClick, className: className, 'aria-selected': selected, 'aria-controls': panelID, 'aria-label': accessibilityLabel, onMouseUp: handleMouseUpByBlurring, __self: this,
                    __source: {
                        fileName: _jsxFileName$115,
                        lineNumber: 60
                    }
                },
                React.createElement(
                    'span',
                    { className: styles$73.Title, __self: this,
                        __source: {
                            fileName: _jsxFileName$115,
                            lineNumber: 61
                        }
                    },
                    children
                )
            ) : React.createElement(
                'button',
                { id: id, role: 'tab', type: 'button', tabIndex: tabIndex, className: className, onClick: handleClick, 'aria-selected': selected, 'aria-controls': panelID, 'aria-label': accessibilityLabel, onMouseUp: handleMouseUpByBlurring, __self: this,
                    __source: {
                        fileName: _jsxFileName$115,
                        lineNumber: 62
                    }
                },
                React.createElement(
                    'span',
                    { className: styles$73.Title, __self: this,
                        __source: {
                            fileName: _jsxFileName$115,
                            lineNumber: 63
                        }
                    },
                    children
                )
            );
            return React.createElement(
                'li',
                { role: 'presentation', className: styles$73.TabContainer, ref: this.setNode, __self: this,
                    __source: {
                        fileName: _jsxFileName$115,
                        lineNumber: 65
                    }
                },
                markup
            );
        }
    }, {
        key: 'setNode',
        value: function setNode(node) {
            this.node = node;
        }
    }]);

    return Tab;
}(React.PureComponent);
tslib_1.__decorate([decorators.autobind], Tab$1.prototype, "setNode", null);
function focusPanelID(panelID) {
    var panel = document.getElementById(panelID);
    if (panel) {
        panel.focus();
    }
}
var Tab$2 = withAppProvider()(Tab$1);

var _jsxFileName$116 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Tabs/components/TabMeasurer/TabMeasurer.js';
var TabMeasurer$1 = function (_React$PureComponent) {
    _inherits(TabMeasurer, _React$PureComponent);

    function TabMeasurer() {
        _classCallCheck(this, TabMeasurer);

        var _this = _possibleConstructorReturn(this, (TabMeasurer.__proto__ || Object.getPrototypeOf(TabMeasurer)).apply(this, arguments));

        _this.containerNode = null;
        return _this;
    }

    _createClass(TabMeasurer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.handleMeasurement();
            if (process.env.NODE_ENV === 'development') {
                // We need to defer the calculation in development so the
                // styles have time to be injected.
                setTimeout(this.handleMeasurement, 0);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.tabs !== this.props.tabs) {
                this.handleMeasurement();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                selected = _props.selected,
                tabs = _props.tabs,
                activator = _props.activator,
                tabToFocus = _props.tabToFocus,
                siblingTabHasFocus = _props.siblingTabHasFocus;

            var tabsMarkup = tabs.map(function (tab, index) {
                return React.createElement(
                    Tab$2,
                    { measuring: true, key: '' + index + tab.id + 'Hidden', id: tab.id + 'Measurer', siblingTabHasFocus: siblingTabHasFocus, focused: index === tabToFocus, selected: index === selected, onClick: other.noop, url: tab.url, __self: _this2,
                        __source: {
                            fileName: _jsxFileName$116,
                            lineNumber: 31
                        }
                    },
                    tab.content
                );
            });
            var classname = styles.classNames(styles$73.Tabs, styles$73.TabMeasurer);
            return React.createElement(
                'div',
                { className: classname, ref: this.setContainerNode, __self: this,
                    __source: {
                        fileName: _jsxFileName$116,
                        lineNumber: 36
                    }
                },
                React.createElement(EventListener$1, { event: 'resize', handler: this.handleMeasurement, __self: this,
                    __source: {
                        fileName: _jsxFileName$116,
                        lineNumber: 37
                    }
                }),
                tabsMarkup,
                activator
            );
        }
    }, {
        key: 'setContainerNode',
        value: function setContainerNode(node) {
            this.containerNode = node;
        }
    }, {
        key: 'handleMeasurement',
        value: function handleMeasurement() {
            if (this.containerNode == null) {
                return;
            }
            var handleMeasurement = this.props.handleMeasurement;

            var containerWidth = this.containerNode.offsetWidth;
            var tabMeasurerNode = ReactDOM.findDOMNode(this);
            var hiddenTabNodes = tabMeasurerNode instanceof Element && tabMeasurerNode.children;
            var hiddenTabNodesArray = [].slice.call(hiddenTabNodes);
            var hiddenTabWidths = hiddenTabNodesArray.map(function (node) {
                return node.getBoundingClientRect().width;
            });
            var disclosureWidth = hiddenTabWidths.pop();
            handleMeasurement({
                containerWidth: containerWidth,
                disclosureWidth: disclosureWidth,
                hiddenTabWidths: hiddenTabWidths
            });
        }
    }]);

    return TabMeasurer;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], TabMeasurer$1.prototype, "setContainerNode", null);
tslib_1.__decorate([decorators.autobind], TabMeasurer$1.prototype, "handleMeasurement", null);

var _jsxFileName$111 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Tabs/Tabs.js';
var Tabs$1 = function (_React$PureComponent) {
    _inherits(Tabs, _React$PureComponent);

    function Tabs() {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));

        _this.state = {
            disclosureWidth: 0,
            containerWidth: Infinity,
            tabWidths: [],
            visibleTabs: [],
            hiddenTabs: [],
            showDisclosure: false,
            tabToFocus: -1
        };
        return _this;
    }
    // eslint-disable-next-line react/no-deprecated


    _createClass(Tabs, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var selected = this.props.selected;
            var _state = this.state,
                disclosureWidth = _state.disclosureWidth,
                tabWidths = _state.tabWidths,
                containerWidth = _state.containerWidth,
                tabToFocus = _state.tabToFocus;

            var _getVisibleAndHiddenT = getVisibleAndHiddenTabIndices(nextProps.tabs, nextProps.selected, disclosureWidth, tabWidths, containerWidth),
                visibleTabs = _getVisibleAndHiddenT.visibleTabs,
                hiddenTabs = _getVisibleAndHiddenT.hiddenTabs;

            this.setState({
                visibleTabs: visibleTabs,
                hiddenTabs: hiddenTabs,
                tabToFocus: selected === nextProps.selected ? -1 : tabToFocus,
                showDisclosure: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                tabs = _props.tabs,
                selected = _props.selected,
                fitted = _props.fitted,
                children = _props.children;
            var _state2 = this.state,
                tabToFocus = _state2.tabToFocus,
                visibleTabs = _state2.visibleTabs,
                hiddenTabs = _state2.hiddenTabs,
                showDisclosure = _state2.showDisclosure;

            var disclosureTabs = hiddenTabs.map(function (tabIndex) {
                return tabs[tabIndex];
            });
            var panelMarkup = children ? React.createElement(
                Panel$1,
                { id: tabs[selected].panelID || tabs[selected].id + '-panel', tabID: tabs[selected].id, __self: this,
                    __source: {
                        fileName: _jsxFileName$111,
                        lineNumber: 39
                    }
                },
                children
            ) : null;
            var tabsMarkup = visibleTabs.sort(function (tabA, tabB) {
                return tabA - tabB;
            }).map(function (tabIndex) {
                return _this2.renderTabMarkup(tabs[tabIndex], tabIndex);
            });
            var disclosureActivatorVisible = visibleTabs.length < tabs.length;
            var classname = styles.classNames(styles$73.Tabs, fitted && styles$73.fitted, disclosureActivatorVisible && styles$73.fillSpace);
            var disclosureTabClassName = styles.classNames(styles$73.DisclosureTab, disclosureActivatorVisible && styles$73['DisclosureTab-visible']);
            var activator = React.createElement(
                'button',
                { tabIndex: -1, className: styles$73.DisclosureActivator, onClick: this.handleDisclosureActivatorClick, __self: this,
                    __source: {
                        fileName: _jsxFileName$111,
                        lineNumber: 48
                    }
                },
                React.createElement(Icon$2, { source: 'horizontalDots', __self: this,
                    __source: {
                        fileName: _jsxFileName$111,
                        lineNumber: 49
                    }
                })
            );
            return React.createElement(
                'div',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$111,
                        lineNumber: 51
                    }
                },
                React.createElement(
                    'ul',
                    { role: 'tablist', className: classname, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: handleKeyDown$1, onKeyUp: this.handleKeyPress, __self: this,
                        __source: {
                            fileName: _jsxFileName$111,
                            lineNumber: 52
                        }
                    },
                    tabsMarkup,
                    React.createElement(
                        'li',
                        { role: 'presentation', className: disclosureTabClassName, __self: this,
                            __source: {
                                fileName: _jsxFileName$111,
                                lineNumber: 54
                            }
                        },
                        React.createElement(
                            Popover$1,
                            { preferredPosition: 'below', activator: activator, active: disclosureActivatorVisible && showDisclosure, onClose: this.handleClose, __self: this,
                                __source: {
                                    fileName: _jsxFileName$111,
                                    lineNumber: 55
                                }
                            },
                            React.createElement(List$3, { focusIndex: hiddenTabs.indexOf(tabToFocus), disclosureTabs: disclosureTabs, onClick: this.handleTabClick, onKeyPress: this.handleKeyPress, __self: this,
                                __source: {
                                    fileName: _jsxFileName$111,
                                    lineNumber: 56
                                }
                            })
                        )
                    )
                ),
                React.createElement(TabMeasurer$1, { tabToFocus: tabToFocus, activator: activator, selected: selected, tabs: tabs, siblingTabHasFocus: tabToFocus > -1, handleMeasurement: this.handleMeasurement, __self: this,
                    __source: {
                        fileName: _jsxFileName$111,
                        lineNumber: 60
                    }
                }),
                panelMarkup
            );
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(event) {
            var _state3 = this.state,
                tabToFocus = _state3.tabToFocus,
                visibleTabs = _state3.visibleTabs,
                hiddenTabs = _state3.hiddenTabs;

            var tabsArrayInOrder = visibleTabs.concat(hiddenTabs);
            var key = event.key;
            var newFocus = tabsArrayInOrder.indexOf(tabToFocus);
            if (key === 'ArrowRight' || key === 'ArrowDown') {
                newFocus += 1;
                if (newFocus === tabsArrayInOrder.length) {
                    newFocus = 0;
                }
            }
            if (key === 'ArrowLeft' || key === 'ArrowUp') {
                newFocus -= 1;
                if (newFocus === -1) {
                    newFocus = tabsArrayInOrder.length - 1;
                }
            }
            this.setState({
                showDisclosure: hiddenTabs.indexOf(tabsArrayInOrder[newFocus]) > -1,
                tabToFocus: tabsArrayInOrder[newFocus]
            });
        }
    }, {
        key: 'renderTabMarkup',
        value: function renderTabMarkup(tab, index) {
            var selected = this.props.selected;
            var tabToFocus = this.state.tabToFocus;

            return React.createElement(
                Tab$2,
                { key: index + '-' + tab.id, id: tab.id, siblingTabHasFocus: tabToFocus > -1, focused: index === tabToFocus, selected: index === selected, onClick: this.handleTabClick, panelID: tab.panelID || tab.id + '-panel', accessibilityLabel: tab.accessibilityLabel, url: tab.url, __self: this,
                    __source: {
                        fileName: _jsxFileName$111,
                        lineNumber: 89
                    }
                },
                tab.content
            );
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            var _props2 = this.props,
                selected = _props2.selected,
                tabs = _props2.tabs;
            // If we are explicitly focusing one of the non-selected tabs, use it
            // move the focus to it

            var target$$1 = event.target;
            if (target$$1.classList.contains(styles$73.Tab) || target$$1.classList.contains(styles$73.Item)) {
                var tabToFocus = -1;
                tabs.every(function (tab, index) {
                    if (tab.id === target$$1.id) {
                        tabToFocus = index;
                        return false;
                    }
                    return true;
                });
                this.setState({ tabToFocus: tabToFocus });
                return;
            }
            if (target$$1.classList.contains(styles$73.DisclosureActivator)) {
                return;
            }
            // If we are coming in from somewhere other than another tab, focus the
            // selected tab, and the focus (click) is not on the disclosure activator,
            // focus the selected tab
            if (!event.relatedTarget) {
                this.setState({ tabToFocus: selected });
                return;
            }
            var relatedTarget = event.relatedTarget;
            if (!relatedTarget.classList.contains(styles$73.Tab) && !relatedTarget.classList.contains(styles$73.Item) && !relatedTarget.classList.contains(styles$73.DisclosureActivator)) {
                this.setState({ tabToFocus: selected });
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(event) {
            // If we blur and the target is not another tab, forget the focus position
            if (event.relatedTarget == null) {
                this.setState({ tabToFocus: -1 });
                return;
            }
            var target$$1 = event.relatedTarget;
            // If we are going to anywhere other than another tab, lose the last focused tab
            if (!target$$1.classList.contains(styles$73.Tab) && !target$$1.classList.contains(styles$73.Item)) {
                this.setState({ tabToFocus: -1 });
            }
        }
    }, {
        key: 'handleDisclosureActivatorClick',
        value: function handleDisclosureActivatorClick() {
            this.setState(function (_ref) {
                var showDisclosure = _ref.showDisclosure;
                return { showDisclosure: !showDisclosure };
            });
        }
    }, {
        key: 'handleClose',
        value: function handleClose() {
            this.setState({
                showDisclosure: false
            });
        }
    }, {
        key: 'handleMeasurement',
        value: function handleMeasurement(measurements) {
            var _props3 = this.props,
                tabs = _props3.tabs,
                selected = _props3.selected;
            var tabToFocus = this.state.tabToFocus;
            var tabWidths = measurements.hiddenTabWidths,
                containerWidth = measurements.containerWidth,
                disclosureWidth = measurements.disclosureWidth;

            var _getVisibleAndHiddenT2 = getVisibleAndHiddenTabIndices(tabs, selected, disclosureWidth, tabWidths, containerWidth),
                visibleTabs = _getVisibleAndHiddenT2.visibleTabs,
                hiddenTabs = _getVisibleAndHiddenT2.hiddenTabs;

            this.setState({
                tabToFocus: tabToFocus === -1 ? -1 : selected,
                visibleTabs: visibleTabs,
                hiddenTabs: hiddenTabs,
                disclosureWidth: disclosureWidth,
                containerWidth: containerWidth,
                tabWidths: tabWidths
            });
        }
    }, {
        key: 'handleTabClick',
        value: function handleTabClick(id) {
            var _props4 = this.props,
                tabs = _props4.tabs,
                _props4$onSelect = _props4.onSelect,
                onSelect = _props4$onSelect === undefined ? other.noop : _props4$onSelect;

            var tab = tabs.find(function (aTab) {
                return aTab.id === id;
            });
            if (tab == null) {
                return;
            }
            var selectedIndex = tabs.indexOf(tab);
            onSelect(selectedIndex);
        }
    }]);

    return Tabs;
}(React.PureComponent);

Tabs$1.Panel = Panel$1;
tslib_1.__decorate([decorators.autobind], Tabs$1.prototype, "handleKeyPress", null);
tslib_1.__decorate([decorators.autobind], Tabs$1.prototype, "renderTabMarkup", null);
tslib_1.__decorate([decorators.autobind], Tabs$1.prototype, "handleFocus", null);
tslib_1.__decorate([decorators.autobind], Tabs$1.prototype, "handleBlur", null);
tslib_1.__decorate([decorators.autobind], Tabs$1.prototype, "handleDisclosureActivatorClick", null);
tslib_1.__decorate([decorators.autobind], Tabs$1.prototype, "handleClose", null);
tslib_1.__decorate([decorators.autobind], Tabs$1.prototype, "handleMeasurement", null);
tslib_1.__decorate([decorators.autobind], Tabs$1.prototype, "handleTabClick", null);
function handleKeyDown$1(event) {
    var key = event.key;

    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
        event.preventDefault();
        event.stopPropagation();
    }
}
function getVisibleAndHiddenTabIndices(tabs, selected, disclosureWidth, tabWidths, containerWidth) {
    var sumTabWidths = tabWidths.reduce(function (sum, width) {
        return sum + width;
    }, 0);
    var arrayOfTabIndices = tabs.map(function (_, index) {
        return index;
    });
    var visibleTabs = [];
    var hiddenTabs = [];
    if (containerWidth > sumTabWidths) {
        visibleTabs.push.apply(visibleTabs, _toConsumableArray(arrayOfTabIndices));
    } else {
        visibleTabs.push(selected);
        var newTabWidth = tabWidths[selected];
        arrayOfTabIndices.forEach(function (index) {
            if (index !== selected) {
                if (newTabWidth + tabWidths[index] > containerWidth - disclosureWidth) {
                    hiddenTabs.push(index);
                    return;
                }
                visibleTabs.push(index);
                newTabWidth += tabWidths[index];
            }
        });
    }
    return {
        visibleTabs: visibleTabs,
        hiddenTabs: hiddenTabs
    };
}

var styles$74 = {
  "Tag": "Polaris-Tag",
  "disabled": "Polaris-Tag--disabled",
  "TagText": "Polaris-Tag__TagText",
  "Button": "Polaris-Tag__Button",
};

var _jsxFileName$117 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Tag/Tag.js';
function Tag$1(_ref) {
  var children = _ref.children,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === undefined ? false : _ref$disabled,
      onRemove = _ref.onRemove,
      intl = _ref.polaris.intl;

  var className = reactUtilities.classNames(disabled && styles$74.disabled, styles$74.Tag);
  var ariaLabel = intl.translate('Polaris.Tag.ariaLabel', { children: children });
  return React.createElement(
    'span',
    { className: className, __self: this,
      __source: {
        fileName: _jsxFileName$117,
        lineNumber: 10
      }
    },
    React.createElement(
      'span',
      { title: children, className: styles$74.TagText, __self: this,
        __source: {
          fileName: _jsxFileName$117,
          lineNumber: 11
        }
      },
      children
    ),
    React.createElement(
      'button',
      { type: 'button', 'aria-label': ariaLabel, className: styles$74.Button, onClick: onRemove, onMouseUp: handleMouseUpByBlurring, disabled: disabled, __self: this,
        __source: {
          fileName: _jsxFileName$117,
          lineNumber: 14
        }
      },
      React.createElement(Icon$2, { source: 'cancelSmall', __self: this,
        __source: {
          fileName: _jsxFileName$117,
          lineNumber: 15
        }
      })
    )
  );
}
var Tag$2 = withAppProvider()(Tag$1);

var styles$75 = {
  "TextField": "Polaris-TextField",
  "multiline": "Polaris-TextField--multiline",
  "Input": "Polaris-TextField__Input",
  "hasValue": "Polaris-TextField--hasValue",
  "focus": "Polaris-TextField--focus",
  "Backdrop": "Polaris-TextField__Backdrop",
  "error": "Polaris-TextField--error",
  "readOnly": "Polaris-TextField--readOnly",
  "disabled": "Polaris-TextField--disabled",
  "Prefix": "Polaris-TextField__Prefix",
  "Input-suffixed": "Polaris-TextField__Input--suffixed",
  "Suffix": "Polaris-TextField__Suffix",
  "Spinner": "Polaris-TextField__Spinner",
  "SpinnerIcon": "Polaris-TextField__SpinnerIcon",
  "Resizer": "Polaris-TextField__Resizer",
  "DummyInput": "Polaris-TextField__DummyInput",
  "Segment": "Polaris-TextField__Segment",
};

var _jsxFileName$119 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/TextField/components/Resizer/Resizer.js';
var Resizer$1 = function (_React$PureComponent) {
    _inherits(Resizer, _React$PureComponent);

    function Resizer() {
        _classCallCheck(this, Resizer);

        var _this = _possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).apply(this, arguments));

        _this.contentNode = null;
        _this.minimumLinesNode = null;
        return _this;
    }

    _createClass(Resizer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.handleHeightCheck();
            if (process.env.NODE_ENV === 'development') {
                // We need to defer the calculation in development so the
                // styles have time to be injected.
                setTimeout(this.handleHeightCheck, 0);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.handleHeightCheck();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                contents = _props.contents,
                minimumLines = _props.minimumLines;

            var minimumLinesMarkup = minimumLines ? React.createElement('div', { ref: this.setMinimumLinesNode, className: styles$75.DummyInput, dangerouslySetInnerHTML: {
                    __html: getContentsForMinimumLines(minimumLines)
                }, __self: this,
                __source: {
                    fileName: _jsxFileName$119,
                    lineNumber: 25
                }
            }) : null;
            return React.createElement(
                'div',
                { 'aria-hidden': true, className: styles$75.Resizer, __self: this,
                    __source: {
                        fileName: _jsxFileName$119,
                        lineNumber: 28
                    }
                },
                React.createElement(EventListener$1, { event: 'resize', handler: this.handleHeightCheck, __self: this,
                    __source: {
                        fileName: _jsxFileName$119,
                        lineNumber: 29
                    }
                }),
                React.createElement('div', { ref: this.setContentNode, className: styles$75.DummyInput, dangerouslySetInnerHTML: { __html: getFinalContents(contents) }, __self: this,
                    __source: {
                        fileName: _jsxFileName$119,
                        lineNumber: 30
                    }
                }),
                minimumLinesMarkup
            );
        }
    }, {
        key: 'handleHeightCheck',
        value: function handleHeightCheck() {
            if (this.contentNode == null || this.minimumLinesNode == null) {
                return;
            }
            var contentHeight = this.contentNode.offsetHeight;
            var minimumHeight = this.setMinimumLinesNode ? this.minimumLinesNode.offsetHeight : 0;
            var newHeight = Math.max(contentHeight, minimumHeight);
            var _props2 = this.props,
                currentHeight = _props2.currentHeight,
                onHeightChange = _props2.onHeightChange;

            if (newHeight !== currentHeight) {
                onHeightChange(newHeight);
            }
        }
    }, {
        key: 'setContentNode',
        value: function setContentNode(node) {
            this.contentNode = node;
        }
    }, {
        key: 'setMinimumLinesNode',
        value: function setMinimumLinesNode(node) {
            this.minimumLinesNode = node;
        }
    }]);

    return Resizer;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], Resizer$1.prototype, "handleHeightCheck", null);
tslib_1.__decorate([decorators.autobind], Resizer$1.prototype, "setContentNode", null);
tslib_1.__decorate([decorators.autobind], Resizer$1.prototype, "setMinimumLinesNode", null);
var ENTITIES_TO_REPLACE = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '\n': '<br>'
};
var REPLACE_REGEX$1 = /[\n&<>]/g;
function replaceEntity(entity) {
    return ENTITIES_TO_REPLACE[entity] || entity;
}
function getContentsForMinimumLines(minimumLines) {
    var content = '';
    for (var line = 0; line < minimumLines; line++) {
        content += '<br>';
    }
    return content;
}
function getFinalContents(contents) {
    return contents ? contents.replace(REPLACE_REGEX$1, replaceEntity) + '<br>' : '<br>';
}

var _jsxFileName$120 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/TextField/components/Spinner/Spinner.js';
function Spinner$4(_ref) {
  var onChange = _ref.onChange,
      onClick = _ref.onClick;

  function handleStep(step) {
    return function () {
      return onChange(step);
    };
  }
  return React.createElement(
    'div',
    { className: styles$75.Spinner, onClick: onClick, 'aria-hidden': true, __self: this,
      __source: {
        fileName: _jsxFileName$120,
        lineNumber: 8
      }
    },
    React.createElement(
      'div',
      { role: 'button', className: styles$75.Segment, tabIndex: -1, onClick: handleStep(1), __self: this,
        __source: {
          fileName: _jsxFileName$120,
          lineNumber: 9
        }
      },
      React.createElement(
        'div',
        { className: styles$75.SpinnerIcon, __self: this,
          __source: {
            fileName: _jsxFileName$120,
            lineNumber: 10
          }
        },
        React.createElement(Icon$2, { source: 'caretUp', __self: this,
          __source: {
            fileName: _jsxFileName$120,
            lineNumber: 11
          }
        })
      )
    ),
    React.createElement(
      'div',
      { role: 'button', className: styles$75.Segment, tabIndex: -1, onClick: handleStep(-1), __self: this,
        __source: {
          fileName: _jsxFileName$120,
          lineNumber: 15
        }
      },
      React.createElement(
        'div',
        { className: styles$75.SpinnerIcon, __self: this,
          __source: {
            fileName: _jsxFileName$120,
            lineNumber: 16
          }
        },
        React.createElement(Icon$2, { source: 'caretDown', __self: this,
          __source: {
            fileName: _jsxFileName$120,
            lineNumber: 17
          }
        })
      )
    )
  );
}

var _jsxFileName$118 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/TextField/TextField.js';
var getUniqueID$12 = other.createUniqueIDFactory('TextField');

var TextField$1 = function (_React$PureComponent) {
    _inherits(TextField, _React$PureComponent);

    function TextField(props) {
        _classCallCheck(this, TextField);

        var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, props));

        _this.state = {
            height: null,
            focus: false,
            id: props.id || getUniqueID$12()
        };
        return _this;
    }

    _createClass(TextField, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(_ref) {
            var focused = _ref.focused;

            if (this.input && focused !== this.props.focused && this.props.focused === true) {
                this.input.focus();
            }
        }
        // eslint-disable-next-line react/no-deprecated

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.setState(function (prevState) {
                return {
                    id: newProps.id || prevState.id
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$id = _props.id,
                id = _props$id === undefined ? this.state.id : _props$id,
                _props$value = _props.value,
                value = _props$value === undefined ? '' : _props$value,
                placeholder = _props.placeholder,
                disabled = _props.disabled,
                readOnly = _props.readOnly,
                role = _props.role,
                autoFocus = _props.autoFocus,
                type = _props.type,
                name = _props.name,
                error = _props.error,
                multiline = _props.multiline,
                connectedRight = _props.connectedRight,
                connectedLeft = _props.connectedLeft,
                label = _props.label,
                labelAction = _props.labelAction,
                labelHidden = _props.labelHidden,
                helpText = _props.helpText,
                prefix = _props.prefix,
                suffix = _props.suffix,
                onFocus = _props.onFocus,
                onBlur = _props.onBlur,
                autoComplete = _props.autoComplete,
                min = _props.min,
                max = _props.max,
                minLength = _props.minLength,
                maxLength = _props.maxLength,
                spellCheck = _props.spellCheck,
                pattern = _props.pattern,
                ariaOwns = _props.ariaOwns,
                ariaActiveDescendant = _props.ariaActiveDescendant,
                ariaAutocomplete = _props.ariaAutocomplete,
                ariaControls = _props.ariaControls;
            var height = this.state.height;

            var className = styles.classNames(styles$75.TextField, Boolean(value) && styles$75.hasValue, disabled && styles$75.disabled, readOnly && styles$75.readOnly, error && styles$75.error, multiline && styles$75.multiline, this.state.focus && styles$75.focus);
            var inputType = type === 'currency' ? 'text' : type;
            var prefixMarkup = prefix ? React.createElement(
                'div',
                { className: styles$75.Prefix, id: id + 'Prefix', __self: this,
                    __source: {
                        fileName: _jsxFileName$118,
                        lineNumber: 39
                    }
                },
                prefix
            ) : null;
            var suffixMarkup = suffix ? React.createElement(
                'div',
                { className: styles$75.Suffix, id: id + 'Suffix', __self: this,
                    __source: {
                        fileName: _jsxFileName$118,
                        lineNumber: 42
                    }
                },
                suffix
            ) : null;
            var spinnerMarkup = type === 'number' && !disabled ? React.createElement(Spinner$4, { onChange: this.handleNumberChange, __self: this,
                __source: {
                    fileName: _jsxFileName$118,
                    lineNumber: 45
                }
            }) : null;
            var style = multiline && height ? { height: height } : null;
            var resizer = multiline ? React.createElement(Resizer$1, { contents: value || placeholder, currentHeight: height, minimumLines: typeof multiline === 'number' ? multiline : 1, onHeightChange: this.handleExpandingResize, __self: this,
                __source: {
                    fileName: _jsxFileName$118,
                    lineNumber: 47
                }
            }) : null;
            var describedBy = [];
            if (error) {
                describedBy.push(id + 'Error');
            }
            if (helpText) {
                describedBy.push(helpTextID$1(id));
            }
            var labelledBy = [labelID(id)];
            if (prefix) {
                labelledBy.push(id + 'Prefix');
            }
            if (suffix) {
                labelledBy.push(id + 'Suffix');
            }
            var inputClassName = styles.classNames(styles$75.Input, suffix && styles$75['Input-suffixed']);
            var input = React.createElement(multiline ? 'textarea' : 'input', {
                name: name,
                id: id,
                disabled: disabled,
                readOnly: readOnly,
                role: role,
                autoFocus: autoFocus,
                value: value,
                placeholder: placeholder,
                onFocus: onFocus,
                onBlur: onBlur,
                onKeyPress: this.handleKeyPress,
                style: style,
                autoComplete: normalizeAutoComplete$1(autoComplete),
                className: inputClassName,
                onChange: this.handleChange,
                ref: this.setInput,
                min: min,
                max: max,
                minLength: minLength,
                maxLength: maxLength,
                spellCheck: spellCheck,
                pattern: pattern,
                type: inputType,
                'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined,
                'aria-label': label,
                'aria-labelledby': labelledBy.join(' '),
                'aria-invalid': Boolean(error),
                'aria-owns': ariaOwns,
                'aria-activedescendant': ariaActiveDescendant,
                'aria-autocomplete': ariaAutocomplete,
                'aria-controls': ariaControls,
                'aria-multiline': multiline
            });
            return React.createElement(
                Labelled$1,
                { label: label, id: id, error: error, action: labelAction, labelHidden: labelHidden, helpText: helpText, __self: this,
                    __source: {
                        fileName: _jsxFileName$118,
                        lineNumber: 99
                    }
                },
                React.createElement(
                    Connected$1,
                    { left: connectedLeft, right: connectedRight, __self: this,
                        __source: {
                            fileName: _jsxFileName$118,
                            lineNumber: 100
                        }
                    },
                    React.createElement(
                        'div',
                        { className: className, onFocus: this.handleFocus, onBlur: this.handleBlur, onClick: this.handleClick, __self: this,
                            __source: {
                                fileName: _jsxFileName$118,
                                lineNumber: 101
                            }
                        },
                        prefixMarkup,
                        input,
                        suffixMarkup,
                        spinnerMarkup,
                        React.createElement('div', { className: styles$75.Backdrop, __self: this,
                            __source: {
                                fileName: _jsxFileName$118,
                                lineNumber: 106
                            }
                        }),
                        resizer
                    )
                )
            );
        }
    }, {
        key: 'setInput',
        value: function setInput(input) {
            this.input = input;
        }
    }, {
        key: 'handleNumberChange',
        value: function handleNumberChange(steps) {
            var _props2 = this.props,
                onChange = _props2.onChange,
                value = _props2.value,
                _props2$step = _props2.step,
                step = _props2$step === undefined ? 1 : _props2$step,
                _props2$min = _props2.min,
                min = _props2$min === undefined ? -Infinity : _props2$min,
                _props2$max = _props2.max,
                max = _props2$max === undefined ? Infinity : _props2$max;

            if (onChange == null) {
                return;
            }
            // Returns the length of decimal places in a number
            var dpl = function dpl(num) {
                return (num.toString().split('.')[1] || []).length;
            };
            var numericValue = value ? parseFloat(value) : 0;
            if (isNaN(numericValue)) {
                return;
            }
            // Making sure the new value has the same length of decimal places as the
            // step / value has.
            var decimalPlaces = Math.max(dpl(numericValue), dpl(step));
            var newValue = Math.min(max, Math.max(numericValue + steps * step, min));
            onChange(String(newValue.toFixed(decimalPlaces)), this.state.id);
        }
    }, {
        key: 'handleExpandingResize',
        value: function handleExpandingResize(height) {
            this.setState({ height: height });
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(event) {
            var key = event.key,
                which = event.which;
            var type = this.props.type;

            var numbersSpec = /[\d.eE+-]$/;
            if (type !== 'number' || which === Keys.ENTER || key.match(numbersSpec)) {
                return;
            }
            event.preventDefault();
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            var onChange = this.props.onChange;

            if (onChange == null) {
                return;
            }
            onChange(event.currentTarget.value, this.state.id);
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus() {
            this.setState({ focus: true });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            this.setState({ focus: false });
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            this.input.focus();
        }
    }]);

    return TextField;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], TextField$1.prototype, "setInput", null);
tslib_1.__decorate([decorators.autobind], TextField$1.prototype, "handleNumberChange", null);
tslib_1.__decorate([decorators.autobind], TextField$1.prototype, "handleExpandingResize", null);
tslib_1.__decorate([decorators.autobind], TextField$1.prototype, "handleKeyPress", null);
tslib_1.__decorate([decorators.autobind], TextField$1.prototype, "handleChange", null);
tslib_1.__decorate([decorators.autobind], TextField$1.prototype, "handleFocus", null);
tslib_1.__decorate([decorators.autobind], TextField$1.prototype, "handleBlur", null);
tslib_1.__decorate([decorators.autobind], TextField$1.prototype, "handleClick", null);
function normalizeAutoComplete$1(autoComplete) {
    if (autoComplete == null) {
        return autoComplete;
    }
    return autoComplete ? 'on' : 'off';
}

var styles$76 = {
  "variationPositive": "Polaris-TextStyle--variationPositive",
  "variationNegative": "Polaris-TextStyle--variationNegative",
  "variationCode": "Polaris-TextStyle--variationCode",
  "variationStrong": "Polaris-TextStyle--variationStrong",
  "variationSubdued": "Polaris-TextStyle--variationSubdued",
};

var _jsxFileName$121 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/TextStyle/TextStyle.js';
var VariationValue;
(function (VariationValue) {
    VariationValue["Positive"] = "positive";
    VariationValue["Negative"] = "negative";
    VariationValue["Strong"] = "strong";
    VariationValue["Subdued"] = "subdued";
    VariationValue["Code"] = "code";
})(VariationValue || (VariationValue = {}));
function TextStyle$1(_ref) {
    var variation = _ref.variation,
        children = _ref.children;

    var className = styles.classNames(variation && styles$76[styles.variationName('variation', variation)], variation === VariationValue.Code && styles$76.code);
    var Element = variationElement(variation);
    return React.createElement(
        Element,
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$121,
                lineNumber: 15
            }
        },
        children
    );
}
function variationElement(variation) {
    switch (variation) {
        case VariationValue.Code:
            return 'code';
        case VariationValue.Strong:
            return 'b';
        case VariationValue.Positive:
        case VariationValue.Negative:
        case VariationValue.Subdued:
        default:
            return 'span';
    }
}

var styles$78 = {
  "Tooltip": "Polaris-Tooltip",
  "measuring": "Polaris-Tooltip--measuring",
  "positionedAbove": "Polaris-Tooltip--positionedAbove",
  "Tip": "Polaris-Tooltip__Tip",
  "light": "Polaris-Tooltip--light",
  "Wrapper": "Polaris-Tooltip__Wrapper",
  "Content": "Polaris-Tooltip__Content",
  "Label": "Polaris-Tooltip__Label",
};

var _jsxFileName$124 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js';
var TooltipOverlay$1 = function (_React$PureComponent) {
    _inherits(TooltipOverlay, _React$PureComponent);

    function TooltipOverlay() {
        _classCallCheck(this, TooltipOverlay);

        return _possibleConstructorReturn(this, (TooltipOverlay.__proto__ || Object.getPrototypeOf(TooltipOverlay)).apply(this, arguments));
    }

    _createClass(TooltipOverlay, [{
        key: 'render',
        value: function render() {
            var markup = this.props.active ? this.renderOverlay() : null;
            return markup;
        }
    }, {
        key: 'renderOverlay',
        value: function renderOverlay() {
            var _props = this.props,
                active = _props.active,
                activator = _props.activator,
                _props$preferredPosit = _props.preferredPosition,
                preferredPosition = _props$preferredPosit === undefined ? 'below' : _props$preferredPosit;

            return React.createElement(PositionedOverlay$1, { active: active, activator: activator, preferredPosition: preferredPosition, render: this.renderTooltip, __self: this,
                __source: {
                    fileName: _jsxFileName$124,
                    lineNumber: 15
                }
            });
        }
    }, {
        key: 'renderTooltip',
        value: function renderTooltip(overlayDetails) {
            var measuring = overlayDetails.measuring,
                desiredHeight = overlayDetails.desiredHeight,
                positioning = overlayDetails.positioning;
            var _props2 = this.props,
                id = _props2.id,
                children = _props2.children,
                light = _props2.light;

            var containerClassName = styles.classNames(styles$78.Tooltip, light && styles$78.light, measuring && styles$78.measuring, positioning === 'above' && styles$78.positionedAbove);
            var contentStyles = measuring ? undefined : { maxHeight: desiredHeight };
            return React.createElement(
                'div',
                Object.assign({ className: containerClassName }, layer.props, {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName$124,
                        lineNumber: 22
                    }
                }),
                React.createElement(
                    'div',
                    { className: styles$78.Wrapper, __self: this,
                        __source: {
                            fileName: _jsxFileName$124,
                            lineNumber: 23
                        }
                    },
                    React.createElement(
                        'div',
                        { id: id, role: 'tooltip', className: styles$78.Content, style: contentStyles, __self: this,
                            __source: {
                                fileName: _jsxFileName$124,
                                lineNumber: 24
                            }
                        },
                        children
                    )
                )
            );
        }
    }]);

    return TooltipOverlay;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], TooltipOverlay$1.prototype, "renderOverlay", null);
tslib_1.__decorate([decorators.autobind], TooltipOverlay$1.prototype, "renderTooltip", null);

var _jsxFileName$123 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/Tooltip/Tooltip.js';
var getUniqueID$13 = other.createUniqueIDFactory('TooltipContent');

var Tooltip$1 = function (_React$PureComponent) {
    _inherits(Tooltip, _React$PureComponent);

    function Tooltip() {
        _classCallCheck(this, Tooltip);

        var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));

        _this.state = {
            active: Boolean(_this.props.active),
            activatorNode: null
        };
        _this.id = getUniqueID$13();
        return _this;
    }

    _createClass(Tooltip, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setAccessibilityAttributes();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.setAccessibilityAttributes();
        }
    }, {
        key: 'render',
        value: function render() {
            var id = this.id;
            var _props = this.props,
                children = _props.children,
                content = _props.content,
                light = _props.light,
                _props$preferredPosit = _props.preferredPosition,
                preferredPosition = _props$preferredPosit === undefined ? 'below' : _props$preferredPosit,
                _props$activatorWrapp = _props.activatorWrapper,
                WrapperComponent = _props$activatorWrapp === undefined ? 'span' : _props$activatorWrapp;
            var _state = this.state,
                active = _state.active,
                activatorNode = _state.activatorNode;

            var portal = activatorNode ? React.createElement(
                Portal$1,
                { idPrefix: 'tooltip', __self: this,
                    __source: {
                        fileName: _jsxFileName$123,
                        lineNumber: 29
                    }
                },
                React.createElement(
                    TooltipOverlay$1,
                    { id: id, preferredPosition: preferredPosition, activator: activatorNode, active: active, onClose: other.noop, light: light, __self: this,
                        __source: {
                            fileName: _jsxFileName$123,
                            lineNumber: 30
                        }
                    },
                    React.createElement(
                        'div',
                        { className: styles$78.Label, testID: 'TooltipOverlayLabel', __self: this,
                            __source: {
                                fileName: _jsxFileName$123,
                                lineNumber: 31
                            }
                        },
                        content
                    )
                )
            ) : null;
            return React.createElement(
                WrapperComponent,
                { testID: 'WrapperComponent', onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, ref: this.setActivator, __self: this,
                    __source: {
                        fileName: _jsxFileName$123,
                        lineNumber: 36
                    }
                },
                children,
                portal
            );
        }
    }, {
        key: 'setActivator',
        value: function setActivator(node) {
            if (node == null) {
                this.activatorContainer = null;
                this.setState({ activatorNode: null });
                return;
            }
            this.setState({ activatorNode: node.firstElementChild });
            this.activatorContainer = node;
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus() {
            this.setState({ active: true });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            this.setState({ active: false });
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter() {
            this.setState({ active: true });
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave() {
            this.setState({ active: false });
        }
    }, {
        key: 'setAccessibilityAttributes',
        value: function setAccessibilityAttributes() {
            var activatorContainer = this.activatorContainer,
                id = this.id;

            if (activatorContainer == null) {
                return;
            }
            var firstFocusable = focus.findFirstFocusableNode(activatorContainer);
            var accessibilityNode = firstFocusable || activatorContainer;
            accessibilityNode.tabIndex = 0;
            accessibilityNode.setAttribute('aria-describedby', id);
        }
    }]);

    return Tooltip;
}(React.PureComponent);

tslib_1.__decorate([decorators.autobind], Tooltip$1.prototype, "setActivator", null);
tslib_1.__decorate([decorators.autobind], Tooltip$1.prototype, "handleFocus", null);
tslib_1.__decorate([decorators.autobind], Tooltip$1.prototype, "handleBlur", null);
tslib_1.__decorate([decorators.autobind], Tooltip$1.prototype, "handleMouseEnter", null);
tslib_1.__decorate([decorators.autobind], Tooltip$1.prototype, "handleMouseLeave", null);

var styles$79 = {
  "DisplayText": "Polaris-SkeletonDisplayText__DisplayText",
  "sizeSmall": "Polaris-SkeletonDisplayText--sizeSmall",
  "sizeMedium": "Polaris-SkeletonDisplayText--sizeMedium",
  "sizeLarge": "Polaris-SkeletonDisplayText--sizeLarge",
  "sizeExtraLarge": "Polaris-SkeletonDisplayText--sizeExtraLarge",
};

var _jsxFileName$126 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/SkeletonDisplayText/SkeletonDisplayText.js';
function SkeletonDisplayText$1(_ref) {
    var _ref$size = _ref.size,
        size = _ref$size === undefined ? 'medium' : _ref$size;

    var className = styles.classNames(styles$79.DisplayText, size && styles$79[styles.variationName('size', size)]);
    return React.createElement('div', { className: className, __self: this,
        __source: {
            fileName: _jsxFileName$126,
            lineNumber: 6
        }
    });
}

var styles$80 = {
  "SkeletonBodyTextContainer": "Polaris-SkeletonBodyText__SkeletonBodyTextContainer",
  "SkeletonBodyText": "Polaris-SkeletonBodyText",
};

var _jsxFileName$127 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/SkeletonBodyText/SkeletonBodyText.js';
function SkeletonBodyText$1(_ref) {
    var _ref$lines = _ref.lines,
        lines = _ref$lines === undefined ? 3 : _ref$lines;

    var bodyTextLines = [];
    for (var i = 0; i < lines; i++) {
        bodyTextLines.push(React.createElement('div', { className: styles$80.SkeletonBodyText, key: i, __self: this,
            __source: {
                fileName: _jsxFileName$127,
                lineNumber: 6
            }
        }));
    }
    return React.createElement(
        'div',
        { className: styles$80.SkeletonBodyTextContainer, __self: this,
            __source: {
                fileName: _jsxFileName$127,
                lineNumber: 8
            }
        },
        bodyTextLines
    );
}

var styles$81 = {
  "Page": "Polaris-SkeletonPage__Page",
  "fullWidth": "Polaris-SkeletonPage--fullWidth",
  "singleColumn": "Polaris-SkeletonPage--singleColumn",
  "Content": "Polaris-SkeletonPage__Content",
  "Header": "Polaris-SkeletonPage__Header",
  "Header-hasSecondaryActions": "Polaris-SkeletonPage__Header--hasSecondaryActions",
  "BreadcrumbAction": "Polaris-SkeletonPage__BreadcrumbAction",
  "Actions": "Polaris-SkeletonPage__Actions",
  "Action": "Polaris-SkeletonPage__Action",
};

var _jsxFileName$125 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/SkeletonPage/SkeletonPage.js';
var SkeletonPage = function (_React$PureComponent) {
    _inherits(SkeletonPage, _React$PureComponent);

    function SkeletonPage() {
        _classCallCheck(this, SkeletonPage);

        return _possibleConstructorReturn(this, (SkeletonPage.__proto__ || Object.getPrototypeOf(SkeletonPage)).apply(this, arguments));
    }

    _createClass(SkeletonPage, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                fullWidth = _props.fullWidth,
                singleColumn = _props.singleColumn,
                secondaryActions = _props.secondaryActions,
                _props$title = _props.title,
                title = _props$title === undefined ? '' : _props$title,
                breadcrumbs = _props.breadcrumbs;

            var className = styles.classNames(styles$81.Page, fullWidth && styles$81.fullWidth, singleColumn && styles$81.singleColumn);
            var headerClassName = styles.classNames(styles$81.Header, breadcrumbs && styles$81['Header-hasBreadcrumbs'], secondaryActions && styles$81['Header-hasSecondaryActions']);
            var titleMarkup = title !== null ? renderTitle(title) : null;
            var secondaryActionsMarkup = secondaryActions ? renderSecondaryActions(secondaryActions) : null;
            var breadcrumbMarkup = breadcrumbs ? React.createElement(
                'div',
                { className: styles$81.BreadcrumbAction, style: { width: 60 }, __self: this,
                    __source: {
                        fileName: _jsxFileName$125,
                        lineNumber: 17
                    }
                },
                React.createElement(SkeletonBodyText$1, { lines: 1, __self: this,
                    __source: {
                        fileName: _jsxFileName$125,
                        lineNumber: 18
                    }
                })
            ) : null;
            var headerMarkup = !this.props.polaris.easdk ? React.createElement(
                'div',
                { className: headerClassName, __self: this,
                    __source: {
                        fileName: _jsxFileName$125,
                        lineNumber: 20
                    }
                },
                breadcrumbMarkup,
                titleMarkup,
                secondaryActionsMarkup
            ) : null;
            return React.createElement(
                'div',
                { className: className, role: 'status', 'aria-label': 'Page loading', __self: this,
                    __source: {
                        fileName: _jsxFileName$125,
                        lineNumber: 25
                    }
                },
                headerMarkup,
                React.createElement(
                    'div',
                    { className: styles$81.Content, __self: this,
                        __source: {
                            fileName: _jsxFileName$125,
                            lineNumber: 27
                        }
                    },
                    children
                )
            );
        }
    }]);

    return SkeletonPage;
}(React.PureComponent);
function renderSecondaryActions(actionCount) {
    var actions = [];
    for (var i = 0; i < actionCount; i++) {
        var width = Math.round(Math.random() * 40 + 60);
        actions.push(React.createElement(
            'div',
            { className: styles$81.Action, style: { width: width }, key: i, __self: this,
                __source: {
                    fileName: _jsxFileName$125,
                    lineNumber: 35
                }
            },
            React.createElement(SkeletonBodyText$1, { lines: 1, __self: this,
                __source: {
                    fileName: _jsxFileName$125,
                    lineNumber: 36
                }
            })
        ));
    }
    return React.createElement(
        'div',
        { className: styles$81.Actions, __self: this,
            __source: {
                fileName: _jsxFileName$125,
                lineNumber: 39
            }
        },
        actions
    );
}
function renderTitle(title) {
    var titleContent = title === '' ? React.createElement(SkeletonDisplayText$1, { size: 'large', __self: this,
        __source: {
            fileName: _jsxFileName$125,
            lineNumber: 42
        }
    }) : React.createElement(
        DisplayText$1,
        { size: 'large', element: 'h1', __self: this,
            __source: {
                fileName: _jsxFileName$125,
                lineNumber: 42
            }
        },
        title
    );
    return React.createElement(
        'div',
        { className: styles$81.Title, __self: this,
            __source: {
                fileName: _jsxFileName$125,
                lineNumber: 45
            }
        },
        titleContent
    );
}
withAppProvider()(SkeletonPage);

var styles$82 = {
  "ProgressBar": "Polaris-ProgressBar",
  "sizeSmall": "Polaris-ProgressBar--sizeSmall",
  "sizeMedium": "Polaris-ProgressBar--sizeMedium",
  "sizeLarge": "Polaris-ProgressBar--sizeLarge",
  "Indicator": "Polaris-ProgressBar__Indicator",
  "fillup": "Polaris-ProgressBar--fillup",
  "Progress": "Polaris-ProgressBar__Progress",
  "Label": "Polaris-ProgressBar__Label",
};

var _jsxFileName$128 = '/Users/koenvendrik/Desktop/repos/polaris-react/build-intermediate/components/ProgressBar/ProgressBar.js';
function ProgressBar$1(_ref) {
    var _ref$progress = _ref.progress,
        progress = _ref$progress === undefined ? 0 : _ref$progress,
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 'medium' : _ref$size,
        intl = _ref.polaris.intl;

    var className = styles.classNames(styles$82.ProgressBar, size && styles$82[styles.variationName('size', size)]);
    var warningMessage = intl.translate(progress < 0 ? 'Polaris.ProgressBar.negativeWarningMessage' : 'Polaris.ProgressBar.exceedWarningMessage', { progress: progress });
    var parsedProgress = parseProgress(progress, warningMessage);
    return React.createElement(
        'div',
        { className: className, __self: this,
            __source: {
                fileName: _jsxFileName$128,
                lineNumber: 11
            }
        },
        React.createElement('progress', { className: styles$82.Progress, value: parsedProgress, max: '100', __self: this,
            __source: {
                fileName: _jsxFileName$128,
                lineNumber: 12
            }
        }),
        React.createElement(
            'div',
            { className: styles$82.Indicator, style: { width: parsedProgress + '%' }, __self: this,
                __source: {
                    fileName: _jsxFileName$128,
                    lineNumber: 13
                }
            },
            React.createElement(
                'span',
                { className: styles$82.Label, __self: this,
                    __source: {
                        fileName: _jsxFileName$128,
                        lineNumber: 14
                    }
                },
                parsedProgress,
                '%'
            )
        )
    );
}
function parseProgress(progress, warningMessage) {
    var progressWidth = void 0;
    if (progress < 0) {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn(warningMessage);
        }
        progressWidth = 0;
    } else if (progress > 100) {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn(warningMessage);
        }
        progressWidth = 100;
    } else {
        progressWidth = progress;
    }
    return progressWidth;
}
withAppProvider()(ProgressBar$1);

var Alert$1 = function (_React$PureComponent) {
    _inherits(Alert, _React$PureComponent);

    function Alert() {
        _classCallCheck(this, Alert);

        var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));

        _this.focusReturnPoint = null;
        return _this;
    }

    _createClass(Alert, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                open = _props.open,
                children = _props.children;

            if (typeof children !== 'string') {
                throw new Error('The alert component’s children can only be strings of text. Remove incompatible characters and try again.');
            }
            if (open) {
                this.handleEASDKMessaging();
                this.focusReturnPoint = document.activeElement;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(_ref) {
            var wasOpen = _ref.open;
            var open = this.props.open;

            if (wasOpen !== open) {
                this.handleEASDKMessaging();
            }
            if (!wasOpen && open) {
                this.focusReturnPoint = document.activeElement;
            } else if (wasOpen && !open && this.focusReturnPoint != null && document.contains(this.focusReturnPoint)) {
                this.focusReturnPoint.focus();
                this.focusReturnPoint = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }, {
        key: 'handleEASDKMessaging',
        value: function handleEASDKMessaging() {
            var _props2 = this.props,
                open = _props2.open,
                polaris = _props2.polaris;

            if (polaris.easdk == null) {
                return;
            }
            if (open) {
                polaris.easdk.Modal.alert(this.props);
            } else {
                polaris.easdk.Modal.close();
            }
        }
    }]);

    return Alert;
}(React.PureComponent);
var Alert$2 = withAppProvider()(Alert$1);

var Modal$6 = function (_React$PureComponent) {
    _inherits(Modal, _React$PureComponent);

    function Modal() {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));

        _this.focusReturnPoint = null;
        return _this;
    }

    _createClass(Modal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var open = this.props.open;

            if (open) {
                this.handleEASDKMessaging();
                this.focusReturnPoint = document.activeElement;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(_ref) {
            var wasOpen = _ref.open;
            var open = this.props.open;

            if (wasOpen !== open) {
                this.handleEASDKMessaging();
            }
            if (!wasOpen && open) {
                this.focusReturnPoint = document.activeElement;
            } else if (wasOpen && !open && this.focusReturnPoint != null && document.contains(this.focusReturnPoint)) {
                this.focusReturnPoint.focus();
                this.focusReturnPoint = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }, {
        key: 'handleEASDKMessaging',
        value: function handleEASDKMessaging() {
            var _props = this.props,
                open = _props.open,
                polaris = _props.polaris;

            if (polaris.easdk == null) {
                return;
            }
            if (open) {
                polaris.easdk.Modal.open(this.props);
            } else {
                polaris.easdk.Modal.close();
            }
        }
    }]);

    return Modal;
}(React.PureComponent);
var Modal$7 = withAppProvider()(Modal$6);

var ResourcePicker$2 = function (_React$PureComponent) {
    _inherits(ResourcePicker, _React$PureComponent);

    function ResourcePicker() {
        _classCallCheck(this, ResourcePicker);

        var _this = _possibleConstructorReturn(this, (ResourcePicker.__proto__ || Object.getPrototypeOf(ResourcePicker)).apply(this, arguments));

        _this.focusReturnPoint = null;
        return _this;
    }

    _createClass(ResourcePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var open = this.props.open;

            if (open) {
                this.handleEASDKMessaging();
                this.focusReturnPoint = document.activeElement;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(_ref) {
            var wasOpen = _ref.open;
            var open = this.props.open;

            if (wasOpen !== open) {
                this.handleEASDKMessaging();
            }
            if (!wasOpen && open) {
                this.focusReturnPoint = document.activeElement;
            } else if (wasOpen && !open && this.focusReturnPoint != null && document.contains(this.focusReturnPoint)) {
                this.focusReturnPoint.focus();
                this.focusReturnPoint = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }, {
        key: 'handleEASDKMessaging',
        value: function handleEASDKMessaging() {
            var _props = this.props,
                open = _props.open,
                polaris = _props.polaris;

            if (polaris.easdk == null) {
                return;
            }
            if (open) {
                polaris.easdk.ResourcePicker.open(this.props);
            } else {
                polaris.easdk.ResourcePicker.close();
            }
        }
    }]);

    return ResourcePicker;
}(React.PureComponent);
var Modal$9 = withAppProvider()(ResourcePicker$2);

exports.Alert = Alert$2;
exports.Modal = Modal$7;
exports.ResourcePicker = Modal$9;
