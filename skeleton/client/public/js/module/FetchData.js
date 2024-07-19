export const FetchData = async (portNum,urlString) => {
  const response = await fetch(`http://localhost:${portNum}/${urlString}`);
  const data = await response.json();

  return data;
}