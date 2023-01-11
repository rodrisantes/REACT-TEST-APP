import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredFiles, getAllFiles, getOneFile } from "../redux";

export default function ShowInfo() {
  /*Setting a local state that will render*/
  const [localFiles, setFiles] = useState([]);

  const dispatch = useDispatch();
  /* Getting the state of the files from the redux store. */
  let filteredFiles = useSelector((state) => state.files);
  let allFiles = useSelector((state) => state.allFiles);
  let oneFile = useSelector((state) => state.oneFile);
  /* Creating a set of all the names of the files to use in the button select. */
  let set = new Set(allFiles?.map((e) => e.name));
  /* Creating an array from the set. */
  const array = [...set];

  /* This dispatches the getFilteredFiles action and sets the local state to the filteredFiles state. It is called after a change in allFiles so it can render all the filteredFiles once the page is loaded */

  useEffect(() => {
    dispatch(getFilteredFiles());
    setFiles(filteredFiles);
  }, [allFiles]);

  useEffect(() => {
    dispatch(getAllFiles());
  }, []);

  /* Setting the local state to the oneFile state, and updating whit oneFile so it can acivate properly the render by using the select  . */
  useEffect(() => {
    setFiles(oneFile);
  }, [oneFile]);
  /**
   * If the value of the select is "All", then set the files to the filteredFiles, so it can return to the original redering.
   * If the value of the select is anything else, then dispatch the getOneFile action. */

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setFiles(filteredFiles);
    } else {
      e.preventDefault();
      dispatch(getOneFile(e.target.value));
    }
  };

  return (
    <div className="container">
      <header className="h1">REACT TEST APP</header>
      <select onChange={(e) => handleChange(e)}>
        <option value="All">FILES </option>
        {array?.map((e) => (
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Text</th>
            <th scope="col">Number</th>
            <th scope="col">Hex</th>
          </tr>
        </thead>
        <tbody>
          {localFiles?.map((e) => (
            <tr key={e.lines[0].text}>
              <td>{e.name}</td>
              <td>{e.lines[0].text}</td>
              <td>{e.lines[0].number}</td>
              <td>{e.lines[0].hex}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
