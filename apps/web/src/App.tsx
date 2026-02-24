import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Browse } from './pages/Browse/Browse';
import { NoteDetails } from './pages/Notes/NoteDetails';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ShieldCheck, TrendingUp, Users, Calculator, Microscope, Palette, Briefcase } from 'lucide-react';
import heroImage from './assets/study.png';

// Simplified layout for early phase
function Home() {
    return (
        <div className="relative min-h-[calc(100vh-4rem)] bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pb-40 lg:pt-32 px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-16">
                    {/* Text Content */}
                    <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left flex flex-col justify-center mb-12 lg:mb-0 z-10">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl mb-6">
                            Ace your exams with <span className="text-brand-500 whitespace-nowrap">top-tier</span><br />study notes
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl sm:mx-auto lg:mx-0">
                            The ultimate marketplace to buy and sell authentic class notes, study guides, and flashcards from top students at your university.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                            <button className="w-full sm:w-auto px-8 py-3.5 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 text-lg">
                                Start Browsing
                            </button>
                            <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-900 border-2 border-gray-200 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all text-lg shadow-sm">
                                Become a Seller
                            </button>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="relative lg:col-span-6 flex items-center justify-center lg:justify-end">
                        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                            {/* Decorative background blob */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand-100 to-pink-50 opacity-50 blur-2xl"></div>

                            <img
                                src={heroImage}
                                alt="Student studying with notes"
                                className="relative z-10 w-full drop-shadow-2xl object-contain animate-fade-in-up"
                                style={{ maxHeight: '600px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Banners */}
            <div className="bg-brand-50 border-y border-brand-100 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-brand-500">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Highest Commission</h3>
                                <p className="text-sm text-gray-600">Sell at 90% Commission</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-brand-500">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Secure Payments</h3>
                                <p className="text-sm text-gray-600">Encrypted & Instant Withdrawals</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-brand-500">
                                <Users size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Verified Material</h3>
                                <p className="text-sm text-gray-600">Quality checked by Top Students</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Hubs */}
            <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Explore Course Hubs</h2>
                    <p className="mt-4 text-lg text-gray-600">Find specialized notes for your specific field of study.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: 'Engineering & CS', icon: <Calculator size={32} />, color: 'bg-blue-50 text-blue-600', link: '/browse?category=engineering' },
                        { title: 'Science Stream', icon: <Microscope size={32} />, color: 'bg-emerald-50 text-emerald-600', link: '/browse?category=science' },
                        { title: 'Arts & Humanities', icon: <Palette size={32} />, color: 'bg-rose-50 text-rose-600', link: '/browse?category=arts' },
                        { title: 'Business & Finance', icon: <Briefcase size={32} />, color: 'bg-purple-50 text-purple-600', link: '/browse?category=business' }
                    ].map((hub, idx) => (
                        <a key={idx} href={hub.link} className="group relative flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                            <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${hub.color} transition-transform group-hover:scale-110`}>
                                {hub.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{hub.title}</h3>
                            <button className="mt-4 text-sm font-semibold text-brand-500 opacity-0 transition-opacity group-hover:opacity-100">
                                View Notes →
                            </button>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
            <AuthProvider>
                <Router>
                    <div className="min-h-screen font-sans bg-white selection:bg-brand-100 selection:text-brand-900">
                        <Navbar />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/browse" element={<Browse />} />
                                <Route path="/notes/:id" element={<NoteDetails />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Routes>
                        </main>
                    </div>
                </Router>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
