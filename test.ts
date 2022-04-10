var observer = new PerformanceObserver(function (list, obj) {
  var entries = list.getEntries();
  list.getEntriesByType;
  for (var i = 0; i < entries.length; i++) {
    // Process "mark" and "frame" events
  }
});
observer.observe({ entryTypes: ['mark', 'frame'] });

function perf_observer(list, observer) {
  // Process the "measure" event
}
var observer2 = new PerformanceObserver(perf_observer);
observer2.observe({ entryTypes: ['measure'] });
