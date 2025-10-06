import axios from "axios";
import { useEffect, useState } from "react";
import Table from "./components/Table";

export type User = {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hire_date: string;
  salary: number;
  location: string;
  manager_id: number | null;
  status: string;
};

function App() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  const getAllUsers = async () => {
    const response = await axios.get("http://localhost:3000/users");
    setAllUsers(response.data);
    setInitialUsers(response.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <Table
        users={allUsers}
        setAllUsers={setAllUsers}
        initialUsers={initialUsers}
        setInitialUsers={setInitialUsers}
      />
    </>
  );
}

export default App;
