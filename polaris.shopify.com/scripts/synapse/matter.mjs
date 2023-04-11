import {matter} from 'vfile-matter';

/**
 * Plugin to parse YAML frontmatter and expose it at `file.data.matter`.
 *
 * @type {import('unified').Plugin<Array<void>>}
 */
export default function myUnifiedPluginHandlingYamlMatter() {
  const parser = (_, file) => {
    matter(file);

    return file;
  };

  Object.assign(this, {Parser: parser});
}
