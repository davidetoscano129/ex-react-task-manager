import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask } = useContext(GlobalContext);

  const task = tasks.find((t) => t.id === parseInt(id));

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!task) {
    return <h2>Task non trovata</h2>;
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1>Dettaglio taks</h1>
      <p>
        <strong>Nome</strong>:{task.title}
      </p>
      <p>
        <strong>Descrizione</strong>:{task.description}
      </p>
      <p>
        <strong>Stato</strong>:{task.status}
      </p>
      <p>
        <strong>Data di creazione</strong>:
        {new Date(task.createdAt).toLocaleDateString()}
      </p>

      <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>

      {/* Modale di conferma eliminazione */}
      <Modal
        title="Conferma eliminazione"
        content={<p>Sei sicuro di voler eliminare questa task?</p>}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />
    </>
  );
}
