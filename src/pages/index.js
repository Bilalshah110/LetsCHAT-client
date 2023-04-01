import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "./api/userApi";

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const handleMessage = ({ _id }) => {
    router.push(`/chat/${_id}`);
  };

  const handleDelete = async (user) => {
    try {
      await deleteUser(user._id);
      fetchData();
      alert(`${user.name} deleted successfully`);
    } catch (err) {
      console.error(err);
      alert(`Failed to delete ${user.name}`);
    }
  };

  const handleEdit = ({ _id }) => {
    router.push(`/edituser/${_id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersdata = await getAllUsers();
      setUsers(usersdata);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === (401 || 403)) {
        router.push("/login");
      }
    }
  };

  return (
    <div className="container">
      <h1>Users</h1>
      <br />
      {users
        ? users.map((user) => (
            <div key={user._id}>
              <img
                width="80"
                src={`http://localhost:9999/${user.profileImage.path}`}
                alt={user.name}
              />
              <h3>{user.name} </h3>
              <input
                type="button"
                onClick={() => handleMessage(user)}
                value="Send message"
              />
              <input
                type="button"
                onClick={() => handleDelete(user)}
                value="Delete User"
              />
              <input
                type="button"
                onClick={() => handleEdit(user)}
                value="Edit User"
              />
              <br />
              <hr />
            </div>
          ))
        : "No users"}
    </div>
  );
}
