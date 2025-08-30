'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '@/types/note';

export interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => {
          const newDraft = { ...state.draft, ...note };
          
          if (
            state.draft.title === newDraft.title &&
            state.draft.content === newDraft.content &&
            state.draft.tag === newDraft.tag
          ) {
            return state; 
          }
          return { draft: newDraft };
        }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft', 
    }
  )
);
