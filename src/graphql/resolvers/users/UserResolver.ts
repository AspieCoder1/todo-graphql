import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '@entities/User';
import * as bcrypt from 'bcryptjs';
import { RegisterInput } from './inputs/RegisterInput';
import { LoginInput } from './inputs/LoginInput';
import { ContextType } from '@ctx/ContextType';
import * as jwt from 'jsonwebtoken';


@Resolver(User)
class UserResolver {
	@Authorized()
	@Query(() => String)
	hello(): string {
		return 'Hello world';
	}

	@Query(() => Boolean, { description: 'authenticated' })
	isAuthenticated(@Ctx() { req }: ContextType): boolean {
		return !!(req as any).userID;
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
	async loginUser(@Arg('data') { email, password }: LoginInput, @Ctx() { res }: ContextType): Promise<User | null> {
		const user = await User.findOne({ where: { email } });
		const passwordCorrect = await bcrypt.compare(password, user?.password ?? '');

		// Check if password is either wrong or user email is not found
		if (!user || !passwordCorrect) {
			return null;
		}

		// Set up max age of cookie and accesses token
		const maxAge = 1000 * 60 * 60 * 24 * 15;
		// Generate the access token
		const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: maxAge });
		// Set cookie to store the token
		const secure = process.env.NODE_ENV === 'production';
		await res.cookie('access-token', token, { maxAge, httpOnly: true, secure });

		return user;
	}

}

export default UserResolver;