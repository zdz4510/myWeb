<template>
  <el-col
    :span="span"
    :offset="offset"
    :push="push"
    :pull="pull"
    :xs="xs"
    :sm="sm"
    :md="md"
    :lg="lg"
    :xl="xl"
    :tag="tag"
  >
  </el-col>
</template>

<script>
export default {
  name: "DsnCol",
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      required: true
    },
    push: {
      type: Number,
      required: true
    },
    pull: {
      type: Number,
      required: true
    },
    xs: {
      type: Number || Object,
      required: false
    },
    sm: {
      type: Number || Object,
      required: false
    },
    md: {
      type: Number || Object,
      required: false
    },
    lg: {
      type: Number || Object,
      required: false
    },
    xl: {
      type: Number || Object,
      required: false
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
