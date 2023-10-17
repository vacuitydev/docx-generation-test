const path = require("path");
const unoconv = require("awesome-unoconv");
const docx = require("docx");
const fs = require("fs");
const { HeadingLevel, Document, Packer, Paragraph, TextRun } = docx;

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          heading: HeadingLevel.TITLE,
          children: [
            new TextRun({
              color: "2222DD",
              text: "Candidate name",
              style: HeadingLevel.HEADING_2,
            }),
          ],
          alignment: docx.AlignmentType.CENTER,
        }),
        new Paragraph({
          alignment: docx.AlignmentType.LEFT,
          children: [
            new TextRun({
              color: "111111",
              text: "Regular text",
            }),
          ],
        }),
      ],
    },
  ],
});
async function runner() {
  const buffed = await Packer.toBuffer(doc);
  fs.writeFileSync("New.docx", buffed);
  const outputFilePath = path.resolve("./generated.pdf");
  const inputFilePath = path.resolve("./New.docx");
  console.log("Waiting for converstion");
  const result = await unoconv.convert(inputFilePath, outputFilePath);
  console.log(result);
  console.log("After converstion");
}
runner();
