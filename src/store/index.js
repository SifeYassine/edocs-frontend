import { createStore } from "vuex";
import axios from "@/api/axios";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    user_id: null,
    role_id: null,
  },
  mutations: {
    // Set
    setTokenIds(state, { token, user_id, role_id }) {
      state.token = token;
      localStorage.setItem("token", token);
      state.user_id = user_id;
      state.role_id = role_id;
    },

    // Clear
    clearTokenIds(state) {
      state.token = "";
      localStorage.removeItem("token");
      state.user_id = null;
      state.role_id = null;
    },
  },
  actions: {
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
    },
  },
  getters: {
    userId: (state) => state.user_id,
    roleId: (state) => state.role_id,
    isAdmin: (state) => state.role_id === 1,
    isAuthenticated: (state) => state.token,
  },
});
