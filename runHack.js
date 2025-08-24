/** @param {NS} ns */
export async function main(ns) {
  //runs the max number of scripts on home that you can in order to unlock the Run 1000 Scripts achievement
  let target_server = ns.getServer('home');
  while ((target_server.maxRam - target_server.ramUsed) > 2.6) {
    ns.exec("early-hack-template.js", target_server.hostname,1);
    target_server = ns.getServer('home');
  }
 }
