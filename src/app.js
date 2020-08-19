const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

const repositories = [];

function findRepository(id){
  return repositories.find(repository => repository.id == id);
}

function validateId(request, response, next){
  const { id } = request.params;

  if (!findRepository(id)){
    return response.status(400).json({error: 'Not found'});
  }

  return next();
};


app.use(express.json());
app.use(cors());
app.use('/repositories/:id', validateId);

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0,
  }

  repositories.push(repository);

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
 
  repository = findRepository(id);
  const likes = repository.likes;

  repository = {
    id,
    title,
    url,
    techs,
    likes,
  };

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositories.splice(repositories[id]);

  return response.status(204).send();
});

app.post("/repositories/:id/like",validateId, (request, response) => {
  const { id } = request.params;

  repository = findRepository(id);
  new_likes = repository.likes + 1;
  repository.likes = new_likes;

  return response.json(repository);
});

module.exports = app;
