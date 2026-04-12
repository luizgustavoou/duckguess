import { Theme } from '../domain/theme';
import { ThemeEntity } from '../entities/theme.entity';

export class ThemeMapper {
  static toDomain(entity: ThemeEntity): Theme {
    const domain = new Theme();
    domain.id = entity.id;
    domain.value = entity.value;
    return domain;
  }

  static toEntity(domain: Partial<Theme>): ThemeEntity {
    const entity = new ThemeEntity();
    if (domain.id) entity.id = domain.id;
    if (domain.value) entity.value = domain.value;
    return entity;
  }
}
