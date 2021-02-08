import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { events } from 'shared/events';
import { Team } from 'shared/models/team.class';
import { SocketService } from 'src/app/services/socket-service/socket.service';

@Component({
  selector: 'app-pre-game',
  templateUrl: './pre-game.component.html',
  styleUrls: ['./pre-game.component.scss']
})
export class PreGameComponent implements OnInit, OnDestroy {
  userConnectionsSub: Subscription;
  currentNotsSub: Subscription;
  teamsSub: Subscription;

  teams;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    console.log("pre " + events.playerJoined);
    this.userConnectionsSub = this.socketService.listen(events.playerJoined).subscribe(message => {
      console.log(message);
    });
    this.currentNotsSub = this.socketService.listen('currentNotes').subscribe(message => {
      console.log(message);
    });
    this.teamsSub = this.socketService.listen(events.joinTeam).subscribe(teams => {
      console.log(teams);
      this.teams = teams;
    })
  }

  onNoteSubmit(note: string) {
    this.socketService.emit(events.noteSubmission, note);
  }

  onTeamSelect(team: string, name) {
    this.socketService.emit(events.joinTeam, JSON.stringify({team, name}));
  }

  ngOnDestroy(): void {
    this.userConnectionsSub.unsubscribe();
    this.currentNotsSub.unsubscribe();
  }

}
