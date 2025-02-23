// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import tailwindcss from 'tailwindcss';

const packageJson = require("./package.json");
const tailwindConfig = require('./tailwind.config.js');

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postcss({
        extensions: ['.css'],
        extract: true,
        modules: true,
        config: {
          path: './postcss.config.js'
        },
        plugins: [
          require('postcss-import'),
          require('postcss-preset-env')({
            stage: 1,
          }),
          require('postcss-nested'),
          tailwindcss(tailwindConfig),
          require('autoprefixer'),
        ]
      }),
    ],
    external: ["react", "react-dom", /\.css$/],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];