import { api } from './api';

export const uploadService = {
    // Get presigned URL for file upload
    getPresignedUrl: async (fileName: string, fileType: string, folder: string) => {
        const response = await api.post('/upload/presigned-url', {
            fileName,
            fileType,
            folder
        });
        return response.data;
    },

    // Upload file directly to S3 using presigned URL
    uploadToS3: async (presignedUrl: string, file: File, onProgress?: (progress: number) => void) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable && onProgress) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    onProgress(progress);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(new Error('Upload failed'));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Upload failed'));
            });

            xhr.open('PUT', presignedUrl);
            xhr.setRequestHeader('Content-Type', file.type);
            xhr.send(file);
        });
    },

    // Complete upload and save to database
    completeUpload: async (data: {
        fileUrl: string;
        fileName: string;
        fileType: string;
        fileSize: number;
        noteId?: string;
        type: 'note' | 'avatar' | 'preview';
    }) => {
        const response = await api.post('/upload/complete', data);
        return response.data;
    },

    // Delete file from S3
    deleteFile: async (fileUrl: string) => {
        const response = await api.delete('/upload/file', {
            data: { fileUrl }
        });
        return response.data;
    }
};
