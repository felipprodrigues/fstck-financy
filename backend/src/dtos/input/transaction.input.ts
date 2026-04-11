import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  type!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Number)
  cashFlow!: number;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  description?: string;

  @Field(() => Number)
  cashFlow!: number;

  @Field(() => String)
  categoryId!: string
}
