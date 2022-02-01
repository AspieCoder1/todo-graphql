import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '@entities/User';
import * as bcrypt from 'bcryptjs';
import { RegisterInput } from './types/RegisterInput';
import { LoginInput } from './types/LoginInput';
import { MyContext } from '@ctx/MyContext';
import * as jwt from 'jsonwebtoken';


@Resolver(User)
class UserResolver {
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
	async loginUser(@Arg('data') { email, password }: LoginInput, @Ctx() { res }: MyContext): Promise<User | null> {
		const user = await User.findOne({ where: { email } });
		const passwordCorrect = await bcrypt.compare(password, user?.password ?? '');

		if (!user || !passwordCorrect) {
			return null;
		}

		const maxAge = 1000 * 60 * 60 * 24 * 15;

		const token = jwt.sign({ user }, 'sdfefrgteyth');

		// Set cookie to store the token
		res.cookie('AccessToken', token, { secure: true, maxAge });

		return user;
	}

}

export default UserResolver;