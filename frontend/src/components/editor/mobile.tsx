import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism-dark.css";
import "prismjs/components/prism-typescript";

interface Params {
	value: string;
	onChange: Function;
	language: string;
}

export default function CodeEditorForMobile({ value, onChange, language }: Params) {
	return (
		<Editor
			className="editor"
			value={value}
			onValueChange={(value) => onChange(value)}
			highlight={(code) =>
				highlight(code, languages[language], language)
					.split("\n")
					.map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
					.join("\n")
			}
			padding={16}
			tabSize={4}
		/>
	);
}
