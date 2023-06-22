import { useEffect, useState } from "react";

import "./App.css";
import { Login } from "./Login";

import { ListPage } from "./List";

function App() {
  const [username, setUsername] = useState("");

  const handleUsername = (username: string) => {
    setUsername(username);
  };

  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <>
      {username ? (
        <ListPage username={username} />
      ) : (
        <Login username={username} handleUsername={handleUsername} />
      )}
    </>
  );
}

export default App;
