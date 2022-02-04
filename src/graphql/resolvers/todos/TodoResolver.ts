import { ContextType } from '@ctx/ContextType';
import { Todo } from '@entities/Todo';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { ForbiddenError } from 'apollo-server-express';
import { GetTodoInput } from './inputs/GetTodoInput';

@Resolver(Todo)
export class TodoResolver {
	@Authorized()
	@Query(() => Todo)
	async getTodo(@Arg('data') { id }: GetTodoInput, @Ctx() { req }: ContextType): Promise<Todo | undefined> {
		const todo = await Todo.findOne({ where: { id } });

		if (todo?.user !== (req as any).userID) {
			throw new ForbiddenError(`You are not authorised to access that todo`);
		}

		return todo;
	};
}