import React, { useState } from "react";
// import { AuthLayout } from "../components/auth/AuthLayout";
// import { Icons } from "../components/ui/icons";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { analytics } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Button, TextField, Typography } from "@mui/material";
import { auth } from "../firebase";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const onSubmit = async (data, event) => {
    try {
      event.preventDefault();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
        // data.name
      );
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (e) {
      console.log(e.message);
    }
  };

  // async function onSubmit(event) {}

  return (
    <Box className={"flex justify-center items-center h-[100vh]"}>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] p-3 border-[#ccc] rounded-md"
      >
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          color="primary"
        >
          Sign Up
        </Typography>
        <TextField
          fullWidth
          label="Full Name"
          {...register("fullName", { required: "Full Name is required" })}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          margin="normal"
          onBlur={() => trigger("fullName")}
        />
        <TextField
          fullWidth
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-z]{2,4}$/,
              message: "Invalid Email Address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          onBlur={() => trigger("email")}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
          onBlur={() => trigger("password")}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2, padding: 1 }}
          // onClick={setIsLoading(true)}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
