const express = require('express');
const router = express.Router();
const { upload, uploadVideo, streamVideo, getVideoFileList ,getImageNameByURL} = require('../controllers/videoController');
const {getKafkaNotification} = require("../controllers/videoUploadNotification")

router.post('/upload', upload.single('file'), uploadVideo);
router.get('/stream/:id', streamVideo);
router.get('/listAllUploadedVideo', getVideoFileList);
router.get('/image/:imageName', getImageNameByURL);


router.get('/kafka/messages', getKafkaNotification);


module.exports = router;
