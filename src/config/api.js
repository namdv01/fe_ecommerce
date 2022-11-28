import axios from 'axios';
import { API } from '../services/constants';

const api = axios.create({
	baseURL: API,
	withCredentials: true,
});

api.interceptors.response.use((res) => {
	if (res.status === 200) return res.data;
	return res;
});

export default api;
