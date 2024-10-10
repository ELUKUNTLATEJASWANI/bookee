// backend/server.js
const express = require('express');
const cors = require('cors');
const shiftsRoutes = require('./routes/shifts');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Use the shifts route
app.use('/api', shiftsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
