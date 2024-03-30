const plantnetAPI = async (path, query = {}) => {
  try {
    const searchParams = new URLSearchParams({ 'api-key': process.env.PLANTNET_API_KEY, ...query });
    const response = await fetch(`https:/my-api.plantnet.org/v2/${path}?${searchParams.toString()}`);
    return response.json();
  }
  catch (error) {
    throw new Error('PlantNet API request failed', error);
  }
};

export const getLanguages = () => {
  return plantnetAPI('languages');
};

export const getProjects = (lang) => {
  return plantnetAPI('projects', { lang });
};
