import { Input } from "../commands/command.input";


export abstract class AbstractAction {
    public abstract async handle(name: Input, options: Input[]): Promise<void>
}