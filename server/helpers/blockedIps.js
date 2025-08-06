const blockedIps = new Map();

function isIpBlocked(ip) {
  const expires = blockedIps.get(ip);
  if (!expires) return false;
  if (Date.now() > expires) {
    blockedIps.delete(ip);
    return false;
  }
  return true;
}

function blockIp(ip, ms) {
  blockedIps.set(ip, Date.now() + ms);
}

module.exports = { isIpBlocked, blockIp };
