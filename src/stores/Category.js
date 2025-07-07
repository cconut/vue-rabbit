import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/Layout";
import { onMounted, ref } from "vue";
export const useCategoryStore = defineStore('category', () => {
    //导航列表数据管理
    //state
    const categoryList = ref([]);
    //action
    const getCategory = async () => {
        const res = await getCategoryAPI();
        categoryList.value = res.result;
    };

    return {
        categoryList,
        getCategory
    }
})