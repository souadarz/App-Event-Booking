import apiClient from '@/lib/axios.client';
import apiServer from '@/lib/axios.server';
import { CreateEventDto, UpdateEventDto } from '@/types/event.type';


export async function getAllEvents(token?: string) {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await apiClient.get('/events/all', config);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}


export async function getEventById(id: string, token?: string) {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await apiServer.get(`/events/admin/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export async function getAllReservations(token?: string) {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await apiServer.get('/reservations', config);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
}


export async function createEvent(eventData: CreateEventDto) {
  try {
    const response = await apiClient.post('/events', eventData);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.error('Validation Error details:', JSON.stringify(error.response.data, null, 2));
    }
    console.error('Error creating event:', error);
    throw error;
  }
}

export async function updateEvent(eventId: string, eventData: UpdateEventDto) {
  try {
    const response = await apiClient.patch(`/events/${eventId}`, eventData);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.error('Validation Error details:', JSON.stringify(error.response.data, null, 2));
    }
    console.error('Error updating event:', error);
    throw error;
  }
}

export async function publishEvent(eventId: string) {
  try {
    const response = await apiClient.patch(`/events/${eventId}/publish`);
    return response.data;
  } catch (error) {
    console.error('Error publishing event:', error);
    throw error;
  }
}

export async function cancelEvent(eventId: string) {
  try {
    const response = await apiClient.patch(`/events/${eventId}/cancel`);
    return response.data;
  } catch (error) {
    console.error('Error canceling event:', error);
    throw error;
  }
}

export async function deleteEvent(eventId: string) {
  try {
    await apiClient.delete(`/events/${eventId}`);
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
  }
}

export async function confirmReservation(reservationId: string) {
  try {
    const response = await apiClient.patch(`/reservations/${reservationId}/confirm`);
    return response.data;
  } catch (error) {
    console.error('Error confirming reservation:', error);
    throw error;
  }
}

export async function refuseReservation(reservationId: string) {
  try {
    const response = await apiClient.patch(`/reservations/${reservationId}/refuse`);
    return response.data;
  } catch (error) {
    console.error('Error refusing reservation:', error);
    throw error;
  }
}

export async function cancelReservation(reservationId: string) {
  try {
    const response = await apiClient.patch(`/reservations/${reservationId}/cancel`);
    return response.data;
  } catch (error) {
    console.error('Error canceling reservation:', error);
    throw error;
  }
}

export async function getReservationsByEvent(eventId: string) {
  try {
    const response = await apiClient.get(`/reservations/event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations by event:', error);
    return [];
  }
}
