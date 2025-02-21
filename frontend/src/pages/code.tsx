import { IProject } from "@/components/dashboard/project-card";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import isDesktop from "@/lib/isDesktop";
import CodeEditorForDesktop from "@/components/editor/desktop";
import CodeEditorForMobile from "@/components/editor/mobile";
import Header from "@/components/header";
import classNames from "classnames";
import { ChatBubbleLeftEllipsisIcon, FolderIcon } from "@heroicons/react/24/outline";

enum IExplorer {
	"chat",
	"files",
	"null",
}

const content = {
	"index.ts": "const a = 0;",
	folder1: {
		"app.tsx": 'export default function () {\n    return "hi";\n}',
		folder2: {
			"style.css": "body {\n    margin: 0;\n}",
			folder1: {
				"app.tsx": 'export default function () { return "hi"; }',
				folder2: {
					"style.css": "body { margin: 0; }",
				},
			},
		},
	},
};

const FileNode = ({ name, content, onFileClick, path }: any) => {
	const [isOpen, setIsOpen] = useState(false);

	const isFolder = typeof content === "object";
	const currentPath = path ? `${path}/${name}` : name;

	return (
		<div className="pl-4">
			<div className={`flex items-center cursor-pointer text-base ${isFolder ? "font-semibold" : ""}`} onClick={() => (isFolder ? setIsOpen(!isOpen) : onFileClick(currentPath))}>
				{isFolder ? <span className="mr-2">{isOpen ? "📂" : "📁"}</span> : <span className="mr-2">📄</span>}
				{name}
			</div>
			{isFolder && isOpen && (
				<div className="ml-4">
					{Object.entries(content).map(([childName, childContent]) => (
						<FileNode key={childName} name={childName} content={childContent} onFileClick={onFileClick} path={currentPath} />
					))}
				</div>
			)}
		</div>
	);
};

const FileExplorer = ({ structure, className, onFileClick }: any) => {
	return (
		<div className={className}>
			<h2 className="text-base font-bold mb-4">File Explorer</h2>
			{Object.entries(structure).map(([name, content]) => (
				<FileNode key={name} name={name} content={content} onFileClick={onFileClick} path="" />
			))}
		</div>
	);
};

const getFileContentByPath = (structure: any, path: string): string => {
	const parts = path.split("/");
	let current = structure;
	for (const part of parts) {
		if (typeof current === "object" && part in current) {
			current = current[part];
		} else {
			return ""; // File not found
		}
	}
	return typeof current === "string" ? current : ""; // Return content if it's a file
};

const updateFileContentByPath = (structure: any, path: string, newContent: string) => {
	const parts = path.split("/");
	let current = structure;

	for (let i = 0; i < parts.length - 1; i++) {
		const part = parts[i];
		if (typeof current === "object" && part in current) {
			current = current[part];
		} else {
			return false; // Path invalid
		}
	}
	const fileName = parts[parts.length - 1];
	if (fileName in current) {
		current[fileName] = newContent;
	}
};

export default function Code() {
	const { id } = useParams();
	const [project, setProject] = useState<IProject>();
	const [file, setFile] = useState<{ name: string; content: string }>();
	const [explorer, setExplorer] = useState<IExplorer>(IExplorer.files);

	useEffect(() => {
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
						if (data.success) setProject(data.project);
						else throw new Error(data.error);
					});
			} catch (error) {
				alert((error as Error).message);
			}
		})();
	}, []);

	useEffect(() => {
        if (!file) return;
        updateFileContentByPath(content, file.name, file.content)
        
    }, [file]);

	if (!project) return "loading...";

	return (
		<div className="h-full w-full rounded-md bg-white flex flex-col">
			<Header status="logout" />
			<div className="flex-1 border-t mt-10 flex">
				<div className="w-10 sm:w-12 h-full flex flex-col items-center pt-4 gap-4 px-3 border-r">
					<FolderIcon onClick={() => setExplorer((exp) => (exp === IExplorer.files ? IExplorer.null : IExplorer.files))} className={classNames("size-5 cursor-pointer")} />
					<ChatBubbleLeftEllipsisIcon onClick={() => setExplorer((exp) => (exp === IExplorer.chat ? IExplorer.null : IExplorer.chat))} className={classNames("size-5 cursor-pointer")} />
				</div>

				<FileExplorer
					onFileClick={(filePath: string) => {
						console.log(filePath);
						setFile({ name: filePath, content: getFileContentByPath(content, filePath) });
					}}
					structure={content}
					className={classNames("h-full duration-300 bg-white p-2 flex-col justify-start items-start w-56 overflow-x-scroll", explorer === IExplorer.files ? "flex" : "hidden")}
				/>

				<div className={classNames("h-full duration-300 bg-white p-2 flex-col justify-start items-center w-56", explorer === IExplorer.chat ? "flex" : "hidden")}>
					<p className="underline underline-offset-2">chatting</p>
					<div className="flex-1 flex flex-col justify-end items-center w-full">
						<div className="w-full text-sm my-2">
							<p className="text-yellow-600 underline underline-offset-2">kaju:</p>
							<p className="ml-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore facere quos, itaque dolorum inventore iste quasi obcaecati, necessitatibus corrupti libero cum impedit quod fugit adipisci ipsa reiciendis! Aperiam, sunt neque.</p>
						</div>
					</div>
					<div className="w-full flex gap-1 mt-3">
						<input type="text" placeholder="Message" className="flex-1 p-1 text-sm border focus:outline-none" />
						<button className="p-1 px-2 border">send</button>
					</div>
				</div>

				<div className="flex-1 border-l overflow-hidden">{file && <CodeEditorForDesktop value={file.content} onChange={(value: string) => setFile((f) => (f ? { name: f.name, content: value } : undefined))} />}</div>
			</div>
		</div>
	);
}
