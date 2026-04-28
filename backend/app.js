const express=require('express');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send("CareerNode Backend (API) is working!");
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});