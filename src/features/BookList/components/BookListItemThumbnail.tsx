import { useCallback, useState } from "react";
import {
  dummyThumbnailImg,
  thumbnail,
  thumbnailImg,
} from "./BookListItemThumbnail.module.css";

interface ThumbnailProps {
  isbn: string;
}

export function Thumbnail({ isbn }: Readonly<ThumbnailProps>) {
  const [isError, setIsError] = useState(false);

  const imgErrorHandler = useCallback(() => {
    setIsError(true);
  }, []);

  const Fallback = () => <div className={dummyThumbnailImg}>画像なし</div>;

  return (
    <div className={thumbnail}>
      {isError ? (
        <Fallback />
      ) : (
        <img
          className={thumbnailImg}
          src={`https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`}
          alt=""
          onError={imgErrorHandler}
        />
      )}
    </div>
  );
}
