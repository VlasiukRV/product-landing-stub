const europeData = [
    { name: "France", neighbors: ["Belgium", "Germany", "Switzerland", "Italy", "Spain"] },
    { name: "Germany", neighbors: ["Poland", "Czech Republic", "Austria", "France", "Netherlands", "Denmark"] },
    { name: "Italy", neighbors: ["Switzerland", "Austria", "Slovenia", "France"] },
    { name: "Spain", neighbors: ["Portugal", "France", "Andorra"] },
    { name: "United Kingdom", neighbors: ["Ireland", "France", "Norway"] },
    { name: "Ukraine", neighbors: ["Poland", "Slovakia", "Hungary", "Romania", "Moldova", "Belarus"] },
    { name: "Poland", neighbors: ["Germany", "Czech Republic", "Slovakia", "Ukraine", "Belarus", "Lithuania"] },
    { name: "Norway", neighbors: ["Sweden", "Finland", "Denmark"] },
    { name: "Sweden", neighbors: ["Norway", "Finland", "Denmark"] },
    { name: "Finland", neighbors: ["Norway", "Sweden", "Estonia"] },
    { name: "Austria", neighbors: ["Germany", "Czech Republic", "Slovakia", "Hungary", "Slovenia", "Italy", "Switzerland"] },
    { name: "Switzerland", neighbors: ["Germany", "France", "Italy", "Austria", "Liechtenstein"] },
    { name: "Portugal", neighbors: ["Spain"] },
    { name: "Greece", neighbors: ["Albania", "North Macedonia", "Bulgaria", "Turkey"] },
    { name: "Belgium", neighbors: ["Netherlands", "Germany", "Luxembourg", "France"] },
    { name: "Netherlands", neighbors: ["Germany", "Belgium", "Denmark"] },
    { name: "Czech Republic", neighbors: ["Germany", "Poland", "Slovakia", "Austria"] },
    { name: "Slovakia", neighbors: ["Czech Republic", "Poland", "Ukraine", "Hungary", "Austria"] },
    { name: "Hungary", neighbors: ["Slovakia", "Ukraine", "Romania", "Serbia", "Croatia", "Slovenia", "Austria"] },
    { name: "Romania", neighbors: ["Ukraine", "Moldova", "Bulgaria", "Serbia", "Hungary"] },
    { name: "Bulgaria", neighbors: ["Romania", "Serbia", "North Macedonia", "Greece", "Turkey"] },
    { name: "Serbia", neighbors: ["Hungary", "Romania", "Bulgaria", "North Macedonia", "Montenegro", "Bosnia and Herzegovina", "Croatia"] },
    { name: "Croatia", neighbors: ["Slovenia", "Hungary", "Serbia", "Bosnia and Herzegovina", "Montenegro"] },
    { name: "Ireland", neighbors: ["United Kingdom"] },
    { name: "Denmark", neighbors: ["Germany", "Sweden", "Norway"] },
    { name: "Belarus", neighbors: ["Lithuania", "Latvia", "Poland", "Ukraine"] },
    { name: "Lithuania", neighbors: ["Latvia", "Belarus", "Poland"] },
    { name: "Latvia", neighbors: ["Estonia", "Lithuania", "Belarus"] },
    { name: "Estonia", neighbors: ["Finland", "Latvia"] },
    { name: "Slovenia", neighbors: ["Austria", "Hungary", "Croatia", "Italy"] },
    { name: "Bosnia and Herzegovina", neighbors: ["Croatia", "Serbia", "Montenegro"] },
    { name: "Albania", neighbors: ["Montenegro", "Kosovo", "North Macedonia", "Greece"] },
    { name: "North Macedonia", neighbors: ["Serbia", "Bulgaria", "Greece", "Albania"] },
    { name: "Moldova", neighbors: ["Ukraine", "Romania"] },
    { name: "Iceland", neighbors: ["Norway", "United Kingdom", "Greenland"] },
    { name: "Montenegro", neighbors: ["Bosnia and Herzegovina", "Serbia", "Albania", "Croatia"] },
    { name: "Luxembourg", neighbors: ["Belgium", "Germany", "France"] },
    { name: "Andorra", neighbors: ["France", "Spain"] },
    { name: "Malta", neighbors: ["Italy", "Tunisia", "Libya"] },
    { name: "Monaco", neighbors: ["France", "Italy"] }
];

const generateEuropeQuiz = () => {
    const questions = europeData.map((country, index) => {
        const fileNamePart = country.name.replace(/\s/g, '_');

        // Подбор вариантов
        let options = [...country.neighbors].sort(() => 0.5 - Math.random()).slice(0, 2);

        while (options.length < 2) {
            const randomCountry = europeData[Math.floor(Math.random() * europeData.length)].name;
            if (randomCountry !== country.name && !options.includes(randomCountry)) {
                options.push(randomCountry);
            }
        }

        const finalAnswers = [country.name, ...options]
            .sort(() => 0.5 - Math.random())
            .map((name, i) => ({ id: ['a', 'b', 'c'][i], text: name }));

        const correctId = finalAnswers.find(a => a.text === country.name).id;

        return {
            id: index + 1,
            type: "single",
            text: "Identify the European country by its shape:",
            image: `/img/test/europe/Europe_${fileNamePart}_location_map.svg`,
            answers: finalAnswers,
            correct: correctId
        };
    });

    return JSON.stringify({
        id: "europe-map-quiz",
        title: "Europe: Map & Shapes Master",
        questions: questions
    }, null, 2);
};

console.log(generateEuropeQuiz());