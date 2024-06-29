import { useState } from "react";
import { TinyBook } from "@models";
import { BookList } from "@features/BookList";
import { SearchBooks } from "@features/SearchBooks";

export function App() {
  const [books, setBooks] = useState<TinyBook[]>([]);
  return (
    <div>
      <SearchBooks onSearched={setBooks} />
      <BookList books={books} />
    </div>
  );
}
