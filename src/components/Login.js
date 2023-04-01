import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../pages/api/userApi";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await loginUser(user);
      localStorage.setItem("token", loggedInUser.token);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>{" "}
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Password: </label>{" "}
          <input
            type="text"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
}
