import UserForm from "@/components/UserForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { findUser, updateUser } from "../pages/api/userApi";

export default function EditUser() {
  const router = useRouter();
  let id = router.query.id ? router.query.id : null;
  const [user, setUser] = useState();

  const handleUpdate = async (user) => {
    try {
      await updateUser(id, user);
      alert(`${user.name} updated`);
      router.push("/");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === (401 || 403)) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserData();
    }
  }, [router.query.id]);

  const fetchUserData = async () => {
    try {
      const userData = await findUser(id);
      setUser(userData);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert("No user found");
        router.push("/");
      }
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <UserForm mode="edit" editUser={user} onSubmit={handleUpdate} />
    </div>
  );
}
