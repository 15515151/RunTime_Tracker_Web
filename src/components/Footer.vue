<script setup>
const props = defineProps({
  clientIp: {
    type: String
  },
});
</script>

<template>
  <footer class="bottom-0 left-0 right-0 py-2">
    <div class="container mx-auto flex justify-center items-center px-4">
      <!-- IP地址显示 -->
      <div class="flex items-center px-3 py-1 text-sm mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span class="text-gray-700 font-mono dark:text-[#c2bea7]">{{ props.clientIp }}</span>
      </div>

      <!-- 版权信息 -->
      <p class="text-gray-500 text-sm mr-4 dark:text-gray-400">
        © 2025 Runtime Tracker V0.2.1
      </p>

      <p class="text-gray-500 text-sm mr-4 dark:text-gray-400 flex items-center">
        <a href="https://github.com/15515151/RunTime_Tracker_Web" target="_blank" rel="noopener noreferrer" class="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <svg class="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          GitHub
        </a>
        <span class="mx-2">|</span>
        <span class="text-sm">
          Originally from <a href="https://github.com/1812z/RunTime_Tracker" target="_blank" rel="noopener noreferrer" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">RunTime_Tracker</a>
        </span>
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(10px);
}
</style>