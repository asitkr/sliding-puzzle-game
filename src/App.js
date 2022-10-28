import React, { useState } from "react";
import Board from "./components/Board";
import { updateURLParameter } from "./components/Helper";

function App() {

  const [imgUrl, setImgUrl] = useState("");

  const handleImageChange = (e) => {
    setImgUrl(e.target.value);
    window.history.replaceState("", "", updateURLParameter(window.location.href, "img", e.target.value));
  }

  return (
    <div className="App">
      <h1>Puzzle Sliding Game</h1>
      <Board imgUrl={imgUrl} />

      <input value={imgUrl} onChange={handleImageChange} />
    </div>
  );
}

export default App;
