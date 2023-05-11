import { useState } from "react";
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!todoText){
      toast.warn('Formu Doldurun!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return
    }

    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date().toLocaleString(),
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  const handleDelete = (deletedTodo) => {
    const filteredTodo = todos.filter((item) => item.id !== deletedTodo.id);
    setTodos(filteredTodo);
  };

  const handleDone = (todo) => {
    const index = todos.findIndex((item) => item.id === todo.id);
    const newValue = !todos[index].isDone;
    const changedTodo = { ...todo, isDone: newValue };

    const newTodos = [...todos];

    newTodos.splice(index, 1, changedTodo);

    setTodos(newTodos);
  };

  return (
    <div>
      <h1 className="">CRUD</h1>
      <div className="container border p-3">
        <form className="d-flex gap-3">
          <input
            className="form-control p-3"
            type="text"
            placeholder="yapilacak girisi..."
            value={todoText}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
          />
          <button className="btn btn-outline-dark " onClick={handleSubmit}>
            Ekle
          </button>
        </form>
        <div className="d-flex flex-column gap-2  mt-5 ">
          {todos.length === 0 && "Görüntülenecek öge yok..."}
          {todos.map((todo) => (
            <div
              className=" d-flex justify-content-between p-3 border shadow-sm rounded-3"
              key={todo.id}
            >
              <div>
                <h5
                  style={{
                    opacity: todo.isDone ? "0.5" : "1",
                  }}
                >
                  {todo.title}
                </h5>
                <small>Eklenme Tarihi: {todo.date}</small>
              </div>
              <div className="">
                <button className="btn btn-outline-primary">Düzenle</button>
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
          ))}
        </div>

      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
