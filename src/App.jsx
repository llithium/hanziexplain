import { useState } from "react";
import "./App.css";
import axios from "axios";
import CcdbUtil from "./CcdbUtil";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group, Button, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const apiURL = "http://ccdb.hemiola.com";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 60 } }}
      navbar={{
        width: { base: 200, md: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <div className="headerInner">
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <h1 style={{ margin: 0 }}>Hanzi Explain</h1>
          </Group>
          <Group justify="center" h="100%" px="md">
            <TextInput
              leftSection={
                <IconSearch
                  // style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              visibleFrom="xs"
              w={{ base: 200, sm: 400, md: 500 }}
              placeholder="Input placeholder"
            />
          </Group>
          <div></div>
        </div>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <TextInput hiddenFrom="xs" placeholder="Input placeholder" />
      </AppShell.Navbar>
      <AppShell.Main>
        <Button variant="filled">Button</Button>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
