import axios from 'axios';

export async function getUserLocation() {
  try {
    const response = await axios.get('https://cloudflare.com/cdn-cgi/trace');
    const { data } = response;

    const locMatch = data.match(/loc=([^\n]+)/);
    if (locMatch && locMatch[1]) {
      const locValue = locMatch[1];
      return locValue;
    }
  } catch (error) {
    console.error(error);
  }
}
