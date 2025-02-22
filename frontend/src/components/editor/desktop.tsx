import MonacoEditor from "@monaco-editor/react";

interface Params {
	value: string;
	onChange: Function;
    language: string;
}

export default function CodeEditorForDesktop({ value, onChange, language }: Params) {
	return <MonacoEditor language={language} height="100%" width="100%" value={value} onChange={(vale) => vale && onChange(vale)} />;
}
