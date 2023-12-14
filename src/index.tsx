import "@repo/ui/dist/index.css";
import React from "react";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./styles/index.css";

const TetrisGame = () => (
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

export default TetrisGame;
