import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Task Manager API');
});

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'YAPA',
    password: 'safepassword',
    port: 5432,
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
