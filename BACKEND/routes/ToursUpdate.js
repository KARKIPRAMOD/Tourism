const express = require('express');
const TourUpdate = require('../models/ToursUpdate'); // Import the TourUpdate model
const router = express.Router();

// Get all tour updates
router.get('/', async (req, res) => {
  try {
    const updates = await TourUpdate.find(); // Fetch all tour updates from the database
    res.json(updates); // Return all the updates as a JSON response
  } catch (error) {
    console.error('Error fetching tour updates:', error);
    res.status(500).json({ message: 'Error fetching tour updates.' });
  }
});

// Create a new tour update
router.post('/tour-updates', async (req, res) => {
  const { title, description } = req.body; // Destructure title and description from the request body
  try {
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // Create a new tour update instance
    const newUpdate = new TourUpdate({ title, description });

    // Save it to the database
    await newUpdate.save();
    res.status(201).json(newUpdate); // Return the newly created tour update
  } catch (error) {
    console.error('Error creating tour update:', error);
    res.status(500).json({ message: 'Error creating tour update.' });
  }
});

// Update an existing tour update
router.put('/tour-updates/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the route params
  const { title, description } = req.body; // Get the title and description from the request body
  try {
    const updatedUpdate = await TourUpdate.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Return the updated document
    );

    if (!updatedUpdate) {
      return res.status(404).json({ message: 'Tour update not found.' });
    }

    res.json(updatedUpdate); // Return the updated tour update
  } catch (error) {
    console.error('Error updating tour update:', error);
    res.status(500).json({ message: 'Error updating tour update.' });
  }
});

// Delete a tour update
router.delete('/tour-updates/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the route params
  try {
    const deletedUpdate = await TourUpdate.findByIdAndDelete(id);
    if (!deletedUpdate) {
      return res.status(404).json({ message: 'Tour update not found.' });
    }
    res.status(204).json({ message: 'Tour update deleted successfully.' }); // Success
  } catch (error) {
    console.error('Error deleting tour update:', error);
    res.status(500).json({ message: 'Error deleting tour update.' });
  }
});

module.exports = router;
