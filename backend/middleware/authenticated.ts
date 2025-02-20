import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { IUser } from "../model/User";

/**
 * @description checks for the authorization and append userId with request
 */
const authenticated: RequestHandler = (req, res, next) => {
	const token = req.header("Authorization");

	try {
		if (!token) throw new Error();

		const user = verify(token.split(" ")[1], process.env.JWT_SECRET as string) as IUser;
        
		(req as any).userId = user._id;
		next();
	} catch (error) {
		res.status(401).json({ error: "Please authenticate using a valid token" });
	}
};

export default authenticated;
