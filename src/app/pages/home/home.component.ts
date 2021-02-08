import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../../services/socket-service/socket.service';
import { events } from 'shared/events';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  roomCreationsSub: Subscription;
  joinRoomSub: Subscription;

  constructor(
    private socketService: SocketService,
    private route: Router) { }

  ngOnInit(): void {
    this.roomCreationsSub = this.socketService.listen(events.createRoom).subscribe(roomId => {
      this.route.navigate(['pre-game/'+roomId]);
    });
    this.joinRoomSub = this.socketService.listen(events.joinRoom).subscribe(roomId => {
      this.route.navigate(['pre-game/'+roomId]);
    });
  }

  newRoom(): void {
    this.socketService.emit(events.createRoom);
  }

  joinRoom(roomId: string): void {
    this.socketService.emit(events.joinRoom, roomId);
  }

  ngOnDestroy(): void {
    this.roomCreationsSub.unsubscribe();
  }

}
