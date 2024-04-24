import { useCallback, useRef, useState } from 'react';
import io from 'socket.io-client';
import { UserData } from '../../providers/AuthContextProvider';

const BASE_URL = process.env.REACT_APP_SOCKET_URL || "localhost:5000";

const useSocket = () => {
    // socket state
    const [socket, setSocket] = useState(io(BASE_URL, {autoConnect: false}));
    // socket clients room number
    const [roomClientNumber, setRoomClientNumber] = useState(0);
    // SocketIO roomName
    const [room, setRoom] = useState("");
    const roomRef = useRef(room);

    const initiateSocket = useCallback((_room: UserData, callback: any) => {
        //console.log(`Connecting socket...`);
        if (socket && _room) {
            socket.on("connect", () => {
                //console.log('Websocket connected as ' + socket.id);
                localStorage.setItem("socket-io-user", socket.id || "");
                //console.log('room: ' + room);
                setRoom(_room.email);
                socket.on('message', (msg: string) => {
                    //console.log('Websocket event received!');
                    if (callback)
                        return callback(JSON.parse(msg));
                });
                socket.on('roomUpdate', (data) => {
                    setRoomClientNumber(data?.count);
                  });
            });
            
            socket.on("disconnect", () => {
                //console.log('Websocket disconnected');
                localStorage.removeItem("socket-io-user");
            });
            if(!socket.connected){
                socket.connect();
                socket.emit('enter_room', JSON.stringify({ id: _room.email }));
            }
        }
    }, [socket, room]); // Include room in the dependency array

    const disconnectSocket = useCallback((roomRef : String = "") => {
        if (socket) {
            let roomToLeave = roomRef.length > 0 ? roomRef : room;
            console.log('exiting room: ' + roomToLeave);
            socket.emit('exit_room', JSON.stringify({ id: roomToLeave }));
            console.log('Disconnecting socket...');
            socket.disconnect();
        }
    }, [socket, room]);
    
    const sendMessage = useCallback((message: String) => {
        if (socket && socket.connected && room.length > 0) {
            socket.emit('send_message', JSON.stringify({ data: message, id: room }));
            //console.log('Message sent: ' + message);
        }
    }, [socket, socket.connected, room]); // Include room in the dependency array

    return {
        isSocketConected: socket.connected,
        initiateSocket,
        disconnectSocket,
        sendMessage,
        roomRef,
        room,
        roomClientNumber
    }
}

export default useSocket;
