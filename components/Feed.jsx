"use client";
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import Loading from './Loading';

const PromptCardList = ({ data, handleTagClick }) => {
  
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
  setSearchText(tag)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          name="search"
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {loading ? (
        <Loading />
      ) : (
        <PromptCardList
          data={posts.filter(
            (post) =>
              post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
              post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
              post.creator.username
                .toLowerCase()
                .includes(searchText.toLowerCase())
          )}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
}

export default Feed;