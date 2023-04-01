import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";

export default function Chat() {
  const router = useRouter();
  let senderId = "";
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    senderId = decode.id;
  }
  const receiverId = router.query.id ? router.query.id : null;
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:9999/chats/findchat", {
          params: { senderId, receiverId },
        });
        setChatMessages(res.data);
      } catch (err) {
        console.error(err);
        setChatMessages([]);
      }
    };
    if (receiverId) {
      fetchMessages();
    }
  }, [receiverId]);

  useEffect(() => {
    const newSocket = io("http://localhost:9999/");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("message", (msg) => {
      setChatMessages(msg);
    });
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      senderId,
      receiverId,
      message,
    };
    socket.emit("message", newMessage);
    setMessage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="Send" />
      </form>
      <br />
      <hr />
      {chatMessages.messages
        ? chatMessages.messages.map((message) => (
            <div key={message._id} className="container">
              <h5>{message.message}</h5>
              <small>Sender: {message.sender.username} </small>
              <br />
              <small>Receiver: {message.receiver.username}</small> <hr />
            </div>
          ))
        : "No Messages"}
    </>
  );
}
