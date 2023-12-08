import { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const UserForm = (props) => {
  const {
    updateUserClick,
    updatedUser,
    setDisplayForm,
    setUpdateUserClick,
    setUpdatedUser,
  } = props;
  const uniqueId = uuidv4();

  let defaultObject = {
    id: uniqueId,
    name: "",
    username: "",
    email: "",
    phone: "",
    salary: "",
    age: "",
  };

  let stateObject = {};

  if (updateUserClick) {
    stateObject = updatedUser;
  } else {
    stateObject = defaultObject;
  }

  const [formData, setFormData] = useState(stateObject);

  const [errors, setErrors] = useState({
    phone: "",
    salary: "",
    age: "",
  });

  const API_URL = `${process.env.REACT_APP_MY_KEY}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the value is empty or non-numeric, set it directly; otherwise, convert to numeric
    const numericValue =
      value.trim() === "" || isNaN(value) ? value : parseFloat(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const updateuserHandler = async () => {
    try {
      const response = await axios.put(API_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUpdateUserClick(false);
      setUpdatedUser({});
      setDisplayForm(false);
      console.log("Update successful:", response);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const createUserHandler = async () => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDisplayForm(false);
      console.log("***response", response);
    } catch (error) {
      console.log("***error", error);
    }
  };

  const handleCancel = () => {
    setUpdateUserClick(false);
    setUpdatedUser({});
    setDisplayForm(false);
    console.log("***cancel");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const isPhoneValid = /^\d{10}$/.test(formData.phone);
    const isSalaryValid =
      /^\d{1,9}$/.test(formData.salary) && formData.salary >= 0;
    const isAgeValid =
      Number.isInteger(formData.age) &&
      formData.age >= 0 &&
      formData.age <= 100;

    // Update error messages
    setErrors({
      phone: isPhoneValid
        ? ""
        : "Invalid phone number. It should be exactly 10 digits.",
      salary: isSalaryValid
        ? ""
        : "Invalid salary. It should be a non-negative integer with at most 9 digits.",
      age: isAgeValid
        ? ""
        : "Invalid age. It should be an integer between 0 and 100.",
    });

    // If validation passes, proceed with form submission
    if (isPhoneValid && isSalaryValid && isAgeValid) {
      // console.log("***Form submitted with data:", formData);
      if (updateUserClick) {
        updateuserHandler();
      } else {
        createUserHandler();
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" align="center" gutterBottom>
        User Registration Form
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          autoComplete="off"
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          autoComplete="off"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          autoComplete="off"
        />
        <TextField
          label="Phone"
          name="phone"
          type="number"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          autoComplete="off"
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
          autoComplete="off"
          error={!!errors.salary}
          helperText={errors.salary}
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
          autoComplete="off"
          error={!!errors.age}
          helperText={errors.age}
        />
        <div style={{ margin: "20px 0" }}></div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="info" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserForm;
