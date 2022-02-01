import * as Express from 'express';

export type MyContext =  {
	req: Express.Request;
	res: Express.Response;
}
