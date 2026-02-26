import { api } from './api';
import type { Note, CreateNoteInput } from '../types/note.types';

export const notesService = {
    getAllNotes: async () => {
        const response = await api.get<{ data: Note[] }>('/notes');
        return response.data.data;
    },

    getNoteById: async (id: string) => {
        const response = await api.get<{ data: Note }>(`/notes/${id}`);
        return response.data.data;
    },

    createNote: async (data: Partial<CreateNoteInput>) => {
        const response = await api.post<{ data: Note }>('/notes', data);
        return response.data.data;
    },

    uploadNoteFile: async (noteId: string, formData: FormData, onProgress?: (progress: number) => void) => {
        const response = await api.post<{ data: { fileUrl: string } }>(`/notes/${noteId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(progress);
                }
            },
        });
        return response.data.data;
    },

    addTags: async (noteId: string, tags: string[]) => {
        const response = await api.post<{ data: Note }>(`/notes/${noteId}/tags`, { tags });
        return response.data.data;
    },

    getCategories: async () => {
        const response = await api.get<{ data: any[] }>('/notes/categories');
        return response.data.data;
    },

    getTrendingNotes: async () => {
        const response = await api.get<{ data: Note[] }>('/notes/trending');
        return response.data.data;
    },

    getFeaturedNotes: async () => {
        const response = await api.get<{ data: Note[] }>('/notes/featured');
        return response.data.data;
    },

    searchNotes: async (query: string, filters?: any) => {
        const response = await api.get<{ data: Note[] }>('/notes/search', {
            params: { q: query, ...filters },
        });
        return response.data.data;
    },

    getNotesBySeller: async (sellerId: string) => {
        const response = await api.get<{ data: { notes: Note[] } }>(`/notes/seller/${sellerId}`);
        return response.data;
    },

    updateNote: async (id: string, data: Partial<CreateNoteInput>) => {
        const response = await api.put<{ data: Note }>(`/notes/${id}`, data);
        return response.data.data;
    },

    deleteNote: async (id: string) => {
        await api.delete(`/notes/${id}`);
    },
};
