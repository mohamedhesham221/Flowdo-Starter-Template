import axios from "axios";

// @ts-ignore
const csrfToken = window?.Laravel.csrfToken;

export const searchStore = async ({ module, keyword }) => {

    let data = { '_token': csrfToken, search_module: module, search_keyword: keyword };

    try {
        const response = await axios.post(route('search.store'), data)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getUnreadNotifications = async () => {

    try {
        const response = await axios.get(route('get_notifications'));
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}