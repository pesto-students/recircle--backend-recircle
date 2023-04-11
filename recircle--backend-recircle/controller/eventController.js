const express = require('express');
const bodyParser = require('body-parser');
const { Event } = require("../models/User");
const router = express.Router();
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CREATE
const createEvent = async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      await newEvent.save();
      res.status(201).send(newEvent);
    } catch (err) {
      res.status(500).send(err);
    }
  };


// READ ALL
// app.get('/events', async (req, res) => {
    const getAllEvent = async (req, res) => {
    try {
      const events = await Event.find({});
      res.send(events);
    } catch (err) {
      res.status(500).send(err);
    }
  };

// READ ONE
// app.get('/events/:id', async (req, res) => {
    const getEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        res.status(404).send("Event not found");
      } else {
        res.send(event);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };

// UPDATE
const updateEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        res.status(404).send("Event not found");
      } else {
        event.name = req.body.name || event.name;
        event.description = req.body.description || event.description;
        event.address = req.body.address || event.address;
        event.date = req.body.date || event.date;
  
        await event.save();
        res.send(event);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };

// DELETE
// app.delete('/events/:id', async (req, res) => {
    const deleteEvent = async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) {
        res.status(404).send("Event not found");
      } else {
        res.send("Event deleted successfully");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };

  module.exports = {
    createEvent,
    getAllEvent,
    updateEvent,
    deleteEvent
  }

   
