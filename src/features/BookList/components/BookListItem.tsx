import type { Book } from "@models";
import { SALES_TAX_RATE } from "../../../const";
import {
  centerColumn,
  container,
  detailMetaDesktop,
  detailMetaMobile,
  leftColumn,
  rightColumn,
  title,
  titleLink,
} from "./BookListItem.module.css";
import { Thumbnail } from "./BookListItemThumbnail";

interface Props {
  book: Book;
}

function additionalInfoToString(additionalInfo: string[]): string {
  if (additionalInfo.length === 0) return "";

  return `(${additionalInfo.join("; ")})`;
}

export function BookListItem({ book }: Readonly<Props>) {
  const { isbn, authors } = book;

  const linkToBookOrJp = `https://www.books.or.jp/book-details/${isbn}`;
  const priceWithTax = book.price
    ? `${Math.floor(book.price * (SALES_TAX_RATE + 1))}円`
    : "金額不明";

  const additionalInfo = additionalInfoToString(book.additionalInfo);

  return (
    <div className={container}>
      <div className={leftColumn}>
        <Thumbnail isbn={isbn} />
      </div>
      <div className={centerColumn}>
        <div className={title}>
          <a className={titleLink} href={linkToBookOrJp}>
            {book.title} {additionalInfo}
          </a>
        </div>
        <div>{authors == null ? "著者不明" : authors.join(", ")}</div>
        <div className={detailMetaDesktop}>
          出版: {book.dateOfIssue} / 税込み価格: {priceWithTax} / ISBN: {isbn}
        </div>
        <div className={detailMetaMobile}>
          <div>出版: {book.dateOfIssue}</div>
          <div>税込み価格: {priceWithTax}</div>
          <div>ISBN: {isbn}</div>
        </div>
      </div>
      <div className={rightColumn} />
    </div>
  );
}
