import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { HiOutlineMail, HiOutlineUserCircle } from "react-icons/hi"; // Import react-icons
// import { BiLogIn } from "react-icons/bi"; // Import another icon if needed
import background from "../screens/background.jpg";


const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div
      className="flex flex items-center justify-center"
      style={{
        backgroundImage: `url(${background})`, 
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh", 
      }}
    >
      <div className="flex flex-col gap-4 border-2 flex items-center border-slate-800  rounded-md p-6 bg-white">
        <h1 className="text-4xl font-bold mb-6">LOGIN HERE!..</h1>
        <form onSubmit={handleSubmitForm}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black-800">
              <HiOutlineMail className="inline-block mr-2 text-lg" />
              Email ID 
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-black-800 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
     
          <div className="mb-4">
            <label htmlFor="room" className="block text-black-800">
              <HiOutlineUserCircle className="inline-block mr-2  text-lg" />
              Room Number
            </label>
    
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full border border-black-500 rounded-lg py-2 px-2 focus:outline-none focus:border-blue-800"
            />
          </div>
      
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-green-500 text-black-900 py-2 rounded-lg transition duration-300 hover:from-green-500 hover:to-red-500 hover:text-red-500"
          >
            {/* <BiLogIn className="inline-block mr-2 text-lg" /> */}
            CLICK HERE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;
