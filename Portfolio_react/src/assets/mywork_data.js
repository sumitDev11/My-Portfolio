// Import your project images at the top
import project1_img from '../assets/project_1.png';
import project2_img from '../assets/project_2.png';
import project3_img from '../assets/project_3.png';
import project4_img from '../assets/project_4.png';

const mywork_data = [
    {
        w_no: 1,
        w_name: "MockMate AI",
        w_img: project1_img,
        w_description: "AI simulator using Gemini API with resources for interview preparation",
        technologies: ["React", "Next.js", "PostgreSql" , "Tailwind"],
        // --- ADD THESE MISSING FIELDS ---
        github_url: "https://github.com/sumitDev11/MockMate-AI", // <-- Your GitHub link
        live_url: "https://mock-mate-ai-yea6.vercel.app/",            // <-- Your Live Demo link
        featured: true,                                         // <-- Is it featured? (true/false)
        category: "AI mockinterview"                                   // <-- Category name
    },
    {
        w_no: 2,
        w_name: "Medkit AI",
        w_img: project2_img,
        w_description: "AI simplifies medical reports with insights and recommendations.",
        technologies: ["Next.js", "TypeScript", "Tailwind","HTML"],
        // --- ADD THESE MISSING FIELDS ---
        github_url: "https://github.com/sumitDev11/Health-Medkit-", // Use "#" if no link
        live_url: "https://health-medkit-uyao.vercel.app/",
        featured: true,
        category: "Medkit"
    },
    {
        w_no: 3,
        w_name: " Cognitia",
        w_img: project3_img,
        w_description: "AI chat assistant using Gemini API for smart, helpful conversations.",
        technologies: ["React", "Next.js", "Tailwind", "HTML"],
        // --- ADD THESE MISSING FIELDS ---
        github_url: "https://github.com/sumitDev11/Cognitia",
        live_url: "https://cognitia-l5kh.vercel.app/",
        featured: true,
        category: "Cognita"
    },
    {
        w_no: 4,
        w_name: "Wheather-APP",
        w_img: project4_img,
        w_description: "Real-time weather app showing temperature, humidity, and wind speed.",
        technologies: ["JavaScript", "CSS", "HTML","APIs"],
        // --- ADD THESE MISSING FIELDS ---
        github_url: "https://github.com/sumitDev11/Wheather-APP",
        live_url: "#",
        featured: true,
        category: "Wheather-APP"
    },
   
];

export default mywork_data;