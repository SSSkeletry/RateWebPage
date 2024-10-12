import React, { useState, useEffect } from 'react';

function App() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch('/api/pages')
      .then(res => res.json())
      .then(data => setPages(data));
  }, []);

  return (
    <div>
      <h1>Web Page Speed Analysis</h1>
      <ul>
        {pages.map(page => (
          <li key={page.id}>
            {page.url} - Load Time: {page.loadTime}ms - Size: {page.size}KB - Requests: {page.requests}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;