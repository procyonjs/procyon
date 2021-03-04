// This script generates a code coverage badge. Not part of procyon's code. Breaks outside of development
const axios = require('axios');
const fs = require('fs');

const coverage = JSON.parse(fs.readFileSync('./coverage/coverage-summary.json'));
const percent = coverage.total.lines.pct;
const color =
  percent > 20
    ? (
      percent > 40
        ? (
          percent > 60
            ? (
              percent > 80
                ? (
                  percent > 90
                  ? 'brightgreen'
                  : 'green'
                )
                : 'yellowgreen'
            )
            : 'yellow'
        )
        : 'orange'
    )
    : 'red';

const badge = axios.get(`https://img.shields.io/static/v1?label=coverage&message=${percent}%25&color=${color}&style=for-the-badge`);

badge.then((res) => {
  fs.writeFileSync('./coverage.svg', res.data);
});
