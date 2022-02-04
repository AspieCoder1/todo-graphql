import { Field, InputType } from 'type-graphql';
import { CreateTodoInput } from './CreateTodoInput';
import { TodoExists } from './validation/todoExists';

@InputType()
export class UpdateTodoInput {
	@Field()
	@TodoExists({
		message: ({ value }) => `Todo with id ${value} does not exist`,
	})
	id: number;

	@Field()
	updates: CreateTodoInput;
}
