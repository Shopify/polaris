// Our esnext build lives in dist/esnext.
// However currently sewing-kit expects the esnext's entrypoint to be this file
// thanks to a hardcoded alias:
// https://github.com/Shopify/sewing-kit/blob/9911ec817ebd21384f549187a481f6b624cf7182/packages/sewing-kit/src/tools/webpack/config/resolve.ts#L45-L50.
// Once that alias is removed then sewing-kit will use the `sewing-kit:esnext`
// key in our package.json as the entrypoint and this file can be removed.
export * from '../dist/esnext/index.ts.esnext';
