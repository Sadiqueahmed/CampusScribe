import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    DollarSign, 
    TrendingUp, 
    ShoppingBag, 
    Calendar,
    Download,
    ChevronRight,
    FileText,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/user.service';

interface Sale {
    id: string;
    noteId: string;
    noteTitle: string;
    buyerName: string;
    amount: number;
    platformFee: number;
    netAmount: number;
    createdAt: string;
    status: 'PENDING' | 'COMPLETED' | 'REFUNDED';
}

interface SalesStats {
    totalSales: number;
    totalRevenue: number;
    totalFees: number;
    netEarnings: number;
    thisMonthSales: number;
    thisMonthRevenue: number;
    lastMonthSales: number;
    lastMonthRevenue: number;
    averageOrderValue: number;
}

export function SalesHistory() {
    const { user } = useAuth();
    const [sales, setSales] = useState<Sale[]>([]);
    const [stats, setStats] = useState<SalesStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days' | 'all'>('30days');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchSalesData();
    }, [timeRange]);

    const fetchSalesData = async () => {
        try {
            setLoading(true);
            const response = await userService.getSalesHistory();
            setSales(response.data?.sales || []);
            setStats(response.data?.stats || null);
        } catch (error) {
            console.error('Failed to fetch sales data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        // Export sales data to CSV
        const csvContent = [
            ['Date', 'Note Title', 'Buyer', 'Amount', 'Platform Fee', 'Net Amount', 'Status'].join(','),
            ...sales.map(sale => [
                new Date(sale.createdAt).toLocaleDateString(),
                `"₹{sale.noteTitle}"`,
                sale.buyerName,
                sale.amount.toFixed(2),
                sale.platformFee.toFixed(2),
                sale.netAmount.toFixed(2),
                sale.status
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sales-history-₹{new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const calculateGrowth = (current: number, previous: number) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / previous) * 100;
    };

    const salesGrowth = stats ? calculateGrowth(stats.thisMonthSales, stats.lastMonthSales) : 0;
    const revenueGrowth = stats ? calculateGrowth(stats.thisMonthRevenue, stats.lastMonthRevenue) : 0;

    const paginatedSales = sales.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(sales.length / itemsPerPage);

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
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Sales History</h1>
                        <p className="mt-2 text-gray-600">Track your earnings and sales performance</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex space-x-3">
                        <button
                            onClick={handleExport}
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ₹{stats?.totalRevenue?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            {revenueGrowth >= 0 ? (
                                <>
                                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                                    <span className="text-green-500 font-medium">+{revenueGrowth.toFixed(1)}%</span>
                                </>
                            ) : (
                                <>
                                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                                    <span className="text-red-500 font-medium">{revenueGrowth.toFixed(1)}%</span>
                                </>
                            )}
                            <span className="text-gray-500 ml-2">vs last month</span>
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
                            <div className="p-3 bg-green-100 rounded-lg">
                                <ShoppingBag className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            {salesGrowth >= 0 ? (
                                <>
                                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                                    <span className="text-green-500 font-medium">+{salesGrowth.toFixed(1)}%</span>
                                </>
                            ) : (
                                <>
                                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                                    <span className="text-red-500 font-medium">{salesGrowth.toFixed(1)}%</span>
                                </>
                            )}
                            <span className="text-gray-500 ml-2">vs last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Net Earnings</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ₹{stats?.netEarnings?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            After 15% platform fee
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ₹{stats?.averageOrderValue?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            Per transaction
                        </div>
                    </div>
                </div>

                {/* Time Range Filter */}
                <div className="bg-white rounded-xl shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { key: '7days', label: 'Last 7 Days' },
                                { key: '30days', label: 'Last 30 Days' },
                                { key: '90days', label: 'Last 90 Days' },
                                { key: 'all', label: 'All Time' }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setTimeRange(tab.key as any)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ₹{
                                        timeRange === tab.key
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

                {/* Sales Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {sales.length === 0 ? (
                        <div className="p-12 text-center">
                            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No sales yet</h3>
                            <p className="text-gray-500 mb-6">
                                Start selling by uploading your first note
                            </p>
                            <Link
                                to="/notes/upload"
                                className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                            >
                                Upload Note
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Note
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Buyer
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Net
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {paginatedSales.map((sale) => (
                                            <tr key={sale.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(sale.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center mr-3">
                                                            <FileText className="w-4 h-4 text-brand-500" />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {sale.noteTitle}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {sale.buyerName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ₹{sale.amount.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                                    ₹{sale.netAmount.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ₹{
                                                        sale.status === 'COMPLETED'
                                                            ? 'bg-green-100 text-green-800'
                                                            : sale.status === 'PENDING'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {sale.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        to={`/notes/₹{sale.noteId}`}
                                                        className="text-brand-500 hover:text-brand-600"
                                                    >
                                                        <ChevronRight className="w-5 h-5 inline" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                                        {Math.min(currentPage * itemsPerPage, sales.length)} of{' '}
                                        {sales.length} results
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
