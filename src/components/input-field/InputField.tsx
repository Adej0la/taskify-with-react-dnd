import React, { useRef } from "react";
import "./InputField.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      action=""
      ref={formRef}
      tabIndex={0}
      className="input "
      onSubmit={(e) => {
        handleAdd(e);
        // removes the keyboard focus from form element
        formRef.current?.blur();
      }}
    >
      <input
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
