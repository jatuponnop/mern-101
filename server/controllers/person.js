const Person = require("../models/Person");
const fs = require("fs");

exports.create = async (req, res, next) => {
  try {
    const { data } = req.body;
    const newData = {
      name: data,
      pic: req.file.filename,
    };
    res.json(await new Person(newData).save());
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Create Person Failed");
  }
};

exports.list = async (req, res, next) => {
  res.send(await Person.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res, next) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });
  res.json(person);
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { data, filename } = req.body;
    var newData = {
      name: data,
    };
    if (typeof req.file !== "undefined") {
      await fs.unlink(`./public/uploads/${filename}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Remove Success");
        }
      });
      newData.pic = req.file.filename;
    }
    res.send(await Person.findOneAndUpdate({ _id: id }, newData));
  } catch (err) {
    console.log(err);
    res.status(400).send("Update Person Failed");
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Person.findOneAndDelete({ _id: req.params.id });
    await fs.unlink(`./public/uploads/${deleted.pic}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Remove Success");
      }
    });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Remove Person Failed");
  }
};
