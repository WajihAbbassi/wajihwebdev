
// Warm-up Answers:
//
// 1. A 300-line component becomes hard to read, understand,
//    and maintain — it's doing too many things at once.
//
// 2. Harder to debug — you have to scroll through hundreds
//    of lines to find where a bug might be.
//
// 3. Smaller units are easier to read, test, reuse, and fix.
//    Each unit has one clear responsibility.



// Global stories array — stays outside all components.
// List has access to it because of JavaScript's scope chain:
// functions can read variables defined in their outer scope.
// This is NOT scalable for large apps — in real projects,
// data is passed via props or managed with state/context.

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


// Step 5 – Header component
// Responsible for: displaying the app title only.

function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.heading}>📰 Hacker News</h1>
      <p style={styles.subtitle}>Top stories from the tech community</p>
    </header>
  );
}


// Step 3 – Search component
// Responsible for: rendering the search UI (label + input).
// It does NOT need access to stories right now because its
// only job is to display the input — no filtering yet.

function Search() {
  return (
    <div style={styles.searchWrapper}>
      <label htmlFor="search" style={styles.label}>
        Search Stories:
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        style={styles.input}
      />
    </div>
  );
}


// Step 1 – List component
// Responsible for: rendering the list of stories using map().
// It accesses the global stories variable directly via scope.

function List() {
  return (
    <div>
      {stories.map((story) => (
        <div key={story.objectID} style={styles.card}>
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
      ))}
    </div>
  );
}


// Step 2 – App component
// Responsible for: composing the page layout by rendering
// Header, Search, and List. It no longer handles any
// rendering logic itself — it just arranges components.
// If you forget to render <List />, stories won't appear.

function App() {
  return (
    <div style={styles.wrapper}>
      <Header />
      <Search />
      <List />
    </div>
  );
}

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

// ============================================================
// Step 4 – Reflection
//
// 1. What does App do now?
//    App is the layout composer — it just renders Header,
//    Search, and List in order. No logic, no data handling.
//
// 2. What does List do?
//    List is responsible for mapping over the global stories
//    array and rendering each story as a card.
//
// 3. What does Search do?
//    Search renders the search label and input field.
//    It doesn't filter anything yet.
//
// 4. Why is this structure cleaner than before?
//    Each component has one clear responsibility. If something
//    breaks in the search UI, you only look at Search. If
//    stories don't render, you only look at List. Much easier
//    to read, debug, and extend.
// ============================================================