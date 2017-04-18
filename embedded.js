'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('babel-runtime/helpers/defineProperty'));
var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
var _inherits = _interopDefault(require('babel-runtime/helpers/inherits'));
var React = require('react');
var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));
var hoistStatics = _interopDefault(require('hoist-non-react-statics'));
var _shopify_reactUtilities_components = require('@shopify/react-utilities/components');

var Messenger = function () {
    function Messenger(target, handlers, options) {
        _classCallCheck(this, Messenger);

        this.target = target;
        this.handlers = handlers;
        this.targetOrigin = '*';
        this.queue = [];
        this.callbacks = {};
        this.callbacksToID = new WeakMap();
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
        value: function setTarget(target) {
            this.target = target;
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
                target = this.target;

            if (target == null || queue.length === 0) {
                return;
            }
            this.queue.forEach(function (message) {
                target.postMessage(message, '*');
            });
            this.queue.length = 0;
        }
    }, {
        key: 'log',
        value: function log(message) {
            if (!this.debug) {
                return;
            }
            // tslint:disable-next-line
            console.log('[' + this.name + ' Messenger]: ' + message);
        }
    }, {
        key: 'warn',
        value: function warn(message) {
            if (!this.debug) {
                return;
            }
            // tslint:disable-next-line
            console.warn('[' + this.name + ' Messenger]: ' + message);
        }
    }, {
        key: 'storeCallback',
        value: function storeCallback(callback) {
            // Optimization, so we don't store a new callback ID for callbacks
            // we have seend before
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
                // tslint:disable-next-line
                console.error('Received received invalid JSON and cannot process the message. ' + error + ' : ' + event.data + ' : ' + JSON.stringify(event.data));
                return;
            }
            this.invokeCallback(receivedMessage);
            this.invokeHandler(receivedMessage);
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
    }]);

    return Messenger;
}();

function transformBreadcrumb(breadcrumb) {
    if (breadcrumb == null || !breadcrumb) {
        return undefined;
    }
    return {
        label: breadcrumb.content,
        href: breadcrumb.url
    };
}
function transformAction(action) {
    if (action == null || !action) {
        return undefined;
    }
    var style = void 0;
    if (action.disabled) {
        style = 'disabled';
    } else if (action.destructive) {
        style = 'danger';
    }
    return {
        label: action.content,
        href: action.url,
        message: action.onAction,
        style: style
    };
}
function transformPagination(pagination) {
    if (pagination == null) {
        return undefined;
    }
    var hasNext = pagination.hasNext,
        hasPrevious = pagination.hasPrevious,
        onNext = pagination.onNext,
        onPrevious = pagination.onPrevious;

    var finalPagination = {};
    if (hasNext && onNext) {
        finalPagination.next = { message: onNext };
    }
    if (hasPrevious && onPrevious) {
        finalPagination.previous = { message: onPrevious };
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
                primaryAction = config.primaryAction,
                pagination = config.pagination;

            this.messenger.send('Shopify.API.Bar.initialize', {
                buttons: {
                    primary: transformAction(primaryAction),
                    secondary: secondaryActions ? secondaryActions.map(transformAction) : undefined
                },
                title: title,
                icon: icon,
                breadcrumb: getLastLevelBreadcrumb(breadcrumbs),
                pagination: transformPagination(pagination)
            });
        }
    }]);

    return Bar;
}();

function getLastLevelBreadcrumb(breadcrumbs) {
    return breadcrumbs && breadcrumbs.length > 0 ? transformBreadcrumb(breadcrumbs[breadcrumbs.length - 1]) : undefined;
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
                    primary: primaryAction ? transformAction(primaryAction) : undefined,
                    secondary: secondaryActions ? secondaryActions.map(transformAction) : undefined
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
                onCancel = config.onCancel,
                onConfirm = config.onConfirm;

            this.storeCloseCallback(function (result) {
                if (result) {
                    if (onConfirm) {
                        onConfirm();
                    }
                } else {
                    if (onCancel) {
                        onCancel();
                    }
                }
            });
            if (onCancel && cancelContent) {
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
                    selectable_resources: resources
                });
            } else {
                this.messenger.send('Shopify.API.Modal.productPicker', {
                    title: title,
                    selectMultiple: allowMultiple,
                    selectable_resources: resources
                });
            }
        }
    }]);

    return ResourcePicker;
}();

var EASDK$1 = function () {
    function EASDK(_ref) {
        var _this = this;

        var apiKey = _ref.apiKey,
            shopOrigin = _ref.shopOrigin,
            metadata = _ref.metadata,
            debug = _ref.debug;

        _classCallCheck(this, EASDK);

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
        this.messenger.send('Shopify.API.initialize', { apiKey: apiKey, metadata: metadata, debug: debug });
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
            this.messenger.send('Shopify.API.flash.notice', { message: message });
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

function withEASDK() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        displayName = _ref.displayName;

    return function addEASDK(WrappedComponent) {
        var WithEASDK = function (_React$Component) {
            _inherits(WithEASDK, _React$Component);

            function WithEASDK() {
                _classCallCheck(this, WithEASDK);

                return _possibleConstructorReturn(this, (WithEASDK.__proto__ || Object.getPrototypeOf(WithEASDK)).apply(this, arguments));
            }

            _createClass(WithEASDK, [{
                key: 'render',
                value: function render() {
                    // TODO: should remove the cast once https://github.com/Microsoft/TypeScript/issues/10727 is resolved
                    var props = Object.assign({}, this.props, { easdk: this.context.easdk });
                    return React.createElement(WrappedComponent, props);
                }
            }]);

            return WithEASDK;
        }(React.Component);

        WithEASDK.displayName = 'withEASDK(' + (displayName || _shopify_reactUtilities_components.getDisplayName(WrappedComponent)) + ')';
        WithEASDK.WrappedComponent = WrappedComponent;
        WithEASDK.contextTypes = { easdk: React.PropTypes.instanceOf(EASDK$1) };
        var FinalComponent = hoistStatics(WithEASDK, WrappedComponent);
        return FinalComponent;
    };
}

var name = "@shopify/quilt";
var version = "0.14.2";

var App$1 = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        var apiKey = props.apiKey,
            shopOrigin = props.shopOrigin,
            forceRedirect = props.forceRedirect,
            debug = props.debug;

        var metadata = _defineProperty({}, name, version);
        _this.easdk = new EASDK$1({ apiKey: apiKey, shopOrigin: shopOrigin, forceRedirect: forceRedirect, metadata: metadata, debug: debug });
        return _this;
    }

    _createClass(App, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { easdk: this.easdk };
        }
    }, {
        key: 'render',
        value: function render() {
            return React.Children.only(this.props.children);
        }
    }]);

    return App;
}(React.Component);

App$1.childContextTypes = {
    easdk: React.PropTypes.instanceOf(EASDK$1)
};

exports.EmbeddedApp = App$1;
exports.EASDK = EASDK$1;
exports.withEASDK = withEASDK;
