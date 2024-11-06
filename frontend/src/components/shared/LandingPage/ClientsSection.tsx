'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Image from 'next/image';

interface Client {
  name: string;
  images: string[];
}

interface ClientsSectionProps {
  clients: Client[];
}

export default function ClientsSection({ clients }: ClientsSectionProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (clients.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % clients.length);
      }, 4000); // Change every 3 seconds

      return () => clearInterval(interval);
    }
  }, [clients.length]);

  if (!clients || clients.length === 0) return <p>not</p>;

  const displayedClients = [
    clients[index],
    clients[(index + 1) % clients.length],
    clients[(index + 2) % clients.length],
  ];

  return (
    <div className="w-full h-[400px] flex flex-row justify-around">
      <AnimatePresence>
        {displayedClients.map((client, i) => (
          <motion.div
            key={i}
            className={clsx(
              ' inset-0 flex flex-col items-center justify-center',
              i === 0 ? 'opacity-100' : 'opacity-0'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 , ease: 'easeInOut' }}
          >
            <Image
              src={`/imgs/${client.images[0]}`} 
              alt={client.name}
              width={200}
              height={200}
              className="w-[200px] h-[200px] rounded-full object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold">{client.name}</h3>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
