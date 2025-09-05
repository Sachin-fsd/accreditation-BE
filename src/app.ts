import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import entryRoutes from './routes/entries';
import uploadRoutes from './routes/upload';
import adminRoutes from './routes/admin';

const app = express();

// Middleware to log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    console.log(`➡️  ${req.method} ${req.originalUrl}`);
    // console.log(`Headers:`, req.headers);
    // if (Object.keys(req.body).length) {
    console.log(`Body:`, req.body);
    console.log(`Params:`, req.params);
    // }

    // Hook into response to log when it's finished
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`⬅️  ${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`);
    });

    next();
});

app.use(cors({
    origin: "http://localhost:3000",  // your Next.js app
    credentials: true,                // allow cookies if you use them
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api', entryRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req: Request, res: Response) =>
    res.json({ ok: true, msg: 'Accreditation backend (TS)' })
);

export default app;
