const GenreModel = require('../model/genre-schema');
const validateInputService = require('../services/joi-validation-service')

async function createGenre(req, res) {
  const {error} = validateInputService(req.body);
  if(error) return res.status(400).send(error.details?.[0].message)
  // success create genre
  const genre = {
    name: req.body.name,
    tags: req.body.tags
  }

  try{
    const createGenre = new GenreModel(genre);
    const result = await createGenre.save();
    return res.send(result)
  }catch(err){
    console.log('---', err);
  }
}


async function getAllGenre(req, res,) {
  const pageNumber = req.query.pageNumber ?? 1;
  const pageSize = req.query.pageSize ?? 10;
  const result = await GenreModel.find()
  .sort('name')
  .skip((pageNumber - 1) * pageSize)
  .limit(pageSize);

  return res.send(result)
}

async function getGenre(req, res) {
  // find the genre by id from list
  // if not found retrun 404 error
  const genreId = req.params.id
  if(!genreId){
    return res.status(401).send('Bad request, ID is required')
  }
  const genre = await GenreModel.findById(genreId);
  if(!genre) return res.status(404).send('Genre with the ID is not found');

  return res.send(genre);
};

async function updateGenre(req, res)  {
  const id = req.params.id
  // validate the input
  const {error} = validateInputService(req.body);
  if(error) return res.status(400).send(error.details?.[0].message)
  const updateObj = {
    name: req.body.name,
    tags: req.body.tags
  }
  const genre = await GenreModel.findByIdAndUpdate(id, updateObj, {new: true})
  if(!genre) return res.status(404).send('genre with ID not found');

  res.send(genre);
};

 async function deleteGenre(req, res)  {
  // get the id we want to delete
  const id = req.params.id
  const result = await GenreModel.findByIdAndDelete(id)
  if(!result) return res.status(404).send('genre with ID not found');
  return res.send(result);
};


module.exports = { createGenre, updateGenre, deleteGenre, getAllGenre, getGenre }