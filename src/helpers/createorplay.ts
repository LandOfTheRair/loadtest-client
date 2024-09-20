import { IClient } from "@interfaces";

export function createOrPlay(client: IClient) {
  if ((client.account?.players?.length ?? 0) > 0) {
    client.sendMessage("Selector:Emit:CharacterPlay", { charSlot: 0 });
    return;
  }

  client.sendMessage("Selector:Emit:CharacterCreate", {
    slot: 0,
    name: "Botcharacter",
    gender: "male",
    allegiance: "Townsfolk",
    baseclass: "Traveller",
    weapons: "Axes",
  });
}
