import { v4 as uuidv4 } from 'uuid';


export class Hint {
  public id: string;
  public text: string;
  public guessId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  private constructor({ id, text, guessId, createdAt, updatedAt }: { id: string, text: string, guessId?: string, createdAt?: Date, updatedAt?: Date }) {
    this.id = id;
    this.text = text;
    this.guessId = guessId;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  static create({ text, guessId }: { text: string, guessId?: string }): Hint {
    const id = uuidv4();

    return new Hint({ id, text, guessId });
  }
}
