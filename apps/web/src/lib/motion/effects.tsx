'use client';
import { ReactElement } from "react";

import { motion } from "framer-motion";
export function DivEffect(props: { children: ReactElement, whileTap?: any, delay?: number , className?: string }) {

    return (
        <motion.div
            className={props.className}
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: props.delay
            }}
            whileTap={props.whileTap}
        >

            {props.children}
        </motion.div>
    )
}