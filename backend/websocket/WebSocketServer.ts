import * as ws from 'ws';
import * as fs from 'fs';
import * as http from 'http';

import logger from '../logging';
import { StateData } from '../types/dto';
import state from '../state';
import State from "../state";

const log = logger('websocket');

class WebSocketServer {
    server: ws.Server;
    state: State;
    clients: Array<WebSocket> = [];
    exampleClients: Array<WebSocket> = [];
    heartbeatInterval?: NodeJS.Timeout;

    constructor(server: http.Server, state: State) {
      this.server = new ws.Server({ server });
      this.state = state;

      this.sendHeartbeat = this.sendHeartbeat.bind(this);

      // Event listeners
      this.server.on('connection', (socket: WebSocket, request) => this.handleConnection(socket, request));
      state.on('stateUpdate', (newState: StateData) => this.updateState(newState));
    }

    startHeartbeat(): void {
      this.heartbeatInterval = setInterval(this.sendHeartbeat, 1000);
    }

    handleConnection(socket: WebSocket, request: http.IncomingMessage): void {
      const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
      if (request.url && request.url === '/example') {
        log.debug('New example client connected!');
        this.exampleClients.push(socket);
      } else {
        this.clients.push(socket);
        socket.send(JSON.stringify(this.state.data));
      }
    }

    updateState(newState: StateData): void {
      log.debug(`New state: ${JSON.stringify(newState)}`);

      this.clients.forEach((client: WebSocket) => {
        client.send(JSON.stringify(newState));
      });
    }

    sendHeartbeat(): void {
      const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
      this.clients.forEach((client: WebSocket) => {
        client.send(JSON.stringify({ heartbeat: true }));
      });

      const exampleData = fs.readFileSync('./example.json', 'utf8');
      this.exampleClients.forEach((client: WebSocket) => {
        client.send(JSON.stringify(JSON.parse(exampleData)));
        client.send(JSON.stringify({ heartbeat: true, config }));
      });
    }
}

export default WebSocketServer;
