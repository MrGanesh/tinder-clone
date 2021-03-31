import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Messages from './dbMessage.js'
import Cors from 'cors'
import Pusher from 'pusher'

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = '' //your url

//MIddleware
app.use(express.json());
app.use(Cors());

//pusher
const pusher = new Pusher({
    appId: "", //your appId
    key: "",//your key
    secret: "",//your secret
    cluster: "", //your cluster
    useTLS: true
});


//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

})

//db messages connection
const db = mongoose.connection

db.once("open", () => {
    console.log("DB is connected")

    const msgCollection = db.collection("messageContents")
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change) => {
        console.log("change" + change)

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timeStamp: messageDetails.timeStamp,
                received: messageDetails.received
            })
        }
        else {
            console.log('Error triggering Pusher')
        }
    })

})


//API endpoints
app.get('/', (req, res) => res.status(200).send('HELLO WORLD'));

app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/tinder/card', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});


//login api
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: "Username / Password cannot be blank." })
    }

    Cards.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ message: "Invalid email or password." })
        }

        if (password === savedUser.password) {
            const { _id, name, email, imgUrl } = savedUser
            res.json({ user: { _id, name, email, imgUrl } })
        }
        else {
            return res.status(422).json({ message: "Invalid email or password" })
        }
    }).catch(err => console.log(err))
})

//api for messages
app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(data)
        }
    })
})


app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(`new message created: ${data}`)
        }
    })
})

//listener
app.listen(port, () => console.log(`Listening on loclhost: ${port}`));
