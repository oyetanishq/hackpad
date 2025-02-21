import MonacoEditor from "@monaco-editor/react";
import { Dispatch, SetStateAction } from "react";

interface Params {
	code: string;
	setCode: Dispatch<SetStateAction<string>>;
}

export default function CodeEditorForMobile({}: Params) {
	return <MonacoEditor height="100%" />;
}
