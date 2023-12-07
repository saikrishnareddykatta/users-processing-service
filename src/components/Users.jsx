import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  styled,
  Button,
} from "@mui/material";

import axios from "axios";

const Component = styled(Box)`
  width: 80%;
  margin: 50px auto;
  & h4 {
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

const Users = () => {
  const [users, setUsers] = useState([]);

  const API_URL = `${process.env.REACT_APP_MY_KEY}`;

  const removeEntry = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(API_URL);
      const parsedResponse = JSON.parse(response.data.body);
      setUsers(parsedResponse.Items);
    };
    getData();
  }, []);

  return (
    <Component>
      <Typography variant="h4" gutterBottom>
        Users Processing System
      </Typography>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Remove Entry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.salary}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeEntry(user.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Component>
  );
};

export default Users;
