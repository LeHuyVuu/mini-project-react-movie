import { motion } from "framer-motion";
import FeatureMovies from "../../components/FeatureMovies";
import MediaList from "../../components/MediaList/MediaList";
import { TRENDING_TABS } from "../../libs/constant";

function HomePage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <FeatureMovies />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <MediaList TABS={TRENDING_TABS} Title="NOW SHOWING" />
      </motion.div>
    </div>
  );
}

export default HomePage;
