import { useQuery } from "@tanstack/react-query";
import { getBook } from "@apis";
import {
  centerColumn,
  container,
  detailMetaDesktop,
  detailMetaMobile,
  dummyThumbnailImg,
  leftColumn,
  rightColumn,
  thumbnail,
  thumbnailImg,
  title,
  titleLink,
} from "./BookListItem.module.css";
import { SALES_TAX_RATE } from "../../../const";
import { TinyBook, Book } from "@models";

interface Props {
  tinyBook: TinyBook;
}

export function BookListItem({ tinyBook }: Readonly<Props>) {
  const { isbn } = tinyBook;

  const { data: book } = useQuery({
    queryKey: ["book", isbn],
    queryFn: async () => {
      const book = await getBook(isbn);
      if (book == null) {
        return {
          title: tinyBook.title,
          authors: tinyBook.authors,
          price: null,
          dateOfIssue: "不明",
        } as Book;
      }
      return book;
    },
    throwOnError: true,
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });

  if (book == null) return null;

  const linkToBookOrJp = `https://www.books.or.jp/book-details/${isbn}`;
  const priceWithTax = book.price
    ? Math.floor(book.price * (SALES_TAX_RATE + 1)) + "円"
    : "金額不明";

  return (
    <div className={container}>
      <div className={leftColumn}>
        <div className={thumbnail}>
          {tinyBook.thumbnailUrl ? (
            <img
              className={thumbnailImg}
              src={tinyBook.thumbnailUrl}
              alt={book.title}
            />
          ) : (
            <div className={dummyThumbnailImg}>画像なし</div>
          )}
        </div>
      </div>
      <div className={centerColumn}>
        <div className={title}>
          <a className={titleLink} href={linkToBookOrJp}>
            {book.title}
          </a>
        </div>
        <div>{book.authors.join(", ")}</div>
        <div className={detailMetaDesktop}>
          出版: {book.dateOfIssue} / 税込み価格: {priceWithTax}
        </div>
        <div className={detailMetaMobile}>
          <div>出版: {book.dateOfIssue}</div>
          <div>税込み価格: {priceWithTax}</div>
        </div>
      </div>
      <div className={rightColumn}>
        <div>
          {/* <a href={linkToBookOrJp} target="_blank" rel="noreferrer">
            本の詳細
          </a> */}
        </div>
      </div>
    </div>
  );
}
