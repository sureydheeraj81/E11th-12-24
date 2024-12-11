const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/uploads/")
    },
    filename: function(req, file, cb){
        cb(null, "profile-pic-"+Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 },
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
})

function checkFileType(file, cb){
    const fileTypes = /jpeg|jpg|png/;

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true)
    }else{
        cb('Error: Upload image only!')
    }
}

module.exports = upload;