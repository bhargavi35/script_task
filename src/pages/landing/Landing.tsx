import React from "react";
import { Button, Title, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/app.store";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <Paper maw={500} mx="auto" mt={100} p="lg" withBorder>
      <Title align="center" mb="md">Welcome to Dog Facts App</Title>
      {isAuthenticated ? (
        <>
          <Button fullWidth mb="sm" onClick={() => navigate("/breeds")}>
            View Dog Facts
          </Button>
          <Button fullWidth color="red" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <Button fullWidth onClick={() => navigate("/login")}>
          Login
        </Button>
      )}
    </Paper>
  );
}
