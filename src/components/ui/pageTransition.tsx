"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
