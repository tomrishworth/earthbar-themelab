<template>
  <div>
    {{links}}
  </div>
</template>

<script>
export default {
  name: 'mainMenu',
  props: {
    link: {
      type: Object,
      required: true,
    },
  }
}
</script>