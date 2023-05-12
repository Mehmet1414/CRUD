import React from 'react'

function Modal({editTodo,setEditTodo,setShowModal,handleSaveEdit}) {

  return (
    <div className="modal-wrapper zindex-modal">
          <div className="edit-modal p-3 pt-5 pb-5 rounded">
            <h6>Görevi Düzenleyiniz...</h6>
            <input
              className="form-control p-2"
              type="text"
              value={editTodo.title}
              onChange={(e) =>
                setEditTodo({
                  ...editTodo,
                  title: e.target.value,
                  date: new Date().toLocaleString(),
                })
              }
            />
            <button
              className="btn btn-danger w-50"
              onClick={() => setShowModal(false)}
            >
              iptal
            </button>
            <button 
            className="btn btn-success w-50"
            onClick={handleSaveEdit}
            >
              Kaydet
            </button>
          </div>
        </div>
  )
}

export default Modal