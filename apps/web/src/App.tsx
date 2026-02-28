import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/common/Navbar/Navbar';
import { Footer } from './components/common/Footer/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
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
import { OrderHistory } from './pages/Orders/OrderHistory';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminUsers } from './pages/Admin/AdminUsers';
import { AdminNotes } from './pages/Admin/AdminNotes';
import { AdminAnalytics } from './pages/Admin/AdminAnalytics';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Home component with enhanced sections from studigoo.com
import { HeroSection } from './components/home/HeroSection/HeroSection.tsx';
import { HowItWorks } from './components/home/HowItWorks/HowItWorks.tsx';
import { Testimonials } from './components/home/Testimonials/Testimonials.tsx';
import { FAQAccordion } from './components/home/FAQAccordion/FAQAccordion.tsx';

function Home() {
    return (
        <div className="relative min-h-[calc(100vh-4rem)] bg-white overflow-hidden">
            {/* Hero Section with Feature Cards (like studigoo.com) */}
            <HeroSection />
            
            {/* How It Works Section */}
            <HowItWorks />
            
            {/* Testimonials Section */}
            <Testimonials />
            
            {/* FAQ Section */}
            <FAQAccordion />
        </div>
    );
}

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
            <AuthProvider>
                <CartProvider>
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
                                <Route path="/orders" element={<OrderHistory />} />
                                <Route path="/admin" element={<AdminDashboard />} />
                                <Route path="/admin/users" element={<AdminUsers />} />
                                <Route path="/admin/notes" element={<AdminNotes />} />
                                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </Router>
                </CartProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
