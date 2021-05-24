const Result = require("../models/Result");

/**
 * This method is to create a result.
 */
exports.create = (req, res) => {
  // Validate request
  if (!req.body.year || !req.body.district || !req.body.pollingStation || !req.body.section
      || !req.body.candidate1 || !req.body.candidate1Votes || !req.body.candidate2 || !req.body.candidate2Votes) {
    res.status(400).send({ message: "Required field can not be empty" });
  }

  // Create a result
  const result = new Result({});
  result.year = req.body.year;
  result.district = req.body.district;
  result.pollingStation = req.body.pollingStation;
  result.section = req.body.section;
  result.candidate1 = req.body.candidate1;
  result.candidate1Votes = req.body.candidate1Votes;
  //result.candidate1Party = req.body.candidate1Party;
  result.candidate2 = req.body.candidate2;
  result.candidate2Votes = req.body.candidate2Votes;
  //result.candidate2Party = req.body.candidate2Party;
  result.registeredVoters = req.body.registeredVoters;
  result.votesCast = req.body.votesCast;
  result.rejectedVotes = req.body.rejectedVotes;
  result.comments = req.body.comments;

  if(req.body.candidate3) {
    result.candidate3 = req.body.candidate3;
    result.candidate3Votes = req.body.candidate3Votes;
    //result.candidate3Party = req.body.candidate3Party;
  }

  if(req.body.candidate4) {
    result.candidate4 = req.body.candidate4;
    result.candidate4Votes = req.body.candidate4Votes;
    //result.candidate4Party = req.body.candidate4Party;
  }

  if(req.body.candidate5) {
    result.candidate5 = req.body.candidate5;
    result.candidate5Votes = req.body.candidate5Votes;
    //result.candidate5Party = req.body.candidate5Party;
  }

  if(req.body.candidate6) {
    result.candidate6 = req.body.candidate6;
    result.candidate6Votes = req.body.candidate6Votes;
    //result.candidate5Party = req.body.candidate5Party;
  }

  // Save result to database
  result.save()
    .then(result => {
      res.status(200).send({
        result: result,
        message: "result has been added successfully"
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while creating the result" });
    });
};

/**
 * Find all results. If a filter is supplied, find the results that satisfy
 * the condition.
 */
exports.findAll = (req, res) => {
  const year = req.query.year;
  const condition = year ? { year: { $regex: new RegExp(year), $options: "i" } } : {};

  Result.find(condition)
    .sort({ year: -1 }) // Alphabetical order. -1 for descending order.
    .populate('district')
    .populate('pollingStation')
    .populate('section')
    .populate('candidate1')
    //.populate('candidate1Party')
    .populate('candidate2')
    //.populate('candidate2Party')
    .populate('candidate3')
    //.populate('candidate3Party')
    .populate('candidate4')
    //.populate('candidate4Party')
    .populate('candidate5')
    //.populate('candidate5Party')
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error finding result" });
    });
};

/**
 * Find one result.
 */
exports.findOne = (req, res) => {
  Result.findById(req.params.id)
    .populate('district')
    .populate('pollingStation')
    .populate('section')
    .populate('candidate1')
    //.populate('candidate1Party')
    .populate('candidate2')
    //.populate('candidate2Party')
    .populate('candidate3')
    //.populate('candidate3Party')
    .populate('candidate4')
    //.populate('candidate4Party')
    .populate('candidate5')
    //.populate('candidate5Party')
    .then(result => {
      !result ?
        res.status(404).send({ message: "result with id " + req.params.id + " not found" }) :
        res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving result with id " + req.params.id });
    });
};

/**
 * Update result with the specified id in the request.
 */
exports.update = (req, res) => {
  if (!req.body.year || !req.body.district || !req.body.pollingStation || !req.body.section
    || !req.body.candidate1 || !req.body.candidate1Votes || !req.body.candidate2 || !req.body.candidate2Votes) {
    res.status(400).send({ message: "required fields cannot be empty" });
  }
  if (req.body.candidate3 === '') {
    req.body.candidate3 = undefined;
  }
  if (req.body.candidate4 === '') {
    req.body.candidate4 = undefined;
  }
  if (req.body.candidate5 === '') {
    req.body.candidate5 = undefined;
  }
  if (req.body.candidate6 === '') {
    req.body.candidate6 = undefined;
  }

  Result.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      !result ?
        res.status(404).send({ message: "no results found" }) :
        res.status(200).send({ message: "Update successful" });
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).send({ message: err.message || "Error while updating." });
    });
};

/**
 * Delete a result with the specified id in the request.
 */
exports.delete = (req, res) => {
  Result.findByIdAndRemove(req.params.id)
    .then(result => {
      !result ?
        res.status(404).send({ message: "result not found" }) :
        res.send({ message: "result deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete result" });
    });
};

/**
 * Delete all results.
 */
exports.deleteAll = (req, res) => {
  Result.deleteMany({})
    .then(result => {
      res.status(200).send({ message: `${result.deletedCount} results were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete result" });
    });
};