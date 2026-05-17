import app from './app';
import env from './config/env';

const startServer = () => {
  const PORT = env.port;

  app.listen(PORT, () => {
    console.log(`Server is running in ${env.nodeEnv} mode on port ${PORT}`);
  });
};

startServer();
