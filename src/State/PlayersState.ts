import {createPlayer, Player} from "../Model/Player";
import {Socket} from "socket.io";

export class PlayersState
{
    private players: Player[] = [];

    public playerConnected(socket: Socket): void
    {
        console.log('Player connected: ' + socket.id);
        socket.emit('mySocketId', {id: socket.id});
        socket.emit('getPlayers', this.players);
        socket.broadcast.emit('newPlayer', {id: socket.id});
        this.players.push(createPlayer(socket.id, 0, 0));
    }

    // TODO: Define a data object
    public playerMoved(socket: Socket, data: any): void
    {
        data.id = socket.id;
        socket.broadcast.emit('playerMoved', data);

        const pIndex = this.players.findIndex(p => p.id === data.id);
        const player = this.players[pIndex];
        this.players[pIndex].x = data.x;
        this.players[pIndex].y = data.y;
        console.log('Player moved </ ID: ' + player.id + ' - x: ' + player.x + ', y: ' + player.y);
    }

    public playerDisconnected(socket: Socket): void
    {
        socket.broadcast.emit('playerDisconnected', {id: socket.id});
        this.players = this.players.filter(player => player.id != socket.id);
        console.log('Player disconnected: ' + socket.id);
    }
}