import type { User } from "../App";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import style from "./Table.module.css";

type TableProps = {
  users: User[];
  initialUsers: User[];
  setInitialUsers: Dispatch<SetStateAction<User[]>>;
  setAllUsers: Dispatch<SetStateAction<User[]>>;
};

const Table = ({
  users,
  initialUsers,
  setInitialUsers,
  setAllUsers,
}: TableProps) => {
  // Column metadata derived from headers
  const columns = useMemo(
    () =>
      [
        { key: "id", label: "ID", type: "number" as const },
        { key: "employee_id", label: "Employee ID", type: "string" as const },
        { key: "first_name", label: "First Name", type: "string" as const },
        { key: "last_name", label: "Last Name", type: "string" as const },
        { key: "email", label: "Email", type: "string" as const },
        { key: "phone", label: "Phone", type: "string" as const },
        { key: "department", label: "Department", type: "string" as const },
        { key: "position", label: "Position", type: "string" as const },
        { key: "hire_date", label: "Hire Date", type: "string" as const },
        { key: "salary", label: "Salary", type: "number" as const },
        { key: "location", label: "Location", type: "string" as const },
        { key: "manager_id", label: "Manager ID", type: "number" as const },
        { key: "status", label: "Employment Status", type: "string" as const },
      ] as const,
    []
  );

  // Toolbar state
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [visible, setVisible] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    columns.forEach((c) => (initial[c.key] = true));
    return initial;
  });
  const [sortValue, setSortValue] = useState<string>("");

  // Column widths for resizable columns
  const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    columns.forEach((c) => {
      map[c.key] = 160; // default width
    });
    return map;
  });
  const resizingRef = useRef<{
    key: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const { key, startX, startWidth } = resizingRef.current;
      const delta = e.clientX - startX;
      setColWidths((prev) => ({
        ...prev,
        [key]: Math.max(80, startWidth + delta),
      }));
    };
    const onMouseUp = () => {
      resizingRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const startResize = (key: string, e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = colWidths[key] ?? 160;
    resizingRef.current = { key, startX, startWidth };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };
  const handleOnChange = (value: string) => {
    const [field, type, order] = value.split("-");
    const fieldKey = field as keyof User;

    if (order === "default") {
      setAllUsers(initialUsers);
      return;
    }

    if (type === "string") {
      const sorted = [...users].sort((a: User, b: User) => {
        const av = String(a[fieldKey] ?? "");
        const bv = String(b[fieldKey] ?? "");
        return order === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
      setAllUsers(sorted);
      return;
    }

    // number sort
    const toNum = (v: User[keyof User]) =>
      v == null ? Number.NEGATIVE_INFINITY : Number(v as number | string);
    const sorted = [...users].sort((a: User, b: User) => {
      const diff = toNum(a[fieldKey]) - toNum(b[fieldKey]);
      return order === "asc" ? diff : -diff;
    });
    setAllUsers(sorted);
  };

  // Filtering
  const filteredUsers = useMemo(() => {
    if (!filter.trim()) return users;
    const text = filter.toLowerCase();
    return users.filter((u) =>
      columns.some((c) =>
        String(u[c.key as keyof User] ?? "")
          .toLowerCase()
          .includes(text)
      )
    );
  }, [filter, users, columns]);

  // Selection
  const toggleRow = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const allVisibleIds = useMemo(
    () => filteredUsers.map((u) => u.id),
    [filteredUsers]
  );
  const toggleAll = (checked: boolean) => {
    setSelected(() => (checked ? new Set(allVisibleIds) : new Set()));
  };

  // Bulk actions
  const bulkDelete = () => {
    if (selected.size === 0) return;
    const ids = new Set(selected);
    setAllUsers((prev) => prev.filter((u) => !ids.has(u.id)));
    setInitialUsers((prev) => prev.filter((u) => !ids.has(u.id)));
    setSelected(new Set());
  };
  const bulkComplete = () => {
    if (selected.size === 0) return;
    const ids = new Set(selected);
    setAllUsers((prev) =>
      prev.map((u) => (ids.has(u.id) ? { ...u, status: "Completed" } : u))
    );
    setInitialUsers((prev) =>
      prev.map((u) => (ids.has(u.id) ? { ...u, status: "Completed" } : u))
    );
    setSelected(new Set());
  };

  // Column visibility
  const toggleColumn = (key: string) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // CSV export
  const exportCsv = () => {
    const visibleColumns = columns.filter((c) => visible[c.key]);
    const header = ["Selected", ...visibleColumns.map((c) => c.label)].join(
      ","
    );
    const rows = filteredUsers.map((u) => {
      const cells = [
        selected.has(u.id) ? "1" : "0",
        ...visibleColumns.map((c) => {
          const val = u[c.key as keyof User];
          const str = val == null ? "" : String(val);
          const safe = '"' + str.replaceAll('"', '""') + '"';
          return safe;
        }),
      ];
      return cells.join(",");
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  return (
    <div className={style.wrapper}>
      <div className={style.toolbar}>
        <div className={style.leftControls}>
          <input
            className={style.search}
            placeholder="Filter rows..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className={style.actionBtn}
            onClick={bulkDelete}
            disabled={selected.size === 0}
          >
            Delete
          </button>
          <button
            className={style.actionBtn}
            onClick={bulkComplete}
            disabled={selected.size === 0}
          >
            Complete
          </button>
          <button className={style.actionBtn} onClick={exportCsv}>
            Export CSV
          </button>
        </div>
        <div className={style.rightControls}>
          <details>
            <summary>Columns</summary>
            <div className={style.columnsMenu}>
              {columns.map((c) => (
                <label key={c.key} className={style.columnToggle}>
                  <input
                    type="checkbox"
                    checked={visible[c.key]}
                    onChange={() => toggleColumn(c.key)}
                  />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>
          </details>
        </div>
      </div>

      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead className={style.theadSticky}>
            <tr>
              <th className={style.checkboxCol}>
                <input
                  type="checkbox"
                  checked={
                    selected.size > 0 && selected.size === allVisibleIds.length
                  }
                  onChange={(e) => toggleAll(e.target.checked)}
                  aria-label="Select all visible"
                />
              </th>
              {columns.map((c) =>
                visible[c.key] ? (
                  <th key={c.key} style={{ width: colWidths[c.key] }}>
                    <div className={style.thContent}>
                      <select
                        className={style.sortSelect}
                        value={sortValue}
                        onChange={(e) => {
                          setSortValue(e.target.value);
                          handleOnChange(e.target.value);
                        }}
                      >
                        <option value={`${c.key}-${c.type}-default`}>
                          {c.label}
                        </option>
                        <option value={`${c.key}-${c.type}-asc`}>
                          {c.label} (asc)
                        </option>
                        <option value={`${c.key}-${c.type}-desc`}>
                          {c.label} (desc)
                        </option>
                      </select>
                      <span
                        className={style.resizer}
                        onMouseDown={(e) => startResize(c.key, e)}
                        role="separator"
                        aria-orientation="vertical"
                        aria-label={`Resize ${c.label} column`}
                      />
                    </div>
                  </th>
                ) : null
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr
                key={user.id}
                className={
                  selected.has(user.id) ? style.selectedRow : undefined
                }
              >
                <td className={style.checkboxCol}>
                  <input
                    type="checkbox"
                    checked={selected.has(user.id)}
                    onChange={() => toggleRow(user.id)}
                    aria-label={`Select row ${user.id}`}
                  />
                </td>
                {visible["id"] && (
                  <td style={{ width: colWidths["id"] }}>{user.id}</td>
                )}
                {visible["employee_id"] && (
                  <td style={{ width: colWidths["employee_id"] }}>
                    {user.employee_id}
                  </td>
                )}
                {visible["first_name"] && (
                  <td style={{ width: colWidths["first_name"] }}>
                    {user.first_name}
                  </td>
                )}
                {visible["last_name"] && (
                  <td style={{ width: colWidths["last_name"] }}>
                    {user.last_name}
                  </td>
                )}
                {visible["email"] && (
                  <td style={{ width: colWidths["email"] }}>{user.email}</td>
                )}
                {visible["phone"] && (
                  <td style={{ width: colWidths["phone"] }}>{user.phone}</td>
                )}
                {visible["department"] && (
                  <td style={{ width: colWidths["department"] }}>
                    {user.department}
                  </td>
                )}
                {visible["position"] && (
                  <td style={{ width: colWidths["position"] }}>
                    {user.position}
                  </td>
                )}
                {visible["hire_date"] && (
                  <td style={{ width: colWidths["hire_date"] }}>
                    {user.hire_date}
                  </td>
                )}
                {visible["salary"] && (
                  <td style={{ width: colWidths["salary"] }}>{user.salary}</td>
                )}
                {visible["location"] && (
                  <td style={{ width: colWidths["location"] }}>
                    {user.location}
                  </td>
                )}
                {visible["manager_id"] && (
                  <td style={{ width: colWidths["manager_id"] }}>
                    {user.manager_id}
                  </td>
                )}
                {visible["status"] && (
                  <td style={{ width: colWidths["status"] }}>{user.status}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
