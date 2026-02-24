import { Note } from '../../../types/note.types';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Tag } from 'lucide-react';

interface NoteCardProps {
    note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-48 w-full bg-brand-50 flex items-center justify-center overflow-hidden">
                {/* Abstract pattern or placeholder for Document cover */}
                <BookOpen className="h-16 w-16 text-brand-200" />
                <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm">
                    ${note.price.toFixed(2)}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
                {note.category && (
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-500">
                        <Tag size={12} />
                        {note.category.course} • {note.category.subject}
                    </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2">
                    {note.title}
                </h3>

                <p className="flex-1 text-sm text-gray-600 line-clamp-2 mb-4">
                    {note.description}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                            {note.seller?.name || 'Anonymous'}
                        </span>
                        {note.seller?.university && (
                            <span className="flex items-center text-xs text-gray-500">
                                <MapPin size={12} className="mr-1" />
                                {note.seller.university}
                            </span>
                        )}
                    </div>

                    <Link
                        to={`/notes/${note.id}`}
                        className="rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50"
                    >
                        Preview
                    </Link>
                </div>
            </div>
        </div>
    );
};
