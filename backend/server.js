const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());
const adminRoutes = require('./routes/admin');  // Import admin routes

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(adminRoutes);

// Path to the data.json file
const dataFilePath = path.join(__dirname, 'data.json');

// Helper function to read profiles from data.json
const getProfiles = () => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write profiles to data.json
const saveProfiles = (profiles) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(profiles, null, 2));
};

// Route to get all profiles
app.get('/profiles', (req, res) => {
  const profiles = getProfiles();

  // Ensure all profiles have imageUrl (fallback if missing)
  const profilesWithImage = profiles.map(profile => ({
    ...profile,
    imageUrl: profile.imageUrl || 'https://via.placeholder.com/100' // Fallback image URL
  }));

  res.json(profilesWithImage);
});

// Route to get a specific profile by ID
app.get('/profiles/:id', (req, res) => {
  const profiles = getProfiles();
  const profileId = req.params.id;
  const profile = profiles.find(p => p.id === profileId);

  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  res.json(profile);
});

// Route to add a new profile
app.post('/profiles', (req, res) => {
  const profiles = getProfiles();

  const newProfile = {
    id: uuidv4(), // UUID for unique IDs
    name: req.body.name,
    age: req.body.age,
    occupation: req.body.occupation,
    address: req.body.address,
    imageUrl: req.body.imageUrl || 'https://via.placeholder.com/100', // Default image if not provided
    linkedIn: req.body.linkedIn,
    instagram: req.body.instagram || '', // Optional field
    interests: req.body.interests
  };

  profiles.push(newProfile);
  saveProfiles(profiles);
  res.json(newProfile);
});

// Route to edit an existing profile
app.put('/profiles/:id', (req, res) => {
  const profiles = getProfiles();
  const profileId = req.params.id;
  const updatedProfile = req.body;

  const profileIndex = profiles.findIndex((p) => p.id === profileId);
  if (profileIndex === -1) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  profiles[profileIndex] = { ...profiles[profileIndex], ...updatedProfile };
  saveProfiles(profiles);
  res.json(profiles[profileIndex]);
});

// Route to delete a profile
app.delete('/profiles/:id', (req, res) => {
  const profiles = getProfiles();
  const profileId = req.params.id;

  const updatedProfiles = profiles.filter((profile) => profile.id !== profileId);
  saveProfiles(updatedProfiles);
  res.json({ message: 'Profile deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
