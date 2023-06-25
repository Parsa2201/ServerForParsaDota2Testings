"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const PlayersState_1 = require("./State/PlayersState");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {});
const playersState = new PlayersState_1.PlayersState();
io.on('connection', (socket) => {
    playersState.playerConnected(socket);
    // Handle Events
    socket.on('playerMoved', (data) => playersState.playerMoved(socket, data));
    socket.on('disconnect', () => playersState.playerDisconnected(socket));
});
httpServer.listen(8080, () => console.log('Server is now running on 8080'));
