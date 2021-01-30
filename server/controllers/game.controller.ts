export class GameController {
    notes = [];

    constructor() {}

    addNote(note: string): void {
        this.notes.push(note);
    }
}