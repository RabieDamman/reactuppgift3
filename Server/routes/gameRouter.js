const express = require('express');
const router = express.Router();
const Game = require('../models/games');


// Get All
router.get('/', (req, res) => {
    Game.find()
        .then((result) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})
// Get By ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Game.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/title/:title', (req, res) => {
    Game.findOne({ title: req.params.title }, (err, data) => {
        if (err) return res.sendStatus(404);
        if (data == null) return res.sendStatus(404);
        res.json(data);
    });
});

// Add New game
router.post('/', (req, res) => {
    const game = new Game(req.body);
    game
        .save()
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
        });
});
// Update
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Game.findByIdAndUpdate(id, req.body, { new: true }, (err, ev) => {
        // Handle any possible database errors
        if (err) return res.sendStatus(500).send(err);
        return res.send(ev);
    });
});
//Delete game
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Game.findByIdAndDelete(id)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
