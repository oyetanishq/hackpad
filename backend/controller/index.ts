import { RequestHandler } from "express";

/* HEALTH CHECK CONTROLLER */
export const healthCheck: RequestHandler = async (req, res) => {
	res.status(200).send("ok");
};
