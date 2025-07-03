/** @param {NS} ns */
export async function main(ns) {
    const hackTree = {hostname: "home", level: 0, admin: true};

    function hackNeighbors (hackTarget){
      let neighbors = ns.scan(hackTarget);

      for (let i = 0; i < neighbors.length; i++) {
      //get target info
        let target_server = ns.getServer(neighbors[i]);
        ns.tprint("hostname: " + target_server.hostname 
                + "- Ports: " + target_server.numOpenPortsRequired 
                + " HackDifficulty: " + target_server.hackDifficulty
                + " Current Hack Lvl: " + ns.getHackingLevel()
                + ' Admin: ' + target_server.hasAdminRights);

        if (!target_server.hasAdminRights) {
          let ports = target_server.numOpenPortsRequired

          if (ports == 0) {
            ns.nuke(target_server.hostname);
          };
          if (ports == 1 && ns.fileExists('BruteSSH.exe')) {
            ns.brutessh(target_server.hostname);
            ns.nuke(target_server.hostname);
          };
          if (ports == 2 &&
              ns.fileExists('BruteSSH.exe') &&
              ns.fileExists('FTPCrack.exe') ) {
            ns.brutessh(target_server.hostname);
            ns.ftpcrack(target_server.hostname);
            ns.nuke(target_server.hostname);
          };
          if (ports == 3 &&
              ns.fileExists('BruteSSH.exe') &&
              ns.fileExists('FTPCrack.exe') &&
              ns.fileExists('relaySTMP.exe') ) {
            ns.brutessh(target_server.hostname);
            ns.ftpcrack(target_server.hostname);
            ns.relaysmtp(target_server.hostname);
            ns.nuke(target_server.hostname);
          };
          if (ports == 4 &&
              ns.fileExists('BruteSSH.exe') &&
              ns.fileExists('FTPCrack.exe') &&
              ns.fileExists('relaySTMP.exe') &&
              ns.fileExists('HTTPWorm.exe') ) {
            ns.brutessh(target_server.hostname);
            ns.ftpcrack(target_server.hostname);
            ns.relaysmtp(target_server.hostname);
            ns.httpworm(target_server.hostname);
            ns.nuke(target_server.hostname);
          };
          if (ports == 5 &&
              ns.fileExists('BruteSSH.exe') &&
              ns.fileExists('FTPCrack.exe') &&
              ns.fileExists('relaySTMP.exe') &&
              ns.fileExists('HTTPWorm.exe') &&
              ns.fileExists('SQLInject.exe') ) {
            ns.brutessh(target_server.hostname);
            ns.ftpcrack(target_server.hostname);
            ns.relaysmtp(target_server.hostname);
            ns.httpworm(target_server.hostname);
            ns.sqlinject(target_server.hostname);
            ns.nuke(target_server.hostname);
          };
          ns.scp("early-hack-template.js", target_server.hostname);
          let script_number = (target_server.maxRam - target_server.ramUsed) / script_req;
          if (Math.floor(script_number) > 0) { 
            ns.exec("early-hack-template.js", target_server.hostname, Math.floor(script_number));
          };

        }; //if (!target_server.hasAdminRights)      

      }; //for (let i = 0; i < neighbors.length; i++)

    }; //function hackNeighbors


    let script_req = 2.6;
    let script_number = 1;

    //hackNeighbors('home');
    hackNeighbors('home');

    //function buildTree(){
    //scan home, then scan each neighbor, push each to tree array. then return
    //  }

}
