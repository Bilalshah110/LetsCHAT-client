import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
import { findChat } from "@/pages/api/chatApi";

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
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const chat = await findChat({senderId, receiverId});
        setChat(chat);
      } catch (err) {
        console.error(err);
        setChat([]);
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
      setChat(msg);
    });
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      chatId: chat._id,
      senderId,
      receiverId,
      message,
    };
    socket.emit("message", newMessage);
    setMessage("");
  };

  return (
    <div className="container-fluid">
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
      {chat.messages && chat.messages.length !== 0
        ? chat.messages.map((message) => (
            <div key={message._id} className="container">
              <h5>{message.message}</h5>
              <small>Sender: {message.sender.username} </small>
              <br />
              <small>Receiver: {message.receiver.username}</small> <hr />
            </div>
          ))
        : "No Messages"}
    </div>
  );
}
