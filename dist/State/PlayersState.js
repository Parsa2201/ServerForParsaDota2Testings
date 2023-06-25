"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersState = void 0;
const Player_1 = require("../Model/Player");
class PlayersState {
    constructor() {
        this.players = [];
    }
    playerConnected(socket) {
        console.log('Player connected: ' + socket.id);
        socket.emit('mySocketId', { id: socket.id });
        socket.emit('getPlayers', this.players);
        socket.broadcast.emit('newPlayer', { id: socket.id });
        this.players.push((0, Player_1.createPlayer)(socket.id, 0, 0));
    }
    // TODO: Define a data object
    playerMoved(socket, data) {
        data.id = socket.id;
        socket.broadcast.emit('playerMoved', data);
        const pIndex = this.players.findIndex(p => p.id === data.id);
        const player = this.players[pIndex];
        this.players[pIndex].x = data.x;
        this.players[pIndex].y = data.y;
        console.log('Player moved </ ID: ' + player.id + ' - x: ' + player.x + ', y: ' + player.y);
    }
    playerDisconnected(socket) {
        socket.broadcast.emit('playerDisconnected', { id: socket.id });
        this.players = this.players.filter(player => player.id != socket.id);
        console.log('Player disconnected: ' + socket.id);
    }
}
exports.PlayersState = PlayersState;
