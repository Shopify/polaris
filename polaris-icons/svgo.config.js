module.exports =[
    {
      name: 'preset-default',
      params: {
        overrides: {
          /**
           * viewBox is needed in order to produce 20px by 20px containers
           * with smaller (minor) icons inside.
           */
          removeViewBox: false,

          /**
           * The following 2 settings are disabled to reduce rendering inconsistency
           * on Android. Android uses a subset of the SVG spec called SVG Tiny:
           * https://developer.android.com/studio/write/vector-asset-studio#svg-support
           */

          /**
           * Merging mutliple detached paths into a single path can lead to
           * rendering issues on some platforms where detatched paths are joined
           * by hairlines. Not merging paths results in greater compatibility
           * with minimal additional overhead.
           */
          mergePaths: false,

          convertPathData: {
            /**
             * Mixing absolute and relative path commands can lead to rendering
             * issues on some platforms. This disables converting some path data to
             * absolute if it is shorter, keeping all path data relative. Using
             * relative paths means that data points are relative  to the current
             * point at the start of the path command, which does not greatly
             * increase the quantity of path data.
             */
            utilizeAbsolute: false,
          },
        },
      },
    },
  ],
};