export const getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'CampusHub AI Backend API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
