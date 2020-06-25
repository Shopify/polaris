// Our esnext build lives in dist/esnext.
// However currently sewing-kit expects the esnext build to live in the esnext
// folder and there's no way to tell it otherwise currently.
// So have this little redirect file for the sake of keeping SK happy until we
// have a better mechanism defining the esnext entrypoint
// eslint-disable-next-line import/no-unresolved
export * from '../dist/esnext';
