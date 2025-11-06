import React, { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import CardGrid from './components/CardGrid';
import CardModal from './components/CardModal';

const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

function App() {
  const [query, setQuery] = useState('dragon');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  // Lightweight normalization to guard against missing fields from mixed sources
  const normalize = (raw) => {
    if (!raw) return null;
    return {
      id: raw.id ?? Math.random().toString(36).slice(2),
      name: raw.name ?? 'Unknown Card',
      type: raw.type ?? raw.card_type ?? 'Card',
      desc: raw.desc ?? raw.description ?? 'No description available.',
      atk: raw.atk ?? undefined,
      def: raw.def ?? undefined,
      level: raw.level ?? raw.linkval ?? undefined,
      race: raw.race ?? raw.subtype ?? undefined,
      attribute: raw.attribute ?? raw.attr ?? undefined,
      archetype: raw.archetype ?? undefined,
      card_images: raw.card_images ?? (raw.image_url ? [{ image_url: raw.image_url }] : undefined),
      image_url: raw.image_url, // keep for safety with our UI
    };
  };

  const fetchCards = async (q) => {
    const name = (q ?? '').trim();
    if (!name) return;
    setLoading(true);
    setError(null);
    try {
      const url = `${API_URL}?fname=${encodeURIComponent(name)}&num=60&offset=0`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch cards');
      const data = await res.json();
      const list = Array.isArray(data?.data) ? data.data : [];
      const normalized = list.map(normalize).filter(Boolean);
      setCards(normalized);
    } catch (err) {
      setError('There was a problem fetching cards. Try a different search.');
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    fetchCards(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (q) => {
    setQuery(q);
    fetchCards(q);
  };

  const onSelect = (card) => {
    setSelected(normalize(card));
    setOpen(true);
  };

  // Simple custom-card add flow for images not present in API
  const [customName, setCustomName] = useState('');
  const [customImg, setCustomImg] = useState('');
  const [customDesc, setCustomDesc] = useState('');

  const canAddCustom = useMemo(() => customName.trim() && customImg.trim(), [customName, customImg]);

  const addCustomCard = (e) => {
    e.preventDefault();
    if (!canAddCustom) return;
    const custom = normalize({
      name: customName.trim(),
      desc: customDesc.trim() || 'Custom card added locally.',
      image_url: customImg.trim(),
      type: 'Custom',
    });
    setCards((prev) => [custom, ...prev]);
    setCustomName('');
    setCustomImg('');
    setCustomDesc('');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />

      <div className="max-w-6xl mx-auto -mt-10 md:-mt-14 relative z-10">
        <div className="px-4">
          <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} />
        </div>

        <div className="px-4 mt-6">
          <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/10 rounded-2xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold">Add a custom card</h2>
            <p className="text-zinc-400 text-sm mt-1">Use this if a card isn’t available from the API. Provide a name and an image URL. Description is optional.</p>
            <form onSubmit={addCustomCard} className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-3">
              <input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Card name"
                className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-600"
              />
              <input
                value={customImg}
                onChange={(e) => setCustomImg(e.target.value)}
                placeholder="Image URL (jpg/png/webp)"
                className="md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-600"
              />
              <button
                type="submit"
                disabled={!canAddCustom}
                className="md:col-span-1 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-medium disabled:opacity-50"
              >
                Add
              </button>
              <textarea
                value={customDesc}
                onChange={(e) => setCustomDesc(e.target.value)}
                placeholder="Optional description"
                className="md:col-span-6 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-600"
                rows={2}
              />
            </form>
          </div>
        </div>

        <div className="px-4 mt-6">
          {loading && (
            <div className="text-center text-zinc-400 py-12">Loading cards…</div>
          )}
          {error && (
            <div className="text-center text-red-400 py-6">{error}</div>
          )}
          {!loading && !error && <CardGrid cards={cards} onSelect={onSelect} />}
        </div>
      </div>

      <CardModal open={open} onClose={() => setOpen(false)} card={selected} />

      <footer className="mt-16 py-10 text-center text-xs text-zinc-500">
        Made with a dark, tech aesthetic. Data from YGOPRODeck API with graceful fallbacks for missing cards.
      </footer>
    </div>
  );
}

export default App;
