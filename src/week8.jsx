
// Warm-up Answers:
//
// 1. A component is reusable when it accepts dynamic props
//    instead of hard-coded values — so it can be used in
//    different contexts with different data.
//
// 2. Hard-coded values make components rigid and specific
//    to one use case. Dynamic props make them flexible and
//    reusable anywhere in the app.
//
// 3. To remove an item immutably in JavaScript, use .filter()
//    — it returns a NEW array without the removed item,
//    without mutating the original array.

import { useState, useEffect } from "react";

// Step 6 – Renamed to initialStories to separate static data
// from the dynamic state. State can change; initial data
// is just the starting point and should stay untouched.

const initialStories = [
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

// Step 1 – InputWithLabel replaces Search
// Generic prop names (value, onInputChange, id, label) make
// it reusable anywhere — not just for search. Domain-specific
// names like "searchTerm" would lock it to one use case.
//
// Step 2 – type prop added so the caller controls input type
// (text, password, email, etc.) — more flexible.
//
// Step 3 – Uses {children} instead of a label prop.
// children represents whatever is placed BETWEEN the opening
// and closing tags of the component when it's used.
// This is more flexible because the caller can pass any JSX
// as the label — plain text, bold text, icons, etc.
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
      <button
        onClick={() => onRemoveItem(story)}
        style={styles.deleteBtn}
      >
        ✕ Remove
      </button>
    </p>
  </div>
);

// Step 9 & 10 – List receives onRemoveItem and passes it down
// to each Item. This is called "prop drilling" — passing a
// handler through multiple components so the deeply nested
// one (Item) can trigger an action in the top-level one (App).
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
    localStorage.getItem("search") || ""
  );

  // Step 7 – stories is now STATE initialized with initialStories
  // This allows setStories to update the list when items
  // are removed, triggering a re-render with the new list.

  const [stories, setStories] = useState(initialStories);

  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Step 8 – Remove handler uses .filter() to return a new
  // array that excludes the item with the matching objectID.
  // filter() is immutable — it never modifies the original
  // array, it always returns a brand new one. This is the
  // correct React pattern for updating lists in state.

  const handleRemoveStory = (storyToRemove) => {
    const newStories = stories.filter(
      (story) => story.objectID !== storyToRemove.objectID
    );
    setStories(newStories);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      <Header />

      {/* Step 4 – Using composition: content between tags becomes {children} */}
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <List stories={filteredStories} onRemoveItem={handleRemoveStory} />
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

// Step 13 – Reflection
//
// 1. What makes a component reusable?
//    Generic prop names, no hard-coded values, and no
//    assumptions about where it will be used. InputWithLabel
//    works for any input — search, login, forms — because
//    it accepts id, value, type, and children dynamically.
//
// 2. What is component composition?
//    Composition means building components that accept
//    {children} — JSX passed between their opening and
//    closing tags. This lets the parent decide what content
//    goes inside, making the component more flexible than
//    a rigid label prop that only accepts a string.
//
// 3. Why do we pass handlers down the component tree?
//    Because state lives in App (the owner of the data),
//    but the action (clicking Remove) happens deep inside
//    Item. The only way to let Item trigger a change in
//    App's state is to pass the handler down as a prop
//    through List → Item. This keeps data flow explicit
//    and predictable.