import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    Save, 
    Trash2, 
    Upload,
    FileText,
    DollarSign,
    Tag,
    AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { notesService } from '../../services/notes.service';
import { Note } from '../../types/note.types';

export function EditNote() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: '',
        tags: [] as string[],
        newTag: ''
    });

    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        if (id) {
            fetchNote();
            fetchCategories();
        }
    }, [id]);

    const fetchNote = async () => {
        try {
            setLoading(true);
            const noteData = await notesService.getNoteById(id!);
            setNote(noteData);
            
            // Check if user is the seller
            if (user?.id && noteData.sellerId !== user.id) {
                setError('You do not have permission to edit this note');
                return;
            }

            setFormData({
                title: noteData.title,
                description: noteData.description,
                price: noteData.price.toString(),
                categoryId: noteData.categoryId,
                tags: noteData.tags || [],
                newTag: ''
            });
        } catch (err) {
            setError('Failed to load note');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const cats = await notesService.getCategories();
            setCategories(cats);
        } catch (err) {
            console.error('Failed to load categories:', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            await notesService.updateNote(id!, {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                categoryId: formData.categoryId,
                tags: formData.tags
            });

            setSuccess('Note updated successfully!');
            setTimeout(() => {
                navigate(`/notes/${id}`);
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to update note');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await notesService.deleteNote(id!);
            navigate('/seller/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to delete note');
            setShowDeleteConfirm(false);
        }
    };

    const addTag = () => {
        if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, formData.newTag.trim()],
                newTag: ''
            });
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    if (error && !note) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Link 
                        to="/seller/dashboard"
                        className="text-brand-500 hover:text-brand-600 font-medium"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link 
                            to={`/notes/${id}`}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Edit Note</h1>
                            <p className="text-gray-600">Update your note details</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </button>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                        {success}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            placeholder="Enter note title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            placeholder="Describe what your note covers..."
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price ($) *
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                step="0.01"
                                min="0.99"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                placeholder="9.99"
                                required
                            />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            You receive 85% after 15% platform fee
                        </p>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <select
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.university} - {cat.course} - {cat.subject}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={formData.newTag}
                                onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                placeholder="Add a tag and press Enter"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <Tag className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                                <span 
                                    key={tag}
                                    className="inline-flex items-center px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-2 text-brand-500 hover:text-brand-700"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* File Info */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <FileText className="w-8 h-8 text-brand-500 mr-3" />
                            <div>
                                <p className="font-medium text-gray-900">Current File</p>
                                <p className="text-sm text-gray-500">
                                    {note?.fileUrl ? 'File uploaded' : 'No file'}
                                </p>
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            To replace the file, delete this note and create a new one.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <Link
                            to={`/notes/${id}`}
                            className="text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Delete Note?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            This action cannot be undone. This will permanently delete your note and remove it from the marketplace.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
