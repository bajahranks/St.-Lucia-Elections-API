const District = require("../models/District");

/**
 * This method is to create the district.
 */
exports.create = (req, res) => {
  // Validation request
  if (!req.body.code || !req.body.name) {
    return res.status(400).send({ message: "Required field can not be empty" });
  }

  // Create a district
  const district = new District({
    code: req.body.code,
    name: req.body.name,
    description: req.body.description
  });

  // Save district to database
  district.save()
    .then(result => {
      res.status(200).send({
        district: result,
        message: result.name + " has been added successfully"
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occurred while creating the district.",
      });
    });
};

/**
 * Find all districts. If a filter is supplied, find the district that satisfy
 * the condition.
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  District.find(condition)
    .sort({ name: 1 }) // Alphabetical order. -1 for descending order.
    .then(result => {
      return res.status(200).send(result);
    }).catch(err => {
      return res.status(500).send({ message: err.message || "Error finding districts" });
    });
};

/**
 * Find one district.
 */
exports.findOne = (req, res) => {
  District.findById(req.params.id)
    .then(result => {
      !result ?
        res.status(404).send({ message: "District with id " + req.params.id + " not found" }) :
        res.status(200).send(result);
    })
    .catch(err => {
      return res.status(500).send({ message: "Error retrieving district with id " + req.params.id });
    });
};

/**
 * Update district with the specified id in the request.
 */
exports.update = (req, res) => {
  if (!req.body.code || !req.body.name) {
    res.status(400).send({ message: "required field name cannot be empty" });
  }

  District.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      !result ?
        res.status(404).send({ message: "no district found" }) :
        res.status(200).send({ message: "Update successful" });
    })
    .catch(err => {
      return res.status(500).send({ message: err.message || "Error while updating." });
    });
};

/**
 * Delete a district with the specified id in the request.
 */
exports.delete = (req, res) => {
  District.findByIdAndRemove(req.params.id)
    .then(result => {
      !result ?
        res.status(404).send({ message: "District not found" }) :
        res.send({ message: "District deleted successfully!" });
    })
    .catch(err => {
      return res.status(500).send({ message: "Could not delete district" });
    });
};

/**
 * Delete all districts.
 */
exports.deleteAll = (req, res) => {
  District.deleteMany({})
    .then(result => {
      res.status(200).send({ message: `${result.deletedCount} districts were deleted successfully!` });
    })
    .catch(err => { res.status(500).send({ message: "Could not delete district" });
    });
};