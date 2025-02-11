module.exports = {
  position: 'absolute !important',
  /* Top position is required to prevent unexpected
    scrolling with Sheet component
    https://github.com/Shopify/polaris-react/pull/5208
  */
  top: 0,
  width: '1px !important',
  height: '1px !important',
  margin: '0 !important',
  padding: '0 !important',
  overflow: 'hidden !important',
  clipPath: 'inset(50%) !important',
  border: '0 !important',
  whiteSpace: 'nowrap !important',
};
