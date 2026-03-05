import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    DollarSign, 
    ShoppingBag, 
    TrendingUp, 
    Package, 
    Star,
    ChevronRight,
    Plus,
    Eye,
    FileText,
    Calendar,
    CreditCard,
    BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { notesService } from '../../services/notes.service';
import { userService } from '../../services/user.service';
import { Note } from '../../types/note.types';
import { formatINR, toNumber } from '../../utils/currency';

interface DashboardStats {
    totalEarnings: number;
    totalSales: number;
    availableBalance: number;
    pendingPayouts: number;
    averageRating: number;
    totalNotes: number;
    monthlyGrowth: number;
    totalViews: number;
    thisMonthEarnings: number;
    thisMonthSales: number;
}

export function SellerDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [recentSales, setRecentSales] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'analytics'>('overview');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const dashboardData = await userService.getDashboard();
            setStats(dashboardData.data);

            if (user?.id) {
                const notesData = await notesService.getNotesBySeller(user.id);
                setNotes(notesData.data.notes || []);
            }

            const salesData = await userService.getSalesHistory();
            setRecentSales(salesData.data.sales || []);
            
            const ordersData = await userService.getOrders();
            setOrders(ordersData || []);
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

    const monthlyData = [
        { month: 'Jan', sales: 12, earnings: 120 },
        { month: 'Feb', sales: 19, earnings: 190 },
        { month: 'Mar', sales: 15, earnings: 150 },
        { month: 'Apr', sales: 25, earnings: 250 },
        { month: 'May', sales: 22, earnings: 220 },
        { month: 'Jun', sales: 30, earnings: 300 },
    ];
    const maxSales = Math.max(...monthlyData.map(m => m.sales));

    const tabs = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="mt-2 text-gray-600">Track your sales, manage your products, and grow your business</p>
                    </div>
                    <Link to="/notes/upload" className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Product
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                                        activeTab === tab.id ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <tab.icon className="h-5 w-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {activeTab === 'overview' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-green-100 rounded-lg"><CreditCard className="w-6 h-6 text-green-600" /></div>
                                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">+{stats?.monthlyGrowth || 0}%</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                                <p className="text-2xl font-bold text-gray-900">{formatINR(stats?.totalEarnings || 0)}</p>
                                <p className="text-xs text-gray-500 mt-2">Lifetime revenue</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-100 rounded-lg"><Calendar className="w-6 h-6 text-blue-600" /></div>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">This Month</p>
                                <p className="text-2xl font-bold text-gray-900">{formatINR(stats?.thisMonthEarnings || 0)}</p>
                                <p className="text-xs text-gray-500 mt-2">{stats?.thisMonthSales || 0} sales</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-100 rounded-lg"><ShoppingBag className="w-6 h-6 text-purple-600" /></div>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{stats?.totalSales || 0}</p>
                                <p className="text-xs text-gray-500 mt-2">Lifetime orders</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-orange-100 rounded-lg"><CreditCard className="w-6 h-6 text-orange-600" /></div>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                                <p className="text-2xl font-bold text-gray-900">{formatINR(stats?.availableBalance || 0)}</p>
                                <button className="text-xs text-brand-500 font-medium mt-2 hover:text-brand-600">Request Payout</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
                                <div><p className="text-sm text-gray-600 mb-1">Total Products</p><p className="text-2xl font-bold text-gray-900">{notes.length}</p></div>
                                <div className="p-3 bg-gray-100 rounded-lg"><FileText className="w-6 h-6 text-gray-600" /></div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
                                <div><p className="text-sm text-gray-600 mb-1">Total Views</p><p className="text-2xl font-bold text-gray-900">{stats?.totalViews || 0}</p></div>
                                <div className="p-3 bg-gray-100 rounded-lg"><Eye className="w-6 h-6 text-gray-600" /></div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
                                <div><p className="text-sm text-gray-600 mb-1">Average Rating</p><p className="text-2xl font-bold text-gray-900">{stats?.averageRating?.toFixed(1) || '0.0'}</p></div>
                                <div className="p-3 bg-gray-100 rounded-lg"><Star className="w-6 h-6 text-gray-600" /></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Overview</h3>
                            <div className="flex items-end justify-between h-48 mb-4">
                                {monthlyData.map((data, index) => (
                                    <div key={index} className="flex flex-col items-center flex-1">
                                        <div className="w-full bg-brand-500 rounded-t-md hover:bg-brand-600" style={{ height: `${(data.sales / maxSales) * 100}%`, margin: '0 4px' }}></div>
                                        <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
                                <span>Total: {monthlyData.reduce((a, b) => a + b.sales, 0)} orders</span>
                                <span>Revenue: {formatINR(monthlyData.reduce((a, b) => a + b.earnings, 0))}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl shadow-sm">
                                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                                    <button onClick={() => setActiveTab('orders')} className="text-sm text-brand-500 font-medium hover:text-brand-600">View All</button>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {recentSales.length === 0 ? (
                                        <div className="p-8 text-center"><ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">No orders yet</p></div>
                                    ) : (
                                        recentSales.slice(0, 5).map((sale, index) => (
                                            <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mr-3"><FileText className="w-5 h-5 text-brand-500" /></div>
                                                    <div><p className="text-sm font-medium text-gray-900">{sale.noteTitle}</p><p className="text-xs text-gray-500">{new Date(sale.createdAt).toLocaleDateString()}</p></div>
                                                </div>
                                                <span className="text-sm font-medium text-green-600">+{formatINR(sale.amount)}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm">
                                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                                    <button onClick={() => setActiveTab('products')} className="text-sm text-brand-500 font-medium hover:text-brand-600">Manage</button>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {notes.length === 0 ? (
                                        <div className="p-8 text-center"><Package className="w-12 h-12 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">No products yet</p></div>
                                    ) : (
                                        notes.slice(0, 5).map((note) => (
                                            <div key={note.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3"><Package className="w-5 h-5 text-gray-600" /></div>
                                                    <div><p className="text-sm font-medium text-gray-900">{note.title}</p><p className="text-xs text-gray-500">{formatINR(note.price)} - {note.purchaseCount || 0} sales</p></div>
                                                </div>
                                                <span className={`px-2 py-1 text-xs rounded-full ${note.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{note.isApproved ? 'Active' : 'Pending'}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-semibold text-gray-900">All Orders</h3></div>
                        <div className="divide-y divide-gray-200">
                            {orders.length === 0 ? (
                                <div className="p-12 text-center"><ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-gray-500 text-lg">No orders yet</p></div>
                            ) : (
                                orders.map((order) => (
                                    <div key={order.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                        <div className="flex items-center">
                                            <div className="w-14 h-14 bg-brand-100 rounded-lg flex items-center justify-center mr-4"><FileText className="w-7 h-7 text-brand-500" /></div>
                                            <div><p className="font-medium text-gray-900">{order.note?.title || 'Product'}</p><p className="text-sm text-gray-500">Sold to {order.buyer?.name || 'Customer'} - {new Date(order.createdAt).toLocaleDateString()}</p></div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 text-xs rounded-full ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status || 'Completed'}</span>
                                            <span className="text-lg font-bold text-green-600">+{formatINR(order.amount || 0)}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">My Products ({notes.length})</h3>
                            <Link to="/notes/upload" className="inline-flex items-center px-4 py-2 bg-brand-500 text-white text-sm rounded-lg hover:bg-brand-600"><Plus className="w-4 h-4 mr-2" />Add Product</Link>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {notes.length === 0 ? (
                                <div className="p-12 text-center"><Package className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">No products yet</p></div>
                            ) : (
                                notes.map((note) => (
                                    <div key={note.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                        <div className="flex items-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4"><FileText className="w-8 h-8 text-gray-600" /></div>
                                            <div>
                                                <p className="font-medium text-gray-900">{note.title}</p>
                                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1"><ShoppingBag className="w-4 h-4" />{note.purchaseCount || 0} sales</span>
                                                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{note.viewCount || 0} views</span>
                                                    <span className="flex items-center gap-1"><Star className="w-4 h-4" />{note.averageRating?.toFixed(1) || '0.0'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-lg font-bold text-gray-900">{formatINR(note.price || 0)}</span>
                                            <span className={`px-3 py-1 text-xs rounded-full ${note.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{note.isApproved ? 'Active' : 'Pending'}</span>
                                            <Link to={`/notes/${note.id}/edit`} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Analytics</h3>
                            <div className="flex items-end justify-between h-64 mb-4">
                                {monthlyData.map((data, index) => (
                                    <div key={index} className="flex flex-col items-center flex-1">
                                        <div className="w-full bg-brand-500 rounded-t-md hover:bg-brand-600 relative group" style={{ height: `${(data.sales / maxSales) * 100}%`, margin: '0 4px' }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">{formatINR(data.earnings)}</div>
                                        </div>
                                        <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                                <div className="text-center"><p className="text-2xl font-bold text-gray-900">{monthlyData.reduce((a, b) => a + b.sales, 0)}</p><p className="text-sm text-gray-500">Total Orders</p></div>
                                <div className="text-center"><p className="text-2xl font-bold text-gray-900">{formatINR(monthlyData.reduce((a, b) => a + b.earnings, 0))}</p><p className="text-sm text-gray-500">Total Revenue</p></div>
                                <div className="text-center"><p className="text-2xl font-bold text-gray-900">{formatINR(Math.round(monthlyData.reduce((a, b) => a + b.earnings, 0) / monthlyData.reduce((a, b) => a + b.sales, 0)))}</p><p className="text-sm text-gray-500">Avg. Order Value</p></div>
                                <div className="text-center"><p className="text-2xl font-bold text-gray-900">+{stats?.monthlyGrowth || 0}%</p><p className="text-sm text-gray-500">Growth Rate</p></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Products</h3>
                            <div className="space-y-4">
                                {notes.sort((a, b) => toNumber(b.purchaseCount) - toNumber(a.purchaseCount)).slice(0, 5).map((note, index) => (
                                    <div key={note.id} className="flex items-center">
                                        <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-sm mr-4">{index + 1}</span>
                                        <div className="flex-1"><p className="font-medium text-gray-900">{note.title}</p><p className="text-sm text-gray-500">{note.purchaseCount || 0} sales</p></div>
                                        <div className="text-right"><p className="font-bold text-gray-900">{formatINR(toNumber(note.purchaseCount) * toNumber(note.price))}</p></div>
                                    </div>
                                ))}
                                {notes.length === 0 && <p className="text-gray-500 text-center py-8">No products yet</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
