<template>
  <div class="w-full h-full overflow-hidden max-w-7xl mx-auto">

    <!-- SHOW SPLIT ON LARGE DISPLAY -->
    <div class="w-full h-full overflow-hidden hidden lg:flex">
      <div class="flex-none h-full overflow-hidden flex flex-col w-112 xl:w-128 p-4">
        <div class="h-full overflow-hidden flex flex-col gap-4">
          <div class="h-full overflow-auto hide-scrollbar">
            <slot name="chat"></slot>
          </div>
          <div class="flex-none">
            <slot name="command"></slot>
          </div>
        </div>
      </div>
      <div id="document-view" class="flex-1 p-4 pl-2 overflow-auto hide-scrollbar">
        <div class="p-4 lg:p-6 xl:p-8 bg-white text-dark rounded-lg min-h-full">
          <slot name="document"></slot>
        </div>
      </div>
    </div>

    <!-- SHOW MESSAGE ON SMALL DISPLAY -->
    <div class="lg:hidden h-full grid place-items-center px-6 py-16">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight sm:text-5xl">Display too small</h1>
        <p class="mt-6 text-base leading-7 max-w-sm">
          Sorry, this demo is designed for desktop screens.
          Please try on a larger display.
          Rest assured, our final application will be designed mobile-first.
        </p>
      </div>
    </div>

  </div>
</template>
