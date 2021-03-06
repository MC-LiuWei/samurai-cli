/*
 * @Author: 刘伟
 * @Date: 2020-06-22 13:08:02
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-26 20:30:59
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/runners/runner.options.ts
 */
import { strings } from "@angular-devkit/core";

export class RunnersOption {
  constructor(private name: string, private value: boolean | string) {}

  public getName(): string {
    return this.name;
  }

  public getValue(): string | boolean {
    return this.value;
  }

  public toCommandString(): string {
    if (typeof this.value === "string") {
      if (this.name === "name") {
        return `--${this.name}=${this.format()}`;
      } else if (this.name === "version" || this.name === "path") {
        return `--${this.name}=${this.value}`;
      } else {
        return `--${this.name}="${this.value}"`;
      }
    } else if (typeof this.value === "boolean") {
      const str = strings.dasherize(this.name);
      return this.value ? `--${str}` : `--no-${str}`;
    } else {
      return `--${strings.dasherize(this.name)}=${this.value}`;
    }
  }

  private format() {
    return strings
      .dasherize(this.value as string)
      .split("")
      .reduce((content, char) => {
        if (char === "(" || char === ")" || char === "[" || char === "]") {
          return `${content}\\${char}`;
        }
        return `${content}${char}`;
      }, "");
  }
}
