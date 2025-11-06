import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-4">
      <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 shadow-inner shadow-black/30">
        <Search className="w-5 h-5 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cards by name (e.g., Blue-Eyes, Dark Magician)"
          className="flex-1 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
