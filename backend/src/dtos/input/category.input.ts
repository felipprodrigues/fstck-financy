import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  description?: string;

  @Field(() => String)
  symbol!: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description?: string;

  @Field(() => String)
  symbol!: string;
}

@InputType()
export class DeleteCategory {
  @Field(() => String)
  id!: string;
}
