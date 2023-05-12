import React from "react";

function Todo({ todo, handleDelete, handleDone, setShowModal, setEditTodo }) {
  return (
    <div
      className=" d-flex justify-content-between p-3 border shadow rounded-3"
      key={todo.id}
    >
      <div>
        <h5
          style={{
            textDecoration: todo.isDone ? "line-through" : "none",
            opacity: todo.isDone ? "0.5" : "1",
          }}
        >
          {todo.title}
        </h5>
        <small>Eklenme Tarihi: {todo.date}</small>
      </div>
      <div className="">
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            setShowModal(true);
            setEditTodo(todo);
          }}
        >
          Düzenle
        </button>
        <button
          className="btn btn-outline-danger m-2"
          onClick={() => handleDelete(todo)}
        >
          Sil
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => handleDone(todo)}
        >
          {!todo.isDone ? "Tamamla" : "Tamam"}
        </button>
      </div>
    </div>
  );
}

export default Todo;
