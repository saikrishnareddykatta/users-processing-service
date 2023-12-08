import { useState } from "react";
import "./App.css";
import Users from "./components/Users";
import UserForm from "./components/UserForm";
import { Box, Typography } from "@mui/material";

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  return (
    <div className="App">
      <Box>
        <Typography variant="h4" gutterBottom>
          Users Processing System
        </Typography>
      </Box>
      {!displayForm && <Users setDisplayForm={setDisplayForm} />}
      {displayForm && <UserForm setDisplayForm={setDisplayForm} />}
    </div>
  );
}

export default App;
