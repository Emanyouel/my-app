

const staff = [
  { id: 1, name: "Sarah", },
  { id: 2, name: "Emma" },
  { id: 3, name: "Lerato" }
];

const services = [
  { id: 1, name: "Haircut", duration: 60, img: "/haircut.jpg" },
  { id: 2, name: "Manicure", duration: 45, img: "/medicure.jpg" },
  { id: 3, name: "Pedicure", duration: 45, img: "/pedicure.jpg" },
  { id: 4, name: "Facial", duration: 60, img: "/Facial.jpg" }
];

const openingHours = {
  start: 9,
  end: 17
};

module.exports = { staff, services, openingHours };