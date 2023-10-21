const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");
const outputPath = path.resolve(__dirname, "..", "dist");
const src_path = path.resolve(__dirname, "..", "src");
const entryPoints = {
    js: {
        import: [
            path.resolve(src_path, "main.ts"),
            path.resolve(src_path, "tab_status.ts")
        ],
        filename: "main.js"
    },
    background: {
        import: path.resolve(src_path, "background.ts"),
        filename: "background.js"
    }
};

module.exports = {
    entry: entryPoints,
    output: {
        path: outputPath,
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
                use: "url-loader?limit=1024"
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: ".", context: "public" }]
        })
    ]
};