import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Task:", tasks);

  return (
    <>
      <div>
        <h1>Lista dei Task</h1>
        <p>Qui vengono visualizzate le task</p>
      </div>
    </>
  );
}
