import axios from "axios";


/* It's an async function that makes a GET request to the server, and then dispatches the response to
 the reducer. */
export function getFilteredFiles() { 
    return async function (dispatch) {
      try {
        const info = await axios.get("http://localhost:3001/files/data"); 
        return dispatch({
          type: "FILTERED_FILES",
          payload: info.data.data,
        });
      } catch (error) {
        console.log("Files not found", error);
      }
    };
  }
/* It's an async function that makes a GET request to the server to find all the files from the API, and then dispatches the response to
 the reducer. */
  export function getAllFiles() { 
    return async function (dispatch) {
      try {
        const info = await axios.get("http://localhost:3001/files/list"); 
  
        return dispatch({
          type: "ALL_FILES",
          payload:info.data.data,
        });
      } catch (error) {
        console.log("Files not found", error);
      }
    };
  }

  /** In this case the function takes a fileName as an argument to find the files the user needs. As there is several files with the same name, it will return an object with all the files that matched whit the argument 
   */
  
  export function getOneFile(fileName) { 
    console.log(fileName)
    return async function (dispatch) {
      try {
        const info = await axios.get("http://localhost:3001/files/list?fileName=" + fileName); 
  
        return dispatch({
          type: "ONE_FILE",
          payload: info.data.data,
        });
      } catch (error) {
        console.log("File not found", error);
      }
    };
  }
