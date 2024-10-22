<template>
  <div>
    <PreviewSelectedDocument v-model="active" :document="selectedDocument" />
    <ul
      class="list-none grid gap-4 px-[60px] py-[20px] mt-3 ml-[18.5%] rounded-3xl z-[1000]"
      style="grid-template-columns: repeat(5, 1fr)"
    >
      <li v-for="document in filteredDocuments" :key="document.id">
        <div
          @click="getSelectedDocument(document.id)"
          class="flex flex-col items-center cursor-pointer"
        >
          <vs-card
            style="width: 100%; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)"
          >
            <template #title>
              <h2>{{ document.title }}</h2>
            </template>
            <template #img>
              <img
                :src="`/images/${document.format}.png`"
                class="h-[200px] object-fill p-[20px]"
                :alt="`${document.format} icon`"
              />
            </template>
            <template #text> </template>
            <template #interactions>
              <vs-button v-if="document.category_id" color="primary">
                <i class="bx bx-tag" />
                <span class="span" style="margin-left: 5px">
                  {{ document.category_id.name }}
                </span>
              </vs-button>
            </template>
          </vs-card>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import PreviewSelectedDocument from "./PreviewSelectedDocument.vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  components: {
    PreviewSelectedDocument,
  },
  setup() {
    const active = ref(false);
    const store = useStore();
    const route = useRoute();

    const documents = computed(() => store.getters.getDocuments);
    const selectedDocument = computed(() => store.getters.getSelectedDocument);
    const searchQuery = computed(() => store.getters.getSearchQuery);
    const categoryName = ref(route.query.category || "");

    async function fetchDocuments() {
      try {
        await store.dispatch("fetchDocuments");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const filteredDocuments = computed(() => {
      const searchFilter = searchQuery.value.toLowerCase();
      const categoryFilter = categoryName.value.toLowerCase();

      if (!searchFilter && !categoryFilter) {
        return documents.value;
      }

      return documents.value.filter((document) => {
        return (
          document.title.toLowerCase().includes(searchFilter) &&
          document.category_id.name.toLowerCase().includes(categoryFilter)
        );
      });
    });

    function getSelectedDocument(id) {
      store.dispatch("getDocumentById", id);
      active.value = true;
    }

    onMounted(() => {
      fetchDocuments();
    });

    return {
      active,
      documents,
      fetchDocuments,
      filteredDocuments,
      getSelectedDocument,
      selectedDocument,
      searchQuery,
      categoryName,
    };
  },
};
</script>

<style scoped>
img {
  border-radius: 30px !important;
}
</style>
