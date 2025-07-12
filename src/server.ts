import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { envs } from './core/config/env';
import { setupSwagger } from './swagger';
import itemsRoutes from './routes/items/items.route';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(
	rateLimit({
		max: envs.RATE_LIMIT_MAX_REQUESTS,
		windowMs: envs.RATE_LIMIT_WINDOW_MS,
		message: 'too request from this IP Address '
	})
);

app.use(morgan('combined'));

const baseURL = envs.API_PREFIX;

// Routes
app.use(baseURL, itemsRoutes);


setupSwagger(app);

export default app;
