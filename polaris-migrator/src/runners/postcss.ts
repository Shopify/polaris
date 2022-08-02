import postCssProcessor, {
  Plugin as PostCssPlugin,
  ProcessOptions,
} from 'postcss';

export type Plugin = PostCssPlugin;

export const postcss = (plugin: () => Plugin) => {
  return {
    ...postCssProcessor,
    process(fileContent: string, options: ProcessOptions = {}) {
      return postCssProcessor(plugin()).process(fileContent, {
        parser: require('post-scss'),
        ...options,
      }).css;
    },
  };
};
