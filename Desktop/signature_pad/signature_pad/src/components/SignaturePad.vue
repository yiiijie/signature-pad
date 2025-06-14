<script setup>
import { ref } from 'vue'
import { VueSignaturePad } from 'vue-signature-pad'

const signaturePad = ref(null)

const undo = () => {
  signaturePad.value?.undoSignature()
}

const save = () => {
  const { isEmpty, data } = signaturePad.value?.saveSignature() || {}

  if (isEmpty) {
    alert('簽名板是空的，請先簽名！')
    return
  }

  // console.log('data??', data)

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
    />
    <div class="button_wrapper">
      <button @click="save">儲存</button>
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
