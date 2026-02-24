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

    createNote: async (data: CreateNoteInput) => {
        const response = await api.post<{ data: Note }>('/notes', data);
        return response.data;
    },
};
