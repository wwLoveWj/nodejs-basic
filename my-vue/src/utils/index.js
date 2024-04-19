/*
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-19 15:16:44
 * @LastEditTime: 2024-04-19 15:16:53
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\my-vue\src\utils\index.js
 */
import html2canvas from 'html2canvas';

export function ExportImg(element, filename, ext) {
  html2canvas(element, {
    useCORS: true,
  }).then((canvas) => {
    if (navigator.msSaveBlob) {
      const blob = canvas.msToBlob(); // IE10+
      return navigator.msSaveBlob(blob, name);
    } else {
      const imageurl = canvas.toDataURL('image/png');
      const aLink = document.createElement('a'); // 创建a标签
      aLink.style.display = 'none';
      aLink.href = imageurl;
      aLink.download = `${filename}.${ext}`; // 下载文件名
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); // 用完后移除元素
    }
  });
}

/**
 * @desc
 * @param { File } 文件file
 * @return { Boolean } 是图片 true 不是 false
 */
export function isImage(file) {
  // 检查文件MIME类型
  return file.type.startsWith('image/');
}
