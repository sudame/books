import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  gap: "1rem",
});

export const leftColumn = style({
  width: "120px",
  maxWidth: "25vw",
  flexShrink: 0,
});

export const centerColumn = style({});

export const rightColumn = style({});

export const thumbnail = style({
  aspectRatio: "1 / 1",
  display: "block",
});

export const thumbnailImg = style({
  display: "block",
  width: "100%",
  objectFit: "contain",
  border: "1px solid #ddd",
});

export const dummyThumbnailImg = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  aspectRatio: "1 / 1.41",
  backgroundColor: "#ddd",
  fontSize: "0.8rem",
});

export const title = style({
  fontWeight: "bold",
  fontSize: "1.2rem",
});

export const titleLink = style({
  color: "mediumblue",
  textDecoration: "none",

  ":hover": {
    textDecoration: "underline",
  },
});

export const detailMetaDesktop = style({
  color: "#666",
  fontSize: "0.9rem",

  "@media": {
    "(max-width: 900px)": {
      display: "none",
    },
  },
});

export const detailMetaMobile = style({
  color: "#666",
  fontSize: "0.8rem",

  "@media": {
    "(min-width: 900px)": {
      display: "none",
    },
  },
});
