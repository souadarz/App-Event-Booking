import apiClient from "@/lib/axios.client";
import apiServer from "@/lib/axios.server";


export async function getUserReservations(userId: string) {
    try {
        const res = await apiServer.get(`reservations/user/${userId}`);
        return res.data;
    } catch (error) {
        console.error('erreur lors de récupération les reservation d`\'un utilisateur')
    }
}

export async function createReservation(eventId: string) {
    try {
        const res = await apiClient.post('/reservations', { eventId });
        return res.data;
    } catch (error) {
        console.error('erreur de creation d\'une reservation:', error);
        throw error;
    }
}