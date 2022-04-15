interface Data {
  [key: string]: string;
}

const postData = async (url: string, data: Data) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export default postData;
