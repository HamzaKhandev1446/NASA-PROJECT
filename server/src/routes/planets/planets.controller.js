const planets = require("../../models/planets.model");

function getPlanets(req, res) {
  console.log(planets);
  return res.status(200).json(planets);
}

module.exports = {
  getPlanets,
};
