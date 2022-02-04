import { ContextType } from '@ctx/ContextType';
import { Todo } from '@entities/Todo';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ForbiddenError } from 'apollo-server-express';
import { GetTodoInput } from './inputs/GetTodoInput';
import { CreateTodoInput } from './inputs/CreateTodoInput';
import { UpdateTodoInput } from './inputs/UpdateTodoInput';

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
	@Mutation(() => Todo)
	async deleteTodo(@Arg('data') { id }: GetTodoInput): Promise<Todo> {
		const { raw } = await Todo.delete({ id });
		return raw[0];
	}

	@Authorized()
	@Mutation(() => Todo)
	async editTodo(@Arg('data') { updates, id }: UpdateTodoInput, @Ctx() { req }: ContextType): Promise<Todo> {
		const { raw } = await Todo.update({ id, user: (req as any).userID }, { ...updates });
		return raw[0];
	}
}
