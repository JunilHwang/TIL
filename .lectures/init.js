import Reveal from "../node_modules/reveal.js/dist/reveal.esm.js";
import RevealMarkdown from '../node_modules/reveal.js/plugin/markdown/markdown.esm.js';
import RevealHighlight from '../node_modules/reveal.js/plugin/highlight/highlight.esm.js';

const reveal = new Reveal({
  plugins: [RevealMarkdown, RevealHighlight],
  width: 1800,
  height: 1100,
  controls: true,
  progress: true,
  history: true,
  center: true,
  slideNumber: true,
})
reveal.initialize({
  markdown:{

  }
});