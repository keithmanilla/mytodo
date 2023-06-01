import express from 'express';
import cors from "cors";
import connect from './utilities/mongodb';
import dbConnect from './utilities/mongodb';

// Import Routes.
import TodoRoute from './routes/todo.routes';

// Initializations.
const app = express();
const port = 8000;

// TODO: Connect to DB (MongoDB)
dbConnect();
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

// Todo Route.
app.use('/api/v1/todos', TodoRoute);

app.get('/', (req, res) => {
    res.send('TODO API IS RUNNING!');
});

// Define the Express.js server
app.listen(port, () => {
	console.log(`MY TODO server started at http://localhost:${port}`);
});