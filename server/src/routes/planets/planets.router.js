const express = require("express");

const { httpGetAllPlanets, httpPostPlanets } = require("./planets.controller");

const planetsRouter = express.Router();

planetsRouter.get("/", httpGetAllPlanets);
planetsRouter.post("/", httpPostPlanets);

module.exports = planetsRouter;
