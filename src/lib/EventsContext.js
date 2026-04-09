import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';

const EventsContext = createContext({ events: [], years: [], reload: () => {} });

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [years, setYears]   = useState([]);

  const reload = useCallback(async () => {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    const evs = data || [];
    setEvents(evs);
    // Collect unique years sorted descending
    const ys = [...new Set(evs.map(e => e.year).filter(Boolean))].sort((a, b) => b - a);
    setYears(ys);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  return <EventsContext.Provider value={{ events, years, reload }}>{children}</EventsContext.Provider>;
}

export const useEvents = () => useContext(EventsContext);
