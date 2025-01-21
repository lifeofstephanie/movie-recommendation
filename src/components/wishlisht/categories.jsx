import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { addMovieToCategory } from "../../firebase"; 

Modal.setAppElement("#root");

const CategorizeMovieModal = ({ movie, isOpen, closeModal }) => {
  const [category, setCategory] = useState("");

  const handleCategorySelection = async () => {
    try {
      if (category) {
        await addMovieToCategory(movie.id, category);
        toast.success(`${movie.title} added to ${category}`);
        closeModal();
      } else {
        toast.error("Please select a category");
      }
    } catch (err) {
      toast.error("Error adding movie to category");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Select Movie Category"
      className="bg-white p-6 rounded-md w-full max-w-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h3 className="text-xl font-semibold">Select Movie Category</h3>
      <div className="mt-4">
        <button
          onClick={() => setCategory("Currently Watching")}
          className={`w-full py-2 px-4 border rounded-md ${
            category === "Currently Watching" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Currently Watching
        </button>
        <button
          onClick={() => setCategory("Watched")}
          className={`w-full py-2 px-4 border rounded-md mt-2 ${
            category === "Watched" ? "bg-green-500 text-white" : ""
          }`}
        >
          Watched
        </button>
        <button
          onClick={() => setCategory("Already Watched")}
          className={`w-full py-2 px-4 border rounded-md mt-2 ${
            category === "Already Watched" ? "bg-purple-500 text-white" : ""
          }`}
        >
          Already Watched
        </button>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={closeModal}
          className="py-2 px-4 border rounded-md bg-gray-500 text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleCategorySelection}
          className="py-2 px-4 border rounded-md bg-blue-500 text-white"
        >
          Add Movie
        </button>
      </div>
    </Modal>
  );
};

export default CategorizeMovieModal;
