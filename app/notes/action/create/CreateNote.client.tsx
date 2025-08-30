'use client';

import { useRouter } from 'next/navigation';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function CreateNoteClient() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onClose={handleClose} />
      </div>
    </main>
  );
}
