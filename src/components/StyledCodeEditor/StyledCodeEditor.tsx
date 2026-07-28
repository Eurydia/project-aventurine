import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import type { FC } from "react";
import "./styles.css";

export const StyledCodeEditor: FC<{
  value: string;
  onValueChange: (value: string) => void;
}> = (props) => {
  const { value, onValueChange } = props;

  return (
    <ReactCodeMirror
      value={value}
      onChange={onValueChange}
      theme="dark"
      extensions={[EditorView.lineWrapping]}
    />
  );
};
