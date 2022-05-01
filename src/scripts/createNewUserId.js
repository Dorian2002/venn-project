export default function createNewUserId(firstname, lastname) {
  return (
    firstname[0].toUpperCase() +
    firstname.slice(1).toLowerCase() +
    lastname[0].toUpperCase() +
    lastname.slice(1).toLowerCase()
  );
}
