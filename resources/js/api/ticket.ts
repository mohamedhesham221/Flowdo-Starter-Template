import axios from "axios";

// @ts-ignore
const csrfToken = window?.Laravel.csrfToken;

export const updateTicketField = async ({ ticketId, field, value }) => {

    let data = { '_token': csrfToken, taskId: ticketId, field: field };
    data[field] = value;

    try {
        const response = await axios.post(route('tickets.fast_update'), data)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}