const Candidate = require("../models/Candidate");

/**
 * This method is to create the candidate.
 */
exports.create = (req, res) => {
  // Validation request
  if (!req.body.name || !req.body.party || !req.body.district) {
    res.status(400).send({ message: "Required field can not be empty" });
  }

  // Create a candidate
  const candidate = new Candidate({
    name: req.body.name,
    dob: req.body.dob,
    gender: req.body.gender,
    party: req.body.party, // party id
    district: req.body.district, // district id
    comments: req.body.comments
  });

  // Save candidate to database
  candidate.save()
    .then(result => {
      res.status(200).send({
        message: result.name + " has been added successfully"
      });
    }).catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while creating the candidate" });
    });
};

/**
 * Find all candidates. If a filter is supplied, find the candidates that satisfy
 * the condition.
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Candidate.find(condition)
    .sort({ name: 1 }) // Alphabetical order. -1 for descending order.
    .populate('party').populate('district')
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error finding candidate" });
    });
};

/**
 * Find one candidate.
 */
exports.findOne = (req, res) => {
  Candidate.findById(req.params.id).populate('party').populate('district')
    .then(result => {
      !result ?
        res.status(404).send({ message: "Candidate with id " + req.params.id + " not found" }) :
        res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving candidate with id " + req.params.id });
    });
};

/**
 * Update candidate with the specified id in the request.
 */
exports.update = (req, res) => {
  if (!req.body.name || !req.body.party || !req.body.district) {
    res.status(400).send({ message: "required field name cannot be empty" });
  }

  Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      !result ?
        res.status(404).send({ message: "no candidates found" }) :
        res.status(200).send({ message: "Update successful" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error while updating." });
    });
};

/**
 * Delete a candidate with the specified id in the request.
 */
exports.delete = (req, res) => {
  Candidate.findByIdAndRemove(req.params.id)
    .then(result => {
      !result ?
        res.status(404).send({ message: "Candidate not found" }) :
        res.send({ message: "Candidate deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete candidate" });
    });
};

/**
 * Delete all candidates.
 */
exports.deleteAll = (req, res) => {
  Candidate.deleteMany({})
    .then(result => {
      res.status(200).send({ message: `${result.deletedCount} candidates were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete candidate" });
    });
};