const dayjs = require('dayjs');

const formatDay = {
	TDMY(day) {
		return dayjs(day).format('HH:mm  DD/MM/YYYY');
	},
};

export default formatDay;
