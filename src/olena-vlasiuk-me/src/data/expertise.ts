// src/data/expertise.ts

export const expertiseData = {
    scientific: {
        title: "Scientific publications",
        note: "*All publications prior to 2015 were issued under the maiden name Olena Lisitsyna",
        link: "https://scholar.google.com.ua/citations?view_op=list_works&hl=uk&user=QtFVwn8AAAAJ",
        linkText: "List of publications"
    },
    patents: {
        title: "List of patents",
        note: "*All patents prior to 2015 were issued under the maiden name Olena Lisitsyna",
        items: [
            { id: "55709", title: "Method of distinguishing a signal from noise.", link: "https://sis.nipo.gov.ua/en/search/detail/254071/" },
            { id: "60633", title: "Method for extracting a data signal contained in a phase-modulated noise-like signal with increased confidence.", link: "https://sis.nipo.gov.ua/en/search/detail/247589/" },
            { id: "86705", title: "Method of generating a sequence of random numbers.", link: "https://sis.nipo.gov.ua/en/search/detail/1112410/" },
            { id: "93221", title: "Method for determining the probability characteristics of random processes.", link: "https://sis.nipo.gov.ua/en/search/detail/450858/" }
        ]
    },
    business: {
        title: "Business publications",
        items: [
            {
                title: "Your Dedicated Team blog",
                link: "https://www.linkedin.com/newsletters/your-dedicated-team-7290376649756360704/",
                description: "Insights on building in-house teams, healthtech, e-commerce, and startup success.",
                isNewsletter: true
            },
            {
                title: "Is it true that you can now find a developer for 25,000–30,000 a year, or what worries customers during a war?",
                link: "https://dev.ua/blogs/posts/alyonavlasiukuptargetco-1689941888"
            }
        ]
    },
    mentorship: {
        title: "Mentorship",
        items: [
            {
                role: "Coach",
                event: '"Girls at STEM" Online Conference (2021)',
                description: "Provided coaching and guidance to one of the winners of the \"Girls at STEM\" conference, helping them refine their project and offering strategic advice on career growth and development in tech."
            },
            {
                role: "Coach 2012-2016",
                event: "GeekHub",
                link: "https://www.facebook.com/geekhub.ck",
                description: "Volunteered as an instructor to foster the next generation of IT talent."
            }
        ]
    },
    events: [
        { title: "Smart Marketer, Denver, October 2024", link: "https://www.linkedin.com/posts/olenavlasiuk_i-recently-attended-the-smart-marketer-conference-activity-7260646268094296064-fWn9" },
        { title: "Women of Tech STL, St Louis, March 2024", link: "https://www.instagram.com/reel/C40Cf_Eodav/" },
        { title: "Agtech 2023, University of IL Research Park, Champaign, 2023", link: "https://www.instagram.com/reel/DHYb6QsofLK/" },
        { title: "Cyber Security Summit, Chicago, October 2023", link: "https://www.instagram.com/p/CyDmc0IoXw6/" },
        { title: "AI and Blockchain Summit, Malta, 2019", link: "https://www.instagram.com/p/Bx2TYCeAcnK/", badge: "Exhibitor" },
        { title: "Titanium Talks, Keys to a successful discovery phase, Cherkasy 2019", link: "https://www.instagram.com/p/BqKR2keH_mW/", badge: "Speaker" },
        { title: "Titanium Talks, Cherkasy 2019", link: "https://www.instagram.com/p/B4m0jh3p_Yc/", badge: "Speaker" },
        { title: "StudIT Fest 2018", link: "https://youtu.be/lL3sUZWjB5k?t=1236", badge: "Speaker" },
        { title: "TopLab Talks, Cherkasy 2018", link: "https://photos.google.com/share/AF1QipMXb4s70xVt9DWRG8j-3tS3aKEv-UaxaQP_NML2WUQV1OLJ8cU_plR5xrPLTaqrIQ/photo/AF1QipPO_pZjcOmxCZ4Kv48hdC-clDhER9I_20Pa0AI5?key=VXFUZC14cjVhcVBZRlVVOERLc0NzTC1EYTNFaVNn", badge: "Speaker" },
        { title: "TopLab Talks, Cherkasy (How to run successful meetings with your customers) 2018", link: "https://www.instagram.com/p/BqKR2keH_mW/", badge: "Speaker" },
        { title: "Wolves Summit, Warsaw 2018", link: "https://www.facebook.com/titaniumlabsteam/posts/pfbid02cNZAUhM2eVrzYhbw27GnvknAb8eABi7pDHpBhrtNtS6oibqybydNpPFmtS2Momrvl" },
        { title: "International Women's Day 2018", link: "https://gdg.community.dev/events/details/google-gdg-cherkasy-presents-iwd-international-womens-day-2018/", badge: "Speaker" },
        { title: "BIT'2017, Kyiv, 2017 (Presented a Robotic Bike Parking System)", link: "https://www.facebook.com/titaniumlabsteam/posts/pfbid02Yo4D9dMEkESksHkXznVQXy6KKgd3QhuXKU2LngEFj3qT7i5fb15irCrUeFwV7J6dl", badge: "Exhibitor" },
        { title: "TechNights, Cherkasy, 2017", link: "https://dou.ua/forums/topic/22658/" },
        { title: "Unicorn Battle, Cherkasy, Ukraine (2017)", link: "https://startup.ua/news/double-unicorn.html", badge: "Judge" },
        { title: "Lviv Outsourcing forum, 2014" },
        { title: "Kyiv Outsourcing Forum, 2013" }
    ]
};