const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend'));


mongoose.connect('mongodb://localhost:27017/careernode')
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log("DB Error:", err));



    const jobSchema = new mongoose.Schema({
    title: String,
    wage: Number,
    location: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema); 


app.get('/post-job', (req, res) => {
    res.render('index'); 
});

app.get('/dashboard', async (req, res) => {
    try {
        const allJobs = await Job.find().sort({ createdAt: -1 }); 
        res.render('dashboard', { jobs: allJobs }); 
    } catch (error) {
        res.status(500).send("Error fetching jobs");
    }
});
app.post('/api/jobs', async (req, res) => {
    try {
        console.log("Terminal mein data aaya:", req.body); // Ye aapko dikh raha hai

        // 1. Naya job object banayein
        const newJob = new Job({
            title: req.body.title,
            wage: req.body.wage,
            location: req.body.location,
            description: req.body.description
        });

        // 2. ISSE SAVE KARNA ZAROORI HAI
        await newJob.save(); 

        console.log("MongoDB mein save ho gaya!");
        res.redirect('/dashboard'); 
    } catch (error) {
        console.error("Save karne mein error:", error);
        res.status(500).send("Database mein save nahi hua");
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/post-job`));