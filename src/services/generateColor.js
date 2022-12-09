const generateColor = (number) => {
	const result = [];
	const list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	for (let i = 0; i < number; i += 1) {
		result.push(list[Math.floor(Math.random() * 16)]);
	}
	if (result.findIndex((item) => item !== 255) < 0) return generateColor(number);
	return `#${result.join('')}`;
};

export default generateColor;
