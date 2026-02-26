import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    User, 
    Mail, 
    University, 
    Award, 
    Star, 
    FileText, 
    Calendar,
    Edit,
    CheckCircle
} from 'lucide-react';
import { userService } from '../../services/user.service';
import { reviewService, ReviewStats } from '../../services/review.service';
import { StarRating } from '../../components/common/StarRating/StarRating';
import { Button } from '../../components/common/Button/Button';

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
                            
                            {isOwnProfile && (
                                <Button 
                                    onClick={() => navigate('/profile/edit')}
                                    variant="outline"
                                    className="mb-2"
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Profile
                                </Button>
                            )}
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
