const express = require('express');

// database access using knex
const knex = require('../data/db-config.js');
const router = express.Router();

router.get('/', (req, res) => {
// list of posts 
//selec * from posts

knex.select('*').from('posts').then(posts => {
    res.status(200).json(posts)
})
.catch(err => {
    res.status(500).json({error:"failed to get posts"});
})
});

router.get('/:id', (req, res) => {
    knex.select('*').from('posts').where('id','=', req.params.id).first().then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({error:"failed to get post"});
    })
});

router.post('/', (req, res) => {
    knex.insert(req.body, 'id').into('posts').then(obj => {
        res.status(200).json(obj)
    })
    .catch(err => {
        res.status(500).json({error:"failed to insert post"});
    })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    knex('posts').where({id: id}).update(changes)
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json({error:"failed to update post"});
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    knex('posts').where({id: id}).del()
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json({error:"failed to update post"});
    })
});

module.exports = router;