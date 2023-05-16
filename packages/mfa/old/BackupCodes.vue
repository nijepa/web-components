<template>
  <button @click="generateNewPDF" class="codes-btn btn">PDF Download</button>
  <div id="pdfTable" class="codes-main" ref="pdfGenerateTable">
    <div style="display: block; margin: 0 auto; width: fit-content">
      <img width="200" :src="logo" class="codes-img" ref="image" />
    </div>
    <hr
      class="codes-hr"
      :style="{ 'background-color': `${primaryColor}`, height: '2em' }"
    />
    <h1
      style="
        text-align: center;
        border-bottom: 1px solid rgb(93, 93, 93);
        align-self: center;
        padding: 1.5em 0 0.5em 0;
        line-height: 1;
        width: fit-content;
        margin: 0 auto;
      "
      class="codes-title"
    >
      BackUp-Codes für Ihre 2-Faktor-Authentifizierung
    </h1>
    <div
      style="display: block; margin: 0 auto; width: fit-content"
      class="code-content"
    >
      <div
        style="display: flex; padding: 1.5em; align-items: center"
        v-for="(code, i) in codes"
        :key="i"
        class="code-block"
      >
        <div
          :style="{
            'background-color': `${primaryColor}`,
            'border-radius': ' 50%',
            height: '2em',
            width: '2em',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'margin-right': '1em',
            'font-weight': '700',
            color: '#fff',
            'font-size': '1.7em',
          }"
        >
          {{ i + 1 }}
        </div>
        <span style="font-size: 1.5em">{{ code }}</span>
      </div>
    </div>
    <footer
      style="
        background-color: rgb(50, 50, 50);
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        color: #fff;
      "
    >
      <div class="info" style="padding: 2em">
        <p style="margin: 0">cadooz</p>
        <p style="margin: 0">GmbHOsterbekstraße 90b</p>
        <p style="margin: 0">22083 Hamburg – Germany</p>
      </div>
      <div class="info" style="padding: 2em">
        <img width="150" :src="footerLogo" :alt="footerLogo" />
      </div>
    </footer>
  </div>
</template>
<script setup>
import jsPDF from 'jspdf';
import { resolveUrl } from '../utils/resolveUrl';
import { ref, onMounted } from 'vue';
const props = defineProps({
  logoUrl: {
    type: String,
    default: '../../assets/UllaPopken_logo_new.svg',
  },
  primaryColor: {
    type: String,
    default: '',
  },
  codes: {
    type: Array,
    default: () => [255895, 368965, 257459, 988963, 553569],
  },
});
const baseurl = resolveUrl('a');
const footerLogo = ref(
  baseurl.replace('cips/a', 'images/cips/cadooz_IPS_Logo_1c.png')
);
let logo = props.logoUrl.replace('url("', '').replace('")', '');
let ratio = 1
onMounted(() => {
  let image = new Image();
  image.onload = function () {
    console.log(`the image dimensions are ${image.width}x${image.height}`);
    ratio = +((image.width / image.height).toFixed(2)) 
    ratio = +((50 / ratio).toFixed(0))
  };
  image.src = logo;
});
function getDataURL(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      let canvas = document.createElement('CANVAS');
      let ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL();
      resolve(dataURL);
    };
    img.onerror = function () {
      resolve(url);
    };
    img.src = url;
    if (img.complete || img.complete === undefined) {
      img.src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      img.src = url;
    }
  });
}
let pdfImg = null;
let footerImg = null;
getDataURL(logo).then((base64) => {
  pdfImg = base64;
});
getDataURL(footerLogo.value).then((base64) => {
  footerImg = base64;
});
const generateNewPDF = () => {
  let doc = new jsPDF('A4');
  doc.addImage(pdfImg, 'JPEG', 80, 5, 50, ratio);
  doc.setFillColor(props.primaryColor);
  doc.rect(5, 30, 200, 7, 'F');
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('BackUp-Codes für Ihre 2-Faktor-Authentifizierung', 10, 50);
  doc.line(10, 55, 195, 55);
  let pos = 75;
  let nr = 1;
  props.codes.forEach((code) => {
    let str = nr.toString();
    doc.setFillColor(props.primaryColor);
    doc.circle(80, pos - 2, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(str, 78, pos);
    doc.setFont('helvetica', 'normla');
    doc.setFontSize(20);
    doc.setTextColor(0);
    doc.text(code, 95, pos);
    pos = pos + 25;
    nr++;
  });
  doc.setFont('helvetica', 'bold');
  doc.setDrawColor(0);
  doc.setFillColor(50, 50, 50);
  doc.rect(5, 260, 200, 30, 'F');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('cadooz', 15, 270);
  doc.setFont('helvetica', 'normal');
  doc.text('GmbHOsterbekstraße 90b', 15, 275);
  doc.text('22083 Hamburg – Germany', 15, 280);
  doc.addImage(footerImg, 'JPEG', 145, 267, 55, 15);
  doc.save('new.pdf');
};
</script>

<style lang="scss"></style>
