const stateData = [
    { name: "Alabama", neighbors: ["Mississippi", "Georgia", "Florida", "Tennessee"] },
    { name: "Alaska", neighbors: ["Washington", "Oregon", "California"] }, // Морские соседи для сложности
    { name: "Arizona", neighbors: ["New Mexico", "Utah", "Nevada", "California"] },
    { name: "Arkansas", neighbors: ["Missouri", "Tennessee", "Mississippi", "Louisiana", "Oklahoma"] },
    { name: "California", neighbors: ["Oregon", "Nevada", "Arizona"] },
    { name: "Colorado", neighbors: ["Wyoming", "Nebraska", "Kansas", "Oklahoma", "New Mexico", "Utah"] },
    { name: "Connecticut", neighbors: ["Rhode Island", "Massachusetts", "New York"] },
    { name: "Delaware", neighbors: ["Maryland", "Pennsylvania", "New Jersey"] },
    { name: "Florida", neighbors: ["Georgia", "Alabama"] },
    { name: "Georgia", neighbors: ["South Carolina", "North Carolina", "Tennessee", "Alabama", "Florida"] },
    { name: "Hawaii", neighbors: ["California", "Washington", "Oregon"] },
    { name: "Idaho", neighbors: ["Washington", "Oregon", "Nevada", "Utah", "Wyoming", "Montana"] },
    { name: "Illinois", neighbors: ["Wisconsin", "Iowa", "Missouri", "Kentucky", "Indiana"] },
    { name: "Indiana", neighbors: ["Michigan", "Ohio", "Kentucky", "Illinois"] },
    { name: "Iowa", neighbors: ["Minnesota", "Wisconsin", "Illinois", "Missouri", "Nebraska", "South Dakota"] },
    { name: "Kansas", neighbors: ["Nebraska", "Missouri", "Oklahoma", "Colorado"] },
    { name: "Kentucky", neighbors: ["Ohio", "West Virginia", "Virginia", "Tennessee", "Missouri", "Illinois", "Indiana"] },
    { name: "Louisiana", neighbors: ["Arkansas", "Mississippi", "Texas"] },
    { name: "Maine", neighbors: ["New Hampshire"] },
    { name: "Maryland", neighbors: ["Pennsylvania", "Delaware", "Virginia", "West Virginia"] },
    { name: "Massachusetts", neighbors: ["Rhode Island", "Connecticut", "New York", "Vermont", "New Hampshire"] },
    { name: "Michigan", neighbors: ["Wisconsin", "Illinois", "Indiana", "Ohio"] },
    { name: "Minnesota", neighbors: ["North Dakota", "South Dakota", "Iowa", "Wisconsin"] },
    { name: "Mississippi", neighbors: ["Arkansas", "Tennessee", "Alabama", "Louisiana"] },
    { name: "Missouri", neighbors: ["Iowa", "Illinois", "Kentucky", "Tennessee", "Arkansas", "Oklahoma", "Kansas", "Nebraska"] },
    { name: "Montana", neighbors: ["Idaho", "Wyoming", "North Dakota", "South Dakota"] },
    { name: "Nebraska", neighbors: ["South Dakota", "Iowa", "Missouri", "Kansas", "Colorado", "Wyoming"] },
    { name: "Nevada", neighbors: ["Oregon", "Idaho", "Utah", "Arizona", "California"] },
    { name: "New Hampshire", neighbors: ["Maine", "Vermont", "Massachusetts"] },
    { name: "New Jersey", neighbors: ["New York", "Pennsylvania", "Delaware"] },
    { name: "New Mexico", neighbors: ["Colorado", "Oklahoma", "Texas", "Arizona", "Utah"] },
    { name: "New York", neighbors: ["Vermont", "Massachusetts", "Connecticut", "New Jersey", "Pennsylvania"] },
    { name: "North Carolina", neighbors: ["Virginia", "Tennessee", "Georgia", "South Carolina"] },
    { name: "North Dakota", neighbors: ["Minnesota", "South Dakota", "Montana"] },
    { name: "Ohio", neighbors: ["Michigan", "Pennsylvania", "West Virginia", "Kentucky", "Indiana"] },
    { name: "Oklahoma", neighbors: ["Kansas", "Missouri", "Arkansas", "Texas", "New Mexico", "Colorado"] },
    { name: "Oregon", neighbors: ["Washington", "Idaho", "Nevada", "California"] },
    { name: "Pennsylvania", neighbors: ["New York", "New Jersey", "Delaware", "Maryland", "West Virginia", "Ohio"] },
    { name: "Rhode Island", neighbors: ["Massachusetts", "Connecticut"] },
    { name: "South Carolina", neighbors: ["North Carolina", "Georgia"] },
    { name: "South Dakota", neighbors: ["North Dakota", "Minnesota", "Iowa", "Nebraska", "Wyoming", "Montana"] },
    { name: "Tennessee", neighbors: ["Kentucky", "Virginia", "North Carolina", "Georgia", "Alabama", "Mississippi", "Arkansas", "Missouri"] },
    { name: "Texas", neighbors: ["New Mexico", "Oklahoma", "Arkansas", "Louisiana"] },
    { name: "Utah", neighbors: ["Idaho", "Wyoming", "Colorado", "New Mexico", "Arizona", "Nevada"] },
    { name: "Vermont", neighbors: ["New Hampshire", "Massachusetts", "New York"] },
    { name: "Virginia", neighbors: ["Maryland", "West Virginia", "Kentucky", "Tennessee", "North Carolina"] },
    { name: "Washington", neighbors: ["Oregon", "Idaho"] },
    { name: "West Virginia", neighbors: ["Ohio", "Pennsylvania", "Maryland", "Virginia", "Kentucky"] },
    { name: "Wisconsin", neighbors: ["Minnesota", "Michigan", "Illinois", "Iowa"] },
    { name: "Wyoming", neighbors: ["Montana", "South Dakota", "Nebraska", "Colorado", "Utah", "Idaho"] }
];

const generateSmartQuiz = () => {
    const questions = stateData.map((state, index) => {
        const fileNamePart = state.name.replace(/\s/g, '_');

        // Выбираем 2 случайных соседа для сложности
        let options = [...state.neighbors]
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);

        // Если вдруг соседей мало (как у Мэна), добираем рандомными штатами
        while (options.length < 2) {
            const randomState = stateData[Math.floor(Math.random() * stateData.length)].name;
            if (randomState !== state.name && !options.includes(randomState)) {
                options.push(randomState);
            }
        }

        // Добавляем правильный ответ и перемешиваем a, b, c
        const finalAnswers = [state.name, ...options]
            .sort(() => 0.5 - Math.random())
            .map((name, i) => ({
                id: ['a', 'b', 'c'][i],
                text: name
            }));

        const correctId = finalAnswers.find(a => a.text === state.name).id;

        return {
            id: index + 1,
            type: "single",
            text: "Identify the state by its shape:",
            image: `/img/test/states/USA_${fileNamePart}_location_map.svg`,
            answers: finalAnswers,
            correct: correctId
        };
    });

    return JSON.stringify({
        id: "usa-50-states-pro",
        title: "USA Geography: Pro Level (Neighbors Mode)",
        questions: questions
    }, null, 2);
};

console.log(generateSmartQuiz());