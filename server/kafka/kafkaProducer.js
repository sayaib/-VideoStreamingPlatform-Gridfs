const { KafkaClient, Producer } = require('kafka-node');

// Kafka setup
const kafkaClient = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);

producer.on('ready', () => {
  console.log('Kafka producer is ready');
});

producer.on('error', (err) => {
  console.error('Error initializing Kafka producer:', err);
});


module.exports={
    kafkaClient,producer
}