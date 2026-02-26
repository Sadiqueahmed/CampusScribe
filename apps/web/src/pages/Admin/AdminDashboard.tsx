import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    FileText, 
    TrendingUp,
    DollarSign,
    ShoppingCart,
    MessageSquare,
    AlertCircle,
    CheckCircle,
    Clock,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { adminService } from '../../services/admin.service';

interface DashboardStats {
    totalUsers: number;
    totalNotes: number;
    totalSales: number;
    totalRevenue: number;
    pendingVerifications: number;
    pendingApprovals: number;
    recentUsers: any[];
    recentNotes: any[];
    salesTrend: number;
    userGrowth: number;
}

export function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

    useEffect(() => {
        fetchDashboardData();
    }, [timeRange]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const data = await adminService.getDashboardStats(timeRange);
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
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
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1">Overview of platform performance and activity</p>
                </div>

                {/* Time Range Selector */}
                <div className="flex gap-2 mb-6">
                    {[
                        { key: '7d', label: 'Last 7 Days' },
                        { key: '30d', label: 'Last 30 Days' },
                        { key: '90d', label: 'Last 90 Days' }
                    ].map((range) => (
                        <button
                            key={range.key}
                            onClick={() => setTimeRange(range.key as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                timeRange === range.key
                                    ? 'bg-brand-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Users"
                        value={stats?.totalUsers || 0}
                        icon={<Users className="w-6 h-6" />}
                        trend={stats?.userGrowth || 0}
                        trendLabel="vs last period"
                        color="blue"
                    />
                    <StatCard
                        title="Total Notes"
                        value={stats?.totalNotes || 0}
                        icon={<FileText className="w-6 h-6" />}
                        trend={12}
                        trendLabel="new this week"
                        color="green"
                    />
                    <StatCard
                        title="Total Sales"
                        value={stats?.totalSales || 0}
                        icon={<ShoppingCart className="w-6 h-6" />}
                        trend={stats?.salesTrend || 0}
                        trendLabel="vs last period"
                        color="purple"
                    />
                    <StatCard
                        title="Revenue"
                        value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
                        icon={<DollarSign className="w-6 h-6" />}
                        trend={8.5}
                        trendLabel="vs last period"
                        color="orange"
                    />
                </div>

                {/* Alerts & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Pending Actions */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h2>
                        <div className="space-y-4">
                            <PendingActionCard
                                icon={<AlertCircle className="w-5 h-5" />}
                                title="Seller Verifications"
                                count={stats?.pendingVerifications || 0}
                                description="Sellers waiting for verification"
                                link="/admin/verifications"
                                color="yellow"
                            />
                            <PendingActionCard
                                icon={<Clock className="w-5 h-5" />}
                                title="Note Approvals"
                                count={stats?.pendingApprovals || 0}
                                description="Notes pending review"
                                link="/admin/notes"
                                color="blue"
                            />
                            <PendingActionCard
                                icon={<MessageSquare className="w-5 h-5" />}
                                title="Support Tickets"
                                count={5}
                                description="Open support requests"
                                link="/admin/support"
                                color="purple"
                            />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
                        <div className="space-y-3">
                            <QuickLink
                                to="/admin/users"
                                icon={<Users className="w-5 h-5" />}
                                label="Manage Users"
                            />
                            <QuickLink
                                to="/admin/notes"
                                icon={<FileText className="w-5 h-5" />}
                                label="Review Notes"
                            />
                            <QuickLink
                                to="/admin/analytics"
                                icon={<TrendingUp className="w-5 h-5" />}
                                label="View Analytics"
                            />
                            <QuickLink
                                to="/admin/verifications"
                                icon={<CheckCircle className="w-5 h-5" />}
                                label="Verifications"
                            />
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Users */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
                            <Link to="/admin/users" className="text-brand-500 hover:text-brand-600 text-sm">
                                View all
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {(stats?.recentUsers || []).slice(0, 5).map((user: any) => (
                                <div key={user.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                                            <span className="text-brand-600 font-medium">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Notes */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Notes</h2>
                            <Link to="/admin/notes" className="text-brand-500 hover:text-brand-600 text-sm">
                                View all
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {(stats?.recentNotes || []).slice(0, 5).map((note: any) => (
                                <div key={note.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{note.title}</p>
                                            <p className="text-xs text-gray-500">by {note.seller?.name}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        note.isApproved 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {note.isApproved ? 'Approved' : 'Pending'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend, trendLabel, color }: any) {
    const colorClasses: any = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600'
    };

    const isPositive = trend >= 0;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    {icon}
                </div>
                <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                    {Math.abs(trend)}%
                </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xs text-gray-400 mt-1">{trendLabel}</p>
        </div>
    );
}

function PendingActionCard({ icon, title, count, description, link, color }: any) {
    const colorClasses: any = {
        yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200'
    };

    return (
        <Link 
            to={link}
            className={`flex items-center p-4 rounded-lg border ${colorClasses[color]} hover:shadow-md transition-shadow`}
        >
            <div className="p-2 bg-white rounded-lg shadow-sm mr-4">
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{title}</h3>
                    <span className="px-2 py-0.5 bg-white rounded-full text-sm font-bold">
                        {count}
                    </span>
                </div>
                <p className="text-sm opacity-75">{description}</p>
            </div>
            <ArrowUpRight className="w-5 h-5 opacity-50" />
        </Link>
    );
}

function QuickLink({ to, icon, label }: any) {
    return (
        <Link
            to={to}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-brand-100 transition-colors mr-3">
                {icon}
            </div>
            <span className="text-gray-700 font-medium">{label}</span>
            <ArrowUpRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-brand-500" />
        </Link>
    );
}
