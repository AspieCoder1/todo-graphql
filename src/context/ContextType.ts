import * as Express from 'express';

export type ContextType = {
	req: Express.Request;
	res: Express.Response;
};
