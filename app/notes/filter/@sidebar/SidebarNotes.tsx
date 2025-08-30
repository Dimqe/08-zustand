import css from './SidebarNotes.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <a
            href={
              tag === 'All'
                ? '/notes/filter/All'
                : `/notes/filter/${tag}`
            }
            className={css.menuLink}
          >
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}