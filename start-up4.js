/** @param {NS} ns */
export async function main(ns) {
    const hackTree = {hostname: "home", level: 0, admin: true};
    let toolCount = 0;
    //assumes that this is the order in which they are acquired
    if (ns.fileExists('BruteSSH.exe') ) {toolCount++;};
    if (ns.fileExists('FTPCrack.exe') ) {toolCount++;};
    if (ns.fileExists('relaySMTP.exe')) {toolCount++;};
    if (ns.fileExists('HTTPWorm.exe') ) {toolCount++;};
    if (ns.fileExists('SQLInject.exe')) {toolCount++;};
    ns.tprint("toolCount: ", toolCount);

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

        let ports = target_server.numOpenPortsRequired;

        //doesn't have admin 
        //and hackdifficulty <= current hack stat 
        //and have tools to open ports
        if (!target_server.hasAdminRights 
            && target_server.hackDifficulty <= ns.getHackingLevel()
            && ports <= toolCount) {
          ns.tprint("> hacking >");
          if (ports > 4){
            ns.sqlinject(target_server.hostname);
            ns.tprint("sqlInject");
          };
          if (ports > 3){
            ns.httpworm(target_server.hostname);
            ns.tprint("httpWorm");
          };
          if (ports > 2) {
            ns.relaysmtp(target_server.hostname);
            ns.tprint("relaySmtp");
          };
          if (ports > 1) {
            ns.ftpcrack(target_server.hostname);
            ns.tprint("ftpCrack");
          };
          if (ports > 0) {
            ns.brutessh(target_server.hostname);
            ns.tprint("bruteSsh");
          };
          ns.nuke(target_server.hostname);
          
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

    hackNeighbors('home');
    //hackNeighbors('powerhouse-fitness');

    //function buildTree(){
    //scan home, then scan each neighbor, push each to tree array. then return
    //  }

}
