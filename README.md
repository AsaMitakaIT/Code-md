## Known Issues

### **`Copy as Markdown (Selection)`** Appears Incorrectly
* **When:** In a **multi-root workspace**, selecting one or more items in the Explorer and then right-clicking in the empty area.
* **Cause:** The Explorer does not expose a context key such as `explorerEmptyArea`, distinguishing with `explorerResourceIsRoot` in a **single-folder workspace** is not applicable.
* **Status:** The related issue [microsoft/vscode #188259](https://github.com/microsoft/vscode/issues/188259), is still open in the backlog.
