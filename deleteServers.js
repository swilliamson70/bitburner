/** @param {NS} ns */
export async function main(ns) {
  // just in case you ever want to delete all of your purchased servers 
  // - but - I'm pretty sure that you can also upgrade via a script
  
  var currentServers = ns.getPurchasedServers();

  for (var i = 0; i < currentServers.length; ++i) {
      var serv = currentServers[i];
    ns.killall(serv);
    ns.deleteServer(serv);
  }
}
