import css from './page.module.css';

export const metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'The page you are looking for does not exist in NoteHub.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'The page you are looking for does not exist in NoteHub.',
    url: 'https://your-vercel-domain.vercel.app/404',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
