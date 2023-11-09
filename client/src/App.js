import { Routes, Route } from "react-router-dom";
import "./App.css";
import Lobby from "./screens/Lobby";
import RoomPage from "./screens/Room";
import 'tailwindcss/tailwind.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
