// Warm-up Answers:
//
// 1. Controlled vs uncontrolled inputs:
//    Controlled: the input value is bound to React state —
//    React is the "single source of truth" for the value.
//    Uncontrolled: the DOM manages the value itself, React
//    doesn't track it (you'd use useRef to read it).
//
// 2. When you refresh the page, all JavaScript state is
//    wiped — useState resets to its initial value because
//    the component unmounts and remounts from scratch.
//
// 3. Applications can remember input using localStorage
//    (browser storage that persists across page refreshes),
//    cookies, or a backend database.


import { useState, useEffect } from "react";

// Step 3 – Item component — Step 2: props destructuring
// Item only needs one story, passed from List.
const Item = ({ story }) => (
  <div style={styles.card}>
    <h3 style={styles.title}>
      <a
        href={story.url}
        target="_blank"
        rel="noreferrer"
        style={styles.link}
      >
        {story.title}
      </a>
    </h3>
    <p style={styles.meta}>
      <span style={styles.author}>by {story.author}</span>
      <span style={styles.badge}>{story.points} points</span>
      <span style={styles.badge}>{story.num_comments} comments</span>
    </p>
  </div>
);

// Step 2 – List uses props destructuring ({ stories })
// instead of props.stories — cleaner and more readable.
// Functionality is identical — destructuring is just syntax.

const List = ({ stories }) => (
  <div>
    {stories.map((story) => (
      <Item key={story.objectID} story={story} />
    ))}
  </div>
);

// Step 1 – Search is now a CONTROLLED component:
//   - value={searchTerm} binds the input to React state
//   - The input always displays exactly what state holds
//   - React is the single source of truth for the value
// Step 2 – Props destructured: ({ searchTerm, onSearch })
// A controlled input means: if state says "react", the
// input shows "react" — even after a page refresh if state
// is initialized from localStorage.
const Search = ({ searchTerm, onSearch }) => (
  <div style={styles.searchWrapper}>
    <label htmlFor="search" style={styles.label}>
      Search Stories:
    </label>
    <input
      id="search"
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      style={styles.input}
    />
  </div>
);

const Header = () => (
  <header style={styles.header}>
    <h1 style={styles.heading}>📰 Hacker News</h1>
    <p style={styles.subtitle}>Top stories from the tech community</p>
  </header>
);

const App = () => {
  const stories = [
    {
      objectID: "1",
      title: "React 19 Released: What's New",
      url: "https://react.dev/blog/react-19",
      author: "dan_abramov",
      points: 342,
      num_comments: 87,
    },
    {
      objectID: "2",
      title: "Why TypeScript is Taking Over the Web",
      url: "https://typescriptlang.org/why",
      author: "orta_therox",
      points: 215,
      num_comments: 53,
    },
    {
      objectID: "3",
      title: "Building a Full-Stack App with Next.js and Supabase",
      url: "https://supabase.com/blog/nextjs-fullstack",
      author: "kiwicopple",
      points: 189,
      num_comments: 41,
    },
  ];

  // Step 4 – Initialize state FROM localStorage
  // localStorage.getItem("search") returns null if nothing
  // is stored yet — the || "" provides a fallback empty string.
  // localStorage only stores strings, so no conversion needed
  // here since searchTerm is already a string.
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || ""
  );
  
  
  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      <Header />
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
      <List stories={filteredStories} />
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
  searchWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 24,
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
};

export default App;


// Step 7 – Reflection
//
// 1. What is a controlled component?
//    A controlled component is an input whose value is bound
//    to React state via the value prop. React fully controls
//    what is displayed — the input can't change on its own.
//    Every keystroke updates state, and state updates the
//    input value. React is the single source of truth.
//
// 2. What is a side effect in React?
//    A side effect is any operation that reaches outside
//    React's rendering system — like reading/writing to
//    localStorage, fetching data from an API, setting a
//    timer, or manipulating the DOM directly. These don't
//    belong in the render body because they can cause
//    unpredictable behavior during rendering.
//
// 3. Why useEffect instead of calling code directly?
//    useEffect lets us control WHEN the side effect runs
//    using the dependency array. Calling localStorage directly
//    in the render body would run on every render, even for
//    unrelated state changes. useEffect with [searchTerm]
//    runs only when searchTerm actually changes — precise
//    and efficient.