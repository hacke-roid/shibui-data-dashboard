require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3002;
const secretKey = process.env.JWT_SECRET; // JWT secret key

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/data-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define Mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

 

const configurationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  filters: { type: Object, required: true },
  chartConfig: { type: Object, required: true },
});

const exportedDataSchema = new mongoose.Schema({
  exportName: { type: String, required: true },
  data: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Models
const User = mongoose.model('User', userSchema);
const Configuration = mongoose.model('Configuration', configurationSchema);
const ExportedData = mongoose.model('ExportedData', exportedDataSchema);

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
    req.userId = decoded.userId; // Store userId for future use
    next();
  });
};

// API Endpoints

// User registration
// User registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '30m' });
    res.json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User login and JWT generation
// User login and JWT generation
// User login and JWT generation
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(401).json({ error: 'User account is inactive' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '30m' });

    res.json({ success: true, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Save user configuration (Protected route)
app.post('/save-configuration', authenticateToken, async (req, res) => {
  const { filters, chartConfig } = req.body;

  if (!filters || !chartConfig) {
    return res.status(400).json({ error: 'Filters and chart configuration are required.' });
  }

  try {
    const existingConfig = await Configuration.findOne({ userId: req.userId });
    if (existingConfig) {
      existingConfig.filters = filters;
      existingConfig.chartConfig = chartConfig;
      await existingConfig.save();
      res.json({ message: 'Configuration updated successfully' });
    } else {
      const configuration = new Configuration({ userId: req.userId, filters, chartConfig });
      await configuration.save();
      res.json({ message: 'Configuration saved successfully' });
    }
  } catch (error) {
    console.error('Error saving configuration:', error);
    res.status(500).json({ error: 'Failed to save configuration' });
  }
});

// Load user configuration (Protected route)
app.get('/load-configuration', authenticateToken, async (req, res) => {
  try {
    const configuration = await Configuration.findOne({ userId: req.userId });
    if (configuration) {
      res.json(configuration);
    } else {
      res.status(404).json({ message: 'Configuration not found' });
    }
  } catch (error) {
    console.error('Error loading configuration:', error);
    res.status(500).json({ error: 'Failed to load configuration' });
  }
});

// Handle data export (Protected route)
app.post('/export', authenticateToken, async (req, res) => {
  const { exportName, data } = req.body;

  if (!exportName || !data) {
    return res.status(400).json({ error: 'Export name and data are required.' });
  }

  try {
    const exportedData = new ExportedData({ exportName, data });
    await exportedData.save();
    res.json({ message: 'Data exported successfully' });
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});