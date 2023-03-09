import Editor from '../../src/components/Editor';
import {content} from '../../src/content';

async function getEditorContent() {
  return content;
}

async function EditorPage() {
  const content = await getEditorContent();
  return <Editor initialContent={content} />;
}

export default EditorPage;
