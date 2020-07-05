const countriesList = {
  '0': 'Россия',
  '2': 'Германия',
};

export default (item) => `${item.name} (${countriesList[item.country] || ''})`;