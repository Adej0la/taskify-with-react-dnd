import React, { useState } from "react";
import "./App.css";
import { Todo } from "./model";
import InputField from "./components/input-field/InputField";
import TodoList from "./components/todo-list/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  // handle addition of todo to an array of todos
  const handleAdd = (e: React.FormEvent) => {
    // Prevent form from reloading page
    e.preventDefault();

    todo
      ? (setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]),
        setTodo(""))
      : null;
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    else if (
      destination?.droppableId === source.droppableId &&
      destination?.index === source.index
    )
      return;

    let add,
      active = [...todos],
      complete = [...completedTodos];

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      add = active[destination.index];
      active.splice(destination.index, 1);
    } else {
      add = complete[destination.index];
      complete.splice(destination.index, 1);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main>
        <section>
          <div className="container stack-s-m box-m-l">
            <h1 className="heading is-uppercase text-centered color-white">
              Taskify
            </h1>
            <div className="stack-m-l">
              <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
              <TodoList
                todos={todos}
                setTodos={setTodos}
                completedTodos={completedTodos}
                setCompletedTodos={setCompletedTodos}
              />
            </div>
          </div>
        </section>
      </main>
    </DragDropContext>
  );
};

export default App;
