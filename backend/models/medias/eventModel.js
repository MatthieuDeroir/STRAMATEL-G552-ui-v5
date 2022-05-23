import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Event = mongoose.model(
    "Event",
    new mongoose.Schema({
        index: Number,
        name: String,
        duration: Number,
        _user: String,
        files: [],

    })
);

module.exports = Event;
