export async function fetchRequest(
  url: string,
  options: RequestInit,
  setLoading: (val: boolean) => void,
  setError: (val: string | null) => void,
  setData: (val: any) => void
): Promise<void> {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(url, options);
    const data = await response.json(); 

    if (!response.ok) {
      setError(data?.error || "Something went wrong");
    } else {
      setData(data); 
      console.log(data)
    }

  } catch (err: any) {
    setError(err.message || "Something went wrong");
    throw err;
  } finally {
    setLoading(false);
  }
}
