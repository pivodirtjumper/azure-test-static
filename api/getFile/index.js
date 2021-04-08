const { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions} = require("@azure/storage-blob");
const connectionString = process.env["BlobConnectionString"];

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const id = req.query.id;

    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionString);
    const container = "rtrdshr-files";
    const containerClient = await blobServiceClient.getContainerClient(container);

    let iterator = containerClient.listBlobsFlat({prefix: id});
    const blob = await iterator.next();
    context.log(blob);

    const name = blob.value.name;
    const niceName = name.split('/')[1];

    const blockBlobClient = containerClient.getBlockBlobClient(name);
    const url = blockBlobClient.url

    const sharedKeyCredential = blobServiceClient.credential;
    const sasToken = generateBlobSASQueryParameters({
        containerName: container,
        blobName: name,
        expiresOn: new Date(new Date().valueOf() + 60 * 60 * 1000),
        permissions: BlobSASPermissions.parse("r")
      }, sharedKeyCredential);
      
    const Sasurl = `${blockBlobClient.url}?${sasToken}`;
    context.log(Sasurl);

    context.res = {
        status: url ? 200 : 404,
        body: JSON.stringify({
            name: niceName,
            url: Sasurl
        })
    };
}