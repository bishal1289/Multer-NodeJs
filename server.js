const express = require('express');
const app = express();
const multer = require('multer')

const myStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,"UploadFiles")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.mimetype.split("/")[1];
        cb(null, `${uniqueSuffix}.` + ext);
    }
})
const filter = (req, file, cb) => {
    let ext = file.mimetype.split("/")[1]
    if (ext == "png" || ext == "jpeg" || ext == "mp4") {
      cb(null, true);
    } else {
      cb(new Error("File not Supported"), false);
    }
}

const upload = multer({
  storage: myStorage,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
  fileFilter: filter,
});

app.use(express.static('.'))
app.use(express.urlencoded({extended:false}))

app.post('/upload', upload.single('profile'),(req, res) => {
    console.log(req.file);
    res.send("File Upload Sucessfully")
})
 


app.listen(3000, (err) => {
    if (!err) {
        console.log("Server started...");
    }
})