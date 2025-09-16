import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import useTodos from "../../hooks/useTodos";
import useUsers from "../../hooks/useUsers";
import UserSelect from "../posts/UserSelect";
import FilterTodos from "./FilterTodos";

function TodosList() {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<number | "">("");
  const [currentFilter, setCurrentFilter] = useState("");
  const { todosQuery, toggleStatus } = useTodos(page, selectedUser, currentFilter);
  const { users } = useUsers();

  if (todosQuery.isLoading) {
    return <p className="text-center my-5">Loading...</p>;
  }

  if (todosQuery.isError) {
    return <p className="text-center text-danger my-5">Failed to load todos.</p>;
  }

  const todos = todosQuery.data?.data ?? [];

  return (
    <div className="container py-5">
      <div className="row mb-5 text-center">
        <div className="col">
          <h1 className="display-4 fw-bold text-gradient-todos">Todo List</h1>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12 justify-content-md-end d-flex mb-3 mb-md-0">
          <div className="d-flex flex-wrap gap-2 justify-content-end">
            <UserSelect
              users={users}
              selectedUser={selectedUser}
              setSelectedUser={(val) => {
                setSelectedUser(val);
                setPage(1);
              }}
            />
            <FilterTodos currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} setPage={setPage} />
          </div>
        </div>
      </div>

      <div>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`card mb-3 shadow-sm todo-card cursor-pointer ${
                todo.completed ? "completed" : ""
              }`}
            >
              <div className="card-body">
                <div className="d-flex align-items-start">
                  <div className="me-3 mt-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleStatus.mutate(todo)}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="card-title">{todo.title}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <FiFilter size={48} className="text-muted mb-3" />
            <h5 className="text-muted">Not found any todo</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodosList;
