export const apiUrl = "http://localhost:8000/api";
export const adminToken = () => {
  const data = localStorage.getItem("adminInfo");
  if (!data) return null;
  const adminData = JSON.parse(data);
  return adminData?.token || null;
};

export const userToken = () => {
  const data = localStorage.getItem("userInfo");
  if (!data) return null;
  const userData = JSON.parse(data);
  return userData?.token || null;
};

export const STRIPE_PUBLIC_KEY =
  "pk_test_51Q3UTvIIpEdWpDiApli3HjsNEIa1DKkdYScbY0xsO35nD32Wleu76Ovrkh1rPoYzroBbTDgDzwvJXKrzHvbothDy00mcVLmKmR";
