const multer = require("multer")

//spesify the storage engine 

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})

//file validation

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }
    else{
        //orevent the upload
        cb({message: 'Unsupportted File Format'},false)
    }
}

const upload = multer({
    storage:storage,
    limits:{fileSize:1024*1024},
    fileFilter: fileFilter
})

module.exports = upload;