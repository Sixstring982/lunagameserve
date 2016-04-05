export default class Header {
  static getHeader(activeTag) {
    const getActiveString = (tag) => (activeTag === tag ? ' class="active"' : '');

    return `<nav>
        <div>
        <a href="/index.html" class="brand-logo">Luna</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li${getActiveString('Home')}><a href="/index.html">Home</a></li>
        <li${getActiveString('Articles')}><a href="/articles.html">Articles</a></li>
        <li${getActiveString('Games')}><a href="/games.html">Games</a></li>
        <li${getActiveString('Interactive')}><a href="/interactive.html">Interactive</a></li>
        <li><a href="/resume.pdf">Resume</a></li>
        <li><a href="http://github.com/Sixstring982">Github</a></li>
        </ul>
        </div>
        </nav>`;
  }
}
