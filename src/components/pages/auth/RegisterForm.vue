<template>
  <div class="flex flex-col items-center justify-center mt-[8vh] font-sans">
    <form
      @submit.prevent="submitForm"
      class="form bg-white p-5 pb-8 rounded-[20px] w-full max-w-md"
    >
      <div class="logo flex flex-col items-center">
        <img src="@/assets/logos/logo.png" class="w-[250px]" alt="Logo" />
        <h1 class="text-3xl text-gray-700 font-[500] mt-3 mb-6">Register</h1>
        <p class="text-gray-700 text-base">
          Welcom to BookMates, Start by creating an account
        </p>
      </div>

      <div class="flex flex-col items-center">
        <vs-input
          v-model="userCredentials.username"
          type="text"
          color="primary"
          label="Username"
          label-float
          required
          style="width: 326px"
        >
          <template #icon> <i class="bx bx-user" /> </template>
        </vs-input>

        <vs-input
          v-model="userCredentials.email"
          type="text"
          color="primary"
          label="Email"
          label-float
          required
          style="width: 326px"
        >
          <template #icon> @ </template>
        </vs-input>

        <vs-input
          v-model="userCredentials.password"
          :type="inputType"
          color="primary"
          label="Password"
          label-float
          required
          @click-icon="hasVisiblePassword = !hasVisiblePassword"
          icon-after
          style="width: 326px"
        >
          <template #icon>
            <i v-if="!hasVisiblePassword" class="bx bx-show-alt" />
            <i v-else class="bx bx-hide" />
          </template>
        </vs-input>

        <p class="my-6 text-gray-800">
          Already have an account?
          <router-link to="/login" class="text-blue-500">Login</router-link>
        </p>
        <vs-button class="w-[90%]">
          <h1 type="submit">Register</h1>
        </vs-button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const active = ref(false);

    // User credentials including location info
    const userCredentials = ref({
      username: "",
      email: "",
      password: "",
    });

    const hasVisiblePassword = ref(false);
    const inputType = computed(() =>
      hasVisiblePassword.value ? "text" : "password"
    );

    async function submitForm() {
      try {
        await store.dispatch("register", userCredentials.value);
        active.value = true;
        router.push("/login");
      } catch (error) {
        console.error("Registration failed:", error.response.data);
        alert("Registration failed. Please try again.");
      }
    }

    return {
      userCredentials,
      submitForm,
      inputType,
      hasVisiblePassword,
    };
  },
};
</script>

<style scoped>
.form {
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.2);
}
</style>
