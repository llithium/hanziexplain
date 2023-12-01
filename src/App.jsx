import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import CcdbUtil from "./CcdbUtil";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const apiURL = "http://ccdb.hemiola.com";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [searchValue, setSearchValue] = useState("");
  const [requestResponse, setRequestResponse] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function request() {
      setRequestResponse(
        await axios.get(
          apiURL + "/characters/?filter=gb&fields=string,kDefinition,kMandarin"
        )
      );
    }
    request();
  }, []);

  useEffect(() => {
    async function search() {
      const result = requestResponse.data.filter((element) => {
        // return element.string == searchValue;
        return searchValue.split("").includes(element.string);
      });
      // console.log(result);
      const resultPinyin = requestResponse.data.filter((element) => {
        if (element.kMandarin !== null && element.kMandarin !== undefined) {
          return element.kMandarin.includes(searchValue.toUpperCase());
        }
      });
      const resultDefinition = requestResponse.data.filter((element) => {
        if (
          element.kDefinition !== null &&
          element.kDefinition !== undefined &&
          searchValue.length >= 3
        ) {
          return element.kDefinition.includes(searchValue);
        }
      });
      // const resultMultiCharacter = requestResponse.data.filter((element) => {});
      searchValue
        ? setSearchResults([...result, ...resultPinyin, ...resultDefinition])
        : setSearchResults([]);
    }
    search();
  }, [searchValue]);

  //For Testing
  useEffect(() => {
    // console.log(requestResponse);
    // console.log(searchResults);
  }, [searchResults]);

  function handleSearch(event) {
    const value = event.target.value;
    // console.log(value);
    setSearchValue(value);
  }

  function handleClick(event) {
    const character = event.currentTarget.firstChild.innerHTML;
    const id = event.currentTarget.querySelector("svg").id;
    console.log(
      window.getComputedStyle(event.currentTarget.querySelector("svg")).display
    );
    if (event.currentTarget.querySelector("svg").querySelector("g")) {
      if (
        window.getComputedStyle(event.currentTarget.querySelector("svg"))
          .display == "none"
      ) {
        event.currentTarget
          .querySelector("svg")
          .setAttribute("display", "inline");
      } else {
        event.currentTarget
          .querySelector("svg")
          .setAttribute("display", "none");
      }
    } else {
      const writer = HanziWriter.create(id, character, {
        width: 200,
        height: 200,
        padding: 5,
        // strokeAnimationSpeed: 5,
        delayBetweenStrokes: 190, // milliseconds
      }).loopCharacterAnimation();
      event.currentTarget
        .querySelector("svg")
        .setAttribute("display", "inline");
    }
  }

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
              hiddenFrom="xs"
              size="sm"
            />
            <a style={{ all: "unset" }} href="/">
              <h1 style={{ margin: 0 }}>Hanzi Explain</h1>
            </a>
          </Group>
          <Group justify="center" h="100%" px="md">
            <TextInput
              value={searchValue}
              onChange={handleSearch}
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
      <AppShell.Navbar hiddenFrom="xs" p="md">
        <TextInput
          value={searchValue}
          onChange={handleSearch}
          hiddenFrom="xs"
          placeholder="Input placeholder"
        />
      </AppShell.Navbar>
      <AppShell.Main>
        {searchResults.map((res, index) => {
          const pinyin = res.kMandarin ? res.kMandarin.split(" ") : "";
          const convertedPinyin = res.kMandarin
            ? pinyin.map((item) => {
                return CcdbUtil.convertPinyin(item) + ", ";
              })
            : "";
          return (
            <div onClick={handleClick} key={index}>
              <p className="string">{res.string}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                id={index}
                display="none"
              >
                <line x1="0" y1="0" x2="200" y2="200" stroke="#DDD" />
                <line x1="200" y1="0" x2="0" y2="200" stroke="#DDD" />
                <line x1="100" y1="0" x2="100" y2="200" stroke="#DDD" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="#DDD" />
              </svg>
              <p className="pinyin">{convertedPinyin}</p>
              <p className="definition">{res.kDefinition}</p>
              <hr></hr>
            </div>
          );
        })}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
