import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Pricing from './Pricing';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Pricing />
    </div>
  );
};

export default Home;