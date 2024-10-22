import { createStore } from "vuex";
import axios from "@/api/axios";

export default createStore({
  state: {
    // Category modal state
    categoryModal: {
      isOpen: false,
      mode: null, // 'add' or 'edit'
      category: { name: "" }, // empty category
    },

    // Authentication (token & Ids) state
    tokenIds: {
      token: localStorage.getItem("token") || "",
      user_id: null,
      role_id: null,
    },

    searchQuery: "",
    categories: [],
    documents: [],
    selectedDocument: null,
  },
  mutations: {
    // Setters
    setTokenIds(state, { token, user_id, role_id }) {
      state.tokenIds.token = token;
      localStorage.setItem("token", token);
      state.tokenIds.user_id = user_id;
      state.tokenIds.role_id = role_id;
    },

    setCategoryModal(state, { isOpen, mode, category }) {
      state.categoryModal.isOpen = isOpen;
      state.categoryModal.mode = mode;
      state.categoryModal.category = category;
    },

    setSearchQuery(state, query) {
      state.searchQuery = query;
    },

    setCategories(state, categories) {
      state.categories = categories;
    },

    setDocuments(state, documents) {
      state.documents = documents;
    },

    setSelectedDocument(state, document) {
      state.selectedDocument = document;
    },

    // Clear
    clearTokenIds(state) {
      state.tokenIds.token = "";
      localStorage.removeItem("token");
      state.tokenIds.user_id = null;
      state.tokenIds.role_id = null;
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
          token: state.tokenIds.token, // Keep the existing token
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

    // Category modal state triggers
    openCategoryModal({ commit }, { mode, category }) {
      commit("setCategoryModal", {
        isOpen: true,
        mode,
        category: category || { name: "" }, // empty category for 'add' mode
      });
    },

    closeCategoryModal({ commit }) {
      commit("setCategoryModal", {
        isOpen: false,
        mode: null,
        category: { name: "" },
      });
    },

    // Categories CRUD
    async fetchCategories({ commit }) {
      try {
        const { data } = await axios.get("/categories/index");

        commit("setCategories", data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },

    async addCategory({ commit, state }, category) {
      try {
        const { data } = await axios.post("/categories/create", category);

        // Add the newly created category to the state by appending it to the existing categories
        commit("setCategories", [...state.categories, data.category]);
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    },

    async editCategory({ commit, state }, category) {
      try {
        await axios.put(`/categories/update/${category.id}`, category);

        // Update the state with the edited category by replacing the matching category in the array
        const editedCategories = state.categories.map((categ) =>
          // Replace the category whose Id matches with the updated category, otherwise keep the existing category
          categ.id === category.id ? category : categ
        );
        commit("setCategories", editedCategories);
      } catch (error) {
        console.error("Failed to edit category:", error);
      }
    },

    async deleteCategory({ commit, state }, categoryId) {
      try {
        await axios.delete(`/categories/delete/${categoryId}`);

        // Remove the deleted category from the state by filtering it out
        const deletedCategories = state.categories.filter(
          (category) =>
            // Only keep categories whose Ids don't match the deleted category Id
            category.id !== categoryId
        );
        commit("setCategories", deletedCategories);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    },

    // Documents CRUD
    async fetchDocuments({ commit }) {
      try {
        const { data } = await axios.get("/documents/index");

        commit("setDocuments", data.documents);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    },

    async addDocument({ commit, state }, document) {
      try {
        // Create a FormData object from the document object
        const formData = new FormData();

        // Loop through the document object to append all fields to FormData
        for (const key in document) {
          // If the document does not have a category id, skip it
          if (key === "category_id" && !document[key]) {
            continue;
          }
          formData.append(key, document[key]);
        }

        //Make the API request with the FormData object
        const { data } = await axios.post("/documents/create", formData);

        // Add the newly created document to the state by appending it to the existing documents
        commit("setDocuments", [...state.documents, data.document]);
      } catch (error) {
        console.error("Failed to add document:", error);
      }
    },

    getDocumentById({ commit, state }, id) {
      // Find the document with the matching id in documents array, then set the found document to the state
      const selectedDocument = state.documents.find(
        (document) => document.id === id
      );

      commit("setSelectedDocument", selectedDocument);
    },
  },

  // Getters
  getters: {
    isAuthenticated: (state) => state.tokenIds,
    isAdmin: (state) => state.tokenIds.role_id === 1,
    getCategories: (state) => state.categories,
    getDocuments: (state) => state.documents,
    getSelectedDocument: (state) => state.selectedDocument,
    getCategoryModal: (state) => state.categoryModal,
    getSearchQuery: (state) => state.searchQuery,
  },
});
