export interface Note {
    id: string;
    title: string;
    description: string;
    price: number;
    fileUrl: string;
    previewUrl?: string;
    fileType?: string;
    fileSize?: number;
    pageCount?: number;
    sellerId: string;
    categoryId: string;
    isApproved?: boolean;
    isFeatured?: boolean;
    viewCount?: number;
    purchaseCount?: number;
    createdAt: string;
    updatedAt: string;
    seller?: { id: string; name: string; university?: string; avatar?: string };
    category?: { id: string; university: string; course: string; subject: string };
    tags?: string[];
}

export type CreateNoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'fileUrl' | 'previewUrl'> & {
    file?: File;
    preview?: File;
};
