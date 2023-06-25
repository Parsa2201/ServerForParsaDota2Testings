import {createServer} from "http";
import {Server, Socket} from "socket.io"
import {PlayersState} from "./State/PlayersState";


const httpServer = createServer();
const io = new Server(httpServer, {});
const playersState = new PlayersState();

io.on('connection', (socket: Socket) =>
{
    playersState.playerConnected(socket);

    // Handle Events
    socket.on('playerMoved', (data) => playersState.playerMoved(socket, data));
    socket.on('disconnect', () => playersState.playerDisconnected(socket));
})

httpServer.listen(8080, () => console.log('Server is now running on 8080'));