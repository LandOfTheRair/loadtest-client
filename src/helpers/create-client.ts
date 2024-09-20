import { ClientState, IClient } from "@interfaces";
import { WebSocket } from "ws";

const urls = {
  dev: "ws://127.0.0.1:6975/",
  prod: "wss://game.server.rair.land/",
};

export function createClient(id: number, argv: Record<string, any>): IClient {
  const url = urls[argv.isProd ? "prod" : "dev"];

  const ws = new WebSocket(url);

  let isReady = false;

  const messageHandlers: Array<{
    type: string;
    handler: (message: any) => void;
  }> = [];

  const actionHandlers: Array<{
    action: string;
    handler: (message: any) => void;
  }> = [];

  function addMessageHandler(
    type: string,
    handler: (message: any) => void
  ): void {
    messageHandlers.push({ type, handler });
  }

  function addActionHandler(
    action: string,
    handler: (message: any) => void
  ): void {
    actionHandlers.push({ action, handler });
  }

  function sendMessage(event: string, message: any): void {
    message.type = event;

    console.log(`[Send:${id}]`, JSON.stringify(message));
    ws.send(JSON.stringify(message));
  }

  function recvMessage(message: any): void {
    if (message.type) {
      messageHandlers.forEach((val) => {
        if (message.type !== val.type) return;
        val.handler(message);
      });
    }

    if (message.action) {
      actionHandlers.forEach((val) => {
        if (message.type !== val.action) return;
        val.handler(message);
      });
    }
  }

  ws.on("error", console.error);

  ws.on("open", () => {
    console.log(`[Conn:${id}]`, `Connected!`);
    isReady = true;
  });

  ws.on("message", (d) => {
    console.log(`[Recv:${id}]`, d.toString());
    recvMessage(JSON.parse(d.toString()));
  });

  return {
    id,
    ws,
    argv,
    state: ClientState.NotConnected,
    account: undefined,
    isReady: () => isReady,
    addMessageHandler,
    addActionHandler,
    sendMessage,
  };
}
