export default (data = {}) => {
  let list = "<ul>";

  if (data.height && Number(data.height))
    list += `<li><span>Высота</span><span>${data.height} мм</span></li>`;
  if (data.width && Number(data.width))
    list += `<li><span>Ширина</span><span>${data.width} мм</span></li>`;
  if (data.depth && Number(data.depth))
    list += `<li><span>Глубина</span><span>${data.depth} мм</span></li>`;
  if (data.center_distance && Number(data.center_distance))
    list += `<li><span>Межосевое расстояние</span><span>${data.center_distance} мм</span></li>`;
  if (data.color)
    list += `<li><span>Цвет</span><span>${data.color}</span></li>`;
  if (data.connect_deametr && data.connect_deametr !== "-1")
    list += `<li><span>Присоединение</span><span>${data.connect_deametr} ″</span></li>`;
  if (data.coolant_volume && Number(data.coolant_volume))
    list += `<li><span>Объем теплоносителя</span><span>${data.coolant_volume} л.</span></li>`;
  if (data.diametr && Number(data.diametr))
    list += `<li><span>Диаметр</span><span>${data.diametr} ″</span></li>`;
  if (data.execution)
    list += `<li><span>Подключение</span><span>${data.execution}</span></li>`;
  if (data.head_transfer_fluid)
    list += `<li><span>Жидкость теплоносителя</span><span>${data.head_transfer_fluid}</span></li>`;
  if (data.heat_dissipation_biggest && Number(data.heat_dissipation_biggest))
    list += `<li><span>Теплоотдача 90/70/20 °C</span><span>${data.heat_dissipation_biggest} Вт</span></li>`;
  if (data.heat_dissipation_lower && Number(data.heat_dissipation_lower))
    list += `<li><span>Теплоотдача 75/65/20 °C</span><span>${data.heat_dissipation_lower} Вт</span></li>`;
  if (data.heating_area && Number(data.heating_area))
    list += `<li><span>Площадь обогрева</span><span>${data.heating_area} м<sup>3</sup></span></li>`;
  if (data.length && Number(data.length))
    list += `<li><span>Длинна</span><span>${data.length} мм</span></li>`;
  if (data.material)
    list += `<li><span>Исполнение</span><span>${data.material}</span></li>`;
  if (data.max_heating_temperature && Number(data.max_heating_temperature))
    list += `<li><span>Максимальная температура нагрева °C</span><span>${data.max_heating_temperature} °C</span></li>`;
  if (data.max_pressure && Number(data.max_pressure))
    list += `<li><span>Макс. рабочее давление</span><span>${data.max_pressure} бар</span></li>`;
  if (data.size && Number(data.size))
    list += `<li><span>Размер</span><span>${data.size} мм</span></li>`;
  if (data.weight && Number(data.weight))
    list += `<li><span>Вес</span><span>${data.weight} кг.</span></li>`;
  if (data.test_pressure && Number(data.test_pressure))
    list += `<li><span>Испытательное давление</span><span>${data.test_pressure} бар</span></li>`;
  if (data.work_pressure && Number(data.work_pressure))
    list += `<li><span>Рабочее давление</span><span>${data.work_pressure} бар</span></li>`;

  list += "</ul>";

  return list;
};
