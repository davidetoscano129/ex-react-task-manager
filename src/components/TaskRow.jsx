import { memo } from "react";
import { Link } from "react-router-dom";

const TaskRow = memo(({ task }) => {
  // Styling for the status cell
  const getStatusStyle = (status) => {
    switch (status) {
      case "To do":
        return {
          backgroundColor: "red",
          color: "white",
        };
      case "Doing":
        return {
          backgroundColor: "yellow",
          color: "black",
        };
      case "Done":
        return {
          backgroundColor: "green",
          color: "white",
        };
      default:
        return {};
    }
  };

  return (
    <tr>
      <td>
        <Link to={`/task/${task.id}`}>{task.title}</Link>
      </td>
      <td style={getStatusStyle(task.status)}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
