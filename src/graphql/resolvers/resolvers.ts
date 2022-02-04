import UserResolver from './users/UserResolver';
import { NonEmptyArray } from 'type-graphql';
import { TodoResolver } from './todos/TodoResolver';

type ResolversArray = NonEmptyArray<Function> | NonEmptyArray<string>;

export default [UserResolver, TodoResolver] as ResolversArray;
