const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

const clients = new Set();

server.on('connection', (ws) => {
    console.log('Client connected');
    clients.add(ws);

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        try {
            const data = JSON.parse(message); // JSON 형식의 메시지를 파싱
            console.log("Parsed data:", data);

            // 클라이언트에 응답 보내기
            ws.send(JSON.stringify({ type: "ACK", message: "Message received!" }));
        } catch (error) {
            console.error("Failed to parse message:", error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);

    });

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});

function sendToAllClients(data) {
    console.log("서버는 데이터 보내려고 함!")
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

module.exports = { sendToAllClients };

console.log('WebSocket server is running on ws://localhost:3000');
