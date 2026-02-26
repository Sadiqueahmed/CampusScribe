import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    User, 
    Mail, 
    University, 
    Camera,
    Loader2,
    ArrowLeft
} from 'lucide-react';
import { userService } from '../../services/user.service';
import { Button } from '../../components/common/Button/Button';

export const EditProfile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        university: '',
        avatar: ''
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const profile = await userService.getProfile();
            setFormData({
                name: profile.name || '',
                email: profile.email || '',
                bio: profile.bio || '',
                university: profile.university || '',
                avatar: profile.avatar || ''
            });
        } catch (error) {
            console.error('Failed to load profile:', error);
            setError('Failed to load profile data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');
        setSuccess('');

        try {
            await userService.updateProfile({
                name: formData.name,
                bio: formData.bio,
                university: formData.university
            });
            setSuccess('Profile updated successfully!');
            setTimeout(() => navigate('/profile'), 1500);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type and size
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            const result = await userService.uploadAvatar(file);
            setFormData(prev => ({ ...prev, avatar: result.avatarUrl }));
            setSuccess('Avatar updated successfully!');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to upload avatar');
        } finally {
            setIsUploading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button 
                        onClick={() => navigate('/profile')}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                        {success}
                    </div>
                )}

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center mb-8">
                        <div 
                            onClick={handleAvatarClick}
                            className="relative h-32 w-32 rounded-full overflow-hidden cursor-pointer group"
                        >
                            {formData.avatar ? (
                                <img 
                                    src={formData.avatar} 
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-brand-100 flex items-center justify-center">
                                    <User className="h-16 w-16 text-brand-600" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                {isUploading ? (
                                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                                ) : (
                                    <Camera className="h-8 w-8 text-white" />
                                )}
                            </div>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <p className="text-sm text-gray-500 mt-2">Click to change avatar</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                    placeholder="Your full name"
                                />
                            </div>
                        </div>

                        {/* Email (read-only) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>

                        {/* University */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                University
                            </label>
                            <div className="relative">
                                <University className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                    placeholder="Your university"
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                placeholder="Tell us about yourself, your expertise, and what you study..."
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.bio.length}/500 characters
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/profile')}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isSaving}
                                className="flex-1"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
