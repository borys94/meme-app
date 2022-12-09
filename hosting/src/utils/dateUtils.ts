const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const dateUtils = {
  formatDate,
};

export default dateUtils;
