import Header from './header.js';
import Footer from './footer.js';

module.exports = {
  insertHeaderFooter: (activeTag) => {
    document.getElementById('headerInclude').innerHTML = Header.getHeader(activeTag);
    document.getElementById('footerInclude').innerHTML = Footer.getFooter();
  },
};
