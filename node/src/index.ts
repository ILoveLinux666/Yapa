import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Database connection
const pool = new Pool({
    user: 'admin',
    host: 'postgres',
    database: 'YAPA',
    password: 'safepassword',
    port: 5432,
});

app.get('/', (req: Request, res: Response) => {
    res.send('YAPA');
});

//GET ALL TASKS
app.get('/tasks', async (req: Request, res: Response) => {
    try {
	const client = await pool.connect();
	const result = await client.query('SELECT * FROM task');
	if (result.rows.length === 0) {
	    res.status(400).send('No tasks found');
	} else {
	    res.status(200).json(result.rows);
	}
    } catch (err) {
	console.log(err);
	res.status(500).send('There is a server error :[ sorry');
    }
});

//GET TASK BY ID
app.get('/task/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
	const client = await pool.connect();
	const result = await client.query('SELECT * FROM task WHERE id = $1', [id]);
    res.status(201).json(result.rows[0]);
    } catch (err) {
	console.log(err);
	res.status(500).send('There is a server error :[ sorry');
    }
});

//CREATE A TASK
app.post('/task_create', async (req: Request, res: Response) => {
    const { header , content , state} = req.body;
    if (!header  || !content || !state) {
        res.status(400).send('Please give all parameters :]');
    } else {
        try {
            const client = await pool.connect();
            const payload = await client.query('INSERT INTO task (header , content , state) VALUES ($1, $2, $3) ', [header , content , state]);
            client.release();
            res.status(201).json(payload.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error 500');
        }
    }
});
//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
