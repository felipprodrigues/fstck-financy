import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";

@ObjectType()
export class CategoryOutput {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String)
  symbol!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}
