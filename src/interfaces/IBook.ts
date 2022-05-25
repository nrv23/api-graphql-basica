export interface IBook {
  id: string;
  title: string;
  isbn: string;
  pageCount: number;
  publishedDate?: string;
  thumbnailUrl?: string;
  shortDescription?: string;
  longDescription?: string;
  status: string;
  authors: Array<string>; //indica que va devolver un array de de tipo string donde no pueden existir datos nulos
}
