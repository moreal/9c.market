// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

const app = document.getElementById("app");
if (app === null) {
  throw new Error("No #app element found");
}

mount(() => <StartClient />, app);
