import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  constructor() { }

  private classementSubject = new Subject<any>();

  public nouveauClassement(): void {
    console.log('Nouveau Classement');
    this.classementSubject.next('Nouveau Classement');
  }
    /*clearMessage() {
        this.subject.next();
    }*/

    receiveClassement(): Observable<any> {
        return this.classementSubject.asObservable();
    }
}
