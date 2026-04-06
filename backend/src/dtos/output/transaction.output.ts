import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";

@ObjectType()
export class TransactionOutput {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Number)
  cashFlow!: number;

  @Field(() => String)
  categoryId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => String)
  userId!: string
}
