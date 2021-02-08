import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket-service/socket.service';
import { events } from 'shared/events';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  roomCreationsSub: Subscription;

  constructor(
    private socketService: SocketService,
    private route: Router) { }

  ngOnInit(): void {
    this.roomCreationsSub = this.socketService.listen(events.createRoom).subscribe(roomId => {
      console.log(roomId);
      this.route.navigate(['pre-game/'+roomId]);
    });
  }

  onNewRoom(): void {
    this.socketService.emit(events.createRoom);
  }

}
