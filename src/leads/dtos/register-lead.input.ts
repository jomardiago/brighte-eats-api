import { Field, InputType } from "@nestjs/graphql";

import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

import { ServiceType } from "../entities/lead-service.entity";

@InputType()
export class RegisterLeadInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  mobile: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  postcode: string;

  @Field(() => [ServiceType])
  @IsEnum(ServiceType, { each: true })
  services: ServiceType[];
}
