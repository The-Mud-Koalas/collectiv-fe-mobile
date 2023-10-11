const getRequest = async ({ url, endpoint, token }) => {
  url ??= `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}/`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response failed with status ${response.status}`, {
      cause: response,
    });
  }

  const jsonResponse = await response.json();
  return jsonResponse;
};

export { getRequest };
