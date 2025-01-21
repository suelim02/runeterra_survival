module.exports = (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // 클라이언트로부터 메시지를 받았을 때 처리
    socket.on('message', (data) => {
        console.log(`Received from client: ${data}`);
        
        // Godot에 응답 전송
        socket.send(`Server received: ${data}`);
    });

    // 연결 해제 처리
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });

    // 필요에 따라 특정 이벤트 생성
    socket.on('custom_event', (payload) => {
        console.log('Custom event received:', payload);
        socket.emit('custom_response', { message: 'Hello from server!' });
    });
};
