# Buddy Bot 🤖

Buddy Bot is a **chatbot web application** built using the **MERN stack** and integrated with the **Google Gemini API**.
It provides an interactive chat interface where users can ask questions and get AI-generated responses.

This project was created as a learning and practice project for mastering the MERN stack, API integration, and secure authentication.


## 🚀 Features

* 🔐 **User Authentication** – Secure login & signup with **JWT**
* 💬 **Chat Interface** – Interactive chatbot powered by **Gemini API**
* 🎨 **Modern UI** – Styled with **Tailwind CSS** for a clean, responsive design
* 🖼️ **Image Management** – Integrated with **ImageKit** for handling user images
* 💳 **Stripe Integration** – Payment gateway setup for future premium features
* 🌐 **Full Stack** – Frontend and Backend in a single repository


## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Tokens)
* **AI Integration:** Google Gemini API
* **Media Storage:** ImageKit
* **Payments:** Stripe
* **Deployment:** Vercel


## 📂 Project Structure

```
buddy-bot/
│── client/         # React frontend (chat UI, auth pages)
│── server/         # Express backend (API, authentication, Gemini integration)
|──.gitignore
│── README.md       # Project documentation
```


## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/buddy-bot.git
cd buddy-bot
```

### 2️⃣ Install dependencies

```bash
npm install
```
Do it in both Client and Server folder

### 3️⃣ Set up environment variables

Create a `.env` file in the server directory and configure:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
```

Create a `.env` file in the client directory and configure:

```
VITE_SERVER_URL=your_server_url
```

### 4️⃣ Run the project

```bash
npm run dev
```


## 🎯 Functionalities

1. Sign up or log in using your credentials
2. Enter your query in the chat interface
3. Get instant responses powered by **Gemini API**
4. Managed profile images using ImageKit
5. Explore payment features powered by Stripe

## 🌍 Deployment

The project is live at:
👉 [Buddy Bot on Vercel](https://buddy-bot-swart.vercel.app/)

## 🔮 Future Improvements

* 🎙️ Voice-based chatbot
* 🧠 Chat history with search
* 💡 More integrations (e.g., OpenAI, LangChain)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR or fork the repo.