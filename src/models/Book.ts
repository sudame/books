export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  price: number | null;
  dateOfIssue: string;
}
