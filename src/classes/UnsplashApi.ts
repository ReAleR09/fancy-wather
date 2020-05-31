import AppConfig from '../config';

const { baseUrl, apiKey } = AppConfig.unsplash;

const getRandomPhotoByKeywords = (keywords: Array<string>) => {
  const query = keywords.join(' ');
  const requestUrl = `${baseUrl}?orientation=landscape&per_page=1&query=${query}`;

  const promise: Promise<string> = fetch(requestUrl, {
    headers: new Headers({
      Authorization: `Client-ID ${apiKey}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const imgUrl = data.urls.regular;
      return imgUrl;
    });

  return promise;
};

const UnsplashApi = {
  getRandomPhotoByKeywords,
};

export default UnsplashApi;
