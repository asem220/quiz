export const quizzes = [
  {
    id: 'javascript-basics',
    title: 'Основы JavaScript',
    description: 'Проверьте свои знания основных концепций JavaScript от переменных до замыканий.',
    icon: 'Code',
    questions: [
      {
        id: 1,
        question: 'Как правильно объявить переменную в современном JavaScript?',
        options: ['var', 'let', 'const', 'И let, и const'],
        answer: 3
      },
      {
        id: 2,
        question: 'Какой из перечисленных типов НЕ является типом данных в JavaScript?',
        options: ['String', 'Number', 'Boolean', 'Float'],
        answer: 3
      },
      {
        id: 3,
        question: 'Что означает аббревиатура JSON?',
        options: ['JavaScript Object Notation', 'JavaScript Online Network', 'Java Standard Object Notation', 'JavaScript Object Network'],
        answer: 0
      },
      {
        id: 4,
        question: 'Что вернет выражение typeof null?',
        options: ['null', 'undefined', 'object', 'number'],
        answer: 2
      },
      {
        id: 5,
        question: 'Какой метод используется для добавления элемента в конец массива?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        answer: 0
      },
      {
        id: 6,
        question: 'Что такое "замыкание" (closure) в JavaScript?',
        options: ['Метод закрытия вкладки браузера', 'Функция вместе со своим лексическим окружением', 'Способ очистки памяти', 'Оператор завершения цикла'],
        answer: 1
      },
      {
        id: 7,
        question: 'Что делает метод Array.prototype.map()?',
        options: ['Изменяет исходный массив', 'Возвращает новый массив с результатами вызова функции', 'Удаляет элементы из массива', 'Сортирует массив'],
        answer: 1
      },
      {
        id: 8,
        question: 'Какой оператор используется для сравнения без приведения типов?',
        options: ['==', '===', '!=', '!=='],
        answer: 1
      }
    ]
  },
  {
    id: 'react-fundamentals',
    title: 'Основы React',
    description: 'Проверьте, насколько хорошо вы знаете экосистему React и её хуки.',
    icon: 'Atom',
    questions: [
      {
        id: 1,
        question: 'Что такое виртуальный DOM?',
        options: ['Прямая копия реального DOM', 'Легковесное представление реального DOM', 'Браузерный API', 'Метод стилизации CSS'],
        answer: 1
      },
      {
        id: 2,
        question: 'Какой хук используется для управления состоянием в функциональных компонентах?',
        options: ['useEffect', 'useContext', 'useState', 'useReducer'],
        answer: 2
      },
      {
        id: 3,
        question: 'Как передать данные от родительского компонента к дочернему?',
        options: ['Через state', 'Через props', 'Через context', 'Через refs'],
        answer: 1
      },
      {
        id: 4,
        question: 'Для чего используется хук useEffect?',
        options: ['Для создания стилей', 'Для обработки побочных эффектов', 'Для навигации по страницам', 'Для валидации форм'],
        answer: 1
      },
      {
        id: 5,
        question: 'Что делает атрибут "key" в списках React?',
        options: ['Стилизует элементы', 'Помогает React идентифицировать измененные элементы', 'Создает уникальный ID в базе данных', 'Ничего не делает'],
        answer: 1
      },
      {
        id: 6,
        question: 'Какое правило хуков является обязательным?',
        options: ['Хуки можно вызывать внутри циклов', 'Хуки вызываются только на верхнем уровне', 'Хуки можно вызывать в обычных функциях', 'Хуки должны быть асинхронными'],
        answer: 1
      },
      {
        id: 7,
        question: 'Какой метод жизненного цикла, эквивалентный useEffect с пустым массивом зависимостей, в классах React?',
        options: ['componentDidUpdate', 'componentWillUnmount', 'componentDidMount', 'shouldComponentUpdate'],
        answer: 2
      },
      {
        id: 8,
        question: 'Что делает hook useMemo?',
        options: ['Создает локальное состояние компонента', 'Кэширует вычисление значения, чтобы избежать лишних перерасчетов', 'Вызывает побочный эффект', 'Управляет контекстом'],
        answer: 1
      }
    ]
  },
  {
    id: 'css-layout',
    title: 'CSS Макеты',
    description: 'Проверьте свои навыки работы с современными способами верстки: Grid, Flexbox и позиционирование.',
    icon: 'Layout',
    questions: [
      {
        id: 1,
        question: 'Какое свойство используется для создания flex-контейнера?',
        options: ['display: grid', 'display: flex', 'display: block', 'display: inline'],
        answer: 1
      },
      {
        id: 2,
        question: 'Что делает justify-content: center в flex-контейнере?',
        options: ['Выравнивает элементы по вертикали', 'Выравнивает элементы по горизонтали', 'Добавляет пространство между элементами', 'Растягивает элементы на весь контейнер'],
        answer: 1
      },
      {
        id: 3,
        question: 'Какое свойство CSS Grid определяет количество колонок?',
        options: ['grid-template-rows', 'grid-template-columns', 'grid-gap', 'grid-area'],
        answer: 1
      },
      {
        id: 4,
        question: 'Какое значение свойства position вырывает элемент из потока и позиционирует относительно окна браузера?',
        options: ['relative', 'absolute', 'fixed', 'sticky'],
        answer: 2
      },
      {
        id: 5,
        question: 'Как расшифровывается CSS?',
        options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
        answer: 1
      },
      {
        id: 6,
        question: 'Какое свойство позволяет изменять порядок элементов во Flexbox без изменения HTML?',
        options: ['z-index', 'order', 'flex-index', 'flex-direction'],
        answer: 1
      },
      {
        id: 7,
        question: 'Что такое "box-sizing: border-box"?',
        options: ['Свойство для создания теней', 'Включение границ и отступов в общую ширину элемента', 'Метод округления углов', 'Стиль для рисования рамок'],
        answer: 1
      },
      {
        id: 8,
        question: 'Какое свойство позволяет элементы по вертикали по оси Z в Grid?',
        options: ['grid-column', 'grid-row', 'z-index', 'align-items'],
        answer: 2
      },
      {
        id: 9,
        question: 'Как задать расстояние между строками и колонками в CSS Grid?',
        options: ['grid-gap', 'grid-area', 'grid-padding', 'grid-spacing'],
        answer: 0
      }
    ]
  },
  {
    id: 'react-hooks',
    title: 'Развитые хуки React',
    description: 'Углубленный тест по хукам и оптимизации React-компонентов.',
    icon: 'RefreshCcw',
    questions: [
      {
        id: 1,
        question: 'Что делает хук useCallback?',
        options: ['Создает callback-функцию с кешированием', 'Используется для управления состоянием', 'Вызывает побочный эффект', 'Работает аналогично useMemo'],
        answer: 0
      },
      {
        id: 2,
        question: 'Какой хук позволяет работать с DOM-элементами напрямую?',
        options: ['useMemo', 'useEffect', 'useRef', 'useContext'],
        answer: 2
      },
      {
        id: 3,
        question: 'При каком условии useEffect без массива зависимостей будет выполняться?',
        options: ['Только при первом рендере', 'При каждом рендере', 'Только при размонтировании', 'Никогда'],
        answer: 1
      },
      {
        id: 4,
        question: 'Что возвращает useState?',
        options: ['Значение и функцию обновления', 'Только значение', 'Только функцию обновления', 'Ничего'],
        answer: 0
      },
      {
        id: 5,
        question: 'Что делает useContext?',
        options: ['Передает данные между компонентами через props', 'Читает значение контекста без пропсов', 'Позволяет хранить локальное состояние', 'Управляет маршрутизацией'],
        answer: 1
      },
      {
        id: 6,
        question: 'Какая цель useLayoutEffect?',
        options: ['Асинхронные операции', 'Побочные эффекты после рендеринга до отображения', 'Обновление состояния', 'Оптимизация рендера'],
        answer: 1
      }
    ]
  },
  {
    id: 'nodejs-basics',
    title: 'Основы Node.js',
    description: 'Тест по серверной части на Node.js и работе с API.',
    icon: 'Server',
    questions: [
      {
        id: 1,
        question: 'Какой модуль отвечает за создание HTTP-сервера в Node.js?',
        options: ['fs', 'http', 'path', 'os'],
        answer: 1
      },
      {
        id: 2,
        question: 'Что делает метод res.json() в Express?',
        options: ['Отправляет HTML', 'Отправляет JSON и устанавливает Content-Type', 'Читает данные из запроса', 'Закрывает соединение'],
        answer: 1
      },
      {
        id: 3,
        question: 'Какой метод используется для обработки POST-запросов в Express?',
        options: ['app.get', 'app.post', 'app.put', 'app.delete'],
        answer: 1
      },
      {
        id: 4,
        question: 'Что такое Middleware в Express?',
        options: ['Функция, обрабатывающая запросы и ответы', 'Шаблон для вывода страниц', 'Подключаемый компонент React', 'Тестовый фреймворк'],
        answer: 0
      },
      {
        id: 5,
        question: 'Какой порт по умолчанию часто используют для локального сервера Node.js?',
        options: ['80', '3000', '8080', '5000'],
        answer: 1
      },
      {
        id: 6,
        question: 'Для чего используется dotenv?',
        options: ['Загрузки статических файлов', 'Хеширования паролей', 'Загрузки переменных из .env в process.env', 'Работы с базой данных'],
        answer: 2
      }
    ]
  }
];