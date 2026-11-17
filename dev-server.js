import { createServer } from 'vite';

async function start() {
  const port = parseInt(process.env.PORT || '4000', 10);
  const server = await createServer({
    root: process.cwd(),
    server: {
      port: port,
      host: '0.0.0.0'
    }
  });
  await server.listen();
  server.printUrls();
}

start();
