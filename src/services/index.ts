import { SERVER_URL } from '../utils';

class Client {
  private static _socket: WebSocket;

  public static set socket(socketConnection: WebSocket) {
    this._socket = socketConnection;
  }

  public static get socket(): WebSocket {
    return this._socket;
  }

  public static connect(url: string = SERVER_URL) {
    if (!Client.socket) {
      Client.socket = new WebSocket(url);
    }

    return Client.socket;
  }
}

export default Client;
