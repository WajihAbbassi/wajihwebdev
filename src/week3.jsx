
// Warm-up Answers (in comments):
// 1. Hacker News displays tech news, programming articles,
//    startup stories, science posts, and community discussions.
//
// 2. For each post you usually see:
//    - The article title (as a link)
//    - The author/username who submitted it
//    - The points (upvotes) score
//    - The number of comments
//    - The time it was posted

// Step 1 – Data Structure Explanation
//
// Each story object looks like this:
// {
//   objectID: "1",         → unique identifier for React key
//   title: "Article",      → title of the article
//   url: "https://...",    → link to the article
//   author: "username",    → who posted it
//   points: 120,           → popularity score (number)
//   num_comments: 34       → number of comments (number)
// }
//
// → objectID should be used as the React key because it is
//   guaranteed to be unique per story, unlike the array index.
//
// → This structure is realistic for an API because real APIs
//   like Hacker News return arrays of objects with unique IDs
//   and consistent property names, making it easy to map over
//   and render each item dynamically.

// Step 2 – Fake data defined OUTSIDE the component
// We define it outside because:
// - It doesn't depend on component state or props
// - It won't change between renders (for now)
// - It keeps the component clean and focused on rendering
//
// When real API data comes in later, this array will be
// replaced by a useState() variable that gets populated
// via a fetch() call inside useEffect().

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

function App() {

  // Step 3 – Debug moment: log one story to the console
  console.log("First story object:", stories[0]);

  return (
    <div style={styles.wrapper}>

      <h1 style={styles.heading}>Hacker News Stories</h1>

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

const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    maxWidth: 700,
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#f6f6ef",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "1.8rem",
    color: "#ff6600",
    marginBottom: 24,
    borderBottom: "2px solid #ff6600",
    paddingBottom: 10,
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
// Step 7 – Reflection
//
// 1. Why is map() essential for rendering lists in React?
//    map() transforms each item in an array into a JSX element
//    and returns a new array React can render. It's the only
//    array method that returns values, making it perfect for
//    dynamic list rendering without hardcoding anything.
//
// 2. Why is objectID the correct key?
//    objectID is unique and stable per story. Using the array
//    index as a key causes bugs when the list is reordered or
//    filtered because React would match the wrong elements.
//
// 3. What will change when we replace fake data with the API?
//    The stories array will become a state variable:
//    const [stories, setStories] = useState([])
//    A fetch() call inside useEffect() will hit the real
//    Hacker News API and update the state with live data,
//    triggering a re-render with real stories automatically.
// ============================================================