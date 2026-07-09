// src/App.js
import React from "react";
import { useFetch } from "./hook/useFetch";
import "./App.css";

function App() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) {
    return (
      <div className="posts-app">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-app">
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <div className="error-message">
            Error: <span className="error-detail">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-app">
      <header className="page-header">
        <h1 className="page-title">Latest Posts</h1>
        <p className="page-subtitle">Showing {Math.min(10, data?.length || 0)} recent articles</p>
      </header>

      <div className="posts-grid">
        {data?.slice(0, 10).map((post) => (
          <article key={post.id} className="post-card">
            <span className="post-id-badge">#{post.id}</span>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
            <div className="post-meta">
              <span className="post-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                User {post.userId}
              </span>
              <span className="post-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Post {post.id}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default App;
