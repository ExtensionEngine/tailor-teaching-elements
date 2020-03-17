const getRandomString = () => Math.random().toString(16).slice(2);

export default () => `${getRandomString()}-${getRandomString()}`;
