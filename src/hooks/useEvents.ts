// hooks/useEvents.ts
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';

export function useUpcomingEvents(limit: number = 3) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUpcomingEvents() {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'upcoming')
          .order('start_date', { ascending: true })
          .limit(limit);

        if (error) throw error;
        
        const transformedData = data?.map(item => ({
          ...item,
          status: item.status as EventStatus,
          event_type: item.event_type as EventType
        })) || [];
        
        setEvents(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch upcoming events');
        console.error('Error fetching upcoming events:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUpcomingEvents();
  }, [limit]);

  return { events, loading, error };
}