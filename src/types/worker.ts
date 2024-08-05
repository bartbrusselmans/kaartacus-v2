import type { BggBoardgame } from './boardgame';
import type { KaartacusMember } from './member';

export interface WorkerData {
  users: KaartacusMember[];
}

export interface BggResponse {
  user: string;
  games: BggBoardgame[];
}
