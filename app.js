import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import tweeter from './routes/tweeter.js';

const app = express();

app.use(bodyParser.json({ limit: "500mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 50000 }))

const port = 3000

app.listen(port, () => {
    console.log(`Running app on port ${port}`)
});

app.use('/tweet', tweeter)

export default app