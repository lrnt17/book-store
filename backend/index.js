import express from "express" 
import mongoose from "mongoose" // mongoose library
import { PORT, mongoDBURL } from "./config.js"
import { Book } from "./model/bookModel.js"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send(`WELCOME to MERN stack tutorial`)
})

app.post('/book', async (req, res) => {
    try {
        // input field validation
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Complete the book details!'
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook)

        return res.status(201).send(book)
    } catch (err) { // catch an error
        console.log(err.message) // log the error on the server console
        res.status(500).send({message: err.message}) // status code and object read error message
    }
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        // if successful, both db and connection is running
        console.log(`App connected to the database`)
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
    
// the second parameter after 'PORT' is called - Callback function