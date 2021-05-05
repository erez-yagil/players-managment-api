const express = require('express');
const connectDB = require('./config/db')
const fileUpload = require('express-fileupload')
const app = express();

// Connect Database

connectDB();

// init middleware
app.use(express.json({extended: false}));
app.use(fileUpload())

app.get('/', (req, res) => res.send('API running'));

// Define Routes

app.use('/sayfan/users', require('./routes/api/users'));
app.use('/sayfan/auth', require('./routes/api/auth'));
app.use('/sayfan/club', require('./routes/api/club'));
app.use('/sayfan/team', require('./routes/api/team'));
app.use('/sayfan/contactus', require('./routes/api/contactus'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));