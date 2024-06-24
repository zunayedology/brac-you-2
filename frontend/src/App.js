import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [nickName, setNickName] = useState('');

  const handleDownload = async () => {
    if (!studentId || !nickName) {
      alert('Please enter proper credentials');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/download', {
        params: { student_id: studentId, nick_name: nickName },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${nickName}_grade_sheet.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert('Error downloading the grade sheet');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Brac You</h1>
      {!loggedIn ? (
        <div className="mb-6">
          <p className="text-lg mb-4">Have you logged into USIS?</p>
          <button
            onClick={() => setLoggedIn(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
          >
            Yes
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded">
            Not Yet
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Nickname"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded w-full"
          >
            Download
          </button>
        </div>
      )}
      <footer className="mt-6 text-center">
        <p>Developed with ❤️ by <a href="https://zunayedology.github.io/" className="text-blue-500">Zunayed</a></p>
      </footer>
    </div>
  );
}

export default App;
