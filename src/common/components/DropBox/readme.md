# drop-box

> Tip Component for showing helpful text into the dom flow

## Usage

```html
<drop-box
  :list="scope.row.ca_domain">
</drop-box>

<script>
import DropBox from 'common/components/DropBox/drop-box'

export default {
  components: {
    DropBox
  }
}
</script>
```

## Added
1,Transfering data by props,and data structure required is Array,which is as followed.
```javascript
default() {
  return ['www.yundun.com','yundun.com','www.yundunfjsdlfjsfj.com']
}
```

2,The component is designed for ssl-certificate temporarily,and can be expanded according to the business.The data structure imagined is as followed.
```javascript
default() {
  return [
    { id: 0,name: 'www.yundun.com' }
  ]
}
```
