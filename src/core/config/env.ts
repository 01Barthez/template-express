import dotenvSafe from 'dotenv-safe';
import env from 'env-var';
dotenvSafe.config();

export const envs = {
	PORT: env.get('PORT').required().asPortNumber(),
	API_PREFIX: env.get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
	NODE_ENV: env.get('NODE_ENV').default('development').asString(),
	DATABASE_URL: env.get('DATABASE_URL').required().asString(),
	RATE_LIMIT_WINDOW_MS: env.get('RATE_LIMIT_WINDOW_MS').default(900000).asInt(),
	RATE_LIMIT_MAX_REQUESTS: env.get('RATE_LIMIT_MAX_REQUESTS').default(100).asInt(),
};
