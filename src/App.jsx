import React, { useState, useEffect, useRef } from 'react';
import { 
    Settings, 
    Save, 
    Ship, 
    Bike, 
    MapPin, 
    Image as ImageIcon, 
    DollarSign, 
    CalendarDays,
    Clock,
    CloudSun,
    Video,
    Plus,
    Trash2,
    Menu,
    X,
    Send,
    Bot,
    User,
    Sparkles,
    Lock
} from 'lucide-react';

// Hiệu ứng Fade In khi cuộn trang
const FadeInSection = ({ children, delay = 0 }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    if (domRef.current) observer.unobserve(domRef.current);
                }
            });
        }, { threshold: 0.1 });
        
        if (domRef.current) observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={domRef} 
            className={`transition-all duration-1000 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default function App() {
    // --------------------------------------------------------
    // TÍCH HỢP VIMEO API SCRIPT
    // --------------------------------------------------------
    useEffect(() => {
        const vimeoScript = document.createElement('script');
        vimeoScript.src = "https://player.vimeo.com/api/player.js";
        vimeoScript.async = true;
        document.body.appendChild(vimeoScript);
        return () => {
            if (document.body.contains(vimeoScript)) {
                document.body.removeChild(vimeoScript);
            }
        };
    }, []);

    // --------------------------------------------------------
    // STATE & DỮ LIỆU
    // --------------------------------------------------------
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeTransportTab, setActiveTransportTab] = useState('boat');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Trạng thái cho Modal Đăng nhập Admin
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [adminError, setAdminError] = useState('');

    // Lịch tàu chạy (lưu danh sách các ngày highlight theo định dạng YYYY-MM-DD - Data tham khảo lichtauphuquy.vn)
    const [highlightedDates, setHighlightedDates] = useState([
        '2026-04-01', '2026-04-02', '2026-04-03', '2026-04-04', '2026-04-05', '2026-04-08', '2026-04-09', '2026-04-10', '2026-04-11', '2026-04-12', '2026-04-15', '2026-04-16', '2026-04-17', '2026-04-18', '2026-04-19', '2026-04-22', '2026-04-23', '2026-04-24', '2026-04-25', '2026-04-26', '2026-04-29', '2026-04-30',
        '2026-05-01', '2026-05-02', '2026-05-03', '2026-05-06', '2026-05-07', '2026-05-08', '2026-05-09', '2026-05-10', '2026-05-13', '2026-05-14', '2026-05-15', '2026-05-16', '2026-05-17', '2026-05-20', '2026-05-21', '2026-05-22', '2026-05-23', '2026-05-24', '2026-05-27', '2026-05-28', '2026-05-29', '2026-05-30', '2026-05-31'
    ]);

    // Chatbot State
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { sender: 'bot', text: 'Chào bạn! Mình là trợ lý ảo Phú Quý 3N2Đ. Mình có thể giúp gì cho chuyến đi của bạn?' }
    ]);

    // Trạng thái lưu ảnh được phóng to (Lightbox)
    const [selectedImage, setSelectedImage] = useState(null);

    const [content, setContent] = useState({
        headerVideoUrl: "https://player.vimeo.com/video/1177736191",
        heroTitle: "Khám Phá Đảo Phú Quý 3 Ngày 2 Đêm",
        heroSubtitle: "Hành trình hoang sơ, tận hưởng thiên nhiên tuyệt đẹp và hải sản tươi ngon",
        
        section1Title: "Kế Hoạch & Phòng Nghỉ",
        section1Desc: "Danh sách phòng và tổng quan lịch trình thiết kế trực quan.",
        
        sectionTimelineTitle: "Lịch Trình Chi Tiết Phú Quý 3N2Đ",
        sectionTimelineDesc: "Các hoạt động hấp dẫn được sắp xếp hợp lý giúp bạn tối ưu trải nghiệm.",

        section2Title: "Thư Viện Hình Ảnh & Video",
        section2Desc: "Những khoảnh khắc tuyệt vời nhất tại đảo ngọc Phú Quý.",
        
        section3Title: "Bảng Chi Phí Các Hạng Mục",
        section3Desc: "Chi tiết dự toán kinh phí cho toàn bộ chuyến đi của bạn.",
        
        section4Title: "Phương Tiện Di Chuyển",
        section4Desc: "Hướng dẫn cách đến và đi lại trên đảo dễ dàng nhất.",

        sectionWeatherTitle: "Dự Báo Thời Tiết Phú Quý",
        sectionWeatherDesc: "Kiểm tra tình hình thời tiết, sức gió trực tiếp qua hệ thống vệ tinh.",
        
        transportBoatHeading: "Tàu Cao Tốc Ra Đảo",
        transportBoatDesc: "Từ đất liền (Cảng Phan Thiết), bạn sẽ mất khoảng 2.5 tiếng để ra đảo bằng các hãng tàu cao tốc như Superdong, Phú Quý Express hoặc Trưng Trắc. Hãy nhớ uống thuốc say sóng trước khi lên tàu nhé!",
        
        transportMotoHeading: "Thuê Xe Máy Trên Đảo",
        transportMotoDesc: "Lựa chọn tuyệt vời nhất để tự do vi vu, khám phá mọi ngóc ngách (Gành Hang, Dốc Phượt, Vịnh Triều Dương) của đảo Phú Quý với giá thuê từ 100k - 150k/ngày.",

        // 6 Block Media Xen Kẽ Hình / Video (Sử dụng URL Vimeo ở block 2 để minh hoạ)
        galleryItems: [
            { type: 'image', url: 'https://i.imghippo.com/files/WbXa6800XY.jpg' },
            { type: 'video', url: 'https://player.vimeo.com/video/1177740411?badge=0&autopause=0&player_id=0&app_id=58479' },
            { type: 'image', url: 'https://i.imghippo.com/files/LQt5558RNY.jpg' },
            { type: 'video', url: 'https://player.vimeo.com/video/1177746951?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479' },
            { type: 'image', url: 'https://i.imghippo.com/files/QlLX4094lDw.jpg' },
            { type: 'video', url: 'https://player.vimeo.com/video/1177752508?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479' }
        ],

        // Dữ liệu Timeline
        timelineItems: [
            {
                title: "Phan Thiết - Phú Quý (Ăn trưa, tối)",
                image: "https://i.imghippo.com/files/cHal5234cs.jpg",
                activities: [
                    { time: "06h30", desc: "Tập trung tại Cảng Phan Thiết. Hướng dẫn viên hỗ trợ làm thủ tục lên tàu cao tốc." },
                    { time: "09h00", desc: "Đến cảng Phú Quý, nhận xe máy 2 người/xe. Di chuyển về khách sạn cất hành lý và tham quan Vịnh Triều Dương." },
                    { time: "11h30", desc: "Dùng cơm trưa với các món hải sản địa phương. Về khách sạn nghỉ ngơi." }
                ]
            },
            {
                title: "Khám Phá Các Gành Đá Tuyệt Đẹp (Ăn sáng, trưa, tối)",
                image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                activities: [
                    { time: "07h00", desc: "Ăn sáng tại quán địa phương. Bắt đầu hành trình check-in Gành Hang, Khe Sung Sướng." },
                    { time: "14h00", desc: "Trải nghiệm chèo SUP và lặn ngắm san hô tại Hòn Tranh." },
                    { time: "18h30", desc: "Dùng bữa tối BBQ hải sản bên bờ biển, thưởng thức đặc sản bò nóng Phú Quý." }
                ]
            },
            {
                title: "Phú Quý - Phan Thiết – TP. Hồ Chí Minh (Ăn sáng, trưa)",
                image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                activities: [
                    { time: "06h00", desc: "Quý khách thức dậy vệ sinh cá nhân, dùng điểm tâm, ngắm bình minh tại Mộ Thầy." },
                    { time: "09h00", desc: "Trả phòng khách sạn, di chuyển ra cảng lên tàu cao tốc về lại đất liền." },
                    { time: "12h00", desc: "Đoàn về đến Bến tàu Phan Thiết. Dùng cơm trưa. Lên xe khởi hành về lại TP.HCM." }
                ]
            }
        ]
    });

    // --------------------------------------------------------
    // HANDLERS
    // --------------------------------------------------------

    // Kích hoạt nút Admin
    const handleAdminToggle = () => {
        if (isAdmin) {
            setIsAdmin(false); // Lưu và thoát chế độ admin
        } else {
            setShowAdminModal(true); // Hiển thị form nhập mật khẩu
        }
    };

    // Kiểm tra mật khẩu Admin
    const handleAdminLogin = () => {
        if (adminPassword === 'admin123') { // Mật khẩu mặc định
            setIsAdmin(true);
            setShowAdminModal(false);
            setAdminPassword('');
            setAdminError('');
        } else {
            setAdminError('Mật khẩu không chính xác!');
        }
    };

    const handleContentChange = (key, value) => {
        setContent(prev => ({ ...prev, [key]: value }));
    };

    const handleGalleryChange = (idx, value) => {
        const newGallery = [...content.galleryItems];
        newGallery[idx].url = value;
        setContent({ ...content, galleryItems: newGallery });
    };

    const handleTimelineChange = (idx, field, value, actIdx = null, actField = null) => {
        const newTimeline = [...content.timelineItems];
        if (actIdx !== null) {
            newTimeline[idx].activities[actIdx][actField] = value;
        } else {
            newTimeline[idx][field] = value;
        }
        setContent({ ...content, timelineItems: newTimeline });
    };

    // Thêm / Xóa Activity trong Timeline (Dành cho Admin)
    const handleAddActivity = (dayIdx) => {
        const newTimeline = [...content.timelineItems];
        newTimeline[dayIdx].activities.push({ time: "00h00", desc: "Nội dung hoạt động mới..." });
        setContent({ ...content, timelineItems: newTimeline });
    };

    const handleRemoveActivity = (dayIdx, actIdx) => {
        const newTimeline = [...content.timelineItems];
        newTimeline[dayIdx].activities.splice(actIdx, 1);
        setContent({ ...content, timelineItems: newTimeline });
    };

    // Toggle Lịch Tàu Chạy (Dành cho Admin)
    const toggleBoatDate = (dateStr) => {
        if (!isAdmin) return;
        if (highlightedDates.includes(dateStr)) {
            setHighlightedDates(highlightedDates.filter(d => d !== dateStr));
        } else {
            setHighlightedDates([...highlightedDates, dateStr]);
        }
    };

    // Render Calendar Tháng
    const renderCalendar = (year, month, title) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const firstDay = new Date(year, month - 1, 1).getDay(); // 0 (CN) đến 6 (T7)
        const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Chuyển T2 thành 0

        const blanks = Array.from({ length: startOffset }, (_, i) => i);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        return (
            <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-sm w-full max-w-sm mx-auto">
                <h5 className="text-base sm:text-lg font-extrabold text-indigo-700 mb-3 sm:mb-4 text-center border-b border-slate-100 pb-2">{title}</h5>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                        <div key={d} className="font-bold text-slate-400 text-[10px] sm:text-xs md:text-sm pb-1 sm:pb-2">{d}</div>
                    ))}
                    {blanks.map(b => <div key={`blank-${b}`} className="aspect-square"></div>)}
                    {days.map(day => {
                        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isHighlighted = highlightedDates.includes(dateStr);
                        return (
                            <div
                                key={dateStr}
                                onClick={() => toggleBoatDate(dateStr)}
                                className={`
                                    aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-bold transition-all duration-300
                                    ${isHighlighted 
                                        ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md scale-105 ring-2 ring-indigo-200 ring-offset-1' 
                                        : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-indigo-300'}
                                    ${isAdmin ? 'cursor-pointer hover:bg-indigo-50' : ''}
                                `}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Xử lý gửi tin nhắn Chatbot
    const handleSendChat = (text = chatInput) => {
        if (!text.trim()) return;
        const newMsgs = [...chatMessages, { sender: 'user', text }];
        setChatMessages(newMsgs);
        setChatInput('');
        
        // Phản hồi giả lập đơn giản
        setTimeout(() => {
            let reply = "Cảm ơn bạn! Để được hỗ trợ chi tiết nhất về Tour, bạn vui lòng liên hệ Hotline nhé.";
            const lowerText = text.toLowerCase();
            if(lowerText.includes("ăn gì") || lowerText.includes("món ngon") || lowerText.includes("đặc sản")) {
                reply = "Đến Phú Quý bạn nhất định phải thử bò nóng Phú Quý, hải sản tươi sống ở Làng Bè, gỏi ốc giác và bánh căn nhé!";
            } else if (lowerText.includes("homestay") || lowerText.includes("khách sạn") || lowerText.includes("phòng")) {
                reply = "Đảo Phú Quý có nhiều Homestay view biển cực chill như La Isla Bonita, Rì Rào Homestay, Chiu Chiu Resort... Bạn có thể xem trên mục Lịch Trình để rõ hơn.";
            } else if (lowerText.includes("tàu") || lowerText.includes("vé") || lowerText.includes("di chuyển")) {
                reply = "Bạn có thể đi tàu cao tốc Phú Quý Express, Superdong hoặc Trưng Trắc từ cảng Phan Thiết. Mất khoảng 2.5 tiếng để ra đảo.";
            }
            setChatMessages([...newMsgs, { sender: 'bot', text: reply }]);
        }, 800);
    };

    // Component hỗ trợ edit text inline
    const EditableText = ({ name, tag: Tag = 'p', className = "" }) => {
        if (isAdmin) {
            return (
                <textarea
                    value={content[name]}
                    onChange={(e) => handleContentChange(name, e.target.value)}
                    className={`w-full bg-white/90 border-2 border-blue-400 text-black p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${className}`}
                    rows={content[name].length > 60 ? 3 : 1}
                />
            );
        }
        return <Tag className={className}>{content[name]}</Tag>;
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-10 overflow-x-hidden">
            
            {/* --------------------------------------------------------
                THANH MENU ĐIỀU HƯỚNG (NAVIGATION)
            -------------------------------------------------------- */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <Ship className="text-blue-600" size={28} />
                            <span className="font-black text-xl tracking-tight text-slate-800">PhúQuý<span className="text-blue-600">Trip</span></span>
                        </div>
                        
                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <a href="#detailed-timeline" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Lịch Trình</a>
                            <a href="#chatbot" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Trợ Lý Ảo</a>
                            <a href="#gallery" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Thư Viện</a>
                            <a href="#cost" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Bảng Giá</a>
                            <a href="#transport" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Tàu & Xe</a>
                            <a href="#weather" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Thời Tiết</a>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
                        <a href="#detailed-timeline" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Lịch Trình</a>
                        <a href="#chatbot" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Trợ Lý Ảo</a>
                        <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Thư Viện</a>
                        <a href="#cost" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Bảng Giá</a>
                        <a href="#transport" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Tàu & Xe</a>
                        <a href="#weather" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Thời Tiết</a>
                    </div>
                )}
            </nav>

            {/* NÚT ADMIN FLOAT */}
            <button 
                onClick={handleAdminToggle}
                className={`fixed bottom-6 right-6 md:top-20 md:bottom-auto md:right-4 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-bold shadow-2xl transition-all hover:scale-105 ${isAdmin ? 'bg-green-500 text-white' : 'bg-slate-900 text-white'}`}
            >
                {isAdmin ? <Save size={20} /> : <Settings size={20} className="animate-spin-slow" />}
                {isAdmin ? "Lưu thay đổi" : "Quản Trị (Admin)"}
            </button>

            {/* --------------------------------------------------------
                HEADER / HERO SECTION (VIDEO BACKGROUND)
            -------------------------------------------------------- */}
            <header className="relative w-full h-[80vh] flex items-center justify-center text-center overflow-hidden mt-16 bg-slate-900">
                {/* Background Video / Iframe */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    {/* Giao diện nhập URL dành cho Admin */}
                    {isAdmin && (
                        <div className="absolute top-4 left-4 z-30 w-[90%] md:w-1/2 p-3 bg-white/95 rounded-xl shadow-lg border border-blue-300 text-left pointer-events-auto">
                            <label className="text-xs font-bold text-blue-700 mb-1 block uppercase">URL Video Nền (Hỗ trợ MP4 hoặc Vimeo)</label>
                            <input
                                type="text"
                                value={content.headerVideoUrl}
                                onChange={(e) => handleContentChange('headerVideoUrl', e.target.value)}
                                className="w-full p-2 text-sm text-black border border-slate-300 rounded outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {/* Xử lý render Video Vimeo hoặc MP4 */}
                    {content.headerVideoUrl.includes('vimeo.com') ? (
                        <iframe 
                            src={`${content.headerVideoUrl}${content.headerVideoUrl.includes('?') ? '&' : '?'}background=1&autoplay=1&loop=1&muted=1`} 
                            frameBorder="0" 
                            allow="autoplay; fullscreen; picture-in-picture" 
                            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-80 pointer-events-none"
                            title="Vimeo Background Video"
                        ></iframe>
                    ) : (
                        <video 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            className="w-full h-full object-cover opacity-80 pointer-events-none"
                            src={content.headerVideoUrl}
                        />
                    )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent pointer-events-none"></div>
                
                {/* Hero Content */}
                <div className="relative z-10 max-w-4xl px-4 flex flex-col items-center pointer-events-auto">
                    <EditableText name="heroTitle" tag="h1" className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-xl leading-tight" />
                    <EditableText name="heroSubtitle" tag="p" className="text-lg md:text-2xl text-slate-100 font-medium drop-shadow-lg" />
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32 mt-16">
                
                {/* --------------------------------------------------------
                    SECTION 1: TIMELINE LỊCH TRÌNH
                -------------------------------------------------------- */}
                <FadeInSection>
                    <section id="detailed-timeline" className="relative scroll-mt-24">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl shadow-sm"><Clock size={28}/></div>
                                <div>
                                    <EditableText name="sectionTimelineTitle" tag="h2" className="text-3xl font-extrabold text-slate-800 tracking-tight" />
                                    <EditableText name="sectionTimelineDesc" tag="p" className="text-slate-500 mt-1 text-lg" />
                                </div>
                            </div>
                        </div>

                        <div className="relative border-l-4 border-blue-500/20 pl-6 md:pl-10 ml-4 md:ml-4 space-y-12 py-4">
                            {content.timelineItems.map((day, idx) => (
                                <div key={idx} className="relative group">
                                    <div className="absolute w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full -left-[42px] md:-left-[58px] top-4 border-4 border-white shadow-md transform group-hover:scale-125 transition-transform duration-300"></div>
                                    
                                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
                                        <div className="flex flex-col lg:flex-row gap-8">
                                            {/* Phần Nội dung */}
                                            <div className="flex-1 space-y-5">
                                                <div className="inline-block px-4 py-1 bg-blue-50 text-blue-700 font-bold text-sm rounded-full mb-2">Ngày {idx + 1}</div>
                                                
                                                {isAdmin ? (
                                                    <input 
                                                        value={day.title} 
                                                        onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)}
                                                        className="w-full border-2 border-blue-400 p-2 rounded-lg text-xl font-bold"
                                                    />
                                                ) : (
                                                    <h3 className="text-2xl font-bold text-slate-800">{day.title}</h3>
                                                )}

                                                <div className="space-y-4 pt-2">
                                                    {day.activities.map((act, actIdx) => (
                                                        <div key={actIdx} className="flex gap-3 md:gap-4 items-start relative group/act">
                                                            <div className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-semibold text-sm shrink-0 whitespace-nowrap mt-1">
                                                                {isAdmin ? (
                                                                    <input 
                                                                        value={act.time} 
                                                                        onChange={(e) => handleTimelineChange(idx, null, e.target.value, actIdx, 'time')}
                                                                        className="w-16 md:w-20 bg-white border border-blue-400 p-1 rounded text-center"
                                                                    />
                                                                ) : act.time}
                                                            </div>
                                                            <div className="text-slate-600 text-justify leading-relaxed flex-1">
                                                                {isAdmin ? (
                                                                    <textarea 
                                                                        value={act.desc} 
                                                                        onChange={(e) => handleTimelineChange(idx, null, e.target.value, actIdx, 'desc')}
                                                                        className="w-full border border-blue-400 p-2 rounded h-20 resize-none"
                                                                    />
                                                                ) : act.desc}
                                                            </div>
                                                            
                                                            {/* Nút xóa hoạt động (Admin) */}
                                                            {isAdmin && (
                                                                <button 
                                                                    onClick={() => handleRemoveActivity(idx, actIdx)}
                                                                    className="text-red-500 hover:text-red-700 p-2 opacity-50 hover:opacity-100 transition-opacity"
                                                                    title="Xóa hoạt động này"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    
                                                    {/* Nút Thêm Hoạt động (Admin) */}
                                                    {isAdmin && (
                                                        <button 
                                                            onClick={() => handleAddActivity(idx)}
                                                            className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors mt-4 border border-blue-200 border-dashed"
                                                        >
                                                            <Plus size={16} /> Thêm hoạt động mới
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Phần Hình ảnh */}
                                            <div className="w-full lg:w-1/3 shrink-0 relative rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow h-64 lg:h-auto">
                                                {isAdmin && (
                                                    <input 
                                                        value={day.image} 
                                                        onChange={(e) => handleTimelineChange(idx, 'image', e.target.value)}
                                                        className="absolute top-2 left-2 z-20 w-[90%] text-xs p-2 rounded bg-white/95 border border-blue-400"
                                                        placeholder="URL Hình ảnh"
                                                    />
                                                )}
                                                <img 
                                                    src={day.image} 
                                                    alt={day.title} 
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 cursor-pointer" 
                                                    onClick={() => setSelectedImage(day.image)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </FadeInSection>

                {/* --------------------------------------------------------
                    SECTION 2: CHATBOT SECTION
                -------------------------------------------------------- */}
                <FadeInSection>
                    <section id="chatbot" className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2rem] shadow-sm p-5 sm:p-8 md:p-10 border border-indigo-100 scroll-mt-24">
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 lg:h-[550px]">
                            {/* Trái: Tiêu đề & Gợi ý */}
                            <div className="w-full lg:w-1/3 flex flex-col justify-center">
                                <div className="p-3 bg-indigo-600 text-white rounded-2xl w-max mb-4 md:mb-6 shadow-md"><Bot size={28}/></div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight mb-3 md:mb-4">Trợ Lý Ảo Phú Quý</h2>
                                <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">Bạn có thắc mắc về chuyến đi? Hãy chọn một chủ đề gợi ý hoặc nhập câu hỏi để mình hỗ trợ ngay nhé!</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {["Ăn gì ngon ở đảo?", "Gợi ý homestay đẹp", "Di chuyển ra đảo thế nào?"].map((suggestion, index) => (
                                        <button 
                                            key={index}
                                            onClick={() => handleSendChat(suggestion)}
                                            className="text-xs md:text-sm font-semibold bg-white text-indigo-700 border border-indigo-200 px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-colors shadow-sm"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Phải: Cửa sổ Chat */}
                            <div className="w-full lg:w-2/3 bg-white rounded-2xl md:rounded-3xl shadow-md border border-slate-100 flex flex-col overflow-hidden h-[450px] lg:h-full mt-2 lg:mt-0">
                                <div className="bg-indigo-600 p-3 md:p-4 text-white font-bold text-base md:text-lg flex items-center gap-2 shadow-sm">
                                    <Sparkles size={18} className="text-indigo-200" /> Chat với chúng tôi
                                </div>
                                
                                {/* Messages Area */}
                                <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
                                    {chatMessages.map((msg, i) => (
                                        <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {msg.sender === 'bot' && (
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1"><Bot size={16} className="text-indigo-600"/></div>
                                            )}
                                            <div className={`p-3 md:p-4 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm'}`}>
                                                {msg.text}
                                            </div>
                                            {msg.sender === 'user' && (
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-1"><User size={16} className="text-slate-600"/></div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
                                    <input 
                                        type="text" 
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                                        placeholder="Nhập câu hỏi của bạn..."
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-5 py-3 outline-none focus:border-indigo-400 focus:bg-white transition-colors"
                                    />
                                    <button 
                                        onClick={() => handleSendChat()}
                                        className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shrink-0 transition-colors shadow-md"
                                    >
                                        <Send size={18} className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </FadeInSection>

                {/* --------------------------------------------------------
                    SECTION 3: IFRAME CANVA TỔNG QUAN
                -------------------------------------------------------- */}
                <FadeInSection>
                    <section id="timeline-canva" className="bg-white rounded-[2rem] shadow-sm p-6 md:p-10 border border-slate-100 scroll-mt-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl"><CalendarDays size={28}/></div>
                            <div>
                                <EditableText name="section1Title" tag="h2" className="text-3xl font-extrabold text-slate-800 tracking-tight" />
                                <EditableText name="section1Desc" tag="p" className="text-slate-500 mt-1 text-lg" />
                            </div>
                        </div>

                        <div className="bg-slate-50 p-2 md:p-4 rounded-3xl shadow-inner">
                            <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.2225%', paddingBottom: 0, boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', overflow: 'hidden', borderRadius: '16px', willChange: 'transform' }}>
                                <iframe 
                                    loading="lazy" 
                                    style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                                    src="https://www.canva.com/design/DAHFJAz_4HY/XUSOxt9hPtph1d8iEpRzAA/view?embed" 
                                    allowFullScreen={true} 
                                    allow="fullscreen"
                                ></iframe>
                            </div>
                        </div>
                    </section>
                </FadeInSection>

                {/* --------------------------------------------------------
                    SECTION 4: GALLERY
                -------------------------------------------------------- */}
                <FadeInSection>
                    <section id="gallery" className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><ImageIcon size={28}/></div>
                            <div>
                                <EditableText name="section2Title" tag="h2" className="text-3xl font-extrabold text-slate-800 tracking-tight" />
                                <EditableText name="section2Desc" tag="p" className="text-slate-500 mt-1 text-lg" />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {content.galleryItems.map((item, idx) => (
                                <div key={idx} className="relative group overflow-hidden rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-300 aspect-video sm:aspect-square md:h-72 bg-black border border-slate-100">
                                    {isAdmin && (
                                        <div className="absolute z-30 top-2 inset-x-2 p-2 bg-white/95 rounded-xl shadow-lg border border-emerald-300 backdrop-blur-sm">
                                            <label className="text-xs font-bold text-emerald-700 mb-1 block uppercase tracking-wider">URL {item.type === 'image' ? 'Hình ảnh' : 'Video YouTube/Vimeo Embed'}</label>
                                            <input
                                                type="text"
                                                value={item.url}
                                                onChange={(e) => handleGalleryChange(idx, e.target.value)}
                                                className="w-full p-2 text-sm text-black border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                            />
                                        </div>
                                    )}

                                    {item.type === 'image' ? (
                                        <img 
                                            src={item.url} 
                                            alt={`Phu Quy ${idx}`} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100 cursor-pointer"
                                            onClick={() => setSelectedImage(item.url)}
                                        />
                                    ) : (
                                        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} className="w-full h-full flex items-center justify-center bg-black">
                                            <iframe 
                                                className={isAdmin ? 'pointer-events-none' : ''}
                                                src={item.url} 
                                                title={`Video ${idx}`} 
                                                frameBorder="0" 
                                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 flex items-center gap-1.5">
                                        {item.type === 'image' ? <ImageIcon size={14}/> : <Video size={14}/>}
                                        {item.type === 'image' ? 'Hình ảnh' : 'Video'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </FadeInSection>

                {/* --------------------------------------------------------
                    SECTION 5: COST SPREADSHEET
                -------------------------------------------------------- */}
                <FadeInSection>
                    <section id="cost" className="bg-white rounded-[2rem] shadow-sm p-6 md:p-10 border border-slate-100 scroll-mt-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl"><DollarSign size={28}/></div>
                            <div>
                                <EditableText name="section3Title" tag="h2" className="text-3xl font-extrabold text-slate-800 tracking-tight" />
                                <EditableText name="section3Desc" tag="p" className="text-slate-500 mt-1 text-lg" />
                            </div>
                        </div>

                        <div className="w-full h-[500px] rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 relative group">
                            <iframe 
                                src="https://docs.google.com/spreadsheets/d/1dzybzcpmBxlTqHIPLTG5_9LU1GxRFqnYySjOCxVcMlw/htmlembed?widget=true&headers=false" 
                                className="w-full h-full z-10 relative bg-white"
                                title="Chi Phí Phú Quý"
                            ></iframe>
                        </div>
                    </section>
                </FadeInSection>

                {/* --------------------------------------------------------
                    SECTION 6: PHƯƠNG TIỆN DI CHUYỂN & LỊCH TÀU CHẠY
                -------------------------------------------------------- */}
                <FadeInSection>
                    <section id="transport" className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl"><MapPin size={28}/></div>
                            <div>
                                <EditableText name="section4Title" tag="h2" className="text-3xl font-extrabold text-slate-800 tracking-tight" />
                                <EditableText name="section4Desc" tag="p" className="text-slate-500 mt-1 text-lg" />
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                            {/* Tabs Navigation */}
                            <div className="flex border-b border-slate-200 bg-slate-50/50">
                                <button 
                                    onClick={() => setActiveTransportTab('boat')}
                                    className={`flex-1 py-5 font-bold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 ${activeTransportTab === 'boat' ? 'text-indigo-600 bg-white border-b-4 border-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 border-b-4 border-transparent'}`}
                                >
                                    <Ship size={22} className={activeTransportTab === 'boat' ? 'animate-bounce' : ''} /> Bằng Tàu Thủy
                                </button>
                                <button 
                                    onClick={() => setActiveTransportTab('motorbike')}
                                    className={`flex-1 py-5 font-bold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 ${activeTransportTab === 'motorbike' ? 'text-indigo-600 bg-white border-b-4 border-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 border-b-4 border-transparent'}`}
                                >
                                    <Bike size={22} className={activeTransportTab === 'motorbike' ? 'animate-bounce' : ''} /> Bằng Xe Máy
                                </button>
                            </div>

                            {/* Tabs Content */}
                            <div className="p-6 md:p-10 min-h-[400px]">
                                {/* Tab Tàu Thủy */}
                                {activeTransportTab === 'boat' && (
                                    <div className="grid lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
                                        <div className="space-y-6 flex flex-col justify-start">
                                            <EditableText name="transportBoatHeading" tag="h3" className="text-3xl font-extrabold text-slate-800" />
                                            <EditableText name="transportBoatDesc" tag="p" className="text-lg text-slate-600 leading-relaxed" />
                                            
                                            {/* Lịch Tàu Chạy (Tháng 4 & Tháng 5) */}
                                            <div className="mt-6 md:mt-8 bg-slate-50/80 p-3 sm:p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-200 shadow-inner">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
                                                    <div>
                                                        <h4 className="text-lg md:text-xl font-extrabold text-slate-800 flex items-center gap-2">
                                                            <CalendarDays size={20} className="text-indigo-600"/> Lịch Tàu Chạy 2026
                                                        </h4>
                                                    </div>
                                                    {isAdmin && <span className="text-[10px] sm:text-xs bg-yellow-100 text-yellow-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-bold animate-pulse w-fit">Chế độ sửa: Click ngày để bật/tắt</span>}
                                                </div>
                                                
                                                <div className="flex justify-center w-full">
                                                    {renderCalendar(2026, 5, "Tháng 5 / 2026")}
                                                </div>
                                                
                                                <div className="mt-4 md:mt-6 flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm font-medium text-slate-600 bg-white py-2 px-3 md:py-2.5 md:px-5 rounded-xl md:rounded-full border border-slate-200 w-full sm:w-max mx-auto shadow-sm text-center">
                                                    <span className="w-3 h-3 md:w-3.5 md:h-3.5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full inline-block shadow-inner shrink-0"></span> 
                                                    <span>Ngày có tàu xuất bến <span className="hidden sm:inline">(Superdong, Phú Quý Express, Trưng Trắc)</span></span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="space-y-4">
                                            <div className="overflow-hidden rounded-2xl shadow-sm group aspect-video relative">
                                                <img 
                                                    src="https://i.imghippo.com/files/Ya8446eRE.jpg" 
                                                    alt="Tàu ra đảo" 
                                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 cursor-pointer" 
                                                    onClick={() => setSelectedImage("https://i.imghippo.com/files/Ya8446eRE.jpg")}
                                                />
                                            </div>
                                            <div className="w-full bg-slate-900 rounded-2xl overflow-hidden shadow-sm relative">
                                                <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} className="w-full">
                                                    <iframe 
                                                        src="https://player.vimeo.com/video/1177748618?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                                                        title="Boat Video" 
                                                        frameBorder="0" 
                                                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Tab Xe Máy */}
                                {activeTransportTab === 'motorbike' && (
                                    <div className="grid lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
                                        <div className="space-y-6 flex flex-col justify-start mt-4">
                                            <EditableText name="transportMotoHeading" tag="h3" className="text-3xl font-extrabold text-slate-800" />
                                            <EditableText name="transportMotoDesc" tag="p" className="text-lg text-slate-600 leading-relaxed" />
                                            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl mt-4">
                                                <ul className="space-y-3 text-slate-700">
                                                    <li className="flex items-center gap-2"><Sparkles size={16} className="text-indigo-500"/> Giá thuê: 100.000đ - 150.000đ/ngày</li>
                                                    <li className="flex items-center gap-2"><Sparkles size={16} className="text-indigo-500"/> Giao xe tận cảng Phú Quý miễn phí</li>
                                                    <li className="flex items-center gap-2"><Sparkles size={16} className="text-indigo-500"/> Thủ tục nhanh gọn, chỉ cần CMND/CCCD</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="overflow-hidden rounded-2xl shadow-sm group aspect-video relative">
                                                <img 
                                                    src="https://i.imghippo.com/files/LHD4200oKM.jpg" 
                                                    alt="Xe máy trên đảo" 
                                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 cursor-pointer" 
                                                    onClick={() => setSelectedImage("https://i.imghippo.com/files/LHD4200oKM.jpg")}
                                                />
                                            </div>
                                            <div className="w-full bg-slate-900 rounded-2xl overflow-hidden shadow-sm relative">
                                                <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} className="w-full">
                                                    <iframe 
                                                        src="https://player.vimeo.com/video/1177757149?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                                                        title="Motorbike Video" 
                                                        frameBorder="0" 
                                                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </FadeInSection>

                {/* --------------------------------------------------------
                    SECTION 7: THỜI TIẾT VENTUSKY
                -------------------------------------------------------- */}
                <FadeInSection>
                    <section id="weather" className="bg-slate-900 rounded-[2rem] shadow-xl p-6 md:p-10 border border-slate-800 relative overflow-hidden scroll-mt-24">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 pointer-events-none">
                            <CloudSun size={300} />
                        </div>
                        <div className="flex items-center gap-4 mb-8 relative z-10">
                            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl backdrop-blur-md"><CloudSun size={28}/></div>
                            <div>
                                <EditableText name="sectionWeatherTitle" tag="h2" className="text-3xl font-extrabold text-white tracking-tight" />
                                <EditableText name="sectionWeatherDesc" tag="p" className="text-slate-400 mt-1 text-lg" />
                            </div>
                        </div>
                        <div className="w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-inner relative z-10">
                            <div style={{ display: 'block', position: 'relative', maxWidth: '177.778vh', margin: 'auto', padding: 0, border: 0 }}>
                                <div style={{ display: 'block', position: 'relative', width: '100%', height: 0, boxSizing: 'content-box', margin: 0, border: 0, padding: '0 0 56.25%', left: 0, top: 0, right: 0, bottom: 0 }}>
                                    <iframe 
                                        src="https://embed.ventusky.com/?p=10.510;108.942;10&l=rain-3h" 
                                        style={{ display: 'block', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', margin: 0, padding: 0, border: 0, right: 'auto', bottom: 'auto' }} 
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </section>
                </FadeInSection>

            </main>
            
            {/* Footer */}
            <footer className="mt-20 py-10 text-center text-slate-500 border-t border-slate-200 bg-white">
                <p className="font-medium text-lg">© 2026 Phú Quý Island Travel. Tận hưởng mùa hè của bạn!</p>
            </footer>

            {/* LIGHTBOX / IMAGE MODAL */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white hover:text-slate-300 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>
                    <img 
                        src={selectedImage} 
                        alt="Phóng to" 
                        className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300" 
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            )}

            {/* ADMIN PASSWORD MODAL */}
            {showAdminModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm transform animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                                <Lock size={24} className="text-indigo-600" />
                                Đăng nhập
                            </h3>
                            <button 
                                onClick={() => { setShowAdminModal(false); setAdminError(''); setAdminPassword(''); }} 
                                className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mật khẩu Quản Trị</label>
                                <input
                                    type="password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 font-medium"
                                    placeholder="Nhập mật khẩu..."
                                    autoFocus
                                />
                                {adminError && <p className="text-red-500 text-sm mt-2 flex items-center gap-1 font-medium"><X size={14}/> {adminError}</p>}
                            </div>
                            <button
                                onClick={handleAdminLogin}
                                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
