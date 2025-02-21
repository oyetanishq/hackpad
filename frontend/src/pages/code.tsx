import { IProject } from "@/components/dashboard/project-card";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Header from "@/components/header";
import classNames from "classnames";
import { ChatBubbleLeftEllipsisIcon, FolderIcon } from "@heroicons/react/24/outline";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism-dark.css";

import "prismjs/components/prism-typescript";

export type Tab = {
	id: number | string;
	active: boolean;
	name: string;
	code: string;
	language: string;
};

export type Chat = {
	from: string;
	message: string;
};

enum IExplorer {
	"chat",
	"files",
	"null",
}

export default function Code() {
	const { id } = useParams();
	const codeId = id;
	const [project, setProject] = useState<IProject>();
	const [explorer, setExplorer] = useState<IExplorer>(IExplorer.files);

	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [tabs, setTabs] = useState<Tab[]>([]);
	const tabsRef = useRef<Tab[]>([]);

	const [chats, setChats] = useState<Chat[]>([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const ws = new WebSocket("wss://simple-ws.deno.dev");
		ws.onopen = () => console.log("connected");
		ws.onclose = () => console.log("closed");
		ws.onmessage = ({ data }) => {
			const message = JSON.parse(data).message;
			if (message.rid !== codeId) return;

			if (message.type === "code-update") setTabs((tabs) => tabs.map(({ id, name, code, language, active }) => ({ id, name, active, code: name === message.name ? message.code : code, language })));
			if (message.type === "create-file") setTabs((tabs) => [...tabs, { active: false, name: message.name, language: "typescript", code: "", id: Math.random() * 10 }]);
			if (message.type === "message") setChats((chats) => [...chats, { from: message.name, message: message.message }]);
		};

		setSocket(ws);

		(async () => {
			try {
				const token = localStorage.getItem("token")!;

				await fetch(import.meta.env.VITE_API_URL + "/project/" + id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.success) {
							setProject(data.project);
							setTabs(data.project.content);
						} else throw new Error(data.error);
					});
			} catch (error) {
				alert((error as Error).message);
			}
		})();

		const interval = setInterval(() => {
			(async () => {
				try {
					const token = localStorage.getItem("token")!;

					await fetch(import.meta.env.VITE_API_URL + "/project/" + id, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ content: tabsRef.current }),
					});
				} catch (error) {
					alert((error as Error).message);
				}
			})();
		}, 10 * 1000);

		return () => {
			ws.close();
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		tabsRef.current = tabs;
	}, [tabs]);

	if (!project || !socket) return "loading...";

	return (
		<div className="h-full w-full rounded-md bg-white flex flex-col">
			<Header status="logout" />
			<div className="flex-1 border-t mt-10 flex">
				<div className="w-10 sm:w-12 h-full flex flex-col items-center pt-4 gap-4 px-3 border-r">
					<FolderIcon onClick={() => setExplorer((exp) => (exp === IExplorer.files ? IExplorer.null : IExplorer.files))} className={classNames("size-5 cursor-pointer")} />
					<ChatBubbleLeftEllipsisIcon onClick={() => setExplorer((exp) => (exp === IExplorer.chat ? IExplorer.null : IExplorer.chat))} className={classNames("size-5 cursor-pointer")} />
				</div>

				<div className={classNames("h-full duration-300 bg-white p-2 flex-col justify-start items-start w-56", explorer === IExplorer.files ? "flex" : "hidden")}>
					{tabs.map(({ id, name, active }) => {
						return (
							<button
								id={"file-name-" + id}
								type="button"
								key={id}
								onClick={() => setTabs((tab) => tab.map(({ id: ID, name, code, language }) => ({ id: ID, name, active: ID == id, code, language })))}
								onDoubleClick={() => console.log("change name request")}
								className={classNames("h-6 w-full relative flex justify-start px-4 items-center text-sm font-bold text-center", active ? "text-indigo-700" : "text-gray-600 hover:text-gray-800")}
							>
								{name}
							</button>
						);
					})}
					<label
						className="mx-4 hover:rotate-90 transition duration-300 cursor-pointer h-6 w-6 rounded-md bg-rose-300 hover:bg-rose-400 text-red-600 hover:text-red-700 flex justify-center items-center font-semibold"
						onClick={() => {
							const name = prompt("Enter a file name: ") || "newfile";
							socket.send(
								JSON.stringify({
									type: "sendtoall",
									message: {
										type: "create-file",
										rid: id,
										name,
									},
								})
							);
						}}
					>
						+
					</label>
				</div>

				<div className={classNames("h-full duration-300 bg-white p-2 flex-col justify-start items-center w-56", explorer === IExplorer.chat ? "flex" : "hidden")}>
					<p className="underline underline-offset-2">chatting</p>
					<div className="flex-1 flex flex-col justify-end items-center w-full">
						{chats.map(({ from, message }, index) => (
							<div key={from + message + index} className="w-full text-sm my-2">
								<p className="text-yellow-600 underline underline-offset-2">{from}:</p>
								<p className="ml-6">{message}</p>
							</div>
						))}
					</div>
					<div className="w-full flex gap-1 mt-3">
						<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className="flex-1 p-1 text-sm border focus:outline-none" />
						<button
							className="p-1 px-2 border"
							onClick={() => {
								if (message.length < 1) return;

								socket.send(
									JSON.stringify({
										type: "sendtoall",
										message: {
											type: "message",
											rid: codeId,
											message,
											name: localStorage.getItem("userEmail")?.split("@")[0],
										},
									})
								);
								setMessage("");
							}}
						>
							send
						</button>
					</div>
				</div>

				<div className={classNames("flex-1 overflow-hidden", explorer === IExplorer.null ? "" : "border-l ")}>
					{tabs.map(({ id, code, active, language, name }) => {
						return (
							<div key={id} className={classNames(active ? "" : "hidden", "overflow-scroll h-full w-full hide-scrollbar")}>
								<Editor
									className="editor"
									value={code}
									onValueChange={(newCode) => {
										socket.send(
											JSON.stringify({
												type: "sendtoall",
												message: {
													type: "code-update",
													rid: codeId,
													name,
													code: newCode,
												},
											})
										);
									}}
									highlight={(code) =>
										highlight(code, languages[language], language)
											.split("\n")
											.map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
											.join("\n")
									}
									padding={16}
									tabSize={4}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
