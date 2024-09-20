import { IClient } from "@interfaces";

export function authError(client: IClient): void {
  const accountInfo = {
    username: `TestPlayer${client.id}`,
    password: client.argv.clientPassword,
    email: `testplayer${client.id}@testplayer.com`,
  };

  client.addMessageHandler("error", ({ error }) => {
    if (error === "Username not registered.") {
      client.sendMessage("Auth:Emit:Register", accountInfo);
    }

    if (error === "Username already registered.") {
      client.sendMessage("Auth:Emit:Login", accountInfo);
    }
  });
}
