import { Suspense } from "react";
import { BookListItem } from "./BookListItem";
import { listItemWrapper } from "./BookList.module.css";
import { TinyBook } from "@models";

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
