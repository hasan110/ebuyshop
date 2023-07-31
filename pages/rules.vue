<template>
  <div class="site-wrapper">
    <site-header>
      <template #action>
        <i class="mdi mdi-gavel"></i>
        قوانین
      </template>
    </site-header>
    <site-bottom-navigation></site-bottom-navigation>

    <div class="body-wrapper round shadow">
      <div class="body-inner">

        <div class="rules-banner">
          <i class="mdi mdi-gavel"></i>
        </div>
        <div class="p-3">
          <pre>{{$store.state.app.SETTING.store_rules_text}}</pre>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Rules',
  head() {
    return {
      title: this.getPageTitle('قوانین خرید')
    }
  },
}
</script>
