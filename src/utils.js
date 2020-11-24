export const getYear = date => {
  if (!date || date.length < 4) return 'N/A';
  return date.substr(0, 4);
};

export const getData = (data) => {
  if (!data) return 'N/A';
  return data;
};

export const getOverview = (data) => {
  if (!data) return 'N/A';
  return data.substr(0, 100);
};

export const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const generateConfig = (method, body) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return config;
};
