/** @param {NS} ns */
export async function main(ns) {
    // How much RAM each purchased server will have. In this case, it'll
    // be 8GB.
    //const ram = 1024;
    
    const ram = ns.args[0]; // this has no validation - it has to be a power of 2
    // if you're going to use this, you really should add in some input validation because typos
    
    ns.tprintf(ns.getPurchasedServerCost(ram));
    let script_req = 2.6;

    // Iterator we'll use for our loop
    let i = 0;
    let serverName = "";
    
    ns.tprint("Buying servers...");
    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (i < ns.getPurchasedServerLimit()) {
        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            // If we have enough money, then:
            //  1. Purchase the server
            //  2. Copy our hacking script onto the newly-purchased server
            //  3. Run our hacking script on the newly-purchased server with 3 threads
            //  4. Increment our iterator to indicate that we've bought a new server
            if (i<10){
              serverName = "pserv-0"+i; 
            } else {
              serverName = "pserv-"+i; 
            }
            //let hostname = ns.purchaseServer("pserv-" + i, ram);
            let hostname = ns.purchaseServer(serverName, ram);
            ns.tprint(hostname);

            // the magic number for 1024 is 393 //

            if (hostname !== "" ) {
              ns.tprint("...bought server: " + hostname);
              ns.scp("early-hack-template.js", hostname);
              //ns.exec("early-hack-template.js", hostname, 3);

              // this doesn't work yet... the copy does but the exec doesn't //
              let target_server = ns.getServer(hostname);
              ns.tprint("target: " + target_server.hostname);
              ns.tprint("  maxRam: " + target_server.maxRam);

              let script_number = (target_server.maxRam - target_server.ramUsed) / script_req;
              ns.tprint("  scriptNumber: " + script_number);
              ns.tprint("  attempting: " + Math.floor(script_number));
              if (Math.floor(script_number) > 0) { 
                ns.exec("early-hack-template.js", target_server.hostname, Math.floor(script_number));
              } else {
                ns.tprint("no server bought");
              };
            };


            ++i;
        }
        //Make the script wait for a second before looping again.
        //Removing this line will cause an infinite loop and crash the game.
        await ns.sleep(1000);
    }
}
