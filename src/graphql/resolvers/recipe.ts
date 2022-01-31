import { Query, Resolver } from 'type-graphql';

@Resolver()
class RecipeResolver {
	@Query(() => String, { name: 'hello' })
	async hello() {
		// fake async in this example
		return 'Hello world';
	}
}

export default RecipeResolver;