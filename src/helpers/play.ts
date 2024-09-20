import { IClient } from "@interfaces";

export function play(client: IClient) {
  client.sendMessage("Game:Emit:DoCommand", {
    command: "art blindstrike",
  });
}
