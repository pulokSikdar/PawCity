const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});


app.get('*', (req, res) => {
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 
