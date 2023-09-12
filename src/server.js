const http = require("http");
const { PrismaClient } = require('@prisma/client');

const host = '0.0.0.0';
const port = 8080;

const prisma = new PrismaClient();

const requestListener = async (req, res) => {
    try {
        const [visitCounter] = await prisma.visitCounter.upsert({
            where: { id: 1 },
            create: {
                id: 1,
                value: 1,
            },
            update: {
                value: {
                    increment: 1,
                },
            },
        });

        res.writeHead(200);
        res.end(`Hello World from Node.js HTTP Server\nVisits: ${visitCounter.value}`);
    } catch (error) {
        console.error("Error:", error);
        res.writeHead(500);
        res.end("Internal Server Error");
    }
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});