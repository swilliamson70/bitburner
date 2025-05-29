//After copying the sample script in Documentation/Getting Started Guide
//I'm beginning to play around with it to do more of the work - and since I've never really done that much with js...
//
//Ultimately, the main look needs to be a function so it can run from a loop that tranverses the entire environment
//Fortunatley, we dont' have to worry about being too recursive because the game 'stores' the comprimised systems as a 
//property of the environment - .hasAdminRights
// start-up2.js - s.williamson
// start: x-May-2025

/** @param {NS} ns */
export async function main(ns) {
    // Get a list of servers around me
    let neighbors = ns.scan('home');
    // const servers0Port = []; -- this was left over from the sample,
    // const servers1Port = []; -- instead of hardcoding an array, we're getting a our neighbors hostnames 
    let script_req = 2.6; // this is what the current 'eary-hack-template.js' needs to run
    let script_number = 1; // this is actually the number of threads 

    for (let i = 0; i < neighbors.length; i++) {
      //get target info
      let target_server = ns.getServer(neighbors[i]);
      //ns.tprint(target_server.hostname + ' ' + target_server.numOpenPortsRequired)
      if (!target_server.hasAdminRights) { //if we do not have admin on this, then...
        let ports = target_server.numOpenPortsRequired
        ns.tprint('Ports: ' + ports)
        if (ports == 0) {
          ns.nuke(target_server.hostname);
        };
        if (ports == 1) {
          ns.brutessh(target_server.hostname);
          ns.nuke(target_server.hostname);
        };
        ns.scp("early-hack-template.js", target_server.hostname);
        let script_number = (target_server.maxRam - target_server.ramUsed) / script_req; 
        ns.exec("early-hack-template.js", target_server.hostname, Math.floor(script_number));
      };
    };
}
