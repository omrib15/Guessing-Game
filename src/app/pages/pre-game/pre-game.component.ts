import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { events } from 'shared-events/events';
import { SocketService } from 'src/app/services/socket-service/socket.service';

@Component({
  selector: 'app-pre-game',
  templateUrl: './pre-game.component.html',
  styleUrls: ['./pre-game.component.scss']
})
export class PreGameComponent implements OnInit, OnDestroy {
  userConnectionsSub: Subscription;
  currentNotsSub: Subscription;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    console.log("pre " + events.playerJoined);
    this.userConnectionsSub = this.socketService.listen(events.playerJoined).subscribe(message => {
      console.log(message);
    });
    this.currentNotsSub = this.socketService.listen('currentNotes').subscribe(message => {
      console.log(message);
    })
  }

  onNoteSubmit(note: string) {
    this.socketService.emit(events.noteSubmission, note);
  }

  ngOnDestroy(): void {
    this.userConnectionsSub.unsubscribe();
    this.currentNotsSub.unsubscribe();
  }

}
