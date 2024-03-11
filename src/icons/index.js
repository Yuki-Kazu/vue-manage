import SvgIcon from '@/component/SvgIcon';

const svgRequired = require.context('./svg', false, /\.svg$/);
svgRequired.keys().forEach((item) => svgRequired(item).default);

export default (app) => {
  app.component('svg-icon', SvgIcon);
};
