import type { NextApiRequest, NextApiResponse } from "next";
import {
  colorSchemeMap,
  getGithubUrl,
  nonColorSchemeTokenGroups,
} from "./[tokens]";

const html = `
<!DOCTYPE>
<html>
    <head>
        <title>Admin Design Systems Token API</title>
        <style>
            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
        </style>
    </head>
    <body>
        <h1>Admin Design Systems Token API v0</h1>
        <p>
            This API allows users to query for and build applications with the <a href="https://polaris.shopify.com/tokens/getting-started-with-tokens">Polaris Tokens</a>.
        </p>
        <h2>Usage</h2>
        <ul>
            <li>
                <a href="/api/v0/tokens">/api/v0/tokens</a> - Overview
            </li>
            <li>
                <a href="/api/v0/tokens/all">/api/v0/tokens/all</a> - Contains all available tokens
            </li>
            <li>
                <a href="/api/v0/tokens/colors">/api/v0/tokens/colors</a> - Contains the color tokens for a desired color scheme
            </li>
            <li>
                /api/v0/tokens/:token-group - Information for a single token group
            </li>
            <li>
                Format Query Param - Updates the format that you receive. Defaults to json. Ex: /all?format=css, /colors?format=json, /:token-group?format=json
            </li>
            <li>
                Scheme Query Param - Updates the color scheme that you receive. Defaults to light. Ex: /all?scheme=dark, /colors?scheme=light
            </li>
        </ul>

        <h2>Token Groups</h2>
        <table>
            <thead>
                <tr>
                    <td>Token Group</td>
                    <td>JSON</td>
                    <td>CSS</td>
                    <td>Github</td>
                </tr>
            </thead>
            <tbody>
            ${Object.keys(colorSchemeMap)
              .map((colorScheme) => {
                const url = `/api/v0/tokens/colors?scheme=${colorScheme}`;
                const cssUrl = `${url}&format=css`;
                const tokenGroup = colorSchemeMap[colorScheme];

                return `
                    <tr>
                        <td>${tokenGroup}</td>
                        <td>
                            <a href="${url}">${url}</a>
                        </td>
                        <td>
                            <a href="${cssUrl}">${cssUrl}</a>
                        </td>
                        <td>
                            <a href="${getGithubUrl(
                              tokenGroup,
                              false
                            )}">File</a>
                        </td>
                    </tr>
                `;
              })
              .join("\n")}
            ${nonColorSchemeTokenGroups
              .map((tokenGroup) => {
                const url = `/api/v0/tokens/${tokenGroup}`;
                const cssUrl = `${url}?format=css`;

                return `
                    <tr>
                        <td>${tokenGroup}</td>
                        <td>
                            <a href="${url}">${url}</a>
                        </td>
                        <td>
                            <a href="${cssUrl}">${cssUrl}</a>
                        </td>
                        <td>
                            <a href="${getGithubUrl(
                              tokenGroup,
                              false
                            )}">File</a>
                        </td>
                    </tr>
                `;
              })
              .join("\n")}
            </tbody>
        </table>
    </body>
</html>
`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("content-type", "text/html");
  res.send(html);
};

export default handler;
