import apiClient from "@/lib/axios.client";
import apiServer from "@/lib/axios.server";


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getPublishedEvents() {
  try {
    const response = await apiServer.get(`${API_URL}/events/published`);
    return response.data;
  } catch (error) {
    console.error('Error fetching published events:', error);
    return [];
  }
}

export async function getEventById(id: string) {
  try {
    const response = await apiClient.get(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}