import { Suspense } from "react";
import { BookListItem } from "./BookListItem";
import styles from "./BookList.module.css";
import { TinyBook } from "@models";

interface Props {
  books: TinyBook[];
}

export function BookList({ books }: Readonly<Props>) {
  return (
    <div>
      {books.map((book) => (
        <Suspense key={book.isbn} fallback="Loading...">
          <div className={styles.listItemWrapper}>
            <BookListItem tinyBook={book} />
          </div>
        </Suspense>
      ))}
    </div>
  );
}
