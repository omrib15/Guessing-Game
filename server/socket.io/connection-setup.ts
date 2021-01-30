import { Socket } from 'dgram';
import { events } from '../../shared-events/events';
import { GameController } from '../controllers/game.controller';

const defaultRoom = 'room';
const gameController = new GameController();

export const connectionSetup = (io, socket) => {
    // Join room
    socket.join(defaultRoom);
    socket.to(defaultRoom).emit(events.playerJoined);

    // pre-game
    socket.on(events.noteSubmission, (note) => {
        gameController.addNote(note);
        io.in(defaultRoom).emit('currentNotes', gameController.notes);
    });
};
