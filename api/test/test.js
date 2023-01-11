/* Testing the downloadAndFormat.js and the downloadFiles.js files. */
const chai = require("chai");
const expect = chai.expect;

/* Importing the functions from the downloadAndFormat.js and downloadFiles.js files. */
const downloadAndFormat = require("../controllers/downloadAndFormat");
const downloadFiles = require("../controllers/downloadFiles")

/* Calling the downloadFiles.js and downloadAndFormat.js files. */
const download = downloadAndFormat.downloadAndFormat();
const allDownloadedFiles = downloadFiles.downloadFiles()


describe("Download and Format", function () {
  it("Should return a list with the names of the correct columns and their order", async function () {
    const data = await download;
    /* Checking that the data is an array and that the array has the properties name, lines,
    text, number, and hex. */
    expect(data).to.be.a("array");
    data?.map((e) => expect(e).to.have.a.property("name"));
    data?.map((e) => expect(e).to.have.a.property("lines"));
    data?.map((e) => expect(e.lines[0]).to.have.a.property("text"));
    data?.map((e) => expect(e.lines[0]).to.have.a.property("number"));
    data?.map((e) => expect(e.lines[0]).to.have.a.property("hex"));
  });
});

it("Should include the formated files", async function () {
    /* This test may need to be run multiple times due to the delay in the API request.
    */
/* Creating a set of the file names. */
    const data = await download
    const fileNames = new Set()
    data?.map(e => fileNames?.add(e?.name))

   /* Checking if the fileNames set includes the files listed. */
    expect(fileNames).to.include("test18.csv")
    expect(fileNames).to.include("test3.csv")
    expect(fileNames).to.include("test2.csv")
    expect(fileNames).to.include("test9.csv")
    expect(fileNames).to.include("test6.csv")
/* Checking that the fileNames set does not include the file test15.csv. */
    expect(fileNames).to.not.include("test15.csv")
  })

  
describe("All Downloaded Files", function () {
  it("Should return a list with all the files in the API", async function () {

  /* Creating a set of the file names. */
    const data = await allDownloadedFiles
    const fileNames = new Set()
    data?.map(e => fileNames?.add(e?.name))
    
    /* Checking that the data is an array and that the array includes the files listed. */
    expect(data).to.be.a("array");
    expect(fileNames).to.include("test15.csv")
    expect(fileNames).to.include("test18.csv")
    expect(fileNames).to.include("test3.csv")
    expect(fileNames).to.include("test2.csv")
    expect(fileNames).to.include("test9.csv")
    expect(fileNames).to.include("test6.csv")

  });
});