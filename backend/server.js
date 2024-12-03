const express = require("express");
const app = express();
// const {cloudinary} = require('./utils/cloudinary');


app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended:true}));

require('dotenv').config({path:"./utils/.env"});

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.get('/api/images', async (req, res) => {
  const {resources} = await cloudinary.search.expression('folder:uploadss').sort_by('public_id', 'desc').sort_by('public_id','desc').max_results(30).execute();

  const publicIds = resources.map( file => file.public_id);
  res.send(publicIds)
})

app.post('/api/upload',async(req, res) => {
  try {
    const filestr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(filestr, {
      upload_preset: 'First Upload'
    })
    console.log(uploadedResponse)
    res.json({'mesg':"Uploaded succesfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({err:error.message})
    
  }
});

const PORT = process.env.PORT || 3001;


app.listen(3001, ()=> {
    console.log(`listening on port ${PORT}`);
});