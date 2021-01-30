import { events } from '../../shared-events/events';
const defaultRoom = 'room';

export const connectionSetup = (socket) => {
    // Join room
    socket.join('room');
    socket.to('room').emit(events.playerJoined);

    // pre-game
    socket.on(events.noteSubmission, onNoteSubmit);
};

const onNoteSubmit = (note: string) => {
    console.log('note submitted ' + note);
}
