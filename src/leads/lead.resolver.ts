import { Logger } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

import { RegisterLeadInput } from "./dtos/register-lead.input";
import { Lead } from "./entities/lead.entity";
import { LeadService } from "./lead.service";

@Resolver(() => Lead)
export class LeadResolver {
  private readonly logger = new Logger(LeadResolver.name);

  constructor(private leadService: LeadService) {}

  @Mutation(() => Lead)
  async register(@Args("input") input: RegisterLeadInput) {
    this.logger.log(`Received register input: ${JSON.stringify(input)}`);

    if (!input || Object.keys(input).length === 0) {
      this.logger.error("Empty input received in register mutation");
      throw new Error("Invalid input provided");
    }

    return this.leadService.register(input);
  }

  @Query(() => [Lead])
  leads() {
    return this.leadService.findAll();
  }

  @Query(() => Lead, { nullable: true })
  lead(@Args("id", { type: () => Int }) id: number) {
    return this.leadService.findOne(id);
  }
}
