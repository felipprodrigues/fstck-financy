import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { TransactionType } from "../dtos/input/transaction.input";

@ObjectType()
export class TransactionModel {
  @Field(()=> ID)
  id!: string

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => String)
  description!: string;

  @Field(() => Number)
  cashFlow!: number;

  @Field(() => String)
  category!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date

  @Field(() => String)
  userId!: string

  @Field(() => UserModel)
  user: UserModel
}
