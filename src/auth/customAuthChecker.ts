import { ContextType } from '@ctx/ContextType';
import { AuthChecker } from 'type-graphql';


export const customAuthChecker: AuthChecker<ContextType> = async ({ context }, _roles): Promise<boolean> => {
	return !!(context.req as any).user;
};