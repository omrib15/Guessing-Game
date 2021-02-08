import { Player } from './player.class';

export class Team {
  name: string;
  players: Player[];
  constructor(name: string) {
    this.name = name;
    this.players = [];
  }

  addPlayer(player: Player) {
    if (!this.players.includes(player)) {
      this.players.push;
    }
  }

  removePlayer(player: Player) {
    this.players = this.players.filter(p => p !== player);
  }

}
