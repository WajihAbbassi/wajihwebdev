
// Warm-up Answers:
//
// 1. Regular function vs arrow function:
//    Regular: function myFunc() { return ... }
//    Arrow:   const myFunc = () => ...
//    The main differences are syntax and how they handle
//    the 'this' keyword (arrow functions don't have their own).
//
// 2. Arrow functions are common in React because they are
//    shorter, cleaner, and avoid 'this' binding issues
//    that caused bugs in older class-based components.
//
// 3. When a user types in an input field, the onChange event
//    fires on every keystroke, passing an event object that
//    contains the current value of the input field.



// Global stories array — outside all components

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


// Step 1 – Header refactored to arrow function
// Step 3 – Concise body: no {} and no return keyword needed
//          because the component returns a single JSX element.
//          Parentheses () around JSX are required when it
//          spans multiple lines — without them JS inserts a
//          semicolon after the first line and returns nothing.

const Header = () => (
  <header style={styles.header}>
    <h1 style={styles.heading}>📰 Hacker News</h1>
    <p style={styles.subtitle}>Top stories from the tech community</p>
  </header>
);


// Step 1 & 3 – List refactored to arrow function (concise body)
// Step 2 – The map() callback is also an arrow function
//          in concise body form since it only returns JSX.

const List = () => (
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


// Step 1 & 4 – Search refactored to arrow function
// Step 4 – Using BLOCK BODY {} instead of concise body
//          because we are adding logic (the event handler)
//          inside the component. Concise body only works
//          when all you do is return a single expression.
// Step 5 – handleChange event handler added
//          onChange fires on every keystroke.
//          The event object (e) is passed automatically
//          by the browser. e.target is the input element,
//          e.target.value is the current typed text.
// Step 7 – Logs only the value (not the full event object)
//          plus a second console.log message.

const Search = () => {

  const handleChange = (e) => {
    console.log("Input value:", e.target.value);
    console.log("User is typing...");
  };

  return (
    <div style={styles.searchWrapper}>
      <label htmlFor="search" style={styles.label}>
        Search Stories:
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        style={styles.input}
      />
    </div>
  );
};


// Step 1 – App refactored to arrow function (concise body)
// App is still the layout composer — renders all components.

const App = () => (
  <div style={styles.wrapper}>
    <Header />
    <Search />
    <List />
  </div>
);

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


// Step 8 – Reflection
//
// 1. When do we use concise body arrow functions?
//    When the function only returns a single expression with
//    no extra logic — we can drop {} and the return keyword.
//    Example: const double = (n) => n * 2
//    Or for components that just return JSX with no handlers.
//
// 2. When do we use block body arrow functions?
//    When we need to run logic before returning — like
//    declaring variables, writing if statements, or defining
//    event handlers inside the component. We need {} and
//    an explicit return statement.
//
// 3. What does an event object contain?
//    It contains information about the event that occurred:
//    - e.target → the DOM element that triggered the event
//    - e.target.value → the current value of the input
//    - e.type → the type of event (e.g. "change", "click")
//    - e.preventDefault() → method to stop default behavior
