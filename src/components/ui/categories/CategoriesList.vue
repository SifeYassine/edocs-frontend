<template>
  <ul
    class="categoriesList w-3/4 ml-[22%] mt-[2%] rounded-2xl z-[1000] bg-white grid grid-cols-6 gap-y-2.5 list-none p-[50px]"
  >
    <li
      v-for="category in filteredCategories"
      :key="category.id"
      @click="onCategoryClick(category)"
      class="font-bold p-1.5"
    >
      <div>
        <vs-button class="w-[85%]" color="primary">
          <i class="bx bx-tag text-[15px]" />
          <p class="text-[15px] ml-[5px]">{{ category.name }}</p></vs-button
        >
      </div>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const categories = computed(() => store.getters.getCategories);
    const searchQuery = computed(() => store.state.searchQuery);

    async function fetchCategories() {
      try {
        await store.dispatch("fetchCategories");
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    const filteredCategories = computed(() => {
      const searchFilter = searchQuery.value.toLowerCase();

      if (!searchFilter) {
        return categories.value;
      }

      return categories.value.filter((category) =>
        category.name.toLowerCase().includes(searchFilter)
      );
    });

    function onCategoryClick(category) {
      router.push({ path: "/my_docs", query: { category: category.name } });
    }

    onMounted(fetchCategories);

    return {
      filteredCategories,
      onCategoryClick,
    };
  },
};
</script>

<style scoped>
.categoriesList {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
