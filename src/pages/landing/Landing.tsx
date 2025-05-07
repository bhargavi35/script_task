import React from "react";
import { Button, Title, Paper,useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/app.store";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const theme = useMantineTheme();
  const isDark = theme.colorScheme === "dark";

  return (
    <Paper maw={500} mx="auto" mt={100} p="lg" withBorder>
     <Title align="center" order={2} mb="md" color={isDark ? "gray.2" : "gray.9"}>
        🐶 Welcome to Dog Facts App
      </Title>
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
