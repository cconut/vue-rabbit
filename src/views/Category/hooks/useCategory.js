import { getTopCategoryAPI } from "@/apis/category";
import { ref, onMounted } from "vue";

import { useRoute, onBeforeRouteUpdate } from "vue-router";
const route = useRoute();
export function useCategory() {
    const categoryData = ref({});
    const getCategory = async (id = route.params.id) => {
        const res = await getTopCategoryAPI(id);
        categoryData.value = res.result;
        //console.log(categoryData.value);
    };
    onMounted(() => {
        getCategory();
    });

    //路由参数变化的时候，可以把分类的接口重新发送
    onBeforeRouteUpdate((to) => {
        console.log("路由变化了");
        getCategory(to.params.id);
    });
    return { categoryData }
}