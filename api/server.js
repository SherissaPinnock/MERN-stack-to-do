// Import the Express framework for building web applications
const express = require('express');

// Import Mongoose for connecting to MongoDB and managing data schemas
const mongoose = require('mongoose');

// Import CORS middleware to enable Cross-Origin Resource Sharing
const cors = require('cors');

// Create an instance of an Express application
const app = express();

// Use middleware to parse incoming JSON requests and add the data to req.body
app.use(express.json());

// Use CORS middleware to allow requests from different origins
app.use(cors());

// Connect to the MongoDB database named "mern-todo" running on the local machine
mongoose.connect("mongodb://localhost:27017/mern-todo", {
    useNewUrlParser: true,     // Use the new URL parser (recommended)
    useUnifiedTopology: true   // Use the new unified topology engine (recommended)
})
.then(() => console.log("Connected to DB"))  // Log success message if connection is successful
.catch(console.error);                       // Log error if connection fails

// Import the "Todo" model from the models directory
const Todo= require('./models/Todo');

// Define a GET route to fetch all todo items from the database
app.get('/todos', async(req, res)=>{
    const todos = await Todo.find();

    res.json(todos);
})

app.post('/todo/new', (req, res)=>{
    const todo= new Todo({
        text:req.body.text
    });

    todo.save();

    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res)=>{
    const result=await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.get('/todo/complete/:id', async (req, res)=>{
    const todo =await Todo.findById(req.params.id);

    todo.complete= !todo.complete;

    todo.save();

    res.json(todo);
})
// Start the Express server on port 3001 and log a message when it's running
app.listen(3001, () => console.log("Server started on port 3001"));
