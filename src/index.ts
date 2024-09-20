import { createClient, createOrPlay, doAuth, play } from "@helpers";
import { ClientState, IClient } from "@interfaces";

import * as handlers from "@handlers";

const argv = require("minimist")(process.argv.slice(2));

const clients = argv.clients ?? 1;
const isProd = argv.prod ?? false;
const clientPassword = argv.clientPassword ?? "thisisasecurepasswordofsorts";
const isRegister = argv.register ?? false;

const args = {
  clients,
  isProd,
  clientPassword,
  isRegister,
};

const allClients = Array(clients)
  .fill(0)
  .map((_, i) => createClient(i, args));

allClients.forEach((client) => {
  Object.values(handlers).forEach((handler) => handler(client));
});

function doLoop(clients: IClient[]) {
  clients.forEach((client) => {
    if (!client.isReady()) return;

    switch (client.state) {
      case ClientState.NotConnected: {
        doAuth(client);
        break;
      }

      case ClientState.InLobby: {
        createOrPlay(client);
        break;
      }

      case ClientState.InGame: {
        play(client);
        break;
      }
    }
  });
}

setInterval(() => {
  doLoop(allClients);
}, 1000);
