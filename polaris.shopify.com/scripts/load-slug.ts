import('../src/utils/route-data-loader').then(({getStaticPaths}) => {
  const paths = getStaticPaths();
  console.log(paths);
});
