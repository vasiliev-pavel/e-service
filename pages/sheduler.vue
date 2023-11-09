<template>
  <div class="p-4 bg-transparent rounded-lg shadow-md m-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-bold">Выберите дату и время</h2>
      <button class="text-sm">Все доступные</button>
    </div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-md">Людмила Владимировна</h3>
      <div>
        <button class="p-2">&lt;</button>
        <button class="p-2">&gt;</button>
      </div>
    </div>
    <div class="flex overflow-x-auto mb-4">
      <button class="p-2 mx-1 bg-blue-500 text-black rounded">чт 9</button>
      <button class="p-2 mx-1">пт 10</button>
      <!-- Добавьте остальные кнопки дат -->
    </div>
    <div class="flex flex-col">
      <div class="mb-4">
        <h4 class="font-bold mb-2">Утро</h4>
        <div class="grid grid-cols-4 gap-2">
          <!-- Добавьте кнопки времени для утра -->
          <button class="p-2 border rounded">09:00</button>
          <!-- Добавьте остальные кнопки времени -->
        </div>
      </div>
      <div>
        <h4 class="font-bold mb-2">День</h4>
        <div class="grid grid-cols-4 gap-2">
          <!-- Добавьте кнопки времени для дня -->
          <button class="p-2 border rounded">12:00</button>
          <!-- Добавьте остальные кнопки времени -->
        </div>
      </div>
    </div>
  </div>
</template>
