<template>
  <main class="w-[92vw] mx-auto mt-[120px] flex flex-col items-center">
    <section class="hero grid m-7 mb-2 lg:grid-cols-2">
      <div class="left text-left mt-[30px] px-16 py-0">
        <h1 class="hero-title text-6xl text-gray-900 font-bold mx-0 my-7">
          Unlock Knowledge, Share Books, and Connect with Fellow Reading
          Enthusiasts.
        </h1>
        <p class="hero-description text-gray-700 text-xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
          molestias corrupti debitis, esse.
        </p>
        <vs-button color="#345BFF" style="margin-top: 20px">
          <router-link to="/register" class="text-white">
            Get Started
          </router-link>
        </vs-button>
      </div>
      <div class="right p-5">
        <img
          src="@/assets/images/hero.png"
          alt="Hero Image"
          class="hero-image w-[100%] rounded-xl"
        />
      </div>
    </section>

    <h1 class="text-5xl text-gray-900 font-bold mb-6">Supported Formats</h1>
    <section
      id="features"
      class="w-[70%] mx-auto rounded-2xl p-5 grid gap-10 lg:grid-cols-3"
    >
      <article class="flex flex-col items-center">
        <img src="@/assets/images/pdf.png" alt="" class="w-[100px]" />
        <h1 class="text-2xl text-gray-900 ml-5">PDF</h1>
      </article>

      <article class="flex flex-col items-center">
        <img src="@/assets/images/docx.png" alt="" class="w-[100px]" />
        <h1 class="text-2xl text-gray-900 ml-5">DOCX</h1>
      </article>

      <article class="flex flex-col items-center">
        <img src="@/assets/images/xlsx.png" alt="" class="w-[100px]" />
        <h1 class="text-2xl text-gray-900 ml-5">XLSX</h1>
      </article>

      <article class="flex flex-col items-center">
        <img src="@/assets/images/pptx.png" alt="" class="w-[100px]" />
        <h1 class="text-2xl text-gray-900 ml-5">PPTX</h1>
      </article>
    </section>

    <h1 class="text-5xl text-gray-900 font-bold mt-5 mb-6">How it works?</h1>
    <section
      id="guide"
      class="w-[70%] mx-auto rounded-2xl p-5 bg-[#f5f5f5] flex flex-col items-center"
    >
      <div class="w-[90%] flex gap-5 items-center right text-left py-0">
        <div class="left p-5">
          <img
            src="@/assets/images/hero.png"
            alt="Hero Image"
            class="hero-image w-[400px] rounded-xl"
          />
        </div>
        <div class="flex flex-col gap-5">
          <article class="p-[20px] rounded-[20px] z-[1000] bg-[white]">
            <h1 class="text-xl text-gray-900 mb-3">
              1. Create The Book You Offering
            </h1>
            <p class="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              molestias corrupti debitis.
            </p>
          </article>
          <article class="p-[20px] rounded-[20px] z-[1000] bg-[white]">
            <h1 class="text-xl text-gray-900 mb-3">
              2. Create The Book You Wish to Receive
            </h1>
            <p class="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              molestias corrupti debitis.
            </p>
          </article>
        </div>
      </div>
      <div class="w-[90%] flex gap-5 items-center right text-left py-0">
        <div class="flex flex-col gap-5">
          <article class="p-[20px] rounded-[20px] z-[1000] bg-[white]">
            <h1 class="text-xl text-gray-900 mb-3">3. Submit Your Book Post</h1>
            <p class="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              molestias corrupti debitis.
            </p>
          </article>
          <article class="p-[20px] rounded-[20px] z-[1000] bg-[white]">
            <h1 class="text-xl text-gray-900 mb-3">
              4. Wait for Other Users' Exchange Requests
            </h1>
            <p class="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              molestias corrupti debitis.
            </p>
          </article>
        </div>
        <div class="left p-5">
          <img
            src="@/assets/images/hero.png"
            alt="Hero Image"
            class="hero-image w-[400px] rounded-xl"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "Hero",
};
</script>
