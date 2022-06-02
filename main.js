const shelljs = require("shelljs");
const dayjs = require("dayjs");
const path = require("path");

const showLog = (dayCount = 7) => {
  const date = dayjs()
    .startOf("D")
    .subtract(dayCount - 1, "day")
    .format("YYYY-MM-DD HH:mm:ss");

  const ret = shelljs.exec(
    'git log --after="' +
      date +
      '"  --date=format:"%Y-%m-%d" --pretty=format:" %C(yellow)%d%Cblue %s %Cgreen(%cd) %C(bold blue)%Creset"'
  );

  if (ret.code === 0) {
    const data = ret.stdout;

    const lines = data
      .split("\n")
      .reverse()
      .filter(Boolean)
      .map((i) => ({
        time: i.slice(-13).trim(),
        text: i
          .slice(0, -13)
          .trim()
          .replace(/^(\(.*?\))\s*/, ""),
      }));

    if (lines.length === 0) {
      console.log(`最近${dayCount}天没有记录`);
      return;
    }

    const group = {};
    lines.forEach(({ time, text }) =>
      (group[time] || (group[time] = [])).push(text)
    );

    let str = "\n\n";

    for (let key in group) {
      str += key + "\n";
      str += group[key].join("\n") + "\n\n";
    }

    console.log(str);
  }
};

module.exports = {
  showLog,
};
