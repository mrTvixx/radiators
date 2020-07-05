import RadiatorImage from "../assets/images/radiator.jpg";
import ComponentImage from "../assets/images/component.jpg";
import PipesImage from "../assets/images/pipes.jpg";
import ProtectImage from "../assets/images/protect.png";

export const links = [
  {
    id: 0,
    link: "/warranty",
    title: "Гарантии"
  },
  {
    id: 1,
    link: "/payment",
    title: "Оплата"
  },
  {
    id: 2,
    link: "/delivery",
    title: "Доставка"
  },
  {
    id: 3,
    link: "/return",
    title: "Возврат"
  },
  {
    id: 4,
    link: "/contacts",
    title: "Контакты"
  },
  {
    id: 5,
    link: "/about",
    title: "О компании"
  }
];

export const catalog = [
  {
    id: 0,
    title: "Радиаторы",
    link: "/radiator",
    img: RadiatorImage
  },
  {
    id: 1,
    title: "Запорно регулирующая арматура",
    link: "/components",
    img: ComponentImage
  },
  {
    id: 2,
    title: "Трубы и фитинги",
    link: "/pipes",
    img: PipesImage
  },
  // {
  //   id: 3,
  //   title: 'Краны',
  //   link: '/crane',
  //   img: '',
  // },
  {
    id: 4,
    title: "Системы защиты от протечек воды",
    link: "/protect",
    img: ProtectImage
  }
];
