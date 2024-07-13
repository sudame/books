import type { Book } from "@models";
import { SALES_TAX_RATE } from "../../../const";
import {
  centerColumn,
  container,
  detailMetaDesktop,
  detailMetaMobile,
  dummyThumbnailImg,
  leftColumn,
  rightColumn,
  thumbnail,
  // thumbnailImg,
  title,
  titleLink,
} from "./BookListItem.module.css";

interface Props {
  book: Book;
}

export function BookListItem({ book }: Readonly<Props>) {
  const { isbn, authors } = book;

  const linkToBookOrJp = `https://www.books.or.jp/book-details/${isbn}`;
  const priceWithTax = book.price
    ? `${Math.floor(book.price * (SALES_TAX_RATE + 1))}円`
    : "金額不明";

  return (
    <div className={container}>
      <div className={leftColumn}>
        <div className={thumbnail}>
          <div className={dummyThumbnailImg}>画像なし</div>
        </div>
      </div>
      <div className={centerColumn}>
        <div className={title}>
          <a className={titleLink} href={linkToBookOrJp}>
            {book.title}
          </a>
        </div>
        <div>{authors == null ? "著者不明" : authors.join(", ")}</div>
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
