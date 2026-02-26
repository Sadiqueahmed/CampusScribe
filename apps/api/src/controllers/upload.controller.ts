import { Request, Response } from 'express';
import { uploadService } from '../services/upload.service';

export const uploadController = {
    // Get presigned URL for file upload
    getPresignedUrl: async (req: Request, res: Response) => {
        try {
            const { fileName, fileType, folder } = req.body;
            
            if (!fileName || !fileType || !folder) {
                return res.status(400).json({ 
                    error: 'fileName, fileType, and folder are required' 
                });
            }

            const result = await uploadService.getPresignedUploadUrl(
                fileName, 
                fileType, 
                folder
            );

            res.json(result);
        } catch (error) {
            console.error('Error generating presigned URL:', error);
            res.status(500).json({ error: 'Failed to generate upload URL' });
        }
    },

    // Complete upload and save to database
    completeUpload: async (req: Request, res: Response) => {
        try {
            const { fileUrl, fileName, fileType, fileSize, noteId, type } = req.body;
            
            // Here you would typically save the file metadata to your database
            // For now, we'll just return success
            
            res.json({ 
                success: true, 
                message: 'Upload completed successfully',
                fileUrl 
            });
        } catch (error) {
            console.error('Error completing upload:', error);
            res.status(500).json({ error: 'Failed to complete upload' });
        }
    },

    // Delete file
    deleteFile: async (req: Request, res: Response) => {
        try {
            const { fileUrl } = req.body;
            
            if (!fileUrl) {
                return res.status(400).json({ error: 'fileUrl is required' });
            }

            const key = uploadService.extractKeyFromUrl(fileUrl);
            if (!key) {
                return res.status(400).json({ error: 'Invalid file URL' });
            }

            await uploadService.deleteFile(key);
            
            res.json({ success: true, message: 'File deleted successfully' });
        } catch (error) {
            console.error('Error deleting file:', error);
            res.status(500).json({ error: 'Failed to delete file' });
        }
    }
};
