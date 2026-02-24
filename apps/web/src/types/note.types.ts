export interface Note {
    id: string;
    title: string;
    description: string;
    price: number;
    fileUrl: string;
    previewUrl: string;
    sellerId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    seller?: { id: string; name: string; university?: string };
    category?: { id: string; university: string; course: string; subject: string };
}

export type CreateNoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'fileUrl' | 'previewUrl'> & {
    file?: File;
    preview?: File;
};
