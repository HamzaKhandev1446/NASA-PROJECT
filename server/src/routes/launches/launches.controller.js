const { getLaunches, addNewLaunch, abortLauchById, isLaunchExist } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getLaunches());
}

function httpAddnewLaunch(req, res) {
    const launch = req.body
    launch.launchDate = new Date(launch.launchDate)
    if (!launch.launchDate || !launch.mission
        || !launch.rocket || !launch.target) {

        return res.status(400)
            .json({
                error: 'Missing required launch property'
            })
    }
    if (isNaN(launch.launchDate)) {
        return res.status(400)
            .json({
                error: 'Invalid Launch Date'
            })
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const id = Number(req.params.id);

    if (!isLaunchExist(id)) {
        // if launch does not exist
        return res.status(400).json({
            error: 'Launch does not exist'
        })
    }
    const aborted = abortLauchById(id);
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddnewLaunch,
    httpAbortLaunch
}  