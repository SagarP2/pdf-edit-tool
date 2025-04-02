// src/components/MainContent.js
import React from 'react';

const MainContent = () => {
  return (
    <main>
      <section>
        
        <p>
          Website developers, no-coders or any other person working on web projects can find, collect,
          edit, save and implement beautiful snippets as fast as possible.
        </p>
        <button>VISIT UI-SNIPPETS</button>
      </section>

      <section>
        <h2>Your very own snippet library</h2>
        <p>
          Library of personal snippets that you can use to store and organize your own code snippets.
        </p>
        <ul>
          <li>+150 UI buttons</li>
          <li>+60 UI checkboxes and toggle switches</li>
          <li>+20 UI inputs</li>
        </ul>
      </section>

      <section>
        <h2>Free open source collection of HTML & CSS snippets</h2>
        <p>Available for you to explore, save, edit, create and use in your projects.</p>
        <ul>
          <li>+230 snippets</li>
          <li>Fully Customisable</li>
          <li>Save to Favorites</li>
          <li>My Snippets with code playground</li>
          <li>Search with OpenAI</li>
          <li>No Ads</li>
        </ul>
      </section>

      <section>
        <h2>Customer Stories</h2>
        <p>What do our users think about UI-snippets</p>
      </section>

      <section>
        <h2>FAQ</h2>
        <p>You ask, we answer</p>
        <div>
          <h3>What is UI-snippets Creator feature?</h3>
          <p>
            UI-snippets offers a Creator page feature that allows users to create a personalized page
            to showcase their own code snippets to the public.
          </p>
        </div>
        <div>
          <h3>Is there a limit on my favorites and my snippets?</h3>
        </div>
        <div>
          <h3>What kind of snippets do you have?</h3>
        </div>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>Just write us a message. We will answer you.</p>
        <form>
          <label>Name *</label>
          <input type="text" name="name" required />
          <label>Email *</label>
          <input type="email" name="email" required />
          <label>Message *</label>
          <textarea name="message" required></textarea>
          <button type="submit">SEND</button>
        </form>
      </section>
    </main>
  );
};

export default MainContent;
