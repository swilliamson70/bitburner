/** @param {NS} ns */
export async function main(ns) {
  //crawl the net, hack the net
    
  //copied from tree.js
  //seed the tree -- hostname, network diagram level, whether or not we have admin
  const hackTree = [{hostname: "home", level: 0, admin: true, parent: ""}];
  let hackTreeNodeParent = ""; 

  function bTree(baseHostname, levelNumber){
    //ns.tprint("bTree start - host: " + baseHostname + " level: " + levelNumber);
    
    let neighbors = ns.scan(baseHostname);
    //ns.tprint("neighbor scan ", neighbors); 
    
    //scan includes servers on both sides of target - except for 'home' 
    //we want to remove the parent host and only loop through the children 
    //ns.tprint("pre shift test ", neighbors); 
    if (baseHostname != "home" ){
      hackTreeNodeParent = baseHostname;
      //ns.tprint("shifting element 0");
      neighbors.shift();
    } else {
      hackTreeNodeParent = "home"
    };
    //ns.tprint("post shift test ", neighbors);

    //for each neighbor (that isn't a pserv):
    //  add to hack tree at levelNumber+1
    //  scan that neighbor to see if it has children nodes, if so recurse
      
    for (let i = 0; i < neighbors.length; i++){
      if( neighbors[i].substring(0,5) != "pserv" ){
        //add to hackTree
        //ns.tprint("testing " + neighbors[i])
        let neighborAnalyze = ns.getServer(neighbors[i])
        let hackTreeNode = {
          "hostname" : neighborAnalyze.hostname,
          "level" : levelNumber +1,
          "admin" : neighborAnalyze.hasAdminRights,
          "parent": hackTreeNodeParent
        };
        hackTree.push(hackTreeNode);
      };
        
      //does this neighbor have children? if so, recurse
      let neighborChildren = ns.scan(neighbors[i]);
      //ns.tprint("children ", neighborChildren);
      if(neighborChildren.length > 1){
        // && levelNumber < 3){
          bTree(neighbors[i], levelNumber +1);

      }; //recurse
      
    }; // for neighbors

  }; //function bTree

    
  let toolCount = 0;
  //assumes that this is the order in which they are acquired
  if (ns.fileExists('BruteSSH.exe') ) {toolCount++;};
  if (ns.fileExists('FTPCrack.exe') ) {toolCount++;};
  if (ns.fileExists('relaySMTP.exe')) {toolCount++;};
  if (ns.fileExists('HTTPWorm.exe') ) {toolCount++;};
  if (ns.fileExists('SQLInject.exe')) {toolCount++;};
  //ns.tprint("toolCount: ", toolCount);

  function hackServer (hackTarget){
    ns.tprint("> hacking > " + hackTarget);
    let target_server = ns.getServer(hackTarget);
    if (target_server.numOpenPortsRequired > 4){
      ns.sqlinject(target_server.hostname);
      ns.tprint("sqlInject");
    };
    if (target_server.numOpenPortsRequired > 3){
      ns.httpworm(target_server.hostname);
      ns.tprint("httpWorm");
    };
    if (target_server.numOpenPortsRequired > 2) {
      ns.relaysmtp(target_server.hostname);
      ns.tprint("relaySmtp");
    };
    if (target_server.numOpenPortsRequired > 1) {
      ns.ftpcrack(target_server.hostname);
      ns.tprint("ftpCrack");
    };
    if (target_server.numOpenPortsRequired > 0) {
      ns.brutessh(target_server.hostname);
      ns.tprint("bruteSsh");
    };
    ns.nuke(target_server.hostname);
    
    ns.scp("early-hack-template.js", target_server.hostname);
    let script_number = (target_server.maxRam - target_server.ramUsed) / script_req;
    if (Math.floor(script_number) > 0) { 
      ns.exec("early-hack-template.js", target_server.hostname, Math.floor(script_number));
    };

  }; // function hackServer    

  let script_req = 2.6;
  let script_number = 1;
  let accAlready = 0;
  let accHacked = 0;
  let accCant = 0;

  bTree("home",0);

  //hackNeighbors('home');
  //for each hostname in hackTree, evaluate, increment counter, hack

  for (let i = 1; i < hackTree.length; i++) {
    //ns.tprint(hackTree[i].hostname);
    let target = ns.getServer(hackTree[i].hostname);
    ns.tprint("current target " + target.hostname + " admin/diff/ports " 
       + target.hasAdminRights + "/" + target.hackDifficulty
       + "/" + target.numOpenPortsRequired);

    if (target.hasAdminRights == true) {
      ns.tprint("already hacked");
      accAlready++;
    } else if ( target.hackDifficulty <= ns.getHackingLevel()
              && target.numOpenPortsRequired <= toolCount) {
        ns.tprint("hacking");
        hackServer(target.hostname);
        accHacked++;
    } else {
      ns.tprint("can't")
      accCant++;
    };
          
  }; //for
  ns.tprint("Results: ");
  ns.tprint("  Already hacked   : ", accAlready);
  ns.tprint("  Hacked this time : ", accHacked);
  ns.tprint("  Can't hack yet   : ", accCant);
  ns.tprint("");
  ns.tprint(hackTree);

};
