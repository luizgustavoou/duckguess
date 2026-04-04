import { Module } from "@nestjs/common";
import { MatchGateway } from "./match.gateway";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [AuthModule,],
    providers: [MatchGateway]
})
export class MatchModule { }