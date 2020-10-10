<template>
  <fragment>
    <div v-if="fullProductsList && fullProductsList.length" class="search__list">
      <ProductPreview v-for="item in fullProductsList" :key="item.id" :product="item" />
    </div>
    <Loader v-else-if="isLoading" />
    <div v-else class="search__info">Ничего не найдено</div>
    <div class="search__pagination">
      <paginate
        v-model="paginationPage"
        v-if="fullProductsList.length"
        page-class="pagination__page"
        active-class="pagination__page--active"
        disabled-class="pagination__page--disabled"
        container-class="pagination"
        prev-class="pagination__prev"
        next-class="pagination__next"
        :page-count="pageCount"
        :click-handler="handlePagination"
        prev-text="<<"
        next-text=">>"
      />
    </div>
  </fragment>
</template>

<script>
import { mapGetters } from "vuex";
import ProductPreview from "../ProductPreview";
import Loader from "../Loader";
import { GET_FULL_PRODUCTS_LIST } from "../../store/actions.type";
import { SET_PAGINATION_PAGE } from "../../store/mutations.type";

export default {
  components: {
    ProductPreview,
    Loader
  },
  computed: {
    ...mapGetters(["fullProductsList", "pageCount", "isLoading", "page"]),
    paginationPage: {
      get() {
        return this.page;
      },
      set(value) {
        this.$store.commit(SET_PAGINATION_PAGE, value);
      }
    }
  },
  watch: {
    fullProductsList() {
      window.scrollTo(0, 0);
    },
  },
  methods: {
    handlePagination() {
      this.$store.dispatch(GET_FULL_PRODUCTS_LIST);
    }
  }
};
</script>

<style lang="scss">
@import "../../constants/_default.scss";

.pagination {
  display: flex;
  list-style-type: none;
  user-select: none;

  &__next,
  &__prev {
    display: flex;

    & > a {
      display: flex;
      align-items: center;
      padding: 0 5px;
    }
  }

  &__page {
    padding: 4px;
    cursor: pointer;
    width: 20px;
    text-align: center;

    & > a {
      color: $project-color;
      transition: 0.3s;

      &:hover {
        color: $project-red;
      }
    }

    &--active {
      & > a {
        color: $project-red;
      }
    }

    &--disabled {
      & > a {
        color: grey;
        cursor: not-allowed;
      }
    }
  }
}

.search {
  &__pagination {
    display: flex;
    justify-content: space-around;
  }

  &__info {
    font-size: 22px;
    padding: 25px 10px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}

@media (max-width: 720px) {
  .search {
    flex-flow: column;

    &__list {
      padding: 50px 0 0;
    }
  }
}
</style>