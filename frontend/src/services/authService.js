import { BACKEND_API_URL } from "./constant.js";

export const authService = {
  async login(email, password) {
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Erreur de connexion au serveur");
    }
  },

  async register(email, password) {
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur d'inscription");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Erreur d'inscription au serveur");
    }
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const response = await fetch(`${BACKEND_API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        return null;
      }

      return response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }
  },
};
