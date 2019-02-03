# Debugging

If you run into a bug while using EpubPress on Chrome, follow these steps to collect useful debug information.

## Checking for errors

EpubPress has two components, the popup and the background process.

**Popup Errors**

1. Open EpubPress and right-click on the popup.
1. Select `inspect`. This opens a Chrome Inspector Window.
![popup-inspect](./images/popup-inspect.png)
1. Look at the `Console` tab for errors being raised or logged.  
![console-inspector-tab](./images/console-inspector-tab.png)

**Background Errors**

1. Open [chrome://extensions](chrome://extensions) and enable `Developer Mode`.  
![developer-mode](./images/developer-mode.png)
1. Find `EpubPress` and click on `Background Page`. This opens an inspector for the background process.  
![epub-press-extension](./images/epub-press-extension.png)
1. Look at the `Console` tab for errors being raised or logged.
1. Look at the `Network` tab to check that requests are being made to the server.  
![background-network-requests](./images/background-network-requests.png)
1. If a request is returning a non `2XX` status code, click on it to get more information.  
![background-network-details](./images/background-network-details.png)
1. Run the following snippet in the `Console` to view what has been stored by the extension:
```js
chrome.storage.local.get(console.log)
```
1. Run the following snippet to reset the extension state:
```js
chrome.storage.local.set({ downloadState: false })
```
