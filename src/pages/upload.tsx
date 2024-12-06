import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '../styles/Home.module.css'


export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data: { filePath: string } = await res.json();
        setMessage(`File uploaded successfully: ${data.filePath}`);
      } else {
        const errorData: { error: string } = await res.json();
        setMessage(`Failed to upload file: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error uploading file');
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}