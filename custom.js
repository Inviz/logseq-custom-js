// Example `<query-portal />` element 
// Add your own!

// Embed them into the app via 
// @@html: <query-portal property="value" />@@
(() => {
  class QueryPortal extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
      // read attribute:
      // this.getAttribute('property')
      // e.g. <query-portal property="something" />

      // read text content
      // this.textContent
      // <query-portal>Test</query-portal>

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
        let ret = await logseq.api.datascript_query(query);
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