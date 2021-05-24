const Party = require("../models/Party");

/**
 * This method is to create the party.
 */
exports.create = (req, res) => {
  // Validation request
  if (!req.body.name) {
    res.status(400).send({ message: "Required field can not be empty" });
  }

  // Create a party
  const party = new Party({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    description: req.body.description,
    colour: req.body.colour,
  });

  // Save party to database
  party.save()
    .then(result => {
      res.status(200).send({
        party: result,
        message: result.name + " has been added successfully"
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while creating the party" });
    });
};

/**
 * Find all parties. If a filter is supplied, find the parties that satisfy
 * the condition.
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Party.find(condition)
    .sort({ name: 1 }) // Alphabetical order. -1 for descending order.
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => {
      return res.status(500).send({ message: err.message || "Error finding party" });
    });
};

/**
 * Find one party.
 */
exports.findOne = (req, res) => {
  Party.findById(req.params.id)
    .then(result => {
      !result ?
        res.status(404).send({ message: "Party with id " + req.params.id + " not found" }) :
        res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving party with id " + req.params.id });
    });
};

/**
 * Update party with the specified id in the request.
 */
exports.update = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "required field name cannot be empty" });
  }

  Party.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      !result ?
        res.status(404).send({ message: "no parties found" }) :
        res.status(200).send({ message: "Update successful" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error while updating." });
    });
};

/**
 * Delete a party with the specified id in the request.
 */
exports.delete = (req, res) => {
  Party.findByIdAndRemove(req.params.id)
    .then(result => {
      !result ?
        res.status(404).send({ message: "Party not found" }) :
        res.send({ message: "Party deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete party" });
    });
};

/**
 * Delete all parties.
 */
exports.deleteAll = (req, res) => {
  Party.deleteMany({})
    .then(result => {
      res.status(200).send({ message: `${result.deletedCount} parties were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete party" });
    });
};