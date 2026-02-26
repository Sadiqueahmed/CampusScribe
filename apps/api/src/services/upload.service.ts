import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

export const uploadService = {
    // Generate presigned URL for file upload
    getPresignedUploadUrl: async (fileName: string, fileType: string, folder: string) => {
        const key = `${folder}/${uuidv4()}-${fileName}`;
        
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: fileType
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5 minutes
        
        return {
            presignedUrl,
            fileUrl: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`,
            key
        };
    },

    // Generate presigned URL for file download/view
    getPresignedDownloadUrl: async (key: string, expiresIn: number = 3600) => {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key
        });

        return await getSignedUrl(s3Client, command, { expiresIn });
    },

    // Delete file from S3
    deleteFile: async (key: string) => {
        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key
        });

        await s3Client.send(command);
        return { success: true };
    },

    // Extract key from S3 URL
    extractKeyFromUrl: (url: string): string | null => {
        try {
            const urlObj = new URL(url);
            // Remove leading slash
            return urlObj.pathname.substring(1);
        } catch {
            return null;
        }
    }
};
