// hooks/useEvents.ts
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';

export function useUpcomingEvents(limit: number = 3) {
  const [events, setEvents] = useState<AppEvent[]>([]);
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

        // Transform the data to match AppEvent interface
        const transformedData = data?.map((item: any) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          full_description: item.full_description,
          event_type: item.event_type as EventType,
          status: item.status as EventStatus,
          start_date: item.start_date,
          end_date: item.end_date,
          timezone: item.timezone,
          is_virtual: item.is_virtual || false,
          venue_name: item.venue_name,
          venue_address: item.venue_address,
          venue_city: item.venue_city,
          venue_country: item.venue_country,
          online_platform: item.online_platform,
          meeting_link: item.meeting_link,
          meeting_password: item.meeting_password,
          organizer_name: item.organizer_name,
          organizer_email: item.organizer_email,
          organizer_phone: item.organizer_phone,
          organizer_website: item.organizer_website,
          speakers: item.speakers || [],
          agenda: item.agenda || [],
          banner_image: item.banner_image,
          thumbnail_url: item.thumbnail_url,
          gallery_images: item.gallery_images || [],
          video_recording_url: item.video_recording_url,
          presentation_slides_url: item.presentation_slides_url,
          requires_registration: item.requires_registration || false,
          registration_url: item.registration_url,
          registration_deadline: item.registration_deadline,
          max_attendees: item.max_attendees,
          current_attendees: item.current_attendees || 0,
          ticket_price: item.ticket_price,
          currency: item.currency || 'KES',
          payment_methods: item.payment_methods || [],
          tags: item.tags || [],
          topics: item.topics || [],
          target_audience: item.target_audience || [],
          prerequisites: item.prerequisites || [],
          resource_links: item.resource_links || [],
          social_links: item.social_links || {},
          event_hashtag: item.event_hashtag,
          feedback_form_url: item.feedback_form_url,
          average_rating: item.average_rating,
          feedback_count: item.feedback_count || 0,
          is_featured: item.is_featured || false,
          is_recurring: item.is_recurring || false,
          recurring_pattern: item.recurring_pattern,
          parent_event_id: item.parent_event_id,
          meta_title: item.meta_title,
          meta_description: item.meta_description,
          meta_keywords: item.meta_keywords || [],
          created_by: item.created_by,
          created_at: item.created_at,
          updated_at: item.updated_at,
          published_at: item.published_at
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

// Optional: Add function to fetch a single event by slug
export function useEventBySlug(slug: string) {
  const [event, setEvent] = useState<AppEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEventBySlug() {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;

        if (data) {
          const transformedData = {
            id: data.id,
            title: data.title,
            slug: data.slug,
            description: data.description,
            full_description: data.full_description,
            event_type: data.event_type as EventType,
            status: data.status as EventStatus,
            start_date: data.start_date,
            end_date: data.end_date,
            timezone: data.timezone,
            is_virtual: data.is_virtual || false,
            venue_name: data.venue_name,
            venue_address: data.venue_address,
            venue_city: data.venue_city,
            venue_country: data.venue_country,
            online_platform: data.online_platform,
            meeting_link: data.meeting_link,
            meeting_password: data.meeting_password,
            organizer_name: data.organizer_name,
            organizer_email: data.organizer_email,
            organizer_phone: data.organizer_phone,
            organizer_website: data.organizer_website,
            speakers: data.speakers || [],
            agenda: data.agenda || [],
            banner_image: data.banner_image,
            thumbnail_url: data.thumbnail_url,
            gallery_images: data.gallery_images || [],
            video_recording_url: data.video_recording_url,
            presentation_slides_url: data.presentation_slides_url,
            requires_registration: data.requires_registration || false,
            registration_url: data.registration_url,
            registration_deadline: data.registration_deadline,
            max_attendees: data.max_attendees,
            current_attendees: data.current_attendees || 0,
            ticket_price: data.ticket_price,
            currency: data.currency || 'KES',
            payment_methods: data.payment_methods || [],
            tags: data.tags || [],
            topics: data.topics || [],
            target_audience: data.target_audience || [],
            prerequisites: data.prerequisites || [],
            resource_links: data.resource_links || [],
            social_links: data.social_links || {},
            event_hashtag: data.event_hashtag,
            feedback_form_url: data.feedback_form_url,
            average_rating: data.average_rating,
            feedback_count: data.feedback_count || 0,
            is_featured: data.is_featured || false,
            is_recurring: data.is_recurring || false,
            recurring_pattern: data.recurring_pattern,
            parent_event_id: data.parent_event_id,
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            meta_keywords: data.meta_keywords || [],
            created_by: data.created_by,
            created_at: data.created_at,
            updated_at: data.updated_at,
            published_at: data.published_at
          };
          setEvent(transformedData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch event');
        console.error('Error fetching event by slug:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEventBySlug();
  }, [slug]);

  return { event, loading, error };
}
