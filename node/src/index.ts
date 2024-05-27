import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Task Manager API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
