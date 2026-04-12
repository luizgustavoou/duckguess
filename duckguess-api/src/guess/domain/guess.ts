import { Hint } from 'src/hint/domain/hint';

export { Hint };

export class Guess {
  id: string;
  answer: string;
  themeId: string;
  createdAt: Date;
  updatedAt: Date;
  hints: Hint[];
}
