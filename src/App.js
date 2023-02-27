import moment from "moment";
import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Datepicker from "./components/Datepicker";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  #root,
  #__next {
    isolation: isolate;
  }

  html,
  body {
    height: 100%;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-width: 37rem;
  width: 100vw;
  height: 100svh;
  padding-top: 1rem;
  color: #ffffff;
  background-image: linear-gradient(to top right, #bee0ec, #2596be);
`;

const PickedDate = styled.span`
  padding-inline: 1rem;
  font-size: 2rem;
  text-align: center;
`;

export default function App() {
  const [controlledDate, setControlledDate] = useState(moment());

  return (
    <>
      <GlobalStyle />
      <Container>
        <h1>React Datepicker</h1>
        <Datepicker
          controlledDate={controlledDate}
          setControlledDate={setControlledDate}
        />
        <PickedDate>
          Picked date: {controlledDate.format("dddd, MMMM Do YYYY")}
        </PickedDate>
      </Container>
    </>
  );
}
