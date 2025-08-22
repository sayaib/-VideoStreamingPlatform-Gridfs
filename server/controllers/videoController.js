const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const GridFsStorage  = require('multer-gridfs-storage');
const multer = require('multer');
const path = require('path');
const { producer} = require('../kafka/kafkaProducer')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');
const fs = require('fs');
// npm install @ffmpeg-installer/ffmpeg @ffprobe-installer/ffprobe

const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


const  generateThumbnail = (videoUrl, outputPath, callback)=> {
    ffmpeg(videoUrl)
        .on('filenames', function(filenames) {
            console.log('Will generate ' + filenames.join(', '));
        })
        .on('end', function() {
            console.log('Screenshots taken');
            callback(null); // Pass null as error for success
        })
        .on('error', function(err) {
            console.error('Error generating thumbnail:', err);
            callback(err); // Pass the error to the callback
        })
        .screenshots({
            count: 1,
            folder: outputPath,
            size: '1920x1080', // Change the size as per your requirement
            filename: '%b.png'
        });
}

// Example usage:

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/mern-video-stream',
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'videos',
      metadata: {
        thumbnail: true, // Flag to indicate this is a thumbnail
      },
    };
  }
});

const upload = multer({ storage });

const uploadVideo = (req, res) => {


  
  const videoUrl = `https://m0dpcmkg-5000.inc1.devtunnels.ms/api/videos/stream/${req.file.id}`;
  const outputPath = './thumbnails';

generateThumbnail(videoUrl, outputPath, function(err) {
    if (err) {
        console.error('Thumbnail generation failed:', err);
    } else {
        console.log('Thumbnail generated successfully!');
    }
});




   // Send Kafka message after video upload
      const kafkaPayload = {
        userId: "sayaib", // Assuming you have user information in req.user
        // videoId: videoId,
        videoName: req.file.originalname,
      };

      producer.send([{ topic: 'video-upload', messages: JSON.stringify(kafkaPayload) }], (err, data) => {
        if (err) {
          console.error('Error sending message to Kafka:', err);
        } else {
          console.log('Message sent to Kafka:', data);
        }
      });
  res.json({ file: req.file });
};


//* -------------------------- stream video file -------------------------- */

const streamVideo = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const gfs = Grid(db, mongoose.mongo);
    gfs.collection('videos');

    const range = req.headers.range;
    if (!range) {
      return res.status(400).send("Requires Range header");
    }

    console.log(range)

    const videoId = req.params.id;
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(videoId) }, (err, file) => {
      if (!file) {
        return res.status(404).send("No file exists");
      }

      const videoSize = file.length;
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + 10 ** 6, videoSize - 1);
      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": file.contentType,
      };

      res.writeHead(206, headers);

      const stream = gfs.createReadStream({ _id: file._id, range: { startPos: start, endPos: end } });
      stream.pipe(res);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
//?* ------------------------- getting all uploaded videos ------------------------- */
const getVideoFileList = async(req, res) => {
  try {

    let data= []
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (err) throw err;

      const db = client.db('mern-video-stream');
      const bucket = new GridFSBucket(db, { bucketName: 'videos' });

      bucket.find().toArray((err, files) => {
        // if (err) throw err;

        console.log('Files in "videos" bucket:');
        // console.log(files);
        res.status(200).json(files)
    
        // Send files as JSON response
      

        client.close();
      });
    });
    
  

  } catch (error) {
    console.log(error);
  }
}


//?* ------------------------- getting thumbnails image ------------------------- */
const getImageNameByURL = (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, '../thumbnails', imageName);
console.log(imagePath)
  // Check if the file exists
  fs.exists(imagePath, (exists) => {
    if (exists) {
      // Send the file as a response
      res.sendFile(imagePath);
    } else {
      console.log(`Image not found: ${imageName}`);
      res.status(404).send('Image not found');
    }
  });
};



module.exports = {
  upload,
  uploadVideo,
  getVideoFileList,
  streamVideo,
  getImageNameByURL
};
