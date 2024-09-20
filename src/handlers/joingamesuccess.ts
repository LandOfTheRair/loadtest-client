import { ClientState, IClient } from "@interfaces";

export function joinGameSuccess(client: IClient): void {
  function beInGame() {
    client.state = ClientState.InGame;

    client.sendMessage("Game:Emit:DoCommand", {
      command: "trade enable",
    });
  }

  client.addMessageHandler("error", ({ error }) => {
    if (error === "Already in game.") {
      beInGame();
    }
  });

  client.addActionHandler("[Game] Play Game", () => {
    beInGame();
  });
}
