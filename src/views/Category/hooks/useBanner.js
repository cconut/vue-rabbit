import { ref, onMounted } from "vue";
import { getBannerApI } from "@/apis/home";
export function useBanner() {
    const bannerList = ref([]);
    const getBanner = async () => {
        const res = await getBannerApI();
        bannerList.value = res.result;
    };
    onMounted(() => {
        getBanner();
    });
    return {
        bannerList
    }
}