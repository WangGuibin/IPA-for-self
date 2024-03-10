const fs = require("fs");

// 自定义比较函数 降序
function compareDates(a, b) {
  var aDate = new Date(a.versionDate);  
  var bDate = new Date(b.versionDate);
  if (aDate < bDate) return 1;  
  else if (aDate > bDate) return -1;  
  else return 0; 
}

try {
  const data = fs.readFileSync("./ipa.json", "utf8");
  const dataObj = JSON.parse(data) || {};
  const apps = dataObj.apps || [];
  apps.sort(compareDates);
  dataObj.apps = apps;

  //排完序重新写入
  fs.writeFile("./ipa.json", JSON.stringify(dataObj, null, 2), function (err) {
    if (err) throw err;
    console.log("文件写入成功！");
  });
} catch (err) {
  console.error(err);
}
