import { RequestHandler } from "express";
import User from "../../model/User";
import { generateToken } from "../../lib/tokens";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

/**
 * @route /auth/register
 * @method POST
 * @description register a new user, and return jwt token
 */
export const register: RequestHandler = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (await User.findOne({ email })) throw new Error("user already exists");

		const salt = genSaltSync(10);
		const hashedPassword = hashSync(password, salt);

		const user = new User({ email, password: hashedPassword });
		await user.save();

		res.status(201).json({ success: true, user: { id: user._id, email: user.email, token: generateToken(user._id as string) } });
	} catch (error) {
		res.status(400).json({ success: false, error: (error as Error).message });
	}
};

/**
 * @route /auth/login
 * @method POST
 * @description validate a user, and return jwt token
 */
export const login: RequestHandler = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) throw new Error("invalid credentials");
		if (!compareSync(password, user.password)) throw new Error("invalid credentials");

		res.status(201).json({ success: true, user: { id: user._id, email: user.email, token: generateToken(user._id as string) } });
	} catch (error) {
		res.status(401).json({ success: false, error: (error as Error).message });
	}
};
