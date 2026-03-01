import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    TrendingUp, 
    Users, 
    FileText, 
    ShoppingCart,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Download
} from 'lucide-react';
import { adminService } from '../../services/admin.service';

interface AnalyticsData {
    totalRevenue: number;
    totalSales: number;
    totalUsers: number;
    totalNotes: number;
    revenueGrowth: number;
    salesGrowth: number;
    userGrowth: number;
    notesGrowth: number;
    dailyRevenue: { date: string; amount: number }[];
    topSellingNotes: any[];
    topSellers: any[];
    categoryDistribution: { name: string; count: number }[];
}

export function AdminAnalytics() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

    useEffect(() => {
        fetchAnalytics();
    }, [timeRange]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const data = await adminService.getAnalytics(timeRange);
            setAnalytics(data);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        // Export analytics data as CSV
        const csvContent = 'data:text/csv;charset=utf-8,' + 
            'Date,Revenue,Sales,New Users\n' +
            (analytics?.dailyRevenue || []).map(row => 
                `₹{row.date},₹{row.amount},0,0`
            ).join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `analytics_₹{timeRange}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                    <div className="flex items-center gap-2 mb-2">
                        <Link to="/admin" className="text-gray-500 hover:text-gray-700">
                            Admin
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">Analytics</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
                            <p className="text-gray-600 mt-1">Detailed insights and performance metrics</p>
                        </div>
                        <button
                            onClick={handleExport}
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Time Range */}
                <div className="flex gap-2 mb-6">
                    {[
                        { key: '7d', label: 'Last 7 Days' },
                        { key: '30d', label: 'Last 30 Days' },
                        { key: '90d', label: 'Last 90 Days' },
                        { key: '1y', label: 'Last Year' }
                    ].map((range) => (
                        <button
                            key={range.key}
                            onClick={() => setTimeRange(range.key as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ₹{
                                timeRange === range.key
                                    ? 'bg-brand-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard
                        title="Total Revenue"
                        value={`₹₹{(analytics?.totalRevenue || 0).toLocaleString()}`}
                        trend={analytics?.revenueGrowth || 0}
                        icon={<DollarSign className="w-6 h-6" />}
                        color="green"
                    />
                    <MetricCard
                        title="Total Sales"
                        value={analytics?.totalSales || 0}
                        trend={analytics?.salesGrowth || 0}
                        icon={<ShoppingCart className="w-6 h-6" />}
                        color="blue"
                    />
                    <MetricCard
                        title="New Users"
                        value={analytics?.totalUsers || 0}
                        trend={analytics?.userGrowth || 0}
                        icon={<Users className="w-6 h-6" />}
                        color="purple"
                    />
                    <MetricCard
                        title="Notes Uploaded"
                        value={analytics?.totalNotes || 0}
                        trend={analytics?.notesGrowth || 0}
                        icon={<FileText className="w-6 h-6" />}
                        color="orange"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Over Time</h3>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {(analytics?.dailyRevenue || []).map((day, index) => {
                                const maxRevenue = Math.max(...(analytics?.dailyRevenue || []).map(d => d.amount));
                                const height = maxRevenue > 0 ? (day.amount / maxRevenue) * 100 : 0;
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div 
                                            className="w-full bg-brand-500 rounded-t transition-all hover:bg-brand-600"
                                            style={{ height: `₹{height}%`, minHeight: '4px' }}
                                            title={`₹₹{day.amount.toFixed(2)}`}
                                        ></div>
                                        <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                                            {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Category Distribution */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes by Category</h3>
                        <div className="space-y-4">
                            {(analytics?.categoryDistribution || []).map((category, index) => {
                                const total = (analytics?.categoryDistribution || []).reduce((sum, c) => sum + c.count, 0);
                                const percentage = total > 0 ? (category.count / total) * 100 : 0;
                                return (
                                    <div key={index}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-700">{category.name}</span>
                                            <span className="text-gray-500">{category.count} notes ({percentage.toFixed(1)}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div 
                                                className="bg-brand-500 h-2 rounded-full transition-all"
                                                style={{ width: `₹{percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Top Performers */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Selling Notes */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Notes</h3>
                        <div className="space-y-4">
                            {(analytics?.topSellingNotes || []).slice(0, 5).map((note, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-sm font-bold">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{note.title}</p>
                                            <p className="text-xs text-gray-500">by {note.seller?.name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{note.purchaseCount} sales</p>
                                        <p className="text-xs text-gray-500">₹{note.revenue?.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Sellers */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Sellers</h3>
                        <div className="space-y-4">
                            {(analytics?.topSellers || []).slice(0, 5).map((seller, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-sm font-bold">
                                            {index + 1}
                                        </span>
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-gray-600 font-medium">
                                                {seller.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900\">{seller.name}</p>
                                            <p className="text-xs text-gray-500\">{seller.totalNotes} notes</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900\">{seller.totalSales} sales</p>
                                        <p className="text-xs text-gray-500\">₹{seller.totalRevenue?.toFixed(2)} earned</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, trend, icon, color }: any) {
    const colorClasses: any = {
        green: 'bg-green-50 text-green-600',
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600'
    };

    const isPositive = trend >= 0;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ₹{colorClasses[color]}`}>
                    {icon}
                </div>
                <div className={`flex items-center text-sm ₹{isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                    {Math.abs(trend)}%
                </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    );
}
