
// Example `<query-portal />` element 
// Add your own!

// Embed them into the app via 
// @@html: <query-portal property="value" />@@


var logseq = document.querySelector('iframe[src*="custom-js"]').contentWindow.logseq;


(() => {
  class QueryPortal extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
      // read attribute:
      // this.getAttribute('category')
      // e.g. <query-portal category="something" />

      // read text content
      // this.textContent

      const query = `[:find (pull ?b [*])
                        :where
                        [?b :block/marker ?marker]
                        [(contains? #{"NOW" "LATER" "TODO" "DOING"} ?marker)]
    ]`;

      ;(async () => {
        try {
          // run query and get blocks
          const blocks = await this.fetch(query);
          // render them
          this.render(blocks);
        } catch(e) {
          this.innerHTML = e;
        }
      })()
    }
    
    async fetch(query) {
        let ret = await logseq.DB.datascriptQuery(query);
      return ret?.flat() // not groupped by page
    }
  
    render(blocks) {
      
      const items = blocks.map(function(block){
        //return `<li>${JSON.stringify(block, 2, 2)}</li>`
        return `<li>
          ${block.content}
        </li>`
      });
      
      const template =  `<ul>
          ${items.join('')}
      </ul>`
      this.innerHTML = template
    }
  
  }
  window.customElements.define('query-portal', QueryPortal)
})();