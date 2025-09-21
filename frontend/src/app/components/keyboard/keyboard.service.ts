import {computed, Injectable, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private _key = new BehaviorSubject<string>('');
  public keyObservable = this._key.asObservable();

  constructor() { }

  keyPressed(incomingKey: string) {
    this._key.next(incomingKey);
  }
}
