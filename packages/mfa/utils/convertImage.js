export function getDataURL(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      let canvas = document.createElement("CANVAS");
      let ctx = canvas.getContext("2d");
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
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = url;
    }
  });
}
