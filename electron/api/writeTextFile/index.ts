import { writeFile } from "fs/promises";

const writeTextFile = async (
    path: string,
    content: string,
): Promise<boolean> => {
    try {
        await writeFile(path, content, "utf-8");
        return true;
    } catch (e) {
        return false;
    }
};

export default writeTextFile;
