import { PureComponent, createElement } from 'react';
import * as React from 'react';
import { classNames, variationName } from '@shopify/react-utilities/styles';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { __decorate } from 'tslib';
import * as tslib_1 from 'tslib';
import { noop } from '@shopify/javascript-utilities/other';
import autobind from '@shopify/javascript-utilities/autobind';
import { Months, Weekdays, abbreviationForWeekday, dateIsInRange, dateIsSelected, getNewRange, getNextDisplayMonth, getNextDisplayYear, getPreviousDisplayMonth, getPreviousDisplayYear, getWeeksForMonth, isDateAfter, isDateBefore } from '@shopify/javascript-utilities/dates';

var DisplayText$2 = "Quilt-DisplayText";
var sizeSmall = "Quilt-DisplayText--sizeSmall";
var sizeMedium = "Quilt-DisplayText--sizeMedium";
var sizeLarge = "Quilt-DisplayText--sizeLarge";
var sizeExtraLarge = "Quilt-DisplayText--sizeExtraLarge";

var styles = Object.freeze({
	DisplayText: DisplayText$2,
	sizeSmall: sizeSmall,
	sizeMedium: sizeMedium,
	sizeLarge: sizeLarge,
	sizeExtraLarge: sizeExtraLarge
});

function DisplayText$1(_ref) {
    var _ref$element = _ref.element,
        Element = _ref$element === undefined ? 'p' : _ref$element,
        children = _ref.children,
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 'medium' : _ref$size;

    var className = classNames(DisplayText$2, size && styles[variationName('size', size)]);
    return createElement(
        Element,
        { className: className },
        children
    );
}

var arrowDown = { "viewBox": "0 0 20 20", "body": "<path d=\"M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0\"  fill-rule=\"evenodd\"/>" };

var arrowLeft = { "viewBox": "0 0 20 20", "body": "<path d=\"M17 9H5.414l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L5.414 11H17a1 1 0 1 0 0-2\"  fill-rule=\"evenodd\"/>" };

var arrowRight = { "viewBox": "0 0 20 20", "body": "<path d=\"M17.707 9.293l-5-5a.999.999 0 1 0-1.414 1.414L14.586 9H3a1 1 0 1 0 0 2h11.586l-3.293 3.293a.999.999 0 1 0 1.414 1.414l5-5a.999.999 0 0 0 0-1.414\"  fill-rule=\"evenodd\"/>" };

var arrowUp = { "viewBox": "0 0 20 20", "body": "<path d=\"M11 17V5.414l3.293 3.293a.999.999 0 1 0 1.414-1.414l-5-5a.999.999 0 0 0-1.414 0l-5 5a.997.997 0 0 0 0 1.414.999.999 0 0 0 1.414 0L9 5.414V17a1 1 0 1 0 2 0\"  fill-rule=\"evenodd\"/>" };

var cancel = { "viewBox": "0 0 20 20", "body": "<path d=\"M11.414 10l6.293-6.293a.999.999 0 1 0-1.414-1.414L10 8.586 3.707 2.293a.999.999 0 1 0-1.414 1.414L8.586 10l-6.293 6.293a.999.999 0 1 0 1.414 1.414L10 11.414l6.293 6.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z\"  fill-rule=\"evenodd\"/>" };

var caretDown = { "viewBox": "0 0 20 20", "body": "<path d=\"M5 8l5 5 5-5\"  fill-rule=\"evenodd\"/>" };

var caretUp = { "viewBox": "0 0 20 20", "body": "<path d=\"M15 13l-5-5-5 5\"  fill-rule=\"evenodd\"/>" };

var checkmark = { "viewBox": "0 0 16 16", "body": "<path d=\"M1.186 8.217a.709.709 0 0 1 0-.957l.9-.956a.611.611 0 0 1 .9 0L6.09 9.652l6.923-7.455a.611.611 0 0 1 .9 0l.9.958a.705.705 0 0 1 0 .955L6.54 13a.611.611 0 0 1-.9 0L1.186 8.217z\"  fill-rule=\"evenodd\"/>" };

var chevronDown = { "viewBox": "0 0 20 20", "body": "<path d=\"M10 14c-.297 0-.578-.132-.769-.36l-5-6A1.001 1.001 0 0 1 5.77 6.36L10 11.438l4.231-5.078a1.002 1.002 0 0 1 1.538 1.28l-5 6c-.19.228-.472.36-.769.36\"  fill-rule=\"evenodd\"/>" };

var chevronLeft = { "viewBox": "0 0 20 20", "body": "<path d=\"M12.999 16a.997.997 0 0 1-.64-.232l-6-5a1.002 1.002 0 0 1 0-1.536l6-5a1.001 1.001 0 0 1 1.282 1.536L8.562 10l5.079 4.232A1.001 1.001 0 0 1 12.999 16\"  fill-rule=\"evenodd\"/>" };

var chevronRight = { "viewBox": "0 0 20 20", "body": "<path d=\"M7.001 16a1.001 1.001 0 0 1-.642-1.768L11.44 10 6.36 5.768a1.001 1.001 0 0 1 1.282-1.536l6 5a1.002 1.002 0 0 1 0 1.536l-6 5a.997.997 0 0 1-.64.232\"  fill-rule=\"evenodd\"/>" };

var chevronUp = { "viewBox": "0 0 20 20", "body": "<path d=\"M15.001 13.982c-.287 0-.57-.123-.77-.36l-4.23-5.078-4.232 5.078a1.002 1.002 0 0 1-1.538-1.28l5-6c.381-.456 1.157-.456 1.538 0l5 6a1.001 1.001 0 0 1-.768 1.64\"  fill-rule=\"evenodd\"/>" };

var deleteIcon = { "viewBox": "0 0 20 20", "body": "<path d=\"M16 6H4a1 1 0 1 0 0 2h1v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8h1a1 1 0 1 0 0-2zM9 4a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2H9zm2 12h2V8h-2v8zm-4 0h2V8H7v8z\"  fill-rule=\"evenodd\"/>" };

var search = { "viewBox": "0 0 20 20", "body": "<path d=\"M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8m9.707 4.293l-4.82-4.82A5.968 5.968 0 0 0 14 8 6 6 0 0 0 2 8a6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414\"  fill-rule=\"evenodd\"/>" };

var Icon$2 = "Quilt-Icon";
var hasBackdrop = "Quilt-Icon--hasBackdrop";
var sizeFill = "Quilt-Icon--sizeFill";
var size8 = "Quilt-Icon--size8";
var size10 = "Quilt-Icon--size10";
var size12 = "Quilt-Icon--size12";
var size16 = "Quilt-Icon--size16";
var size20 = "Quilt-Icon--size20";
var size24 = "Quilt-Icon--size24";
var size40 = "Quilt-Icon--size40";
var size80 = "Quilt-Icon--size80";
var colorWhite = "Quilt-Icon--colorWhite";
var colorBlack = "Quilt-Icon--colorBlack";
var colorSkyLighter = "Quilt-Icon--colorSkyLighter";
var colorSkyLight = "Quilt-Icon--colorSkyLight";
var colorSky = "Quilt-Icon--colorSky";
var colorSkyDark = "Quilt-Icon--colorSkyDark";
var colorInkLightest = "Quilt-Icon--colorInkLightest";
var colorInkLighter = "Quilt-Icon--colorInkLighter";
var colorInkLight = "Quilt-Icon--colorInkLight";
var colorInk = "Quilt-Icon--colorInk";
var colorBlueLighter = "Quilt-Icon--colorBlueLighter";
var colorBlueLight = "Quilt-Icon--colorBlueLight";
var colorBlue = "Quilt-Icon--colorBlue";
var colorBlueDark = "Quilt-Icon--colorBlueDark";
var colorBlueDarker = "Quilt-Icon--colorBlueDarker";
var colorIndigoLighter = "Quilt-Icon--colorIndigoLighter";
var colorIndigoLight = "Quilt-Icon--colorIndigoLight";
var colorIndigo = "Quilt-Icon--colorIndigo";
var colorIndigoDark = "Quilt-Icon--colorIndigoDark";
var colorIndigoDarker = "Quilt-Icon--colorIndigoDarker";
var colorTealLighter = "Quilt-Icon--colorTealLighter";
var colorTealLight = "Quilt-Icon--colorTealLight";
var colorTeal = "Quilt-Icon--colorTeal";
var colorTealDark = "Quilt-Icon--colorTealDark";
var colorTealDarker = "Quilt-Icon--colorTealDarker";
var colorGreenLighter = "Quilt-Icon--colorGreenLighter";
var colorGreen = "Quilt-Icon--colorGreen";
var colorGreenDark = "Quilt-Icon--colorGreenDark";
var colorYellowLighter = "Quilt-Icon--colorYellowLighter";
var colorYellow = "Quilt-Icon--colorYellow";
var colorOrange = "Quilt-Icon--colorOrange";
var colorOrangeDark = "Quilt-Icon--colorOrangeDark";
var colorRedLighter = "Quilt-Icon--colorRedLighter";
var colorRed = "Quilt-Icon--colorRed";
var colorRedDark = "Quilt-Icon--colorRedDark";
var colorPurple = "Quilt-Icon--colorPurple";
var Svg = "Quilt-Icon__Svg";
var Placeholder = "Quilt-Icon__Placeholder";

var styles$1 = Object.freeze({
	Icon: Icon$2,
	hasBackdrop: hasBackdrop,
	sizeFill: sizeFill,
	size8: size8,
	size10: size10,
	size12: size12,
	size16: size16,
	size20: size20,
	size24: size24,
	size40: size40,
	size80: size80,
	colorWhite: colorWhite,
	colorBlack: colorBlack,
	colorSkyLighter: colorSkyLighter,
	colorSkyLight: colorSkyLight,
	colorSky: colorSky,
	colorSkyDark: colorSkyDark,
	colorInkLightest: colorInkLightest,
	colorInkLighter: colorInkLighter,
	colorInkLight: colorInkLight,
	colorInk: colorInk,
	colorBlueLighter: colorBlueLighter,
	colorBlueLight: colorBlueLight,
	colorBlue: colorBlue,
	colorBlueDark: colorBlueDark,
	colorBlueDarker: colorBlueDarker,
	colorIndigoLighter: colorIndigoLighter,
	colorIndigoLight: colorIndigoLight,
	colorIndigo: colorIndigo,
	colorIndigoDark: colorIndigoDark,
	colorIndigoDarker: colorIndigoDarker,
	colorTealLighter: colorTealLighter,
	colorTealLight: colorTealLight,
	colorTeal: colorTeal,
	colorTealDark: colorTealDark,
	colorTealDarker: colorTealDarker,
	colorGreenLighter: colorGreenLighter,
	colorGreen: colorGreen,
	colorGreenDark: colorGreenDark,
	colorYellowLighter: colorYellowLighter,
	colorYellow: colorYellow,
	colorOrange: colorOrange,
	colorOrangeDark: colorOrangeDark,
	colorRedLighter: colorRedLighter,
	colorRed: colorRed,
	colorRedDark: colorRedDark,
	colorPurple: colorPurple,
	Svg: Svg,
	Placeholder: Placeholder
});

var BUNDLED_ICONS = {
    arrowDown: arrowDown,
    arrowLeft: arrowLeft,
    arrowRight: arrowRight,
    arrowUp: arrowUp,
    cancel: cancel,
    checkmark: checkmark,
    chevronDown: chevronDown,
    chevronLeft: chevronLeft,
    chevronRight: chevronRight,
    chevronUp: chevronUp,
    delete: deleteIcon,
    search: search,
    caretDown: caretDown,
    caretUp: caretUp
};
var COLORS_WITH_BACKDROPS = ['teal', 'tealDark', 'greenDark', 'redDark', 'orangeDark', 'ink'];
function Icon$1(_ref) {
    var source = _ref.source,
        size = _ref.size,
        color = _ref.color,
        backdrop = _ref.backdrop,
        accessibilityLabel = _ref.accessibilityLabel;

    if (color && backdrop && !COLORS_WITH_BACKDROPS.includes(color)) {
        // tslint:disable-next-line no-console
        console.warn('You asked for a backdrop on an icon color that doesn\'t accept backdrops. The icon colors that have backdrops are: ' + COLORS_WITH_BACKDROPS.join(', '));
    }
    var className = classNames(Icon$2, size && styles$1[variationName('size', size)], color && styles$1[variationName('color', color)], backdrop && hasBackdrop);
    var content = void 0;
    if (source === 'placeholder') {
        content = createElement('div', { className: Placeholder });
    } else {
        var iconSource = typeof source === 'string' ? BUNDLED_ICONS[source] : source;
        content = createElement('svg', { className: Svg, viewBox: iconSource.viewBox, dangerouslySetInnerHTML: { __html: iconSource.body } });
    }
    return createElement(
        'div',
        { className: className, 'aria-label': accessibilityLabel },
        content
    );
}

var DatePicker$3 = "Quilt-DatePicker";
var MonthContainer = "Quilt-DatePicker__MonthContainer";
var Month$1 = "Quilt-DatePicker__Month";
var Week = "Quilt-DatePicker__Week";
var Day = "Quilt-DatePicker__Day";
var inRange = "Quilt-DatePicker__Day--inRange";
var selected = "Quilt-DatePicker__Day--selected";
var disabled = "Quilt-DatePicker__Day--disabled";
var Weekday = "Quilt-DatePicker__Weekday";
var Header = "Quilt-DatePicker__Header";
var Icon$3 = "Quilt-DatePicker__Icon";
var Title = "Quilt-DatePicker__Title";

function Day$1(_ref) {
    var day = _ref.day,
        onClick = _ref.onClick,
        onHover = _ref.onHover,
        selected$$1 = _ref.selected,
        inRange$$1 = _ref.inRange,
        inHoveringRange = _ref.inHoveringRange,
        disabled$$1 = _ref.disabled;

    var handleHover = onHover ? onHover.bind(null, day) : noop;
    if (!day) {
        return createElement('div', { className: Day, onMouseOver: handleHover });
    }
    var handleClick = onClick && !disabled$$1 ? onClick.bind(null, day) : noop;
    var className = classNames(Day, selected$$1 && selected, disabled$$1 && disabled, (inRange$$1 || inHoveringRange) && inRange);
    return createElement(
        'button',
        { className: className, onMouseOver: handleHover, onClick: handleClick },
        day.getDate()
    );
}

function Weekday$1(_ref) {
    var label = _ref.label;

    return createElement(
        'div',
        { className: Weekday },
        label
    );
}

var WEEKDAYS = [Weekdays.Sunday, Weekdays.Monday, Weekdays.Tuesday, Weekdays.Wednesday, Weekdays.Thursday, Weekdays.Friday, Weekdays.Saturday];
function Month$$1(_ref) {
    var selected$$1 = _ref.selected,
        hoverDate = _ref.hoverDate,
        disableDatesBefore = _ref.disableDatesBefore,
        disableDatesAfter = _ref.disableDatesAfter,
        allowRange = _ref.allowRange,
        _ref$onChange = _ref.onChange,
        onChange = _ref$onChange === undefined ? noop : _ref$onChange,
        _ref$onHover = _ref.onHover,
        onHover = _ref$onHover === undefined ? noop : _ref$onHover,
        month = _ref.month,
        year = _ref.year;

    var isInHoveringRange = allowRange ? hoveringDateIsInRange : function () {
        return false;
    };
    var weeks = getWeeksForMonth(month, year);
    var weekdays = WEEKDAYS.map(function (weekday) {
        return createElement(Weekday$1, { key: weekday, label: abbreviationForWeekday(weekday) });
    });
    function handleDateClick(selectedDate) {
        return onChange(getNewRange(selected$$1, selectedDate));
    }
    function renderWeek(day, dayIndex) {
        if (day == null) {
            var lastDayOfMonth = new Date(year, month + 1, 0);
            return createElement(Day$1, { key: dayIndex, onHover: onHover.bind(null, lastDayOfMonth) });
        }
        var isDisabled = disableDatesBefore && isDateBefore(day, disableDatesBefore) || disableDatesAfter && isDateAfter(day, disableDatesAfter);
        return createElement(Day$1, { day: day, key: dayIndex, onClick: handleDateClick.bind(null, day), onHover: onHover.bind(null, day), selected: dateIsSelected(day, selected$$1), inRange: dateIsInRange(day, selected$$1), disabled: isDisabled, inHoveringRange: isInHoveringRange(day, selected$$1, hoverDate) });
    }
    
    var weeksMarkup = weeks.map(function (week, index) {
        return createElement(
            'div',
            { className: Week, key: index },
            week.map(renderWeek)
        );
    });
    return createElement(
        'div',
        null,
        createElement(
            'div',
            { className: Title },
            Months[month],
            ' ',
            year
        ),
        createElement(
            'div',
            { className: Week },
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

var DatePicker$1 = function (_React$PureComponent) {
    _inherits(DatePicker$$1, _React$PureComponent);

    function DatePicker$$1(props) {
        _classCallCheck(this, DatePicker$$1);

        var _this = _possibleConstructorReturn(this, (DatePicker$$1.__proto__ || Object.getPrototypeOf(DatePicker$$1)).call(this, props));

        var selected$$1 = props.selected;

        var range = selected$$1 instanceof Date ? { start: selected$$1, end: selected$$1 } : selected$$1;
        _this.state = {
            hoverDate: range.end
        };
        return _this;
    }

    _createClass(DatePicker$$1, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                month = _props.month,
                year = _props.year,
                multiMonth = _props.multiMonth,
                disableDatesBefore = _props.disableDatesBefore,
                disableDatesAfter = _props.disableDatesAfter,
                selected$$1 = _props.selected;
            var hoverDate = this.state.hoverDate;

            var allowRange = !(selected$$1 instanceof Date);
            var range = selected$$1 instanceof Date ? { start: selected$$1, end: selected$$1 } : selected$$1;
            var showNextYear = getNextDisplayYear(month, year);
            var showNextMonth = getNextDisplayMonth(month);
            var showPreviousYear = getPreviousDisplayYear(month, year);
            var showPreviousMonth = getPreviousDisplayMonth(month);
            var secondDatePicker = multiMonth ? createElement(
                'div',
                { className: Month$1 },
                createElement(Month$$1, { month: showNextMonth, year: showNextYear, selected: range, hoverDate: hoverDate, onChange: this.handleDateSelection, onHover: this.handleHover, disableDatesBefore: disableDatesBefore, disableDatesAfter: disableDatesAfter, allowRange: allowRange })
            ) : null;
            return createElement(
                'div',
                { className: DatePicker$3 },
                createElement(
                    'div',
                    { className: Header },
                    createElement(
                        'button',
                        { className: Icon$3, onClick: this.handleMonthChangeClick.bind(null, showPreviousMonth, showPreviousYear) },
                        createElement(Icon$1, { source: 'chevronLeft', size: 24 })
                    ),
                    createElement(
                        'button',
                        { className: Icon$3, onClick: this.handleMonthChangeClick.bind(null, showNextMonth, showNextYear) },
                        createElement(Icon$1, { source: 'chevronRight', size: 24 })
                    )
                ),
                createElement(
                    'div',
                    { className: MonthContainer },
                    createElement(
                        'div',
                        { className: Month$1 },
                        createElement(Month$$1, { month: month, year: year, selected: range, hoverDate: hoverDate, onChange: this.handleDateSelection, onHover: this.handleHover, disableDatesBefore: disableDatesBefore, disableDatesAfter: disableDatesAfter, allowRange: allowRange })
                    ),
                    secondDatePicker
                )
            );
        }
    }, {
        key: 'handleDateSelection',
        value: function handleDateSelection(selected$$1) {
            var endDate = selected$$1.end;
            var _props$onChange = this.props.onChange,
                onChange = _props$onChange === undefined ? noop : _props$onChange;

            this.setState({
                hoverDate: endDate
            });
            onChange(selected$$1);
        }
    }, {
        key: 'handleMonthChangeClick',
        value: function handleMonthChangeClick(month, year) {
            var onMonthChange = this.props.onMonthChange;

            if (!onMonthChange) {
                return;
            }
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

    return DatePicker$$1;
}(PureComponent);

__decorate([autobind], DatePicker$1.prototype, "handleDateSelection", null);
__decorate([autobind], DatePicker$1.prototype, "handleMonthChangeClick", null);
__decorate([autobind], DatePicker$1.prototype, "handleHover", null);

export { DisplayText$1 as DisplayText, DatePicker$1 as DatePicker, Icon$1 as Icon };
