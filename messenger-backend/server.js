
import express from "express";
import mongoose from "mongoose";
import Messages from './dbMessages.js';
import cors from "cors";
import Pusher from "pusher";


const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1793677",
    key: "43e5f12ad03cb99a6676",
    secret: "57decc969c3b9a40690a",
    cluster: "ap2",
    useTLS: true
  });


app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
});
const connection_url = 'mongodb+srv://admin:HelloWorld12345@cluster0.9gn7eil.mongodb.net/messenger-app?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(connection_url);

const db = mongoose.connection;
db.once('open', () => {
    console.log("DB is connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("A change occured",change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
        });
        } else{
            console.log("error triggering Pusher");
        }
    });
});
app.get("/",(req,res) => res.status(200).send("hello world"));

app.get("/messages/sync", async (req, res) => {
    try {
        const data = await Messages.find();
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


app.post("/messages/new", async (req, res) => {
    try {
        const dbMessage = req.body;
        const createdMessage = await Messages.create(dbMessage);
        res.status(201).send(createdMessage);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});



app.listen(port, () => console.log(`Listening on localhost: ${port}`));
