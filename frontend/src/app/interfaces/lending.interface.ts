import {IUser} from './auth.interface';
export interface IAuthor {
  id: number;
  first_name: string;
  last_name: string;
}

export interface IPublisher {
  id: number;
  name: string;
}

export interface IBook {
  nfc_id: number;
  title: string;
  authors: IAuthor[];
  edition: string;
  publisher: IPublisher;
  isbn: string;
}

export interface ILendingEntry {
  book: IBook;
  start_date: string;
  end_date: string;
  user: IUser
}
