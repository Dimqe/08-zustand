import css from "./SidebarNotes.module.css";

const tags = ["All", "Work", "Personal", "Ideas"];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <a
            href={tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
