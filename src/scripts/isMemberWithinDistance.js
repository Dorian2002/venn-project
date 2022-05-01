export default function isMemberWithinDistance(member1, member2, distance) {
  //found on https://www.movable-type.co.uk/scripts/latlong.html
  var lat1 = member1.member.location._lat;
  var lat2 = member2.location._lat;
  var lon1 = member1.member.location._long;
  var lon2 = member2.location._long;

  const R = 6371000;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  if (d / 1000 <= distance) {
    return true;
  } else {
    return false;
  }
}
