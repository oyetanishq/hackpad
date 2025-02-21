import { RequestHandler } from "express";
import Project from "../../model/Project";

/**
 * @route /project
 * @method POST
 * @description create new project
 */
export const createProject: RequestHandler = async (req, res) => {
	try {
		const name = req.body.name;
		const description = req.body?.description ?? "";
		const accessTo = (req.body?.accessTo ?? []) as string[];
		accessTo.push((req as any).userEmail);

		const project = new Project({ name, description, accessTo, uid: (req as any).userId });
		await project.save();

		res.status(201).json({ success: true, project });
	} catch (error) {
		res.status(400).json({ success: false, error: (error as Error).message });
	}
};

/**
 * @route /project/:id
 * @method PUT
 * @description update any particular project
 */
export const updateProject: RequestHandler = async (req, res) => {
	try {
		res.status(201).json({ success: true, project: await Project.findOneAndUpdate({ _id: req.params.id, uid: (req as any).userId }, { $set: req.body }, { new: true }) });
	} catch (error) {
		res.status(400).json({ success: false, error: (error as Error).message });
	}
};

/**
 * @route /project
 * @method GET
 * @description read all the projects associated with a account without content
 */
export const getAllProjects: RequestHandler = async (req, res) => {
	try {
		res.status(201).json({ success: true, projects: await Project.find({ accessTo: (req as any).userEmail }, { content: 0 }) });
	} catch (error) {
		res.status(400).json({ success: false, error: (error as Error).message });
	}
};

/**
 * @route /project/:id
 * @method GET
 * @description read a particular project with content
 */
export const getProject: RequestHandler = async (req, res) => {
	try {
		res.status(201).json({ success: true, project: await Project.find({ _id: req.params.id, accessTo: (req as any).userEmail }) });
	} catch (error) {
		res.status(400).json({ success: false, error: (error as Error).message });
	}
};

/**
 * @route /project/:id
 * @method DELETE
 * @description delete a particular project
 */
export const deleteProject: RequestHandler = async (req, res) => {
	try {
		res.status(201).json({ success: true, project: await Project.findOneAndDelete({ uid: (req as any).userId, _id: req.params.id }) });
	} catch (error) {
		res.status(400).json({ success: false, error: (error as Error).message });
	}
};
