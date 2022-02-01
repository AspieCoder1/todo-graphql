import Register from './users/register/Register';
import { NonEmptyArray } from 'type-graphql';

type ResolversArray = NonEmptyArray<Function> | NonEmptyArray<string>

export default [Register] as ResolversArray;