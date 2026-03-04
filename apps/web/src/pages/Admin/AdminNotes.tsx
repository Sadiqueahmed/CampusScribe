import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    FileText, 
    Search, 
    Filter,
    CheckCircle,
    XCircle,
    Star,
    Eye,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    AlertCircle
} from 'lucide-react';
import { adminService } from '../../services/admin.service';
import { formatINR } from '../../utils/currency';

interface Note {
    id: string;
    title: string;
    description: string;
    price: number;
    isApproved: boolean;
    isFeatured: boolean;
    createdAt: string;
    seller: {
        id: string;
        name: string;
        email: string;
    };
    category: {
        course: string;
        subject: string;
    };
    purchaseCount: number;
    viewCount: number;
}

export function AdminNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

    useEffect(() => {
        fetchNotes();
    }, [currentPage, statusFilter, searchQuery]);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await adminService.getNotes({
                page: currentPage,
                limit: 20,
                status: statusFilter === 'all' ? undefined : statusFilter
            });
            setNotes(response.data?.notes || []);
            setTotalPages(response.data?.totalPages || 1);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (noteId: string) => {
        try {
            await adminService.approveNote(noteId);
            fetchNotes();
        } catch (error) {
            console.error('Failed to approve note:', error);
        }
    };

    const handleReject = async (noteId: string) => {
        const reason = prompt('Enter rejection reason:');
        if (reason) {
            try {
                await adminService.rejectNote(noteId, reason);
                fetchNotes();
            } catch (error) {
                console.error('Failed to reject note:', error);
            }
        }
    };

    const handleToggleFeature = async (noteId: string, currentFeatured: boolean) => {
        try {
            await adminService.toggleFeatureNote(noteId, !currentFeatured);
            fetchNotes();
        } catch (error) {
            console.error('Failed to toggle feature:', error);
        }
    };

    const toggleNoteSelection = (noteId: string) => {
        setSelectedNotes(prev => 
            prev.includes(noteId) 
                ? prev.filter(id => id !== noteId)
                : [...prev, noteId]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Link to="/admin" className="text-gray-500 hover:text-gray-700">
                            Admin
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">Notes</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
                    <p className="text-gray-600 mt-1">Review and manage platform content</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <p className="text-sm text-gray-500">Total Notes</p>
                        <p className="text-2xl font-bold text-gray-900">{notes.length}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <p className="text-sm text-gray-500">Pending Approval</p>
                        <p className="text-2xl font-bold text-yellow-600">
                            {notes.filter(n => !n.isApproved).length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <p className="text-sm text-gray-500">Featured</p>
                        <p className="text-2xl font-bold text-brand-600">
                            {notes.filter(n => n.isFeatured).length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <p className="text-sm text-gray-500">Total Sales</p>
                        <p className="text-2xl font-bold text-green-600">
                            {notes.reduce((sum, n) => sum + (n.purchaseCount || 0), 0)}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search notes by title or seller..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="featured">Featured</option>
                            </select>
                            <button
                                onClick={fetchNotes}
                                className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                            >
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notes Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto"></div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedNotes.length === notes.length && notes.length > 0}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedNotes(notes.map(n => n.id));
                                                        } else {
                                                            setSelectedNotes([]);
                                                        }
                                                    }}
                                                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Note</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Seller</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Category</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Price</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Stats</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {notes.map((note) => (
                                            <tr key={note.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedNotes.includes(note.id)}
                                                        onChange={() => toggleNoteSelection(note.id)}
                                                        className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <FileText className="w-5 h-5 text-gray-600" />
                                                        </div>
                                                        <div>
                                                            <Link 
                                                                to={`/notes/${note.id}`}
                                                                className="text-sm font-medium text-gray-900 hover:text-brand-600 transition-colors line-clamp-1"
                                                            >
                                                                {note.title}
                                                            </Link>
                                                            <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                                                                {note.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{note.seller?.name}</div>
                                                    <div className="text-sm text-gray-500">{note.seller?.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{note.category?.course}</div>
                                                    <div className="text-sm text-gray-500">{note.category?.subject}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {formatINR(note.price)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        {note.isApproved ? (
                                                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full w-fit">
                                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                                Approved
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full w-fit">
                                                                <AlertCircle className="w-3 h-3 mr-1" />
                                                                Pending
                                                            </span>
                                                        )}
                                                        {note.isFeatured && (
                                                            <span className="inline-flex items-center px-2 py-1 bg-brand-100 text-brand-700 text-xs rounded-full w-fit">
                                                                <Star className="w-3 h-3 mr-1" />
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="w-4 h-4" />
                                                            {note.viewCount || 0}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {note.purchaseCount || 0} sales
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        {!note.isApproved && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(note.id)}
                                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                    title="Approve"
                                                                >
                                                                    <CheckCircle className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(note.id)}
                                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Reject"
                                                                >
                                                                    <XCircle className="w-4 h-4" />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => handleToggleFeature(note.id, note.isFeatured)}
                                                            className={`p-2 rounded-lg transition-colors ${
                                                                note.isFeatured 
                                                                    ? 'text-brand-600 bg-brand-50' 
                                                                    : 'text-gray-400 hover:text-brand-500 hover:bg-brand-50'
                                                            }`}
                                                            title={note.isFeatured ? 'Unfeature' : 'Feature'}
                                                        >
                                                            <Star className="w-4 h-4" />
                                                        </button>
                                                        <Link
                                                            to={`/notes/${note.id}`}
                                                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                                                            title="View"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Showing {notes.length} notes
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <span className="text-sm text-gray-700">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
