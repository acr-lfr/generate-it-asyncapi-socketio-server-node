// Setup required proc envs
process.env.JWT_ACCESS_SECRET = 'changeme';
process.env.IFRAMELY_API_KEY = '2116949e8728cd74a430b4';
process.env.REDIS_HOST = 'test';
process.env.REDIS_DB = 0;
process.env.REDIS_PW = 'test';

// mongo mem
process.env.MONGOMS_DOWNLOAD_URL = 'https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-4.2.8.tgz';
process.env.MONGOMS_VERSION = '4.2.8';

// Jest global configs
jest.setTimeout(20000); // 20 seconds
