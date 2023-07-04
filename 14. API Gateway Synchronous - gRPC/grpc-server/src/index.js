const grpc = require('@grpc/grpc-js');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');

const { NotesService } = require('./services');

const PROTO_PATH = path.join(__dirname, 'protos', './notes.proto');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    default: true,
    oneofs: true
};

const notesPackageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const notesProto = grpc.loadPackageDefinition(notesPackageDefinition);

const server = new grpc.Server();

// Define the mapping of the services
server.addService(notesProto.NotesService.service, {
    getNotesPaginated: NotesService.getNotesPaginated,
    getNoteById: NotesService.getNotesById
});

server.bindAsync(
    '127.0.0.1:50051',
    grpc.ServerCredentials.createInsecure(), // For production use SSL certificate
    (err, port) => {
        console.log(`Service listening on port: ${port}`);

        server.start();
    }
);
