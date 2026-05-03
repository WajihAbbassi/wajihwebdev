import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}


// Step 3 – Variable defined OUTSIDE the component
// Accessible inside because of JavaScript's scope chain:
// the component function closes over the module scope.
// Risk in real apps: it's shared across all renders and
// can't be personalised per user or updated reactively.

const courseTitle = "React Fundamentals";


// Step 1 – Functional component named with a capital letter
// React uses the capital letter to distinguish custom
// components from plain HTML tags (lowercase = DOM element).
// Returning two sibling elements without a wrapper gives:
//   "Adjacent JSX elements must be wrapped in an enclosing tag"

function App() {

  
  // Step 2 – Variable inside the component
  // Removing {} around it in JSX would print the literal text
  // "studentName" instead of the variable's value.
  // JSX is not plain HTML – it needs {} to evaluate JS.
 
  const studentName = "Wajih Abbassi";

 
  // Step 6 – Object with multiple properties
  // React cannot render a plain object ({student}) because it
  // doesn't know how to serialise it → "Objects are not valid
  // as a React child". Each property must be accessed
  // individually using dot notation inside {}.
 
  const student = {
    name: "Wajih Abbassi",
    age: 22,
    track: "Finance",
  };

  
  // Step 7 – Function that returns a string
  // {sayHello}  → passes the function reference (renders nothing useful)
  // {sayHello()} → calls the function and renders its return value
  // Bonus: the greeting uses studentName from the outer scope.
  
  function sayHello() {
    return `Hey there, ${studentName}! Ready to build something great today?`;
  }


  // Single parent element wraps everything (Step 1 constraint)
  
  return (
    <div style={styles.wrapper}>

      {/* Step 1 – Custom <h1> */}
      <h1 style={styles.heading}>My First React App 🚀</h1>

      {/* Step 2 – Variable displayed with {} */}
      <p style={styles.text}>
        Student: <strong>{studentName}</strong>
      </p>

      {/* Step 3 – Outside variable displayed inside component */}
      <p style={styles.text}>
        Course: <strong>{courseTitle}</strong>
      </p>

      {/* Step 4 – Dynamic sentence combining both variables */}
      <p style={styles.welcome}>
        Welcome to {courseTitle}, {studentName}!
      </p>

      {/* Step 5 – Form elements; React uses htmlFor (not for)
          because "for" is a reserved word in JavaScript.     */}
      <div style={styles.formGroup}>
        <label htmlFor="topicInput" style={styles.label}>
          What topic are you exploring today?
        </label>
        <input
          id="topicInput"
          type="text"
          placeholder="e.g. JSX, Components, Props…"
          style={styles.input}
        />
      </div>

      {/* Step 6 – Object properties renderef individualy */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Student Profile</h2>
        <p style={styles.text}>Name: {student.name}</p>
        <p style={styles.text}>Age: {student.age}</p>
        <p style={styles.text}>Track: {student.track}</p>
      </div>

      {/* Step 7 – Function called inside JSX */}
      <p style={styles.greeting}>{sayHello()}</p>

    </div>
  );
}

// Plain JS style object (no extra dependency needed)
const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    maxWidth: 600,
    margin: "40px auto",
    padding: "32px",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    backgroundColor: "#f9fafb",
  },
  heading: {
    fontSize: "2rem",
    color: "#1d3557",
    marginBottom: 8,
  },
  welcome: {
    fontSize: "1.1rem",
    color: "#457b9d",
    fontStyle: "italic",
    margin: "12px 0",
  },
  text: {
    fontSize: "1rem",
    color: "#333",
    margin: "6px 0",
  },
  formGroup: {
    margin: "20px 0",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontWeight: "600",
    color: "#1d3557",
  },
  input: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #a8dadc",
    fontSize: "1rem",
    outline: "none",
  },
  card: {
    backgroundColor: "#e8f4f8",
    borderRadius: 10,
    padding: "16px 20px",
    margin: "20px 0",
  },
  cardTitle: {
    fontSize: "1.2rem",
    color: "#1d3557",
    marginBottom: 8,
  },
  greeting: {
    backgroundColor: "#1d3557",
    color: "#fff",
    padding: "14px 20px",
    borderRadius: 10,
    fontSize: "1rem",
    marginTop: 20,
  },
};

export default App;


// Step 8 

// 1. One thing I understand well:
//    JSX lets me embed any JavaScript expression inside {}
//    which makes it easy to display variables, call functions,
//    and compute values right inside the markup.

// 2. One thing that is still confusing:
//    The difference between passing a function reference
//    {sayHello} versus calling it {sayHello()} tripped me up –
//    I need to remember that JSX evaluates whatever is inside
//    {}, so () is required to actually get the return value.

// 3. One mistake I made and fixed:
//    I initially tried to render the whole `student` object
//    with {student} and got the error "Objects are not valid
//    as a React child". I fixed it by accessing each property
//    separately: {student.name}, {student.age}, {student.track}.