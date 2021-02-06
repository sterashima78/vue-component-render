# @sterashima78/vue-component-render

## example

```
<meta charset="utf-8">
<title>vue-component-render demo</title>
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
<script src="./vue-component-render.umd.js"></script>
<div id="app"></div>
<script>
  console.log(window["vue-component-render"])
  const make = window["vue-component-render"].makeNodeTree
  const converter = window["vue-component-render"].nodeDataConverterFactory()
  const rendererFactory = window["vue-component-render"].nodeRenderFactory(converter)
  const data = make(
    {tag: "v-app"}, 
    [make(
      {tag: "v-main"},
      [make(
        {tag: "v-container"},
        ["Hello world"]
      )]
    )]
  )
  console.log(data)
  const vue = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    render(h){
      const renderer = rendererFactory(h)
      return renderer(data)
    }
  })
</script>
```