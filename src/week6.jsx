// Warm-up Answers:
//
// 1. Data should live inside components, not global scope.
//    The component that needs to share data with others
//    should own it — usually a parent component like App.
//
// 2. Components need to communicate because each one handles
//    one job, but they depend on each other — Search needs
//    to tell App what the user typed, App needs to tell
//    List which stories to display.
//
// 3. When a user types, the search term should update state,
//    which triggers a re-render with a filtered list of
//    stories matching what the user typed.


import { useState } from "react";

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

// Step 2 – List receives stories via props (not global scope)
// Props are better than globals because:
// - Data flow is explicit and traceable
// - List can be reused with different data
// - If prop name is wrong, List gets undefined → nothing renders
const List = ({ stories }) => {
  console.log("List re-rendered"); // Step 6
  return (
    <div>
      {stories.map((story) => (
        <Item key={story.objectID} story={story} />
      ))}
    </div>
  );
};


// Step 5 – Search receives onSearch handler from App via props
// Search does NOT own the state — it just triggers the change.
// App owns the state because it needs to share searchTerm
// with the filtering logic. Search can't keep the state
// because App wouldn't be able to read it (data flows down,
// not up — unless we pass a handler).
const Search = ({ onSearch }) => {
  console.log("Search re-rendered"); // Step 6
  return (
    <div style={styles.searchWrapper}>
      <label htmlFor="search" style={styles.label}>
        Search Stories:
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        style={styles.input}
      />
    </div>
  );
};

const Header = () => (
  <header style={styles.header}>
    <h1 style={styles.heading}>📰 Hacker News</h1>
    <p style={styles.subtitle}>Top stories from the tech community</p>
  </header>
);


// Step 1 – stories moved INSIDE App (App now owns the data)
// Step 4 – searchTerm state added with useState
// Step 5 – handleSearch updates searchTerm state
// Step 8 – stories filtered before being passed to List
//          .filter() is the right method — it returns a new
//          array of only the items that pass the test.
//          Filtering lives in App because App owns both the
//          data (stories) and the search term (searchTerm).

const App = () => {
  console.log("App re-rendered"); // Step 6

  // Step 1 – data now lives inside App
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

  // Step 4 – state for the search term, initially empty
  const [searchTerm, setSearchTerm] = useState("");

  // Step 5 – handler that updates searchTerm state
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Step 8 – filter stories by title, case-insensitive
  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      <Header />
      <Search onSearch={handleSearch} />
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


// Step 10 – Reflection
//
// 1. Props vs State:
//    Props are data passed FROM a parent TO a child — they
//    are read-only inside the child. State is data that lives
//    INSIDE a component and can change over time, triggering
//    a re-render when updated with useState.
//
// 2. Why lift state up?
//    When two components need to share or react to the same
//    data, the state must live in their closest common parent.
//    Search triggers the change, List reacts to it — App is
//    the parent of both, so state lives in App.
//
// 3. Where should filtering logic live?
//    In App — because App owns both the stories data and the
//    searchTerm state. Filtering needs both, so it belongs
//    where both are available.
