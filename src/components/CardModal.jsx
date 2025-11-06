import React from 'react';
import { X, Star } from 'lucide-react';

const Badge = ({ children }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/10 text-white border border-white/10">{children}</span>
);

const CardModal = ({ open, onClose, card }) => {
  if (!open || !card) return null;

  const {
    name = 'Unknown Card',
    type = 'Card',
    desc = 'No description available.',
    atk,
    def,
    level,
    race,
    attribute,
    archetype,
    card_images,
  } = card || {};

  const img = card_images?.[0]?.image_url || card?.image_url ||
    'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 max-w-4xl w-[95vw] md:w-full mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-5/12 bg-black/40">
            <img
              src={img}
              alt={name}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200&auto=format&fit=crop';
              }}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-7/12 p-5 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white">{name}</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {type && <Badge>{type}</Badge>}
                  {race && <Badge>{race}</Badge>}
                  {attribute && <Badge>{attribute}</Badge>}
                  {archetype && <Badge>{archetype}</Badge>}
                </div>
              </div>
              <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-4 text-zinc-300 text-sm leading-relaxed whitespace-pre-line">{desc}</p>

            {(atk !== undefined || def !== undefined || level !== undefined) && (
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-zinc-400">ATK</p>
                  <p className="text-lg font-semibold text-white">{atk ?? '-'}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-zinc-400">DEF</p>
                  <p className="text-lg font-semibold text-white">{def ?? '-'}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-zinc-400">Level</p>
                  <p className="text-lg font-semibold text-white">{level ?? '-'}</p>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-2 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <p className="text-xs">Click outside the panel or press close to dismiss</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
