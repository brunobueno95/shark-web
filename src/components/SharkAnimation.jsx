// eslint-disable-next-line no-unused-vars
import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const SharkAnimation = () => {
  return (
    <Player
      autoplay
      loop
      src="https://lottie.host/35ddd4e9-20a8-4148-91e0-33399385cd1c/vs9Xvu6Fpy.json"
      style={{ height: "70px", width: "300px" }}
    >
      <Controls
        visible={false}
        buttons={["play", "repeat", "frame", "debug"]}
      />
    </Player>
  );
};

export default SharkAnimation;
