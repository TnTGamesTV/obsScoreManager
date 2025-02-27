import { readFile } from "fs/promises";

const readTextFile = async (path: string): Promise<string | undefined> => {
    try {
        const content = await readFile(path, "utf-8");

        return content;
    } catch (e) {
        return undefined;
    }
};

export default readTextFile;
