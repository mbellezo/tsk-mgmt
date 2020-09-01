import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  origin: process.env.SERVER_ORIGIN || 3600,
  port: process.env.SERVER_PORT,
}));
