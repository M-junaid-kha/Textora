import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import { getPath } from "pdf-parse/worker";

PDFParse.setWorker(getPath());

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    const fileName = file.name.toLowerCase();

    // TXT
    if (fileName.endsWith(".txt")) {
      const text = await file.text();

      return Response.json({
        text,
      });
    }

    // DOCX
    if (fileName.endsWith(".docx")) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await mammoth.extractRawText({
        buffer,
      });

      return Response.json({
        text: result.value,
      });
    }

    // PDF
    if (fileName.endsWith(".pdf")) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const parser = new PDFParse({
        data: buffer,
      });

      const result = await parser.getText();

      await parser.destroy();

      return Response.json({
        text: result.text,
      });
    }

    // DOC
    if (fileName.endsWith(".doc")) {
      return Response.json(
        {
          error:
            "Legacy .doc files are not supported yet. Please convert the file to .docx or PDF.",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        error: "Supported files: TXT, DOCX, PDF, and DOC.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Extraction error:", error);

    return Response.json(
      {
        error:
          error.message || "Could not extract text from this file.",
      },
      { status: 500 }
    );
  }
}