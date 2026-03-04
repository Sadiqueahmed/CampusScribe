import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    ShoppingBag, 
    Download, 
    MessageSquare, 
    ChevronRight,
    FileText,
    Clock,
    CheckCircle,
    XCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/user.service';
import { notesService } from '../../services/notes.service';
import { formatINR } from '../../utils/currency';

interface Order {
    id: string;
    noteId: string;
    noteTitle: string;
    notePrice: number;
    sellerName: string;
    sellerId: string;
    status: 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED';
    createdAt: string;
    fileUrl?: string;
}

export function OrderHistory() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const orders = await userService.getOrders();
            setOrders(orders || []);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (noteId: string) => {
        try {
            const note = await notesService.getNoteById(noteId);
            if (note.fileUrl) {
                window.open(note.fileUrl, '_blank');
            }
        } catch (error) {
            console.error('Failed to download note:', error);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'PENDING':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'REFUNDED':
            case 'FAILED':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'Completed';
            case 'PENDING':
                return 'Pending';
            case 'REFUNDED':
                return 'Refunded';
            case 'FAILED':
                return 'Failed';
            default:
                return status;
        }
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        if (filter === 'completed') return order.status === 'COMPLETED';
        if (filter === 'pending') return order.status === 'PENDING';
        return true;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                    <p className="mt-2 text-gray-600">View and manage your purchased notes</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg mr-4">
                                <ShoppingBag className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg mr-4">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {orders.filter(o => o.status === 'COMPLETED').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg mr-4">
                                <FileText className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Spent</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatINR(orders
                                        .filter(o => o.status === 'COMPLETED')
                                        .reduce((sum, o) => sum + o.notePrice, 0)
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-xl shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { key: 'all', label: 'All Orders' },
                                { key: 'completed', label: 'Completed' },
                                { key: 'pending', label: 'Pending' }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setFilter(tab.key as any)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        filter === tab.key
                                            ? 'border-brand-500 text-brand-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Orders List */}
                <div className="bg-white rounded-xl shadow-sm">
                    {filteredOrders.length === 0 ? (
                        <div className="p-12 text-center">
                            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                            <p className="text-gray-500 mb-6">
                                {filter === 'all' 
                                    ? "You haven't purchased any notes yet." 
                                    : `No ${filter} orders found.`}
                            </p>
                            <Link
                                to="/browse"
                                className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                            >
                                Browse Notes
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-6 h-6 text-brand-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {order.noteTitle}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    by {order.sellerName} • {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                                <div className="flex items-center mt-2 space-x-4">
                                                    <span className="flex items-center text-sm">
                                                        {getStatusIcon(order.status)}
                                                        <span className="ml-2">{getStatusText(order.status)}</span>
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {formatINR(order.notePrice)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            {order.status === 'COMPLETED' && (
                                                <>
                                                    <button
                                                        onClick={() => handleDownload(order.noteId)}
                                                        className="inline-flex items-center px-3 py-2 bg-brand-500 text-white text-sm rounded-lg hover:bg-brand-600 transition-colors"
                                                    >
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Download
                                                    </button>
                                                    <Link
                                                        to={`/messages?userId=${order.sellerId}`}
                                                        className="inline-flex items-center px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        <MessageSquare className="w-4 h-4 mr-2" />
                                                        Contact Seller
                                                    </Link>
                                                </>
                                            )}
                                            <Link
                                                to={`/notes/${order.noteId}`}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
