import React from "react";
import { RecoilRoot } from "recoil";
import App from "./App";

function TetrisGame() {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>
  );
}

export default TetrisGame;
