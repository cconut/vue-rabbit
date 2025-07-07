<template>
  <div>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <!-- 添加key 破坏复用机制 强制销毁重建 -->
    <!-- <router-view :key="$route.fullPath" /> -->
    <router-view />
    <LayoutFooter />
  </div>
</template>
<script setup>
import LayoutFixed from "./components/LayoutFixed.vue";
import LayoutNav from "./components/LayoutNav.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import { useCategoryStore } from "@/stores/Category";
import { onMounted } from "vue";
const categoryStore = useCategoryStore();
onMounted(() => {
  categoryStore.getCategory();
});
</script>