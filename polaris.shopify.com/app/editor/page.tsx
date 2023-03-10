import Editor from '../../src/components/Editor';
import {content} from '../../src/content';

async function getEditorContent() {
  return content;
}

async function EditorPage() {
  const content = await getEditorContent();

  if (process.env.NODE_ENV !== 'development') {
    // TODO: Return <Error404Page />
    return null;
  }

  return <Editor initialContent={content} />;
}

export default EditorPage;
