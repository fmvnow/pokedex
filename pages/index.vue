<template>
  <div class="container mx-auto gap-8 items-start flex flex-col">
    <button
      class="border-2 rounded-full px-3 py-2 border-primary text-primary text-sm self-end"
      @click="setDark"
    >
      {{ isDark ? "Light" : "Dark" }}
    </button>
    <div class="flex flex-col gap-2 items-start">
      <button class="text-2xl text-on-background">
        <span class="fa-solid fa-arrow-left"></span>
      </button>

      <h1 class="font-bold text-5xl text-on-surface">Pokedex</h1>
    </div>

    <div
      class="rounded-3xl text-on-colored bg-grass-40 overflow-hidden px-4 py-4 grid grid-cols-2 gap-x-3 max-w-xs shadow-lg"
    >
      <h2 class="text-3xl font-bold col-span-2 auto-rows-min">Bulbasaur</h2>

      <div class="flex flex-wrap gap-x-2 items-start mt-2">
        <span class="bg-surface/25 rounded-full px-2 text-sm">Grama</span>
        <span class="bg-surface/25 rounded-full px-2 text-sm">Veneno</span>
      </div>

      <div class="relative pl-4 py-2">
        <div
          class="bg-white/25 rounded-full absolute min-w-full min-h-full -right-1/4 -bottom-1/4 scale-[1.75] flex items-center justify-center"
        >
          <div class="w-full bg-grass-40 h-3 absolute"></div>
          <div
            class="bg-grass-40 rounded-full w-14 h-14 flex items-center justify-center relative"
          >
            <div class="bg-white/25 rounded-full w-9 h-9"></div>
          </div>
        </div>
        <img
          class="-scale-x-100"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
          alt="Bulbassaur"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDark = ref(false);

function setDark() {
  if (isDark.value) {
    document.documentElement.classList.remove("dark");
    isDark.value = false;
    return;
  }

  document.documentElement.classList.add("dark");
  isDark.value = true;
}
</script>
