import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./User";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1. 定义state - cartList
    let cartList = ref([])
    // 2. 定义action - addCart
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            //登录之后加入购物车的逻辑
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            // 添加购物车操作
            // 已添加过 - count + 1
            // 没有添加过 - 直接push
            // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                // 找到了
                item.count += goods.count
            } else {
                // 没找到
                cartList.value.push(goods)
            }
        }

    }

    //获取最新购物车列表action
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }

    //删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            updateNewList()
        } else {
            cartList.value = cartList.value.filter((item) => skuId !== item.skuId)
        }

    }

    //清除购物车
    const clearCart = () => {
        cartList.value = []
    }

    //单选功能
    const singleCheck = (selected, skuId) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }


    //全选功能
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }

    const isAll = computed(() => {
        return cartList.value.every((item) => item.selected)
    })

    //计算属性
    //总数
    const allCount = computed(() => {
        return cartList.value.reduce((a, c) => a + c.count, 0)
    })
    //总价
    const allPrice = computed(() => {
        return cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    })
    //选中的数量
    const selectedCount = computed(() => {
        return cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0)
    })
    //选中的商品总价
    const selectedPrice = computed(() => {
        return cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0)
    })
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        allCheck,
        isAll,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
},
    { persist: true })