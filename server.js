const express = require('express');
const connectDB = require('./config/db')
const app = express();

// Connect Database

connectDB();

// init middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API running'));

// Define Routes

app.use('/sayfan/users', require('./routes/api/users'));
app.use('/sayfan/profile', require('./routes/api/profile'));
app.use('/sayfan/auth', require('./routes/api/auth'));
app.use('/sayfan/club', require('./routes/api/club'));
app.use('/sayfan/team', require('./routes/api/team'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));