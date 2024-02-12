import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private toggleSource = new BehaviorSubject(false);
  toggleMessage = this.toggleSource.asObservable();

  constructor() { }

  toggleStateMethod(value: boolean) {
    this.toggleSource.next(value)
  }
}
