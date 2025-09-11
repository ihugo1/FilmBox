import { BASE_URL, API_KEY } from "../config/tmdb.config";

export const apiRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error");
    } else if (error instanceof SyntaxError) {
      throw new Error("Invalid server response (non-JSON)");
    } else {
      throw error;
    }
  }
};
