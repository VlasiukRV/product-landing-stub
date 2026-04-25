<script setup>

const content = {
  hero: {
    title: "Welcome aboard!"
  },

  about: {
    intro: "Ми раді вітати тебе в Uptarget!",
    paragraphs: [
      "Uptarget.co — міжнародна аутсорсингова компанія, заснована у 2020 році. Ми спеціалізуємося на web та mobile розробці...",
      "Ми співпрацюємо з клієнтами за моделлю remote dedicated team...",
      "Основні напрями наших проєктів — e-commerce, healthcare, fintech...",
      "Наші клієнти — компанії з Ізраїлю, Європи та США."
    ],
    clients: ['Akuna', 'IB', 'Docomotion', 'Priority', 'Voiceitt', 'Hulyo', 'Travelist']
  },

  values: {
    title: "Наші цінності",
    description: "Ми віримо, що сильна команда починається з правильних принципів. " +
        "Uptarget — це спільнота професіоналів, які працюють партнерами, а не «найманими працівниками». " +
        "Ми цінуємо чесність, відкритість і взаємоповагу — ці речі лежать в основі нашої співпраці всередині команди та з клієнтами.",
    items: [
      {
        t: 'Досконалість',
        st: 'Excellence',
        d: 'Підтримуємо високі стандарти якості у всьому — від коду до комунікацій. ' +
            'Дотримуємось продуктового мислення: виконуємо не просто задачі, а створюємо цінність для замовника й кінцевого користувача.'
      },
      {
        t: 'Розвиток',
        st: 'Development',
        d: 'Ділимося знаннями, допомагаємо одне одному рости й досягаємо найкращих результатів через спільне навчання.'
      },
      {
        t: 'Усвідомленість',
        st: 'Awareness',
        d: 'Створюємо рішення з реальним суспільним ефектом. Підтримуємо баланс і здоровий спосіб життя.'
      },
      {
        t: 'Повага та довіра',
        st: 'Respect & Trust',
        d: 'Ефективна співпраця неможлива без взаємної поваги та довіри. Це основа відкритої комунікації та спільних результатів.'
      }
    ]
  },

  team: {
    title: "Знайомство з командою",
    description: "Наш менеджмент завжди відкритий до спілкування — ми цінуємо прозорість, довіру й людяність. " +
        "З будь-якими питаннями, ідеями чи пропозиціями звертайся до нас — ми поруч, щоб допомогти.",
    members: [
      {
        n: 'Олена Власюк',
        r: 'CEO',
        d: 'Засновниця та натхненниця команди. Відповідає за стратегію, розвиток і співпрацю з клієнтами.',
        i: 'Olena'
      },
      {
        n: 'Роман Власюк',
        r: 'CEO',
        d: 'Керує фінансовими процесами, допомагає налагоджувати ефективну роботу команди та проєктів.',
        i: 'Roman'
      },
      {
        n: 'Галя Онищенко',
        r: 'Operations Manager',
        d: 'Підтримуємо адміністративні процеси, звіти та документообіг. З питань — до неї.',
        i: 'Galina'
      }
    ]
  },

  slack: {
    title: "Комунікації",
    description: "Для внутрішнього спілкування використовуємо Slack - наш головний простір комунікації.",
    channels: [
      {
        c: '# general',
        d: 'Офіційні анонси: інтро новачків, вітання, робочі апдейти, ключові новини. ' +
            'Стеж за оновленнями. Публікуючи оголошення, вміщуй суть в одному повідомленні.'
      },
      {
        c: '# fop',
        d: 'Комунікація щодо звітності та інвойсів (здебільшого від CFO). Питання по ФОП — сюди.'
      },
      {
        c: '# random',
        d: 'Вільне спілкування та корисні дрібниці: статті, поради, оголошення, прохання.'
      },
      {
        c: '# ooo',
        d: 'Повідомлення про відсутність: лікарняні, відпустки, відрядження, робота з дому. ' +
            'Наприклад: “OOO today — working from home” або “OOO next week — vacation 🌴”.'
      },
      {
        c: '# office-life',
        d: 'Усе про життя офісу: зустрічі, події, фото з командою.'
      }
    ]
  },

  meetings: [
    {
      title: "All-Hands Meeting",
      text: "Раз на квартал проводимо загальну зустріч усієї команди (присутність обов’язкова онлайн або офлайн). " +
          "Тривалість 30–60 хв: новини компанії, важливі події, результати, плани, відзначення досягнень. " +
          "Анонси — у Slack (#general), запрошення — у Google Calendar (з лінком на Meet для онлайн-учасників)."
    },
    {
      title: "1:1 із CEO",
      text: "Щоквартальні індивідуальні зустрічі: про взаємодію з клієнтом і командою, професійний розвиток, " +
          "настрій, ідеї чи складнощі. Мета — зворотний зв’язок і підтримка твого зростання як спеціаліста."
    }
  ],

  policies: {
    sick: {
      title: "Лікарняні",
      text: "10 робочих днів на рік, нараховуються поступово — 0,83 дня за кожен календарний місяць з дати старту. " +
          "Наприклад, якщо ти приєднався у липні, до кінця року матимеш 5 днів. " +
          "Невикористані лікарняні не переносяться на наступний календарний рік.",
      steps: [
        'Email контактній особі клієнта',
        'Додай у копію Олену Власюк',
        'Повідом у Slack канал #ooo',
        'Затрекай у Vacation Tracker'
      ]
    },
    vacation: {
      title: "Відпустки",
      text: "18 робочих днів на рік (1,5 дня на місяць). " +
          "Наприклад, якщо старт роботи 20 червня, до кінця року буде близько 9,5 днів. " +
          "Невикористана відпустка переноситься на новий рік лише до 30 липня; після 1 серпня залишки анулюються. " +
          "Рекомендуємо брати відпустку після 6 місяців роботи. Максимум — до 10 робочих днів поспіль.",
      steps: [
        'Узгодь із командою та повідом контактну особу клієнта',
        'Постав у копію Олену Власюк',
        'За місяць до старту — нагадай повторним листом',
        'Повідом у Slack у канал #ooo',
        'Затрекати дні у Vacation Tracker'
      ]
    }
  }
};

</script>

<template>

  <div class="bg-white font-golos text-black text-base md:text-lg">

    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <nav class="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">

        <a href="/" class="bg-white backdrop-blur-md px-4 py-2 transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] group rounded-full">
          <img src="/img/Logo.svg" alt="Logo" width="150" class="logo transition-transform duration-500 group-hover:scale-105" />
        </a>

        <div class="hidden md:flex gap-6 text-sm">
          <a href="#Top" class="hover:text-orange">Welcome</a>
          <a href="#Values" class="hover:text-orange">Values</a>
          <a href="#Team" class="hover:text-orange">Team</a>
          <a href="#Communication" class="hover:text-orange">Communication</a>
          <a href="#Policies" class="hover:text-orange">Policies</a>
        </div>

      </nav>
    </header>

    <section id="Top" class="relative pt-20 pb-12 overflow-hidden bg-white">
      <div class="max-w-container mx-auto px-4 flex flex-col items-center relative z-10">
        <img
            src="/img/Rays-Ltop-Corner.svg"
            alt="Uptarget"
            class="absolute -top-10 -left-10 w-64 opacity-30 pointer-events-none"
            loading="lazy"
            width="240"
            height="60"
        />
        <img
            src="/img/Logo-Square.svg"
            alt="Uptarget Icon"
            class="absolute -top-4 -right-4 w-32 h-32 md:w-48 md:h-48 pointer-events-none"
            loading="lazy"
            width="240"
            height="60"
        />
        <h1 class="font-unbounded text-5xl md:text-6xl mb-8 uppercase tracking-tighter">
          {{ content.hero.title }}
        </h1>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4">
        <div class="space-y-6 text-lg md:text-xl leading-relaxed text-black/80">
          <p class="text-2xl italic">
            <span class="font-bold not-italic border-b-4 border-yellow">Ми раді вітати тебе в Uptarget!</span> 💛
          </p>
          <p class="">
            <span class="font-bold text-black text-xl">Uptarget.co</span> — міжнародна аутсорсингова компанія, заснована у 2020 році. Ми спеціалізуємося на web та mobile розробці, поєднуючи технічну експертизу з турботою про довгострокові партнерства. Наш офіс розташований у самому центрі Черкас, проте більшість команди працює віддалено.
          </p>
          <p>Ми співпрацюємо з клієнтами за моделлю <em class="italic text-orange font-medium">remote dedicated team</em>, що дозволяє нашим спеціалістам глибоко занурюватися в продукти, впливати на рішення та зростати разом із командами замовників.</p>
          <p>Основні напрями наших проєктів — <em class="italic">e-commerce, healthcare, fintech</em>. Працюємо з технологіями <em class="italic">JavaScript, Python, .NET та mobile native development.</em> </p>
          <p>Наші клієнти — компанії з Ізраїлю, Європи та США.</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-8 mt-16 items-center opacity-70 hover:opacity-100 transition-opacity duration-500">
          <template v-for="client in content.about.clients" :key="client">
            <img
                :src="`/img/clients/${client}-Logo.svg`"
                :alt="client"
                class="h-8 w-auto mx-auto object-contain"
                loading="lazy"
                width="240"
                height="60"
            />
          </template>
        </div>
      </div>
    </section>

    <div class="h-2 bg-yellow w-full"></div>
    <section id="Values" class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4">
        <h2 class="font-unbounded text-3xl md:text-4xl font-bold mb-4 uppercase">{{content.values.title}}</h2>
        <p class="text-gray-600 mb-12 max-w-2xl text-lg md:text-xl ">
          {{content.values.description}}
        </p>

        <div class="grid grid-cols-1 gap-6">
          <template v-for="v in content.values.items" :key="v.t">

            <div class="flex flex-col md:flex-row bg-gray-50 p-8 shadow-sm border border-gray-100 relative group overflow-hidden">
              <div class="absolute top-0 left-0 w-8 h-8 bg-orange rounded-full z-20 -translate-x-1/2 -translate-y-1/2"></div>
              <div class="md:w-1/3 flex justify-between items-start mb-4">
                <div>
                  <h3 class="font-unbounded text-sm md:text-base font-bold uppercase">{{v.t}}</h3>
                  <p class="text-xs text-gray-400 tracking-widest uppercase">{{v.st}}</p>
                </div>
              </div>
              <p class=" md:w-2/3 leading-relaxed relative z-10">{{v.d}}</p>
              <img
                  src="/img/Rays-Ltop-Corner.svg"
                  alt=""
                  class="absolute top-0 left-0 w-64 duration-500 z-0 pointer-events-none"
              />
            </div>

          </template>
        </div>
      </div>
    </section>

    <div class="h-2 bg-yellow w-full"></div>

    <section id = "Team" class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4">

        <h2 class="font-unbounded text-3xl md:text-4xl font-bold mb-4 uppercase">Знайомство з командою</h2>

        <p class="mb-12 max-w-2xl ">Наш менеджмент завжди відкритий до спілкування — ми цінуємо прозорість, довіру й людяність. З будь-якими питаннями, ідеями чи пропозиціями звертайся до нас — ми поруч, щоб допомогти.</p>

        <div class="grid grid-cols-1 gap-8">
          <template v-for="member in content.team.members" :key="member.n">

            <div class="bg-gray-50 overflow-hidden flex flex-col md:flex-row justify-between group shadow-sm">
              <div class="p-8 md:w-2/3">
                <h3 class="font-unbounded text-xl md:text-2xl font-bold">{{member.n}}</h3>
                <p class="text-orange font-bold mb-4 uppercase text-sm tracking-wider">{{member.r}}</p>
                <p class="text-gray-600 text-sm">{{member.d}}</p>
              </div>
              <div class="md:w-1/3">
                <img
                    :src="`/img/team/${member.i}.webp`"
                    alt={member.n}
                    class="w-full h-64 object-cover" />
              </div>
            </div>

          </template>
        </div>
      </div>
    </section>

    <div class="h-2 bg-yellow w-full"></div>

    <section id="Communication" class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4">

        <h2 class="font-unbounded text-3xl md:text-4xl font-bold mb-4 uppercase">Де нас знайти</h2>
        <p class="mb-12">
          Будемо раді, якщо поділишся новиною про приєднання до нашої команди у своїх соцмережах — це допомагає іншим дізнатися про нас і показує, що ти став/стала частиною спільноти, яка зростає разом.
        </p>

        <div class="grid grid-cols-1 gap-8">
          <a href="https://uptarget.co" class="bg-yellow p-10 relative overflow-hidden group block">
            <img src="/img/Logo-Icon.svg" class="h-8 mb-4" />
            <p class="text-xl font-medium relative z-10">Більше про Uptarget — на нашому сайті</p>
            <img src="/img/Careers-Hero.webp" class="absolute bottom-0 right-0 pt-1.5 h-40 object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
          <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
            <a href="https://linkedin.com/company/uptargetco/" class="bg-blue-600 text-white p-6 flex items-center gap-4 hover:bg-blue-700 transition-colors">
              <img src="/img/LinkedIn.svg" class="h-8" />
              <span>Наш основний канал для професійних новин, клієнтів і партнерів</span>
            </a>
            <a href="https://instagram.com/uptarget.co/" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 items-center gap-4 hover:opacity-90 transition-opacity">
              <img src="/img/Instagram.svg" class="h-8" />
              <span>Ділимося моментами життя команди, досягненнями та атмосферою Uptarget</span>
            </a>
          </div>
        </div>

      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4">

        <h2 class="font-unbounded text-3xl md:text-4xl font-bold mb-6 uppercase">Комунікації</h2>

        <p class="mb-12">Для внутрішнього спілкування використовуємо <span class="text-voiceitt font-bold underline">Slack</span> - наш головний простір комунікації.</p>

        <div class="grid grid-cols-1 gap-4">
          <template v-for="item in content.slack.channels" :key="item">

          <div class="bg-gray-50 border border-gray-100 p-6 rounded-2xl rounded-tl-none hover:bg-gray-50 transition-colors flex flex-col md:flex-row">
            <div class="flex items-center gap-2 mb-3 md:w-1/3">
              <img
                  src="/img/Slack-Icon.webp"
                  alt="Slack"
                  loading="lazy"
                  width="240"
                  height="60"
                  class="object-contain w-auto h-6"
              />
              <div class="font-bold font-unbounded text-sm">{{item.c}}</div>
            </div>
            <p class="leading-relaxed md:w-2/3">{{item.d}}</p>
          </div>

          </template>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4">

        <h2 class="font-unbounded text-3xl md:text-4xl font-bold mb-6 uppercase">Командні зустрічі</h2>

        <div class="grid grid-cols-2 gap-4">

          <div class="bg-gray-50 p-8 shadow-sm">
            <div>
              <img src="/img/Allhands-Icon.webp"/>
            </div>
            <h3 class="font-unbounded text-xl md:text-2xl font-bold mb-4"> All-Hands Meeting </h3>
            <p class="leading-relaxed">Раз на квартал проводимо загальну зустріч усієї команди (присутність обов’язкова онлайн або офлайн). Тривалість 30–60 хв: новини компанії, важливі події, результати, плани, відзначення досягнень. Анонси — у Slack (#general), запрошення — у Google Calendar (з лінком на Meet для онлайн-учасників).</p>
          </div>

          <div class="bg-gray-50 p-8 shadow-sm">
            <div>
              <img src="/img/One2One-Icon.webp"/>
            </div>
            <h3 class="font-unbounded text-xl md:text-2xl font-bold mb-4"> 1:1 із CEO </h3>
            <p class="leading-relaxed">Щоквартальні індивідуальні зустрічі: про взаємодію з клієнтом і командою, професійний розвиток, настрій, ідеї чи складнощі. Мета — зворотний зв’язок і підтримка твого зростання як спеціаліста.</p>
          </div>

        </div>

      </div>
    </section>

    <div class="h-2 bg-yellow w-full"></div>

    <section id="Policies" class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4">

        <h2 class="font-unbounded text-3xl md:text-4xl font-bold mb-6 uppercase">Організаційні питання</h2>

        <div class="space-y-6">

          <div class="grid grid-cols-1 gap-6">

            <div class="bg-white border-t-4 border-yellow rounded-2xl rounded-tl-none shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
              <div class="p-8 flex flex-col h-full">
                <h3 class="font-unbounded text-xl md:text-2xl font-bold mb-4 uppercase">
                  Лікарняні
                </h3>

                <p class="text-gray-600 mb-8 leading-relaxed">
                  10 робочих днів на рік, нараховуються поступово — <span class="font-bold text-black">0,83 дня</span> за кожен календарний місяць. Невикористані дні не переносяться на наступний рік.
                </p>

                <ul class="grid grid-cols-1 gap-4 mt-auto">
                  <template v-for="step in content.policies.sick.steps" :key="step">

                  <li class="flex items-start gap-3 group">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-yellow/20 flex items-center justify-center mt-0.5 group-hover:bg-yellow transition-colors">
                      <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span class="text-sm md:text-base">{{step}}</span>
                  </li>

                  </template>
                </ul>
              </div>
            </div>

            <div class="bg-white border-t-4 border-yellow rounded-2xl rounded-tl-none shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
              <div class="p-8 flex flex-col h-full">
                <h3 class="font-unbounded text-xl md:text-2xl font-bold mb-4 uppercase">
                  Відпустки
                </h3>

                <p class="text-gray-600 mb-8 leading-relaxed">
                  18 робочих днів на рік (1,5 дня на місяць). Наприклад, якщо старт роботи 20 червня, до кінця року буде близько 9,5 днів. Невикористана відпустка переноситься на новий рік лише до 30 липня; після 1 серпня залишки анулюються. Рекомендуємо брати відпустку після 6 місяців роботи. Максимум — до 10 робочих днів поспіль.
                </p>

                <ul class="grid grid-cols-1 gap-4 mt-auto">
                  <template v-for="step in content.policies.vacation.steps" :key="step">
                    <li class="flex items-start gap-3 group">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-green/20 flex items-center justify-center mt-0.5 group-hover:bg-green transition-colors">
                        <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span class="text-sm md:text-base">{{step}}</span>
                    </li>
                  </template>
                </ul>

                <div class="bg-green-50 p-4 rounded-xl flex items-center gap-4 mt-6">
                  <span class="text-2xl">🌴</span>
                  <p class="text-green-800">Не ігноруй відпочинок — це необхідно для відновлення та ментального здоров’я.</p>
                </div>

              </div>
            </div>


            <div class="bg-white border-t-4 border-yellow rounded-2xl rounded-tl-none shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
              <div class="p-8 flex flex-col h-full">
                <h3 class="font-unbounded text-xl md:text-2xl font-bold mb-4 uppercase">
                  Винагорода та ФОП
                </h3>

                <p class="text-gray-600 mb-8 leading-relaxed">
                  Умови винагороди визначаються в офері. Перегляд компенсації — <span class="font-bold text-black">раз на рік</span> у межах annual appraisal. Працюємо з ФОП 3-ї групи.
                </p>

                <ul class="grid grid-cols-1 gap-4 mt-auto">
                  <li class="flex items-start gap-3 group">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--green-20)] flex items-center justify-center mt-0.5 group-hover:bg-[var(--green)] transition-colors">
                      <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span class="text-sm md:text-base text-gray-600">З питань розрахунків та звітності звертайся до <span class="font-bold text-black">Романа Власюка</span>.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="bg-white border-t-4 border-yellow rounded-2xl rounded-tl-none shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
              <div class="p-8 flex flex-col h-full">
                <h3 class="font-unbounded text-xl md:text-2xl font-bold mb-4 uppercase">
                  Трекінг часу
                </h3>

                <p class="text-gray-600 mb-8 leading-relaxed">
                  Трекати не менше <span class="font-bold text-black">8 годин на день</span>. Обов’язково фіксуй лікарняні та відпустки у Vacation Tracker для коректності розрахунків.
                </p>

                <ul class="grid grid-cols-1 gap-4 mt-auto">
                  <li class="flex items-start gap-3 group">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-yellow/20 flex items-center justify-center mt-0.5 group-hover:bg-yellow transition-colors">
                      <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span class="text-sm md:text-base text-gray-600">Див. окрему інструкцію <span class="underline decoration-yellow underline-offset-4 cursor-pointer">“Як ми трекаємо час”</span>.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="bg-white border-t-4 border-yellow rounded-2xl rounded-tl-none shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
              <div class="p-8 flex flex-col h-full">
                <h3 class="font-unbounded text-xl md:text-2xl font-bold mb-4 uppercase">
                  Офіс
                </h3>

                <p class="text-gray-600 mb-8 leading-relaxed">
                  Доступний з <span class="font-bold text-black">09:00 до 21:00</span> (Пн–Пт). Робота у вихідні не заохочується, але допускається за потреби 😉.
                </p>

                <ul class="grid grid-cols-1 gap-4 mt-auto">
                  <li class="flex items-start gap-3 group">
                    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-yellow/20 flex items-center justify-center mt-0.5 group-hover:bg-yellow transition-colors">
                      <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span class="text-sm md:text-base text-gray-600">Для доступу в позаробочий час узгодь візит з <span class="font-bold text-black">Іриною Орел</span>.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <section id="Policies" class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4">

        <h2 class="font-unbounded text-3xl md:text-4xl font-bold mb-6 uppercase">Компенсації</h2>

        <div class="grid grid-cols-1 gap-8">

          <div class="bg-white border-t-4 border-yellow rounded-2xl rounded-tl-none shadow-sm overflow-hidden relative group transition-all duration-300 hover:shadow-md">
            <div class="absolute -bottom-6 -right-6 text-8xl opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">💻</div>

            <div class="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div class="md:col-span-1">
                <h3 class="font-unbounded text-xl font-bold uppercase leading-tight">Робоча техніка</h3>
              </div>

              <div class="md:col-span-2 space-y-4">
                <div class="flex items-start gap-3">
                  <div class="mt-1 w-5 h-5 rounded-full bg-[var(--green-20)] flex items-center justify-center shrink-0">
                    <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p class="text-gray-600 text-sm md:text-base">Компенсація <span class="font-bold text-black">$1000</span> на купівлю MacBook — техніка стає твоєю через 1 рік роботи.</p>
                </div>
                <div class="flex items-start gap-3">
                  <div class="mt-1 w-5 h-5 rounded-full bg-[var(--green-20)] flex items-center justify-center shrink-0">
                    <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p class="text-gray-600 text-sm md:text-base">Або компанія закуповує лептоп/ПК, який залишається у власності <span class="font-bold text-black">Uptarget</span>.</p>
                </div>
                <div class="flex items-start gap-3">
                  <div class="mt-1 w-5 h-5 rounded-full bg-[var(--green-20)] flex items-center justify-center shrink-0">
                    <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p class="text-gray-600 text-sm md:text-base">Периферія та тестові девайси — за запитом та узгодженням.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white border-t-4 border-yellow rounded-2xl rounded-tl-none shadow-sm overflow-hidden relative group transition-all duration-300 hover:shadow-md">
            <div class="absolute -bottom-6 -right-6 text-8xl opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">🎓</div>

            <div class="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div class="md:col-span-1">
                <h3 class="font-unbounded text-xl font-bold uppercase leading-tight">Розвиток</h3>
              </div>

              <div class="md:col-span-2">
                <div class="flex items-start gap-3">
                  <div class="mt-1 w-5 h-5 rounded-full bg-[var(--green-20)] flex items-center justify-center shrink-0">
                    <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p class="text-gray-600 text-sm md:text-base">Підтримуємо участь у конференціях та курсах. Часткова компенсація витрат узгоджується напряму з <span class="font-bold text-black">CEO</span>.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white border-t-4 border-yellow rounded-2xl rounded-tl-none shadow-sm overflow-hidden relative transition-all duration-300 hover:shadow-md">
            <div class="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div class="md:col-span-1">
                <h3 class="font-unbounded text-xl font-bold uppercase leading-tight">На щодень</h3>
              </div>

              <div class="md:col-span-2 grid grid-cols-1 gap-4">
                <template v-for="(text, index) in [
                'Щодня перевіряй пошту та Slack (#general) — там анонси мітингів та головні новини.',
                'Додай світлину у Slack та Google — так колегам легше тебе впізнати.',
                'Ми завжди відкриті до ідей та ініціатив — сміливо ділися ними з командою!'
                ]" :key="index">

                  <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50">
                    <div class="mt-1 w-5 h-5 rounded-full bg-[var(--green-20)] flex items-center justify-center shrink-0">
                      <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p class="text-gray-600 text-sm md:text-base">{{text}}</p>
                  </div>

                </template>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <footer class="bg-yellow py-16 text-black text-base md:text-lg">
      <div class="max-w-container mx-auto px-4 flex flex-col items-center">
        <a href="#Top" class="mb-8 hover:scale-110 transition-transform">
          <img src="/img/Logo-Icon.svg" alt="Uptarget" class="h-8" />
        </a>
        <p class="text-center max-w-md text-sm leading-relaxed">
          Ми завжди відкриті до цікавих ідей та пропозицій. <br />
          Дякуємо, що ти з нами!
        </p>
        <div class="mt-8 pt-8 border-t border-white/10 w-full text-center text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Uptarget.co
        </div>
      </div>
    </footer>

  </div>

</template>

<style>
@reference "../styles/global.css";

.max-w-container {
  max-width: 1200px;
}
</style>