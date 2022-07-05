import { S3 } from "aws-sdk";
import Upload from "./Upload";
import { resolve } from "path";
import fs from "fs";
import mime from "mime";

export class S3Provider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    async save(file: string): Promise<string> {
        const originalName = resolve(Upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);

        const ContentType = mime.getType(originalName);

        await this.client.putObject({
            Bucket: "techaskme",
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType,
        }).promise();

        return file;
    }
}