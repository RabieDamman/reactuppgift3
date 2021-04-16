const express = require('express');
const router = express.Router();
const Highscore = require('../models/highscores');

// Get All
router.get('/', (req, res) => {
    Highscore.find()
        .sort('field -score')
        .then((result) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});
// Get All
router.get('/high', (req, res) => {
    Highscore.aggregate()
        .sort('field -score')
        .group({
            _id: '$game.id',
            maxValue: { $max: '$score' },
            docs: { $first: '$$ROOT' },
        })
        .then((result) => {
            console.log(result);
            res.send(result);
        });
});

router.get('/highten/:id', (req, res) => {
    const id = req.params.id;
    Highscore.find({ 'game.title': id })
        .sort('field -score')
        .limit(10)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Get By ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Highscore.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Add New highscore
router.post('/', (req, res) => {
    const highscore = new Highscore(req.body);

    highscore
        .save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});
// Update
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Highscore.findByIdAndUpdate(id, req.body, { new: true }, (err, ev) => {
        // Handle any possible database errors
        if (err) return res.sendStatus(500).send(err);
        return res.send(ev);
    });
});
//Delete highscore
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Highscore.findByIdAndDelete(id)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
