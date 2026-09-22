import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, Menu, X, Trash2, Plus, Minus, Check, ArrowRight, 
  ExternalLink, MessageSquare, ShieldCheck, Copy, Sparkles, Filter, 
  CreditCard, QrCode, Tag, AlertCircle, ChevronDown, ChevronUp, Github, 
  Send, HelpCircle, PhoneCall, RefreshCw, Layers, CheckCircle2, FileCode,
  Folder, File, Eye, Download, Info
} from 'lucide-react';

const STORE_CONFIG = {
  name: "Laro Store",
  arabicName: "متجر لارو",
  slogan: "متجرك الرقمي الموثوق وخدمات ديسكورد الاحترافية",
  currency: "ر.س",
  currencyCode: "SAR",
  primaryColor: "#7289da", // Discord Violet / Blurple Accent
  secondaryColor: "#10b981", // Emerald accent
  logoText: "LARO",
  discordUrl: "https://discord.gg/larostore",
  whatsappUrl: "https://wa.me/966500000000",
  telegramUrl: "https://t.me/larostore",
  supportEmail: "support@larostore.com",
  copyright: "© 2026 Laro Store. جميع الحقوق محفوظة."
};

const PAYMENT_CONFIG = {
  qrImagePlaceholder: "/assets/payment/qr.png",
  bankName: "STC Pay / الراجحي",
  accountName: "مؤسسة لارو للخدمات الرقمية",
  accountNumber: "SA0380000000123456789012",
  stcPayNumber: "+966 50 123 4567",
  instructions: "يرجى تحويل المبلغ الإجمالي إلى الحساب أو الكود أعلاه، ثم إرفاق رقم العملية واسم المستخدم للتسليم السريع."
};

const CATEGORIES_DATA = [
  { id: "nitro", name: "نيترو", icon: "🚀", desc: "اشتراكات ديسكورد نيترو بأفضل الأسعار", count: 12, image: "/assets/images/categories/nitro.png" },
  { id: "boost", name: "بوست", icon: "⚡", desc: "تلفيل سيرفرات ديسكورد وسيرفر بوستات", count: 8, image: "/assets/images/categories/boost.png" },
  { id: "creation-accs", name: "حسابات إنشاء", icon: "🛡️", desc: "حسابات قديمة وموثقة بجودة عالية", count: 15, image: "/assets/images/categories/creation.png" },
  { id: "netflix", name: "حسابات نتفلكس", icon: "🎬", desc: "اشتراكات نتفلكس رسمية ومضمونة", count: 6, image: "/assets/images/categories/netflix.png" },
  { id: "shahid", name: "حسابات شاهد", icon: "📺", desc: "باقات شاهد VIP والرياضية", count: 7, image: "/assets/images/categories/shahid.png" },
  { id: "snap-plus", name: "سناب بلس", icon: "👻", desc: "اشتراكات سناب شات بلس تفعيل سريع", count: 4, image: "/assets/images/categories/snap.png" },
  { id: "crunchyroll", name: "حسابات كرانشي رول", icon: "🍜", desc: "عالم الأنمي بجودة عالية وبدون إعلانات", count: 5, image: "/assets/images/categories/crunchy.png" },
  { id: "effects", name: "أفكتات", icon: "✨", desc: "مؤثرات بصرية وافتارات احترافية للديسكورد", count: 20, image: "/assets/images/categories/effects.png" },
  { id: "sources", name: "سورسات", icon: "💻", desc: "أكواد برمجية وبوتات جاهزة للتطوير", count: 18, image: "/assets/images/categories/sources.png" },
  { id: "suppliers", name: "موردين", icon: "📦", desc: "قوائم أفضل الموردين الرقميين بسعر الجملة", count: 9, image: "/assets/images/categories/suppliers.png" },
  { id: "tweak", name: "تويـك", icon: "⚙️", desc: "تويتات لزيادة الفريمات وتقليل اللاج في الألعاب", count: 11, image: "/assets/images/categories/tweak.png" },
  { id: "exchange", name: "صرف", icon: "🔄", desc: "خدمات التحويل والصرف الرقمي السريع", count: 3, image: "/assets/images/categories/exchange.png" },
];

const PRODUCTS_DATA = [
  {
    id: "nitro-001",
    name: "اشتراك ديسكورد نيترو قيمنق (سنة كاملة)",
    category: "nitro",
    price: 180,
    oldPrice: 240,
    discount: 25,
    featured: true,
    image: "/assets/images/products/nitro-1year.png",
    description: "اشتراك ديسكورد نيترو القيمنق السنوي الرسمي. يتم التفعيل على حسابك الشخصي مباشرة وبضمان كامل المدة.",
    stock: true,
    delivery: "تسليم آلي / فوري",
    features: ["بث مباشر بجودة 4K 60FPS", "2 سيرفر بوست مجاناً", "إيموجيات وافتارات متحركة في كل مكان", "تحميل ملفات حتى 500MB"]
  },
  {
    id: "nitro-002",
    name: "اشتراك ديسكورد نيترو شهري (تفعيل مجاني)",
    category: "nitro",
    price: 25,
    oldPrice: 35,
    discount: 28,
    featured: true,
    image: "/assets/images/products/nitro-1month.png",
    description: "نيترو قيمنق شهري مفعل بنسبة 100% مضمون من الخطر وبأفضل سعر في السوق.",
    stock: true,
    delivery: "خلال 5 دقائق",
    features: ["تفعيل سريع", "ضمان عدم الإلغاء", "دعم كامل طوال الشهر"]
  },
  {
    id: "boost-001",
    name: "14 سيرفر بوست (لمدة 3 أشهر)",
    category: "boost",
    price: 65,
    oldPrice: 110,
    discount: 40,
    featured: true,
    image: "/assets/images/products/boost-14.png",
    description: "ارفع مستويات سيرفرك للفل 3 فوراً مع 14 بوست لمدة 90 يوماً متواصلة بضمان التعويض.",
    stock: true,
    delivery: "تسليم خلال 15 دقيقة",
    features: ["وصول للفل 3 مباشرة", "رابط مخصص للسيرفر", "جودة صوت 384Kbps", "50 MB حجم رفع الملفات"]
  },
  {
    id: "creation-001",
    name: "حساب ديسكورد قديم (إنشاء 2016) مع شارة",
    category: "creation-accs",
    price: 120,
    oldPrice: 160,
    discount: 25,
    featured: false,
    image: "/assets/images/products/acc-2016.png",
    description: "حساب ديسكورد قديم جداً ممتاز للمطورين وإدارة السيرفرات لزيادة الثوقية والأمان.",
    stock: true,
    delivery: "تسليم فوري عبر الإيميل",
    features: ["تاريخ إنشاء 2016", "مع الإيميل الأساسي (OGE)", "بدون أي مخالفات سابقة"]
  },
  {
    id: "netflix-001",
    name: "حساب نتفلكس 4K UHD (ملف خاص بقفل)",
    category: "netflix",
    price: 18,
    oldPrice: 30,
    discount: 40,
    featured: true,
    image: "/assets/images/products/netflix-profile.png",
    description: "ملف خاص بك بكلمة سر داخل حساب نتفلكس أعلى فئة Premium 4K.",
    stock: true,
    delivery: "آلي فور الشراء",
    features: ["شاشة خاصة بك برمز PIN", "جودة Ultra HD 4K", "ضمان كامل المدة"]
  },
  {
    id: "shahid-001",
    name: "اشتراك شاهد VIP + الرياضة (شهري)",
    category: "shahid",
    price: 22,
    oldPrice: 40,
    discount: 45,
    featured: false,
    image: "/assets/images/products/shahid-vip.png",
    description: "استمتع بمتابعة دوري روشن والمباريات العالمية ومسلسلات شاهد الأصلية.",
    stock: true,
    delivery: "تسليم سريع",
    features: ["بث مباشر للمباريات HD", "بدون إعلانات", "تحميل للمشاهدة بدون إنترنت"]
  },
  {
    id: "sources-001",
    name: "سورس بوت حماية وإدارة سيرفرات متكامل",
    category: "sources",
    price: 90,
    oldPrice: 150,
    discount: 40,
    featured: true,
    image: "/assets/images/products/source-bot.png",
    description: "كود برمجي جاهز بـ Discord.js v14 يشمل نظام التكت، الترحيب، الحماية التلقائية وشوب متكامل.",
    stock: true,
    delivery: "تحميل فوري برابط GitHub/ZIP",
    features: ["كود نظيف ومشروح بالكامل", "سهل التعديل والتخصيص", "دعم الداتا بيز Quick.db"]
  },
  {
    id: "tweak-001",
    name: "Laro Ultimate Windows Tweak (نسخة ألعاب)",
    category: "tweak",
    price: 35,
    oldPrice: 70,
    discount: 50,
    featured: true,
    image: "/assets/images/products/tweak-pack.png",
    description: "سكربت تويك احترافي يرفع فريمات الألعاب (FPS) ويقلل تأخير الماوس والإنبوت لاج إلى أقل حد.",
    stock: true,
    delivery: "تحميل فوري مع شرح فيديو",
    features: ["زيادة الفريمات حتى +40%", "تقليل Ping والانبوت لاج", "آمن 100% ولا يسبب مشاكل"]
  },
  {
    id: "suppliers-001",
    name: "ملف أفضل 100 مورد للمنتجات الرقمية والنيترو",
    category: "suppliers",
    price: 50,
    oldPrice: 120,
    discount: 58,
    featured: false,
    image: "/assets/images/products/suppliers-list.png",
    description: "قائمة محدثة تحتوي على الموردين الأساسيين المباشرين للنيترو، الاشتراكات والبطاقات بأسعار لا تصدق.",
    stock: true,
    delivery: "تسليم فوري ملف PDF + روابط",
    features: ["موردين موثوقين 100%", "أسعار جملة الجملة", "تحديثات دورية مجانية"]
  },
  {
    id: "effects-001",
    name: "حزمة أفكتات وافتارات افتراضية نادرة (Discord Avatar Decoration)",
    category: "effects",
    price: 15,
    oldPrice: 25,
    discount: 40,
    featured: false,
    image: "/assets/images/products/discord-effects.png",
    description: "تشكيلة من أفضل الملفات المتحركة GIF و PNG المصممة خصيصاً لاقتناء افتارات ديسكورد خرافية.",
    stock: true,
    delivery: "تحميل فوري",
    features: ["جودة عالية HD", "جاهزة للاستخدام الفوري", "تصاميم حصرية"]
  }
];

const FAQ_ITEMS = [
  { q: "كيف تتم عملية الشراء وتسليم المنتجات؟", a: "بعد إتمام الدفع وإرفاق رقم العملية، يتم التحقق من طلبك فوراً وتصلك أكواد أو بيانات المنتج عبر حسابك أو الديسكورد خلال دقائق." },
  { q: "ما هي طرق الدفع المتاحة في Laro Store؟", a: "نوفر الدفع عبر تحويل STC Pay، مصرف الراجحي، والبطاقات البنكية المباشرة عبر رمز QR الموضح في صفحة الدفع." },
  { q: "هل المنتجات والاشتراكات مضمونة؟", a: "نعم، جميع خدماتنا ونقاط النيترو والحسابات رسمية ومضمونة 100% طوال فترة الاشتراك المحددة مع دعم فني متواصل." },
  { q: "ماذا أوفعل إذا واجهت مشكلة في الطلب؟", a: "يمكنك التواصل معنا فوراً عبر سيرفر الديسكورد أو الواتساب برقم الطلب الخاص بك وسيتم حل أي مشكلة خلال وقت قياسي." },
  { q: "هل يمكنني استرجاع المبلغ بعد الشراء؟", a: "نظراً لطبيعة المنتجات الرقمية، الاسترجاع متاح فقط في حال عدم تسليم المنتج أو وجود خلل غير قابل للإصلاح من طرفنا." }
];

const GITHUB_FILES = {
  "README.md": `# 🚀 Laro Store - متجر رقمي متكامل

**Laro Store** هو مشروع متجر رقمي عربي فاخر مخصص لبيع خدمات ديسكورد، اشتراكات النيترو، الحسابات، والأكواد البرمجية.

## 🛠️ التثبيت والتشغيل المحلي
\`\`\`bash
# 1. استنساخ المستودع
git clone https://github.com/your-username/laro-store.git

# 2. الانتقال للمجلد
cd laro-store

# 3. تثبيت الحزم
npm install

# 4. تشغيل خادم التطوير
npm run dev
\`\`\`

## 📁 هيكلة المجلدات وأماكن الصور
- **صور المنتجات**: \`public/assets/images/products/\`
- **صور الأقسام**: \`public/assets/images/categories/\`
- **رمز الدفع QR**: \`public/assets/payment/qr.png\`
- **الشعار والمطبوعات**: \`public/assets/branding/\`

## ⚙️ التعديل والتخصيص
- **المنتجات والأسعار**: تعديل \`src/data/products.js\`
- **الأقسام**: تعديل \`src/data/categories.js\`
- **طرق الدفع والحسابات**: تعديل \`src/config/paymentConfig.js\`
- **معلومات وهوية المتجر**: تعديل \`src/config/storeConfig.js\`

## 🌐 النشر على GitHub Pages / Vercel
\`\`\`bash
npm run build
\`\`\`
`,
  "src/config/storeConfig.js": `export const storeConfig = ${JSON.stringify(STORE_CONFIG, null, 2)};`,
  "src/config/paymentConfig.js": `export const paymentConfig = ${JSON.stringify(PAYMENT_CONFIG, null, 2)};`,
  "src/data/categories.js": `export const categories = ${JSON.stringify(CATEGORIES_DATA, null, 2)};`,
  "src/data/products.js": `export const products = ${JSON.stringify(PRODUCTS_DATA, null, 2)};`,
  ".env.example": `# Discord Webhook URL for Order Notifications
VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
`
};

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('laro_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceFilter, setPriceFilter] = useState(300);
  const [activeTab, setActiveTab] = useState('home'); // home, products, categories, faq, contact, docs
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedFileForDocs, setSelectedFileForDocs] = useState('README.md');

  // Discord Webhook integration state
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSendingWebhook, setIsSendingWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState(null);

  // Form checkout state
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    discordUser: '',
    discordId: '',
    email: '',
    notes: '',
    transferRef: ''
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('laro_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Cart save error", e);
    }
  }, [cart]);

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`تمت إضافة "${product.name}" إلى السلة`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(prod => {
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'all' || prod.category === selectedCategory;
      const matchesPrice = prod.price <= priceFilter;
      return matchesSearch && matchesCat && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
      return 0; // Default
    });
  }, [searchQuery, selectedCategory, priceFilter, sortBy]);

  const featuredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(p => p.featured);
  }, []);

  const discountedProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(p => p.discount && p.discount > 0);
  }, []);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.discordUser || !checkoutForm.transferRef) {
      alert("يرجى ملء جميع الحقول الإضافية والمطوبة لاستكمال الشراء");
      return;
    }

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0,10).replace(/-/g, '');
    const orderId = `LARO-${dateStr}-${randomId}`;

    const newOrder = {
      orderId,
      items: [...cart],
      total: cartTotal,
      customer: { ...checkoutForm },
      date: new Date().toLocaleString('ar-SA')
    };

    setConfirmedOrder(newOrder);

    // If Webhook URL provided, trigger real Webhook dispatch
    if (webhookUrl.trim()) {
      setIsSendingWebhook(true);
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: "Laro Store Bot",
            avatar_url: "https://i.imgur.com/4M34hi2.png",
            embeds: [{
              title: `طلب جديد: ${orderId}`,
              color: 0x7289da,
              fields: [
                { name: "العميل", value: checkoutForm.name, inline: true },
                { name: "ديسكورد", value: checkoutForm.discordUser, inline: true },
                { name: "رقم التحويل", value: checkoutForm.transferRef, inline: true },
                { name: "المبلغ الإجمالي", value: `${cartTotal} SAR`, inline: true },
                { name: "المنتجات", value: cart.map(i => `• ${i.name} (x${i.quantity})`).join('\n') }
              ],
              footer: { text: "Laro Store System • Order Notification" },
              timestamp: new Date().toISOString()
            }]
          })
        });
        setWebhookStatus('success');
      } catch (err) {
        console.error("Webhook Error", err);
        setWebhookStatus('error');
      } finally {
        setIsSendingWebhook(false);
      }
    }

    setCart([]);
    setIsCheckoutOpen(false);
    setCheckoutForm({ name: '', discordUser: '', discordId: '', email: '', notes: '', transferRef: '' });
  };

  return (
    <div className="min-h-screen bg-[#0d0f17] text-gray-100 font-sans dir-rtl text-right selection:bg-purple-600 selection:text-white" dir="rtl">
      
      {}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-purple-900/90 border border-purple-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {}
      <header className="sticky top-0 z-40 bg-[#0f111a]/85 backdrop-blur-xl border-b border-white/10 shadow-lg transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => { setActiveTab('home'); setSelectedCategory('all'); }} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl font-extrabold text-white tracking-widest">{STORE_CONFIG.logoText}</span>
            </div>
            <div>
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
                {STORE_CONFIG.arabicName}
              </div>
              <p className="text-[10px] text-purple-300/70 font-mono tracking-wider hidden sm:block">DIGITAL DISCORD STORE</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-md">
            {[
              { id: 'home', label: 'الرئيسية' },
              { id: 'products', label: 'المنتجات' },
              { id: 'categories', label: 'الأقسام' },
              { id: 'faq', label: 'الأسئلة الشائعة' },
              { id: 'contact', label: 'الدعم والتواصل' },
              { id: 'docs', label: 'ملفات GitHub' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action Bar (Search Input & Cart Button) */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block w-48 lg:w-64">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setActiveTab('products'); }}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pr-9 pl-4 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 text-purple-300 group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-slate-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 bg-white/5 border border-white/10 rounded-2xl lg:hidden text-gray-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#121422] border-b border-white/10 px-4 py-4 space-y-2 animate-fadeIn">
            <div className="mb-3">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setActiveTab('products'); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pr-9 pl-4 text-xs text-white"
              />
            </div>
            {[
              { id: 'home', label: 'الرئيسية' },
              { id: 'products', label: 'المنتجات' },
              { id: 'categories', label: 'الأقسام' },
              { id: 'faq', label: 'الأسئلة الشائعة' },
              { id: 'contact', label: 'الدعم والتواصل' },
              { id: 'docs', label: 'ملفات GitHub والهيكلة' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                className={`w-full text-right px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {}
      <main>
        {activeTab === 'home' && (
          <div>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden py-20 lg:py-32 bg-radial-gradient">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>الوجهة الأولى للمنتجات الرقمية وسيرفرات ديسكورد</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
                  {STORE_CONFIG.name}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 mt-2">
                    "{STORE_CONFIG.slogan}"
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto text-gray-300 text-sm sm:text-base leading-relaxed mb-10">
                  نوفر لك أفضل اشتراكات ديسكورد نيترو، البوستات، حسابات الإنشاء الفاخرة، اشتراكات البث، الأفكتات، السورسات البرمجية وتويتات الألعاب بأعلى جودة وأفضل سعر بالسوق.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <span>تصفح كافة المنتجات</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>

                  <button
                    onClick={() => setActiveTab('categories')}
                    className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm backdrop-blur-md hover:scale-105 transition-all"
                  >
                    استكشف الأقسام
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-right">
                  {[
                    { icon: ShieldCheck, title: "ضمان 100%", desc: "منتجات موثوقة ومحمية" },
                    { icon: Sparkles, title: "تسليم سريع", desc: "تسليم فوري ومباشر" },
                    { icon: PhoneCall, title: "دعم 24/7", desc: "فريق دعم في ديسكورد" },
                    { icon: Tag, title: "أسعار تنافسية", desc: "عروض يومية حصرية" },
                  ].map((badge, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm flex items-center gap-3">
                      <badge.icon className="w-8 h-8 text-purple-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">{badge.title}</div>
                        <div className="text-[11px] text-gray-400">{badge.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span>المنتجات المميزة</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">أكثر المنتجات طلباً من قِبل عملاء لارو</p>
                </div>
                <button 
                  onClick={() => setActiveTab('products')} 
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <span>عرض الكل</span>
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart} 
                    onSelect={() => setSelectedProduct(product)} 
                  />
                ))}
              </div>
            </section>

            {/* CATEGORIES PREVIEW */}
            <section className="py-16 bg-white/[0.01] border-y border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-extrabold text-white">تصنيفات المتجر الرئيسية</h2>
                  <p className="text-xs text-gray-400 mt-2">اختر القسم الذي تبحث عنه للوصول السريع للمنتجات</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {CATEGORIES_DATA.map(cat => (
                    <div
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setActiveTab('products'); }}
                      className="group bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-purple-900/20 hover:border-purple-500/50 cursor-pointer transition-all duration-300"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">{cat.icon}</div>
                      <div className="text-sm font-bold text-white group-hover:text-purple-300">{cat.name}</div>
                      <div className="text-[10px] text-gray-400 mt-1">{cat.count} منتج</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SPECIAL OFFERS / DISCOUNT SECTION */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/20 to-purple-950/50 border border-purple-500/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl font-bold text-xs">خصومات حصرية</span>
                  <h2 className="text-2xl font-extrabold text-white">العروض والتخفيضات الحالية</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                  {discountedProducts.slice(0, 3).map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart} 
                      onSelect={() => setSelectedProduct(product)} 
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PRODUCTS PAGE */}
        {activeTab === 'products' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-white">جميع المنتجات والخدمات</h1>
                <p className="text-xs text-gray-400 mt-1">تصفح وقارن جميع المنتجات الرقمية المتوفرة لدى {STORE_CONFIG.name}</p>
              </div>

              {/* Sorting options */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">ترتيب حسب:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="default" className="bg-[#121422]">الافتراضي</option>
                  <option value="price-low" className="bg-[#121422]">السعر: من الأقل للأعلى</option>
                  <option value="price-high" className="bg-[#121422]">السعر: من الأعلى للأقل</option>
                  <option value="discount" className="bg-[#121422]">الأعلى خصماً</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-purple-400" />
                    <span>تصفية حسب القسم</span>
                  </h3>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-right px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedCategory === 'all' ? 'bg-purple-600 text-white font-bold' : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      كافة الأقسام ({PRODUCTS_DATA.length})
                    </button>
                    {CATEGORIES_DATA.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-right px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                          selectedCategory === cat.id ? 'bg-purple-600 text-white font-bold' : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </span>
                        <span className="text-[10px] opacity-70">({cat.count})</span>
                      </button>
                    ))}
                  </div>

                  {/* Price Slider */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-white mb-2">
                      <span>أقصى سعر:</span>
                      <span className="font-bold text-purple-300">{priceFilter} {STORE_CONFIG.currency}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="5"
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {filteredProducts.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white">لا توجد نتائج مطابقة</h3>
                    <p className="text-xs text-gray-400 mt-2">جرّب تغيير كلمات البحث أو إعادة ضبط خيارات التصفية.</p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setPriceFilter(300); }}
                      className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
                    >
                      إعادة ضبط الفلاتر
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={addToCart} 
                        onSelect={() => setSelectedProduct(product)} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CATEGORIES PAGE */}
        {activeTab === 'categories' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h1 className="text-3xl font-extrabold text-white">أقسام المتجر الشاملة</h1>
              <p className="text-xs text-gray-400 mt-2">استكشف منتجاتنا الموزعة بدقة حسب التصنيف للتسوق بكل سهولة</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {CATEGORIES_DATA.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setActiveTab('products'); }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 hover:bg-purple-900/10 cursor-pointer transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                    <span className="text-xs font-bold bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                      {cat.count} منتج
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{cat.name}</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{cat.desc}</p>
                  
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-purple-400 font-semibold">
                    <span>مسار الصور:</span>
                    <span className="font-mono text-[10px] text-gray-500">{cat.image}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ PAGE */}
        {activeTab === 'faq' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-extrabold text-white">الأسئلة الشائعة</h1>
              <p className="text-xs text-gray-400 mt-2">إجابات فورية لأكثر الاستفسارات تكراراً لدى متسوقي لارو ستور</p>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full text-right p-5 flex items-center justify-between font-bold text-sm text-white hover:bg-white/5 transition-colors"
                  >
                    <span>{item.q}</span>
                    {expandedFaq === idx ? <ChevronUp className="w-5 h-5 text-purple-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-5 pb-5 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-4 bg-white/[0.02]">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {activeTab === 'contact' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-extrabold text-white">الدعم والتواصل المباشر</h1>
              <p className="text-xs text-gray-400 mt-2">فريق الدعم في Laro Store جاهز لخدمتك والتجاوب مع استفساراتك 24 ساعة</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "سيرفر الديسكورد", desc: "الدعم المباشر، التكتات والمسابقات", icon: MessageSquare, url: STORE_CONFIG.discordUrl, color: "from-indigo-600 to-purple-600" },
                { name: "الواتساب", desc: "استفسارات الاستلام والمبيعات", icon: PhoneCall, url: STORE_CONFIG.whatsappUrl, color: "from-emerald-600 to-teal-600" },
                { name: "التيليجرام", desc: "قناة التحديثات والعروض الفورية", icon: Send, url: STORE_CONFIG.telegramUrl, color: "from-sky-600 to-blue-600" },
              ].map((card, idx) => (
                <a
                  key={idx}
                  href={card.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:scale-105 transition-all group"
                >
                  <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    <card.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{card.name}</h3>
                  <p className="text-xs text-gray-400 mb-6">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:underline">
                    <span>انتقـل الآن</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'docs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono mb-2">
                <Github className="w-4 h-4" />
                <span>GitHub Production Repository Explorer</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">هيكلة المشروع والملفات المصدريّة</h1>
              <p className="text-xs text-gray-400 mt-1">تصفح الكود المصدري الحقيقي وملفات التكفيج الجاهزة للرفع المباشر على GitHub</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-[#090b11] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* File Tree Navigation Sidebar */}
              <div className="p-4 bg-[#0e101a] border-b lg:border-b-0 lg:border-l border-white/10">
                <div className="text-xs font-bold text-gray-400 mb-3 px-2 flex items-center justify-between">
                  <span>ملفات المشروع (laro-store)</span>
                  <Folder className="w-4 h-4 text-purple-400" />
                </div>
                <div className="space-y-1">
                  {Object.keys(GITHUB_FILES).map((fileName) => (
                    <button
                      key={fileName}
                      onClick={() => setSelectedFileForDocs(fileName)}
                      className={`w-full text-right px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-colors ${
                        selectedFileForDocs === fileName 
                          ? 'bg-purple-600 text-white font-bold' 
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <FileCode className="w-4 h-4 shrink-0" />
                      <span className="truncate">{fileName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Viewer Panel */}
              <div className="lg:col-span-3 p-6 bg-[#0a0c14] overflow-x-auto">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 font-mono text-xs text-purple-300">
                    <File className="w-4 h-4" />
                    <span>{selectedFileForDocs}</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(GITHUB_FILES[selectedFileForDocs]);
                      showToast("تم نسخ الكود المصدري بنجاح");
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ الملف</span>
                  </button>
                </div>

                <pre className="text-xs font-mono text-emerald-400/90 leading-relaxed whitespace-pre-wrap">
                  {GITHUB_FILES[selectedFileForDocs]}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

      {}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121422] border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 left-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Image Placeholder View */}
              <div className="bg-white/5 border border-white/10 rounded-2xl aspect-square flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-3">
                  <Tag className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-white mb-1">{selectedProduct.name}</span>
                <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded-md">
                  {selectedProduct.image}
                </span>
                {selectedProduct.discount && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white font-extrabold text-[10px] px-2 py-1 rounded-full">
                    خصم {selectedProduct.discount}%
                  </span>
                )}
              </div>

              {/* Product Info & Actions */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2.5 py-1 rounded-full">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-3 mb-2">{selectedProduct.name}</h2>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">{selectedProduct.description}</p>

                  <div className="space-y-1.5 mb-6">
                    {selectedProduct.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-extrabold text-white">{selectedProduct.price} {STORE_CONFIG.currency}</span>
                    {selectedProduct.oldPrice && (
                      <span className="text-sm text-gray-500 line-through">{selectedProduct.oldPrice} {STORE_CONFIG.currency}</span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>إضافة للسلة</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#121422] h-full shadow-2xl flex flex-col border-r border-white/10">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-purple-400" />
                <h2 className="font-bold text-base text-white">سلة التسوق</h2>
                <span className="text-xs text-gray-400">({cartItemCount} منتجات)</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-sm font-bold text-white">السلة فارغة حالياً</p>
                  <p className="text-xs text-gray-400 mt-1">تصفح المتجر وأضف المنتجات التي ترغب بها</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-300 font-bold text-xs shrink-0">
                        {item.category.slice(0, 3)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white line-clamp-1">{item.name}</div>
                        <div className="text-xs text-purple-300 font-bold mt-1">
                          {item.price} {STORE_CONFIG.currency}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl p-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white/10 rounded-lg text-gray-300">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white/10 rounded-lg text-gray-300">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-white/10 bg-[#0d0f17]">
                <div className="flex items-center justify-between text-sm font-bold text-white mb-4">
                  <span>المجموع الإجمالي:</span>
                  <span className="text-xl text-emerald-400">{cartTotal} {STORE_CONFIG.currency}</span>
                </div>
                <button
                  onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-2xl shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>متابعة الشراء والدفع</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#121422] border border-white/10 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative my-8 shadow-2xl">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-purple-400" />
                <span>إتمام الطلب والدفع المباشر</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">امسح رمز QR أو انسخ بيانات الحساب لتحويل المبلغ ثم ادخل تفاصيل التحويل</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* QR Code & Payment Instructions */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full">
                    {PAYMENT_CONFIG.bankName}
                  </span>

                  {/* QR Image Placeholder */}
                  <div className="my-6 w-44 h-44 mx-auto bg-white p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center relative">
                    <QrCode className="w-28 h-28 text-slate-900" />
                    <span className="text-[9px] font-mono text-gray-600 mt-1">{PAYMENT_CONFIG.qrImagePlaceholder}</span>
                  </div>

                  <div className="text-xs text-gray-300 space-y-2 text-right bg-white/5 p-3 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-gray-400">اسم الحساب:</span>
                      <span className="font-bold text-white">{PAYMENT_CONFIG.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">رقم الحساب:</span>
                      <span className="font-mono text-white text-[11px]">{PAYMENT_CONFIG.accountNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-[11px] text-right">
                  {PAYMENT_CONFIG.instructions}
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-right">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: محمد العتيبي"
                    value={checkoutForm.name}
                    onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">اسم ديسكورد *</label>
                    <input
                      type="text"
                      required
                      placeholder="Username#0000"
                      value={checkoutForm.discordUser}
                      onChange={e => setCheckoutForm({...checkoutForm, discordUser: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">آيدي ديسكورد (اختياري)</label>
                    <input
                      type="text"
                      placeholder="123456789..."
                      value={checkoutForm.discordId}
                      onChange={e => setCheckoutForm({...checkoutForm, discordId: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">رقم عملية التحويل / المرجع *</label>
                  <input
                    type="text"
                    required
                    placeholder="أدخل رقم المرجع الموضح في الملاحظة بعد التحويل"
                    value={checkoutForm.transferRef}
                    onChange={e => setCheckoutForm({...checkoutForm, transferRef: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">اختياري: Discord Webhook للتجربة</label>
                  <input
                    type="url"
                    placeholder="https://discord.com/api/webhooks/..."
                    value={webhookUrl}
                    onChange={e => setWebhookUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-[11px] text-white font-mono placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                  <span className="text-[10px] text-gray-400">ضع رابط ويبهوك ديسكورد لاستلام تفاصيل الطلب فوراً بسيرفرك</span>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center text-sm font-bold text-white mb-4">
                    <span>المبلغ المباشر المطلوب:</span>
                    <span className="text-xl text-emerald-400">{cartTotal} {STORE_CONFIG.currency}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingWebhook}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-2xl shadow-xl hover:scale-[1.02] transition-all"
                  >
                    {isSendingWebhook ? "جاري تسجيل الطلب وإرساله..." : "تأكيد وإرسال الطلب"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121422] border border-white/10 rounded-3xl max-w-lg w-full p-8 text-center relative shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-1">تم استلام طلبك بنجاح!</h2>
            <p className="text-xs text-gray-400 mb-6">شكراً لتسوقك من {STORE_CONFIG.name}. يتم معالجة طلبك الآن.</p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-right mb-6 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">رقم الطلب الفريد:</span>
                <span className="font-mono font-bold text-purple-300">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">اسم العميل:</span>
                <span className="font-bold text-white">{confirmedOrder.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">حساب ديسكورد:</span>
                <span className="font-mono text-white">{confirmedOrder.customer.discordUser}</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-2 font-bold text-sm">
                <span className="text-white">المبلغ الكلي:</span>
                <span className="text-emerald-400">{confirmedOrder.total} {STORE_CONFIG.currency}</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedOrder(null)}
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg"
            >
              العودة للمتجر
            </button>
          </div>
        </div>
      )}

      {}
      <footer className="bg-[#090b11] border-t border-white/10 mt-20 text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-lg font-bold text-white mb-2">{STORE_CONFIG.name}</div>
              <p className="text-xs leading-relaxed text-gray-400">{STORE_CONFIG.slogan}</p>
            </div>

            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">روابط سريعة</div>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-white">الرئيسية</button></li>
                <li><button onClick={() => setActiveTab('products')} className="hover:text-white">جميع المنتجات</button></li>
                <li><button onClick={() => setActiveTab('categories')} className="hover:text-white">أقسام المتجر</button></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">الدعم الفني</div>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('faq')} className="hover:text-white">الأسئلة الشائعة</button></li>
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-white">تواصل معنا</button></li>
                <li><button onClick={() => setActiveTab('docs')} className="hover:text-white">ملفات GitHub</button></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">مجتمع المتجر</div>
              <p className="text-[11px] mb-3">انضم لخير سيرفر ديسكورد للحصول على التحديثات والعروض</p>
              <a
                href={STORE_CONFIG.discordUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <MessageSquare className="w-4 h-4" />
                <span>سيرفر الديسكورد</span>
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center text-[11px] text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>{STORE_CONFIG.copyright}</div>
            <div className="flex gap-4">
              <span>الشروط والأحكام</span>
              <span>سياسة الخصوصية</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product, onAddToCart, onSelect }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/50 hover:bg-purple-900/10 transition-all duration-300 group">
      <div>
        {/* Placeholder Image Area */}
        <div 
          onClick={onSelect}
          className="bg-white/5 border border-white/10 rounded-xl aspect-video mb-4 flex flex-col items-center justify-center p-3 relative cursor-pointer overflow-hidden group-hover:scale-[1.02] transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-300 flex items-center justify-center mb-1">
            <Tag className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded truncate max-w-full">
            {product.image}
          </span>

          {product.discount && (
            <span className="absolute top-2 right-2 bg-red-500/90 text-white font-bold text-[9px] px-2 py-0.5 rounded-full">
              خصم {product.discount}%
            </span>
          )}
        </div>

        <span className="text-[9px] font-bold text-purple-400 uppercase bg-purple-500/10 px-2 py-0.5 rounded-full">
          {product.category}
        </span>

        <h3 
          onClick={onSelect} 
          className="text-sm font-bold text-white mt-2 mb-1 cursor-pointer hover:text-purple-300 transition-colors line-clamp-1"
        >
          {product.name}
        </h3>

        <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {product.description}
        </p>
      </div>

      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-extrabold text-white">{product.price} SAR</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-500 line-through">{product.oldPrice} SAR</span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-2.5 bg-white/10 hover:bg-purple-600 text-white text-xs font-bold rounded-xl border border-white/10 hover:border-purple-500 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>إضافة للسلة</span>
        </button>
      </div>
    </div>
  );
}