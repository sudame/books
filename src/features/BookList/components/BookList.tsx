import type { Book } from "@models";
import { Suspense } from "react";
import { listItemWrapper } from "./BookList.module.css";
import { BookListItem } from "./BookListItem";

interface Props {
  books: Book[];
}

export function BookList({ books }: Readonly<Props>) {
  return (
    <div>
      {books.map((book) => (
        <Suspense key={book.isbn} fallback="Loading...">
          <div className={listItemWrapper}>
            <BookListItem book={book} />
          </div>
        </Suspense>
      ))}
    </div>
  );
}
