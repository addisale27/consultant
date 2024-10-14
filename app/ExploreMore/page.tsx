import Container from "../components/Container";
import ExploreHeroSection from "./HeroSection";
import TextBanner from "./TextBanner";

const ExploreMore = () => {
  return (
    <div>
      <ExploreHeroSection />
      <Container>
        <TextBanner />
      </Container>
    </div>
  );
};

export default ExploreMore;
