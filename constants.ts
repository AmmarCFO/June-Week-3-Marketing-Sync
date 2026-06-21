// Mathwaa Weekly Marketing Sync Dashboard Data
// Date: 21 June 2026

export interface SyncBranchPlanItem {
  location: string;
  videos: number;
  cost: number;
  why: string;
}

export interface SyncCampaignStatus {
  name: string;
  status: string;
  statusType: 'launching' | 'pending';
  owners: string[];
  details: string[];
}

export const SYNC_DATA = {
  reportingDate: "21 June 2026",
  period: {
    en: "14 June → 21 June 2026 (Since last sync) & June MTD",
    ar: "١٤ يونيو ← ٢١ يونيو ٢٠٢٦ (منذ المزامنة الأخيرة) وشهر يونيو حتى الآن"
  },
  heroKPIs: {
    inquiries: {
      value: "500+",
      label_en: "Inquiries Generated",
      label_ar: "الاستفسارات المحققة",
      sub_en: "Last 7 Days (June 14–21)",
      sub_ar: "آخر ٧ أيام (١٤-٢١ يونيو)"
    },
    metaInquiries: {
      value: "466",
      label_en: "Inquiries from Meta",
      label_ar: "استفسارات منصة ميتا",
      sub_en: "TikTok data not available",
      sub_ar: "بيانات تيك توك غير متوفرة"
    },
    juneMTD: {
      value: "SAR 48,004",
      value_ar: "٤٨،٠٠٤ ريال",
      label_en: "Mathwaa Share Revenue",
      label_ar: "إيرادات حصة مثوى (يونيو)",
      sub_en: "June MTD (Digital Only)",
      sub_ar: "يونيو حتى الآن (رقمي فقط)"
    },
    juneSpend: {
      value: "SAR 20,851",
      value_ar: "٢٠،٨٥١ ريال",
      label_en: "Projected June Spend",
      label_ar: "الإنفاق المتوقع لشهر يونيو",
      sub_en: "Ceiling: SAR 18,000",
      sub_ar: "الحد الأقصى الحالي: ١٨,٠٠٠ ريال"
    }
  },
  inquiriesSection: {
    total: "500+",
    meta: 466,
    tiktok: "N/A",
    tiktokNote_en: "TikTok inquiry data not yet available (Meta only)",
    tiktokNote_ar: "بيانات استفسارات تيك توك غير متوفرة بعد (ميتا فقط)",
    caption_en: "Meta is the confirmed inquiry driver this week; TikTok contribution is unmeasured, not zero.",
    caption_ar: "منصة ميتا هي المحرك الفعلي للاستفسارات هذا الأسبوع، ومساهمة تيك توك غير مقاسة ولا تعني أنها صفر."
  },
  digitalRevenue: {
    cardA: {
      title_en: "June (Month-to-Date)",
      title_ar: "شهر يونيو (حتى الآن)",
      deals: 15,
      gross: 207170,
      share: 48004,
      split: [
        { name_en: "TikTok", name_ar: "تيك توك", deals: 8, color: "#4A2C5A" },
        { name_en: "Instagram", name_ar: "إنستغرام", deals: 4, color: "#C084FC" },
        { name_en: "Facebook", name_ar: "فيسبوك", deals: 1, color: "#1877F2" },
        { name_en: "Generic Social", name_ar: "تواصل اجتماعي عام", deals: 2, color: "#86868b" }
      ],
      caption_en: "TikTok is the lead channel this month",
      caption_ar: "تيك توك هي القناة المتصدرة هذا الشهر"
    },
    cardB: {
      title_en: "Past Week (Deals Won)",
      title_ar: "الأسبوع الماضي (عقود ناجحة)",
      sub_en: "14 → 21 June",
      sub_ar: "١٤ ← ٢١ يونيو",
      deals: 11,
      gross: 164580,
      share: 37896.50
    },
    footnote_en: "Only Meta / TikTok / named paid-social deals counted. Referrals, renewals, existing tenants, and cancelled bookings excluded. Mathwaa share = rent × branch management %, over the binding period. Past week counted by deal-won (recent-booking) basis; contract-start used as proxy since messages carry no won-date.",
    footnote_ar: "تُحتسب فقط الصفقات المدفوعة على ميتا / تيك توك / وسائل التواصل الاجتماعي المذكورة بالاسم. تُستثنى الإحالات والتجديدات والمستأجرون الحاليون والحجوزات الملغاة. حصة مثوى = الإيجار × نسبة إدارة الفرع، خلال الفترة الملزمة. يُحتسب الأسبوع الماضي على أساس الصفقات الرابحة (الحجوزات الأخيرة)؛ ويُستعمل بدء العقد كمؤشر لعدم توفر تاريخ رابح في الرسائل."
  },
  newBranchesPlan: {
    caption_en: "12 videos at SAR 500 each = SAR 6,000 in content production this week (one-time).",
    caption_ar: "١٢ فيديو بقيمة ٥٠٠ ريال للفيديو = ٦,٠٠٠ ريال لإجمالي إنتاج المحتوى هذا الأسبوع (دفعة واحدة).",
    rows: [
      {
        location_en: "Al Arid (M6, M42, M5, M37, M10, M8, M2, M4)",
        location_ar: "العارض (M6، M42، M5، M37، M10، M8، M2، M4)",
        videos: 8,
        cost: 4000,
        why_en: "High-leakage cluster; M42 is the 2nd-largest revenue leak (22 vacant units)",
        why_ar: "عنقود تسريب عالٍ؛ M42 ثاني أكبر مصدر لتسريب الإيرادات (٢٢ وحدة شاغرة)"
      },
      {
        location_en: "Al Nada (M29)",
        location_ar: "الندى (M29)",
        videos: 1,
        cost: 500,
        why_en: "Active vacancy push",
        why_ar: "دفع نشط للوحدات الشاغرة"
      },
      {
        location_en: "Al Nakhil (updated creative)",
        location_ar: "النخيل (تحديث الإبداع)",
        videos: 1,
        cost: 500,
        why_en: "Existing video refresh, testing a new creative style",
        why_ar: "تنشيط الفيديوهات الحالية عبر اختبار أسلوب إبداعي جديد"
      },
      {
        location_en: "Hayy Al Wadi (M40)",
        location_ar: "حي الوادي (M40)",
        videos: 2,
        cost: 1000,
        why_en: "Vacancy push (2 vacant units)",
        why_ar: "دفع إشغال (وحدتان شاغرتان)"
      }
    ]
  },
  budgetImpact: {
    ceiling: 18000,
    june: {
      spent: 11851,
      content: 6000,
      paidMedia: 3000,
      total: 20851,
      overage: 2851,
      pct: 16
    },
    july: {
      spent: 18000,
      paidMedia: 0,
      total: 18000,
      overage: 0,
      pct: 0
    },
    caption_en: "The new-branch push exceeds the SAR 18,000 monthly ceiling, with ~+2,851 in June. This requires a budget increase or reallocation decision.",
    caption_ar: "يتجاوز الدفع للفروع الجديدة السقف الشهري البالغ ١٨,٠٠٠ ريال، بواقع حوالي +٢,٨٥١ ريال في يونيو. يتطلب ذلك قراراً بزيادة الميزانية أو إعادة تخصيصها.",
    footnote_en: "Assumes content + media both draw on the marketing budget, and no additional baseline ad spend in the remaining days of June beyond the items above.",
    footnote_ar: "يفترض أن المحتوى والإعلام يسحبان من ميزانية التسويق، مع عدم وجود إنفاق إعلاني أساسي إضافي في الأيام المتبقية من شهر يونيو خارج المذكور أعلاه."
  },
  mabaatCampaign: {
    building1: {
      name_en: "Building 1: Al Salama (Jeddah)",
      name_ar: "مبنى ١: السلامة (جدة)",
      status_en: "LAUNCHING (this week)",
      status_ar: "جارٍ الإطلاق (هذا الأسبوع)",
      statusColor: "launching",
      owners: ["Husam", "Hind", "Hazem"],
      owners_ar: ["حسام", "هند", "حازم"],
      details_en: [
        "Ad account setup completed last week.",
        "Today: align sales process with Husam; coordinate budget transfer (X → TikTok / Meta) with Hind & Hazem; launch campaign.",
        "Next: campaign goes live this week."
      ],
      details_ar: [
        "تم الانتهاء من إعداد الحساب الإعلاني الأسبوع الماضي.",
        "اليوم: مواءمة عملية المبيعات مع حسام؛ تنسيق تحويل الميزانية (X ← تيك توك / ميتا) مع هند وحازم؛ إطلاق الحملة.",
        "الخطوة التالية: تنطلق الحملة في غضون هذا الأسبوع."
      ]
    },
    building2: {
      name_en: "Building 2: Al Nahdah (Jeddah)",
      name_ar: "مبنى ٢: النهضة (جدة)",
      status_en: "IN PROGRESS: pending influencers",
      status_ar: "قيد التنفيذ: في انتظار المؤثرين",
      statusColor: "pending",
      owners: ["Nayef", "Ahmed"],
      owners_ar: ["نايف", "أحمد"],
      details_en: [
        "Influencer-led, coordinated via Nayef.",
        "First influencer set rejected (low engagement); sourcing a stronger set.",
        "Once approved: produce content this week → launch next Sunday.",
        "Budget: TBC with Ahmed."
      ],
      details_ar: [
        "بقيادة المؤثرين، بالتنسيق بواسطة نايف.",
        "تم رفض المجموعة الأولى من المؤثرين (تفاعل منخفض)؛ ويتم الآن التعاقد مع مجموعة أقوى.",
        "بمجرد الموافقة: إنتاج المحتوى هذا الأسبوع ← الإطلاق الأحد القادم.",
        "الميزانية: سيتم تأكيدها قريباً مع أحمد."
      ]
    }
  }
};
