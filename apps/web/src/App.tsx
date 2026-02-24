import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Browse } from './pages/Browse/Browse';

// Simplified layout for early phase
function Home() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
                    Ace your exams with <span className="text-brand-500">top-tier</span> study notes
                </h1>
                <p className="mt-4 text-xl leading-8 text-gray-600 mb-8">
                    The marketplace to buy and sell authentic class notes, study guides, and flashcards from top students at your university.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-3 bg-brand-500 text-white rounded-md font-medium hover:bg-brand-600 shadow-sm transition-colors text-lg">
                        Start Browsing
                    </button>
                    <button className="w-full sm:w-auto px-8 py-3 bg-white text-gray-900 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors text-lg shadow-sm">
                        Become a Seller
                    </button>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
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
    );
}

export default App;
