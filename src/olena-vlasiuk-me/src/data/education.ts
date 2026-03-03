export interface EducationItem {
    period: string;
    institution: string;
    institution_department?: string;
    location: string;
    specialty?: string;
    degree?: string;
    thesis?: string;
    details?: string;
    achievements?: string[];
}

export const educationData: EducationItem[] = [
    {
        period: "2006 — 2009",
        institution: "Cherkassy State Technological University",
        location: "Cherkasy, Ukraine",
        specialty: "Computer systems and components",
        degree: "PhD in Computer Science",
        details: " - Theme of dissertation: Methods of signals identification in poor quality channels, <br> <br> - Author of 20 scientific articles and 4 Ukrainian patented inventions",
        achievements: [
            "Author of 20 scientific articles",
            "4 Ukrainian patented inventions"
        ]
    },
    {
        period: "2001 — 2006",
        institution: "Cherkassy State Technological University",
        institution_department: "Department of Information technologies and systems ",
        location: "Cherkasy, Ukraine",
        specialty: "Computer systems and networks",
        degree: "Bachelor (Graduated with Honors)",
        achievements: [
            "Courses: discrete mathematics, numerical methods, probability theory, applied statistics, digital techniques and microprocessors, logic programming, adaptive and intelligent control systems, database design, net information technologies, system programming, computer graphics, engineering graphics and more."
        ]
    },
    {
        period: "1998 — 2001",
        institution: "Physics and mathematics lyceum",
        location: "Cherkasy, Ukraine",
        achievements: [
            "Graduated with a Gold Medal for Academic Excellence"
        ]
    }
];