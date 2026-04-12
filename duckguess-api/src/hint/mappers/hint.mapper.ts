import { Hint } from '../domain/hint';
import { HintEntity } from '../entities/hint.entity';
import { GuessEntity } from 'src/guess/entities/guess.entity';

export class HintMapper {
  static toDomain(entity: HintEntity): Hint {
    const domain = new Hint();
    domain.id = entity.id;
    domain.text = entity.text;
    domain.guessId = entity.guess?.id ?? null;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    return domain;
  }

  static toEntity(domain: Partial<Hint>): Partial<HintEntity> {
    const entity: Partial<HintEntity> = {};
    if (domain.id !== undefined) entity.id = domain.id;
    if (domain.text !== undefined) entity.text = domain.text;
    if (domain.guessId !== undefined)
      entity.guess = { id: domain.guessId } as GuessEntity;
    return entity;
  }
}
