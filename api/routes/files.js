/* Importing the express module and creating a router. */
const express = require("express");
const router = express();
/* Importing the functions from the controllers. */
const { downloadAndFormat } = require("../controllers/downloadAndFormat");
const { downloadFiles } = require("../controllers/downloadFiles");

/* This route will provide de information brougth from the API without the incomplete files   */
router.get("/files/data", async (req, res) => {
  try {
    /*the first request that the function makes to the API does not bring the complete information*/
    const data = await downloadAndFormat();
    /*the second request complete all information requiered*/
    data.concat(await downloadAndFormat());
    /* Sending the data to the user. */
    res.send({
      data: data,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    /* Sending the error to the user. */
    res.send(error);
  }
});

router.get("/files/list", async (req, res) => {
  try {
    const fileName = req?.query?.fileName;
    /*The same operation must be done in this route */
    const data = await downloadFiles();
    /*the second request complete all information requiered*/
    data.concat(await downloadFiles());
    /* If the user wants an specific file */
    if (fileName) {
      const filter = data?.filter((e) => e?.name === fileName);
      try {
        res.status(200).send({
          data: filter,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        res.send(error);
      }
    } else
    /*If the user wants the whole list whitout formating */
      res.status(200).send({
        data: data,
        headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
