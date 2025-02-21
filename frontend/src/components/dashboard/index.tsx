import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProjectCard, { IProject } from "./project-card";
import Dialog from "../dialog";
import { SunIcon } from "@heroicons/react/24/outline";

interface CreateNewProjectDialogParams {
	projectDialogOpen: boolean;
	setProjectDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateNewProjectDialog = ({ projectDialogOpen, setProjectDialogOpen }: CreateNewProjectDialogParams) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [spinning, setSpinning] = useState<boolean>(false);

	const onClickCreate = async () => {
		try {
			setSpinning(true);
			const token = localStorage.getItem("token")!;

			await fetch(import.meta.env.VITE_API_URL + "/project", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name, description }),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) window.location.reload();
					else throw new Error(data.error);
				});
		} catch (error) {
			alert((error as Error).message);
		} finally {
			setSpinning(false);
		}
	};

	return (
		<Dialog isOpen={projectDialogOpen} setIsOpen={setProjectDialogOpen}>
			<div className="p-4 relative z-50">
				<div className="bg-white">
					<div className="grid grid-cols-6 gap-3 tracking-tighter min-w-56 sm:min-w-72">
						<div className="col-span-6">
							<label htmlFor="name" className="block text-base font-medium text-gray-700">
								Name
							</label>
							<input type="text" name="name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 focus:outline-none h-12 px-4 border block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />
						</div>
						<div className="col-span-6">
							<label htmlFor="description" className="block text-base font-medium text-gray-700">
								Description
							</label>
							<input type="text" name="description" autoComplete="off" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 focus:outline-none h-12 px-4 border block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />
						</div>
					</div>
				</div>
				<div className="flex gap-3 justify-end mt-6">
					<button onClick={() => setProjectDialogOpen(false)} type="button" className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 active:bg-white duration-300 sm:text-sm">
						Cancel
					</button>
					<button onClick={onClickCreate} type="button" className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 active:bg-yellow-600 duration-300 sm:text-sm">
						{spinning ? <SunIcon className="animate-spin" height={25} color={"#fff"} /> : "Create"}
					</button>
				</div>
			</div>
		</Dialog>
	);
};

const EmptyProductCardPulse = () => {
	return (
		<div className="group relative bg-[rgb(247,244,243)] p-2 animate-pulse rounded-md">
			<div className="flex justify-between items-center p-2">
				<div className="flex h-full justify-center items-center gap-2">
					<div className="h-2 w-48 rounded-md bg-gray-200"></div>
				</div>
			</div>

			<div className="flex-col justify-start items-center border rounded-md p-3 bg-white">
				<div className="flex justify-between items-end pb-2 gap-2">
					<div className="h-2 flex-1 rounded-md bg-gray-200"></div>
					<div className="h-2 w-16 rounded-md bg-gray-200"></div>
				</div>
				<div className="flex-col justify-start items-start mt-3">
					{[1, 2, 3].map((id) => (
						<div key={id} className="flex justify-between items-end pb-2 gap-2">
							<div className="h-2 flex-1 rounded-md bg-gray-200"></div>
							<div className="h-2 w-3 rounded-md bg-gray-200"></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default function Dashboard() {
	const [projects, setProjects] = useState<IProject[]>([]);
	const [fetching, setFetching] = useState(false);

	const [projectDialogOpen, setProjectDialogOpen] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setFetching(true);
				const token = localStorage.getItem("token")!;

				await fetch(import.meta.env.VITE_API_URL + "/project", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.success) setProjects(data.projects);
						else throw new Error(data.error);
					});
			} catch (error) {
				alert((error as Error).message);
			} finally {
				setFetching(false);
			}
		})();
	}, []);

	return (
		<div>
			<CreateNewProjectDialog projectDialogOpen={projectDialogOpen} setProjectDialogOpen={setProjectDialogOpen} />

			<div className="w-full flex justify-between items-center py-4 mt-6">
				<p className="text-2xl text-black font-normal tracking-tighter underline underline-offset-4">Projects</p>
				<div className="z-10 flex justify-center items-center flex-row group cursor-pointer relative px-1 overflow-hidden" onClick={() => setProjectDialogOpen(true)}>
					<p className="text-base text-gray-900 tracking-tighter">New Project</p>
					<div className="absolute h-2/5 w-full transition duration-300 bottom-1 group-hover:translate-x-0 group-active:translate-x-0 translate-x-4 left-0 right-0 bg-yellow-500 -z-10 rounded-sm"></div>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
				{fetching ? (
					<EmptyProductCardPulse />
				) : projects.length > 0 ? (
					projects.map((project) => <ProjectCard key={project._id} {...project} />)
				) : (
					<div className="bg-slate-100 border p-2 rounded-md min-h-36 flex justify-center items-center hover:shadow-sm duration-300 hover:border-slate-600 cursor-pointer active:border-slate-300">
						<button onClick={() => setProjectDialogOpen(true)} className="tracking-tighter font-medium">
							New Project
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
