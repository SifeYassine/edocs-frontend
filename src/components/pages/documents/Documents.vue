<template>
  <div>
    <SideBar />
    <NavBar />
    <DocumentsList />
  </div>
</template>

<script>
import NavBar from "@/components/ui/cores/NavBar.vue";
import SideBar from "@/components/ui/cores/SideBar.vue";
import DocumentsList from "@/components/ui/documents/DocumentsList.vue";

export default {
  name: "Documents",
  components: {
    SideBar,
    NavBar,
    DocumentsList,
  },
};
</script>
