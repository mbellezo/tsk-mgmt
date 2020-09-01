import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  expiresIn: process.env.JWT_EXPIRES_IN || 3600,
  secret: process.env.JWT_SECRET,
}));
