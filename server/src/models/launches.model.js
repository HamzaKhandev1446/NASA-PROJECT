const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploratoion X",
  rocket: "Explore IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunches(launch);

async function getLaunches() {
  return launchesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestflightNumnber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    customers: ["ZTM", "NASA"],
    upcoming: true,
    flightNumber: newFlightNumber,
  });

  await saveLaunches(newLaunch);
}

async function getLatestflightNumnber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function saveLaunches(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function abortLauchById(id) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: id,
    },
    { upcoming: false, success: false }
  );

  return aborted.modifiedCount === 1;
}

async function isLaunchExist(id) {
  return await launchesDatabase.findOne({
    flightNumber: id,
  });
}

module.exports = {
  getLaunches,
  scheduleNewLaunch,
  abortLauchById,
  isLaunchExist,
};
