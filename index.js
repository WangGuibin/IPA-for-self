const fs = require("fs");

// 自定义比较函数
function compareDates(a, b) {
  var aDate = new Date(a.versionDate); // 转换成日期格式
  var bDate = new Date(b.versionDate);
  if (aDate < bDate) return -1; // 返回小于0表示a应该排在前面
  else if (aDate > bDate) return 1; // 返回大于0表示a应该排在后面
  else return 0; // 相等则不变位置
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
