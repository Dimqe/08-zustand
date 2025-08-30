import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}) {
  const tag = params?.slug?.[0] ?? "All";
  const pageTitle =
    tag === "All" ? "All notes | NoteHub" : `Notes filtered by ${tag} | NoteHub`;
  const pageDescription =
    tag === "All"
      ? "Browse all notes in NoteHub."
      : `Browse notes filtered by ${tag} in NoteHub.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://08-zustand-eta-one.vercel.app/notes/filter/${tag}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotesFilterPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const tag = params?.slug?.[0] ?? "All";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { q: "", page: 1, tag: tag === "All" ? undefined : tag }],
    queryFn: () =>
      fetchNotes({
        search: "",
        page: 1,
        tag: tag === "All" ? undefined : tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
