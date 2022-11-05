import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {  

    this.socket = io('wss://localhost:3000');
    
    this.socket.emit('my message', 'Hello there from Vue.');
    
  }
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }
}

export default new SocketioService();