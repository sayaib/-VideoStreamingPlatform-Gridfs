
const {consumer} = require("../kafka/kafkaConsumer")

// API endpoint to receive Kafka messages
const getKafkaNotification = async (req, res) => {
  try {
    const message = await new Promise((resolve, reject) => {
      consumer.on('message', function (message) {
        console.log('Message received from Kafka:', message);
        resolve(message);
      });

      // Optionally handle errors
      consumer.on('error', function (error) {
        console.error('Error in Kafka consumer:', error);
        reject(error);
      });
    });

    res.status(200).send(message);
  } catch (error) {
    res.status(500).send('Failed to receive message from Kafka');
  }
};


module.exports={
    getKafkaNotification
}

