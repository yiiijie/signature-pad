<script setup>
import { ref, onMounted, computed } from 'vue'
import { VueSignaturePad } from 'vue-signature-pad'

const signaturePad = ref(null)
const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

const penColor = computed(() => (isDarkMode.value ? '#ffffff' : '#000000'))

// 監聽系統顏色模式並更新筆畫顏色
const updatePenColor = () => {
  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  // console.log('系統顏色模式變更：', isDarkMode.value ? '深色' : '淺色')
  // console.log('當前筆畫顏色：', penColor.value)
}

onMounted(() => {
  updatePenColor()

  // 監聽系統顏色模式變化
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    updatePenColor()
  })
})

const undo = () => {
  signaturePad.value?.undoSignature()
}

const save = () => {
  const { isEmpty, data } = signaturePad.value?.saveSignature() || {}

  if (isEmpty) {
    alert('簽名板是空的，請先簽名！')
    return
  }

  // console.log('純base64', data.split(',')[1])

  // 創建下載連結
  const link = document.createElement('a')
  link.href = data
  link.download = '簽名.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div>
    <VueSignaturePad
      height="500px"
      ref="signaturePad"
      :customStyle="{ border: '1px solid #ccc', borderRadius: '8px' }"
      :options="{
        penColor: penColor,
      }"
    />
    <div class="button_wrapper">
      <button @click="save">確認</button>
      <button @click="undo">清除</button>
    </div>
  </div>
</template>

<style scoped>
div.button_wrapper {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #e1e1e1;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d9d9d9;
}
</style>
