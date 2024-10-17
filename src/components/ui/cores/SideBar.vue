<template>
  <vs-sidebar v-model="active" absolute open class="sidebar" color="primary">
    <div class="mt-[20px]">
      <vs-sidebar-item id="home" to="/">
        <template #icon>
          <i class="bx bx-home-alt-2" />
        </template>
        Home
      </vs-sidebar-item>

      <vs-sidebar-item id="mydocs" to="/my_docs">
        <template #icon>
          <i class="bx bx-file-blank" />
        </template>
        My Docs
      </vs-sidebar-item>

      <vs-sidebar-item id="categories" to="/categories">
        <template #icon>
          <i class="bx bx-tag" />
        </template>
        Categories
      </vs-sidebar-item>

      <vs-sidebar-item @click="logout" class="logout">
        <template #icon>
          <i class="bx bx-power-off" />
        </template>
        Logout
      </vs-sidebar-item>
    </div>
  </vs-sidebar>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const active = ref("my_docs");
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const path = route.path;
    if (path) {
      active.value = path.split("/")[1];
    }

    async function logout() {
      try {
        await store.dispatch("logout");
        router.push("/");
      } catch (error) {
        console.error("Failed to logout:", error);
      }
    }

    return {
      active,
      logout,
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 20%;
  height: 80% !important;
  margin: 2% 0 0 2%;
  border-radius: 20px;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
