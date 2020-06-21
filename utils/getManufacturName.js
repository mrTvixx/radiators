const countriesList = {
  '0': 'Россия',
};

export default (item) => `${item.name} (${countriesList[item.country]})`;