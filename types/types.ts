import type { DateTime } from 'luxon';

export interface Seasons {
  decemberSolstice: DateTime;
  marchEquinox: DateTime;
  juneSolstice: DateTime;
  septemberEquinox: DateTime;
}

export interface JDSeasonalCycle {
  decemberSolstice: number;
  marchEquinox: number;
  juneSolstice: number;
  septemberEquinox: number;
}

export type SeasonName = 'winter' | 'autumn' | 'summer' | 'spring';

export type Breed = {
  name: string;
  biome: string | string[];
  image: string;
  backgroundColour: string;
  accentColour: string;
  availability: boolean;
  begin: DateTime | null;
  end: DateTime | null;
  probability: number | null;
};

export type BreedCallback = (d: DateTime) => Breed;
