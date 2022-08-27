import React from "react";
import { Todo } from "../../model";
import SingleTodo from "../single-todo/SingleTodo";
import "./TodoList.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="switcher">
      <Droppable droppableId={"TodosList"}>
        {(provided, snapshot) => (
          <section
            className={`todos box-xs-s ${
              snapshot.isDraggingOver ? "drag-active" : ""
            } `}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="todos__heading">Active Tasks</h2>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
      <Droppable droppableId="CompletedTodosList">
        {(provided, snapshot) => (
          <section
            className={`todos box-xs-s ${
              snapshot.isDraggingOver ? "drag-complete" : ""
            } `}
            data-state="completed"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="todos__heading">Completed Tasks</h2>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
