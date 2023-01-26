import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
const packageDefinition = protoLoader.loadSync('./proto/tanqueMiddleware.proto', {});
const tanqueMiddlewarePackage = grpc.loadPackageDefinition(packageDefinition).tanqueMiddlewarePackage;

const client = new tanqueMiddlewarePackage.Tanque('localhost:50051', grpc.credentials.createInsecure());

client.createTanque({ 'id': -1, 'tanque': 'Cracking the Interview' }, (err, response) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`From server`, JSON.stringify(response));
	}
});

client.readTanque({ 'id': 1 }, (err, response) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`From server`, JSON.stringify(response));
	}
});

client.readTanques(null, (err, response) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`From server`, JSON.stringify(response));
	}
});