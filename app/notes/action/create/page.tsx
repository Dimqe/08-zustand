
import type { Metadata } from 'next';
import CreateNoteClient from './CreateNote.client';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description: 'Create a new note in NoteHub with title, content, and tag.',
  openGraph: {
    title: 'Create note | NoteHub',
    description: 'Create a new note in NoteHub with title, content, and tag.',
    url: 'https://08-zustand-eta-one.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub create note preview',
      },
    ],
  },
};

export default function CreateNoteWrapper() {
  return <CreateNoteClient />;
}
