import type { TinyBook } from "@models";
import { Suspense } from "react";
import { listItemWrapper } from "./BookList.module.css";
import { BookListItem } from "./BookListItem";

interface Props {
  books: TinyBook[];
}

export function BookList({ books }: Readonly<Props>) {
  return (
    <div>
      {books.map((book) => (
        <Suspense key={book.isbn} fallback="Loading...">
          <div className={listItemWrapper}>
            <BookListItem tinyBook={book} />
          </div>
        </Suspense>
      ))}
    </div>
  );
}
