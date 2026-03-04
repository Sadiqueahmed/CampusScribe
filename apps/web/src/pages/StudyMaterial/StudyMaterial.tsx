import { useState } from 'react';
import { BookOpen, GraduationCap, ArrowRight, Search, Filter, Star, Users, Download, ChevronDown, ChevronRight, School, University, Book, Calculator, FlaskConical, Globe, History, Music, Palette, Code, Heart, Briefcase, Scale, Stethoscope, Cpu, Calculator as CalcIcon, Building2, FlaskRound, Microscope, Utensils, Mic, Building, Landmark, Clock, Award, Target, TrendingUp, CheckCircle, Calendar, FileText, PlayCircle, Sparkles, Zap, Shield, Laptop, Leaf, Palmtree, Plane, Upload } from 'lucide-react';

// School Data by Class
const schoolClasses = [
    { id: 1, name: 'Class 1', subjects: ['English', 'Mathematics', 'General Awareness', 'Hindi', 'EVS'] },
    { id: 2, name: 'Class 2', subjects: ['English', 'Mathematics', 'General Awareness', 'Hindi', 'EVS'] },
    { id: 3, name: 'Class 3', subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'GK'] },
    { id: 4, name: 'Class 4', subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'GK'] },
    { id: 5, name: 'Class 5', subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'GK'] },
    { id: 6, name: 'Class 6', subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Sanskrit'] },
    { id: 7, name: 'Class 7', subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Sanskrit'] },
    { id: 8, name: 'Class 8', subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Sanskrit'] },
    { id: 9, name: 'Class 9', subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Sanskrit'] },
    { id: 10, name: 'Class 10', subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Sanskrit'] },
    { id: 11, name: 'Class 11 (Science)', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'] },
    { id: 12, name: 'Class 11 (Commerce)', subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'] },
    { id: 13, name: 'Class 11 (Arts)', subjects: ['History', 'Political Science', 'Economics', 'English', 'Geography'] },
    { id: 14, name: 'Class 12 (Science)', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'] },
    { id: 15, name: 'Class 12 (Commerce)', subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'] },
    { id: 16, name: 'Class 12 (Arts)', subjects: ['History', 'Political Science', 'Economics', 'English', 'Geography'] },
];

// Competitive Exams
const competitiveExams = [
    { id: 1, name: 'JEE Main & Advanced', icon: Calculator, category: 'Engineering', seats: '23 Lakhs+' },
    { id: 2, name: 'NEET (UG)', icon: Stethoscope, category: 'Medical', seats: '20 Lakhs+' },
    { id: 3, name: 'CAT', icon: Briefcase, category: 'Management', seats: '2.5 Lakhs+' },
    { id: 4, name: 'GATE', icon: Cpu, category: 'Engineering', seats: '8 Lakhs+' },
    { id: 5, name: 'UPSC CSE', icon: Building, category: 'Civil Services', seats: '10 Lakhs+' },
    { id: 6, name: 'CLAT', icon: Scale, category: 'Law', seats: '60,000+' },
    { id: 7, name: 'NATA', icon: Palette, category: 'Architecture', seats: '30,000+' },
    { id: 8, name: 'JEE Mains', icon: Calculator, category: 'Engineering', seats: '23 Lakhs+' },
    { id: 9, name: 'CMAT', icon: Briefcase, category: 'Management', seats: '75,000+' },
    { id: 10, name: 'SSC CGL', icon: Building, category: 'Government', seats: '45 Lakhs+' },
    { id: 11, name: 'Bank PO', icon: Calculator, category: 'Banking', seats: '15 Lakhs+' },
    { id: 12, name: 'Railway NTPC', icon: Plane, category: 'Government', seats: '30 Lakhs+' },
];

// University Schools (enhanced with duration and eligibility)
const universitySchools = [
    {
        id: 'engineering',
        name: 'School of Engineering & Technology',
        icon: Cpu,
        color: 'from-blue-500 to-cyan-500',
        courses: [
            { name: 'B.Tech in Computer Science & Engineering', duration: '4 Years', eligibility: '12th with PCM', type: 'UG', fees: '₹2-8L' },
            { name: 'B.Tech in Information Technology', duration: '4 Years', eligibility: '12th with PCM', type: 'UG', fees: '₹2-6L' },
            { name: 'B.Tech in Electronics & Communication', duration: '4 Years', eligibility: '12th with PCM', type: 'UG', fees: '₹2-7L' },
            { name: 'B.Tech in Electrical Engineering', duration: '4 Years', eligibility: '12th with PCM', type: 'UG', fees: '₹2-6L' },
            { name: 'B.Tech in Mechanical Engineering', duration: '4 Years', eligibility: '12th with PCM', type: 'UG', fees: '₹2-7L' },
            { name: 'B.Tech in Civil Engineering', duration: '4 Years', eligibility: '12th with PCM', type: 'UG', fees: '₹2-6L' },
            { name: 'B.Tech in Data Science', duration: '4 Years', eligibility: '12th with PCM', type: 'UG', fees: '₹3-10L' },
            { name: 'B.Tech in Artificial Intelligence & ML', duration: '4 Years', eligibility: '12th with PCM', type: 'UG', fees: '₹3-12L' },
            { name: 'B.Tech in Cyber Security', duration: '4 Years', eligibility: '12th with PCM', type: 'UG', fees: '₹3-8L' },
            { name: 'M.Tech in Computer Science', duration: '2 Years', eligibility: 'B.Tech', type: 'PG', fees: '₹1-4L' },
            { name: 'M.Tech in VLSI Design', duration: '2 Years', eligibility: 'B.Tech', type: 'PG', fees: '₹1-3L' },
            { name: 'Ph.D in Engineering', duration: '3-5 Years', eligibility: 'M.Tech', type: 'PhD', fees: '₹50K-2L' },
        ]
    },
    {
        id: 'management',
        name: 'School of Management Studies',
        icon: Briefcase,
        color: 'from-purple-500 to-pink-500',
        courses: [
            { name: 'MBA in General Management', duration: '2 Years', eligibility: 'Graduation', type: 'PG', fees: '₹2-25L' },
            { name: 'MBA in Finance Management', duration: '2 Years', eligibility: 'Graduation', type: 'PG', fees: '₹2-20L' },
            { name: 'MBA in Marketing Management', duration: '2 Years', eligibility: 'Graduation', type: 'PG', fees: '₹2-18L' },
            { name: 'MBA in Human Resources', duration: '2 Years', eligibility: 'Graduation', type: 'PG', fees: '₹2-15L' },
            { name: 'MBA in Business Analytics', duration: '2 Years', eligibility: 'Graduation', type: 'PG', fees: '₹3-20L' },
            { name: 'MBA in Digital Marketing', duration: '2 Years', eligibility: 'Graduation', type: 'PG', fees: '₹2-12L' },
            { name: 'BBA in General', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹1-8L' },
            { name: 'BBA in Hospitality', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹1-5L' },
            { name: 'Executive MBA', duration: '1 Year', eligibility: 'Work Experience', type: 'PG', fees: '₹5-30L' },
            { name: 'M.Com', duration: '2 Years', eligibility: 'B.Com', type: 'PG', fees: '₹50K-3L' },
        ]
    },
    {
        id: 'sciences',
        name: 'School of Sciences',
        icon: FlaskConical,
        color: 'from-green-500 to-emerald-500',
        courses: [
            { name: 'B.Sc in Physics', duration: '3 Years', eligibility: '12th with Science', type: 'UG', fees: '₹50K-3L' },
            { name: 'B.Sc in Chemistry', duration: '3 Years', eligibility: '12th with Science', type: 'UG', fees: '₹50K-3L' },
            { name: 'B.Sc in Mathematics', duration: '3 Years', eligibility: '12th with Math', type: 'UG', fees: '₹50K-2.5L' },
            { name: 'B.Sc in Biology', duration: '3 Years', eligibility: '12th with Bio', type: 'UG', fees: '₹50K-3L' },
            { name: 'B.Sc in Biotechnology', duration: '3 Years', eligibility: '12th with Science', type: 'UG', fees: '₹1-5L' },
            { name: 'B.Sc in Microbiology', duration: '3 Years', eligibility: '12th with Science', type: 'UG', fees: '₹1-4L' },
            { name: 'M.Sc in Physics', duration: '2 Years', eligibility: 'B.Sc Physics', type: 'PG', fees: '₹50K-3L' },
            { name: 'M.Sc in Chemistry', duration: '2 Years', eligibility: 'B.Sc Chemistry', type: 'PG', fees: '₹50K-3L' },
            { name: 'M.Sc in Biotechnology', duration: '2 Years', eligibility: 'B.Sc Biotech', type: 'PG', fees: '₹1-4L' },
            { name: 'Ph.D in Sciences', duration: '3-5 Years', eligibility: 'M.Sc', type: 'PhD', fees: '₹50K-2L' },
        ]
    },
    {
        id: 'pharmacy',
        name: 'School of Pharmacy',
        icon: Stethoscope,
        color: 'from-red-500 to-orange-500',
        courses: [
            { name: 'B.Pharm', duration: '4 Years', eligibility: '12th with PCB/PCM', type: 'UG', fees: '₹1-8L' },
            { name: 'M.Pharm in Pharmaceutics', duration: '2 Years', eligibility: 'B.Pharm', type: 'PG', fees: '₹1-5L' },
            { name: 'M.Pharm in Pharmacology', duration: '2 Years', eligibility: 'B.Pharm', type: 'PG', fees: '₹1-5L' },
            { name: 'M.Pharm in Quality Assurance', duration: '2 Years', eligibility: 'B.Pharm', type: 'PG', fees: '₹1-4L' },
            { name: 'D.Pharm', duration: '2 Years', eligibility: '12th', type: 'Diploma', fees: '₹50K-2L' },
            { name: 'Ph.D in Pharmacy', duration: '3-5 Years', eligibility: 'M.Pharm', type: 'PhD', fees: '₹50K-2L' },
        ]
    },
    {
        id: 'law',
        name: 'School of Law',
        icon: Scale,
        color: 'from-amber-500 to-yellow-500',
        courses: [
            { name: 'LLB (3 Years)', duration: '3 Years', eligibility: 'Graduation', type: 'PG', fees: '₹1-10L' },
            { name: 'LLB (5 Years - Integrated)', duration: '5 Years', eligibility: '12th', type: 'UG', fees: '₹2-15L' },
            { name: 'LLM in Corporate Law', duration: '1-2 Years', eligibility: 'LLB', type: 'PG', fees: '₹1-5L' },
            { name: 'LLM in Criminal Law', duration: '1-2 Years', eligibility: 'LLB', type: 'PG', fees: '₹1-4L' },
            { name: 'LLM in Constitutional Law', duration: '1-2 Years', eligibility: 'LLB', type: 'PG', fees: '₹1-4L' },
            { name: 'LLM in Intellectual Property Rights', duration: '1-2 Years', eligibility: 'LLB', type: 'PG', fees: '₹1-5L' },
            { name: 'Ph.D in Law', duration: '3-5 Years', eligibility: 'LLM', type: 'PhD', fees: '₹50K-2L' },
        ]
    },
    {
        id: 'arts',
        name: 'School of Arts & Humanities',
        icon: Book,
        color: 'from-pink-500 to-rose-500',
        courses: [
            { name: 'BA in English', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹30K-3L' },
            { name: 'BA in History', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹30K-2L' },
            { name: 'BA in Political Science', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹30K-2L' },
            { name: 'BA in Sociology', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹30K-2L' },
            { name: 'BA in Psychology', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹50K-3L' },
            { name: 'BA in Journalism & Mass Comm', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹1-6L' },
            { name: 'BA in Fashion Designing', duration: '3-4 Years', eligibility: '12th', type: 'UG', fees: '₹2-10L' },
            { name: 'MA in English', duration: '2 Years', eligibility: 'BA English', type: 'PG', fees: '₹30K-3L' },
            { name: 'MA in Political Science', duration: '2 Years', eligibility: 'BA Pol Sci', type: 'PG', fees: '₹30K-2L' },
        ]
    },
    {
        id: 'commerce',
        name: 'School of Commerce & Economics',
        icon: Calculator,
        color: 'from-indigo-500 to-blue-500',
        courses: [
            { name: 'B.Com (General)', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹30K-3L' },
            { name: 'B.Com (Hons)', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹50K-5L' },
            { name: 'B.Com (Computers)', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹50K-4L' },
            { name: 'BBA', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹1-8L' },
            { name: 'M.Com', duration: '2 Years', eligibility: 'B.Com', type: 'PG', fees: '₹40K-3L' },
            { name: 'CA Foundation', duration: '6-12 Months', eligibility: '12th', type: 'Certificate', fees: '₹10K-50K' },
            { name: 'CS Foundation', duration: '6-12 Months', eligibility: '12th', type: 'Certificate', fees: '₹10K-30K' },
        ]
    },
    {
        id: 'nursing',
        name: 'School of Nursing & Health Sciences',
        icon: Heart,
        color: 'from-rose-500 to-red-500',
        courses: [
            { name: 'B.Sc Nursing', duration: '4 Years', eligibility: '12th with PCB', type: 'UG', fees: '₹2-10L' },
            { name: 'GNM (General Nursing)', duration: '3.5 Years', eligibility: '12th', type: 'UG', fees: '₹1-4L' },
            { name: 'ANM (Auxiliary Nursing)', duration: '2 Years', eligibility: '12th', type: 'Diploma', fees: '₹50K-2L' },
            { name: 'B.Sc in Medical Lab Technology', duration: '3-4 Years', eligibility: '12th with Science', type: 'UG', fees: '₹1-5L' },
            { name: 'B.Sc in Radiology & Imaging', duration: '3 Years', eligibility: '12th with Science', type: 'UG', fees: '₹2-6L' },
            { name: 'B.Sc in Physiotherapy', duration: '4.5 Years', eligibility: '12th with PCB', type: 'UG', fees: '₹2-8L' },
            { name: 'M.Sc Nursing', duration: '2 Years', eligibility: 'B.Sc Nursing', type: 'PG', fees: '₹1-5L' },
            { name: 'Post Basic B.Sc Nursing', duration: '2 Years', eligibility: 'GNM', type: 'PG', fees: '₹1-3L' },
        ]
    },
    {
        id: 'computer',
        name: 'School of Computer Applications',
        icon: Laptop,
        color: 'from-slate-500 to-zinc-500',
        courses: [
            { name: 'BCA', duration: '3 Years', eligibility: '12th with Math', type: 'UG', fees: '₹1-6L' },
            { name: 'MCA', duration: '2-3 Years', eligibility: 'BCA/Graduation', type: 'PG', fees: '₹1-8L' },
            { name: 'B.Sc IT', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹1-5L' },
            { name: 'M.Sc IT', duration: '2 Years', eligibility: 'B.Sc IT', type: 'PG', fees: '₹1-4L' },
            { name: 'Diploma in Software Development', duration: '1 Year', eligibility: '12th', type: 'Diploma', fees: '₹50K-2L' },
            { name: 'Diploma in Web Development', duration: '6-12 Months', eligibility: '12th', type: 'Diploma', fees: '₹30K-1L' },
        ]
    },
    {
        id: 'agriculture',
        name: 'School of Agriculture & Allied Sciences',
        icon: Leaf,
        color: 'from-lime-500 to-green-500',
        courses: [
            { name: 'B.Sc in Agriculture', duration: '4 Years', eligibility: '12th with PCB/PCM', type: 'UG', fees: '₹1-6L' },
            { name: 'B.Sc in Horticulture', duration: '4 Years', eligibility: '12th with Science', type: 'UG', fees: '₹1-5L' },
            { name: 'B.Sc in Forestry', duration: '4 Years', eligibility: '12th with Science', type: 'UG', fees: '₹1-4L' },
            { name: 'B.V.Sc (Veterinary)', duration: '5.5 Years', eligibility: '12th with PCB', type: 'UG', fees: '₹2-15L' },
            { name: 'M.Sc in Agriculture', duration: '2 Years', eligibility: 'B.Sc Agriculture', type: 'PG', fees: '₹1-4L' },
            { name: 'Ph.D in Agriculture', duration: '3-5 Years', eligibility: 'M.Sc', type: 'PhD', fees: '₹50K-2L' },
        ]
    },
    {
        id: 'hotel',
        name: 'School of Hotel Management',
        icon: Utensils,
        color: 'from-orange-500 to-amber-500',
        courses: [
            { name: 'BHM (Bachelor of Hotel Management)', duration: '4 Years', eligibility: '12th', type: 'UG', fees: '₹2-10L' },
            { name: 'B.Sc in Hotel Management', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹2-8L' },
            { name: 'B.Sc in Tourism Management', duration: '3 Years', eligibility: '12th', type: 'UG', fees: '₹1-6L' },
            { name: 'Diploma in Hotel Management', duration: '1-2 Years', eligibility: '10th/12th', type: 'Diploma', fees: '₹50K-3L' },
            { name: 'Diploma in Culinary Arts', duration: '1 Year', eligibility: '10th/12th', type: 'Diploma', fees: '₹50K-2L' },
            { name: 'MHM (Master of Hotel Management)', duration: '2 Years', eligibility: 'BHM', type: 'PG', fees: '₹2-6L' },
        ]
    },
    {
        id: 'education',
        name: 'School of Education',
        icon: GraduationCap,
        color: 'from-teal-500 to-cyan-500',
        courses: [
            { name: 'B.Ed', duration: '2 Years', eligibility: 'Graduation', type: 'PG', fees: '₹50K-5L' },
            { name: 'M.Ed', duration: '2 Years', eligibility: 'B.Ed', type: 'PG', fees: '₹50K-3L' },
            { name: 'B.El.Ed', duration: '4 Years', eligibility: '12th', type: 'UG', fees: '₹1-4L' },
            { name: 'D.El.Ed', duration: '2 Years', eligibility: '12th', type: 'Diploma', fees: '₹30K-2L' },
            { name: 'B.A. B.Ed', duration: '4 Years', eligibility: '12th', type: 'UG', fees: '₹1-5L' },
            { name: 'B.Sc. B.Ed', duration: '4 Years', eligibility: '12th', type: 'UG', fees: '₹1-5L' },
        ]
    },
];

// Subject Icons mapping
const getSubjectIcon = (subject: string) => {
    const lowerSubject = subject.toLowerCase();
    if (lowerSubject.includes('math')) return <Calculator className="w-5 h-5" />;
    if (lowerSubject.includes('science') || lowerSubject.includes('physics') || lowerSubject.includes('chemistry') || lowerSubject.includes('biology')) return <FlaskConical className="w-5 h-5" />;
    if (lowerSubject.includes('english') || lowerSubject.includes('literature')) return <Book className="w-5 h-5" />;
    if (lowerSubject.includes('history') || lowerSubject.includes('social')) return <History className="w-5 h-5" />;
    if (lowerSubject.includes('geography')) return <Globe className="w-5 h-5" />;
    if (lowerSubject.includes('music')) return <Music className="w-5 h-5" />;
    if (lowerSubject.includes('art') || lowerSubject.includes('design')) return <Palette className="w-5 h-5" />;
    if (lowerSubject.includes('computer') || lowerSubject.includes('code')) return <Code className="w-5 h-5" />;
    if (lowerSubject.includes('psychology')) return <Heart className="w-5 h-5" />;
    if (lowerSubject.includes('account') || lowerSubject.includes('business') || lowerSubject.includes('commerce')) return <Briefcase className="w-5 h-5" />;
    if (lowerSubject.includes('law')) return <Scale className="w-5 h-5" />;
    if (lowerSubject.includes('medical') || lowerSubject.includes('health') || lowerSubject.includes('nursing')) return <Stethoscope className="w-5 h-5" />;
    return <BookOpen className="w-5 h-5" />;
};

// Course type badge colors
const getTypeColor = (type: string) => {
    switch (type) {
        case 'UG': return 'bg-blue-100 text-blue-700';
        case 'PG': return 'bg-purple-100 text-purple-700';
        case 'Diploma': return 'bg-green-100 text-green-700';
        case 'PhD': return 'bg-amber-100 text-amber-700';
        case 'Certificate': return 'bg-pink-100 text-pink-700';
        default: return 'bg-gray-100 text-gray-700';
    }
};

export function StudyMaterial() {
    const [activeTab, setActiveTab] = useState<'school' | 'university' | 'exams'>('school');
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
    const [courseFilter, setCourseFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClasses = schoolClasses.filter(cls => 
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const filteredSchools = universitySchools.filter(school =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.courses.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ).map(school => ({
        ...school,
        courses: school.courses.filter(c => 
            courseFilter === 'all' || c.type === courseFilter
        )
    })).filter(school => school.courses.length > 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                </div>
                
                <div className="relative container mx-auto px-4 py-16">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium">Your Future Starts Here</span>
                            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                            📚 Complete Study Materials
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8">
                            School to University - All Classes, Courses & Competitive Exams
                        </p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto relative">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-purple-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search for class, subject, course, or exam..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 rounded-2xl text-gray-800 shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 text-lg"
                            />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-6 mt-8">
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                            <Target className="w-5 h-5 text-yellow-300" />
                            <span className="font-medium">250+ Courses</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                            <Award className="w-5 h-5 text-yellow-300" />
                            <span className="font-medium">15+ Schools</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                            <Zap className="w-5 h-5 text-yellow-300" />
                            <span className="font-medium">12+ Competitive Exams</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="container mx-auto px-4 -mt-6">
                <div className="bg-white rounded-2xl shadow-xl p-2 flex justify-center gap-2 flex-wrap">
                    <button
                        onClick={() => { setActiveTab('school'); setSelectedClass(null); setSelectedSchool(null); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                            activeTab === 'school' 
                                ? 'bg-indigo-600 text-white shadow-lg transform scale-105' 
                                : 'text-gray-600 hover:bg-indigo-50'
                        }`}
                    >
                        <School className="w-5 h-5" />
                        School
                    </button>
                    <button
                        onClick={() => { setActiveTab('university'); setSelectedClass(null); setSelectedSchool(null); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                            activeTab === 'university' 
                                ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                                : 'text-gray-600 hover:bg-purple-50'
                        }`}
                    >
                        <Landmark className="w-5 h-5" />
                        Universities
                    </button>
                    <button
                        onClick={() => { setActiveTab('exams'); setSelectedClass(null); setSelectedSchool(null); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                            activeTab === 'exams' 
                                ? 'bg-pink-600 text-white shadow-lg transform scale-105' 
                                : 'text-gray-600 hover:bg-pink-50'
                        }`}
                    >
                        <Target className="w-5 h-5" />
                        Competitive Exams
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                {activeTab === 'school' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Class List */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <GraduationCap className="w-6 h-6 text-indigo-600" />
                                Select Your Class
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {filteredClasses.map((cls) => (
                                    <button
                                        key={cls.id}
                                        onClick={() => setSelectedClass(cls.id)}
                                        className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${
                                            selectedClass === cls.id
                                                ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-gray-50 hover:bg-indigo-50 hover:shadow-md'
                                        }`}
                                    >
                                        <span className="font-bold">{cls.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Subjects */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-purple-600" />
                                {selectedClass ? 'Subjects' : 'Select a Class'}
                            </h2>
                            {selectedClass ? (
                                <div className="space-y-3">
                                    {schoolClasses.find(c => c.id === selectedClass)?.subjects.map((subject, idx) => (
                                        <div 
                                            key={idx}
                                            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl hover:shadow-md transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-indigo-600">{getSubjectIcon(subject)}</span>
                                                <span className="font-medium text-gray-800">{subject}</span>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    ))}
                                    
                                    <button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:scale-[1.02]">
                                        <Download className="w-5 h-5" />
                                        Download All Subjects
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-400">
                                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>Click on a class to see available subjects</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'university' && (
                    <div>
                        {/* Filter */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {['all', 'UG', 'PG', 'Diploma', 'PhD'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setCourseFilter(filter)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                                        courseFilter === filter
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                            : 'bg-white text-gray-600 hover:bg-purple-50 shadow'
                                    }`}
                                >
                                    {filter === 'all' ? 'All Courses' : filter}
                                </button>
                            ))}
                        </div>

                        {/* School Selection */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                                🏛️ Select Your School/Department
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {filteredSchools.map((school) => {
                                    const Icon = school.icon;
                                    return (
                                        <button
                                            key={school.id}
                                            onClick={() => setSelectedSchool(school.id)}
                                            className={`p-5 rounded-2xl transition-all hover:scale-105 ${
                                                selectedSchool === school.id
                                                    ? `bg-gradient-to-br ${school.color} text-white shadow-xl`
                                                    : 'bg-white hover:shadow-xl border-2 border-transparent hover:border-purple-200'
                                            }`}
                                        >
                                            <Icon className={`w-10 h-10 mx-auto mb-3 ${selectedSchool === school.id ? 'text-white' : 'text-white'}`} />
                                            <span className="font-semibold text-sm block">{school.name}</span>
                                            <span className="text-xs mt-1 block opacity-75">{school.courses.length} courses</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Courses */}
                        {selectedSchool && (
                            <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {universitySchools.find(s => s.id === selectedSchool)?.name}
                                    </h2>
                                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
                                        <Download className="w-5 h-5" />
                                        Download All
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {universitySchools.find(s => s.id === selectedSchool)?.courses.map((course, idx) => (
                                        <div 
                                            key={idx}
                                            className="p-5 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl hover:shadow-xl transition-all cursor-pointer group border border-gray-100 hover:border-purple-200"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(course.type)}`}>
                                                    {course.type}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-gray-800 group-hover:text-purple-700 mb-3">{course.name}</h3>
                                            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" /> {course.duration}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle className="w-4 h-4 text-green-500" /> {course.eligibility}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FileText className="w-4 h-4 text-purple-500" /> {course.fees}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!selectedSchool && (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                                <Landmark className="w-24 h-24 mx-auto text-purple-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Select a School Above
                                </h3>
                                <p className="text-gray-500">
                                    Choose your field of study to see all available courses
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'exams' && (
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                🎯 Popular Competitive Exams
                            </h2>
                            <p className="text-gray-600">Prepare for India's top competitive exams</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {competitiveExams.map((exam) => {
                                const Icon = exam.icon;
                                return (
                                    <div 
                                        key={exam.id}
                                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 group"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${['from-blue-500','from-purple-500','from-pink-500','from-orange-500','from-green-500','from-red-500'][exam.id % 6]} to-white group-hover:scale-110 transition-transform`}>
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                {exam.seats} Apply
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-2">{exam.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                            <Target className="w-4 h-4" />
                                            <span>{exam.category}</span>
                                        </div>
                                        <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                                            <PlayCircle className="w-5 h-5" />
                                            Start Preparation
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Exam Categories */}
                        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Exam Categories</h3>
                            <div className="grid md:grid-cols-4 gap-4">
                                {['Engineering', 'Medical', 'Management', 'Government', 'Law', 'Banking', 'Arts', 'Commerce'].map((cat, idx) => (
                                    <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl text-center hover:shadow-md transition-all cursor-pointer">
                                        <span className="font-semibold text-gray-700">{cat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                        <div className="transform hover:scale-110 transition-transform">
                            <div className="text-4xl font-bold mb-2">16</div>
                            <div className="text-indigo-200">School Classes</div>
                        </div>
                        <div className="transform hover:scale-110 transition-transform">
                            <div className="text-4xl font-bold mb-2">15+</div>
                            <div className="text-indigo-200">Schools/Depts</div>
                        </div>
                        <div className="transform hover:scale-110 transition-transform">
                            <div className="text-4xl font-bold mb-2">250+</div>
                            <div className="text-indigo-200">Courses</div>
                        </div>
                        <div className="transform hover:scale-110 transition-transform">
                            <div className="text-4xl font-bold mb-2">12+</div>
                            <div className="text-indigo-200">Exams</div>
                        </div>
                        <div className="transform hover:scale-110 transition-transform">
                            <div className="text-4xl font-bold mb-2">50+</div>
                            <div className="text-indigo-200">Subjects</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-gray-600 mb-8">Access premium study materials, notes, and resources</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all hover:scale-105">
                            <BookOpen className="w-5 h-5" />
                            Browse Notes
                        </button>
                        <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all hover:scale-105">
                            <Upload className="w-5 h-5" />
                            Upload Notes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudyMaterial;
