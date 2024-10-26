'use client';

import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "@/assets/lotties/loading-dots.json";



interface LoadingDotsProps {
  type?: string
}
export default function LoadingDots({ type = "card" }: LoadingDotsProps) {

  return (<section className={`w-full h-full flex justify-center items-center ${type == "dashboard" ? "bg-cyber-grape-800" : null}`}>
      <Lottie 
            options={{
                loop: true,
                autoplay: true,
                animationData: loadingAnimation,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                    className: ""
                }
            }}
            height={180}
            width={180}
            isClickToPauseDisabled={true}
        />
  </section>)
}