import { useCallback, useContext, useMemo, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

// Funzione di debounce generica
function debounce(callback, delay) {
  let timer;

  return (value) => {
    clearTimeout();
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Task:", tasks);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSetSearchQuery = useCallback(
    debounce(setSearchQuery, 500),
    []
  );

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const sortIcon = sortOrder === 1 ? "↑" : "↓";

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    return [...tasks]
      .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        let comparison;

        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
          const statusOptions = ["To Do", "Doing", "Done"];
          const statusA = statusOptions.indexOf(a.status);
          const statusB = statusOptions.indexOf(b.status);
          comparison = statusA - statusB;
        } else if (sortBy === "createdAt") {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          comparison = dateA - dateB;
        }

        return comparison * sortOrder;
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);

  return (
    <>
      <div>
        <h1>Lista dei Task</h1>

        {/* Input di ricerca */}
        <input
          type="text"
          placeholder="Cerca una task..."
          onChange={(e) => debouncedSetSearchQuery(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>
                Nome {sortBy === "title" && sortIcon}
              </th>
              <th onClick={() => handleSort("status")}>
                Status {sortBy === "status" && sortIcon}
              </th>
              <th onClick={() => handleSort("createdAt")}>
                Data di creazione {sortBy === "createdAt" && sortIcon}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
