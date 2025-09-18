import { motion } from "framer-motion";
import { featuredVideo } from "../../assets";

const FeatureSection = () => {
  return (
    <section data-scroll className="h-screen py-12">
      <div className="relative h-full">
        {/* Background video */}
        <video
          src={featuredVideo}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controls={false}
          className="h-full select-none w-full object-cover"
        ></video>

        {/* Overlay */}
        <div className="overlay h-full w-full bg-black/50 absolute inset-0 text-white flex justify-center items-center">
          <motion.div
            className="w-3/4 space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 15,
              delay: 0.2,
            }}
          >
            {/* Headline */}
            <p className="text-5xl font-bold uppercase flex gap-2 flex-wrap">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 12,
                  delay: 0.4,
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                enter
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 12,
                  delay: 0.6,
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                the
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 12,
                  delay: 0.8,
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                escape
              </motion.span>
            </p>

            {/* Tagline */}
            <motion.p
              className="text-2xl font-bold capitalize"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 10,
                delay: 1.1,
              }}
              viewport={{ once: true, amount: 0.5 }}
            >
              an exit from the ordinary.
            </motion.p>

            {/* Paragraph */}
            <motion.p
              className="leading-6 text-lg max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 35,
                damping: 10,
                delay: 1.4,
              }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Enter the Escape is a cinematic expression of rebellion, desire,
              and distinction — designed for those who see fashion as freedom.
              At Lumen Wear, every piece is a door to somewhere better —
              tailored for men and women who don’t wait for luxury. They wear
              it.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
