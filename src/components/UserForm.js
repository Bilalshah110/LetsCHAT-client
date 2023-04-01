import { useEffect, useState } from "react";

export default function UserForm({ mode, editUser, onSubmit }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });
  const handleInputChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };
  const handleFileChange = ({ target }) => {
    setUser({ ...user, photo: target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  useEffect(() => {
    if (editUser) {
      setUser({
        name: editUser.name,
        email: editUser.email,
        password: "",
        photo: editUser.profileImage,
      });
    }
  }, [editUser]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <br />
        {mode === "add" && (
          <div>
            Password:{" "}
            <input
              type="text"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
        )}
        <br />
        <div>
          Photo: <input type="file" name="photo" onChange={handleFileChange} />
          {editUser && <p>{editUser.profileImage.filename}</p>}
        </div>
        <br />
        <div>
          <input
            className="btn btn-danger"
            type="submit"
            value={mode === "add" ? "Register" : "Update"}
          />
        </div>
        <br />
      </form>
    </div>
  );
}
