import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { notesService } from '../../services/notes.service';
import { Note } from '../../types/note.types';
import { NoteCard } from '../../components/notes/NoteCard/NoteCard';
import { Search } from 'lucide-react';

export const Browse = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await notesService.getAllNotes(); // Actually needs to accept query params, we might need to modify notesService
                // Temp patch: filter client side or await API fix
                // In real app, notesService.getAllNotes(queryParams) 

                // Since we didn't add params to notesService previously, let's filter client-side for now, or just pass it to the service if we upgrade `getAllNotes`

                const filteredNotes = search
                    ? data.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.description.toLowerCase().includes(search.toLowerCase()))
                    : data;

                setNotes(filteredNotes);
            } catch (err) {
                setError('Failed to load notes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [search]);

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 text-center sm:text-left">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        {search ? `Search results for "${search}"` : 'Browse all notes'}
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Find the perfect study material to ace your next exam.
                    </p>
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-4 mb-8">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <svg className="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
                        <Search className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No notes found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            We couldn't find any documents matching your criteria. Try adjusting your search.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {notes.map((note) => (
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
