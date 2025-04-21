import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum ServiceType {
  DELIVERY = "DELIVERY",
  PICK_UP = "PICK_UP",
  PAYMENT = "PAYMENT",
}

registerEnumType(ServiceType, {
  name: "ServiceType",
});

@ObjectType()
export class LeadService {
  @Field(() => Int)
  id: number;

  @Field(() => ServiceType)
  type: ServiceType;
}
