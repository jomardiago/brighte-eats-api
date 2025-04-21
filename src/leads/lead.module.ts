import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { LeadResolver } from "./lead.resolver";
import { LeadService } from "./lead.service";

@Module({
  providers: [LeadResolver, LeadService, PrismaService],
})
export class LeadModule {}
