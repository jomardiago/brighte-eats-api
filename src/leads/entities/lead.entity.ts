import { Field, Int, ObjectType } from "@nestjs/graphql";

import { LeadService } from "./lead-service.entity";

@ObjectType()
export class Lead {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  mobile: string;

  @Field()
  postcode: string;

  @Field(() => [LeadService])
  services: LeadService[];

  @Field()
  createdAt: Date;
}
