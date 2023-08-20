const {getAllPlanets} = require("../../models/planets.model");

function httpGetAllPlanets(req, res) {
  return res.status(200).json(getAllPlanets());
}

function httpPostPlanets(req, res){
  
}

module.exports = {
  httpGetAllPlanets,
  httpPostPlanets
};
