const multer = require('multer');


exports.upload = multer({
    storage : multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, "uploads/")
        },
        filename : (req, file, cb) => {
            cb(null, file.originalname)
;        }
    }),
    fileFilter : (req, file, cb) => {
        const validateFileTypes = ["jpg", "jpeg", "svg"];
        const incomingFileType = file.mimetype.split("/")[1]
        validateFileTypes.includes(incomingFileType) ?
         cb(null, true) :
         cb(new Error("Invalid file type"), false);
    }
}).single("image");