import { Field, InputType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { IsEmailUnique } from './validation/isUniqueEmail';

@InputType()
export class RegisterInput {
	@Field()
	@Length(1, 30)
	firstName: string;

	@Field()
	@Length(1, 55)
	lastName: string;

	@Field()
	@IsEmail()
	@IsEmailUnique({ message: 'email already in use' })
	email: string;

	@Field()
	password: string;
}
