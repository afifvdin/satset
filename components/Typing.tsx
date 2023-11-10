"use client"

import { TypeAnimation } from "react-type-animation"

export default function Typing() {
  return (
    <TypeAnimation
      sequence={[
        "SGGPBGJVRTIBWCMI",
        1000,
        "XWEQRFHJKLMVYXZP",
        1000,
        "ZYWXRGHJKLMNQPST",
        1000,
        "SAGARPERTEMANANV",
        3000,
        "AQWERTGHYJKLNOPSV",
        1000,
        "SDVFRTGBYHJKLMNOP",
        1000,
        "ZXCVBNMRTGBYHJKLM",
        1000,
        "CXZTIDAKPUTUSMLK",
        3000,
        "QWERTYUIOPASDFGHJKL",
        1000,
        "MNBVCXZLKJHGFEDCBA",
        1000,
        "IOUYTREWQSDFGHJKLM",
        1000,
        "MBQPINJAMDULUPLK",
        3000,
        "ZXCVSERATUSGHJKLP",
        3000,
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: "2em", display: "inline-block" }}
    />
  )
}
