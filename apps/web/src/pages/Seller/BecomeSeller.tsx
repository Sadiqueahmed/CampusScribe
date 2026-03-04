import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Store, 
    CheckCircle, 
    ArrowLeft,
    Eye,
    EyeOff,
    Shield,
    Loader2,
    User,
    Home,
    MapPin,
    DollarSign,
    TrendingUp,
    Users,
    Award,
    Globe,
    Lock,
    Mail,
    Phone,
    LockOpen,
    Building,
    CreditCard,
    ArrowRight,
    Check,
    Star
} from 'lucide-react';
import { Button } from '../../components/common/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/user.service';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    shopName: string;
    shopUrl: string;
    street: string;
    street2: string;
    city: string;
    postCode: string;
    country: string;
    state: string;
    agreeTerms: boolean;
    newsletter: boolean;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    shopName?: string;
    shopUrl?: string;
    street?: string;
    city?: string;
    postCode?: string;
    country?: string;
    agreeTerms?: string;
}

const benefits = [
    { icon: <DollarSign className="w-5 h-5" />, text: "Keep 85-90% of every sale" },
    { icon: <Users className="w-5 h-5" />, text: "Access to 50,000+ students" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Real-time sales analytics" },
    { icon: <Award className="w-5 h-5" />, text: "Seller verification badge" },
];

const countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'IN', name: 'India' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'BR', name: 'Brazil' },
    { code: 'MX', name: 'Mexico' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'SG', name: 'Singapore' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'KE', name: 'Kenya' },
];

export function BecomeSeller() {
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        shopName: '',
        shopUrl: '',
        street: '',
        street2: '',
        city: '',
        postCode: '',
        country: '',
        state: '',
        agreeTerms: false,
        newsletter: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Auto-generate shop URL from shop name
        if (name === 'shopName') {
            const url = value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
            setFormData(prev => ({ ...prev, shopUrl: url }));
        }
        
        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (!formData.shopName.trim()) newErrors.shopName = 'Shop name is required';
        if (!formData.shopUrl.trim()) newErrors.shopUrl = 'Shop URL is required';
        if (!formData.street.trim()) newErrors.street = 'Street address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.postCode.trim()) newErrors.postCode = 'Post/ZIP code is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the Terms & Conditions';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            setIsLoading(true);
            await userService.requestVerification();
            setStep(4); // Success step
        } catch (error) {
            console.error('Failed to create store:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Success state
    if (step === 4) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-14 w-14 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            🎉 Welcome to CampusScribe!
                        </h1>
                        <p className="text-gray-600 mb-6 text-lg">
                            Your store <strong>"{formData.shopName}"</strong> has been created successfully!
                        </p>
                        
                        <div className="bg-gradient-to-r from-brand-500 to-pink-500 rounded-2xl p-6 mb-8 text-white">
                            <p className="font-medium mb-2">Your Store URL:</p>
                            <p className="text-2xl font-bold">studigoo.com/store/{formData.shopUrl}</p>
                        </div>

                        <div className="space-y-3 text-left mb-8">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <Check className="w-5 h-5 text-green-600" />
                                <span>Application submitted for review</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <Check className="w-5 h-5 text-green-600" />
                                <span>You'll be notified within 24-48 hours</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <Check className="w-5 h-5 text-green-600" />
                                <span>Start preparing your notes for upload</span>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => navigate('/dashboard')} variant="outline">
                                Go to Dashboard
                            </Button>
                            <Button onClick={() => navigate('/notes/upload')}>
                                Upload Your First Note
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-pink-500 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6">
                        <Store className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Create Your Free Store
                    </h1>
                    <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
                        Start selling your study materials and earn up to 90% commission on every sale
                    </p>
                    
                    {/* Benefits */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="flex justify-center mb-2">{benefit.icon}</div>
                                <p className="text-sm font-medium">{benefit.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
                    <div className="flex items-center justify-between">
                        {[
                            { num: 1, label: 'Account' },
                            { num: 2, label: 'Shop' },
                            { num: 3, label: 'Address' },
                        ].map((s, i) => (
                            <div key={s.num} className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                                    step >= s.num 
                                        ? 'bg-brand-500 text-white' 
                                        : 'bg-gray-200 text-gray-500'
                                }`}>
                                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                                </div>
                                <span className={`ml-2 font-medium ${step >= s.num ? 'text-brand-600' : 'text-gray-400'}`}>
                                    {s.label}
                                </span>
                                {i < 2 && (
                                    <div className={`w-16 md:w-24 h-1 mx-4 rounded ${
                                        step > s.num ? 'bg-brand-500' : 'bg-gray-200'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Step 1: Account Information */}
                    {step === 1 && (
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                                    <User className="h-6 w-6 text-brand-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
                                    <p className="text-gray-500">Create your seller account</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                                errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                            placeholder="John"
                                        />
                                    </div>
                                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                                errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                            placeholder="Doe"
                                        />
                                    </div>
                                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                                errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        {showPassword ? <LockOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /> : <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />}
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-14 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                                errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                            placeholder="At least 8 characters"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <Button type="button" onClick={() => setStep(2)} className="px-8">
                                    Next Step <ArrowRight className="ml-2 w-5 h-5 inline" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Shop Information */}
                    {step === 2 && (
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                                    <Store className="h-6 w-6 text-brand-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Shop Information</h2>
                                    <p className="text-gray-500">Set up your online store</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Shop Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="shopName"
                                            value={formData.shopName}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                                errors.shopName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                            placeholder="John's Notes Store"
                                        />
                                    </div>
                                    {errors.shopName && <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Shop URL <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="shopUrl"
                                            value={formData.shopUrl}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                                errors.shopUrl ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                            placeholder="your-store-name"
                                        />
                                    </div>
                                    {errors.shopUrl && <p className="text-red-500 text-sm mt-1">{errors.shopUrl}</p>}
                                    <p className="text-gray-500 text-sm mt-2">
                                        Your store: <span className="text-brand-600 font-medium">studigoo.com/store/{formData.shopUrl || 'your-store'}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Preview Card */}
                            <div className="mt-8 p-6 bg-gradient-to-br from-brand-50 to-pink-50 rounded-2xl border-2 border-brand-100">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-brand-500" /> Your Store Preview
                                </h3>
                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center">
                                            <Store className="h-8 w-8 text-brand-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{formData.shopName || 'Your Shop Name'}</h4>
                                            <p className="text-sm text-gray-500">studigoo.com/store/{formData.shopUrl || 'your-store'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <Button type="button" onClick={() => setStep(1)} variant="outline">
                                    <ArrowLeft className="mr-2 w-5 h-5 inline" /> Back
                                </Button>
                                <Button type="button" onClick={() => setStep(3)}>
                                    Next Step <ArrowRight className="ml-2 w-5 h-5 inline" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Address */}
                    {step === 3 && (
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-brand-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Business Address</h2>
                                    <p className="text-gray-500">Where should we send your payments?</p>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Street Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                            errors.street ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                        }`}
                                        placeholder="123 Main Street"
                                    />
                                    {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Apartment, Suite, etc. <span className="text-gray-400">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="street2"
                                        value={formData.street2}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                        placeholder="Apt 4B"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                                errors.city ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                            placeholder="New York"
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Post/ZIP Code <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="postCode"
                                            value={formData.postCode}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                                errors.postCode ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                            placeholder="10001"
                                        />
                                        {errors.postCode && <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                                                errors.country ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map(country => (
                                                <option key={country.code} value={country.code}>{country.name}</option>
                                            ))}
                                        </select>
                                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            State/Province <span className="text-gray-400">(optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                            placeholder="New York"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                                <div className="flex items-start gap-3 mb-4">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        id="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleChange}
                                        className="mt-1 w-5 h-5 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                                    />
                                    <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                                        I agree to the <a href="#" className="text-brand-600 font-semibold hover:underline">Terms & Conditions</a> and <a href="#" className="text-brand-600 font-semibold hover:underline">Privacy Policy</a>.
                                    </label>
                                </div>
                                {errors.agreeTerms && <p className="text-red-500 text-sm mb-4">{errors.agreeTerms}</p>}
                                
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        name="newsletter"
                                        id="newsletter"
                                        checked={formData.newsletter}
                                        onChange={handleChange}
                                        className="mt-1 w-5 h-5 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                                    />
                                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                                        Yes, I want to receive tips and updates about selling on CampusScribe via email.
                                    </label>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500 flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    This site is protected by reCAPTCHA and the Google Privacy Policy apply.
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <Button type="button" onClick={() => setStep(2)} variant="outline">
                                    <ArrowLeft className="mr-2 w-5 h-5 inline" /> Back
                                </Button>
                                <Button type="submit" disabled={isLoading} className="px-8">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 w-5 h-5 inline animate-spin" />
                                            Creating Store...
                                        </>
                                    ) : (
                                        <>
                                            Create My Store <CheckCircle className="ml-2 w-5 h-5 inline" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>

                <p className="text-center text-gray-500 mt-8 pb-8">
                    Already have an account?{' '}
                    <Link to="/login" className="text-brand-600 font-semibold hover:underline">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );
}
