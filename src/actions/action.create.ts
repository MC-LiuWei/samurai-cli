import { AbstractAction } from "./abstract.action";
import { Input } from "../commands/command.input";
import generate from "../examples/component/generate";

export default class CreateAction extends AbstractAction {

    public async handle(name: Input, options: Input[]) {
        const app = name.value;
        const cwd = process.cwd();
        if (app === "component") {
            const name: any = options.find((item) => item.name === "name");
            const ext: any = options.find((item) => item.name === "ext");
            const type: any = options.find((item) => item.name === "type");
            await generate(cwd, name.value, { ext: ext.value, type: type.value });
        }
    }
}