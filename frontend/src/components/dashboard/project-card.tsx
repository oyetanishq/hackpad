import { CommandLineIcon, ExclamationTriangleIcon, XMarkIcon, SunIcon } from "@heroicons/react/24/outline";
import DropDownMenu, { Option } from "../drop-down-menu";
import Dialog from "../dialog";
import { useState } from "react";

export interface IProject {
	_id: string;
	uid: string;
	name: string;
	description?: string;
	accessTo: string[];
}

const TwoDots = ({ name, description, _id }: IProject) => {
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [spinning, setSpinning] = useState<boolean>(false);

	const [updateName, setUpdateName] = useState(name);
	const [updateDescrition, setUpdateDescription] = useState(description);

	const optionsList: Option[] = [
		{
			title: "Edit",
			todo: () => setEditDialogOpen(true),
		},
		{
			title: "Delete",
			todo: () => setDeleteDialogOpen(true),
			hoverBgColor: "hover:bg-red-600",
			hoverTextColor: "hover:text-white",
		},
	];

	const onClickUpdate = async () => {
		try {
			setSpinning(true);
			const token = localStorage.getItem("token")!;

			await fetch(import.meta.env.VITE_API_URL + "/project/" + _id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name: updateName, description: updateDescrition }),
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

	const onClickDelete = async () => {
		try {
			setSpinning(true);
			const token = localStorage.getItem("token")!;

			await fetch(import.meta.env.VITE_API_URL + "/project/" + _id, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
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
		<>
			<DropDownMenu name=":" options={optionsList} />
			<Dialog isOpen={editDialogOpen} setIsOpen={setEditDialogOpen}>
				<div className="p-4">
					<div className="bg-white">
						<div className="grid grid-cols-6 gap-3 tracking-tighter min-w-56 sm:min-w-72">
							<div className="col-span-6">
								<label htmlFor="name" className="block text-base font-medium text-gray-700">
									Name
								</label>
								<input type="text" name="name" autoComplete="off" value={updateName} onChange={(e) => setUpdateName(e.target.value)} className="mt-1 focus:outline-none h-12 px-4 border block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />
							</div>
							<div className="col-span-6">
								<label htmlFor="description" className="block text-base font-medium text-gray-700">
									Description
								</label>
								<input type="text" name="description" autoComplete="off" value={updateDescrition} onChange={(e) => setUpdateDescription(e.target.value)} className="mt-1 focus:outline-none h-12 px-4 border block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />
							</div>
						</div>
					</div>
					<div className="flex gap-3 justify-end mt-6">
						<button onClick={() => setEditDialogOpen(false)} type="button" className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 active:bg-white duration-300 sm:text-sm">
							Cancel
						</button>
						<button onClick={onClickUpdate} type="button" className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 active:bg-yellow-600 duration-300 sm:text-sm">
							{spinning ? <SunIcon className="animate-spin" height={25} color={"#fff"} /> : "Update"}
						</button>
					</div>
				</div>
			</Dialog>
			<Dialog isOpen={deleteDialogOpen} setIsOpen={setDeleteDialogOpen}>
				<div className="bg-white px-3 py-2">
					<div className="sm:flex sm:items-start">
						<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
							<ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
						</div>
						<div className="mt-3 text-center sm:mt-0 sm:ml-6 sm:text-left">
							<p className="text-xl text-black">Delete</p>
							<p className="text-sm text-gray-500">Are you sure you want to delete? All of this data will be permanently removed. This action cannot be undone.</p>
						</div>
					</div>
				</div>
				<div className="flex gap-3 justify-end mt-2">
					<button onClick={() => setDeleteDialogOpen(false)} type="button" className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 active:bg-white duration-300 sm:text-sm">
						Cancel
					</button>
					<button onClick={onClickDelete} type="button" className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 active:bg-red-600 duration-300 sm:text-sm">
						{spinning ? <SunIcon className="animate-spin" height={25} color={"#fff"} /> : "Delete"}
					</button>
				</div>
			</Dialog>
		</>
	);
};

const SendEnviteButton = ({ accessTo, _id, uid }: IProject) => {
	const [userId] = useState(() => localStorage.getItem("userId") ?? "");

	const [sendEnviteDialogOpen, setSendEnviteDialogOpen] = useState(false);
	const [spinning, setSpinning] = useState<boolean>(false);

	const [updateEmail, setUpdateEmail] = useState("");

	const onClickAdd = async () => {
		try {
			setSpinning(true);
			const token = localStorage.getItem("token")!;

			await fetch(import.meta.env.VITE_API_URL + "/project/" + _id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ accessTo: [...accessTo, updateEmail] }),
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

	const onClickXMark = async (email: string) => {
		try {
			setSpinning(true);
			const token = localStorage.getItem("token")!;

			await fetch(import.meta.env.VITE_API_URL + "/project/" + _id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ accessTo: accessTo.filter((e) => e !== email) }),
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
		<>
			{uid === userId && (
				<p className="text-xs tracking-tighter px-2 py-1 border rounded-md bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-600 duration-300 cursor-pointer text-white" onClick={() => setSendEnviteDialogOpen(true)}>
					Send Envite
				</p>
			)}
			<Dialog isOpen={sendEnviteDialogOpen} setIsOpen={setSendEnviteDialogOpen}>
				<div className="p-4 pb-0 min-w-56 sm:min-w-80 ">
					<div className="tracking-tighter flex justify-center items-center gap-2">
						<input
							value={updateEmail}
							onChange={(e) => setUpdateEmail(e.target.value)}
							className="block text-sm sm:text-base h-10 px-4 border rounded-md focus:outline-none flex-1"
							type="text"
							placeholder="Email Address"
							autoCapitalize="off"
							autoComplete="off"
							maxLength={50}
							minLength={6}
							required={true}
							inputMode="email"
						/>
						<button onClick={onClickAdd} type="button" className="inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-600 text-white sm:text-base font-light duration-300 text-sm">
							{spinning ? <SunIcon className="animate-spin" height={25} color={"#fff"} /> : "Add"}
						</button>
					</div>
					<div className="max-h-44 w-full mt-3 px-1 overflow-y-scroll">
						{accessTo.map((email) => (
							<div key={email} className="flex justify-between items-center py-1">
								<p className="text-sm italic" key={email}>
									{email}
								</p>
								<XMarkIcon onClick={() => onClickXMark(email)} className="rounded-full border border-black hover:text-red-800 hover:border-red-800 duration-300 cursor-pointer p-1 flex justify-center items-center size-5 stroke-2" />
							</div>
						))}
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default function ProjectCard(project: IProject) {
	const { name, description, accessTo } = project;

	return (
		<div className="relative bg-slate-100 p-2 duration-300 rounded-md flex flex-col justify-between ">
			<div className="flex justify-between items-center p-2 pb-0">
				<div className="flex h-full justify-center items-center gap-2">
					<CommandLineIcon className="size-4 stroke-2" />
					<p className="tracking-tighter text-base font-semibold">{name}</p>
				</div>
				<TwoDots {...project} />
			</div>

			<p className="pl-2 pb-1 tracking-tighter text-base font-light text-slate-400">{description}</p>

			<div className="flex-col justify-start items-center border rounded-md p-3 bg-white">
				<div className="flex justify-between items-end pb-2">
					<p className="text-base tracking-tighter underline underline-offset-2">Existing members</p>
					<SendEnviteButton {...project} />
				</div>
				<div className="flex justify-start items-start flex-wrap gap-x-2">
					{accessTo.map((email, index) => (
						<p className="text-sm italic" key={email}>
							{email}
							{index === accessTo.length - 1 ? "" : ","}
						</p>
					))}
				</div>
			</div>
		</div>
	);
}
