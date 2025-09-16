import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {IBookBorrowReturn, ILendingEntry} from "../interfaces/lending.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LendingService {

  constructor(
    private http: HttpClient
  ) { }

  getBorrowedBooks(): Observable<ILendingEntry[]> {
    return this.http.get<ILendingEntry[]>(`${environment.apiEndpoint}lendings/`);
  }

  borrowBook(book_nfc_id: IBookBorrowReturn): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}lendings/`, book_nfc_id);
  }

  returnBook(book_nfc_id: IBookBorrowReturn): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}lendings/return_by_nfc/`, book_nfc_id);
  }
}
