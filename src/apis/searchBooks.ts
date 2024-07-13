import type { TinyBook } from "../models/TinyBook";

interface GoogleBook {
  volumeInfo: {
    title: string;
    authors: string[];
    industryIdentifiers?: { type: string; identifier: string }[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
}

function googleBookToBook(input: GoogleBook): TinyBook {
  const isbn = input.volumeInfo.industryIdentifiers?.find(
    (id) => id.type === "ISBN_13",
  )?.identifier;

  if (!isbn) {
    throw new Error("ISBN not found");
  }

  const thumbnailUrl =
    input.volumeInfo.imageLinks?.thumbnail ??
    input.volumeInfo.imageLinks?.smallThumbnail ??
    null;

  return {
    title: input.volumeInfo.title,
    authors: input.volumeInfo.authors,
    isbn,
    thumbnailUrl,
  };
}

function filterPaperBooks(books: GoogleBook[]): GoogleBook[] {
  return books.filter((book) => {
    return (
      book.volumeInfo.industryIdentifiers?.some(
        (id) => id.type === "ISBN_13",
      ) ?? false
    );
  });
}

export function searchBooks(query: string): Promise<TinyBook[]> {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((response) => response.json())
    .then((data) => data.items)
    .then(filterPaperBooks)
    .then((books) => books.map(googleBookToBook));
}
