//En
//Filters format
//
//del(filter [, mode]) - remove node
// mode(optional):
//  0 (default) - remove in process loading html-page, timeout 100ms. Fast, but nodes maybe blinking, while html-page loading.
//  1 - remove after complete loading html-page. Fastest, but all nodes visible before remove.
//  2 - remove on document changed. Slow, but not blinking - all node not visible before remove.
//replace(filter, newvalue [, mode]) - edit element in realtime, before html-page comlete loading
//aedit(filter, mode[, newvalue]) - edit element after html-page comlete loading
//
//