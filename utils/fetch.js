const getRequest = async ({ url, endpoint, token }) => {
  url ??= `${process.env.EXPO_PUBLIC_BACKEND_URL}${endpoint}/`;

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

const postRequest = async ({ endpoint, body, url, token }) => {
  url ??= `${process.env.EXPO_PUBLIC_BACKEND_URL}${endpoint}/`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    method: "POST",
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error(`Response failed with status ${response.status}`, {
      cause: error,
    });
  }

  const jsonResponse = await response.json();
  return jsonResponse;
};

export { getRequest, postRequest };
