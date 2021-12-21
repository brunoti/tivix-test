import { app, start } from 'server';
import { getPort } from 'utils/server';

const instance = app();

const main = () =>
  start(instance)
    .then(({ server }) => console.log(`[SERVER] STARTED WITH PORT ${getPort(server)}`))
    .catch(error => console.error(error));

main();

export { main };
