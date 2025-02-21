import jwt from "jsonwebtoken";

/**
 * 
 * @param _id string
 * @returns string
 * @description generate a token with 30 days validity
 */
export const generateToken = (_id: string, email: string) =>
	jwt.sign({ _id, email }, process.env.JWT_SECRET as string, {
		expiresIn: "30d",
	});
