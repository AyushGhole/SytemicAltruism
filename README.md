<h4>ChatApp</h4> 
A Real-time Chat Application built with MERN stack & Socket.io featuring secure authentication, instant messaging, and real-time updates. Users can log in, chat with others, and see messages instantly. The app ensures smooth UI, responsive design, and seamless user experience with real-time message delivery. 🚀<br>
<br>
<b>1️⃣ Project Setup (MERN Stack)</b> <hr>
<br>
<ul>
  <li>Initialize the project with MongoDB, Express, React, Node.js (MERN).</li>
  <li>Set up folders:</li>
    <ul>
      <li>/backend → Node.js & Express API</li> 
      <li>/frontend → React app</li> 
    </ul>
  <li>Install dependencies</li>
</ul>
<br>
<b>2️⃣ Backend Development (Node.js & Express.js)</b> 
<hr>
<b>✅ Set up Express server (server.js)</b> <br>
<ul>
  <li>Configure CORS & middleware.</li>
  <li>Connect to MongoDB using Mongoose.</li>
  <li>Set up dotenv for environment variables.</li>
</ul>
<br>
<b>✅ User Authentication (authRoutes.js)</b> <br>
<ul>
  <li>Implement signup & login with JWT-based authentication.</li>
  <li>Hash passwords with bcrypt.js.</li>
</ul>
<br>
<b>✅ Messaging API (messageRoutes.js)</b><br> 
<ul>
  <li>Create API routes to send & fetch messages.</li>
  <li>Store messages in MongoDB.</li>
</ul> 
<br>
<b>✅ Real-time Communication (Socket.io in server.js)</b> <br>
<ul>
<li>Implement WebSocket events to handle real-time messaging.</li>
<li>Store online users in a Map.</li>
</ul>
<br>

<b>3️⃣ Frontend Development (React & Socket.io-client)</b> 
<hr>
<br>
<b>✅ Setup React with Routing (App.jsx)</b> <br>
<ul>
  <li>Create components/Auth for Login, Signup.</li> 
  <li>Use React Router for navigation.</li>
</ul> 
<br>
<b>✅ User Authentication (auth.js)</b> <br>
<ul>
<li>Handle signup & login using API requests.</li> 
<li>Store JWT token in localStorage.</li>
</ul>
<br>
<b>✅ Chat UI (ChatWindow.jsx)</b> <br>
<ul>
<li>Design a responsive chat interface with Tailwind CSS.</li> 
<li>Display messages in real-time.</li> 
<li>Implement auto-scrolling when new messages arrive.</li> 
</ul>
<br>
<b>✅ Sidebar with User List (Sidebar.jsx)</b> <br>
<ul>
  <li>Fetch the list of available users from the backend.</li>
  <li>Highlight active chats.</li>
</ul> 
<br>
<b>✅ Real-time Messaging (socket.io-client)</b> <br>
<ul>
<li>Emit sendMessage event when a user sends a message.</li> 
<li>Listen for receiveMessage and update the chat window.</li>
</ul>
<br>
<b>✅ Online/Offline Status (Optional in Sidebar.jsx)</b> 
<ul>
  <li>Show a green dot 🟢 for online users.
</li>
</ul>
