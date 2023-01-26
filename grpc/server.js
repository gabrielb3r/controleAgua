import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
const packageDefinition = protoLoader.loadSync('./proto/tanqueMiddleware.proto', {});
const tanqueMiddlewarePackage = grpc.loadPackageDefinition(packageDefinition).tanqueMiddlewarePackage;

// Create a server
const server = new grpc.Server();

// Add the service
server.addService(tanqueMiddlewarePackage.tanqueMiddleware.service, {
  createTanque: createTanque,
  readTanque: readTanque,
  readTanques: readTanques,
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
	console.log("Server running at http://127.0.0.1:50051");
	server.start();
}); // our sever is insecure, no ssl configuration

// noob functions
function createTanque() {}

function readTanque() {}

function readTanques() {}