import { createApp } from './app.js';
import { ENV } from './config/env.config.js';

const app = createApp();

app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
    console.log(`🔌 Connected to database via Prisma`);
});