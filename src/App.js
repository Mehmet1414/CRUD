import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./Components/Todo";
import "./index.css";
import Modal from "./Components/Modal";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoText) {
      toast.warn("Lütfen Formu Doldurun!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
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

  const handleSaveEdit = () => {

    if (!editTodo.title) {
      toast.warn("Lütfen Formu Doldurun!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const index = todos.findIndex((i)=> i.id===editTodo.id)
    
    const cloneTodos = [...todos]

    cloneTodos.splice(index,1,editTodo)
    setTodos(cloneTodos)

    setShowModal(false)

    if (!todoText) {
      toast.success("Görev Güncellendi!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  };


  return (
    <div>
      <h1 className="text-center mt-5">GÖREV LiSTESi</h1>
      <div className="container border p-3 rounded">
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
            <Todo
              key={todo.id}
              handleDelete={handleDelete}
              todo={todo}
              handleDone={handleDone}
              setShowModal={setShowModal}
              setEditTodo={setEditTodo}
            />
          ))}
        </div>
      </div>
      <ToastContainer />

      {showModal && (
        <Modal
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          setShowModal={setShowModal}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;
