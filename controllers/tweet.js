import { validationResult } from 'express-validator'
import { splitMessage } from '../utils/splitMessage.js'

const tweetController = {};

tweetController.get = async (req, res) => {
    return res.status(200).json({
        title: "Welcome to tweeter!",
        error: false,
    });
}

tweetController.add = async (req, res) => {
    const result = validationResult(req);
    if (result.errors.length > 0) {
        return res.status(200).json({
            error: true,
            title: result.errors[0].msg,
            errors: result,
        });
    }

    const message = splitMessage(req.body.tweet)

    return res.status(200).json({
        title: "Your tweet has been sent successfully!",
        error: false,
        data: message
    });
}


export default tweetController;