import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  readonly serverUri = 'http://localhost:8080';

  constructor() { 
    this.socket = io(this.serverUri);
  }

  listen(event: string): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      this.socket.on(event, data => {
        subscriber.next(data);
      });
    })
  }

  emit(event: string, data = ''): void {
    this.socket.emit(event, data);
  }
}
