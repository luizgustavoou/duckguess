import { Module } from "@nestjs/common";
import { MatchGateway } from "./match.gateway";
import { AuthModule } from "src/auth/auth.module";
import { MatchService } from './match.service';

@Module({
    imports: [AuthModule,],
    providers: [MatchGateway, MatchService]
})
export class MatchModule { }