import apiServer from "@/lib/axios.server";


export async function getUserReservations(userId: string) {
    try {
        const res = await apiServer.get(`reservations/user/${userId}`);
        return res.data;
    } catch (error) {
        console.error('erreur lors de récupération les reservation d`\'un utilisateur')
    }
}