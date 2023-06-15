// Функція для отримання даних про процесори зі сторінки Intel
    async function getIntelProcessorData() {
      try {
        const response = await fetch('https://www.intel.com/content/www/us/en/products/details/processors/vpro/products.html');
        const html = await response.text();

        // Отримання таблиці з класом "table table-sorter sorting"
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const table = doc.querySelector('.table.table-sorter.sorting');

        // Отримання всіх рядків (тез) таблиці
        const rows = table.querySelectorAll('tbody tr');

        // Обмеження кількості відображуваних постів до 10
        const maxPosts = 10;
        let postCount = 0;

        // Проходимося по кожному рядку таблиці і отримуємо необхідну інформацію
        rows.forEach((row, index) => {
          if (postCount >= maxPosts) {
            return; // Пропускаємо додавання нових постів, якщо досягнуто ліміту
          }

          const columns = row.querySelectorAll('td');

          // Отримуємо дані з кожного стовпця рядка (припустимо, що перший стовпець містить посилання, а другий стовпець містить опис)
          const link = columns[0].querySelector('a');
          const title = link.textContent;
          const url = `https://www.intel.com${link.getAttribute('href')}`;
          const description = columns[1].textContent;

          // Створюємо пост з отриманими даними
          const post = document.createElement('div');
          post.classList.add('post');

          const postTitle = document.createElement('p');
          postTitle.textContent = title;

          const postDescription = document.createElement('p');
          postDescription.textContent = description;

          post.appendChild(postTitle);
          post.appendChild(postDescription);

          // Додаємо пост до HTML-сторінки
          document.getElementById('posts-container').appendChild(post);

          postCount++;
        });

        // Перевіряємо, чи є ще пости, які не відображаються
        if (postCount < rows.length) {
          // Створюємо текст "See All" з функціональністю для відображення решти постів
          const seeAllText = document.createElement('p');
          seeAllText.textContent = 'See All';
          seeAllText.classList.add('see-all');

          seeAllText.addEventListener('click', () => {
            // Відображаємо всі пости
            rows.forEach((row, index) => {
              if (index >= postCount) {
                const columns = row.querySelectorAll('td');
                const link = columns[0].querySelector('a');
                const title = link.textContent;
                const url = `https://www.intel.com${link.getAttribute('href')}`;
                const description = columns[1].textContent;

                const post = document.createElement('div');
                post.classList.add('post');

                const postTitle = document.createElement('p');
                postTitle.textContent = title;

                const postDescription = document.createElement('p');
                postDescription.textContent = description;

                post.appendChild(postTitle);
                post.appendChild(postDescription);

                document.getElementById('posts-container').appendChild(post);
              }
            });

            seeAllText.style.display = 'none'; // Приховуємо текст "See All" після натискання
          });

          document.getElementById('see-all-container').appendChild(seeAllText);
        }

        // Перевіряємо, чи було знайдено пости
        if (postCount === 0) {
          document.getElementById('not-found').style.display = 'block';
        }
      } catch (error) {
        console.log('Сталася помилка при отриманні даних про процесори:', error);
      }
    }

    // Виклик функції для отримання даних про процесори
    getIntelProcessorData();

// Функція для обробки події введення тексту в поле пошуку
function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value.toLowerCase();
  const posts = document.getElementsByClassName('post');
  let foundPosts = 0;

  Array.from(posts).forEach((post) => {
    const postTitle = post.querySelector('p:first-child').textContent.toLowerCase();
    const postDescription = post.querySelector('p:last-child').textContent.toLowerCase();

    if (postTitle.includes(searchText) || postDescription.includes(searchText)) {
      post.style.display = 'block'; // Показуємо пост, якщо збігаються критерії пошуку
      foundPosts++;
    } else {
      post.style.display = 'none'; // Приховуємо пост, якщо не збігаються критерії пошуку
    }
  });

  // Перевіряємо, чи було знайдено пости
  const notFoundElement = document.getElementById('not-found');
  if (foundPosts === 0) {
    notFoundElement.classList.add('not-found-visible');
  } else {
    notFoundElement.classList.remove('not-found-visible');
  }
}

// Додавання події "input" на поле пошуку
document.getElementById('search-input').addEventListener('input', handleSearch);
