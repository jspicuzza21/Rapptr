const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const filterList = (obj, searchStr) => {
  if (searchStr === '') return obj;
  searchStr=searchStr.toLowerCase();
  const filteredObj = {};
  const listArr = Object.entries(obj);

  listArr.forEach((elem) => {
    if (elem[1].toLowerCase().includes(searchStr)) {
      filteredObj[elem[0]] = elem[1];
    }
  });
  return filteredObj;
};

module.exports = {
  validateEmail,
  filterList,
};
