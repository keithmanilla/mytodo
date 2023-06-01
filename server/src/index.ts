import express from 'express';
import cors from "cors";

/**
 * Initializations.
 */
const app = express();
const port = 8000;

// TODO: Connect to DB (MongoDB)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup CORS.
app.use(
	cors({
		credentials: true,
		origin: [
			"http://localhost:3000"
		],
		methods: "GET, POST, PUT, DELETE",
	})
);


// TODO: Import Routes.

app.get('/', (req, res) => {
    res.send('TODO API IS RUNNING!');
});

// Define the Express.js server
app.listen(port, () => {
	console.log(`MY TODO server started at http://localhost:${port}`);
});