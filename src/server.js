const http = require("http");
const { PrismaClient } = require('@prisma/client');

const host = '0.0.0.0';
const port = 8080;

const prisma = new PrismaClient();

const requestListener = async function(req, res) {
    try {
        const existingVisitCounter = await prisma.visitCounter.findUnique({ where: { id: 1 } });
        
        if (!existingVisitCounter) {
            await prisma.visitCounter.create({
                data: {
                    id: 1,
                    value: 1,
                },
            });
            
            res.writeHead(200);
            res.end(`Hello World from Node.js HTTP Server\nVisits: 1`);
        } else {
            const newValue = existingVisitCounter.value + 1;
            
            await prisma.visitCounter.update({
                where: { id: 1 },
                data: { value: newValue },
            });
            
            res.writeHead(200);
            res.end(`Hello World from Node.js HTTP Server\nVisits: ${newValue}`);
        }
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
