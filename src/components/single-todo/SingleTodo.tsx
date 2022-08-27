import React, { useRef, useState, useEffect } from "react";
import { Todo } from "../../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./SingleTodo.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  key?: number;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo: React.FC<Props> = ({
  index,
  todo,
  todos,
  setTodos,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    //   implement a way to save the edited text on handleEdit
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // adds the keyboard focus to input element
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          action=""
          className={`todo box-s-m ${snapshot.isDragging ? "on-drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <p className="todo__text line-through">{todo.todo}</p>
          ) : (
            <p className="todo__text">{todo.todo}</p>
          )}

          <div>
            <button
              type="button"
              className="todo__icon"
              onClick={() =>
                !edit && !todo.isDone ? setEdit(!edit) : setEdit(false)
              }
            >
              <AiFillEdit />
            </button>
            <button
              type="button"
              className="todo__icon"
              onClick={() => handleDelete(todo.id)}
            >
              <AiFillDelete />
            </button>
            <button
              type="button"
              className="todo__icon"
              onClick={() => handleDone(todo.id)}
            >
              <MdDone />
            </button>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
