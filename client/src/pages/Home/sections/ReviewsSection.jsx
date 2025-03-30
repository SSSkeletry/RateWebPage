import styles from "../ui/Home.module.css";
import { assets } from "../../../shared/assets/index";
import "bootstrap-icons/font/bootstrap-icons.css";

const reviews = [
  {
    id: 1,
    company: "Ukrainian Alcohol Company",
    text: "Професійна команда, яка знає свою справу. Після їхньої роботи мій сайт почав завантажуватися швидше, а позиції в пошукових системах покращилися. Вони врахували всі мої побажання та провели повний аудит сайту. Я отримала детальний звіт із покращеннями та чіткий план подальшого розвитку. Дуже вдячна за якісний сервіс!",
    author: "Ірина Біліченко",
    rating: 5,
  },
  {
    id: 2,
    company: "FLAGSYSTEM",
    text: "Замовляв SEO-оптимізацію та покращення швидкодії сайту. Робота була виконана швидко і якісно, а результати перевершили очікування. Конверсія зросла, а позиції в Google піднялися вже через кілька тижнів. Дуже сподобалося, що команда детально пояснювала всі зміни. Буду рекомендувати друзям!",
    author: "Володимир Гладченко",
    rating: 5,
  },
  {
    id: 3,
    company: "FULL KITCHEN",
    text: "Чудовий сервіс та професійний підхід! Мій сайт став працювати швидше, а мобільна версія тепер ідеально адаптована. Отримала детальний аналіз помилок та рекомендації щодо їх усунення. Видимість сайту в пошуку значно покращилася, що позитивно вплинуло на бізнес. Дякую за якісну роботу!",
    author: "Клієнт",
    rating: 5,
  },
  {
    id: 4,
    company: "IT Solutions Ukraine",
    text: "Завдяки цій компанії наш сайт отримав друге життя. Вони оптимізували код, зменшили час завантаження сторінок та покращили юзабіліті. Ми задоволені результатами і плануємо подальшу співпрацю.",
    author: "Олександр Коваль",
    rating: 5,
  },
  {
    id: 5,
    company: "GreenTech",
    text: "Команда професіоналів, які працюють на результат. Вони зробили SEO-просування для нашого сайту, і вже за місяць ми побачили збільшення трафіку. Рекомендую!",
    author: "Марина Лисенко",
    rating: 5,
  },
  {
    id: 6,
    company: "ECO Foods",
    text: "Наш інтернет-магазин став значно швидше працювати після оптимізації. Зросла кількість замовлень, і клієнти відзначають зручність користування сайтом. Дуже вдячні команді!",
    author: "Андрій Петров",
    rating: 5,
  },
  {
    id: 7,
    company: "MEDICAL PLUS",
    text: "Завдяки їхній роботі наш сайт став відповідати всім сучасним вимогам. Вони не тільки покращили швидкість завантаження, а й зробили редизайн, який приваблює клієнтів.",
    author: "Світлана Гончар",
    rating: 5,
  },
  {
    id: 8,
    company: "AutoTrade",
    text: "Дуже задоволені співпрацею! Команда детально проаналізувала наш сайт, запропонувала багато корисних змін та допомогла їх реалізувати. Відвідуваність зросла в рази!",
    author: "Дмитро Іванов",
    rating: 5,
  },
  {
    id: 9,
    company: "Beauty & Care",
    text: "Професійний підхід до кожного клієнта. Вони не просто зробили SEO, а й допомогли з контент-стратегією, що дало чудові результати.",
    author: "Катерина Мельник",
    rating: 5,
  },
];

const ReviewsSection = () => {
  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.title}>
        ОТЗЫВЫ <span className={styles.highlight}>КЛИЕНТОВ</span>
      </h2>
      <div className={styles.reviewsGrid}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <h3 className={styles.reviewTitle}>{review.title}</h3>
              <img
                src={review.logo}
                alt={review.title}
                className={styles.reviewLogo}
              />
            </div>
            <p className={styles.reviewText}>{review.text}</p>
            <p className={styles.reviewAuthor}>— {review.author}</p>
            <div className={styles.reviewRating}>
              {"⭐".repeat(review.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
