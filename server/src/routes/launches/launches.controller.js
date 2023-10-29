const {
  getLaunches,
  scheduleNewLaunch,
  abortLauchById,
  isLaunchExist,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getLaunches());
}

async function httpAddnewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.launchDate ||
    !launch.mission ||
    !launch.rocket ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Launch Date",
    });
  }
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const id = Number(req.params.id);

  const existLaunch= await isLaunchExist(id)

  if (!existLaunch) {
    // if launch does not exist
    return res.status(400).json({
      error: "Launch does not exist",
    });
  }
  const aborted = await abortLauchById(id);
  if(!aborted){
    return res.status(400).json({
      error: 'Launch not aborted'
    })
  }

  return res.status(200).json({
    ok: true
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddnewLaunch,
  httpAbortLaunch,
};
