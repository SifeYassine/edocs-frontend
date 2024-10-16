<template>
  <div class="flex flex-col items-center justify-center mt-[8vh] font-sans">
    <form
      @submit.prevent="submitForm"
      class="form bg-white p-5 pb-8 rounded-[20px] w-full max-w-md"
    >
      <div class="logo flex flex-col items-center">
        <img src="@/assets/logos/logo.png" class="w-[250px]" alt="Logo" />
        <h1 class="text-3xl text-gray-700 font-[500] mt-3 mb-6">Login</h1>
        <p class="text-gray-700 text-base">
          Welcome back! Please log in to your account.
        </p>
      </div>

      <div class="flex flex-col items-center">
        <vs-input
          v-model="userCredentials.username"
          type="username"
          color="primary"
          label="Username"
          label-float
          required
          style="width: 326px"
        >
          <template #icon> <i class="bx bx-user" /> </template>
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
          Don't have an account yet?
          <router-link to="/register" class="text-blue-500"
            >Register</router-link
          >
        </p>

        <vs-button class="w-[90%]">
          <h1 type="submit">Login</h1>
        </vs-button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    // User credentials for login
    const userCredentials = ref({
      username: "",
      password: "",
    });

    const hasVisiblePassword = ref(false);
    const inputType = computed(() =>
      hasVisiblePassword.value ? "text" : "password"
    );

    async function submitForm() {
      try {
        await store.dispatch("login", userCredentials.value);
        router.push("/book_posts");
      } catch (error) {
        console.error("Login failed:", error.response.data);
        alert("Login failed. Please try again.");
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
