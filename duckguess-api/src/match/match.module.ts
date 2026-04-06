import { Module } from "@nestjs/common";
import { MatchGateway } from "./match.gateway";
import { AuthModule } from "src/auth/auth.module";
import { MatchService } from './match.service';
import { MatchRepository } from './match.repository';
import { MatchRepositoryRedis } from './match.repository.redis';

@Module({
    imports: [AuthModule,],
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