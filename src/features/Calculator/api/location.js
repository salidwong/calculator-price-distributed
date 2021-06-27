export const fetchLocation = async () => {
  const url = "https://5efabb3a80d8170016f758ee.mockapi.io/locations";
  const response = await fetch(url);
  const parseJson = await response.json();

  return parseJson;
};
