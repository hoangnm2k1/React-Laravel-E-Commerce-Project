export const apiUrl = "http://localhost:8000/api";
export const adminToken = () => {
  const data = localStorage.getItem("adminInfo");
  const adminData = JSON.parse(data);
  return adminData.token;
};

export const userToken = () => {
  const data = localStorage.getItem("userInfo");
  const userData = JSON.parse(data);
  return userData.token;
};

export const STRIPE_PUBLIC_KEY =
  "pk_test_51Q3UTvIIpEdWpDiApli3HjsNEIa1DKkdYScbY0xsO35nD32Wleu76Ovrkh1rPoYzroBbTDgDzwvJXKrzHvbothDy00mcVLmKmR";
