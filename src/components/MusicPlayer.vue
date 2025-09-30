<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const songData = ref(null);
const error = ref(null);
const isVisible = ref(false); // Controls visibility of the entire component
const realtimePosition = ref(0);

let pollIntervalId = null;
let progressIntervalId = null;
let songEndTimer = null;

let lastServerPosition = 0;
let lastClientUpdateTime = 0;

const fetchData = async () => {
  if (songEndTimer) {
    clearTimeout(songEndTimer);
    songEndTimer = null;
  }

  try {
    const response = await fetch('https://api.music.xuxue07.cn/api/status');
    if (!response.ok) throw new Error(`API request failed`);

    const data = await response.json();
    if (data.status === 'online' && data.song_data && data.song_data.available && data.song_data.playing) {
      songData.value = data.song_data;
      isVisible.value = true;
    } else {
      // If nothing is playing, ensure the component is hidden
      isVisible.value = false;
    }
    error.value = null;
  } catch (err) {
    console.error("Error fetching music data:", err);
    error.value = null; // Don't show error in the UI, just hide the component
    isVisible.value = false;
  }
};

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) seconds = 0;
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const startProgressUpdater = () => {
  if (progressIntervalId) return;

  progressIntervalId = setInterval(() => {
    if (isVisible.value && songData.value) {
      const elapsedTime = (Date.now() - lastClientUpdateTime) / 1000;
      const calculatedPosition = lastServerPosition + elapsedTime;
      realtimePosition.value = Math.min(calculatedPosition, songData.value.duration);

      // When song ends, stop the ticker and schedule a fetch
      if (realtimePosition.value >= songData.value.duration && !songEndTimer) {
        stopProgressUpdater();
        songEndTimer = setTimeout(() => fetchData(), 3000); // Wait 3 seconds then check
      }
    }
  }, 250);
};

const stopProgressUpdater = () => {
  if (progressIntervalId) {
    clearInterval(progressIntervalId);
    progressIntervalId = null;
  }
};

watch(songData, (newSongData) => {
  if (songEndTimer) {
    clearTimeout(songEndTimer);
    songEndTimer = null;
  }

  if (newSongData && isVisible.value) {
    // Always reset the baseline when we get fresh data from the server.
    // This corrects any client-side drift.
    lastServerPosition = newSongData.position;
    lastClientUpdateTime = Date.now();
    realtimePosition.value = newSongData.position;

    startProgressUpdater();
  } else {
    stopProgressUpdater();
  }
}, { deep: true });

onMounted(() => {
  fetchData();
  pollIntervalId = setInterval(fetchData, 10000);
});

onUnmounted(() => {
  if (pollIntervalId) clearInterval(pollIntervalId);
  stopProgressUpdater();
  if (songEndTimer) clearTimeout(songEndTimer);
});
</script>

<template>
  <div v-if="isVisible && songData" class="bg-white rounded-lg not-dark:shadow-md p-6 dark:bg-[#181a1b]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        电脑正在播放...
      </h2>
      <button @click="fetchData" class="p-1.5 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
        <span class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </span>
      </button>
    </div>

    <div class="flex items-center gap-4">
      <img :src="songData.detail.cover" alt="Album Cover" class="w-24 h-24 rounded-md shadow-lg" />
      <div class="flex-1 min-w-0">
        <a :href="songData.detail.url" target="_blank" rel="noopener noreferrer" class="text-lg font-bold text-blue-500 hover:underline truncate block">{{ songData.detail.name }}</a>
        <p class="text-sm text-gray-500 truncate">{{ songData.detail.artistNames.join(', ') }}</p>
        <div class="mt-2">
          <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div class="bg-blue-500 h-1.5 rounded-full" :style="{ width: (realtimePosition / songData.duration * 100) + '%' }"></div>
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span>{{ formatTime(realtimePosition) }}</span>
            <span>{{ formatTime(songData.duration) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
