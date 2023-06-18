<template>
  <div id="app">
   <div class="card">
    <div class="left">
      <div class="title">
      <div class="card-left-title">
        <img src="https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ" alt="">
        <div class="title-text">弄堂里</div>
      </div>
      <div class="card-right-title">500</div>
    </div>
    <div class="left-img">
      <img src="https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ" alt="">
    </div>
    </div>
    <div class="right"></div>
   </div>
    
  </div>
</template>

<script>
export default {
  name: "Other1",

  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
html {
  font-size: 60px;
}

body {
  background: #E3E3E3;
}

.card {
  
  width: 700px;
  height: 200px;
  background-image: url(https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*HD9_S4RyppUAAAAAAAAAAAAAARQnAQ);
  background-size: 100% auto;
  background-position: center;
  margin-bottom: 0.4rem;
  border-radius: 20px;
  .left{
    float: left;
    width: 500px;
    height: 200px;
    background: rgb(215, 204, 204);

  }
  .right{
    float: right;
    width: 180px;
    height: 200px;
    background: rgb(131, 107, 107);

  }
.title{
  height: 36px;
  .card-left-title {
   
      img {
        float: left;
        height: 36px;
        width:36px;
        margin: 5px;
      }
      .title-text{
        float: left;
        font-size: 24px;
        line-height: 42px;
      }
      
    }
    .card-right-title{
      float: right;
      line-height: 42px;
      margin-left: 5px;
    }
}
.left-img{
  width: 133px;
  height: 133px;
}
  }

</style>