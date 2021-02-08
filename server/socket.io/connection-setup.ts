import { Socket } from 'dgram';
import { events } from '../../shared/events';
import { GameController } from '../controllers/game.controller';
import { cloneDeep } from 'lodash';
import * as short from 'short-uuid';

const defaultRoom = 'room';
const gameController = new GameController();
const rooms = {};

export const connectionSetup = (io, socket) => {
    // Join room
    // socket.join(defaultRoom);
    // socket.to(defaultRoom).emit(events.playerJoined);

    // home
    socket.on(events.createRoom, () => {
      const newRoomId = short.generate();
      rooms[newRoomId] = new GameController();
      // attach room id to socket for easier communication
      socket.gameRoom = newRoomId;
      socket.join(newRoomId);
      socket.emit(events.createRoom, newRoomId);
      // remove later
      socket.to(newRoomId).emit(events.playerJoined);
    });

    // pre-game
    socket.on(events.noteSubmission, (note: string) => {
        gameController.addNote(note);
        io.in(socket.gameRoom).emit('currentNotes', gameController.notes);
    });

    socket.on(events.joinTeam, (data) => {
      gameController.joinTeam(JSON.parse(data));
      io.in(socket.gameRoom).emit(events.joinTeam, gameController.teams);
    });
};
