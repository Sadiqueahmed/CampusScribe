import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    User, 
    ShoppingBag, 
    DollarSign, 
    MessageSquare, 
    Star, 
    Settings,
    Package,
    TrendingUp,
    Award
} from 'lucide-react';
import { userService } from '../../services/user.service';
import { paymentService } from '../../services/payment.service';
import { Button } from '../../components/common/Button/Button';

interface DashboardStats {
    totalPurchases: number;
    totalSales: number;
    totalEarnings: number;
    availableBalance: number;
    unreadMessages: number;
    pendingReviews: number;
}

export const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'sales' | 'settings'>('overview');
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [sales, setSales] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [dashboardData, ordersData, salesData, profileData] = await Promise.all([
                userService.getDashboard(),
                userService.getOrders(),
                userService.getSales(),
                userService.getProfile()
            ]);
            setStats(dashboardData);
            setOrders(ordersData);
            setSales(salesData);
            setProfile(profileData);
        } catch (error) {
            console.error('Failed to load dashboard:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRequestVerification = async () => {
        try {
            await userService.requestVerification();
            alert('Verification request submitted! We will review your application.');
        } catch (error: any) {
            alert(error.response?.data?.error || 'Failed to submit verification request');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'orders', label: 'My Orders', icon: ShoppingBag },
        { id: 'sales', label: 'My Sales', icon: DollarSign },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-brand-100 flex items-center justify-center text-3xl">
                            {profile?.avatar ? (
                                <img src={profile.avatar} alt={profile.name} className="h-20 w-20 rounded-full object-cover" />
                            ) : (
                                profile?.name?.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">{profile?.name}</h1>
                            <p className="text-gray-600">{profile?.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    profile?.role === 'SELLER' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {profile?.role}
                                </span>
                                {profile?.isSellerVerified && (
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 flex items-center gap-1">
                                        <Award className="h-4 w-4" />
                                        Verified Seller
                                    </span>
                                )}
                            </div>
                        </div>
                        {profile?.role === 'BUYER' && (
                            <Button onClick={handleRequestVerification} variant="outline">
                                Become a Seller
                            </Button>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-brand-500 text-brand-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <tab.icon className="h-5 w-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <ShoppingBag className="h-8 w-8 text-blue-600" />
                                        <span className="text-2xl font-bold text-blue-900">{stats?.totalPurchases || 0}</span>
                                    </div>
                                    <p className="text-blue-700">Total Purchases</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Package className="h-8 w-8 text-green-600" />
                                        <span className="text-2xl font-bold text-green-900">{stats?.totalSales || 0}</span>
                                    </div>
                                    <p className="text-green-700">Total Sales</p>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <DollarSign className="h-8 w-8 text-purple-600" />
                                        <span className="text-2xl font-bold text-purple-900">${stats?.totalEarnings?.toFixed(2) || '0.00'}</span>
                                    </div>
                                    <p className="text-purple-700">Total Earnings</p>
                                </div>
                                <div className="bg-orange-50 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <MessageSquare className="h-8 w-8 text-orange-600" />
                                        <span className="text-2xl font-bold text-orange-900">{stats?.unreadMessages || 0}</span>
                                    </div>
                                    <p className="text-orange-700">Unread Messages</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Purchase History</h3>
                                {orders.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No orders yet</p>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order.id} className="border rounded-lg p-4 flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.note.title}</p>
                                                <p className="text-sm text-gray-600">Purchased on {new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">${order.amount.toFixed(2)}</p>
                                                <Button 
                                                    onClick={() => navigate(`/notes/${order.note.id}/download`)}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'sales' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">Sales History</h3>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Available Balance</p>
                                        <p className="text-2xl font-bold text-green-600">${stats?.availableBalance?.toFixed(2) || '0.00'}</p>
                                    </div>
                                </div>
                                {sales.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No sales yet</p>
                                ) : (
                                    sales.map((sale) => (
                                        <div key={sale.id} className="border rounded-lg p-4 flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{sale.note.title}</p>
                                                <p className="text-sm text-gray-600">Sold to {sale.buyer.name} on {new Date(sale.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <p className="font-bold text-green-600">+${sale.amount.toFixed(2)}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="max-w-2xl">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            defaultValue={profile?.name}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                        <textarea
                                            defaultValue={profile?.bio}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                                        <input
                                            type="text"
                                            defaultValue={profile?.university}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                        />
                                    </div>
                                    <Button variant="primary">Save Changes</Button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
