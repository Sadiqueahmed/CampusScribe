import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Browse } from './pages/Browse/Browse';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
