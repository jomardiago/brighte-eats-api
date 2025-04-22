import { BadRequestException, Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { RegisterLeadInput } from "./dtos/register-lead.input";

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async register(input: RegisterLeadInput) {
    const emailHasVoted = await this.prisma.lead.findFirst({
      where: {
        email: input.email,
      },
    });

    if (emailHasVoted) {
      throw new BadRequestException(
        "An interests submission is already created for this email."
      );
    }

    return this.prisma.lead.create({
      data: {
        ...input,
        services: {
          create: input.services.map((type) => ({ type })),
        },
      },
      include: {
        services: true,
      },
    });
  }

  findAll() {
    return this.prisma.lead.findMany({ include: { services: true } });
  }

  findOne(id: number) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: { services: true },
    });
  }
}
