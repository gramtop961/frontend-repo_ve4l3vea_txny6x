import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Qe6dlWJktclXcUBS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />
      <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex items-center">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Yu‑Gi‑Oh! Tech Decks
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-zinc-300 max-w-2xl">
            Explore, search, and inspect card data with a sleek dark technology theme. Click any card to view detailed information, with smart fallbacks for missing data.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
