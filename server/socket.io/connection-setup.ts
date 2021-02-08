import { Socket } from 'dgram';
import { events } from '../../shared/events';
import { GameController } from '../controllers/game.controller';
import { cloneDeep } from 'lodash';

const defaultRoom = 'room';
const gameController = new GameController();

export const connectionSetup = (io, socket) => {
    // Join room
    socket.join(defaultRoom);
    socket.to(defaultRoom).emit(events.playerJoined);

    // pre-game
    socket.on(events.noteSubmission, (note: string) => {
        gameController.addNote(note);
        io.in(defaultRoom).emit('currentNotes', gameController.notes);
    });

    socket.on(events.joinTeam, (data) => {
      gameController.joinTeam(JSON.parse(data));
      io.in(defaultRoom).emit(events.joinTeam, gameController.teams);
    });
};
