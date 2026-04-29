import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors()); 
mongoose.connect('mongodb://localhost:27017/careernode')
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));
const jobSchema = new mongoose.Schema({
  title: String,
  wage: Number,
  location: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);
app.post('/api/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));