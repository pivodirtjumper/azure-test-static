var multipart = require("parse-multipart");
const { BlobServiceClient } = require("@azure/storage-blob");
const connectionString = process.env["BlobConnectionString"];
const { v4: uuidv4 } = require('uuid');

async function uploadBlob(file) {
    // create blobserviceclient object that is used to create container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionString);
    // get reference to a container
    const container = "rtrdshr-files";
    const containerClient = await blobServiceClient.getContainerClient(container);
    // create blob name
    const key = uuidv4();
    const blobName = key + '/' + file.filename;
    // get block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(file.data, file.data.length).catch((err) => {return false})
    return (uploadBlobResponse == false) ? false : key;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log(process.env)

    var boundary = multipart.getBoundary(req.headers['content-type']);
    context.log(req.headers['content-type'])
    // get boundary for multipart data 
    var body = req.body;
    // get raw body
    var parts = multipart.Parse(body, boundary);

    var result = await uploadBlob(parts[0])

    context.log(result);

    context.res = {
        status: result ? 200 : 500,
        body: result ? JSON.stringify({fileKey: result}) : ''
    }
}

