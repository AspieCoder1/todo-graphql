import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { User } from '../../../entities/User';
import * as bcrypt from 'bcryptjs';


@Resolver(User)
class Register {
	@Query(() => String)
	hello(): string {
		return 'Hello world';
	}

	@FieldResolver()
	name(@Root() parent: User): string {
		return `${parent.firstName} ${parent.lastName}`;
	}

	@Mutation(() => User)
	async registerUser(
		@Arg('firstName') firstName: string,
		@Arg('lastName') lastName: string,
		@Arg('email') email: string,
		@Arg('password') password: string,
	): Promise<User> {
		try {
			const salt = await bcrypt.genSalt(12);
			const hashedPassword = await bcrypt.hash(password, salt);
			const user = await User.create({ email, password: hashedPassword, lastName, firstName }).save();
			return user;
		} catch (err) {
			return err;
		}

	}

}

export default Register;