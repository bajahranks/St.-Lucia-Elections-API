const PollingStation = require("../models/PollingStation");

/**
 * This method is to create a polling station.
 */
exports.create = (req, res) => {
  // Validation request
  if (!req.body.code || !req.body.name || !req.body.district) {
    res.status(400).send({ message: "Required field can not be empty" });
  }

  // Create a polling station
  const pollingStation = new PollingStation({
    code: req.body.code,
    name: req.body.name,
    district: req.body.district // district id
  });

  // Save polling station to database.
  pollingStation.save()
    .then(result => {
      res.status(200).send({
        pollingStation: result,
        message: "Polling station has been added successfully"
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while creating the polling station" });
    });
};

/**
 * Find all polling stations. If a filter is supplied, find the polling stations that satisfy
 * the condition.
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  PollingStation.find(condition)
    .sort({ name: 1 }) // Alphabetical order. -1 for descending order.
    .populate('district')
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error finding polling station" });
    });
};

/**
 * Find one polling station.
 */
exports.findOne = (req, res) => {
  PollingStation.findById(req.params.id).populate('district')
    .then(result => {
      !result ?
        res.status(404).send({ message: "Polling station with id " + req.params.id + " not found" }) :
        res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving polling station with id " + req.params.id });
    });
};

/**
 * Update polling station with the specified id in the request.
 */
exports.update = (req, res) => {
  if (!req.body.code || !req.body.name || !req.body.district) {
    res.status(400).send({ message: "required field name and district cannot be empty" });
  }

  PollingStation.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      !result ?
        res.status(404).send({ message: "no polling stations found" }) :
        res.status(200).send({ message: "Update successful" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error while updating." });
    });
};

/**
 * Delete a polling station with the specified id in the request.
 */
exports.delete = (req, res) => {
  PollingStation.findByIdAndRemove(req.params.id)
    .then(result => {
      !result ?
        res.status(404).send({ message: "Polling station not found" }) :
        res.send({ message: "Polling station deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete polling station" });
    });
};

/**
 * Delete all polling stations.
 */
exports.deleteAll = (req, res) => {
  PollingStation.deleteMany({})
    .then(result => {
      res.status(200).send({ message: `${result.deletedCount} polling stations were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete polling station" });
    });
};