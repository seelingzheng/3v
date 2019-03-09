<template>
  <div id="app">
    <Layout :style="{minHeight: '100vh'}">
      <Sider hide-trigger collapsible :collapsed-width="78">
        <Menu theme="dark" width="auto" accordion @on-select="onSelect($event)">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span>ThreeJS API 案例</span>
            </template>
            <MenuItem name="hello">Hello</MenuItem>
            <MenuItem name="graphic">图形</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <router-view/>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
 <script>
export default {
  methods: {
    onSelect(name) {
      this.$router.push({ name });
    }
  }
};
</script>
 

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
