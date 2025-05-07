// src/components/Navbar.tsx
import React from "react";
import { ActionIcon, useMantineColorScheme, Group } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

const Navbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Group position="right" p="md">
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
      </ActionIcon>
    </Group>
  );
};

export default Navbar;
