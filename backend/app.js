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
        const { search, location } = req.query; // Browser se search query le rahe hain
        let query = {}; // By default khali, matlab saari jobs

        // Agar user ne Search bar mein kuch likha hai
        if (search) {
            query.title = { $regex: search, $options: 'i' }; // 'i' matlab case-insensitive (chhota-bada letter sab chalega)
        }

        // Agar user ne Location likhi hai
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        const filteredJobs = await Job.find(query).sort({ createdAt: -1 });
        res.render('dashboard', { jobs: filteredJobs });

    } catch (error) {
        console.error(error);
        res.status(500).send("Search error");
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

//jobs delete krne k liye 
app.post('/delete-job/:id', async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send("Delete nahi ho paya");
    }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/post-job`));