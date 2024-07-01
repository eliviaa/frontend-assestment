"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, posts]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Posts</h2>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 mt-4 mb-6 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <ul>
          {filteredPosts.map(post => (
            <li key={post.id} className="p-4 mb-4 border rounded shadow-sm">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}