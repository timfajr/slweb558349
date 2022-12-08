<template>
    <ul class="pagination flex flex-row space-x-3 mb-5 text-center self-center justify-center text-sm">
      <li class="p-2 px-4 bg-white bg-opacity-10 rounded-xl text-white">
        <button
          type="button"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
        >
          First
        </button>
      </li>
  
      <li class="p-2 px-4 bg-white bg-opacity-10 rounded-xl text-white">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
        >
          Previous
        </button>
      </li>
  
      <!-- Visible Buttons Start -->
  
      <li
      v-for="page in pages"
      :key="page.name"
      class="p-2 px-4 text-white"
      >
      <div
        type="p-2 px-4 text-white"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </div>
    </li>
  
      <!-- Visible Buttons End -->
  
      <li class="p-2 px-4 bg-white bg-opacity-10 rounded-xl text-white">
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
        >
          Next
        </button>
      </li>
  
      <li class="p-2 px-4 bg-white bg-opacity-10 rounded-xl text-white">
        <button
          type="button"
          @click="onClickLastPage"
          :disabled="isInLastPage"
        >
          Last
        </button>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    props: {
      maxVisibleButtons: {
        type: Number,
        required: false,
        default: 3
      },    
      totalPages: {
        type: Number,
        required: true
      },
      perPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }

      // When inbetween
      return this.currentPage - 1;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    }
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
  };
  </script>

<style>
.active {
  background-color: #FCC139;
  color: #234899;
  font-weight: 700;
  border-radius : 10px;
  padding: 2px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>