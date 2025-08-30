'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { useNoteStore, NoteDraft, initialDraft } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [loading, setLoading] = useState(false);

  // Завантажуємо draft при монтованні компонента
  useEffect(() => {
    if (!draft.title && !draft.content) {
      setDraft(initialDraft);
    }
  }, [draft, setDraft]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ [name]: value } as Partial<NoteDraft>);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createNote(draft);
      clearDraft(); // очищаємо draft після успішного створення
      router.back();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form} aria-label="Create a new note">
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
          required
          autoFocus
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" value={draft.tag} onChange={handleChange} className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose} disabled={loading}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={loading}>
          {loading ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
