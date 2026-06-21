import React, { useState } from 'react';
import { SYNC_DATA } from './constants';
import Header from './components/Header';
import FormulaModal from './components/FormulaModal';
import { motion } from 'framer-motion';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { CalculatorIcon, TikTokIcon, InstagramIcon, FacebookIcon, BanknotesIcon, ChartBarIcon } from './components/Icons';

const formatCurrency = (value: number) => {
    return `SAR ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
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
            relative overflow-hidden rounded-[2rem] p-6 sm:p-8 flex flex-col group
            ${dark ? 'bg-[#1D1D1F] text-white shadow-2xl border border-white/10' : 'bg-white text-[#1D1D1F] shadow-xl shadow-gray-200/40 border border-gray-100'}
            ${className}
        `}
    >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
            ${dark ? 'bg-gradient-to-tr from-white/5 to-transparent' : 'bg-gradient-to-tr from-purple-50/50 to-transparent'}`} 
        />

        {(title || rightAction) && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 z-10 gap-3">
                <div>
                    {title && <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight ${dark ? 'text-white' : 'text-[#1D1D1F]'}`}>{title}</h3>}
                    {subtitle && <p className={`text-xs sm:text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{subtitle}</p>}
                </div>
                {rightAction}
            </div>
        )}
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
    </motion.div>
);

const App_en: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
  const [showFormulas, setShowFormulas] = useState(false);
  const data = SYNC_DATA;

  // Pie chart data for Section 2 (Inquiries)
  const inquiryChartData = [
    { name: 'Meta (Instagram & Facebook)', value: 466, color: '#4A2C5A' },
    { name: 'TikTok (Untracked / N/A)', value: 34, color: '#D1D5DB' }
  ];

  // Pie chart data for Section 3 Card A (June MTD deal split)
  const channelSplitData = data.digitalRevenue.cardA.split.map(item => ({
    name: item.name_en,
    value: item.deals,
    color: item.color
  }));

  return (
    <div className="min-h-screen pb-20 sm:pb-32 selection:bg-[#4A2C5A] selection:text-white bg-[#F5F5F7]">
      <Header onToggleLanguage={onToggleLanguage} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 px-2">
            <div className="mb-6 md:mb-0">
                <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] mb-3 sm:mb-4"
                >
                    Marketing <span className="text-[#4A2C5A]">Sync</span>
                </motion.h1>
                <div className="flex flex-wrap items-center gap-2.5">
                    <p className="text-sm sm:text-base text-gray-500 font-medium">{data.period.en}</p>
                    <span className="px-2.5 py-0.5 bg-[#4A2C5A]/10 text-[#4A2C5A] text-[9px] font-bold uppercase rounded-full tracking-wider border border-[#4A2C5A]/15">
                        Weekly Assessment
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
                <span>Formulas</span>
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
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#4A2C5A]/10 blur-xl rounded-full pointer-events-none" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{data.heroKPIs.inquiries.label_en}</p>
                <p className="text-4xl font-extrabold text-white tracking-tight mb-2">{data.heroKPIs.inquiries.value}</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium pt-3 border-t border-white/5">
                    <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <span>{data.heroKPIs.inquiries.sub_en}</span>
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
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-xl rounded-full pointer-events-none" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{data.heroKPIs.metaInquiries.label_en}</p>
                <p className="text-4xl font-extrabold text-white tracking-tight mb-2">{data.heroKPIs.metaInquiries.value}</p>
                <div className="flex items-center gap-1 text-[11px] text-[#A855F7] font-medium pt-3 border-t border-white/5">
                    <span>{data.heroKPIs.metaInquiries.sub_en}</span>
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
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-xl rounded-full pointer-events-none" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{data.heroKPIs.juneMTD.label_en}</p>
                <p className="text-4xl font-extrabold text-white tracking-tight mb-2">{data.heroKPIs.juneMTD.value}</p>
                <p className="text-[11px] text-green-400 font-medium pt-3 border-t border-white/5">
                    {data.heroKPIs.juneMTD.sub_en}
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
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 blur-xl rounded-full pointer-events-none" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{data.heroKPIs.juneSpend.label_en}</p>
                <p className="text-4xl font-extrabold text-red-400 tracking-tight mb-2">{data.heroKPIs.juneSpend.value}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-red-400 font-bold pt-3 border-t border-white/5">
                    <span className="bg-red-500/15 px-2 py-0.5 rounded-md text-[10px]">OVER CEILING</span>
                </div>
            </motion.div>

        </div>

        {/* Section 2 & 3: Inquiries & Digital Revenue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 sm:mb-12">
            
            {/* Section 2 Card: Inquiries Breakdown */}
            <BentoCard 
                className="lg:col-span-5 min-h-[420px]" 
                title="Weekly Sourcing" 
                subtitle="Over 500 inquiries generated in the past 7 days"
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
                            <span className="text-3xl font-bold text-[#1D1D1F] tracking-tight">{data.inquiriesSection.total}</span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Inquiries</span>
                        </div>
                    </div>

                    <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#4A2C5A]" />
                                <span className="text-xs font-semibold text-gray-700">Meta Network</span>
                            </div>
                            <span className="text-sm font-bold text-[#1D1D1F]">{data.inquiriesSection.meta} inquiries</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-gray-300" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-gray-500">TikTok Platform</span>
                                    <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">{data.inquiriesSection.tiktokNote_en}</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-gray-400">{data.inquiriesSection.tiktok}</span>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 italic leading-relaxed mt-4 bg-purple-50/40 p-3 rounded-xl border border-purple-500/10">
                        &ldquo;{data.inquiriesSection.caption_en}&rdquo;
                    </p>
                </div>
            </BentoCard>

            {/* Section 3 Card: Digital-Marketing Revenue */}
            <BentoCard 
                className="lg:col-span-7" 
                title="Paid Social Acquisition Revenue"
                subtitle="Performance breakdown by contract and channel"
            >
                <div className="flex-1 flex flex-col justify-between">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        
                        {/* Card A: June MTD */}
                        <div className="p-5 rounded-2xl bg-purple-50/35 border border-purple-100 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-[#4A2C5A]/5 blur-lg rounded-full pointer-events-none" />
                            <div>
                                <span className="px-2 py-0.5 bg-[#4A2C5A]/10 text-[#4A2C5A] text-[9px] font-bold uppercase rounded-md tracking-wider">
                                    {data.digitalRevenue.cardA.title_en}
                                </span>
                                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-3 mb-1">Mathwaa Net Share</p>
                                <p className="text-3xl font-extrabold text-[#4A2C5A] tracking-tight">
                                    {formatCurrency(data.digitalRevenue.cardA.share)}
                                </p>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-purple-100/50">
                                <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                                    <span>Paid Deals Won:</span>
                                    <span className="font-bold text-[#1D1D1F]">{data.digitalRevenue.cardA.deals}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-600">
                                    <span>Gross Lease Value:</span>
                                    <span className="font-bold text-[#1D1D1F]">{formatCurrency(data.digitalRevenue.cardA.gross)}</span>
                                </div>
                            </div>

                            {/* Share Split Mini Progress Stack */}
                            <div className="mt-4 pt-3 border-t border-purple-100/50">
                                <p className="text-[9px] text-[#4A2C5A] font-bold uppercase tracking-wider mb-2">Channel Split (Count)</p>
                                <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-200">
                                    {data.digitalRevenue.cardA.split.map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            style={{ width: `${(item.deals / data.digitalRevenue.cardA.deals) * 100}%`, backgroundColor: item.color }} 
                                            title={`${item.name_en}: ${item.deals}`} 
                                        />
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2.5">
                                    {data.digitalRevenue.cardA.split.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 text-[9px] text-gray-500">
                                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="font-medium truncate">{item.name_en}: <span className="font-bold text-[#1D1D1F]">{item.deals}</span></span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-purple-700 italic font-medium mt-3 bg-white/60 p-2 rounded-lg border border-purple-100">
                                    💡 {data.digitalRevenue.cardA.caption_en}
                                </p>
                            </div>
                        </div>

                        {/* Card B: Past Week */}
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-[9px] font-bold uppercase rounded-md tracking-wider">
                                    {data.digitalRevenue.cardB.title_en}
                                </span>
                                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-4 mb-1">Mathwaa Net Share</p>
                                <p className="text-3xl font-extrabold text-[#1D1D1F] tracking-tight">
                                    {formatCurrency(data.digitalRevenue.cardB.share)}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-200/60">
                                <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                                    <span>Date Range:</span>
                                    <span className="font-semibold text-[#1D1D1F]">{data.digitalRevenue.cardB.sub_en}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                                    <span>Deals Won:</span>
                                    <span className="font-bold text-[#1D1D1F]">{data.digitalRevenue.cardB.deals}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-600">
                                    <span>Gross Lease Value:</span>
                                    <span className="font-bold text-[#1D1D1F]">{formatCurrency(data.digitalRevenue.cardB.gross)}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
                            <span className="font-bold text-gray-500 block mb-1">Attribution Guideline:</span>
                            {data.digitalRevenue.footnote_en}
                        </p>
                    </div>
                </div>
            </BentoCard>

        </div>

        {/* Section 4: Content Plan Table */}
        <div className="mb-8 sm:mb-12">
            <BentoCard 
                title="New Branches Content Production Plan" 
                subtitle="One-time asset generation targeting vacancy clusters"
            >
                <div className="overflow-x-auto -mx-6 sm:-mx-8">
                    <div className="inline-block min-w-full align-middle px-6 sm:px-8">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead>
                                <tr className="text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <th scope="col" className="py-3 px-2">Location / Branches</th>
                                    <th scope="col" className="py-3 px-2 text-right">Videos</th>
                                    <th scope="col" className="py-3 px-2 text-right">Cost (SAR)</th>
                                    <th scope="col" className="py-3 px-4">Rationale / Sync Strategy</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {data.newBranchesPlan.rows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-2 font-semibold text-[#1D1D1F] max-w-[200px] sm:max-w-none truncate sm:whitespace-normal">
                                            {row.location_en}
                                        </td>
                                        <td className="py-4 px-2 text-right font-mono font-medium text-gray-600">
                                            {row.videos}
                                        </td>
                                        <td className="py-4 px-2 text-right font-mono font-bold text-[#4A2C5A]">
                                            {formatCurrency(row.cost)}
                                        </td>
                                        <td className="py-4 px-4 text-gray-500 leading-relaxed max-w-[300px] sm:max-w-none">
                                            {row.why_en}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="mt-5 p-3.5 bg-purple-50/30 rounded-2xl border border-purple-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-[#4A2C5A]">
                        {data.newBranchesPlan.caption_en}
                    </span>
                    <span className="px-2.5 py-0.5 bg-purple-500/15 text-purple-700 text-[10px] font-extrabold rounded-full self-start sm:self-auto">
                        TOTAL: 12 VIDEOS (SAR 6,000)
                    </span>
                </div>
            </BentoCard>
        </div>

        {/* Section 5: Budget Impact Tracker */}
        <div className="mb-8 sm:mb-12">
            <BentoCard 
                title="Budget Impact & Overage Analysis" 
                subtitle="Current marketing expenditures assessed against the SAR 18,000 monthly ceiling"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2">
                    
                    {/* Visual Progress Panel */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* June Tracker */}
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-center mb-2.5">
                                <div>
                                    <span className="text-sm font-bold text-[#1D1D1F]">June MTD Projection</span>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Ceiling: SAR 18,000</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-extrabold text-red-500">{formatCurrency(data.budgetImpact.june.total)}</span>
                                    <span className="block text-[10px] text-red-400 font-extrabold uppercase mt-0.5">+ {data.budgetImpact.june.pct}% Over</span>
                                </div>
                            </div>
                            
                            {/* Proportional visual bar */}
                            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div className="absolute top-0 left-0 bg-[#4A2C5A] h-full" style={{ width: '86%' }} /> {/* up to 18,000 */}
                                <div className="absolute top-0 left-[86%] bg-red-500 h-full animate-pulse" style={{ width: '14%' }} /> {/* excess of 2,851 */}
                            </div>

                            <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3.5 border-t border-gray-200/50 text-center">
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Already Spent</span>
                                    <span className="text-xs font-bold text-gray-700">{formatCurrency(data.budgetImpact.june.spent)}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Branch Content</span>
                                    <span className="text-xs font-bold text-gray-700">+{formatCurrency(data.budgetImpact.june.content)}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Added Paid Media</span>
                                    <span className="text-xs font-bold text-gray-700">+{formatCurrency(data.budgetImpact.june.paidMedia)}</span>
                                </div>
                            </div>
                        </div>

                        {/* July Tracker */}
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-center mb-2.5">
                                <div>
                                    <span className="text-sm font-bold text-[#1D1D1F]">July Strategy Projection</span>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Ceiling: SAR 18,000</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-lg font-extrabold ${data.budgetImpact.july.overage > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                                        ~{formatCurrency(data.budgetImpact.july.total)}
                                    </span>
                                    <span className={`block text-[10px] font-extrabold uppercase mt-0.5 ${data.budgetImpact.july.overage > 0 ? 'text-red-400' : 'text-emerald-500'}`}>
                                        {data.budgetImpact.july.overage > 0 ? `+ ~${data.budgetImpact.july.pct}% Over` : 'Within Ceiling'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Proportional visual bar */}
                            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div className="absolute top-0 left-0 bg-[#4A2C5A] h-full" style={{ width: data.budgetImpact.july.overage > 0 ? '78%' : '100%' }} />
                                {data.budgetImpact.july.overage > 0 && (
                                    <div className="absolute top-0 left-[78%] bg-red-500 h-full animate-pulse" style={{ width: '22%' }} />
                                )}
                            </div>

                            <div className={`grid gap-2.5 mt-4 pt-3.5 border-t border-gray-200/50 text-center ${data.budgetImpact.july.overage > 0 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Baseline Allotment</span>
                                    <span className="text-xs font-bold text-gray-700">{formatCurrency(data.budgetImpact.july.spent)}</span>
                                </div>
                                {data.budgetImpact.july.overage > 0 && (
                                    <div>
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase">Added Program Media</span>
                                        <span className="text-xs font-bold text-gray-700">+{formatCurrency(data.budgetImpact.july.paidMedia)}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] text-gray-400 italic text-center mt-3">
                                {data.budgetImpact.july.overage > 0 
                                    ? "* Note: June branch content (SAR 6k) is a one-time charge; excluded in July."
                                    : "* Note: No additional overage or creative production is forecasted for July yet."}
                            </p>
                        </div>

                    </div>

                    {/* Decision Callout Right Box */}
                    <div className="lg:col-span-5 h-full flex flex-col justify-between">
                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200/60 shadow-sm relative flex-1 flex flex-col justify-between">
                            <div className="absolute -top-3 left-6 px-3 py-1 bg-[#4A2C5A] text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                                DECISION CALLOUT
                            </div>
                            
                            <div className="my-3">
                                <p className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-2">BUDGET OVERAGE DETECTED</p>
                                <p className="text-sm font-semibold text-amber-900 leading-relaxed">
                                    &ldquo;{data.budgetImpact.caption_en}&rdquo;
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-amber-200">
                                <div className="flex items-center gap-2 mb-2 text-xs text-amber-800">
                                    <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                                    <span>June Overage: <b className="font-bold underline">+{formatCurrency(data.budgetImpact.june.overage)}</b></span>
                                </div>
                                {data.budgetImpact.july.overage > 0 && (
                                    <div className="flex items-center gap-2 text-xs text-amber-800">
                                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        <span>July Projected Overage: <b className="font-bold underline">+{formatCurrency(data.budgetImpact.july.overage)}</b></span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-[10px] text-gray-400 font-semibold leading-relaxed uppercase bg-gray-50 border border-gray-100 rounded-xl p-3">
                                📑 ASSUMPTIONS: {data.budgetImpact.footnote_en}
                            </p>
                        </div>
                    </div>

                </div>
            </BentoCard>
        </div>

        {/* Section 6: Mabaat Campaign Status */}
        <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-6 px-2">
                Mabaat Campaign Status <span className="text-gray-400 font-medium text-lg block sm:inline sm:ml-2">(Jeddah Buildings)</span>
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
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-extrabold text-base sm:text-lg text-[#1D1D1F] leading-tight">
                                {data.mabaatCampaign.building1.name_en}
                            </h3>
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[9px] font-extrabold rounded-full uppercase tracking-wider shrink-0 mb-2">
                                {data.mabaatCampaign.building1.status_en}
                            </span>
                        </div>

                        <ul className="space-y-3 mt-4">
                            {data.mabaatCampaign.building1.details_en.map((detail, dIdx) => (
                                <li key={dIdx} className="flex gap-2.5 text-xs text-gray-650 leading-relaxed font-medium">
                                    <span className="text-[#4A2C5A] font-extrabold select-none">•</span>
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">OWNERS / WORKSTREAM</p>
                        <div className="flex flex-wrap gap-1.5">
                            {data.mabaatCampaign.building1.owners.map((owner, oIdx) => (
                                <span key={oIdx} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-md border border-gray-200">
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
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-extrabold text-base sm:text-lg text-[#1D1D1F] leading-tight">
                                {data.mabaatCampaign.building2.name_en}
                            </h3>
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[9px] font-extrabold rounded-full uppercase tracking-wider shrink-0 mb-2 border border-amber-200/50">
                                {data.mabaatCampaign.building2.status_en}
                            </span>
                        </div>

                        <ul className="space-y-3 mt-4">
                            {data.mabaatCampaign.building2.details_en.map((detail, dIdx) => (
                                <li key={dIdx} className="flex gap-2.5 text-xs text-gray-650 leading-relaxed font-medium">
                                    <span className="text-[#A855F7] font-extrabold select-none">•</span>
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">OWNERS / WORKSTREAM</p>
                        <div className="flex flex-wrap gap-1.5">
                            {data.mabaatCampaign.building2.owners.map((owner, oIdx) => (
                                <span key={oIdx} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-md border border-gray-200">
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
                {data.reportingDate} · Mathwaa Marketing Sync Dashboard · Audience: Internal Leadership
            </p>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-3 max-w-4xl mx-auto">
                Attribution & Revenue calculation: Rent × Branch Management % over the verified lease timeline. Figures synchronized directly with production and sales databases.
            </p>
        </motion.footer>

        <FormulaModal isOpen={showFormulas} onClose={() => setShowFormulas(false)} lang="en" />
      </main>
    </div>
  );
};

export default App_en;
