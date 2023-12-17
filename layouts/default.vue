<template>
  <UContainer>
    <Header />
    <main>
      <slot />
    </main>
    <UNotifications />
  </UContainer>
  <Loader />
</template>
