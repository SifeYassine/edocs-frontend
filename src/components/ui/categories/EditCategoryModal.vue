<template>
  <div class="flex justify-center items-center ml-[12%]">
    <vs-dialog v-model="isModalOpen" width="20vw" @close="closeModal">
      <template #header>
        <h4>Edit Category</h4>
      </template>
      <div class="flex flex-col gap-5 items-center">
        <vs-input
          v-model="selectedCategory.name"
          @keyup.enter="submitForm()"
          type="text"
          color="primary"
          label="Name"
          label-float
          required
          style="width: 326px"
        >
          <template #icon> # </template>
        </vs-input>

        <vs-button @click="submitForm()" class="w-[90%]" color="primary"
          >Update Category</vs-button
        >
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    const isModalOpen = computed(() => store.getters.isEditModalOpen);
    const selectedCategory = computed(() => store.getters.getSelectedCategory);

    function submitForm() {
      try {
        store.dispatch("editCategory", selectedCategory.value);
        store.dispatch("closeEditModal");
      } catch (error) {
        console.error("Failed to edit category:", error);
      }
    }

    function closeModal() {
      store.dispatch("closeEditModal");
    }

    return {
      isModalOpen,
      selectedCategory,
      submitForm,
      closeModal,
    };
  },
};
</script>
