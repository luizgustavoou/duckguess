import { HintMapper } from 'src/hint/mappers/hint.mapper';
import { ThemeEntity } from 'src/theme/entities/theme.entity';
import { Guess } from '../domain/guess';
import { GuessEntity } from '../entities/guess.entity';

export class GuessMapper {
  static toDomain(entity: GuessEntity): Guess {
    const domain = Guess.create({
      answer: entity.answer,
      themeId: entity.theme?.id ?? null,
      hints: entity.hints ? entity.hints.map(HintMapper.toDomain) : [],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
    return domain;
  }

  static toEntity(domain: Partial<Guess>): Partial<GuessEntity> {
    const entity: Partial<GuessEntity> = {};
    if (domain.id !== undefined) entity.id = domain.id;
    if (domain.answer !== undefined) entity.answer = domain.answer;
    if (domain.themeId !== undefined)
      entity.theme = { id: domain.themeId } as ThemeEntity;
    if (domain.hints !== undefined)
      entity.hints = domain.hints.map(HintMapper.toEntity) as any;
    return entity;
  }
}
