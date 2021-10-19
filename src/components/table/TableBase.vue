<template>
  <div class="container table-container">
    <div class="row">
      <div id="table-toolbar" class="col-12 d-flex">
        <table-header v-if="name" :name="name" />
        <table-toolbar :limit="perPage" @toolbar-limit-changed="(newLimit) => limit = newLimit" />
      </div>
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" v-for="field in fields" :key="field.key">
                  <div class="field-column d-flex justify-content-between align-items-center">
                    <span class="field-label">{{ field.label || field.key }}</span>
                    <a v-if="field.sortable" style="margin-left: 5px; cursor:pointer" @click.prevent="sortItemsByProperty(field.key)">
                      <i class="fas fa-sort"></i>
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr v-for="(item, idx) in items" :key="item.id" class="table-item-row">
                <td v-for="itemField in fields" :key="itemField">
                  <slot :name="`slot-${idx}-${itemField.key}`">
                    {{item[itemField.key]}}
                  </slot>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="table-loading">
              <div class="spinner-border" role="status" style="margin-right: 5px;">
                <span class="sr-only">Loading...</span>
              </div>
              Loading...
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li :class="page - 1 > 0 ? 'page-item' : 'page-item disabled'">
              <a class="page-link" href="#" @click.prevent="changePage(page - 1)">Previous</a>
            </li>
            <li class="page-item" v-for="num in totalPages" :key="num">
              <a :class="page == num ? 'page-link bg-primary text-white' : 'page-link'" href="#" @click.prevent="changePage(num)">{{ num }}</a>
            </li>
            <li :class="page + 1 <= totalPages ? 'page-item' : 'page-item disabled'">
              <a class="page-link" href="#" @click.prevent="changePage(page + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import TableHeader from './TableHeader.vue'
import TableToolbar from './TableToolbar.vue'
export default {
  components: { TableHeader, TableToolbar },
  props: {
    name: String,
    items: Array,
    fields: Array,
    totalPages: Number,
    currentPage: Number,
    perPage: Number
  },
  data () {
    return {
      loading: false,
      sortDirection: 'dsc',
      page: this.$props.currentPage || 1,
      limit: this.$props.perPage || 10,
      selectOptions: [
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 15, text: '15' }
      ]
    }
  },
  methods: {
    changePage(n) {
      this.loading = true
      if (this.page >= 1 && n <= this.totalPages) {
        this.page = n
        this.$emit('page-changed', n)
      }
      this.resetLoader()
    },
    resetLoader () {
      setTimeout(() => this.loading = false, 1000)
    },
    sortItemsByProperty(property) {
      const items = [...this.items]
      const sortedItems = _.sortBy(items, property)
      if (this.sortDirection === 'asc') {
        this.$emit('sort-items', sortedItems)
        this.sortDirection = 'dsc'
      } else if (this.sortDirection === 'dsc') {
        this.$emit('sort-items', sortedItems.reverse())
        this.sortDirection = 'asc'
      }
    },
    updateQueryParams() {
      const query = {}
      if (this.limit) {
        query['perPage'] = this.limit
      }
      if (this.page != 'undefined' && this.page > 0) {
        query['page'] = this.page
      }
      this.$router.push({
        query: { ...this.$route.query, ...query }
      }).catch(e => {
        if (e.name === 'NavigationDuplicated') return null
      })
    }
  },
  watch: {
    limit (val) {
      this.loading = true
      if (val) {
        this.page = 1
        this.$emit('limit-changed', val)
      }
      this.resetLoader()
      this.updateQueryParams()
    },
    currentPage() {
      this.updateQueryParams()
    }
  }
}
</script>

<style>

/* table {
  position: relative;
  width: 100%;
  min-height: 100px;
} */

.table-loading {
  position: absolute;
  left: calc(50% - 107.28px);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

</style>