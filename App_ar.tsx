import React, { useState } from 'react';
import { SYNC_DATA } from './constants';
import Header_ar from './components/Header_ar';
import FormulaModal from './components/FormulaModal';
import { motion } from 'framer-motion';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip
} from 'recharts';
import { CalculatorIcon } from './components/Icons';

const formatCurrency = (value: number) => {
    return `${value.toLocaleString('ar-SA', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ريال`;
};

const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    }
};

const BentoCard: React.FC<{ 
    children: React.ReactNode; 
    className?: string; 
    title?: string;
    subtitle?: string;
    rightAction?: React.ReactNode;
    dark?: boolean;
}> = ({ children, className = "", title, subtitle, rightAction, dark = false }) => (
    <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10px" }}
        className={`
            relative overflow-hidden rounded-[2rem] p-6 sm:p-8 flex flex-col group text-right
            ${dark ? 'bg-[#1D1D1F] text-white shadow-2xl border border-white/10' : 'bg-white text-[#1D1D1F] shadow-xl shadow-gray-200/40 border border-gray-100'}
            ${className}
        `}
    >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
            ${dark ? 'bg-gradient-to-tr from-white/5 to-transparent' : 'bg-gradient-to-tr from-purple-50/50 to-transparent'}`} 
        />

        {(title || rightAction) && (
            <div className="flex flex-col sm:flex-row-reverse justify-between items-start sm:items-center mb-6 z-10 gap-3">
                <div className="text-right">
                    {title && <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${dark ? 'text-white' : 'text-[#1D1D1F]'}`}>{title}</h3>}
                    {subtitle && <p className={`text-xs sm:text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{subtitle}</p>}
                </div>
                {rightAction}
            </div>
        )}
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
    </motion.div>
);

const App_ar: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
  const [showFormulas, setShowFormulas] = useState(false);
  const data = SYNC_DATA;

  // Pie chart data for Section 2 (Inquiries)
  const inquiryChartData = [
    { name: 'ميتا (إنستغرام وفيسبوك)', value: 466, color: '#4A2C5A' },
    { name: 'تيك توك (غير متعقب)', value: 34, color: '#D1D5DB' }
  ];

  return (
    <div className="min-h-screen pb-20 sm:pb-32 selection:bg-[#4A2C5A] selection:text-white font-cairo bg-[#F5F5F7]" dir="rtl">
      <Header_ar onToggleLanguage={onToggleLanguage} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 px-2 text-right">
            <div className="mb-6 md:mb-0">
                <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] mb-3 sm:mb-4"
                >
                    مزامنة <span className="text-[#4A2C5A]">التسويق</span>
                </motion.h1>
                <div className="flex flex-wrap items-center gap-2.5 justify-start">
                    <p className="text-sm sm:text-base text-gray-500 font-medium">{data.period.ar}</p>
                    <span className="px-2.5 py-0.5 bg-[#4A2C5A]/10 text-[#4A2C5A] text-[9px] font-bold rounded-full tracking-wider border border-[#4A2C5A]/15">
                        التقييم الأسبوعي
                    </span>
                </div>
            </div>
            <motion.button 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowFormulas(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-sm text-xs font-semibold text-[#1D1D1F] hover:bg-gray-50 transition-all border border-gray-200"
            >
                <CalculatorIcon className="w-4 h-4 text-gray-400" />
                <span>المعادلات الاحتسابية</span>
            </motion.button>
        </div>

        {/* Section 1: Hero KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 sm:mb-12">
            
            {/* KPI 1 */}
            <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-[#1D1D1F] text-white rounded-[2rem] p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#4A2C5A]/30 transition-all duration-300"
            >
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#4A2C5A]/10 blur-xl rounded-full pointer-events-none" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{data.heroKPIs.inquiries.label_ar}</p>
                <p className="text-4xl font-extrabold text-white tracking-tight mb-2">{data.heroKPIs.inquiries.value}</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium pt-3 border-t border-white/5 justify-start">
                    <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <span>{data.heroKPIs.inquiries.sub_ar}</span>
                </div>
            </motion.div>

            {/* KPI 2 */}
            <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="bg-[#1D1D1F] text-white rounded-[2rem] p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#4A2C5A]/30 transition-all duration-300"
            >
                <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/10 blur-xl rounded-full pointer-events-none" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{data.heroKPIs.metaInquiries.label_ar}</p>
                <p className="text-4xl font-extrabold text-white tracking-tight mb-2">{data.heroKPIs.metaInquiries.value}</p>
                <div className="flex items-center gap-1 text-[11px] text-[#A855F7] font-medium pt-3 border-t border-white/5 justify-start">
                    <span>{data.heroKPIs.metaInquiries.sub_ar}</span>
                </div>
            </motion.div>

            {/* KPI 3 */}
            <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="bg-[#1D1D1F] text-white rounded-[2rem] p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#4A2C5A]/30 transition-all duration-300"
            >
                <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/10 blur-xl rounded-full pointer-events-none" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{data.heroKPIs.juneMTD.label_ar}</p>
                <p className="text-4xl font-extrabold text-white tracking-tight mb-2">{data.heroKPIs.juneMTD.value_ar}</p>
                <p className="text-[11px] text-green-400 font-medium pt-3 border-t border-white/5">
                    {data.heroKPIs.juneMTD.sub_ar}
                </p>
            </motion.div>

            {/* KPI 4 */}
            <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="bg-[#1D1D1F] text-white rounded-[2rem] p-6 border border-red-500/20 shadow-xl relative overflow-hidden group hover:border-red-500/40 transition-all duration-300"
            >
                <div className="absolute top-0 left-0 w-24 h-24 bg-red-500/10 blur-xl rounded-full pointer-events-none" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{data.heroKPIs.juneSpend.label_ar}</p>
                <p className="text-4xl font-extrabold text-[#EF4444] tracking-tight mb-2">{data.heroKPIs.juneSpend.value_ar}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#EF4444] font-bold pt-3 border-t border-white/5 justify-start">
                    <span className="bg-red-500/15 px-2 py-0.5 rounded-md text-[10px]">تجاوز السقف المحدد</span>
                </div>
            </motion.div>

        </div>

        {/* Section 2 & 3: Inquiries & Digital Revenue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 sm:mb-12">
            
            {/* Section 2 Card: Inquiries Breakdown */}
            <BentoCard 
                className="lg:col-span-5 min-h-[420px]" 
                title="مصادر الاستفسارات الأسبوعية" 
                subtitle="الاستفسارات المحققة خلال آخر ٧ أيام"
            >
                <div className="flex-1 flex flex-col justify-between">
                    <div className="relative h-44 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={inquiryChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {inquiryChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-extrabold text-[#1D1D1F] tracking-tight">+{data.inquiriesSection.total}</span>
                            <span className="text-[9px] text-[#86868b] font-bold uppercase tracking-wider mt-0.5">استفسار</span>
                        </div>
                    </div>

                    <div className="space-y-3 mt-4 text-right">
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#4A2C5A]" />
                                <span className="text-xs font-semibold text-gray-700">شبكة قنوات ميتا (Meta)</span>
                            </div>
                            <span className="text-sm font-bold text-[#1D1D1F]">{data.inquiriesSection.meta} استفسار</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-gray-300" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-gray-500">منصة تيك توك</span>
                                    <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">{data.inquiriesSection.tiktokNote_ar}</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-gray-400">غير متوفر</span>
                        </div>
                    </div>

                    <p className="text-xs text-purple-950 italic leading-relaxed mt-4 bg-purple-50/40 p-3 rounded-xl border border-purple-500/10 text-right">
                        &ldquo;{data.inquiriesSection.caption_ar}&rdquo;
                    </p>
                </div>
            </BentoCard>

            {/* Section 3 Card: Digital-Marketing Revenue */}
            <BentoCard 
                className="lg:col-span-7" 
                title="إيرادات قنوات الاستقطاب الرقمي"
                subtitle="تحليل الأداء حسب نوعية العقود وقناة التسويق"
            >
                <div className="flex-1 flex flex-col justify-between">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        
                        {/* Card A: June MTD */}
                        <div className="p-5 rounded-2xl bg-purple-50/35 border border-purple-100 flex flex-col justify-between relative overflow-hidden text-right">
                            <div className="absolute top-0 left-0 w-20 h-20 bg-[#4A2C5A]/5 blur-lg rounded-full pointer-events-none" />
                            <div>
                                <span className="px-2 py-0.5 bg-[#4A2C5A]/10 text-[#4A2C5A] text-[9px] font-bold uppercase rounded-md tracking-wider">
                                    {data.digitalRevenue.cardA.title_ar}
                                </span>
                                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-3 mb-1">حصة مثوى الصافية</p>
                                <p className="text-3xl font-extrabold text-[#4A2C5A] tracking-tight">
                                    {formatCurrency(data.digitalRevenue.cardA.share)}
                                </p>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-purple-100/50">
                                <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                                    <span>العقود المبرمة:</span>
                                    <span className="font-bold text-[#1D1D1F]">{data.digitalRevenue.cardA.deals} عقد</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-600">
                                    <span>إجمالي قيمة الإيجارات:</span>
                                    <span className="font-bold text-[#1D1D1F]">{formatCurrency(data.digitalRevenue.cardA.gross)}</span>
                                </div>
                            </div>

                            {/* Share Split Mini Progress Stack */}
                            <div className="mt-4 pt-3 border-t border-purple-100/50">
                                <p className="text-[9px] text-[#4A2C5A] font-bold uppercase tracking-wider mb-2 text-right">توزيع العقود (بالعدد)</p>
                                <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-200">
                                    {data.digitalRevenue.cardA.split.map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            style={{ width: `${(item.deals / data.digitalRevenue.cardA.deals) * 100}%`, backgroundColor: item.color }} 
                                            title={`${item.name_ar}: ${item.deals}`} 
                                        />
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2.5 text-right">
                                    {data.digitalRevenue.cardA.split.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 text-[9px] text-gray-500">
                                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="font-semibold truncate">{item.name_ar}: <span className="font-bold text-[#1D1D1F]">{item.deals}</span></span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-purple-950 italic font-bold mt-3 bg-white/60 p-2 rounded-lg border border-purple-100 text-right">
                                    💡 {data.digitalRevenue.cardA.caption_ar}
                                </p>
                            </div>
                        </div>

                        {/* Card B: Past Week */}
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between text-right">
                            <div>
                                <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-[9px] font-bold uppercase rounded-md tracking-wider">
                                    {data.digitalRevenue.cardB.title_ar}
                                </span>
                                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-4 mb-1">حصة مثوى الصافية</p>
                                <p className="text-3xl font-extrabold text-[#1D1D1F] tracking-tight">
                                    {formatCurrency(data.digitalRevenue.cardB.share)}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-200/60">
                                <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                                    <span>الفترة الزمنية:</span>
                                    <span className="font-semibold text-[#1D1D1F]">{data.digitalRevenue.cardB.sub_ar}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                                    <span>العقود المبرمة:</span>
                                    <span className="font-bold text-[#1D1D1F]">{data.digitalRevenue.cardB.deals} عقد</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-600">
                                    <span>إجمالي قيمة الإيجارات:</span>
                                    <span className="font-bold text-[#1D1D1F]">{formatCurrency(data.digitalRevenue.cardB.gross)}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 text-right">
                        <p className="text-[10px] text-gray-400 font-semibold leading-relaxed italic">
                            <span className="font-bold text-gray-500 block mb-1">طريقة الاحتساب والإسناد:</span>
                            {data.digitalRevenue.footnote_ar}
                        </p>
                    </div>
                </div>
            </BentoCard>

        </div>

        {/* Section 4: Content Plan Table */}
        <div className="mb-8 sm:mb-12">
            <BentoCard 
                title="خطة إنتاج المحتوى للفروع الجديدة" 
                subtitle="توليد أصول إعلانية موجهة لاستهداف تجمعات الشواغر الحرجة"
            >
                <div className="overflow-x-auto -mx-6 sm:-mx-8">
                    <div className="inline-block min-w-full align-middle px-6 sm:px-8">
                        <table className="min-w-full divide-y divide-gray-100 text-right" dir="rtl">
                            <thead>
                                <tr className="text-right text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <th scope="col" className="py-3 px-2">الفرع / الموقع</th>
                                    <th scope="col" className="py-3 px-2 text-left">الفيديوهات</th>
                                    <th scope="col" className="py-3 px-2 text-left">التكلفة</th>
                                    <th scope="col" className="py-3 px-4">مبررات الاستهداف / استراتيجية المزامنة</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {data.newBranchesPlan.rows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-2 font-bold text-[#1D1D1F] max-w-[200px] sm:max-w-none truncate sm:whitespace-normal">
                                            {row.location_ar}
                                        </td>
                                        <td className="py-4 px-2 text-left font-mono font-bold text-gray-650">
                                            {row.videos}
                                        </td>
                                        <td className="py-4 px-2 text-left font-mono font-extrabold text-[#4A2C5A]">
                                            {formatCurrency(row.cost)}
                                        </td>
                                        <td className="py-4 px-4 text-gray-500 leading-relaxed max-w-[300px] sm:max-w-none">
                                            {row.why_ar}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="mt-5 p-3.5 bg-purple-50/30 rounded-2xl border border-purple-500/10 flex flex-col sm:flex-row-reverse sm:items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#4A2C5A] text-right">
                        {data.newBranchesPlan.caption_ar}
                    </span>
                    <span className="px-2.5 py-0.5 bg-purple-500/15 text-purple-700 text-[10px] font-extrabold rounded-full self-start sm:self-auto">
                        الإجمالي: ١٢ مقطع فيديو (٦,٠٠٠ ريال سعودي)
                    </span>
                </div>
            </BentoCard>
        </div>

        {/* Section 5: Budget Impact Tracker */}
        <div className="mb-8 sm:mb-12">
            <BentoCard 
                title="تحليل حدود ومخاطر ميزانية التسويق" 
                subtitle="مراجعة النفقات المقدرة مقابل الحد الشهري البالغ ١٨,٠٠٠ ريال سعودي"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2">
                    
                    {/* Visual Progress Panel */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* June Tracker */}
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-right">
                            <div className="flex justify-between items-center mb-2.5 flex-row-reverse">
                                <div className="text-right">
                                    <span className="text-sm font-bold text-[#1D1D1F]">توقعات شهر يونيو بالكامل</span>
                                    <p className="text-[11px] text-gray-400 mt-0.5">الحد الأقصى للميزانية: ١٨,٠٠٠ ريال</p>
                                </div>
                                <div className="text-left">
                                    <span className="text-lg font-extrabold text-red-500">{data.heroKPIs.juneSpend.value_ar}</span>
                                    <span className="block text-[10px] text-red-400 font-bold uppercase mt-0.5">+ {data.budgetImpact.june.pct}% تجاوز</span>
                                </div>
                            </div>
                            
                            {/* Proportional visual bar */}
                            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div className="absolute top-0 right-0 bg-[#4A2C5A] h-full" style={{ width: '86%' }} /> {/* up to 18,000 */}
                                <div className="absolute top-0 right-[86%] bg-red-500 h-full animate-pulse" style={{ width: '14%' }} /> {/* excess of 2,851 */}
                            </div>

                            <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3.5 border-t border-gray-200/50 text-center text-xs">
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase">الإنفاق الفعلي الحالي</span>
                                    <span className="text-xs font-bold text-gray-700">{formatCurrency(data.budgetImpact.june.spent)}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase">محتوى الفروع</span>
                                    <span className="text-xs font-bold text-gray-700">+{formatCurrency(data.budgetImpact.june.content)}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase">إعلانات مدفوعة إضافية</span>
                                    <span className="text-xs font-bold text-gray-700">+{formatCurrency(data.budgetImpact.june.paidMedia)}</span>
                                </div>
                            </div>
                        </div>

                        {/* July Tracker */}
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-right">
                            <div className="flex justify-between items-center mb-2.5 flex-row-reverse">
                                <div className="text-right">
                                    <span className="text-sm font-bold text-[#1D1D1F]">توقعات شهر يوليو (بنفس التخريج)</span>
                                    <p className="text-[11px] text-gray-400 mt-0.5">الحد الأقصى للميزانية: ١٨,٠٠٠ ريال</p>
                                </div>
                                <div className="text-left">
                                    <span className={`text-lg font-extrabold ${data.budgetImpact.july.overage > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                                        ~ {formatCurrency(data.budgetImpact.july.total)}
                                    </span>
                                    <span className={`block text-[10px] font-bold uppercase mt-0.5 ${data.budgetImpact.july.overage > 0 ? 'text-red-400' : 'text-emerald-500'}`}>
                                        {data.budgetImpact.july.overage > 0 ? `+ ~ ${data.budgetImpact.july.pct}% تجاوز` : 'ضمن الحد الأقصى'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Proportional visual bar */}
                            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div className="absolute top-0 right-0 bg-[#4A2C5A] h-full" style={{ width: data.budgetImpact.july.overage > 0 ? '78%' : '100%' }} />
                                {data.budgetImpact.july.overage > 0 && (
                                    <div className="absolute top-0 right-[78%] bg-red-500 h-full animate-pulse" style={{ width: '22%' }} />
                                )}
                            </div>

                            <div className={`grid gap-2.5 mt-4 pt-3.5 border-t border-gray-200/50 text-center text-xs ${data.budgetImpact.july.overage > 0 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase">الميزانية الأساسية الاعتيادية</span>
                                    <span className="text-xs font-bold text-gray-700">{formatCurrency(data.budgetImpact.july.spent)}</span>
                                </div>
                                {data.budgetImpact.july.overage > 0 && (
                                    <div>
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase">إعلانات فروع إضافية</span>
                                        <span className="text-xs font-bold text-gray-750">+{formatCurrency(data.budgetImpact.july.paidMedia)}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] text-gray-450 italic text-center mt-3 font-normal">
                                {data.budgetImpact.july.overage > 0 
                                    ? "* إنتاج محتوى شهر يونيو (٦ آلاف) يمثل تكلفة لمرة واحدة فقط ومستثنى تماماً من توقعات يوليو."
                                    : "* ملاحظة: لا توجد نفقات إضافية متوقعة أو تكلفة إنتاج محتوى لشهر يوليو حتى الآن."}
                            </p>
                        </div>

                    </div>

                    {/* Decision Callout Left Box */}
                    <div className="lg:col-span-5 h-full flex flex-col justify-between text-right">
                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200/60 shadow-sm relative flex-1 flex flex-col justify-between">
                            <div className="absolute -top-3 right-6 px-3 py-1 bg-[#4A2C5A] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                توجيهات القرار التسويقي
                            </div>
                            
                            <div className="my-3">
                                <p className="text-xs text-amber-650 font-bold uppercase tracking-wider mb-2">رصد تجاوز في ميزانية التسويق</p>
                                <p className="text-sm font-semibold text-amber-900 leading-relaxed">
                                    &ldquo;{data.budgetImpact.caption_ar}&rdquo;
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-amber-200 flex flex-col items-start text-right">
                                <div className="flex items-center gap-2 mb-2 text-xs text-amber-850">
                                    <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                                    <span>مقدار التجاوز لشهر يونيو: <b className="font-extrabold underline">+{formatCurrency(data.budgetImpact.june.overage)}</b></span>
                                </div>
                                {data.budgetImpact.july.overage > 0 && (
                                    <div className="flex items-center gap-2 text-xs text-amber-850">
                                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        <span>التجاوز المتوقع لشهر يوليو: <b className="font-extrabold underline">+{formatCurrency(data.budgetImpact.july.overage)}</b></span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 text-right">
                            <p className="text-[10px] text-gray-400 font-semibold leading-relaxed uppercase bg-gray-50 border border-gray-100 rounded-xl p-3">
                                📑 الافتراضات: {data.budgetImpact.footnote_ar}
                            </p>
                        </div>
                    </div>

                </div>
            </BentoCard>
        </div>

        {/* Section 6: Mabaat Campaign Status */}
        <div className="mb-8 text-right">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-6 px-2">
                حالة حملات مبات الإعلانية <span className="text-gray-400 font-medium text-lg block sm:inline sm:mr-2">(عقارات جدة)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Building 1 */}
                <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-lg flex flex-col justify-between"
                >
                    <div className="text-right">
                        <div className="flex justify-between items-start mb-4 flex-row-reverse">
                            <h3 className="font-bold text-base sm:text-lg text-[#1D1D1F] leading-tight text-right">
                                {data.mabaatCampaign.building1.name_ar}
                            </h3>
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[9px] font-extrabold rounded-full uppercase tracking-wider shrink-0 mb-2">
                                {data.mabaatCampaign.building1.status_ar}
                            </span>
                        </div>

                        <ul className="space-y-3 mt-4 text-right">
                            {data.mabaatCampaign.building1.details_ar.map((detail, dIdx) => (
                                <li key={dIdx} className="flex gap-2.5 text-xs text-gray-600 leading-relaxed font-semibold">
                                    <span className="text-[#4A2C5A] font-extrabold select-none">•</span>
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">مسؤولو مسار العمل</p>
                        <div className="flex flex-wrap gap-1.5 justify-start">
                            {data.mabaatCampaign.building1.owners_ar.map((owner, oIdx) => (
                                <span key={oIdx} className="px-2.5 py-0.5 bg-gray-100 text-gray-650 text-[10px] font-semibold rounded-md border border-gray-200">
                                    {owner}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Building 2 */}
                <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-lg flex flex-col justify-between"
                >
                    <div className="text-right">
                        <div className="flex justify-between items-start mb-4 flex-row-reverse">
                            <h3 className="font-bold text-base sm:text-lg text-[#1D1D1F] leading-tight text-right">
                                {data.mabaatCampaign.building2.name_ar}
                            </h3>
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[9px] font-extrabold rounded-full uppercase tracking-wider shrink-0 mb-2 border border-amber-200/50">
                                {data.mabaatCampaign.building2.status_ar}
                            </span>
                        </div>

                        <ul className="space-y-3 mt-4 text-right">
                            {data.mabaatCampaign.building2.details_ar.map((detail, dIdx) => (
                                <li key={dIdx} className="flex gap-2.5 text-xs text-gray-650 leading-relaxed font-semibold">
                                    <span className="text-[#A855F7] font-extrabold select-none">•</span>
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">مسؤولو مسار العمل</p>
                        <div className="flex flex-wrap gap-1.5 justify-start">
                            {data.mabaatCampaign.building2.owners_ar.map((owner, oIdx) => (
                                <span key={oIdx} className="px-2.5 py-0.5 bg-gray-100 text-gray-650 text-[10px] font-semibold rounded-md border border-gray-200">
                                    {owner}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>

        {/* Section 7: Footer */}
        <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center border-t border-gray-200/60 pt-10 px-4"
        >
            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
                {data.reportingDate} · لوحة مزامنة التسويق لشركة مثوى · موجهة للحضور من القيادة الداخلية
            </p>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-3 max-w-4xl mx-auto">
                طريقة احتساب المنسوبات والإيرادات: الإيجار × نسبة إدارة الفرع طوال فترة العقد الفعلي المعتمد، الأرقام مستمدة من السجلات الرسمية وإدارة مبيعات مثوى.
            </p>
        </motion.footer>

        <FormulaModal isOpen={showFormulas} onClose={() => setShowFormulas(false)} lang="ar" />
      </main>
    </div>
  );
};

export default App_ar;
