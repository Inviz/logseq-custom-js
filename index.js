function main() {
  // add element that will load `injector.js` that will load `%graph/logseq/custom.js`
  // this is done to have full access to parent frame
  logseq.App.registerUIItem("toolbar", {
    key: 'custom-element',
    template: `
        <img src="Z" onerror="z = document.createElement('script'); z.src = '${logseq.baseInfo.entry.replace('index.html', 'injector.js')}'; document.body.appendChild(z);" style="opacity: 0; width: 0px; height: 0px; display: block"></script>
    `,
  });

}

logseq.ready({}, main).catch(console.error)