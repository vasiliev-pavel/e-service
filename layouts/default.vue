<template>
  <UContainer class="relative">
    <Header />
    <main>
      <slot />
    </main>
    <UNotifications />
    <Footer />
  </UContainer>
  <Loader />
</template>
