const { paginateResults } = require('./utils');

const data = Array(86)
  .fill(0)
  .map((_, i) => {
    return {
      cursor: String(i),
      giveaway: i,
    };
  });
const response = paginateResults({ after: '79', pageSize: 10, results: data });

console.log(response);
