import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import Work from "../components/Work/Work";
import Download from "../components/Download/Download";
import Footer from "../components/Footer/Footer";

export default function Landing(){
     const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get("section");

        if (section) {
        document.getElementById(section)?.scrollIntoView({
            behavior: "smooth",
        });
        }
    }, [location]);

    return(
        <>
            <section id="hero"><Hero/></section>
            <section id="features"><Features/></section>
            <section id="works"><Work/></section>
            <section id="download"><Download/></section>
            <section id="footer"><Footer/></section>
        </>
    );
}