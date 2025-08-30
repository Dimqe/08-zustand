"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, tag]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", { q: debouncedSearch, page, tag }],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch,
        page,
        tag: tag === "All" ? undefined : tag,
      }),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const openNewNote = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes.</p>;

  return (
    <div className={css.app}>
      <div className={css.controls}>
        <SearchBox value={search} onChange={setSearch} />
        <button type="button" onClick={openNewNote} className={css.newButton}>
          + New note
        </button>
      </div>

      <NoteList notes={notes} />

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          page={page}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}