const express = require('express');
const connectDB = require('./config/db')
const fileUpload = require('express-fileupload')
const app = express();
const path = require('path');
// Connect Database

connectDB();

// init middleware
app.use(express.json({extended: false}));
app.use(fileUpload())


// Define Routes

app.use('/sayfan/users', require('./routes/api/users'));
app.use('/sayfan/auth', require('./routes/api/auth'));
app.use('/sayfan/club', require('./routes/api/club'));
app.use('/sayfan/team', require('./routes/api/team'));
app.use('/sayfan/contactus', require('./routes/api/contactus'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(${__dirname},'..','..','client','build','index.html'))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));