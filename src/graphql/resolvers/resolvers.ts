import UserResolver from './users/UserResolver';
import { NonEmptyArray } from 'type-graphql';

type ResolversArray = NonEmptyArray<Function> | NonEmptyArray<string>

export default [UserResolver] as ResolversArray;