export async function getMaterialData() {
    //const response = await fetch("http://classwork.engr.oregonstate.edu:4569");
    const response = await fetch("http://localhost:8080/materials");
    console.log("Response status:", response.status);
    if (!response.ok) {       // ok is a boolean method of the Response object
      const error = new Error("An error occured while fetching the MySQLResult");
      error.code = response.status; //tacks the HTTP status code to the error
      error.info = await response.json(); //converts the response body to JSON in order to include more details about the error provided by the server
      console.log(error);
      throw error;
    }
    
    const result = await response.json();
    return result;
  }