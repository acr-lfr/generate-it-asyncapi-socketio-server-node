import dotenv from 'dotenv';
import ConfigHelper from 'openapi-nodegen-config-helper';
import packageJson from '../package.json';

dotenv.config();

/**
 * Add and remove config that you need.
 */
export default {
  // Instance
  env: ConfigHelper.withDefault('ENVIRONMENT', 'production'),
  port: ConfigHelper.withDefault('PORT', 8000),

  // Authentication
  jwtSecret: ConfigHelper.required('JWT_ACCESS_SECRET'),
  apiKey: ConfigHelper.withDefault('API_KEY', false),

  sockets: {
    director: {
      ip: ConfigHelper.withDefault('SOCKETS_DIRECTOR_URL', '127.0.0.1'),
      port: ConfigHelper.withDefault('SOCKETS_DIRECTOR_PORT', 3507),
    }
  },


  // Rabbit MQ
  rabbitMQ: {
    connection: {
      protocol: 'amqp',
      hostname: ConfigHelper.withDefault('RABBITMQ_HOST', 'rabbitmq.orap.tech'),
      port: ConfigHelper.withDefault('RABBITMQ_PORT', 5672),
      username: ConfigHelper.withDefault('RABBITMQ_USER', 'guest'),
      password: ConfigHelper.withDefault('RABBITMQ_PW', 'guest'),
    },
    queue: ConfigHelper.withDefault('RABBITMQ_QUEUE', `q.${packageJson.name}`),
    dleQueue: ConfigHelper.withDefault('RABBITMQ_DLE_QUEUE', 'q.dle_queue'),
    exchange: ConfigHelper.withDefault('RABBITMQ_EXCHANGE', 'orap.exchange'),
    exchangeType: ConfigHelper.withDefault('RABBITMQ_EXCHANGE_TYPE', 'fanout'),
  },

  // Request worker config - allThreadsCount = processes * threadsPerProcess
  requestWorker: {
    processes: Number.parseInt(
      ConfigHelper.withDefault('REQUEST_WORKER_PROCESSES', 1),
      10,
    ),
    threadsPerProcess: Number.parseInt(
      ConfigHelper.withDefault('REQUEST_WORKER_THREADS_PER_PROCESS', 10),
      10,
    ),
    timeoutMs: Number.parseInt(
      ConfigHelper.withDefault('REQUEST_WORKER_TIMEOUT_MS', 300000), // 5 minutes
      10,
    ),
  },
};
