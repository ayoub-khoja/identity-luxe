export const LOCALES = {
  ar: {
    code: "ar",
    label: "العربية",
    short: "AR",
    dir: "rtl",
    flag: "qa",
  },
  en: {
    code: "en",
    label: "English",
    short: "EN",
    dir: "ltr",
    flag: "gb",
  },
};

export const DEFAULT_LOCALE = "ar";
export const LOCALE_STORAGE_KEY = "il-locale";

export const translations = {
  ar: {
    language: "اللغة",
    soundOn: "تفعيل الصوت",
    soundOff: "كتم الصوت",
    whatsapp: "تواصل عبر واتساب",
    instagramAria: "تابعونا على إنستغرام — @identity_luxe",
    instagramAlt: "Identity Luxe على إنستغرام — @identity_luxe",
    backToTop: "العودة للأعلى",
    sliderNav: "التنقل",
    emailPlaceholder: "أدخلي بريدك الإلكتروني",
    subscribeButton: "اشتراك",
    bestsellers: {
      title: "الأكثر مبيعاً لديكِ",
      navLabel: "تصفح المنتجات",
      prev: "السابق",
      next: "التالي",
    },
    nav: {
      "/": "الرئيسية",
      "/shop": "المجموعة",
      "/about": "من نحن",
      "/blog": "المدونة",
      "/contact": "اتصل بنا",
      "/products": "كل المنتجات",
      "/product": "تفاصيل المنتج",
      "/cart": "السلة",
      "/checkout": "الدفع",
      "/about-chef": "الفريق",
      "/services": "الخدمات",
      "/history": "تاريخنا",
    },
    shop: {
      breadcrumb: "المجموعة",
      emptyCollection: "هذه المجموعة ستكون متاحة قريباً.",
    },
    onepage: {
      "#home": "الرئيسية",
      "#about": "الدار",
      "#menu": "المجموعة",
      "#blog": "المدونة",
      "#contact": "اتصل بنا",
    },
    hero: {
      subtitle: "دار أزياء",
      title: "Identity Luxe",
      description: "قطع خالدة لأناقة تعرّف بكِ.",
      button1: "اكتشفِ",
      button2: "الدار",
    },
    about: {
      title: "مجموعتنا<br><span>لليوم الوطني</span>",
      description:
        "من التراث الخالد إلى الفخر المعاصر، هذه المجموعة أكثر من ملابس — إنها تحية للرموز الراسخة والجذور الثقافية. صُممت بروح الوحدة، وتعكس القوة والهوية والرؤية لإلهام الجيل القادم.",
      description2:
        "كل قطعة تحمل قصة تقاليد أُعيد تخيلها لليوم. سواء ارتديتِها في الاحتفال أو كتعبير يومي عن الفخر، تتكيّف المجموعة بسلاسة — لا تتجاوز أسلوبكِ، بل تعزّزه. صُنعت للحياة الحقيقية: لتُلبس، وتُكرَّم، وتُذكَر.",
      button: "استلهمِ",
      buttonLink: "https://www.instagram.com/identity_luxe/",
    },
    features: {
      subtitle: "لماذا نحن",
      title: "معايير Identity Luxe",
      description: "ما يجعل كل قطعة فريدة.",
      items: [
        {
          title: "خامات نبيلة",
          text: "صوف وحرير وقطن مختارة للملمس والثبات وطول العمر.",
        },
        {
          title: "قصّات دقيقة",
          text: "قصّات متقنة لتسقط بطبيعية، موسماً بعد موسم.",
        },
        {
          title: "أسلوب خالد",
          text: "أساسيات راقية بعيداً عن صيحات الاستهلاك السريع.",
        },
      ],
    },
    schedule: {
      subtitle: "المتجر",
      title: "ساعات العمل",
      description: "زوري المتجر لاستشارة أسلوب شخصية.",
      button1: "حجز موعد",
      button2: "تسوقي أونلاين",
      items: ["الثلاثاء إلى الجمعة", "السبت"],
    },
    counters: [
      "قطع حصرية",
      "عملاء أوفياء",
      "تقييمات إيجابية",
      "مجموعات في السنة",
    ],
    cta: {
      subtitle: "المجموعة الجديدة",
      title: "ربيع–صيف<br>في المتجر",
      description:
        "قصّات انسيابية، ألوان حجر وذهب شاحب.<br>متوفرة أونلاين وفي المتجر.",
      button1: "المتجر",
      button2: "كل الإطلالات",
    },
    testimonial: {
      subtitle: "شهادات",
      title: "ما تقوله عميلاتنا",
      description: "قطع تفرض نفسها في الخزانة،<br>موسماً بعد موسم.",
      button: "أضف رأيك",
      formTitle: "أضف رأيك",
      namePlaceholder: "الاسم",
      titlePlaceholder: "عنوان الرأي",
      reviewPlaceholder: "اكتبِ رأيكِ هنا",
      ratingLabel: "التقييم",
      submit: "إرسال",
      success: "شكراً! تم إضافة رأيكِ.",
      required: "مطلوب",
      items: [
        {
          title: "إطلالة فورية",
          text: "بليزر Signature أصبح أساسيّتي. قصّة مثالية وخامة نبيلة — الفرق واضح مع Identity Luxe.",
        },
        {
          title: "أناقة هادئة",
          text: "أخيراً علامة تراهن على الخلود. معطف الكشمير ناعم نادر، والخدمة في المتجر راقية.",
        },
        {
          title: "جودة نادرة",
          text: "بدلة سوداء متوازنة تماماً. التشطيبات بمستوى دور أقدم بكثير — أنصح بها بلا تردد.",
        },
        {
          title: "عنواني في الموضة",
          text: "Identity Luxe غيّرت خزانتي. قطع أقل وأفضل اختياراً — هذا بالضبط ما كنت أبحث عنه.",
        },
      ],
    },
    latestPosts: {
      subtitle: "المدونة",
      title: "نصائح وأفكار<br>من الدار",
      description: "أسلوب، خامات، وإلهام Identity Luxe.",
      button: "كل المقالات",
      info: "اقرئي أخبار الدار ونصائح الأناقة وإلهام الإطلالات في مدونتنا.",
    },
    subscribe: {
      subtitle: "النشرة",
      title: "احصلي على الجديد",
      description: "وصول مبكر للإصدارات، دعوات خاصة ونصائح أسلوب.",
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "ما هي سياسة الإرجاع؟",
          a: "نحن معكِ! غير راضية عن المقاس أو الستايل؟ لا مشكلة — يمكنكِ استبدال قطعتكِ خلال أيام قليلة. نريدكِ أن تحبي ما ترتدينه. لأي استفسار، راسلينا على identityluxeqa@gmail.com",
        },
        {
          q: "كم يستغرق الشحن؟",
          a: "شحن سريع داخل قطر — التوصيل خلال 12 ساعة في نفس اليوم.",
        },
        {
          q: "هل تقدمون الشحن الدولي؟",
          a: "نعم، نشحن إلى معظم دول العالم. تختلف أسعار الشحن الدولي ومواعيد التوصيل حسب الوجهة. راجعي صفحة الشحن للمزيد من التفاصيل.",
        },
        {
          q: "ما طرق الدفع المقبولة؟",
          a: "نقبل جميع بطاقات الائتمان الرئيسية، Apple Pay وGoogle Pay. جميع المعاملات آمنة ومشفّرة. كما نقبل الدفع عند الاستلام.",
        },
        {
          q: "كيف أتتبع طلبي؟",
          a: "بمجرد شحن طلبكِ، ستصلكِ رسالة بريد إلكتروني برقم التتبع. يمكنكِ استخدامه لمتابعة الشحنة عبر موقعنا أو صفحة شركة الشحن.",
        },
      ],
    },
    footer: {
      aboutTitle: "الدار",
      aboutText:
        "Identity Luxe توقّع قطعاً خالدة، مقصوصة بدقة. موضة راقية لتأكيد أسلوبكِ، موسماً بعد موسم.",
      aboutButton: "شاهدي المجموعة",
      contactTitle: "موقعنا",
      contactItems: [
        { label: "اتصلِ", value: "+974 3020 9993" },
        { label: "اكتبي", value: "hello@identityluxe.com" },
        { label: "المتجر", value: "الدوحة، قطر" },
      ],
      contactButton: "تواصلي معنا",
      galleryTitle: "إطلالات",
      galleryButton: "المزيد",
      copy: "© 2026 Identity Luxe. جميع الحقوق محفوظة.",
    },
  },
  en: {
    language: "Language",
    soundOn: "Unmute",
    soundOff: "Mute",
    whatsapp: "Contact on WhatsApp",
    instagramAria: "Follow us on Instagram — @identity_luxe",
    instagramAlt: "Identity Luxe on Instagram — @identity_luxe",
    backToTop: "Back to top",
    sliderNav: "Slider navigation",
    emailPlaceholder: "Enter your email",
    subscribeButton: "Subscribe",
    bestsellers: {
      title: "Your favorite best-sellers.",
      navLabel: "Browse products",
      prev: "Previous",
      next: "Next",
    },
    nav: {
      "/": "Home",
      "/shop": "Collection",
      "/about": "About",
      "/blog": "Journal",
      "/contact": "Contact",
      "/products": "All products",
      "/product": "Product",
      "/cart": "Cart",
      "/checkout": "Checkout",
      "/about-chef": "Team",
      "/services": "Services",
      "/history": "History",
    },
    shop: {
      breadcrumb: "Collection",
      emptyCollection: "This collection will be available soon.",
    },
    onepage: {
      "#home": "Home",
      "#about": "Maison",
      "#menu": "Collection",
      "#blog": "Journal",
      "#contact": "Contact",
    },
    hero: {
      subtitle: "Fashion house",
      title: "Identity Luxe",
      description: "Timeless pieces for an elegance that defines you.",
      button1: "Discover",
      button2: "The maison",
    },
    about: {
      title: "Our <span>NATIONAL DAY COLLECTION</span>",
      description:
        "From timeless heritage to modern pride, this collection is more than clothing — it's a tribute to enduring symbols and cultural roots. Designed with the spirit of unity, it reflects strength, identity, and the vision to inspire the next generation.",
      description2:
        "Each piece carries a story of tradition reimagined for today. Whether worn in celebration or as a daily expression of pride, the collection adapts seamlessly — it never overtakes your style, it amplifies it. Built for real life: to be worn, honored, and remembered.",
      button: "Get Inspired",
      buttonLink: "https://www.instagram.com/identity_luxe/",
    },
    features: {
      subtitle: "Why us",
      title: "The Identity Luxe standard",
      description: "What makes every piece unique.",
      items: [
        {
          title: "Noble fabrics",
          text: "Wools, silks and cottons chosen for touch, structure and longevity.",
        },
        {
          title: "Precise cuts",
          text: "Silhouettes crafted to fall just right, season after season.",
        },
        {
          title: "Timeless style",
          text: "Refined essentials, far from disposable trends.",
        },
      ],
    },
    schedule: {
      subtitle: "Boutique",
      title: "Opening hours",
      description: "Visit the boutique for personal style advice.",
      button1: "Book an appointment",
      button2: "Shop online",
      items: ["Tuesday to Friday", "Saturday"],
    },
    counters: [
      "Exclusive pieces",
      "Loyal clients",
      "Positive reviews",
      "Collections a year",
    ],
    cta: {
      subtitle: "New collection",
      title: "Spring–Summer<br>in store",
      description:
        "Fluid silhouettes, stone and pale gold tones.<br>Available online and in boutique.",
      button1: "Shop",
      button2: "All looks",
    },
    testimonial: {
      subtitle: "Testimonials",
      title: "What our clients say",
      description: "Pieces that belong in the wardrobe,<br>season after season.",
      button: "Add a review",
      formTitle: "Add a review",
      namePlaceholder: "Your name",
      titlePlaceholder: "Review title",
      reviewPlaceholder: "Write your review here",
      ratingLabel: "Rating",
      submit: "Submit",
      success: "Thank you! Your review has been added.",
      required: "Required",
      items: [
        {
          title: "Instant presence",
          text: "The Signature blazer became my essential. Impeccable cut, noble fabric — you feel the Identity Luxe difference immediately.",
        },
        {
          title: "Quiet elegance",
          text: "Finally a brand that bets on timelessness. The cashmere coat is exceptionally soft, and the boutique service is attentive.",
        },
        {
          title: "Rare quality",
          text: "A perfectly balanced black suit. The finishing matches houses far more established — I recommend it without hesitation.",
        },
        {
          title: "My fashion address",
          text: "Identity Luxe transformed my wardrobe. Fewer pieces, better chosen — exactly what I was looking for.",
        },
      ],
    },
    latestPosts: {
      subtitle: "Journal",
      title: "Tips & inspiration<br>from the maison",
      description: "Style, fabrics, and Identity Luxe inspiration.",
      button: "All articles",
      info: "Read maison news, style tips and look inspiration in our journal.",
    },
    subscribe: {
      subtitle: "Newsletter",
      title: "Get the latest",
      description: "Early access to drops, private invitations and style advice.",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "What is your return policy?",
          a: "We've got you covered! Not happy with your size or style? No worries — you can easily exchange your item within a few days. We're all about making sure you love what you wear. For any issues, reach us at identityluxeqa@gmail.com",
        },
        {
          q: "How long does shipping take?",
          a: "Express shipping inside Qatar — delivery within 12 hours on the same day.",
        },
        {
          q: "Do you offer international shipping?",
          a: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. Please check our shipping page for more details.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, Apple Pay and Google Pay. All transactions are secure and encrypted for your protection. We also accept cash on delivery.",
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's tracking page.",
        },
      ],
    },
    footer: {
      aboutTitle: "The maison",
      aboutText:
        "Identity Luxe crafts timeless pieces, cut with precision. Refined fashion to affirm your style, season after season.",
      aboutButton: "View the collection",
      contactTitle: "Find us",
      contactItems: [
        { label: "Call", value: "+974 3020 9993" },
        { label: "Write", value: "hello@identityluxe.com" },
        { label: "Boutique", value: "Doha, Qatar" },
      ],
      contactButton: "Contact us",
      galleryTitle: "Looks",
      galleryButton: "See more",
      copy: "© 2026 Identity Luxe. All rights reserved.",
    },
  },
};

export function getNavLabel(locale, link, fallback) {
  return translations[locale]?.nav?.[link] || fallback;
}

export function getOnepageLabel(locale, link, fallback) {
  return translations[locale]?.onepage?.[link] || fallback;
}
