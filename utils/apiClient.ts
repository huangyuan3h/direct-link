class APIClient {
  private static readonly baseUrl: string =
    process.env.NEXT_PUBLIC_BACKEND_API ?? '';

  async post(url: string, body: object): Promise<any> {
    const response = await fetch(APIClient.baseUrl + url, {
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const data = await response.json();

    return data;
  }
}

export default APIClient;
