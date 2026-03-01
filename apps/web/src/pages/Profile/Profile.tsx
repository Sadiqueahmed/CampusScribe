import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
    User, 
    Mail, 
    University, 
    Award, 
    Star, 
    FileText, 
    Calendar,
    Edit,
    CheckCircle,
    LogOut,
    ShoppingBag,
    Download,
    MapPin,
    UserCog,
    Store,
    HeadphonesIcon,
    Heart,
    ChevronRight
} from 'lucide-react';
import { userService } from '../../services/user.service';
import { reviewService, ReviewStats } from '../../services/review.service';
import { StarRating } from '../../components/common/StarRating/StarRating';
import { Button } from '../../components/common/Button/Button';
import { useAuth } from '../../context/AuthContext';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    university?: string;
    role: string;
    isSellerVerified: boolean;
    sellerVerifiedAt?: string;
    createdAt: string;
    _count?: {
        notes: number;
        reviews: number;
    };
}

export const Profile = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const { logout } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    useEffect(() => {
        loadProfile();
    }, [userId]);

    const loadProfile = async () => {
        try {
            let profileData;
            if (userId) {
                profileData = await userService.getPublicProfile(userId);
            } else {
                profileData = await userService.getProfile();
                setIsOwnProfile(true);
            }
            setProfile(profileData);

            // Load review stats if user is a seller
            if (profileData.role === 'SELLER' || profileData.role === 'ADMIN') {
                try {
                    const stats = await reviewService.getSellerReviews(profileData.id);
                    setReviewStats(stats.stats);
                } catch (error) {
                    console.error('Failed to load review stats:', error);
                }
            }
        } catch (error) {
            console.error('Failed to load profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Profile not found</h2>
                </div>
            </div>
        );
    }

    // If viewing own profile, show dashboard layout
    if (isOwnProfile) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Greeting */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Hello {profile.name}!
                        </h1>
                        <p className="text-gray-600 mt-1">
                            From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Account Menu Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center">
                                            {profile.avatar ? (
                                                <img 
                                                    src={profile.avatar} 
                                                    alt={profile.name}
                                                    className="h-full w-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-xl font-bold text-brand-600">
                                                    {profile.name.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{profile.name}</p>
                                            <p className="text-sm text-gray-500">{profile.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <nav className="py-2">
                                    <MenuItem 
                                        icon={<ShoppingBag className="h-5 w-5" />} 
                                        label="Orders" 
                                        to="/orders"
                                    />
                                    <MenuItem 
                                        icon={<Download className="h-5 w-5" />} 
                                        label="Downloads" 
                                        to="/downloads"
                                    />
                                    <MenuItem 
                                        icon={<MapPin className="h-5 w-5" />} 
                                        label="Addresses" 
                                        to="/addresses"
                                    />
                                    <MenuItem 
                                        icon={<UserCog className="h-5 w-5" />} 
                                        label="Account details" 
                                        to="/profile/edit"
                                    />
                                    <MenuItem 
                                        icon={<Store className="h-5 w-5" />} 
                                        label="Vendors" 
                                        to="/vendors"
                                    />
                                    <MenuItem 
                                        icon={<HeadphonesIcon className="h-5 w-5" />} 
                                        label="Seller Support Tickets" 
                                        to="/support"
                                    />
                                    <MenuItem 
                                        icon={<Heart className="h-5 w-5" />} 
                                        label="Wishlist" 
                                        to="/wishlist"
                                    />
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-brand-100 rounded-lg">
                                            <ShoppingBag className="h-6 w-6 text-brand-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">0</p>
                                            <p className="text-sm text-gray-600">Orders</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-green-100 rounded-lg">
                                            <Download className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">0</p>
                                            <p className="text-sm text-gray-600">Downloads</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-red-100 rounded-lg">
                                            <Heart className="h-6 w-6 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">0</p>
                                            <p className="text-sm text-gray-600">Wishlist</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">Account Details</h2>
                                    <Button 
                                        onClick={() => navigate('/profile/edit')}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                        <p className="text-gray-900">{profile.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                        <p className="text-gray-900">{profile.email}</p>
                                    </div>
                                    {profile.university && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">University</label>
                                            <p className="text-gray-900">{profile.university}</p>
                                        </div>
                                    )}
                                    {profile.bio && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Bio</label>
                                            <p className="text-gray-900">{profile.bio}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                                        <p className="text-gray-900">
                                            {new Date(profile.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Become a Seller */}
                            {!profile.isSellerVerified && profile.role === 'BUYER' && (
                                <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg shadow-sm p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">Become a Seller</h3>
                                            <p className="text-brand-100 mt-1">Start selling your notes and earn money</p>
                                        </div>
                                        <Button 
                                            onClick={() => navigate('/seller/become')}
                                            className="bg-white text-brand-600 hover:bg-gray-100"
                                        >
                                            Start Selling
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Public profile view (not own profile)
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="h-32 bg-gradient-to-r from-brand-500 to-brand-600"></div>
                    <div className="px-6 pb-6">
                        <div className="relative flex justify-between items-end -mt-12 mb-4">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full bg-white p-1">
                                    {profile.avatar ? (
                                        <img 
                                            src={profile.avatar} 
                                            alt={profile.name}
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full rounded-full bg-brand-100 flex items-center justify-center text-3xl font-bold text-brand-600">
                                            {profile.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                {profile.isSellerVerified && (
                                    <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
                                        <CheckCircle className="h-5 w-5" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    profile.role === 'SELLER' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {profile.role}
                                </span>
                            </div>
                            
                            {profile.isSellerVerified && (
                                <p className="text-blue-600 font-medium flex items-center gap-1 mb-2">
                                    <Award className="h-4 w-4" />
                                    Verified Seller since {new Date(profile.sellerVerifiedAt!).toLocaleDateString()}
                                </p>
                            )}

                            {profile.bio && (
                                <p className="text-gray-600 mt-3">{profile.bio}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium text-gray-900">{profile.email}</p>
                                </div>
                            </div>
                            
                            {profile.university && (
                                <div className="flex items-center gap-3">
                                    <University className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">University</p>
                                        <p className="font-medium text-gray-900">{profile.university}</p>
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Member Since</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(profile.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats for Sellers */}
                {(profile.role === 'SELLER' || profile.role === 'ADMIN') && reviewStats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Star className="h-8 w-8 text-yellow-500" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {reviewStats.averageRating.toFixed(1)}
                                    </p>
                                    <p className="text-sm text-gray-600">Average Rating</p>
                                </div>
                            </div>
                            <StarRating rating={Math.round(reviewStats.averageRating)} />
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-3">
                                <FileText className="h-8 w-8 text-brand-500" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {profile._count?.notes || 0}
                                    </p>
                                    <p className="text-sm text-gray-600">Notes Published</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-3">
                                <User className="h-8 w-8 text-green-500" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {reviewStats.totalReviews}
                                    </p>
                                    <p className="text-sm text-gray-600">Total Reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Rating Distribution */}
                {reviewStats && reviewStats.ratingDistribution && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((rating) => {
                                const count = reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution] || 0;
                                const percentage = reviewStats.totalReviews > 0 
                                    ? (count / reviewStats.totalReviews) * 100 
                                    : 0;
                                
                                return (
                                    <div key={rating} className="flex items-center gap-3">
                                        <span className="w-8 font-medium text-gray-700">{rating} ★</span>
                                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-yellow-400 rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="w-12 text-right text-sm text-gray-600">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Menu Item Component
function MenuItem({ icon, label, to, onClick }: { icon: React.ReactNode; label: string; to?: string; onClick?: () => void }): React.ReactNode {
    const content = (
        <div className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            {icon}
            <span className="font-medium flex-1">{label}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
    );

    if (to) {
        return <Link to={to}>{content}</Link>;
    }

    return <button onClick={onClick} className="w-full">{content}</button>;
}
