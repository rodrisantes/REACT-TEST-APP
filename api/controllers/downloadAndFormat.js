const axios = require("axios");

/*This function will process the information and will only return the files that are complete.*/

//First create an object with name and an array of objects with text, number, and hex properties. 
class Objeto {
  constructor(name, text, number, hex) {
    this.name = name;
    this.lines = [
      {
        text,
        number,
        hex,
      },
    ];
  }
}
const APY_KEY = process.env.APY_KEY

const downloadAndFormat = async () => {
/* Creating an empty array to store the data and an empty array to store the errors. */
  let array = [];
  const errors = [];
  try {
    //get all the file names from the API. 
    const { data: { files } } = await axios.get(
      "https://echo-serv.tbxnet.com/v1/secret/files",
      {
        headers: {
          authorization: APY_KEY,
        },
      }
    );
 
    const results = await Promise.all(files?.map(async (e) => {
      //getting the data from each file as a Promise using each file name at the end of the endpoint
      const { data } = await axios.get(
        `https://echo-serv.tbxnet.com/v1/secret/file/${e}`,
        {
          headers: {
            authorization: APY_KEY,
          },
        }
      );
      /* Discard empty files and store those wich throw no errors */
      if (data.status !== 404 || data.status !== 500) {
        /* Spliting the data by new lines*/
        const lines = data.split("\n");
        for (let i = 1; i < lines.length; i++) {
/* Splitting the lines by commas and assigning the values to the variables name, text, number, and hex. */
          const [name, text, number, hex] = lines[i].split(",");
          /*Discard the incomplete data and push the correct one */
/* Checking if the data is complete and pushing it into a new Object. If it is not complete, it will discard it in the error array. */
          if (name && text && number && hex && number.length > 0 && hex.length > 1) {
            const objeto = new Objeto(name, text, number, hex);
            array.push(objeto);
          }
        }
      }
    }));
  } catch (error) {
    errors.push(error);
  }

  return array
};

module.exports = { downloadAndFormat };
