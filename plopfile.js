import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { execa } from "execa";
import inquirer from "inquirer";

const getFolders = (folderPath) =>
  fs
    .readdirSync(new URL(folderPath, import.meta.url), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const getFiles = (folderPath) => {
  try {
    return fs
      .readdirSync(new URL(folderPath, import.meta.url), {
        withFileTypes: true,
      })
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
  } catch (error) {
    return [];
  }
};

const renderChallenge = (plop, { level, challenge }) => {
  const challengeFileContent = fs.readFileSync(
    `./playground/${level}/${challenge}`,
    "utf-8"
  );

  const [challengeFilename] = challenge.split(".");

  const challengeContents = challengeFileContent.split(/\r?\n/);
  const foundIndex = challengeContents.findIndex(
    (lineContent) => lineContent === "*/"
  );

  const [no, title] = challengeContents[1].trim().split(" - ");
  const content = challengeContents.slice(7, foundIndex - 2).join("\n");

  const challengeDocTemplate = `
# {{title}}

<BtnGroup 
	issue="https://tsch.js.org/{{no}}/solutions"
	answer="https://github.com/type-challenges/type-challenges/issues/UPDATE_HERE_AFTER_SUBMIT_ANSWER"
/>

> 题目

{{{content}}}

> 解答

> 精选

<BtnGroup 
	featured="https://github.com/type-challenges/type-challenges/issues/UPDATE_HERE_IF_NEED_DISPLAY_FEATURED"
/>
	`;

  const challengeDoc = plop.renderString(challengeDocTemplate, {
    no,
    title,
    content,
  });

  // 判断目录是否存在
  if (!fs.existsSync(`./docs/challenges/${level}`)) {
    fs.mkdirSync(`./docs/challenges/${level}`, { recursive: true });
  }

  fs.writeFileSync(
    `./docs/challenges/${level}/${challengeFilename}.md`,
    challengeDoc,
    "utf-8"
  );

  const sidebarTemplate = `{
							text: "{{title}}",
							link: "/challenges/{{level}}/{{challengeFilename}}"
						},
						/** PLOP_INJECT_SIDEBAR_{{constantCase level}} */`;

  const sidebarContent = fs.readFileSync(
    "./docs/.vitepress/config/sidebar.ts",
    "utf-8"
  );

  const nextSidebarContent = sidebarContent.replace(
    `/** PLOP_INJECT_SIDEBAR_${level.toUpperCase()} */`,
    plop.renderString(sidebarTemplate, { title, level, challengeFilename })
  );

  fs.writeFileSync(
    "./docs/.vitepress/config/sidebar.ts",
    nextSidebarContent,
    "utf-8"
  );

  execa("code", [
    fileURLToPath(
      new URL(`./playground/${level}/${challengeFilename}.ts`, import.meta.url)
    ),
    fileURLToPath(
      new URL(
        `./docs/challenges/${level}/${challengeFilename}.md`,
        import.meta.url
      )
    ),
  ]);
};

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator("start-challenge", {
    description: "现在！你想开始哪一个挑战?",
    prompts: [
      {
        type: "list",
        name: "level",
        loop: false,
        message: "请选择挑战等级",
        choices: getFolders("./playground"),
      },
    ],
    actions: [
      async function initChallenge({ level }) {
        const challenges = getFiles(`./playground/${level}`);

        const completedChallenges = getFiles(`./docs/challenges/${level}`).map(
          (item) => item.replace(".md", ".ts")
        );

        const unCompletedChallenges = challenges.filter(
          (item) => !completedChallenges.includes(item)
        );

        if (unCompletedChallenges.length === 0) {
          return `🎉 你已经完成了全部 ${level} 挑战！`;
        }

        if (unCompletedChallenges.length === 1) {
          renderChallenge(plop, { level, challenge: unCompletedChallenges[1] });
        } else {
          const { challenge } = await inquirer.prompt({
            type: "list",
            name: "challenge",
            loop: false,
            message: `请选择挑战(${unCompletedChallenges.length})`,
            choices: unCompletedChallenges,
          });

          renderChallenge(plop, { level, challenge });
        }

        return `🎉 初始化完毕，现在！开始挑战！`;
      },
    ],
  });
}
