import React from 'react';
import { Modal } from '../../components/common/Modal';
import { BLOUSE_SIZE_CHART } from '../../data/sizeChartData';
import { Info, Scissors } from 'lucide-react';

export function BlouseMeasurementChartModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Saree Blouse Fit & Measurement Chart"
      subtitle="Standard Indian readymade blouse sizes with built-in interior alteration margins."
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        
        {/* Margin Highlight Box */}
        <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <Scissors className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Built-In 2-Inch Alteration Allowance</span>
            All readymade blouses come with extra 2 inches of inner fabric margins along both side seams. If your bust falls between sizes, we recommend selecting your nearest standard size and loosening the inner stitches if needed.
          </div>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto rounded-xl border border-brand-nude">
          <table className="w-full text-left text-xs text-brand-charcoal">
            <thead className="bg-brand-cream border-b border-brand-nude uppercase tracking-wider font-semibold text-[10px] text-brand-subtle">
              <tr>
                <th className="p-3">Size</th>
                <th className="p-3">Bust</th>
                <th className="p-3">Waist</th>
                <th className="p-3">Shoulder</th>
                <th className="p-3">Armhole</th>
                <th className="p-3 text-emerald-700">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-nude/60">
              {BLOUSE_SIZE_CHART.map((row) => (
                <tr key={row.size} className="hover:bg-brand-cream/50 transition-colors">
                  <td className="p-3 font-bold text-brand-roseGold">{row.size}</td>
                  <td className="p-3">{row.bustInches}</td>
                  <td className="p-3">{row.waistInches}</td>
                  <td className="p-3">{row.shoulderInches}</td>
                  <td className="p-3">{row.armholeInches}</td>
                  <td className="p-3 font-semibold text-emerald-700">{row.innerMargin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tip */}
        <div className="p-3 bg-brand-cream rounded-xl border border-brand-nude/50 text-[11px] text-brand-subtle flex items-start gap-2">
          <Info className="w-4 h-4 text-brand-roseGold shrink-0 mt-0.5" />
          <span>
            <strong>How to measure:</strong> Measure with the bra you plan to wear underneath the saree blouse. Keep the tape parallel to the floor without squeezing tightly.
          </span>
        </div>

      </div>
    </Modal>
  );
}
