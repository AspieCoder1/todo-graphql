import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginLandingPageDisabled,
	ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import * as Express from 'express';
import * as cookieParser from 'cookie-parser';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

import { customAuthChecker } from '@auth/customAuthChecker';
import resolvers from './graphql/resolvers/resolvers';

if (process.env.NODE_ENV === 'development') {
	dotenv.config({ path: path.join(__dirname, './config/development.env') });
	console.log(process.env.JWT_SECRET);
}

const main = async () => {
	await createConnection();
	const schema = await buildSchema({
		resolvers,
		authChecker: customAuthChecker,
	});
	const plugins = [
		process.env.NODE_ENV === 'production'
			? ApolloServerPluginLandingPageDisabled()
			: ApolloServerPluginLandingPageGraphQLPlayground(),
	];
	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }: { req: Express.Request; res: Express.Response }) => ({ req, res }),
		plugins,
	});
	const app = Express();
	app.use(cookieParser());
	app.use((req, _, next) => {
		const accessToken = req.cookies['access-token'];
		try {
			const data: any = jwt.verify(accessToken, process.env.JWT_SECRET ?? '');
			console.log(data);
			(req as any).userID = data.userID;
		} catch (e) {
		} finally {
			next();
		}
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log('Server up on port 4000');
	});
};

main();
