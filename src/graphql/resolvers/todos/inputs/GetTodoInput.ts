import { Field, InputType } from 'type-graphql';
import { TodoExists } from '../validation/todoExists';

@InputType()
export class GetTodoInput {
	// @ts-ignore
	@Field()
	// @ts-ignore
	@TodoExists({
		message: ({ value }) => `Todo with id ${value} does not exist`,
	})
	id: number;
}


