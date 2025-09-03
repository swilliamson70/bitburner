/** @param {NS} ns */
// when committing murder... for a purpose, of course.

export async function main(ns) {
  let karma = ns.heart.break();
  let hacknetTotalProduction = 0;
  let hacknetProduction = 0;
  let hacknetTotalProfit = 0;


  while (karma > -54000) {
    // -54k is the threshhold (sp?) for creating a gang - at least with The Black Hand (is it different for other factions?)
    ns.tprint(karma.toPrecision(8));
    karma = ns.heart.break();
    ns.tprint(ns.getPlayer().numPeopleKilled);
    
    await ns.sleep(1000);
  };

/*
  for (let index = 0; index <= ns.hacknet.numNodes() - 1; index++) {
    hacknetProduction += ns.hacknet.getNodeStats(index).production;
    hacknetTotalProduction = ns.hacknet.getNodeStats(index).totalProduction;
    hacknetTotalProfit += ns.hacknet.getNodeStats(index).totalProduction;
    hacknetTotalProfit += ns.hacknet.getNodeStats

    ns.tprint("production for " + index + " " + ns.hacknet.getNodeStats(index).production.toPrecision(5));
    ns.tprint("total production for " + index + " " + ns.hacknet.getNodeStats(index).totalProduction.toPrecision(5));
    ns.tprint(ns.formatNumber(hacknetTotalProduction));
  };
*/

  ns.tprint("Create Gang");

}
