<template>
  <div>
    <SideBar />
    <NavBar />
    <AddCategoryModal class="mt-[10%]" />
    <EditCategoryModal />
    <CategoriesList />
  </div>
</template>

<script>
import NavBar from "@/components/ui/cores/NavBar.vue";
import SideBar from "@/components/ui/cores/SideBar.vue";
import AddCategoryModal from "@/components/ui/categories/AddCategoryModal.vue";
import EditCategoryModal from "@/components/ui/categories/EditCategoryModal.vue";
import CategoriesList from "@/components/ui/categories/CategoriesList.vue";

export default {
  name: "Categories",
  components: {
    SideBar,
    NavBar,
    AddCategoryModal,
    EditCategoryModal,
    CategoriesList,
  },
};
</script>
