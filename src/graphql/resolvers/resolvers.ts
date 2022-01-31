import Register from './users/Register';
import { NonEmptyArray } from 'type-graphql';

type ResolversArray = NonEmptyArray<Function> | NonEmptyArray<string>

export default [Register] as ResolversArray;