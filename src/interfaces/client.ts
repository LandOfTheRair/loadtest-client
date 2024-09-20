import WebSocket from "ws";

export interface IClient {
  id: number;
  ws: WebSocket;
  argv: Record<string, any>;
  state: ClientState;

  account: any;

  isReady: () => boolean;
  addMessageHandler(type: string, handler: (message: any) => void): void;
  addActionHandler(action: string, handler: (message: any) => void): void;
  sendMessage(event: string, json: any): void;
}

export enum ClientState {
  NotConnected,
  InLobby,
  InGame,
}
