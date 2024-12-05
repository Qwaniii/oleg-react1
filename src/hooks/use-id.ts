import codeGenerator from "../utils/code-generator";

export default function useId(): string {
    return codeGenerator(1).toString()
}