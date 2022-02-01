import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { User } from '../../../../entities/User';
import * as bcrypt from 'bcryptjs';
import { RegisterInput } from './RegisterInput';


@Resolver(User)
class Register {
	@Query(() => String)
	hello(): string {
		return 'Hello world';
	}

	@Mutation(() => User)
	async registerUser(
		@Arg('data') { email, firstName, lastName, password }: RegisterInput,
	): Promise<User> {
		try {
			const salt = await bcrypt.genSalt(12);
			const hashedPassword = await bcrypt.hash(password, salt);
			return await User.create({ email, password: hashedPassword, lastName, firstName }).save();
		} catch (err) {
			return err;
		}

	}

	@Mutation(() => User)
	async loginUser() {

	}

}

export default Register;