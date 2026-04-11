import { Module } from "@nestjs/common";
import { MatchGateway } from "./match.gateway";
import { AuthModule } from "src/auth/auth.module";
import { MatchService } from './match.service';
import { MatchRepository } from './match.repository';
import { MatchRepositoryRedis } from './match.repository.redis';
import { ThemeModule } from "src/theme/theme.module";
import { GuessModule } from "src/guess/guess.module";

@Module({
    imports: [AuthModule, ThemeModule, GuessModule],
    providers: [
        MatchGateway,
        MatchService,
        {
            provide: MatchRepository,
            useClass: MatchRepositoryRedis,
        },
    ]
})
export class MatchModule { }