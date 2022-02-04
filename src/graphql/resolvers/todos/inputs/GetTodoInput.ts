import { Field, InputType } from 'type-graphql';
import { TodoExists } from './validation/todoExists';

@InputType()
export class GetTodoInput {
	@Field()
	@TodoExists({
		message: ({ value }) => `Todo with id ${value} does not exist`,
	})
	id: number;
}
