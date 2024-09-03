import type { EntryFieldTypes } from 'contentful';

export interface Boardgame {
  contentTypeId: 'boardgame';
  fields: {
    name: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.RichText;
    minimumNumberOfPlayers: EntryFieldTypes.Integer;
    maximumNumberOfPlayers: EntryFieldTypes.Integer;
    playedBestWith: EntryFieldTypes.Symbol;
    genre: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    rating: EntryFieldTypes.Number;
    objectId: EntryFieldTypes.Symbol;
  };
}

export interface Member {
  contentTypeId: 'member';
  fields: {
    name: EntryFieldTypes.Symbol;
    bggUsername: EntryFieldTypes.Symbol;
  };
}

export type DefaultParams = {
  spaceId?: string;
  environmentId?: string;
  organizationId?: string;
};

export type OptionalDefaults<T> = Omit<T, keyof DefaultParams> &
  ('organizationId' extends keyof T
    ? {
        organizationId?: string;
      }
    : Record<string, unknown>) &
  ('spaceId' extends keyof T
    ? {
        spaceId?: string;
      }
    : Record<string, unknown>) &
  ('environmentId' extends keyof T
    ? {
        environmentId?: string;
      }
    : Record<string, unknown>);
