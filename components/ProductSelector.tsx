import React from 'react';
import { Peptide } from '../types';
import { Eye, Check, Star, Zap } from 'lucide-react';

export const PEPTIDES: Peptide[] = [
  {
    id: 'semaglutide',
    name: 'Semaglutide',
    fullName: 'GLP-1 Receptor Agonist',
    price: 115.00,
    size: '5mg',
    description: 'Semaglutide is a glucagon-like peptide-1 (GLP-1) analog. Research indicates it increases insulin secretion, decreases glucagon secretion, and slows gastric emptying.',
    category: 'Metabolic',
    purity: '>99.5%',
    sequence: 'H-His-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys(AEEAc-AEEAc-gamma-Glu-17-carboxyheptadecanoyl)-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Gly-OH',
    casNumber: '910463-68-2',
    molarMass: '4113.58 g/mol',
    inStock: true,
    bestseller: true,
    reviews: [
        { id: '1', user: 'J.D.', rating: 5, comment: 'Excellent purity, verified by third-party lab.', date: '2023-10-12', verified: true },
        { id: '2', user: 'ResearchLab_TX', rating: 5, comment: 'Consistent results in our metabolic trials.', date: '2023-11-05', verified: true }
    ]
  },
  {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    fullName: 'GIP/GLP-1 Dual Agonist',
    price: 165.00,
    size: '10mg',
    description: 'Tirzepatide is a dual glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptor agonist.',
    category: 'Metabolic',
    purity: '>99.3%',
    sequence: 'Y-{Aib}-EGTFTSDYSI-{Aib}-LDKIAQKAFVQWLIAGGPSSGAPPPS',
    casNumber: '2023788-19-2',
    molarMass: '4813.53 g/mol',
    inStock: true,
    bestseller: true,
    reviews: [
        { id: '3', user: 'Dr. Smith', rating: 5, comment: 'Top tier quality. Solved easily.', date: '2023-12-01', verified: true }
    ]
  },
  {
    id: 'retatrutide',
    name: 'Retatrutide',
    fullName: 'GGG Tri-Agonist',
    price: 189.00,
    size: '10mg',
    description: 'A novel triple hormone receptor agonist (GLP-1, GIP, and Glucagon receptors). Shows high potency in recent obesity models.',
    category: 'Metabolic',
    purity: '>99.1%',
    casNumber: '2381089-83-2',
    molarMass: '4731.33 g/mol',
    inStock: true,
    bestseller: false,
    reviews: []
  },
  {
    id: 'bpc-157',
    name: 'BPC-157',
    fullName: 'Body Protection Compound 157',
    price: 45.00,
    size: '5mg',
    description: 'Pentadecapeptide derived from human gastric juice. Widely researched for its cytoprotective and wound healing acceleration properties.',
    category: 'Recovery',
    purity: '>99.8%',
    sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Add-Asp-Asp-Ala-Gly-Leu-Val',
    casNumber: '137525-51-0',
    molarMass: '1419.56 g/mol',
    inStock: true,
    bestseller: true,
    reviews: [
        { id: '4', user: 'AthleteRecov', rating: 5, comment: 'Standard for tendon research.', date: '2023-09-20', verified: true }
    ]
  },
  {
    id: 'tb-500',
    name: 'TB-500',
    fullName: 'Thymosin Beta-4',
    price: 48.00,
    size: '5mg',
    description: 'Synthetic fraction of thymosin beta-4. Promotes endothelial cell differentiation and angiogenesis in keratinocyte migration.',
    category: 'Recovery',
    purity: '>99.6%',
    sequence: 'Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser',
    casNumber: '77591-33-4',
    molarMass: '4963.49 g/mol',
    inStock: true,
    bestseller: false,
    reviews: []
  },
  {
    id: 'cjc-1295',
    name: 'CJC-1295',
    fullName: 'CJC-1295 No DAC',
    price: 38.00,
    size: '2mg',
    description: 'Tetrasubstituted 30-amino acid peptide hormone. Growth hormone releasing hormone analog used to stimulate GH secretion.',
    category: 'Anti-Aging',
    purity: '>99.4%',
    inStock: true,
    bestseller: false,
    reviews: []
  },
  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    fullName: 'Selective GH Secretagogue',
    price: 32.00,
    size: '2mg',
    description: 'Pentapeptide that mimics ghrelin. Known for high specificity to GH receptors without significant increase in cortisol.',
    category: 'Anti-Aging',
    purity: '>99.4%',
    inStock: true,
    bestseller: true,
    reviews: []
  },
  {
    id: 'mots-c',
    name: 'MOTS-c',
    fullName: 'Mitochondrial Derived Peptide',
    price: 55.00,
    size: '10mg',
    description: 'Peptide encoded in the mitochondrial genome. Studies suggest it regulates metabolic homeostasis and insulin sensitivity.',
    category: 'Metabolic',
    purity: '>98.5%',
    inStock: true,
    bestseller: false,
    reviews: []
  },
  {
    id: 'ghk-cu',
    name: 'GHK-Cu',
    fullName: 'Copper Peptide',
    price: 35.00,
    size: '50mg',
    description: 'Naturally occurring copper complex. Studied for skin remodeling, collagen synthesis, and anti-inflammatory actions.',
    category: 'Anti-Aging',
    purity: '>99.0%',
    inStock: true,
    bestseller: false,
    reviews: []
  },
  {
    id: 'pt-141',
    name: 'PT-141',
    fullName: 'Bremelanotide',
    price: 42.00,
    size: '10mg',
    description: 'Melanocortin receptor agonist. Research focuses on treatment of sexual dysfunction and libido enhancement.',
    category: 'Nootropic',
    purity: '>99.2%',
    inStock: true,
    bestseller: false,
    reviews: []
  },
  {
    id: 'epitalon',
    name: 'Epitalon',
    fullName: 'Epithalamin',
    price: 45.00,
    size: '10mg',
    description: 'Synthetic peptide that activates the telomerase enzyme in cells. Studied for life extension properties.',
    category: 'Anti-Aging',
    purity: '>99.1%',
    inStock: false,
    bestseller: false,
    reviews: []
  },
  {
    id: 'tesamorelin',
    name: 'Tesamorelin',
    fullName: 'GHRH Analog',
    price: 65.00,
    size: '2mg',
    description: 'A synthetic form of growth-hormone-releasing hormone. Investigated for reduction of visceral adipose tissue.',
    category: 'Metabolic',
    purity: '>99.3%',
    inStock: true,
    bestseller: false,
    reviews: []
  }
];

interface PeptideCatalogProps {
  onViewProduct: (peptide: Peptide) => void;
}

const PeptideCatalog: React.FC<PeptideCatalogProps> = ({ onViewProduct }) => {
  const [filter, setFilter] = React.useState('All');

  const filteredPeptides = filter === 'All' 
    ? PEPTIDES 
    : PEPTIDES.filter(p => p.category === filter);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-white tracking-tight">Complete Catalog</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {['All', 'Recovery', 'Metabolic', 'Anti-Aging', 'Nootropic'].map(cat => (
             <button 
               key={cat} 
               onClick={() => setFilter(cat)}
               className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all ${
                 filter === cat 
                 ? 'bg-teal-500 border-teal-500 text-slate-900' 
                 : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
               }`}
             >
               {cat}
             </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPeptides.map((item) => (
            <div 
              key={item.id}
              onClick={() => onViewProduct(item)}
              className={`group relative bg-slate-800 border transition-all duration-300 rounded-2xl p-5 flex flex-col cursor-pointer overflow-hidden ${
                !item.inStock ? 'opacity-70 grayscale' : 'hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/30 border-slate-700 hover:border-teal-500/50'
              }`}
            >
              {item.bestseller && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1">
                  <Zap size={10} fill="black" /> BESTSELLER
                </div>
              )}
              
              {!item.inStock && (
                <div className="absolute top-0 left-0 bg-slate-700 text-slate-300 text-[10px] font-bold px-3 py-1 rounded-br-xl z-10">
                  OUT OF STOCK
                </div>
              )}

              <div className="mb-4 flex justify-between items-start">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${
                  item.category === 'Recovery' ? 'bg-blue-900/50 text-blue-400 border border-blue-500/30' :
                  item.category === 'Metabolic' ? 'bg-purple-900/50 text-purple-400 border border-purple-500/30' :
                  item.category === 'Anti-Aging' ? 'bg-amber-900/50 text-amber-400 border border-amber-500/30' :
                  'bg-emerald-900/50 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {item.category}
                </span>
              </div>

              <div className="relative h-32 mb-4 bg-slate-900/50 rounded-xl border border-slate-700/50 flex items-center justify-center overflow-hidden group-hover:border-teal-500/30 transition-colors">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                  {/* Generic Vial Visual */}
                  <div className="relative w-8 h-16 bg-slate-800 rounded-b-lg border-x border-b border-slate-600 shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-slate-500 rounded-t-sm"></div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-gradient-to-r from-teal-400/30 to-blue-400/30 rounded-t-sm animate-pulse"></div>
                      <div className="absolute bottom-2 inset-x-1 h-8 bg-slate-200/10 rounded-sm"></div>
                      <div className="absolute top-4 inset-x-0 h-6 bg-slate-700 flex items-center justify-center">
                          <span className="text-[6px] text-white font-mono">{item.id.substring(0,3).toUpperCase()}</span>
                      </div>
                  </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">{item.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                 <div className="flex text-teal-500 text-[10px]">
                    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                 </div>
                 <span className="text-[10px] text-slate-500">{item.purity} Purity</span>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-mono">{item.size}</span>
                  <span className="text-lg font-bold text-white">${item.price.toFixed(2)}</span>
                </div>
                
                <button
                  className="px-4 py-2 bg-slate-700 text-white hover:bg-teal-500 hover:text-slate-900 text-sm font-bold rounded-lg transition-all flex items-center gap-2"
                >
                  View <Eye size={16} />
                </button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PeptideCatalog;
