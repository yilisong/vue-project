<template lang="html">
<div class="product-container case-padding-container">
  <h2>客户案例</h2>
  <div class="cases-img-box">
    <img src="../assets/images/index-cases/cases_big.png" alt="">
  </div>
  <div class="cases-font">
    <ul>
      <li class="cases-container">金融行业&emsp;&emsp;
        <div class="cases-box">
          <ul>
            <li v-for="item in cases.finance">{{item}}</li>
          </ul>
        </div>
      </li>
      <li class="cases-container">游戏行业&emsp;&emsp;
        <div class="cases-box">
          <ul>
            <li v-for="item in cases.game">{{item}}</li>
          </ul>
        </div>
      </li>
      <li class="cases-container">政府行业&emsp;&emsp;
        <div class="cases-box">
          <ul>
            <li v-for="item in cases.government">{{item}}</li>
          </ul>
        </div>
      </li>
      <li class="cases-container">教育行业&emsp;&emsp;
        <div class="cases-box">
          <ul>
            <li v-for="item in cases.education">{{item}}</li>
          </ul>
        </div>
      </li>
      <li class="cases-container">医疗行业&emsp;&emsp;
        <div class="cases-box">
          <ul>
            <li v-for="item in cases.medical">{{item}}</li>
          </ul>
        </div>
      </li>
      <li class="cases-container">大型企业&emsp;&emsp;
        <div class="cases-box">
          <ul>
            <li v-for="item in cases.big">{{item}}</li>
          </ul>
        </div>
      </li>
      <li class="cases-container">中小企业&emsp;&emsp;
        <div class="cases-box">
          <ul>
            <li v-for="item in cases.small">{{item}}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      cases: {
        finance: ['宝付', '国付宝', '你我贷', '金桥梁', '易贷网', '金中资', '我爱卡', '网贷之家', 'BTCC'],
        game: ['佰游网络', '岳游网络', '九游', '掌玩互娱', '豆子世界', '棋牌迷'],
        government: ['长沙市人民政府', '浙江省文化厅', '四川省文化厅', '徐汇区人民政府', '平安杭州', '长沙市财政局', '闵行区人民政府'],
        education: ['学信网', '浙江大学', '海南大学', '中国计量大学', '大连海事大学', '浙江理工大学', '浙江农林大学', '英孚教育'],
        medical: ['上海卫生和计划生育委员会', '重庆市九龙坡区人民医院', '中国医疗人才网', '金华市中心医院'],
        big: ['极草', '葵花药业', '首都在线', '长江经济联合发展集团股份有限公司'],
        small: ['魔窗', 'A5创业网', '传众', '有孚网络', '地面通信', 'ADWAYS', '乐信', '红网', '融易网', '凯立广告（上海）']
      }
    }
  }
}
</script>

<style lang="css" scoped>
@import "../index-common.css";
.cases-font {
  text-align: left;
  padding: 34px 0 100px 0;
  border-top: 1px solid #cdcdcd;
}

.cases-img-box {
  padding: 36px 0 40px 0;
  img {
    width: 100%;
  }
}

.cases-container {
  font-weight: bold;
}

.cases-container+.cases-container {
  margin-top: 26px;
}

.cases-box {
  display: inline-block;
  box-sizing: border-box;
  li {
    display: inline-block;
    font-weight: 100;
  }
  li+li {
    margin-left: 36px;
  }
}

.case-padding-container {
  padding-bottom: 56px;
  right: 230px;
  bottom: 10px;
}
</style>
