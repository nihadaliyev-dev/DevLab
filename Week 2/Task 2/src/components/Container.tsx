import { useEffect, useState } from "react";
import type { DragEvent as ReactDragEvent, FormEvent } from "react";
import styles from "./Container.module.css";

type Task = {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  createdAt: string;
  description?: string;
  dueDate?: string;
};

type ColumnId = "todo" | "inprogress" | "done";

const STORAGE_KEY = "kanban:columns:v1";
const emptyColumns: Record<ColumnId, Task[]> = {
  todo: [],
  inprogress: [],
  done: [],
};

const formatDate = (iso: string) => new Date(iso).toLocaleDateString();

const Container = () => {
  const [columns, setColumns] = useState<Record<ColumnId, Task[]>>(() => {
    if (typeof window === "undefined") return emptyColumns;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyColumns;
      const parsed = JSON.parse(raw);
      return {
        todo: Array.isArray(parsed?.todo) ? parsed.todo : [],
        inprogress: Array.isArray(parsed?.inprogress) ? parsed.inprogress : [],
        done: Array.isArray(parsed?.done) ? parsed.done : [],
      } as Record<ColumnId, Task[]>;
    } catch {
      return emptyColumns;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
      }
    } catch {
      // ignore storage errors
    }
  }, [columns]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<ColumnId | null>(null);

  const [newTitle, setNewTitle] = useState("");

  // Edit modal state
  const [editing, setEditing] = useState<{
    taskId: string;
    column: ColumnId;
  } | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState<Task["priority"]>("Low");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  const columnsMeta: { id: ColumnId; title: string }[] = [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  function handleAddTask(e: FormEvent) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    const task: Task = {
      id: `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      title,
      priority: "Low",
      createdAt: new Date().toISOString(),
    };
    setColumns((prev) => ({ ...prev, todo: [...prev.todo, task] }));
    setNewTitle("");
  }

  function openEditor(taskId: string, column: ColumnId) {
    const task = columns[column].find((t) => t.id === taskId);
    if (!task) return;
    setEditing({ taskId, column });
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditDescription(task.description ?? "");
    setEditDueDate(task.dueDate ?? "");
  }

  function closeEditor() {
    setEditing(null);
  }

  function saveEdit(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setColumns((prev) => {
      const list = [...prev[editing.column]];
      const idx = list.findIndex((t) => t.id === editing.taskId);
      if (idx === -1) return prev;
      const original = list[idx];
      const updated: Task = {
        ...original,
        title: editTitle.trim() || original.title,
        priority: editPriority,
        description: editDescription.trim() || undefined,
        dueDate: editDueDate || undefined,
      };
      list[idx] = updated;
      return { ...prev, [editing.column]: list };
    });
    setEditing(null);
  }

  function handleDragStart(
    e: ReactDragEvent<HTMLLIElement>,
    taskId: string,
    from: ColumnId
  ) {
    setDraggingId(taskId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "application/x-task",
      JSON.stringify({ taskId, from })
    );
  }

  function handleDragEnd() {
    setDraggingId(null);
  }

  function handleDragOver(e: ReactDragEvent<HTMLDivElement>, target: ColumnId) {
    if (Array.from(e.dataTransfer.types).includes("application/x-task")) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (overColumn !== target) setOverColumn(target);
    }
  }

  function handleDragEnter(target: ColumnId) {
    if (overColumn !== target) setOverColumn(target);
  }

  function handleDrop(e: ReactDragEvent<HTMLDivElement>, target: ColumnId) {
    const payload = e.dataTransfer.getData("application/x-task");
    if (!payload) return;
    const { taskId, from } = JSON.parse(payload) as {
      taskId: string;
      from: ColumnId;
    };
    if (!taskId || !from) return;
    if (from === target) {
      setOverColumn(null);
      setDraggingId(null);
      return;
    }

    setColumns((prev) => {
      const source = [...prev[from]];
      const idx = source.findIndex((t) => t.id === taskId);
      if (idx === -1) return prev;
      const [moved] = source.splice(idx, 1);
      const dest = [...prev[target], moved];
      return { ...prev, [from]: source, [target]: dest };
    });

    setOverColumn(null);
    setDraggingId(null);
  }

  return (
    <div className={styles.containerMain}>
      <div className={styles.containerHeader}>
        <form onSubmit={handleAddTask}>
          <input
            placeholder="Add your to do..."
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            aria-label="New to do title"
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className={styles.container}>
        {columnsMeta.map((col) => (
          <div
            key={col.id}
            className={`${styles["task-column"]} ${
              overColumn === col.id ? styles["drop-target"] : ""
            }`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragEnter={() => handleDragEnter(col.id)}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <h2>
              {col.title}{" "}
              <span className={styles.count}>({columns[col.id].length})</span>
            </h2>
            <ul className={styles.tasks}>
              {columns[col.id].map((task) => (
                <li
                  key={task.id}
                  className={`${styles.task} ${
                    draggingId === task.id ? styles.dragging : ""
                  }`}
                  draggable
                  onDoubleClick={(ev) => {
                    ev.stopPropagation();
                    openEditor(task.id, col.id);
                  }}
                  onDragStart={(e) => handleDragStart(e, task.id, col.id)}
                  onDragEnd={handleDragEnd}
                >
                  <div className={styles.taskTitle}>{task.title}</div>
                  <div className={styles.meta}>
                    <span
                      className={`${styles.badge} ${
                        task.priority === "High"
                          ? styles["priority-high"]
                          : task.priority === "Medium"
                          ? styles["priority-medium"]
                          : styles["priority-low"]
                      }`}
                    >
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className={styles.date}>Due: {task.dueDate}</span>
                    )}
                    <span className={styles.date}>
                      Created: {formatDate(task.createdAt)}
                    </span>
                  </div>
                  {task.description && (
                    <div className={styles.desc}>{task.description}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {editing && (
        <div className={styles.modalOverlay} onClick={() => closeEditor()}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="editTaskTitle"
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 id="editTaskTitle">Edit task</h3>
              <button
                type="button"
                className={styles.iconClose}
                aria-label="Close"
                onClick={() => closeEditor()}
              >
                ×
              </button>
            </div>
            <form onSubmit={saveEdit}>
              <div className={styles.modalBody}>
                <label className={styles.label}>
                  Title
                  <input
                    className={styles.input}
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Priority
                  <select
                    className={styles.select}
                    value={editPriority}
                    onChange={(e) =>
                      setEditPriority(e.target.value as Task["priority"])
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </label>
                <label className={styles.label}>
                  Due date
                  <input
                    className={styles.input}
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                  />
                </label>
                <label className={styles.label}>
                  Description
                  <textarea
                    className={styles.textarea}
                    rows={4}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Add a short description"
                  />
                </label>
              </div>
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => closeEditor()}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.primaryButton}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;
