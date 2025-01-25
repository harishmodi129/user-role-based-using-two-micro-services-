const Document = require("../models/Document");

exports.UploadDocument = async (req, res) => {
  const { user } = req;
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No file uploaded" });

  const document = new Document({
    filename: file.filename,
    uploadedBy: user.id,
  });

  await document.save();
  res.status(201).json({ message: "Document uploaded successfully" });
};

exports.approveDocument = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const document = await Document.findByIdAndUpdate(
    id,
    { status: "Approved", approvedBy: user.id },
    { new: true }
  );

  if (!document) return res.status(404).json({ message: "Document not found" });
  res.json({ message: "Document uploaded successfully", document });
};
