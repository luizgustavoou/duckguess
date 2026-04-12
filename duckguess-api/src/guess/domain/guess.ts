import { v4 as uuidv4 } from 'uuid';
import { Hint } from 'src/hint/domain/hint';

export { Hint };

export class Guess {
  public id: string;
  public answer: string;
  public themeId: string;
  public hints: Hint[];
  public createdAt?: Date;
  public updatedAt?: Date;

  private constructor({ id, answer, themeId, hints, createdAt, updatedAt }: { id: string, answer: string, themeId: string, hints: Hint[], createdAt?: Date, updatedAt?: Date }) {
    this.id = id;
    this.answer = answer;
    this.themeId = themeId;
    this.hints = hints;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  static create({ answer, themeId, hints, createdAt, updatedAt }: { answer: string, themeId: string, hints: Hint[], createdAt?: Date, updatedAt?: Date }): Guess {
    const id = uuidv4();

    const guess = new Guess({ id, answer, themeId, hints, createdAt, updatedAt });

    return guess;
  }
}
