// src/data/experience.ts

export interface ExperienceItem {
    period: string;
    company: string;
    role: string;
    location: string;
    description: string[];
    link?: string;
}

export const experiences: ExperienceItem[] = [
    {
        period: "2020 — Present",
        company: "Targeted Solutions for Business Corp",
        role: "CEO",
        location: "WY, USA",
        link: "https://tsb-enterprise.com/",
        description: [
            "Strategic Vision and Leadership",
            "Company Culture and Leadership",
            "Financial Management and Oversight",
            "Business Development and Partnership",
            "Operations and Organizational Effectiveness",
            "Risk Management and Decision Making",
            "Marketing and Brand Strategy",
            "Innovation and Technology Leadership"
        ]
    },
    {
        period: "2020 — Present",
        company: "Uptarget.co",
        role: "CEO & Co-Founder",
        location: "USA",
        link: "https://uptarget.co/",
        description: [
            "Co-founded a technology consultancy and software development company.",
            "Driving business growth and establishing strategic partnerships in the tech sector."
        ]
    },
    {
        period: "2017 — 2020",
        company: "TopLab (Acquired by Titanium Technologies)",
        role: "CEO & Co-Founder",
        location: "Cherkasy, Ukraine / Tel Aviv, Israel",
        link: "https://www.facebook.com/titaniumlabsteam",
        description: [
            "Business development, sales, and marketing strategy.",
            "HR, recruitment and administrative management.",
            "Financial planning and operational reporting.",
            "Product management of key web and mobile projects."
        ]
    },
    {
        period: "2017 — 2018",
        company: "InConnect",
        role: "Technology Partner",
        location: "Amsterdam, Netherlands",
        link: "https://www.inconnect.io",
        description: [
            "Product Development and Technical Leadership."
        ]
    },
    {
        period: "2015 — 2018",
        company: "Luxoft (NYSE:LXFT)",
        role: "Managing Director",
        location: "Dnipro, Ukraine",
        link: "http://luxoft.com/",
        description: [
            "Strategic direction and operational oversight.",
            "HR, recruitment, and administrative management.",
            "Financial planning, reporting, and performance tracking.",
            "Talent retention and organizational development.",
            "Corporate services and internal compliance coordination.",
            "Communication with international leadership and regional teams."
        ]
    },
    {
        period: "2010 — 2015",
        company: "Master of Code Global",
        role: "COO",
        location: "Cherkasy, Ukraine",
        link: "http://masterofcode.com/",
        description: [
            "Defined company strategy and led financial planning.",
            "Supervised key departments: Tech, Marketing, HR, Accounting.",
            "Managed large-scale web and mobile projects (PM, BA, workflows).",
            "Oversaw sales operations and prepared custom proposals and materials.",
            "Led remote teams and implemented Agile methodologies.",
            "Hired department heads, trained management, and partnered with universities."
        ]
    },
    {
        period: "2012 — 2016",
        company: "GeekHub",
        role: "Project Management Lecturer (Volunteer)",
        location: "Cherkasy, Ukraine",
        link: "https://www.facebook.com/geekhub.ck",
        description: [
            "Interviewing enrollees.",
            "Delivering lectures.",
            "Conducting examinations."
        ]
    },
    {
        period: "2014 — 2015",
        company: "Cherkasy IT Cluster / Regional Governor Advisor",
        role: "Board Member & Advisor to Governor Yurii Tkachenko",
        location: "Ukraine",
        link: "http://itcluster.ck.ua/",
        description: [
            "Strategic advisory in IT direction for the Cherkasy region.",
            "Community building and regional IT ecosystem development.",
            "Interviewing enrollees and delivering lectures."
        ]
    },
    {
        period: "2006 — 2014",
        company: "Cherkasy State Technological University",
        role: "Computer Science and Project Management Lecturer, PhD",
        location: "Ukraine",
        description: [
            "Interviewing enrollees.",
            "Delivering lectures and workshops.",
            "Conducting examinations."
        ]
    }
];