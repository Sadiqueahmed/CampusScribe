import { Note } from '../../../types/note.types';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Tag, ShoppingCart } from 'lucide-react';

interface NoteCardProps {
    note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl relative">
            <div className="absolute top-4 left-4 z-10 rounded-md bg-green-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                -20%
            </div>

            <div className="relative h-48 w-full bg-brand-50 flex items-center justify-center overflow-hidden">
                {/* Abstract pattern or placeholder for Document cover */}
                <BookOpen className="h-16 w-16 text-brand-200 group-hover:scale-110 transition-transform duration-300" />
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

                <div className="mt-auto flex flex-col gap-4 border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black text-gray-900">
                                    ₹{note.price.toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    ₹{(note.price * 1.25).toFixed(2)}
                                </span>
                            </div>
                            <span className="text-xs text-green-600 font-semibold gap-1 flex items-center mt-0.5">
                                <MapPin size={10} /> {note.seller?.university || 'Global'}
                            </span>
                        </div>
                    </div>

                    <Link
                        to={`/notes/₹{note.id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-500/20 transition-all hover:bg-brand-600 hover:shadow-brand-500/40 active:scale-95"
                    >
                        <ShoppingCart size={16} />
                        Buy Now
                    </Link>
                </div>
            </div>
        </div>
    );
};
