import Editor from '@/components/Editor';
import {content} from '@/content';
import {notFound} from 'next/navigation';

async function getEditorContent() {
  if (process.env.NODE_ENV !== 'development') {
    return notFound();
  }
  return content;
}

async function EditorPage() {
  const content = await getEditorContent();
  return <Editor initialContent={content} />;
}

export default EditorPage;
