import UserForm from "@/components/UserForm";
import { useRouter } from "next/router";
import { addUser } from "../pages/api/userApi";

export default function Signup() {
  const router = useRouter();

  const handleSignup = async (user) => {
    try {
      const signedUser = await addUser(user);
      localStorage.setItem("token", signedUser.token);
      alert(`Account created`);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <UserForm mode="add" onSubmit={handleSignup} />
    </div>
  );
}
