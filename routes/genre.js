const express = require('express');
const router = express.Router();
const {createGenre, updateGenre, deleteGenre, getAllGenre, getGenre } = require('../controllers/genre');

router.post('/', createGenre)

router.get('/', getAllGenre)

router.get('/:id', getGenre);

router.put('/:id', updateGenre);

router.delete('/:id', deleteGenre);


module.exports = router