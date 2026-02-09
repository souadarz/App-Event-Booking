import apiClient from "@/lib/axios.client";
import apiServer from "@/lib/axios.server";


export async function getPublishedEvents() {
  try {
    const response = await apiServer.get(`/events/published`);
    return response.data;
  } catch (error) {
    console.error('Error fetching published events:', error);
    return [];
  }
}

export async function getEventById(id: string) {
  try {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}