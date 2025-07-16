//封装倒计时逻辑函数
import { computed, onUnmounted, ref } from "vue"
import dayjs from "dayjs"
export const useCountDown = () => {
    //定义响应式的数据
    const time = ref(0)
    let timer = null
    //格式化时间
    const formatTime = computed(() => {
        return dayjs.unix(time.value).format('mm分ss秒')
    })
    //开启倒计时的函数
    const start = (currentTime) => {
        //开启倒计时逻辑  每一秒就减一
        time.value = currentTime
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }
    //组件销毁时，清除定时器
    onUnmounted(() => {
        if (timer) clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}