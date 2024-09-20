import { ClientState, IClient } from "@interfaces";

export function charCreateSuccess(client: IClient): void {
  client.addActionHandler(
    "[Account] Set Charslot Info",
    ({ slot, characterInfo }) => {
      client.state = ClientState.InLobby;
      client.account.players[slot] = characterInfo;
    }
  );
}
