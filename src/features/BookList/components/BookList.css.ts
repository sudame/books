import { style } from "@vanilla-extract/css";

export const listItemWrapper = style({
  borderBottom: "1px solid #ddd",
  padding: "1rem",

  ":last-child": {
    borderBottom: "none",
  },
});
