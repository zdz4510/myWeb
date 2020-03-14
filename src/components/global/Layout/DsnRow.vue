<template>
  <el-row
    :gutter="gutter"
    :type="type"
    :justify="justify"
    :align="align"
    :tag="tag"
  >
  </el-row>
</template>

<script>
export default {
  name: "DsnCol",
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      required: false
    },
    //start/end/center/space-around/space-between	
    justify: {
      type: String,
      default: 'start'
    },
    //top/middle/bottom
    align: {
      type: String,
      required: 'top'
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
