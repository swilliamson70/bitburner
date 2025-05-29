//scratch
/** @param {NS} ns */
export async function main(ns) {

  let neighbor = ns.scan();

  for (let i=0; i < neighbor.length; i++) {
    ns.tprint(neighbor[i]);
    let target_server = ns.getServer(neighbor[i]);
    ns.tprint(target_server);
    ns.tprint("SSH: " + target_server.sshPortOpen);
    ns.tprint(target_server.numOpenPortsRequired)
    if (target_server.sshPortOpen) {
      ns.tprint('open');
    } else { ns.tprint('closed');

    };
  }
}

server object:
{
    "hostname": "n00dles",
    "ip": "29.7.6.5",
    "sshPortOpen": false,
    "ftpPortOpen": false,
    "smtpPortOpen": false,
    "httpPortOpen": false,
    "sqlPortOpen": false,
    "hasAdminRights": false,
    "cpuCores": 1,
    "isConnectedTo": false,
    "ramUsed": 0,
    "maxRam": 4,
    "organizationName": "Noodle Bar",
    "purchasedByPlayer": false,
    "backdoorInstalled": false,
    "baseDifficulty": 1,
    "hackDifficulty": 1,
    "minDifficulty": 1,
    "moneyAvailable": 70000,
    "moneyMax": 1750000,
    "numOpenPortsRequired": 0,
    "openPortCount": 0,
    "requiredHackingSkill": 1,
    "serverGrowth": 3000
}
