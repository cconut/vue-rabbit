import { getTopCategoryAPI } from "@/apis/category";
import { ref, onMounted } from "vue";

import { useRoute, onBeforeRouteUpdate } from "vue-router";
export function useCategory() {
    const categoryData = ref({});
    //这里的route必须放在函数的内部，放在外部的话无法获取当前组件的上下文
    const route = useRoute();
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
        //console.log("路由变化了");
        //console.log(to.params.id);
        getCategory(to.params.id);
    });
    return { categoryData }
}