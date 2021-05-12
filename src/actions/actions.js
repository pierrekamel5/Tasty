import axios from 'axios';

const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "http://localhost";
const portApi = process.env.NODE_ENV === "development" ? 5000 : 5000;

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;


async function getUsers() {
  const url = `${baseURLApi}/users`;
  return await axios.get(url);
}

async function getUser(id) {
  const url = `${baseURLApi}/users/id`;
  return await axios.post(url, id).then(response => response.data);
}

async function createUser(data)
{
  const url = `${baseURLApi}/users`;
  return await axios.post(url, data).then(response => response.data);
}
async function login(data)
{
  const url = `${baseURLApi}/users/login`;
  return await axios.post(url, data, {'Content-Type': 'application/json'}).then(response => response.data);
}
async function signUp(data)
{
  const url = `${baseURLApi}/users/signup`;
  return await axios.post(url, data, {'Content-Type': 'application/json'}).then(response => response.data);
}
async function getRestaurants() {
  const url = `${baseURLApi}/places`;
  return await axios.get(url);
}
async function getRestaurant(id) {
  const url = `${baseURLApi}/places/${id}`;
  return await axios.get(url).then(response => response.data);
}

async function addToCart(id,pid,productName,productPrice,productImg) {
  const url = `${baseURLApi}/orders`;
  return await axios.post(`${url}/addToCart`,
  {"userId":id,
  "productId": pid,
  "productName":productName,
   "productPrice":productPrice,
  "productImg":productImg})
      .then(response => response.data);

}

async function getCartInfo(id){
  const url = `${baseURLApi}/orders`;
  return await axios.get(`${url}/userCartInfo/${id}`)
  .then(response => response.data);
}

 function removeFromCart(data){
  const url = `${baseURLApi}/orders`;
  return  axios.post(`${url}/removeFromCart`,data,
  {'Content-Type': 'application/json'})
  .then(response=> response.data);
}

async function makePayment(data){
  const url = `${baseURLApi}/orders`;
  return await axios.post(`${url}/makepayment`, data)
}
async function getFeedbacks() {
  const url = `${baseURLApi}/feedback`;
  return await axios.get(url).then(response => response.data);
}
async function makeFeedback(data){
  const url = `${baseURLApi}/feedback`;
  return await axios.post(`${url}`, data)
}
async function getFeedbackbyUserId(id) {
  const url = `${baseURLApi}/feedback/${id}`;
  return await axios.get(url).then(response => response.data);
}
function removeMyFeedback(data){
  const url = `${baseURLApi}/feedback`;
  return  axios.post(`${url}/delete`,data,
  {'Content-Type': 'application/json'})
  .then(response=> response.data);
}
async function getReservations() {
  const url = `${baseURLApi}/reservations`;
  return await axios.get(url);
}
async function getReservation(id) {
  const url = `${baseURLApi}/reservations/${id}`;
  return await axios.get(url).then(response => response.data);
}
async function makeReservation(data){
  const url = `${baseURLApi}/reservations`;
  return await axios.post(`${url}`, data)
}
function removeReservation(data){
  const url = `${baseURLApi}/reservations`;
  return  axios.post(`${url}/removeFromCart`,data,
  {'Content-Type': 'application/json'})
  .then(response=> response.data);
}

async function getProducts() {
  const url = `${baseURLApi}/products`;
  return await axios.get(url);
}
async function getProduct(id) {
  const url = `${baseURLApi}/products/${id}`;
  return await axios.get(url).then(response => response.data);
}
async function getReservationByMArketName(marketName) {
  const url = `${baseURLApi}/reservations/marketname/${marketName}`;
  return await axios.get(url).then(response => response.data);
}
async function getNumberOfTablesForEachRestaurant(marketName){
  const url = `${baseURLApi}/reservations/numberoftables/${marketName}`;
  return await axios.get(url).then(response => response.data);
}
async function getDiscountCodeByCode(code){
  const url = `${baseURLApi}/subscriptions/${code}`;
  try {
    let code = await axios.get(url).then(response => response.data);
    return code; 
  } catch (error) {
    return false;
  }
  
}
async function sendSubscriptionCodeToUser(data){
  const url = `${baseURLApi}/subscriptions/sendsubscriptioncode`;
  return await axios.post(url,data).then(response => response.data);
  
}
async function checkIfUserIsSubscribed(email){
  const url = `${baseURLApi}/subscriptions/checkusersubscription/${email}`;
  return await axios.get(url).then(response => response.data);
  
}
async function updateRestaurant(data, id) {
  const url = `${baseURLApi}/places/${id}`;
  return await axios.patch(url,data).then(response => response.data);
}
async function updateImage(data, id) {
  const url = `${baseURLApi}/places/upload/${id}`;
  return await axios.patch(url,data).then(response => response.data);
}
async function deleteProductFromMenu(id,collectionId,productid){
  const url = `${baseURLApi}/places/${id}/${collectionId}/${productid}`
  return await axios.delete(url).then(response => response.data)
}
async function updateProductInMenu(id,data){
  const url = `${baseURLApi}/places/${id}/product`
  return await axios.patch(url,data).then(response => response.data)
}
async function addProductInMenu(id,data){
  const url = `${baseURLApi}/places/${id}`
  return await axios.post(url,data).then(response => response.data)
}
async function addCollectionInMenu(id,data){
  const url = `${baseURLApi}/places/${id}/collection`
  return await axios.post(url,data).then(response => response.data)
}

async function deleteCollectionFromMenu(id,collectionId){
  const url = `${baseURLApi}/places/${id}/${collectionId}`
  return await axios.delete(url).then(response => response.data)
}

async function createRestaurant(data){
  const url = `${baseURLApi}/places`
  return await axios.post(url,data).then(response => response.data)
}
async function deleteRestaurant(restaurantId){
  const url = `${baseURLApi}/places/${restaurantId}`
  return await axios.delete(url).then(response => response.data)
}
async function updateRestaurantPhoto(data, id) {
  const url = `${baseURLApi}/places/upload/${id}/restaurantphoto`;
  return await axios.patch(url,data).then(response => response.data);
}
async function addRestaurantPhoto(data, id) {
  const url = `${baseURLApi}/places/upload/${id}/restaurantphoto`;
  return await axios.post(url,data).then(response => response.data);
}
export {
  login,
  getUsers,
  getUser,
  createUser,
  addToCart,
  getCartInfo,
  removeFromCart,
  getRestaurants,
  getRestaurant,
  signUp,
  makePayment,
  getFeedbacks,
  makeFeedback,
  getFeedbackbyUserId,
  removeMyFeedback,
  getReservations,
  getReservation,
  makeReservation,
  removeReservation,
  getProducts,
  getProduct,
  getReservationByMArketName,
  getNumberOfTablesForEachRestaurant,
  getDiscountCodeByCode,
  sendSubscriptionCodeToUser,
  checkIfUserIsSubscribed,
  updateRestaurant,
  updateImage,
  deleteProductFromMenu,
  updateProductInMenu,
  addProductInMenu,
  addCollectionInMenu,
  deleteCollectionFromMenu,
  createRestaurant,
  deleteRestaurant,
  updateRestaurantPhoto,
  addRestaurantPhoto
};