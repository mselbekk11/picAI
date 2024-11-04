'use client';

import { createContext, useContext, useEffect, useState } from 'react';
// import { supabaseClient } from '@/utils/supabase/client';
import { supabaseBrowserClient } from '@/utils/supabase/client';

type CreditsContextType = {
  modelCredits: number;
  imageCredits: number;
  refreshCredits: () => Promise<void>;
};

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const [modelCredits, setModelCredits] = useState(0);
  const [imageCredits, setImageCredits] = useState(0);

  const refreshCredits = async () => {
    const { data: credits } = await supabaseBrowserClient()
      .from('user_credits')
      .select('model_credits, image_credits')
      .single();

    if (credits) {
      setModelCredits(credits.model_credits);
      setImageCredits(credits.image_credits);
    }
  };

  useEffect(() => {
    refreshCredits();
  }, []);

  return (
    <CreditsContext.Provider value={{ modelCredits, imageCredits, refreshCredits }}>
      {children}
    </CreditsContext.Provider>
  );
}

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (!context) throw new Error('useCredits must be used within CreditsProvider');
  return context;
};
