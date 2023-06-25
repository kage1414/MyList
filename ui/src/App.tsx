import { useState } from "react";

import "./App.css";
import { Login } from "./Login";

import { TableSelectionContainer } from "./TableSelection/TableSelection.container";

function App() {
  const [username, setUsername] = useState("");

  const handleUsername = (username: string) => {
    setUsername(username);
  };

  return (
    <>
      {username ? (
        <TableSelectionContainer username={username} />
      ) : (
        <Login username={username} handleUsername={handleUsername} />
      )}
    </>
  );
}

export default App;
