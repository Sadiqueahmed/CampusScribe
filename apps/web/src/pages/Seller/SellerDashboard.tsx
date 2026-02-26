import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    DollarSign, 
    ShoppingBag, 
    TrendingUp, 
    Package, 
    Star, 
    MessageSquare,
    ChevronRight,
    Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { notesService } from '../../services/notes.service';
import { userService } from '../../services/user.service';
import { Note } from '../../types/note.types';

interface DashboardStats {
    totalEarnings: number;
    totalSales: number;
    availableBalance: number;
    pendingPayouts: number;
    averageRating: number;
    totalNotes: number;
    monthlyGrowth: number;
}

export function SellerDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [recentSales, setRecentSales] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Fetch seller stats
            const dashboardData = await userService.getDashboard();
            setStats(dashboardData.data);

            // Fetch seller's notes
            if (user?.id) {
                const notesData = await notesService.getNotesBySeller(user.id);
                setNotes(notesData.data.notes || []);
            }

            // Fetch recent sales
            const salesData = await userService.getSalesHistory();
            setRecentSales(salesData.data.sales || []);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

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
                    <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
                    <p className="mt-2 text-gray-600">Manage your notes, track sales, and grow your business</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${stats?.totalEarnings?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">+{stats?.monthlyGrowth || 0}%</span>
                            <span className="text-gray-500 ml-2">this month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats?.totalSales || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <ShoppingBag className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            Lifetime sales count
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Available Balance</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${stats?.availableBalance?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="text-sm text-brand-500 font-medium hover:text-brand-600">
                                Request Payout →
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats?.averageRating?.toFixed(1) || '0.0'}
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <Star className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            Based on customer reviews
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/notes/upload"
                            className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Upload New Note
                        </Link>
                        <Link
                            to="/messages"
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <MessageSquare className="w-5 h-5 mr-2" />
                            View Messages
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* My Notes */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">My Notes</h2>
                                    <Link 
                                        to="/notes/upload"
                                        className="text-sm text-brand-500 font-medium hover:text-brand-600"
                                    >
                                        Upload New
                                    </Link>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {notes.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">No notes uploaded yet</p>
                                        <Link 
                                            to="/notes/upload"
                                            className="mt-4 inline-block text-brand-500 font-medium hover:text-brand-600"
                                        >
                                            Upload your first note
                                        </Link>
                                    </div>
                                ) : (
                                    notes.slice(0, 5).map((note) => (
                                        <div key={note.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mr-4">
                                                    <Package className="w-6 h-6 text-brand-500" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">{note.title}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        ${note.price} • {note.purchaseCount || 0} sales
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    note.isApproved 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {note.isApproved ? 'Approved' : 'Pending'}
                                                </span>
                                                <Link 
                                                    to={`/notes/${note.id}/edit`}
                                                    className="text-gray-400 hover:text-gray-600"
                                                >
                                                    <ChevronRight className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            {notes.length > 5 && (
                                <div className="p-4 border-t border-gray-200 text-center">
                                    <Link 
                                        to="/seller/notes"
                                        className="text-sm text-brand-500 font-medium hover:text-brand-600"
                                    >
                                        View all {notes.length} notes
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Sales */}
                    <div>
                        <div className="bg-white rounded-xl shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {recentSales.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <p className="text-gray-500">No sales yet</p>
                                    </div>
                                ) : (
                                    recentSales.slice(0, 5).map((sale, index) => (
                                        <div key={index} className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {sale.noteTitle}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(sale.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className="text-sm font-medium text-green-600">
                                                    +${sale.amount.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            {recentSales.length > 0 && (
                                <div className="p-4 border-t border-gray-200 text-center">
                                    <Link 
                                        to="/seller/sales"
                                        className="text-sm text-brand-500 font-medium hover:text-brand-600"
                                    >
                                        View all sales
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
