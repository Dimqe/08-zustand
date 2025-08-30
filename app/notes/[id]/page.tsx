import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const note = await fetchNoteById(params.id);

  const pageTitle = `${note.title} | NoteHub`;
  const pageDescription = note.content
    ? note.content.slice(0, 150) + '...'
    : 'Note details in NoteHub.';

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://your-vercel-domain.vercel.app/notes/${params.id}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
