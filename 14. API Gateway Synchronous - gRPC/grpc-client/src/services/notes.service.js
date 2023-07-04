const grpc = require('@grpc/grpc-js');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, '..', 'protos', './notes.proto');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    default: true,
    oneofs: true
};

const notesPackageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const notesProto = grpc.loadPackageDefinition(notesPackageDefinition);

const notesStub = new notesProto.NotesService(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure()
);

class NotesStubService {
    constructor() {
        this.getNotesPaginated = this.getNotesPaginated.bind(this);
        this.getNoteById = this.getNoteById.bind(this);
    }

    getNotesPaginated(page, limit) {
        /* 
        * RPC to notes stub
        * which will use HTTP/2 and protobuf internally to transfer data
        */
        return new Promise((resolve, reject) => {
            notesStub.getNotesPaginated({ page, limit }, (err, notes) => {
                if (err) {
                    return reject(err);
                }

                return resolve(notes);
            });
        });
    }

    getNoteById(id) {
        return new Promise((resolve, reject) => {
            notesStub.getNoteById({ id }, (err, note) => {
                if (err) {
                    return reject(err);
                }

                return resolve(note);
            });
        });
    }
}

module.exports = new NotesStubService();
