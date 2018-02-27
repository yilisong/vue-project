<template>
<div class="footer-copyright">
  <div class="new-footer">
    <div class="first-block">
      <!-- <img src="../../assets/images/new_footer_logo.svg" alt="">&emsp;了解<a href="about" class="about">YUNDUN</a> -->
      <ul>
        <li>
          <a href="about#/advantage" target="_blank">优势</a>
        </li>
        <li><a href="about#/cooperation" target="_blank">合作</a></li>
        <li><a href="about#/events" target="_blank">大事记</a></li>
        <li><a href="about#/legalNotice" target="_blank">法律声明</a></li>
      </ul>
    </div>
    <p>Copyright DAOSHU,All Rights Reserved&emsp;</p>
  </div>
</div>
</template>
<script>
import 'normalize.css'
import '../../assets/styles/style-reset.css'
export default {
  name: 'copyright-foter'
}
</script>
<style scoped>
.footer-copyright {
  background: #272727;
  width: 100%;
  color: #969696;
  padding-top: 35px;
  padding-bottom: 80px;
}

.footer-copyright .footer-info {
  width: 1200px;
  margin: 0 auto;
}

.footer-info {
  background: #272A2D;
  width: 100%;
  color: #969696;
}

.footer-logo {
  width: 200px;
  display: block;
  margin: 0px auto 18px;
}

.com-info,
.web-info {
  text-align: center;
  padding: 14px 0;
}

.com-info li,
.web-info li {
  display: inline-block;
}

.com-info li+li::before {
  content: "|";
}

.web-info li {
  padding: 0 13px;
}

.new-footer {
  width: 1200px;
  margin: 0 auto;
  p+p {
    margin-top: 12px;
  }
}

.new-footer .first-block {
  img,
  a,
  ul,
  ul li {
    display: inline-block;
    font-size: 12px;
    padding: 0 5px;
  }
  ul li:hover a {
    color: #fff;
    transition: all .5s;
  }
  ul li a {
    color: #969696;
  }
  ul li+li {
    border-left: 1px solid #313131;
  }
  .about {
    color: #2d90e6;
  }
  img {
    width: 95px;
    vertical-align: middle;
  }
}
</style>
