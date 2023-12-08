import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  styled,
  Button,
  CircularProgress,
} from "@mui/material";

import axios from "axios";

const Component = styled(Box)`
  width: 80%;
  margin: 50px auto;
  & h4 {
    margin-bottom: 20px;
  }
  & > div > table {
    margin-bottom: 20px;
  }
  & > div > table > thead {
    background-color: #000;
  }
  & > div > table > thead > tr > th {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
  & > div > table > tbody > tr > td {
    font-size: 16px;
  }
`;

const Users = (props) => {
  const { setDisplayForm, setUpdatedUser, setUpdateUserClick } = props;
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = `${process.env.REACT_APP_MY_KEY}`;

  const getData = useCallback(async () => {
    const response = await axios.get(
      API_URL,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUsers(response.data.users.Items);
    setIsLoading(false);
  }, [API_URL]);

  const updateUser = (user) => {
    setDisplayForm(true);
    setUpdatedUser(user);
    setUpdateUserClick(true);
    console.log("***Update User", user);
  };

  const deleteUser = async (userID) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { id: `${userID}` },
      });
      // console.log("***response", response);
      getData();
    } catch (error) {
      console.log("***Error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Component>
      {isLoading && <CircularProgress size={48} color="secondary" />}
      {!isLoading && (
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Update Entry</TableCell>
                <TableCell>Remove Entry</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.salary}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => updateUser(user)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteUser(user.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            type="submit"
            variant="contained"
            color="info"
            onClick={() => setDisplayForm(true)}
          >
            Create a User
          </Button>
        </Box>
      )}
    </Component>
  );
};

export default Users;
