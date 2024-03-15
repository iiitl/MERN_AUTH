import React, { useState } from "react";

export const Modal = ({ handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(handleClick);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteTask = () => {
    setIsOpen(false);
    handleClick();
  };

  return (
    <span>
      <span className="material-symbols-outlined" onClick={openModal}>
        delete
      </span>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure you want to delete the task?</h2>
            <div className="over-b">
              <button className="button" onClick={deleteTask}>
                Yes
              </button>
              <button className="button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </span>
  );
};
