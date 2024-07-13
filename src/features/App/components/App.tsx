import { BookList } from "@features/BookList";
import { SearchBooks } from "@features/SearchBooks";
import type { TinyBook } from "@models";
import { useState } from "react";

export function App() {
  const [books, setBooks] = useState<TinyBook[]>([]);
  return (
    <div>
      <SearchBooks onSearched={setBooks} />
      <BookList books={books} />
    </div>
  );
}
