import 'generate-it-logger';
import config from '@/config';
import { Server } from 'socket.io';

import app from './src/app';
import appCli from '@/app.cli';
import packageJson from './package.json';

app().then((io: Server) => {
  const port = appCli().port || config.port;
  io.listen(port);
  console.log(`${packageJson.name} listening on port ${port}`);
}).catch((e) => {
  console.error('Error setting up the socket-io server', e);
});
