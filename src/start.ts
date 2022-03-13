import bot from "./bot";
import art from "ascii-art";

art.font("Spider Lite", "Doom", (_: any, renderer: string) => {
  console.log(art.style(renderer, "cyan", true));
  bot();
});
