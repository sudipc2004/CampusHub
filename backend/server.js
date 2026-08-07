import express from 'express';
import cors from 'cors';
import { config } from './src/config/index.js';
import healthRoutes from './src/routes/healthRoutes.js';
import doubtSolverRoutes from './src/routes/doubtSolverRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(express.json());

// Routes
app.use('/api', healthRoutes);
app.use('/api/doubt-solver', doubtSolverRoutes);

// Error Handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 CampusHub Backend API server running on port ${config.port} [${config.env}]`);
});

export default app;
