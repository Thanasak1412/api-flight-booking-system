// environment

// APP
const API_PORT = process.env.API_PORT || 3001;
const API_VERSION = process.env.API_VERSION || '/v1';
const BASE_API = String(`${process.env.API_PREFIX}${API_VERSION}`);

// JWT
const JWT_SECRET = process.env.JWT_SECRET ?? '';

// DB
const DB_TYPE = process.env.DB_TYPE;
const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const RAILWAY_PROXY = process.env.RAILWAY_PROXY;
const MONGOPORT = process.env.MONGOPORT;

const MONGO_URL = String(
  `${DB_TYPE}://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${RAILWAY_PROXY}:${MONGOPORT}`
);

export { API_PORT, API_VERSION, BASE_API, JWT_SECRET, MONGO_URL };
