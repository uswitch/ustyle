const types = require('node-sass').types;
const path = require('path');
const fs = require('fs');

const base64encode = string => {
  const stringBuffer = Buffer.from(string.getValue());
  return types.String(stringBuffer.toString('base64'));
};

const inlineSVG = source => {
  const sourcePath = path.join(__dirname, 'vendor', 'assets', 'images', source.getValue());
  let svg = '';

  try {
    svg = fs.readFileSync(sourcePath).toString();
  } catch (err) {
    console.error('Error inlining SVG file', err);
  }

  const dataUrl = `url('data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}')`;
  return types.String(dataUrl);
};

const SassHelpers = {
  'base64encode($string)': base64encode,
  'inline-svg($source)': inlineSVG
};

module.exports = {
  SassHelpers
};
