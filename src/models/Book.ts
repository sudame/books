export interface Book {
  isbn: string;
  title: string;
  authors: string[] | null;
  price: number | null;
  dateOfIssue: string | null;

  additionalInfo: string[];
}
