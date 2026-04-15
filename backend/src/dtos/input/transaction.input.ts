import { Field, InputType, registerEnumType } from "type-graphql";

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

registerEnumType(TransactionType, { name: "TransactionType" });

@InputType()
export class CreateTransactionInput {
  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => String)
  description!: string;

  @Field(() => Number)
  cashFlow!: number;

  @Field(() => String)
  categoryId!: string;

  @Field(() => String, { nullable: true })
  date?: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String)
  id!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => String)
  description?: string;

  @Field(() => Number)
  cashFlow!: number;

  @Field(() => String)
  categoryId!: string;

  @Field(() => String, { nullable: true })
  date?: string;
}
