import { verifyAccessToken } from '../utils';
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware {
	authenticateToken(req: Request, res: Response, next: NextFunction) {
		console.log(req.headers);
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if (token == null) return res.sendStatus(403);
		const user = verifyAccessToken(token);

		if (user) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			req.user = user;
			next();
		} else {
			res.sendStatus(401);
		}
	}
}

