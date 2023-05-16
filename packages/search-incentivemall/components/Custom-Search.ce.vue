<template>
  <div
    ref="searchWrapper"
    :class="{ infront: active }"
    id="search-wrapper"
    :style="{ height: active ? '100%' : 0 }"
  >
    <div
      class="search__open"
      :class="{ hide: !active }"
      @click="hideSearch"
    ></div>
    <div
      id="search"
      class="search"
      :class="{ hide: !active }"
      :style="{
        height: getModuleHeight,
      }"
    >
      <div class="search-box">
        <input
          type="text"
          v-model="searchString"
          class="search-input"
          :placeholder="$t.placeholder"
          ref="search"
        />
        <div @click="hideSearch" class="search-close__container">
          <svg
            class="search-close__button"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            viewBox="0 0 16 16"
            fill="rgb(44, 62, 80);"
          >
            <path
              d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"
            />
          </svg>
        </div>
      </div>
      <div v-if="error" style="color: red">{{ error }}</div>
      <div v-if="isSearchEmpty" class="search-results_empty">
        {{ $t.empty }}
        <hr style="margin-top: 2em" />
      </div>
      <span
        v-if="!receivedData.length && searchString?.length && !error"
        class="loader"
      ></span>
      <hr
        v-if="!filteredData?.length && !isSearchEmpty"
        style="margin-top: 2em; width: 80%"
      />
      <div v-if="filteredData?.length" class="search-results">
        <template
          class=""
          v-for="item in filteredData"
          :key="item.productNumber"
        >
          <article>
            <a class="search-card" :href="generateLink(item)">
              <div class="search-card__body">
                <div class="search-product__name" v-html="item?.productName"></div>
                <div class="search-product__image__container">
                  <img
                    :src="item?.giftcardImage"
                    :alt="item?.giftcardImage"
                    class="search-product__image"
                  />
                </div>
              </div>
            </a>
          </article>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useFetch } from '../composables/useFetch';
import { resolveUrl } from '../utils/resolveUrl';

// setting props
const props = defineProps({
  isActive: {
    type: String,
    default: 'false',
  },
  translations: {
    type: String,
  },
  context: {
    type: String,
    default: '/mall',
  },
});

// prepare translations
const $t = JSON.parse(props.translations);

// return module height depending on state
const getModuleHeight = computed(() => {
  if (!active.value) return 0;
  return isSearchEmpty.value || !filteredData.value?.length ? '200px' : '500px';
});

// show error
const error = ref(null);
const handleError = (msg) => {
  error.value = msg;
  setTimeout(() => {
    error.value = null;
  }, 6000);
};

// fetch availabile vouchers
const receivedData = ref([]);
const getData = async () => {
  const received = await useFetch('GET', props.context);
  received.error
    ? handleError(received.errorMessage)
    : (receivedData.value = received);
};

// links for product details or product list page
const generateLink = (product) => {
  return product.listArticle
    ? resolveUrl(
        props.context,
        `cat/view.do?liArt=${product.productNumber}&lht=list_article#0`
      )
    : resolveUrl(
        props.context,
        `product.do?productNumber=${product.productNumber}`
      );
};

// searching/filtering data
const search = ref(null);
const searchString = ref(null);
const filteredData = computed(() => {
  console.log(receivedData.value)
  return (
    searchString.value &&
    receivedData.value.length &&
    receivedData.value.filter(
      (r) =>
        r.productName
          .toLowerCase()
          .includes(searchString.value.toLowerCase()) ||
          r.searchwords.some(s => {
            return s.toLowerCase().includes(searchString.value)
          })
        //  r.searchwords.includes(searchString.value.toLowerCase())
    )
  );
});
const isSearchEmpty = computed(() => {
  return searchString.value?.length > 1 && !filteredData.value?.length;
});

// setting component state
const active = ref(false);
watch(
  () => props.isActive,
  (newValue) => {
    active.value = newValue === 'true';
    if (active.value) {
      !receivedData.value.length && getData();
      search.value.focus();
    }
  }
);

// creating & emitting events
const emit = defineEmits(['close-search']);
const searchWrapper = ref(null);
const hideSearch = () => {
  active.value = false;
  searchWrapper.value.dispatchEvent(
    new CustomEvent('close-search', {
      bubbles: true,
      composed: true,
    })
  );
};
</script>
<style lang="scss">
* {
  font-family: 'Open Sans', sans-serif;
}
#search-wrapper {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -9;
  display: flex;
  height: 0;
  &.infront {
    z-index: 9999 !important;
  }
  .search__open::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    content: '';
    transition: all 5s ease;
    opacity: 1;
    &.hide {
      display: none;
      opacity: 0;
    }
  }
  .search {
    min-width: 150px;
    background-color: white;
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0, 5em;
    box-shadow: 5px 5px 12px rgb(0 0 0 / 15%);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    padding-top: 0;
    z-index: 999;
    height: 500px;
    width: 100%;
    top: 130px;
    opacity: 1;
    overflow: hidden;
    overflow-y: auto;
    transition: 0.5s all ease;
    &.hide {
      padding: 0.5em;
      opacity: 0;
      height: 3.5em;
      z-index: -1;
    }
    .search-results {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-bottom: 2rem;
      column-gap: 1em;
      row-gap: 1em;
      width: 90%;
    }
    .search-results > article {
      flex-basis: calc(25% - 1.5rem);
    }
    @media screen and (max-width: 1024px) {
      .search-results > article {
        flex-basis: calc(33% - 1.5rem);
      }
    }
    @media screen and (max-width: 768px) {
      .search-results > article {
        flex-basis: calc(50% - 1.5rem);
      }
    }
    @media screen and (max-width: 480px) {
      .search-results > article {
        flex-basis: calc(100% - 1.5rem);
      }
    }
  }
}

.search-results_empty {
  width: 80%;
  text-align: center;
}

.search-card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border: none;
  text-decoration: none;
  max-width: 350px;
  background-color: rgb(240, 240, 240);
  width: 100%;
  transition: all 0.15s ease-in;
  width: calc(100% - 20px);
}
.search-card .search-card__body {
  position: relative;
  padding: 1rem;
  transition: all 0.5s ease;
}
.search-card:hover {
  transform: scale(1.02);
  background: #f0f0f0;
  box-shadow: 0.1em 0.1em 0.6em 0 rgb(51 51 51 / 20%);
  border-radius: 0.2em;
}
.search-card__body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
}
.search-product__image__container {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  padding-top: 62.5%;
}
.search-product__image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: 14px;
  vertical-align: middle;
  border-style: none;
}
.search-product__name {
  height: 2.5rem;
  color: rgb(51, 51, 51);
  line-height: 1.25;
  overflow: hidden;
  font-weight: 600;
}

.search-box {
  display: flex;
  width: 300px;
  column-gap: 1em;
  margin: 1em 0;
  position: sticky;
  top: 0px;
  z-index: 555555;
  width: 100%;
  justify-content: center;
  background: white;
  padding: 1em;
}
.search-close__container {
  display: flex;
  border-radius: 50%;
  padding: 0.5em;
  margin: 0.5em;
  width: 20px;
  height: 20px;
  transition: all 0.5s ease;
  cursor: pointer;
}
.search-close__container:hover {
  background-color: #2c3e50;
  color: #fff;
}
.search-close__container:hover .search-close__button {
  fill: #fff;
  stroke: #fff;
}
.search-close__button {
  stroke: rgb(44, 62, 80);
}
.search-close__button:hover {
  fill: #fff;
}
.search-input {
  display: block;
  min-width: 225px;
  padding: 0.4rem 1.4rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #333;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #3b3b3b;
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
