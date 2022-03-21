import SocketClient from './index';

describe('Websocket Client', () => {
  test('should fail to connect with invalid url', () => {
    const url = 'invalid_url';
    const testConnection = () => {
      SocketClient.connect(url);
    };
    expect(testConnection).toThrow(new Error(`The URL '${url}' is invalid.`));
  });

  test('should success to connect with valid url and return socket', () => {
    const socket = SocketClient.connect();
    expect(socket).toBe(SocketClient.socket);
  });
});
