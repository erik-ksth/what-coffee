import About from "@/app/story/components/About";
import Team from "@/app/story/components/Team";
import Back from "@/app/story/components/Back";
import StoryHero from "@/app/story/components/StoryHero";

export default function Story() {
    return (
        <main>
            <StoryHero />
            <About />
            <Back />
            <Team />
        </main>
    );
}