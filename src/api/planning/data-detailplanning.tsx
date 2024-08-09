export type resultplanning = {
    "date": string,
    "number_planning": 1
  }
  
  
  export async function data_detailplanning(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
  
  
    const response = await fetch(
      `/api/detailplanning/`
    );
  
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultplanning[];
    console.log(documents, "test");
    return documents.slice(0, documents.length).map(({ date, number_planning}) => ({
      date, number_planning
    }));
  }