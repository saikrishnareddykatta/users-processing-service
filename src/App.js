import { useState } from "react";
import "./App.css";
import Users from "./components/Users";
import UserForm from "./components/UserForm";
import { Box, Typography } from "@mui/material";

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [updateUserClick, setUpdateUserClick] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  return (
    <div className="App">
      <Box>
        <Typography variant="h4" gutterBottom>
          Users Processing System
        </Typography>
      </Box>
      {!displayForm && (
        <Users
          setDisplayForm={setDisplayForm}
          setUpdatedUser={setUpdatedUser}
          setUpdateUserClick={setUpdateUserClick}
        />
      )}
      {displayForm && (
        <UserForm
          updatedUser={updatedUser}
          updateUserClick={updateUserClick}
          setUpdateUserClick={setUpdateUserClick}
          setUpdatedUser={setUpdatedUser}
          setDisplayForm={setDisplayForm}
        />
      )}
    </div>
  );
}

export default App;
