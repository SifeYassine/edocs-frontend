<template>
  <div class="flex justify-center items-center ml-[12%]">
    <vs-button @click="active = !active" color="primary">
      + New Category
    </vs-button>
    <vs-dialog v-model="active" width="20vw">
      <template #header class="mt-6">
        <h4>Add Category</h4>
      </template>

      <div class="flex flex-col gap-5 items-center">
        <vs-input
          v-model="newCategory.name"
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
          >Add Category</vs-button
        >
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const active = ref(false);
    const newCategory = ref({
      name: "",
      user_id: "",
    });
    const store = useStore();
    const userId = computed(() => store.getters.userId);

    async function getMyProfile() {
      try {
        await store.dispatch("getMyProfile");
      } catch (error) {
        console.error("Failed to get my profile:", error);
      }
    }

    async function submitForm() {
      try {
        newCategory.value.user_id = userId.value;
        await store.dispatch("addCategory", newCategory.value);
        newCategory.value = { name: "", user_id: "" };

        active.value = false;
      } catch (error) {
        console.error("Failed to add genre:", error);
      }
    }

    onMounted(getMyProfile);

    return {
      active,
      newCategory,
      submitForm,
    };
  },
};
</script>
