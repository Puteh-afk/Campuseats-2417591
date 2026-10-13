# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
Imperative code help to keep the DOM in sync with the data. Meanwhile declarative code just update state and React reconciles the DOM.

2. Why must a component name start with a capital letter?
The capitalized tags are treated as references to the functions/classes.

3. What does a fragment <>...</> do, and why not just use a <div>?
A fragment lets a component return multiple sibling elements without adding an extra DOM node. A <div> adds a real elemet to the DOM and can break CSS layouts.

4. Name one benefit of splitting the UI into small components.
Become easier to test the code.
