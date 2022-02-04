import {Field, InputType} from "type-graphql";

@InputType()
export class CreateTodoInput {
    @Field()
    body: string;

    @Field()
    due: Date;

}