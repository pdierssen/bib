import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {ILendingEntry} from "../interfaces/lending.interface";
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

  borrowBook(book_nfc_id: string): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}lendings/${book_nfc_id}/`, {});
  }

  returnBook(book_nfc_id: string): Observable<any> {
    return this.http.delete(`${environment.apiEndpoint}lendings/${book_nfc_id}/`, {});
  }
}
