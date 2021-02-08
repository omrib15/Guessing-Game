
export class GameController {
    notes: string[] = [];
    teams = {
      red: [],
      blue: []
    }

    constructor() {}

    addNote(note: string): void {
        this.notes.push(note);
    }

    joinTeam(data): void {
        const oppositeTeam = data.team === 'red' ? 'blue' : 'red';
        this.teams[data.team].push(data.name);
        this.teams[oppositeTeam] = this.teams[oppositeTeam].filter(p => p !== data.name);
    }

}
