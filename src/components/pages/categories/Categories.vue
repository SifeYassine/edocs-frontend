<template>
  <div>
    <SideBar />
    <NavBar />
    <!-- <AddGenreModal class="mt-[10%]" /> -->
    <CategoriesList />
  </div>
</template>

<script>
import NavBar from "@/components/ui/cores/NavBar.vue";
import SideBar from "@/components/ui/cores/SideBar.vue";
// import AddGenreModal from "@/components/ui/genres/AddGenreModal.vue";
import CategoriesList from "@/components/ui/categories/CategoriesList.vue";

export default {
  name: "Categories",
  components: {
    SideBar,
    NavBar,
    // AddGenreModal,
    CategoriesList,
  },
};
</script>
