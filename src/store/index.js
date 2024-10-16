import { createStore } from "vuex";
import axios from "@/api/axios";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    user_id: null,
    role_id: null,
    searchQuery: "",
    categories: [],
  },
  mutations: {
    // Setters
    setTokenIds(state, { token, user_id, role_id }) {
      state.token = token;
      localStorage.setItem("token", token);
      state.user_id = user_id;
      state.role_id = role_id;
    },

    setSearchQuery(state, query) {
      state.searchQuery = query;
    },

    setCategories(state, categories) {
      state.categories = categories;
    },

    // Clear
    clearTokenIds(state) {
      state.token = "";
      localStorage.removeItem("token");
      state.user_id = null;
      state.role_id = null;
    },

    clearCategories(state) {
      state.categories = [];
    },
  },
  actions: {
    // Authentication
    async register({ commit }, credentials) {
      try {
        const { data } = await axios.post("/auth/register", credentials);
      } catch (error) {
        console.error(error);
        if (error.response) {
          // Throw the response error so that it can be caught in the component
          throw error.response;
        }
      }
    },

    async login({ commit }, credentials) {
      try {
        const { data } = await axios.post("/auth/login", credentials);
        commit("setTokenIds", {
          token: data.access_token,
          user_id: data.user.id,
          role_id: data.user.role_id,
        });
      } catch (error) {
        console.error(error);
        if (error.response) {
          // Throw the response error so that it can be caught in the component
          throw error.response;
        }
      }
    },

    async logout({ commit }) {
      await axios.post("/auth/logout");
      commit("clearTokenIds");
      commit("clearCategories");
    },

    searchQuery({ commit }, query) {
      commit("setSearchQuery", query);
    },

    // Categories CRUD
    async fetchCategories({ commit }) {
      try {
        const { data } = await axios.get("/categories/index");
        commit("setCategories", data.categories);

        console.log("categories", data.categories);
      } catch (error) {
        console.error(error);
      }
    },
  },

  // Getters
  getters: {
    userId: (state) => state.user_id,
    roleId: (state) => state.role_id,
    isAdmin: (state) => state.role_id === 1,
    isAuthenticated: (state) => state.token,
    getCategories: (state) => state.categories,
  },
});
