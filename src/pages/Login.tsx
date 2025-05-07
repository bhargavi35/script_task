import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button, Paper, Title } from "@mantine/core";
import { useAuthStore } from "../store/app.store";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/breeds");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Paper maw={340} mx="auto" mt={100} p="md" withBorder>
      <Title align="center" mb="md">Login</Title>
      <form onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg bg-white">
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mt="md"
        />
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        <Button fullWidth mt="xl" type="submit">
          Login
        </Button>
      </form>
    </Paper>
  );
}
