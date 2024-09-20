import { IClient } from "@interfaces";

export function doAuth(client: IClient) {
  const accountInfo = {
    username: `TestPlayer${client.id}`,
    password: client.argv.clientPassword,
    email: `testplayer${client.id}@testplayer.com`,
  };

  if (client.argv.isRegister) {
    client.sendMessage("Auth:Emit:Register", accountInfo);
  } else {
    client.sendMessage("Auth:Emit:Login", accountInfo);
  }
}
