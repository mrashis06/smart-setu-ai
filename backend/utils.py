import os
from fastapi import UploadFile
from uuid import uuid4

UPLOAD_DIR = "uploaded_files"

# Ensure upload directory exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)


async def save_uploaded_pdf(file: UploadFile) -> str:
    """
    Saves uploaded PDF to disk and returns the file path.
    """
    file_ext = file.filename.split(".")[-1]
    if file_ext.lower() != "pdf":
        raise ValueError("Only PDF files are allowed")

    filename = f"{uuid4().hex}.pdf"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as out_file:
        content = await file.read()
        out_file.write(content)

    return file_path

