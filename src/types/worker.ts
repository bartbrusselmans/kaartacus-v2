import type { BggBoardgame } from './boardgame';

export interface BggResponse {
  user: string;
  games: BggBoardgame[];
}
