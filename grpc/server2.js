import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import mqtt from 'mqtt';
var client = mqtt.connect('mqtt://localhost:1883');
var topic = 'DADOS'
var tanques = [];

client.on('message', (topic, message)=> {
	tanques.push(message);

    message = message.toString();
    console.log(message)
})

client.on('connect', () => {
    client.subscribe(topic);
})

const packageDefinition = protoLoader.loadSync('./proto/tanqueMiddleware.proto', {});
const tanqueMiddlewarePackage = grpc.loadPackageDefinition(packageDefinition).tanqueMiddlewarePackage;

// Create a server
const server = new grpc.Server();

// Add the service
server.addService(tanqueMiddlewarePackage.Tanque.service, {
	'createTanque': createTanque,
	'readTanque': readTanque,
	'readTanques': readTanques,
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
	console.log("Server running at http://127.0.0.1:50051");
	server.start();
}); // our sever is insecure, no ssl configuration




function createTanque(call, callback) {
	const tanque = call.request.tanque;
	const tanqueObject = {
		'id': tanques.length + 1,
		'tanque': tanque,
	};
	tanques.push(tanqueObject);
	callback(null, tanqueObject);
}

function readTanque(call, callback) {
	const id = call.request.id;
	const tanque = tanques.find((tanque) => tanque.id === id);
	callback(null, tanque);
}

function readTanques(call, callback) {
	callback(null, { tanques: tanques });
}