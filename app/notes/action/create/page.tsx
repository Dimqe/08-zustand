// app/notes/action/create/page.tsx
import CreateNoteClient from './CreateNote.client';

export const metadata = {
  title: 'Create note | NoteHub',
  description: 'Create a new note in NoteHub with title, content, and tag.',
  openGraph: {
    title: 'Create note | NoteHub',
    description: 'Create a new note in NoteHub with title, content, and tag.',
    url: 'https://your-vercel-domain.vercel.app/notes/action/create',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function CreateNoteWrapper() {
  return <CreateNoteClient />;
}
