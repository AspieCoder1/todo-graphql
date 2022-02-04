import { ContextType } from '@ctx/ContextType';
import { Todo } from '@entities/Todo';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ForbiddenError } from 'apollo-server-express';
import { GetTodoInput } from './inputs/GetTodoInput';
import { CreateTodoInput } from './inputs/CreateTodoInput';

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
	}

	@Authorized()
	@Mutation(() => Todo)
	async addTodo(@Arg('data') { body, due }: CreateTodoInput, @Ctx() { req }: ContextType): Promise<Todo | undefined> {
		return Todo.create({ body, due, user: (req as any).userID }).save();
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deleteTodo(@Arg('data') { id }: GetTodoInput): Promise<boolean> {
		const { affected } = await Todo.delete({ id });
		return affected === 1;
	}
}
