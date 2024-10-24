import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from "@codemirror/lang-python";
import { pythonLanguage } from "@codemirror/lang-python";

function CodeEditor({ value, onChange }) {
  return (
    <CodeMirror
      value={value}
      height="70vh"
      width="100vw"
      extensions={[
        python(),
        pythonLanguage.data.of({
          autocomplete: (context) => ({
            from: context.pos,
            options: [],
          }),
        }),
      ]}
      theme={vscodeDark}
      onChange={onChange}
    />
  );
}

export default CodeEditor;
