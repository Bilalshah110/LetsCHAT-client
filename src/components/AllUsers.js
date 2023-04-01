import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import UserCard from "./UserCard";

export default function AllUsers() {
  const router = useRouter();
  let token = "";
  if (typeof window !== "undefined") {
    token = `bearer ${localStorage.getItem("token")}`;
  }

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(
    () => async () => {
      await axios
        .get("http://localhost:9999/user", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          router.push("/login");
          setLoading(false);
        });
    },
    []
  );

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <Row>
          {users
            ? users.map((user) => (
                <Col key={user._id} className="mb-4" lg={3} md={6}>
                  <UserCard user={user} />
                  <br />
                </Col>
              ))
            : "No Users"}
        </Row>
      )}
    </>
  );
}
