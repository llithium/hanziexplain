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
        return element.string == searchValue;
      });
      const resultPinyin = requestResponse.data.filter((element) => {
        if (element.kMandarin !== null && element.kMandarin !== undefined) {
          return element.kMandarin.includes(searchValue.toUpperCase());
        }
      });
      searchValue
        ? setSearchResults([...result, ...resultPinyin])
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
    const innerHTML = event.currentTarget.firstChild.innerHTML;
    const id = event.currentTarget.querySelector("div").id;
    console.log(event.currentTarget.querySelector("div").hidden);
    if (event.currentTarget.querySelector("div").querySelector("svg")) {
      if (event.currentTarget.querySelector("div").hidden == false) {
        console.log("bingo");
        event.currentTarget.querySelector("div").setAttribute("hidden", true);
      } else {
        event.currentTarget.querySelector("div").removeAttribute("hidden");
      }
    } else {
      const writer = HanziWriter.create(id, innerHTML, {
        width: 150,
        height: 150,
        padding: 5,
        // strokeAnimationSpeed: 5,
        delayBetweenStrokes: 190, // milliseconds
      }).loopCharacterAnimation();
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
              hiddenFrom="sm"
              size="sm"
            />
            <h1 style={{ margin: 0 }}>Hanzi Explain</h1>
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
      <AppShell.Navbar p="md">
        <TextInput
          value={searchValue}
          onChange={handleSearch}
          hiddenFrom="xs"
          placeholder="Input placeholder"
        />
      </AppShell.Navbar>
      <AppShell.Main>
        {searchResults.map((res, index) => {
          const pinyin = res.kMandarin.split(" ");
          // console.log(pinyin)
          const convertedPinyin = pinyin.map((item) => {
            return CcdbUtil.convertPinyin(item) + ", ";
          });
          // console.log(convertedPinyin);
          return (
            <div onClick={handleClick} key={index}>
              <p className="string" key={index}>
                {res.string}
              </p>
              <div id={index} key={index}></div>
              <p className="pinyin" key={index}>
                {convertedPinyin}
              </p>
              <p className="definition" key={index}>
                {res.kDefinition}
              </p>
              <hr></hr>
            </div>
          );
        })}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
