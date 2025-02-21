import MonacoEditor from "@monaco-editor/react";

interface Params {
	value: string;
	onChange: Function;
}

export default function CodeEditorForDesktop({ value, onChange }: Params) {
	return <MonacoEditor language="typescript" height="100%" width="100%" value={value} onChange={(vale) => vale && onChange(vale)} />;
}
