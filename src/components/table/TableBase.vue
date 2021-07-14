<template>
  <div class="container table-container">
    <div class="row" v-if="name">
      <div class="col">
        <h3 class="text-capitalize">{{name}}</h3>
      </div>
    </div>
    <div class="row">
      <div class="row toolbar mb-2">
        <div class="col"></div>
        <div class="col-2">
          <select v-model="limit" class="form-select" aria-label="size 3 select example">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      <div class="col">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" v-for="field in fields" :key="field.key">
                {{ field.label || field.key }}
                <a v-if="field.sortable" class="p-1" style="cursor:pointer" @click.prevent="sortItemsByProperty(field.key)">
                  <i class="fas fa-sort"></i>
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td v-for="itemField in item" :key="itemField">{{ itemField }}</td>
            </tr>
          </tbody>
        </table>
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
export default {
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
      sortDirection: 'dsc',
      page: this.$props.currentPage || 1,
      limit: this.$props.perPage || 10
    }
  },
  methods: {
    changePage(n) {
      if (this.page >= 1 && n <= this.totalPages) {
        this.page = n
        this.updateQueryParams()
        this.$emit('page-changed', n)
      }
    },
    sortItemsByProperty(property) {
      // eslint-disable-next-line no-debugger
      // debugger
      const items = [...this.items]
      const sortedItems = _.sortBy(items, property)
      // window.console.log('items (clone)', items)
      // window.console.log('sortedItems', sortedItems)
      // window.console.log(sortedItems, property)
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
      if (val) {
        this.page = 1
        this.updateQueryParams()
        this.$emit('limit-changed', val)
      }
    },
    '$route.query' (queryObj) {
      window.console.log('$route.query obj changed', queryObj, this.perPage)
      if (queryObj.perPage) {
        this.changePage(queryObj.perPage)
        this.limit = queryObj.limit
      }
      if (queryObj.page) {
        this.page = queryObj.page
      }
    }
  }
}
</script>

<style>

</style>