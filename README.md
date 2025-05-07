# 🐶 Dog Facts App

This is a React-based application built for the Script Assist Technical Assessment. It displays information about various dog breeds and supports login-based access with data enrichment and filtering.

DEMO: 
---

## 🔧 Tech Stack

- React + TypeScript
- React Router
- Zustand (state management)
- React Query (optional, but fetch used here)
- Mantine UI
- Dog API: https://dogapi.dog/api/v2/breeds
- Dog Image API: https://dog.ceo/api/breeds/image/random

---

## 📦 Features

- ✅ Login authentication with session persistence
- ✅ Protected routes using Zustand store
- ✅ Breed list page with:
  - Search by name or description
  - Filter by weight and lifespan
- ✅ Breed detail page enriched with:
  - Dog image
  - Weight/lifespan info
  - Hypoallergenic badge
- ✅ Deep linking via dynamic route `/breeds/:id`

---

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/bhargavi35/script_task.git
cd dog-facts-app
````

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Login Credentials**

* Username: `admin`
* Password: `admin`

---

## 🛠 Folder Structure

```
src/
  components/
    ProtectedRoute.tsx
    useApi.ts
  pages/
    auth/Login.tsx
    landing/Landing.tsx
    doglist.tsx
    dogdetails.tsx
  store/
    app.store.ts
  App.tsx
  main.tsx
```

---

## 📸 Screenshots



---

## 🔒 Auth Notes

Zustand is used for storing the `isAuthenticated` state. It’s persisted across sessions using `localStorage`.

---

## 🌐 API References

* [Dog Facts API](https://dogapi.dog/)
* [Dog CEO Images](https://dog.ceo/dog-api/)

---

## 📁 To-Do / Improvements

* Better error handling (toasts/snackbars)
* Pagination for long lists
* Refactor to use React Query for caching

````
### **📌 Contributors**

👨‍💻 **Bhargavi Chella** – _Full Stack Developer_  
📩 Email: chellabhargavi2002@gmail.com  
📌 LinkedIn: [https://www.linkedin.com/in/bhargavichella/] 
📌 Portfolio: [https://bhargavi35-portfolio.vercel.app/]

