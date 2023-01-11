const axios = require("axios");
/*This function will bring all the files, thow incomplete, but reject the empty files /*

/* It creates an object with a name, and an array of objects with text, number, and hex properties. */
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


const downloadFiles = async () => {
  let array = [];
  const errors = [];
  try {
    /*Geting all the file names from the API. */
    const { data: { files } } = await axios.get(
      "https://echo-serv.tbxnet.com/v1/secret/files",
      {
        headers: {
          authorization: APY_KEY,
        },
      }
    );
 
    const results = await Promise.all(files?.map(async (e) => {
      /*Getting the data from each file as a Promise using each file name*/
      const { data } = await axios.get(
        `https://echo-serv.tbxnet.com/v1/secret/file/${e}`,
        {
          headers: {
            authorization: APY_KEY,
          },
        }
      );
        /* Checking if the data is not 404 or 500. */
      if (data.status !== 404 || data.status !== 500) {
        /* Split the data by new lines*/
        const lines = data.split("\n");
        for (let i = 1; i < lines.length; i++) {
          /* Splitting the data by commas and assigning the values to the variables. */
          const [name, text, number, hex] = lines[i].split(",");
          
            const objeto = new Objeto(name, text, number, hex);
            array.push(objeto);
         
        }
      }
    }));
  } catch (error) {
    errors.push(error);
  }
  return array
};

module.exports = { downloadFiles };
