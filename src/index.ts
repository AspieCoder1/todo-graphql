import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import resolvers from './graphql/resolvers/resolvers';
import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
	dotenv.config({ path: './config/development.env' });
}

const main = async () => {
	await createConnection();
	const schema = await buildSchema({ resolvers });

	const apolloServer = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });
	const app = Express();
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log('Server up on port 4000');
	});
};

main();