// Warm-up:
//
// 1. Real application data comes from external APIs —
//    servers that respond to HTTP requests with JSON data.
//
// 2. Problems when fetching: network errors, slow connections,
//    the server being down, malformed responses, or the user
//    losing internet mid-request.
//
// 3. No — fetching on every keystroke would send hundreds of
//    requests and overload the API. We should fetch only when
//    the user explicitly submits their search.

import { useState, useEffect } from "react";

// Step 1 – API base URL as a global constant
// Separating it from logic makes it easy to change in one
// place and keeps fetch logic clean and readable.
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

// Reusable input component from Week 8 (unchanged)
const InputWithLabel = ({ id, value, onInputChange, type = "text", children }) => (
  <div style={styles.searchWrapper}>
    <label htmlFor={id} style={styles.label}>
      {children}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
      placeholder="Search..."
      style={styles.input}
    />
  </div>
);

const Item = ({ story, onRemoveItem }) => (
  <div style={styles.card}>
    <h3 style={styles.title}>
      <a href={story.url} target="_blank" rel="noreferrer" style={styles.link}>
        {story.title}
      </a>
    </h3>
    <p style={styles.meta}>
      <span style={styles.author}>by {story.author}</span>
      <span style={styles.badge}>{story.points} points</span>
      <span style={styles.badge}>{story.num_comments} comments</span>
      <button onClick={() => onRemoveItem(story)} style={styles.deleteBtn}>
        ✕ Remove
      </button>
    </p>
  </div>
);

const List = ({ stories, onRemoveItem }) => (
  <div>
    {stories.map((story) => (
      <Item
        key={story.objectID}
        story={story}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </div>
);

const Header = () => (
  <header style={styles.header}>
    <h1 style={styles.heading}>📰 Hacker News</h1>
    <p style={styles.subtitle}>Top stories from the tech community</p>
  </header>
);

const App = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || "React"
  );

  const [stories, setStories] = useState([]);

  // Step 7 – Loading state: true while fetching, false when done
  const [isLoading, setIsLoading] = useState(false);

  // Step 9 – Error state: set to true if fetch fails
  const [isError, setIsError] = useState(false);

  // Step 13 – url state stores the COMMITTED search URL
  // Separating searchTerm (what the user is typing) from url
  // (what we actually fetch) means typing doesn't trigger a
  // fetch — only clicking Submit updates url, which triggers
  // the useEffect. This prevents fetching on every keystroke.
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  // Step 2, 3, 4 – useEffect for data fetching
  // Step 5 – No local filtering needed: the API already returns
  //          only stories matching the query in url.
  // Step 15 – Dependency is [url] not [searchTerm], so fetch
  //           only runs when the user clicks Submit, not on
  //           every keystroke.
  useEffect(() => {
    // Step 3 – Guard: don't fetch if url has no query
    if (!url) return;

    // Step 7 – Set loading true before fetch starts
    setIsLoading(true);
    setIsError(false);

    // Step 4 – fetch → convert to JSON → extract hits → set state
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStories(data.hits);
        setIsLoading(false);
      })
      .catch(() => {
        // Step 9 – Any network or server error sets isError true
        setIsError(true);
        setIsLoading(false);
      });
  }, [url]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleRemoveStory = (storyToRemove) => {
    setStories(stories.filter(
      (story) => story.objectID !== storyToRemove.objectID
    ));
  };

  return (
    <div style={styles.wrapper}>
      <Header />

      <div style={styles.searchRow}>
        <InputWithLabel
          id="search"
          value={searchTerm}
          onInputChange={handleSearch}
        >
          <strong>Search:</strong>
        </InputWithLabel>

        {/* Step 12 – Submit button, disabled when input is empty */}
        <button
          onClick={handleSearchSubmit}
          disabled={!searchTerm}
          style={{
            ...styles.submitBtn,
            opacity: !searchTerm ? 0.5 : 1,
            cursor: !searchTerm ? "not-allowed" : "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Step 10 – Show error message using logical AND (&&) */}
      {isError && (
        <p style={styles.error}>
          ⚠️ Something went wrong. Please try again.
        </p>
      )}

      {/* Step 8 – Conditional rendering: loading vs list */}
      {isLoading ? (
        <p style={styles.loading}>Loading ...</p>
      ) : (
        <List stories={stories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    maxWidth: 700,
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#f6f6ef",
    minHeight: "100vh",
  },
  header: {
    marginBottom: 24,
    borderBottom: "2px solid #ff6600",
    paddingBottom: 12,
  },
  heading: {
    fontSize: "1.8rem",
    color: "#ff6600",
    margin: 0,
  },
  subtitle: {
    color: "#888",
    fontSize: "0.95rem",
    marginTop: 4,
  },
  searchRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 24,
  },
  searchWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  label: {
    fontWeight: "600",
    color: "#333",
  },
  input: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
  },
  submitBtn: {
    padding: "10px 20px",
    backgroundColor: "#ff6600",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: "1rem",
    fontWeight: "600",
    height: 42,
  },
  loading: {
    textAlign: "center",
    color: "#888",
    fontSize: "1.1rem",
    marginTop: 40,
  },
  error: {
    textAlign: "center",
    color: "#cc0000",
    backgroundColor: "#fff0f0",
    padding: "12px 20px",
    borderRadius: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: "16px 20px",
    marginBottom: 16,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "1.1rem",
    marginBottom: 8,
  },
  link: {
    color: "#1a1a1a",
    textDecoration: "none",
  },
  meta: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    alignItems: "center",
    fontSize: "0.9rem",
    color: "#555",
    margin: 0,
  },
  author: {
    color: "#ff6600",
    fontWeight: "600",
  },
  badge: {
    backgroundColor: "#f0f0f0",
    padding: "2px 10px",
    borderRadius: 20,
  },
  deleteBtn: {
    marginLeft: "auto",
    backgroundColor: "#ff6600",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "4px 12px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
};

export default App;

// Step 17 – Reflection
//
// 1. Why use useEffect for fetching?
//    Fetching is a side effect — it reaches outside React
//    to talk to an external server. useEffect is the correct
//    place for side effects because it runs AFTER rendering,
//    keeping the render function pure. The dependency array
//    gives us precise control over when the fetch runs.
//
// 2. What is the difference between loading and error state?
//    isLoading is true while we're WAITING for the response
//    — we don't know yet if it will succeed or fail.
//    isError is true when the fetch FAILED — something went
//    wrong (network issue, server down, bad URL). They serve
//    different purposes and can't replace each other.
//
// 3. Why control when fetching happens?
//    Fetching on every keystroke would send one request per
//    character typed — wasteful and potentially rate-limited
//    by the API. By separating searchTerm (typing) from url
//    (fetching), we only hit the API when the user explicitly
//    clicks Submit, making the app more efficient and the
//    UX more intentional.
