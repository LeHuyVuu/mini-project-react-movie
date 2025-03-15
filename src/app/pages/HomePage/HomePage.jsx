import { motion } from "framer-motion";
import FeatureMovies from "../../components/FeatureMovies";
import MediaList from "../../components/MediaList/MediaList";
import { TRENDING_TABS } from "../../libs/constant";

function HomePage() {
  return (
    <div>
      <FeatureMovies />
      <MediaList TABS={TRENDING_TABS} Title="NOW SHOWING" />
    </div>
  );
}

export default HomePage;
