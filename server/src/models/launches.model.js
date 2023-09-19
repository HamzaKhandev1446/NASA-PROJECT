const launches = require('./launches.mongo')

const launches = new Map();
let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploratoion X',
    rocket: 'Explore IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch);

function getLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(newLaunch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber,
        Object.assign(newLaunch,
            {
                success: true,
                flightNumber: latestFlightNumber,
                customer: ['ZTM', 'NASA'],
                upcoming: true,

            }));
}

function abortLauchById(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

function isLaunchExist(id) {
    return launches.has(id);
}


module.exports = {
    getLaunches,
    addNewLaunch,
    abortLauchById,
    isLaunchExist
};