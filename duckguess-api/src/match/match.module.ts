import { Module } from "@nestjs/common";
import { MatchGateway } from "./match.gateway";
import { MatchService } from './match.service';
import { MatchRepository } from './match.repository';
import { MatchRepositoryRedis } from './match.repository.redis';
import { ThemeModule } from "src/theme/theme.module";
import { GuessModule } from "src/guess/guess.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";

@Module({
    imports: [
        ThemeModule,
        GuessModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1y' },
        }),
    ],
    providers: [
        MatchGateway,
        MatchService,
        {
            provide: MatchRepository,
            useClass: MatchRepositoryRedis,
        },
    ],
    exports: [MatchService],
})
export class MatchModule { }