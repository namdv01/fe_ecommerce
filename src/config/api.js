import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8778/',
	withCredentials: true,
});

api.interceptors.response.use((res) => {
	if (res.status === 200) return res.data;
	return res;
});

export default api;
