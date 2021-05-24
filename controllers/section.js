const Section = require("../models/Section");
const User = require('../models/User');

/**
 * This method is to create a section.
 */
exports.create = (req, res) => {
  // Validation request
  if (!req.body.name || !req.body.pollingStation) {
    res.status(400).send({ message: "Required field can not be empty" });
  }

  // Create a section
  const section = new Section({
    name: req.body.name,
    pollingStation: req.body.pollingStation // polling_station id
  });

  // Save section to database
  section.save()
    .then(result => {
      res.status(200).send({
        section: result,
        message: "Section has been added successfully"
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while creating the section" });
    });
};

/**
 * Find all sections. If a filter is supplied, find the sections that satisfy
 * the condition.
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  //const user = User.findById({_id: req.user});

  Section.find(condition)
    .sort({ name: 1 }) // Alphabetical order. -1 for descending order.
    .populate('pollingStation')
    .then(result => {
      res.status(200).send({result: result});
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error finding section" });
    });
};

/**
 * Find one section.
 */
exports.findOne = (req, res) => {
  Section.findById(req.params.id).populate('pollingStation')
    .then(result => {
      !result ?
        res.status(404).send({ message: "Section with id " + req.params.id + " not found" }) :
        res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving section with id " + req.params.id });
    });
};

/**
 * Update section with the specified id in the request.
 */
exports.update = (req, res) => {
  if (!req.body.name || !req.body.pollingStation) {
    res.status(400).send({ message: "Required field name cannot be empty" });
  }

  Section.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      !result ?
        res.status(404).send({ message: "No sections found" }) :
        res.status(200).send({ message: "Update successful" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error while updating." });
    });
};

/**
 * Delete a section with the specified id in the request.
 */
exports.delete = (req, res) => {
  Section.findByIdAndRemove(req.params.id)
    .then(result => {
      !result ?
        res.status(404).send({ message: "Section not found" }) :
        res.send({ message: "Section deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete section" });
    });
};

/**
 * Delete all sections.
 */
exports.deleteAll = (req, res) => {
  Section.deleteMany({})
    .then(result => {
      res.status(200).send({ message: `${result.deletedCount} sections were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete section" });
    });
};