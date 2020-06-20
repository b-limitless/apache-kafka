import { Kafka } from 'kafkajs';
import Chance from 'chance';
const chance = new Chance();

const kafka = new Kafka({
	clientId: 'my-prducer',
	brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094']
});

const producer = kafka.producer();
const topic = 'animals';

const produceMessage = async() => {
	const value = chance.animal();
	console.log(value);

	try{
		await producer.send({
			topic,
			messages:[
             {value}
			]
		})
	} catch(error) {
		console.log(error);
	}
}

const run = async() => {
	// Producing 
	await producer.connect();
	setInterval(produceMessage, 1000);
}

run().catch(console.error);