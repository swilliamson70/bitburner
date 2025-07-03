/** @param {NS} ns */
export async function main(ns) {
  //crawl the network to build a tree
  //  hackTree, an array of objects: 
  //    hostname, name of host/server
  //    level, number of layers down in the tree "home" = 0, "home"'s children = 1, "home"'s grandchildren = 2, etc.
  //    admin rights, do we have admin rights on this host?  
  //    parent, how did we get here?

    //seed the tree -- hostname, network diagram level, whether or not we have admin
    const hackTree = [{hostname: "home", level: 0, admin: true, parent: ""}];
    //let hackTreeNode = [];
    //hackTreeNodes.unshift(hackTree);
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
      }
      ;
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
        ns.tprint("children ", neighborChildren);
        if(neighborChildren.length > 1){
          // && levelNumber < 3){
            bTree(neighbors[i], levelNumber +1);

        }; //recurse
        
      }; // for neighbors

    }; //function bTree

    //buildTree("home",0);
    
    bTree("home",0);
    
    ns.tprint(hackTree);
    ns.tprint("***** end *****");
    
}
