const express = require("express")
const bodyParser = require("body-parser")
const uploads = require("./uploads/multer")
const cloudinary = require("./cloudinary")
const fs = require("fs")
const upload = require("./uploads/multer")

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/upload-images',upload.array('image'),async(req,res)=>{
    const uploader = async(path) => await cloudinary.uploads(path,'Images')
    if(req.method === 'POST')
    {
        const urls = []
        const files =  req.files
        for(const file of files){
            const{path}= file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        res.status(200).json({
            message: 'Images Uploaded Succesfully',
            data:urls
        })
    }
    else{
        res.status(405).json({
            message: 'Images not Uploaded Succesfully'
        })
    }
})

app.listen(5000,() => {
    console.log("Server is listening on 5000")
})