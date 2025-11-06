import React from 'react';

const fallbackImage =
  'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200&auto=format&fit=crop';

const CardGrid = ({ cards, onSelect }) => {
  if (!cards || cards.length === 0) {
    return (
      <div className="text-center text-zinc-400 py-20">No cards found. Try another search.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 px-4 max-w-7xl mx-auto">
      {cards.map((card) => {
        const img = card?.card_images?.[0]?.image_url || card?.image_url || fallbackImage;
        const name = card?.name || 'Unknown Card';
        return (
          <button
            key={`${name}-${card?.id || Math.random()}`}
            onClick={() => onSelect(card)}
            className="group relative aspect-[2.5/3.5] overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg hover:shadow-cyan-500/20 transition transform hover:-translate-y-1"
          >
            <img
              src={img}
              alt={name}
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-2 text-left bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <p className="text-xs md:text-sm font-medium text-zinc-100 truncate group-hover:whitespace-normal group-hover:line-clamp-none line-clamp-1">
                {name}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CardGrid;
