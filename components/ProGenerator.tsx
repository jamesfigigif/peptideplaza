import React, { useState } from 'react';
import { ImageSize, LoadingState } from '../types';
import { generateMoleculeVisual } from '../services/geminiService';
import { Atom, Download, AlertCircle, Microscope } from 'lucide-react';

const MoleculeVisualizer: React.FC = () => {
  const [peptideName, setPeptideName] = useState('');
  const [details, setDetails] = useState('');
  const [size, setSize] = useState<ImageSize>(ImageSize.SIZE_1K);
  const [status, setStatus] = useState<LoadingState>('idle');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!peptideName.trim()) return;
    
    setStatus('generating');
    setError(null);
    try {
      const img = await generateMoleculeVisual(peptideName, details, size);
      setResultImage(img);
      setStatus('idle');
    } catch (e: any) {
      setStatus('error');
      setError(e.message || "Generation failed. Please check your API key.");
    }
  };

  const handleDownload = () => {
      if (!resultImage) return;
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `molecule-${peptideName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Controls */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 h-full">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Atom className="text-teal-400" size={20} />
                Molecule Visualizer
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wide">Peptide Name</label>
                    <input 
                        type="text"
                        value={peptideName}
                        onChange={(e) => setPeptideName(e.target.value)}
                        placeholder="e.g., Tirzepatide"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wide">Structural Focus</label>
                    <textarea 
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Describe specific binding sites or folding structures..."
                        className="w-full h-24 bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Resolution</label>
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
                        {Object.values(ImageSize).map((s) => (
                            <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                    size === s 
                                    ? 'bg-teal-600 text-white shadow-sm' 
                                    : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleGenerate}
                        disabled={status === 'generating' || !peptideName}
                        className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-teal-900/20 transition-all flex items-center justify-center gap-2"
                    >
                        {status === 'generating' ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Rendering Structure...
                            </>
                        ) : (
                            <>
                                <Microscope size={18} />
                                Generate 3D Model
                            </>
                        )}
                    </button>
                    <p className="text-[10px] text-slate-500 text-center mt-3">
                        Uses Gemini 3 Pro for high-fidelity rendering.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden group min-h-[400px] flex items-center justify-center">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
         
         {resultImage ? (
             <>
                <img src={resultImage} alt="Molecule" className="w-full h-full object-contain z-10" />
                <button 
                    onClick={handleDownload}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-lg backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-20"
                >
                    <Download size={20} />
                </button>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur text-white text-xs rounded-full z-20 font-mono">
                   AI Generated Representation
                </div>
             </>
         ) : (
            <div className="flex flex-col items-center justify-center text-slate-600 z-10">
                {status === 'generating' ? (
                     <div className="flex flex-col items-center animate-pulse">
                        <Atom className="animate-spin-slow mb-4 text-teal-500" size={48} />
                        <p className="text-teal-400">Processing molecular geometry...</p>
                     </div>
                ) : status === 'error' ? (
                    <div className="text-red-400 flex flex-col items-center max-w-xs text-center">
                        <AlertCircle size={48} className="mb-4 opacity-50"/>
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        <Atom size={64} className="mb-4 opacity-20" />
                        <p className="text-sm uppercase tracking-widest opacity-50">Awaiting Peptide Input</p>
                    </>
                )}
            </div>
         )}
      </div>
    </div>
  );
};

export default MoleculeVisualizer;