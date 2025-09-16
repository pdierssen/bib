import {IUser} from './auth.interface';
export interface IAuthor {
  id: string;
  name: string;
}

export interface IPublisher {
  id: number;
  name: string;
}

export interface IBook {
  nfc_id: number;
  authors: IAuthor[];
  publisher: IPublisher;
  title: string;
  isbn: string;
  edition: string;
}

export interface ILendingEntry {
  uuid: string;
  user: IUser;
  book: IBook;
  start_date: string;
  end_date: string;
}
