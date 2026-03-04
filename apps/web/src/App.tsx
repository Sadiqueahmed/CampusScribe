import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar/Navbar';
import { Footer } from './components/common/Footer/Footer';
import { Sidebar } from './components/common/Sidebar/Sidebar';
import { AuthProvider, setClerkUser, setClerkSignedIn } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Browse } from './pages/Browse/Browse';
import { NoteDetails } from './pages/Notes/NoteDetails';
import { Cart } from './pages/Cart/Cart';
import { Checkout } from './pages/Checkout/Checkout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Messages } from './pages/Messages/Messages';
import { Conversation } from './pages/Messages/Conversation';
import { Wishlist } from './pages/Wishlist/Wishlist';
import { Profile } from './pages/Profile/Profile';
import { EditProfile } from './pages/Profile/EditProfile';
import { UploadNote } from './pages/Notes/UploadNote';
import { EditNote } from './pages/Notes/EditNote';
import { Trending } from './pages/Notes/Trending';
import { Featured } from './pages/Notes/Featured';
import { SellerDashboard } from './pages/Seller/SellerDashboard';
import { SalesHistory } from './pages/Seller/SalesHistory';
import { SellerProfile } from './pages/Seller/SellerProfile';
import { BecomeSeller } from './pages/Seller/BecomeSeller';
import { OrderHistory } from './pages/Orders/OrderHistory';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminUsers } from './pages/Admin/AdminUsers';
import { AdminNotes } from './pages/Admin/AdminNotes';
import { AdminAnalytics } from './pages/Admin/AdminAnalytics';
import CertificateCoursesPage from './pages/Courses/CertificateCoursesPage';
import { StudyMaterial } from './pages/StudyMaterial/StudyMaterial';
import { useState, useEffect } from 'react';

// Home component
import { HeroSection } from './components/home/HeroSection/HeroSection.tsx';
import { HowItWorks } from './components/home/HowItWorks/HowItWorks.tsx';
import { Testimonials } from './components/home/Testimonials/Testimonials.tsx';
import { FAQAccordion } from './components/home/FAQAccordion/FAQAccordion.tsx';
import { Link } from 'react-router-dom';
import { notesService } from './services/notes.service';
import { NoteCard } from './components/notes/NoteCard/NoteCard';
import { ArrowRight, BookOpen, TrendingUp, Star } from 'lucide-react';

// Get Clerk publishable key from environment
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_cHJvcGVyLXBlYWNvY2stNzIuY2xlcmsuYWNjb3VudHMuZGV2JA';

function Home() {
    const [featuredNotes, setFeaturedNotes] = useState<any[]>([]);
    const [trendingNotes, setTrendingNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const [featured, trending] = await Promise.all([
                    notesService.getFeaturedNotes(),
                    notesService.getTrendingNotes()
                ]);
                setFeaturedNotes(featured.slice(0, 6));
                setTrendingNotes(trending.slice(0, 4));
            } catch (error) {
                console.error('Failed to fetch notes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    return (
        <div className="relative min-h-[calc(100vh-4rem)] bg-white overflow-hidden">
            <HeroSection />
            
            {/* Featured Notes Section */}
            <div className="py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Featured Notes</h2>
                            <p className="text-gray-600 mt-1">Handpicked study materials by top sellers</p>
                        </div>
                        <Link to="/browse" className="hidden sm:flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium">
                            View All <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                    
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                        </div>
                    ) : featuredNotes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredNotes.map((note) => (
                                <NoteCard key={note.id} note={note} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No featured notes yet. Be the first to upload!</p>
                            <Link to="/notes/upload" className="mt-4 inline-block text-brand-600 font-medium hover:underline">
                                Upload Notes
                            </Link>
                        </div>
                    )}
                    
                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/browse" className="inline-flex items-center gap-2 text-brand-600 font-medium">
                            View All Notes <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Trending Notes Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                                <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
                            </div>
                            <p className="text-gray-600 mt-1">Most popular notes among students</p>
                        </div>
                        <Link to="/trending" className="hidden sm:flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium">
                            View All <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                    
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                        </div>
                    ) : trendingNotes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {trendingNotes.map((note) => (
                                <NoteCard key={note.id} note={note} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No trending notes yet.</p>
                        </div>
                    )}
                    
                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/trending" className="inline-flex items-center gap-2 text-brand-600 font-medium">
                            View All Trending <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            <HowItWorks />
            <Testimonials />
            <FAQAccordion />
        </div>
    );
}

// Component to sync Clerk user with AuthContext
function ClerkUserSync() {
    const { user, isSignedIn } = useUser();
    
    useEffect(() => {
        setClerkUser(user || null);
        setClerkSignedIn(!!isSignedIn);
    }, [user, isSignedIn]);
    
    return null;
}

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarPeek, setIsSidebarPeek] = useState(true);
    
    return (
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
            <AuthProvider>
                <ClerkUserSync />
                <CartProvider>
                    <Router>
                        <div className="min-h-screen font-sans bg-white selection:bg-brand-100 selection:text-brand-900">
                            {/* Navbar - Fixed at top */}
                            <div className="fixed top-0 left-0 right-0 z-50">
                                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
                            </div>
                            
                            {/* Sidebar - Peek on left (overlay, not pushing content) */}
                            <div 
                                className={`fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 ${isSidebarPeek ? 'w-16' : 'w-64'}`}
                                onMouseEnter={() => setIsSidebarPeek(false)}
                                onMouseLeave={() => setIsSidebarPeek(true)}
                            >
                                <Sidebar 
                                    isOpen={isSidebarOpen} 
                                    onClose={() => setIsSidebarOpen(false)}
                                    isPeek={isSidebarPeek}
                                />
                            </div>
                            
                            {/* Main Content - No sidebar offset (sidebar is overlay) */}
                            <main className="pt-16">
                                <Routes>
                                    <Route path="/" element={
                                        <>
                                            <Home />
                                            <Footer />
                                        </>
                                    } />
                                    <Route path="/browse" element={<Browse />} />
                                    <Route path="/certificate-courses" element={<CertificateCoursesPage />} />
                                    <Route path="/study-material" element={<StudyMaterial />} />
                                    <Route path="/notes/:id" element={<NoteDetails />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/messages" element={<Messages />} />
                                    <Route path="/messages/:id" element={<Conversation />} />
                                    <Route path="/wishlist" element={<Wishlist />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/profile/edit" element={<EditProfile />} />
                                    <Route path="/notes/upload" element={<UploadNote />} />
                                    <Route path="/notes/:id/edit" element={<EditNote />} />
                                    <Route path="/trending" element={<Trending />} />
                                    <Route path="/featured" element={<Featured />} />
                                    <Route path="/seller/dashboard" element={<SellerDashboard />} />
                                    <Route path="/seller/sales" element={<SalesHistory />} />
                                    <Route path="/sellers/:id" element={<SellerProfile />} />
                                    <Route path="/seller/become" element={<BecomeSeller />} />
                                    <Route path="/orders" element={<OrderHistory />} />
                                    <Route path="/admin" element={<AdminDashboard />} />
                                    <Route path="/admin/users" element={<AdminUsers />} />
                                    <Route path="/admin/notes" element={<AdminNotes />} />
                                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                                </Routes>
                            </main>
                        </div>
                    </Router>
                </CartProvider>
            </AuthProvider>
        </ClerkProvider>
    );
}

export default App;
