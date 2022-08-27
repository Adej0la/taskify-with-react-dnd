import React, { useRef } from "react";
import "./InputField.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      action=""
      className="input "
      onSubmit={(e) => {
        handleAdd(e);
        // removes the keyboard focus from input element
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        name=""
        id=""
        placeholder="Enter a task"
        className="input__box box-xs-s"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit" className="input__submit color-white">
        {"Go"}
      </button>
    </form>
  );
};

export default InputField;
