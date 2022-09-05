import "./index.scss";
import "fullpage.js/dist/fullpage.css";
import fullpage from "fullpage.js";
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from "swiper";
// import Swiper and modules styles
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";

new fullpage("#fullpage", {
  //options here
  autoScrolling: true,
  navigation: true,
  navigationPosition: "right",
});

const swiper1 = new Swiper(".swiper", {
  modules: [Navigation, Pagination],
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
});
