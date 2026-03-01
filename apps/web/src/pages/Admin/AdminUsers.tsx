import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Users, 
    Search, 
    Filter,
    MoreVertical,
    Shield,
    UserX,
    CheckCircle,
    XCircle,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { adminService } from '../../services/admin.service';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    isSellerVerified: boolean;
    createdAt: string;
    totalNotes: number;
    totalSales: number;
}

export function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    useEffect(() => {
        fetchUsers();
    }, [currentPage, roleFilter, searchQuery]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await adminService.getUsers({
                page: currentPage,
                limit: 20,
                search: searchQuery,
                role: roleFilter === 'all' ? undefined : roleFilter
            });
            setUsers(response.data?.users || []);
            setTotalPages(response.data?.totalPages || 1);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await adminService.updateUser(userId, { role: newRole });
            fetchUsers();
        } catch (error) {
            console.error('Failed to update user role:', error);
        }
    };

    const toggleUserSelection = (userId: string) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'bg-red-100 text-red-700';
            case 'SELLER': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
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
                        <span className="text-gray-900 font-medium">Users</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-600 mt-1">Manage platform users and their permissions</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500"
                            >
                                <option value="all">All Roles</option>
                                <option value="BUYER">Buyers</option>
                                <option value="SELLER">Sellers</option>
                                <option value="ADMIN">Admins</option>
                            </select>
                            <button
                                onClick={fetchUsers}
                                className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                            >
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
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
                                                    checked={selectedUsers.length === users.length && users.length > 0}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedUsers(users.map(u => u.id));
                                                        } else {
                                                            setSelectedUsers([]);
                                                        }
                                                    }}
                                                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">User</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Role</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Notes</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Joined</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUsers.includes(user.id)}
                                                        onChange={() => toggleUserSelection(user.id)}
                                                        className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                                                            <span className="text-brand-600 font-medium">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                            <p className="text-sm text-gray-500">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 ₹{getRoleBadgeColor(user.role)}`}
                                                    >
                                                        <option value="BUYER">Buyer</option>
                                                        <option value="SELLER">Seller</option>
                                                        <option value="ADMIN">Admin</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        {user.isVerified ? (
                                                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full w-fit">
                                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                                Verified
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full w-fit">
                                                                <XCircle className="w-3 h-3 mr-1" />
                                                                Unverified
                                                            </span>
                                                        )}
                                                        {user.isSellerVerified && (
                                                            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full w-fit">
                                                                <Shield className="w-3 h-3 mr-1" />
                                                                Seller Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        {user.totalNotes || 0} notes
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.totalSales || 0} sales
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            to={`/sellers/₹{user.id}`}
                                                            className="p-2 text-gray-400 hover:text-brand-500 transition-colors"
                                                            title="View Profile"
                                                        >
                                                            <Users className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                            title="Suspend User"
                                                        >
                                                            <UserX className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
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
                                    Showing {users.length} users
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
