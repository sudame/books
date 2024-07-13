import { searchBooks } from "@apis";
import type { Book } from "@models";
import { useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useRef } from "react";

interface Props {
  onSearched?: (books: Book[]) => void;
}

export function SearchBooks({ onSearched }: Readonly<Props>) {
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const query = inputRef.current?.value;

    if (query == null) return;

    queryClient
      .fetchQuery({
        queryKey: ["searchBooks", query],
        queryFn: () => searchBooks(query),
        staleTime: Number.POSITIVE_INFINITY,
      })
      .then((books) => {
        onSearched?.(books);
      });
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
