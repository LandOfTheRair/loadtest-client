import { ClientState, IClient } from "@interfaces";

export function authSuccess(client: IClient): void {
  client.addMessageHandler("Auth:Response:Login", ({ account }) => {
    client.state = ClientState.InLobby;
    client.account = account;
  });
}
