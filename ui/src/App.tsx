import { useState } from "react";

import "./App.css";
import { Login } from "./Login";

import { TableSelectionContainer } from "./TableSelection/TableSelection.container";

function App() {
  const [username, setUsername] = useState("");

  const handleUsername = (username: string) => {
    setUsername(username);
  };

  const onLogout: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setUsername("");
  };

  return (
    <>
      {username ? (
        <TableSelectionContainer username={username} onLogout={onLogout} />
      ) : (
        <Login username={username} handleUsername={handleUsername} />
      )}
    </>
  );
}

export default App;
