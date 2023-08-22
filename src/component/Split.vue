<template>
  <div class="lg:hidden h-full grid place-items-center px-6 py-16">
    <div class="text-center">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Display too small</h1>
      <p class="mt-6 text-base leading-7 text-gray-600 max-w-sm">
        Sorry, this demo is designed for desktop screens.
        Please try on a larger display.
        Rest assured, our final application will be designed mobile-first.
      </p>
    </div>
  </div>
  <div class="hidden lg:flex h-full">
    <div class="flex-1 p-4">
      <slot name="lhs"></slot>
    </div>
    <div class="flex-1 p-4">
      <slot name="rhs"></slot>
    </div>
  </div>
</template>
