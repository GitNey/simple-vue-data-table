<template>
  <div class="toolbar mb-2">
    <select v-model="limit" class="form-select" aria-label="size 3 select example">
      <option
        v-for="opt in selectOptions"
        :key="opt.value"
        :value="opt.value"
        :data-selected="opt.value == limit"
        :class="`per-page-${opt.value}`">
        <span v-if="opt.value == limit">---</span> {{ opt.text }} <span v-if="opt.value == limit">---</span>  
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    perPage: Number,
  },
  data () {
    return {
      limit: this.$props.perPage || 10,
      selectOptions: [
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 15, text: '15' }
      ]
    }
  },
  watch: {
    limit (val) {
      if (val) {
        this.$emit('toolbar-limit-changed', val)
      }
    }
  }
}
</script>

<style>

</style>