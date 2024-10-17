import { createStore } from "vuex";
import axios from "@/api/axios";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    user_id: null,
    role_id: null,
    searchQuery: "",
    categories: [],
    editModalState: false,
    selectedCategory: null,
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

    setEditModalState(state, isOpen) {
      state.editModalState = isOpen;
    },

    setSelectedCategory(state, category) {
      state.selectedCategory = category;
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

    async getMyProfile({ commit, state }) {
      try {
        const { data } = await axios.get("/users/get_profile");

        commit("setTokenIds", {
          token: state.token, // Keep the existing token
          user_id: data.user.id,
          role_id: data.user.role_id,
        });
      } catch (error) {
        console.error("Failed to get profile:", error);
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

    openEditModal({ commit }, category) {
      commit("setSelectedCategory", category);
      commit("setEditModalState", true);
    },

    closeEditModal({ commit }) {
      commit("setEditModalState", false);
    },

    // Categories CRUD
    async fetchCategories({ commit }) {
      try {
        const { data } = await axios.get("/categories/index");

        commit("setCategories", data.categories);
      } catch (error) {
        console.error(error);
      }
    },

    async addCategory({ commit, state }, category) {
      try {
        const { data } = await axios.post("/categories/create", category);

        // Update the state with the newly added category
        commit("setCategories", [...state.categories, data.category]);
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    },

    async editCategory({ commit, state }, category) {
      try {
        await axios.put(`/categories/update/${category.id}`, category);

        // Update the state with the newly edited category
        commit(
          "setCategories",
          state.categories.map((categ) =>
            categ.id === category.id ? category : categ
          )
        );
      } catch (error) {
        console.error("Failed to edit category:", error);
      }
    },

    async deleteCategory({ commit, state }, categoryId) {
      try {
        await axios.delete(`/categories/delete/${categoryId}`);

        // Update the state with the newly deleted category
        commit(
          "setCategories",
          state.categories.filter((category) => category.id !== categoryId)
        );
      } catch (error) {
        console.error("Failed to delete category:", error);
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
    isEditModalOpen: (state) => state.editModalState,
    getSelectedCategory: (state) => state.selectedCategory,
  },
});
