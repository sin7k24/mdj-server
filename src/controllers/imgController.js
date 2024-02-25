const path = require("path");

// Parse multipart/form-data.
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Save to img directory.
        cb(null, "img");
    },
    filename: function (req, file, cb) {
        // Uploaded filename is upload_file_{Date}.orgext.
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});
var upload = multer({ storage: storage }).single("upload_file");

async function post(req, res, next) {
    console.log("imgController#post called.");
    upload(req, res, function (err) {
        if(err) {
            return res.send("Error uploading file.");
        }
        res.send(req.file.path);
    });
}

module.exports = {
    post,
};
